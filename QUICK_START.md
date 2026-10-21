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
2. Completa `SMTP_HOST`, `SMTP_PORT`, `SMTP_SECURE`, `SMTP_USER`, `SMTP_PASS`, `MAIL_FROM` y `CONTACT_TO` con los datos de tu proveedor de correo.
3. En Gmail usa una contraseña de aplicación para `SMTP_PASS`; no uses la contraseña normal de la cuenta.
4. Configura `FRONTEND_URL` con el origen del frontend. Para varios dominios, sepáralos con comas.
5. En `client/.env` configura `VITE_API_URL=http://localhost:3000` para desarrollo. En producción usa la URL pública del backend.
6. Reinicia ambos servidores después de cambiar variables de entorno.

El endpoint `GET http://localhost:3000/api/health` informa si el backend arrancó y si las credenciales SMTP están configuradas. El formulario envía una notificación al correo indicado en `CONTACT_TO`.

El formulario limita a 5 envíos por IP cada 15 minutos y usa un campo trampa para bots. El contador está en memoria por instancia; si escalas el backend a varias instancias, cambia a un almacén compartido.

## 🚀 Deploy

La configuración lista para publicar es Vercel (`client/`) + Render (`server/`):

1. Conecta el repositorio en Vercel y selecciona `client` como directorio raíz.
2. En Render, crea un Blueprint usando el `render.yaml` de la raíz. El archivo selecciona el plan pago `0.5c-512mb`; revisa el precio antes de crear el servicio.
3. Configura en Render `FRONTEND_URL` con el dominio de Vercel y agrega los valores SMTP en sus variables privadas.
4. Agrega `VITE_API_URL` en Vercel con el dominio de la API de Render y vuelve a desplegar el frontend. El build falla si falta esta variable o apunta a localhost.
5. Revisa `/healthz` para el estado del servidor y `/api/health` para comprobar que SMTP responda.

Render bloquea SMTP saliente en sus servicios gratuitos. El plan seleccionado en `render.yaml` permite mantener Gmail SMTP; los servicios gratis pueden dormirse y no son ideales para producción.

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
→ Comprueba `VITE_API_URL` en Vercel, `/api/health` en la API y las credenciales SMTP configuradas en Render.

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
| GET | `/api/health` | Estado de la API y configuración SMTP |
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
