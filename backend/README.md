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

```text
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


## Parte 2

```markdown
### Requests protegidas

Para acceder a rutas protegidas, el cliente debe enviar el token en el header:

```text
Authorization: Bearer <TOKEN>


## Parte 3

```markdown
## 🧪 Scripts de prueba

### ¿Para qué sirven?

Los scripts permiten validar rápidamente el flujo completo de autenticación y ayudan a evitar errores manuales.

### Script principal

`scripts/test-auth.ps1`

Este script:

- prueba `/health`
- hace login
- guarda el token en memoria
- llama a `/auth/me` con el token

---

## ▶️ Ejecución

### Terminal 1

```bash
npm run dev