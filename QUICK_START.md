# Guía rápida - GymCross Landing

## 🎯 Start Rápido

**Abrir 2 terminales:**

En una terminal, inicia el backend desde `server`:

```bash
cd C:\Dev\Gymcross\gym-landing\server
npm install
npm run dev
```

En otra terminal, inicia el frontend desde `client`:

```bash
cd C:\Dev\Gymcross\gym-landing\client
npm install
npm run dev
```

Vite muestra la URL local en la terminal, normalmente `http://localhost:5173`.

## 📧 Configurar el envío de correos

1. Copia `server/.env.example` a `server/.env`.
2. Completa `RESEND_API_KEY`, `MAIL_FROM` y `CONTACT_TO`.
3. Crea la API key en el panel de Resend y guárdala como secreto; no la publiques en el repositorio.
4. Para pruebas, usa `GymCross <onboarding@resend.dev>` como remitente y configura `CONTACT_TO` con el email verificado de tu cuenta Resend. Para enviar desde tu propio dominio, verifica ese dominio en Resend y actualiza `MAIL_FROM`.
5. Configura `FRONTEND_URL` con el origen del frontend. Para varios dominios, sepáralos con comas.
6. En `client/.env` configura `VITE_API_URL=http://localhost:3000` para desarrollo. En producción usa la URL pública del backend.
7. Reinicia ambos servidores después de cambiar variables de entorno.

El endpoint `GET http://localhost:3000/api/health` informa si el backend arrancó y si están definidas las variables de Resend. La validez de la clave y el remitente se confirma al enviar el formulario, que manda una notificación a `CONTACT_TO`.

El formulario limita a 5 envíos por IP cada 15 minutos y usa un campo trampa para bots. El contador está en memoria por instancia; si escalas el backend a varias instancias, cambia a un almacén compartido.

## 🚀 Deploy

La configuración lista para publicar es Vercel (`client/`) + Render (`server/`):

1. Conecta el repositorio en Vercel y selecciona `client` como directorio raíz.
2. En Render, crea un Blueprint usando el `render.yaml` de la raíz, o configura el servicio manualmente con `server/`, `npm ci` y `npm start`.
3. Configura en Render `FRONTEND_URL` con el dominio de Vercel y agrega `RESEND_API_KEY`, `MAIL_FROM` y `CONTACT_TO` como variables privadas.
4. Agrega `VITE_API_URL` en Vercel con el dominio de la API de Render y vuelve a desplegar el frontend. El build falla si falta esta variable o apunta a localhost.
5. Revisa `/healthz` para el estado del servidor y `/api/health` para confirmar que las variables de correo estén configuradas. Envía una consulta de prueba para comprobar la API key y el remitente.

El backend envía correo con la API HTTPS de Resend, compatible con la salida de red de Render Free. El servicio gratuito de Render puede dormirse tras 15 minutos sin tráfico. El remitente de prueba de Resend solo puede enviar a la dirección verificada de la cuenta; para enviar desde un dominio propio, verifica ese dominio en Resend.

---

## 📝 Cambios más comunes

### Cambiar el logo/nombre
**Archivo:** [Header.jsx](client/src/components/Header.jsx#L15)
```jsx
<h2>GymCross</h2>  // ← Cambiar aquí
```

### Cambiar título principal
**Archivo:** [Hero.jsx](client/src/components/Hero.jsx#L8)
```jsx
<h1>Todo el control de tu gimnasio, en un solo lugar</h1>  // ← Cambiar
```

### Cambiar colores
**Archivo:** [App.css](client/src/App.css#L1-L8)
```css
:root {
  --primary-color: #1a1a2e;    // Azul oscuro
  --accent-color: #00d4ff;     // Cian
  /* ... editar aquí ... */
}
```

### Cambiar problemas listados
**Archivo:** [Problems.jsx](client/src/components/Problems.jsx#L4-L19)
```jsx
const problems = [
  {
    id: 1,
    title: "Clientes desorganizados",  // Cambiar
    description: "Sin un control claro",  // Cambiar
    icon: "👥",  // Cambiar emoji
  },
  // ... más items
];
```

### Cambiar beneficios
**Archivo:** [Benefits.jsx](client/src/components/Benefits.jsx#L6-L33)
```jsx
const benefits = [
  {
    id: 0,
    title: "Mejora ROI",  // Cambiar
    description: "Incrementa tus ingresos...",  // Cambiar
  },
  // ... más items
];
```

---

## 🧰 Tareas útiles

### Probar formulario con curl
```bash
curl -X POST http://localhost:3000/contact \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test",
    "email": "test@test.com",
    "phone": "+34 91 123 45 67",
    "message": "Mensaje de prueba"
  }'
```

---

## 🔧 Solucionar errores comunes

**Error: Port 5173 already in use**
→ Vite automáticamente usa 5174. No hay problema.

**Error: CORS policy blocked**
→ Verifica que `FRONTEND_URL` en Render contenga exactamente el dominio del sitio publicado.

**Error: Cannot find module**
→ Asegúrate de estar en el directorio correcto antes de `npm run dev`

**El formulario no envía**
→ Comprueba `VITE_API_URL` en Vercel, `/api/health` en la API y `RESEND_API_KEY`, `MAIL_FROM` y `CONTACT_TO` en Render. Con `onboarding@resend.dev`, `CONTACT_TO` debe ser el email verificado de la cuenta Resend.

---

## 📦 Build para producción

### Frontend
```bash
cd client
npm run build
```
→ Crea carpeta `dist/` lista para hostear

### Backend
```bash
cd server
npm start
```
→ Inicia sin nodemon (más rápido)

---

## 🎨 Paleta de colores actual

```
🔵 Primario: #1a1a2e (Azul oscuro)
🩵 Secundario: #16213e (Azul medio)
🔷 Acento: #00d4ff (Cian brillante)
⚪ Texto claro: #ffffff
⚫ Texto oscuro: #666666
```

Para cambiar: Edita variables en `App.css` líneas 1-8

---

## 📞 Endpoints Backend

| Método | Ruta | Descripción |
|--------|------|-------------|
| GET | `/` | Health check |
| GET | `/api/health` | Estado de la API y configuración de Resend |
| POST | `/contact` | Enviar formulario de contacto por email |

---

## 📁 Archivos importantes

```
Componentes: client/src/components/
Estilos: client/src/App.css
Imágenes: client/src/assets/
Backend: server/src/app.js
APIs: client/src/api/
```

---

## 💾 Guardar cambios

**Los cambios automáticos en desarrollo:**
- React + Vite: Guardar archivo → Se recarga automático
- Backend + Nodemon: Guardar archivo → Se reinicia automático

---

## 🚀 Próximos pasos

- [ ] Agregar base de datos
- [x] Implementar envío de emails
- [ ] Crear admin panel
- [ ] Deploy a producción
- [ ] Más secciones (blog, precios, etc.)

---

**Nota:** Este es tu proyecto. Personaliza todo según tus necesidades. 🎉
