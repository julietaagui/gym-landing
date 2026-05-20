# 🚀 Landing GymCross - Documentación

## Estado Actual

✅ **Frontend completado:**
- Header con navegación
- Sección Hero con imágenes
- Sección de Problemas
- Sección de Características/Funcionalidades
- Sección de Beneficios con acordeón
- Sección de Contacto con formulario
- Footer
- Estilos responsive y modernos
- Animaciones e interactividad

✅ **Backend mejorado:**
- API de contactos con validaciones
- Almacenamiento en memoria
- Endpoint para obtener contactos
- Endpoint para actualizar estado

---

## ❓ PREGUNTAS IMPORTANTES

### Frontend
1. **¿Qué foto irá en la sección de Features (Características)?**
   - Actualmente hay un placeholder. ¿Es una captura de la plataforma? ¿Una foto de ejemplo?

2. **¿Quieres agregar más secciones?**
   - Testimonios de clientes
   - Galería de fotos
   - Precios/Planes
   - Team

3. **¿El sitio necesita un blog o sección de recursos?**

### Backend
1. **¿Cómo quieres guardar los contactos?**
   - Actualmente están en memoria (se pierden al reiniciar)
   - ¿Necesitas una base de datos? (MongoDB, PostgreSQL, etc.)

2. **¿Quieres enviar emails cuando se recibe un contacto?**
   - Correo al administrador
   - Confirmación al usuario
   - ¿Qué servicio: Gmail, SendGrid, Resend?

3. **¿Necesitas autenticación/admin panel?**
   - Para ver y gestionar contactos
   - Para actualizar contenido de la landing

4. **¿Hay validaciones adicionales que necesites?**
   - Verificar que el email no sea spam
   - Limitar intentos por IP
   - CAPTCHA

### General
1. **¿Necesitas integración con algo?**
   - Calendario/Reservas
   - Pasarela de pagos
   - CRM
   - WhatsApp Business

2. **¿Cuál es el dominio final?**
   - Para configurar CORS y URLs correctamente

3. **¿Qué planes de hosting/deploy tienes en mente?**
   - Vercel, Netlify, etc.

---

## 📋 CÓMO EJECUTAR

### Frontend
```bash
cd client
npm install  # Si es primera vez
npm run dev  # Ejecutar desarrollo
```
Acceder en: `http://localhost:5173`

### Backend
```bash
cd server
npm install  # Si es primera vez
npm run dev  # Ejecutar con nodemon
```
Acceder en: `http://localhost:3000`

### Variables de entorno

**Server (.env)**
```
PORT=3000
FRONTEND_URL=http://localhost:5173
# Próximamente:
# EMAIL_SERVICE=gmail
# EMAIL_USER=tu@email.com
# EMAIL_PASSWORD=tu_contraseña
```

---

## 🎨 Personalizaciones que puedes hacer ahora

1. **Cambiar colores:**
   - Editar variables CSS en `App.css` (líneas 1-8)
   - `--primary-color`, `--accent-color`, etc.

2. **Cambiar contenido:**
   - Modificar textos en cada componente
   - Cambiar número de problemas/beneficios

3. **Agregar tu logo:**
   - Reemplazar "GymCross" en Header

4. **Cambiar imágenes:**
   - Las 4 imágenes del hero ya están cargadas
   - Simplemente reemplaza en `client/src/assets/`

---

## 📁 Estructura de archivos

```
client/
├── src/
│   ├── components/      # Componentes React
│   │   ├── Header.jsx
│   │   ├── Hero.jsx
│   │   ├── Problems.jsx
│   │   ├── Features.jsx
│   │   ├── Benefits.jsx
│   │   ├── Contact.jsx
│   │   └── Footer.jsx
│   ├── api/             # Llamadas a API
│   ├── assets/          # Imágenes
│   ├── App.jsx          # Componente principal
│   └── App.css          # Estilos
└── package.json

server/
├── src/
│   └── app.js           # Servidor Express
└── package.json
```

---

## ✨ Próximas características sugeridas

- [ ] Base de datos para contactos
- [ ] Envío de emails
- [ ] Admin panel para ver contactos
- [ ] Página de políticas/términos
- [ ] Sección de precios
- [ ] Testimonios
- [ ] Chat en vivo o bot
- [ ] Newsletter/Suscripción
- [ ] Integración con Google Analytics
- [ ] Integración con Calendly para demos

---

## 🐛 Conocidos/TODO

- [ ] El placeholder de Features necesita una imagen real
- [ ] Implementar persistencia en base de datos
- [ ] Agregar logística de emails
- [ ] Implementar autenticación
- [ ] Agregar loader global
- [ ] Mejorar validaciones de formulario

---

**¿Qué quieres hacer primero?**
