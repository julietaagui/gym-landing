const express = require("express");
const cors = require("cors");
const nodemailer = require("nodemailer");
const path = require("path");
require("dotenv").config({ path: path.join(__dirname, "../.env") });

const app = express();

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

function getEmailConfiguration() {
  const { SMTP_HOST, SMTP_USER, SMTP_PASS, CONTACT_TO } = process.env;
  const port = Number(process.env.SMTP_PORT || 587);
  const from = process.env.MAIL_FROM || SMTP_USER;

  if (!SMTP_HOST || !SMTP_USER || !SMTP_PASS || !CONTACT_TO || !from) {
    return null;
  }

  if (!Number.isInteger(port) || port < 1 || port > 65535) {
    return null;
  }

  return {
    host: SMTP_HOST,
    port,
    secure: process.env.SMTP_SECURE === "true" || port === 465,
    auth: { user: SMTP_USER, pass: SMTP_PASS },
    from,
    to: CONTACT_TO,
  };
}

const emailConfiguration = getEmailConfiguration();
const mailer = emailConfiguration
  ? nodemailer.createTransport({
      host: emailConfiguration.host,
      port: emailConfiguration.port,
      secure: emailConfiguration.secure,
      auth: emailConfiguration.auth,
      connectionTimeout: 10000,
      greetingTimeout: 10000,
      socketTimeout: 20000,
    })
  : null;

app.get("/", (req, res) => {
  res.json({ message: "Backend de GymCross funcionando correctamente" });
});

app.get("/api/health", async (req, res) => {
  let emailStatus = "not_configured";

  if (mailer) {
    try {
      await mailer.verify();
      emailStatus = "ready";
    } catch (error) {
      emailStatus = "unavailable";
      console.error("No se pudo verificar la conexión SMTP:", error.message);
    }
  }

  res.json({
    status: "ok",
    emailConfigured: Boolean(mailer),
    emailStatus,
  });
});

app.post("/contact", async (req, res) => {
  const { name, email, phone, message = "" } = req.body || {};

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

  if (!mailer || !emailConfiguration) {
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
    await mailer.sendMail({
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
    console.error("No se pudo enviar el correo de contacto:", error);
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
      mailer
        ? `Envío SMTP configurado para ${emailConfiguration.to}`
        : "Envío SMTP pendiente: configura SMTP_* y CONTACT_TO en server/.env",
    );
  });
}

module.exports = app;
