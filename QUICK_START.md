# ⚡ GUÍA RÁPIDA - GYMCROSS LANDING

## 🎯 Start Rápido

**Abrir 2 terminales:**

```bash
# Terminal 1 - Backend
cd c:\Dev\gym-landing\server
npm run dev
→ http://localhost:3000

# Terminal 2 - Frontend  
cd c:\Dev\gym-landing\client
npm run dev
→ http://localhost:5174
```

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

### Ver todos los contactos en terminal
```bash
curl http://localhost:3000/api/contacts
```

### Ver un contacto específico (reemplazar 123 por ID)
```bash
curl http://localhost:3000/api/contacts/123
```

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
→ Backend se reinició. Espera 2 segundos y reintenta.

**Error: Cannot find module**
→ Asegúrate de estar en el directorio correcto antes de `npm run dev`

**El formulario no envía**
→ Abre DevTools (F12) → Console → Verifica errores

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
| POST | `/contact` | Enviar contacto |
| GET | `/api/contacts` | Listar todos |
| GET | `/api/contacts/:id` | Detalles |
| PUT | `/api/contacts/:id` | Actualizar |

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
- [ ] Implementar envío de emails
- [ ] Crear admin panel
- [ ] Deploy a producción
- [ ] Más secciones (blog, precios, etc.)

---

**Nota:** Este es tu proyecto. Personaliza todo según tus necesidades. 🎉
