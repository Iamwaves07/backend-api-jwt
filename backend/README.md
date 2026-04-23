# Backend - API de Autenticación JWT 🔐

API backend desarrollada con Node.js, Express, Prisma y SQLite, con un sistema de autenticación basado en JWT preparado para escalar a multiempresa (multi-tenant).

---

## 🚀 Funcionalidades

- Login con email y contraseña
- Generación de token JWT
- Middleware de autenticación
- Protección de rutas
- Script automatizado para probar el flujo completo de autenticación

---

## 🧱 Estructura del proyecto

backend/
├─ src/
│  ├─ app.js
│  ├─ server.js
│  ├─ routes/
│  │  └─ auth.routes.js
│  └─ lib/
│     ├─ prisma.js
│     ├─ env.js
│     └─ auth.middleware.js
│
├─ prisma/
│  ├─ schema.prisma
│  └─ seed.js
│
├─ scripts/
│  └─ test-auth.ps1
│
├─ package.json
└─ README.md

---

## 🔐 Autenticación

### Login

El usuario se autentica enviando:

```json
{
  "email": "admin@example.com",
  "password": "CHANGE_ME"
}
Ruta:

POST /auth/login

Si las credenciales son correctas:

Se genera un token JWT
El token contiene:
userId
email
tenantId
role
El token NO se guarda en la base de datos
Requests protegidas

Para acceder a rutas protegidas, el cliente debe enviar el token en el header:

Authorization: Bearer <TOKEN>

El middleware:

Valida el token
Verifica firma y expiración
Inyecta req.auth con los datos de sesión

Ejemplo:

req.auth = {
  userId,
  email,
  tenantId,
  role
};
🛡️ Rutas de autenticación

POST /auth/login
Autentica usuario y devuelve token.

GET /auth/me
Ruta protegida. Devuelve:

Información del usuario
Información de sesión (tenantId, role)
⚙️ Variables de entorno

El archivo .env debe contener:

DATABASE_URL=...
JWT_SECRET=...

Las variables se validan al iniciar la app usando Zod (src/lib/env.js).

🧪 Scripts de prueba
¿Para qué sirven?

Permiten validar rápidamente el flujo completo de autenticación y evitar errores manuales.

Script principal

scripts/test-auth.ps1

Este script:

Prueba /health
Hace login
Guarda el token en memoria
Llama a /auth/me con el token
▶️ Ejecución
Terminal 1
npm run dev
Terminal 2
npm run test:auth
✅ Salida esperada

==> Probando /health
==> Login
OK: Token recibido
==> Probando /auth/me
OK: Flujo AUTH

📦 Scripts disponibles
"scripts": {
  "dev": "nodemon src/server.js",
  "test:auth": "powershell -ExecutionPolicy Bypass -File .\\scripts\\test-auth.ps1"
}
🧠 Notas importantes
El token reemplaza a la contraseña
El backend no mantiene sesiones
El token se valida en cada request
Usa scripts para probar flujos críticos
