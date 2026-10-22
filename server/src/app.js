const express = require("express");
const cors = require("cors");
const { rateLimit } = require("express-rate-limit");
const path = require("path");
require("dotenv").config({ path: path.join(__dirname, "../.env") });

const app = express();
if (process.env.NODE_ENV === "production") {
  app.set("trust proxy", 1);
}

const allowedOrigins = (process.env.FRONTEND_URL || "http://localhost:5173")
  .split(",")
  .map((origin) => origin.trim())
  .filter(Boolean);

app.use(
  cors({
    origin(origin, callback) {
      if (!origin) return callback(null, true);

      const isLocalOrigin =
        process.env.NODE_ENV !== "production" &&
        /^https?:\/\/(localhost|127\.0\.0\.1)(:\d+)?$/.test(origin);

      if (allowedOrigins.includes(origin) || isLocalOrigin) {
        return callback(null, true);
      }

      return callback(new Error("Origen no permitido por CORS."));
    },
  }),
);

app.use(express.json({ limit: "20kb" }));

const contactRateLimit = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 5,
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    error: "Se alcanzó el límite de envíos. Intenta nuevamente en unos minutos.",
  },
});

app.use("/contact", contactRateLimit);

const RESEND_API_URL = "https://api.resend.com";
const DEFAULT_EMAIL_FROM = "GymCross <onboarding@resend.dev>";

function getEmailConfiguration() {
  const { RESEND_API_KEY, CONTACT_TO } = process.env;
  const from = process.env.MAIL_FROM || DEFAULT_EMAIL_FROM;

  if (!RESEND_API_KEY || !CONTACT_TO || !from) {
    return null;
  }

  return {
    apiKey: RESEND_API_KEY,
    from,
    to: CONTACT_TO,
  };
}

const emailConfiguration = getEmailConfiguration();

async function sendContactEmail({ from, to, replyTo, subject, text }) {
  const response = await fetch(`${RESEND_API_URL}/emails`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${emailConfiguration.apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from,
      to: [to],
      reply_to: replyTo,
      subject,
      text,
    }),
    signal: AbortSignal.timeout(15000),
  });

  const result = await response.json().catch(() => ({}));
  if (!response.ok) {
    const providerError = new Error(
      result.message || `Resend API respondió con estado ${response.status}.`,
    );
    providerError.status = response.status;
    throw providerError;
  }

  return result;
}

app.get("/", (req, res) => {
  res.json({ message: "Backend de GymCross funcionando correctamente" });
});

app.get("/healthz", (req, res) => {
  res.json({ status: "ok" });
});

app.get("/api/health", (req, res) => {
  const configured = Boolean(emailConfiguration);
  res.status(configured ? 200 : 503).json({
    status: configured ? "ok" : "degraded",
    emailConfigured: Boolean(emailConfiguration),
    emailProvider: "resend",
    emailStatus: configured ? "configured" : "not_configured",
  });
});

app.post("/contact", async (req, res) => {
  const { name, email, phone, message = "", website = "" } = req.body || {};

  // Honeypot field: ignore automated submissions without telling the bot.
  if (typeof website === "string" && website.trim()) {
    return res.status(200).json({
      success: true,
      message: "¡Mensaje enviado correctamente! Te contactaremos pronto.",
    });
  }

  if (
    typeof name !== "string" ||
    typeof email !== "string" ||
    typeof phone !== "string" ||
    typeof message !== "string"
  ) {
    return res.status(400).json({
      error: "Revisa los datos ingresados e intenta nuevamente.",
      status: false,
    });
  }

  const contact = {
    name: name.trim(),
    email: email.trim().toLowerCase(),
    phone: phone.trim(),
    message: message.trim(),
  };

  if (!contact.name || !contact.email || !contact.phone) {
    return res.status(400).json({
      error: "Los campos nombre, correo y teléfono son obligatorios.",
      status: false,
    });
  }

  if (
    contact.name.length > 120 ||
    contact.email.length > 254 ||
    contact.phone.length > 40 ||
    contact.message.length > 5000
  ) {
    return res.status(400).json({
      error: "Alguno de los campos supera el largo permitido.",
      status: false,
    });
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const phoneRegex = /^[\d\s\-+().]{7,40}$/;

  if (!emailRegex.test(contact.email)) {
    return res.status(400).json({
      error: "El correo electrónico no es válido.",
      status: false,
    });
  }

  if (!phoneRegex.test(contact.phone)) {
    return res.status(400).json({
      error: "El teléfono no es válido.",
      status: false,
    });
  }

  if (!emailConfiguration) {
    return res.status(503).json({
      error:
        "El envío de correos todavía no está configurado. Contacta al administrador del sitio.",
      status: false,
    });
  }

  const messageLines = [
    "Nueva solicitud de contacto desde GymCross",
    "",
    `Nombre: ${contact.name}`,
    `Correo: ${contact.email}`,
    `Teléfono: ${contact.phone}`,
    "",
    "Mensaje:",
    contact.message || "(Sin mensaje adicional)",
  ];

  try {
    await sendContactEmail({
      from: emailConfiguration.from,
      to: emailConfiguration.to,
      replyTo: contact.email,
      subject: `Nueva solicitud de contacto: ${contact.name}`,
      text: messageLines.join("\n"),
    });

    return res.status(200).json({
      success: true,
      message: "¡Mensaje enviado correctamente! Te contactaremos pronto.",
    });
  } catch (error) {
    console.error("No se pudo enviar el correo de contacto:", {
      status: error.status,
      message: error.message,
    });
    return res.status(502).json({
      error:
        "No se pudo enviar el mensaje en este momento. Intenta nuevamente más tarde.",
      status: false,
    });
  }
});

app.use((error, req, res, next) => {
  if (error.message === "Origen no permitido por CORS.") {
    return res.status(403).json({ error: error.message });
  }

  if (error.type === "entity.too.large") {
    return res.status(413).json({ error: "La solicitud supera el tamaño permitido." });
  }

  if (error instanceof SyntaxError && "body" in error) {
    return res.status(400).json({ error: "El cuerpo de la solicitud no es JSON válido." });
  }

  console.error("Error del servidor:", error);
  return res.status(500).json({ error: "Ocurrió un error interno del servidor." });
});

const PORT = process.env.PORT || 3000;

if (require.main === module) {
  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Servidor GymCross disponible en http://localhost:${PORT}`);
    console.log(`CORS habilitado para: ${allowedOrigins.join(", ")}`);
    console.log(
      emailConfiguration
        ? `Envío por Resend configurado para ${emailConfiguration.to}`
        : "Envío pendiente: configura RESEND_API_KEY y CONTACT_TO en server/.env",
    );
  });
}

module.exports = app;
