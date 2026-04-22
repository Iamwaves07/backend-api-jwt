# Backend API con Autenticación JWT 🔐

API backend desarrollada como proyecto personal para implementar autenticación segura y estructura base de una aplicación escalable.

## 🚀 Características

- Registro y login de usuarios
- Autenticación basada en JWT (stateless)
- Middleware de protección de rutas
- Validación de datos
- Sistema preparado para multi-tenant (usuarios con roles y tenantId)
- Pruebas del flujo completo de autenticación

## 🛠️ Tecnologías utilizadas

- Node.js
- Express
- Prisma ORM
- SQLite
- JSON Web Token (JWT)
- Zod (validación)

## 🔐 Seguridad implementada

- Hash de contraseñas con bcrypt
- Rate limiting en endpoint de login
- Headers de seguridad con Helmet
- Configuración de CORS restringida

## 📌 Endpoints principales

- `POST /auth/login` → autenticación de usuario
- `GET /auth/me` → obtener información del usuario autenticado

## ⚙️ Cómo ejecutar el proyecto

```bash
npm install
node src/server.js
