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

✅ **Backend:**
- API para recibir y validar el formulario de contacto
- Notificación por email mediante SMTP configurable
- Health check para comprobar el estado del servicio y SMTP

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
1. **¿Necesitas autenticación/admin panel?**
   - Para ver y gestionar contactos
   - Para actualizar contenido de la landing

2. **¿Hay validaciones adicionales que necesites?**
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

Usa `server/.env.example` como base para `server/.env` y completa los datos SMTP del proveedor de correo:

```
PORT=3000
FRONTEND_URL=http://localhost:5173
SMTP_HOST=smtp.gmail.com
SMTP_PORT=465
SMTP_SECURE=true
SMTP_USER=tu-cuenta@gmail.com
SMTP_PASS=tu-contraseña-de-aplicación
MAIL_FROM=tu-cuenta@gmail.com
CONTACT_TO=destino@gmail.com
```

Para Gmail, usa una contraseña de aplicación, no la contraseña normal. No publiques las credenciales. El frontend toma la URL del backend de `VITE_API_URL`; `client/.env.example` incluye el valor local.

`GET /api/health` informa si el servidor está activo y si SMTP está configurado. `POST /contact` manda la solicitud a `CONTACT_TO`.

---

## 🚀 Preparar el deploy

La configuración del repositorio usa **Vercel para el frontend** (`client/`) y **Render para la API** (`server/`).

1. Importa el repositorio de GitHub en Vercel y configura `client` como **Root Directory**. El archivo `client/vercel.json` define instalación, build y salida.
2. Obtén el dominio de producción de Vercel, por ejemplo `https://gymcross.vercel.app`.
3. En Render, crea un Blueprint desde este repositorio usando `render.yaml`. Configura `FRONTEND_URL` con el dominio de Vercel y completa `SMTP_USER`, `SMTP_PASS`, `MAIL_FROM` y `CONTACT_TO` en el panel de Render; no guardes credenciales en GitHub.
4. Copia el dominio público de la API de Render y agrégalo en Vercel como `VITE_API_URL`, por ejemplo `https://gymcross-api.onrender.com`. Vuelve a desplegar el frontend para que tome la variable.
5. Comprueba `https://<api-render>/api/health`; debe responder con `emailStatus: "ready"` cuando el SMTP esté accesible.

**Correo con Gmail:** los servicios gratuitos de Render bloquean el tráfico SMTP saliente en los puertos 25, 465 y 587. Para mantener Gmail SMTP, el backend necesita un plan de Render que permita esos puertos. Como alternativa, se puede cambiar el envío a una API HTTPS de correo. [Limitaciones del plan gratuito de Render](https://render.com/docs/free).

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
- [x] Envío de emails por SMTP
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
- [ ] Implementar autenticación
- [ ] Agregar loader global
- [ ] Mejorar validaciones de formulario

---

**¿Qué quieres hacer primero?**
