const express = require("express");
const cors = require("cors");
require("dotenv").config();

const app = express();

// Middleware
const corsOptions = {
  origin: function (origin, callback) {
    // En desarrollo, permitir localhost en cualquier puerto
    if (!origin || origin.includes('localhost') || origin.includes('127.0.0.1')) {
      callback(null, true);
    } else {
      // En producción, validar contra FRONTEND_URL
      const allowedOrigin = process.env.FRONTEND_URL || "http://localhost:5173";
      if (origin === allowedOrigin) {
        callback(null, true);
      } else {
        callback(new Error('Not allowed by CORS'));
      }
    }
  },
};

app.use(cors(corsOptions));

app.use(express.json());

// Base de datos en memoria (para demostración)
let contacts = [];

// Rutas
app.get("/", (req, res) => {
  res.json({ message: "Backend de GymCross funcionando correctamente" });
});

// Obtener todos los contactos (para admin)
app.get("/api/contacts", (req, res) => {
  // TODO: Agregar autenticación aquí
  res.json({ contacts, total: contacts.length });
});

// Enviar formulario de contacto
app.post("/contact", (req, res) => {
  const { name, email, phone, message } = req.body;

  // Validaciones
  if (!name || !email || !phone) {
    return res.status(400).json({
      error: "Los campos nombre, correo y teléfono son obligatorios.",
      status: false,
    });
  }

  // Validar formato de email
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return res.status(400).json({
      error: "El correo electrónico no es válido.",
      status: false,
    });
  }

  // Validar formato de teléfono (básico)
  const phoneRegex = /^[\d\s\-\+\(\)]{7,}$/;
  if (!phoneRegex.test(phone)) {
    return res.status(400).json({
      error: "El teléfono no es válido.",
      status: false,
    });
  }

  // Crear objeto de contacto
  const newContact = {
    id: Date.now(),
    name: name.trim(),
    email: email.trim().toLowerCase(),
    phone: phone.trim(),
    message: message ? message.trim() : "",
    createdAt: new Date().toISOString(),
    status: "nuevo",
  };

  // Guardar en memoria
  contacts.push(newContact);

  // TODO: Implementar envío de email
  console.log("📧 Nuevo contacto recibido:", newContact);

  return res.status(200).json({
    success: true,
    message: "¡Mensaje recibido correctamente! Te contactaremos pronto.",
    contactId: newContact.id,
  });
});

// Endpoint para obtener un contacto específico
app.get("/api/contacts/:id", (req, res) => {
  // TODO: Agregar autenticación
  const contact = contacts.find((c) => c.id === parseInt(req.params.id));

  if (!contact) {
    return res.status(404).json({
      error: "Contacto no encontrado.",
      status: false,
    });
  }

  res.json(contact);
});

// Endpoint para actualizar estado de contacto
app.put("/api/contacts/:id", (req, res) => {
  // TODO: Agregar autenticación
  const { status } = req.body;
  const contact = contacts.find((c) => c.id === parseInt(req.params.id));

  if (!contact) {
    return res.status(404).json({
      error: "Contacto no encontrado.",
      status: false,
    });
  }

  contact.status = status || contact.status;
  contact.updatedAt = new Date().toISOString();

  res.json({
    success: true,
    message: "Contacto actualizado.",
    contact,
  });
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`\n🚀 Servidor GymCross corriendo en puerto ${PORT}`);
  console.log(`📍 URL: http://localhost:${PORT}`);
  console.log(`🔗 CORS habilitado para: ${process.env.FRONTEND_URL || "http://localhost:5173"}\n`);
});