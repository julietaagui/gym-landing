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
- Notificación por email mediante la API HTTPS de Resend
- Health check para comprobar el estado del servicio y la API de correo

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

Usa `server/.env.example` como base para `server/.env` y completa las variables de Resend:

```
PORT=3000
FRONTEND_URL=http://localhost:5173
RESEND_API_KEY=re_tu_clave_de_api
MAIL_FROM=GymCross <onboarding@resend.dev>
CONTACT_TO=destino@gmail.com
```

La clave se crea en el panel de Resend y debe guardarse como secreto, nunca en GitHub. `onboarding@resend.dev` sirve para pruebas que llegan al email verificado de la cuenta Resend. Para enviar desde una dirección propia, verifica un dominio en Resend y configura `MAIL_FROM` con una dirección de ese dominio. El frontend toma la URL del backend de `VITE_API_URL`; `client/.env.example` incluye el valor local.

`GET /api/health` informa si el servidor está activo y si están definidas las variables necesarias para Resend. `POST /contact` manda la solicitud a `CONTACT_TO`; la validez de la clave y el remitente se confirma al enviar.

El formulario limita a 5 envíos por IP cada 15 minutos e incluye un campo trampa para bots. El contador se guarda en memoria en cada instancia; si Render escala a varias instancias, configura un almacén compartido para aplicar el mismo límite en todas.

---

## 🚀 Preparar el deploy

La configuración del repositorio usa **Vercel para el frontend** (`client/`) y **Render para la API** (`server/`).

1. Importa el repositorio de GitHub en Vercel y configura `client` como **Root Directory**. El archivo `client/vercel.json` define instalación, build y salida.
2. Obtén el dominio de producción de Vercel, por ejemplo `https://gymcross.vercel.app`.
3. En Render, crea un Blueprint desde este repositorio usando `render.yaml`, o configura el servicio manualmente con `server/`, `npm ci` y `npm start`.
4. Configura `FRONTEND_URL` con el dominio de Vercel y completa `RESEND_API_KEY`, `MAIL_FROM` y `CONTACT_TO` en el panel de Render; no guardes credenciales en GitHub.
5. Copia el dominio público de la API de Render y agrégalo en Vercel como `VITE_API_URL`, por ejemplo `https://gymcross-api.onrender.com`. La compilación de producción falla si falta esta URL o apunta a localhost.
6. Comprueba `https://<api-render>/healthz` para el estado del servicio y `https://<api-render>/api/health` para confirmar la configuración; debe responder con `emailStatus: "configured"`. Envía un formulario de prueba para comprobar la clave y el remitente.

**Correo con Resend:** el backend usa la API HTTPS de Resend, así que no depende de los puertos SMTP bloqueados en Render Free. El servicio gratuito de Render puede dormir tras 15 minutos sin tráfico y tardar en despertar. El remitente de prueba `onboarding@resend.dev` solo permite enviar a la dirección verificada de la cuenta Resend; para otros destinatarios o un remitente propio, verifica un dominio. [Limitaciones de Render Free](https://render.com/docs/free) · [Enviar emails con Resend](https://resend.com/express).

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
- [x] Envío de emails por API HTTPS
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
- [x] Limitar envíos del formulario y agregar campo trampa antispam
- [ ] Agregar loader global
- [ ] Mejorar validaciones de formulario

---

**¿Qué quieres hacer primero?**
