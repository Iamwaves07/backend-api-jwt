# Sistema Fullstack con Autenticación JWT 🔐

Proyecto fullstack desarrollado para implementar autenticación segura y una arquitectura base escalable con separación entre backend y frontend.

---

## 🚀 Características

- Registro y login de usuarios
- Autenticación basada en JWT (stateless)
- Middleware de protección de rutas
- Validación de datos
- Sistema preparado para multi-tenant (usuarios con roles y tenantId)
- Frontend en React conectado a API
- Pruebas del flujo completo de autenticación

---

## 🛠️ Tecnologías utilizadas

### Backend
- Node.js
- Express
- Prisma ORM
- SQLite
- JSON Web Token (JWT)
- Zod (validación)

### Frontend
- React
- Vite
- JavaScript (ES6+)
- Fetch API

---

## 🔐 Seguridad implementada

- Hash de contraseñas con bcrypt
- Rate limiting en endpoint de login
- Headers de seguridad con Helmet
- Configuración de CORS restringida

---

## 📌 Endpoints principales

- `POST /auth/login` → autenticación de usuario
- `GET /auth/me` → obtener información del usuario autenticado

---

## 🖥️ Estructura del proyecto
proyecto-empresa/
├── backend/
└── frontend/

---

## ⚙️ Cómo ejecutar el proyecto

### Backend

```bash
cd backend
npm install
node src/server.js


cd frontend
npm install
npm run dev

📚 Objetivo del proyecto

Este proyecto fue desarrollado como base para:

Sistemas de gestión
Aplicaciones multiempresa
Arquitecturas fullstack modernas