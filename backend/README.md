Este backend corresponde a una API en Node.js + Express + Prisma + SQLite, con un sistema de autenticación por JWT preparado para escalar a multiempresa (tenants).

Incluye:

Login con email y contraseña

Generación de token JWT

Middleware de autenticación

Script automatizado para probar el flujo completo de auth

🧱 Estructura del proyecto
backend/
├─ src/
│  ├─ app.js              # Configuración de Express (middlewares + rutas)
│  ├─ server.js           # Arranque del servidor
│  ├─ routes/
│  │  └─ auth.routes.js   # Rutas de autenticación
│  └─ lib/
│     ├─ prisma.js        # Cliente Prisma
│     ├─ env.js           # Variables de entorno (Zod)
│     └─ middleware.js   # Middleware de autenticación (JWT)
│
├─ prisma/
│  ├─ schema.prisma
│  └─ seed.js
│
├─ scripts/
│  └─ test-auth.ps1       # Script PowerShell para probar auth
│
├─ package.json
└─ README.md

🔐 Autenticación (concepto general)
1️⃣ Login

El usuario se autentica enviando:

{
  "email": "admin@local.cl",
  "password": "Admin1234!"
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

2️⃣ Requests protegidas

Para acceder a rutas protegidas, el cliente debe enviar el token en el header:

Authorization: Bearer <TOKEN>


El middleware:

Valida el token

Verifica la firma y expiración

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
ADMIN_EMAIL=admin@local.cl
ADMIN_PASSWORD=Admin1234!
ADMIN_NAME=Admin


Las variables se validan al iniciar la app usando Zod (src/lib/env.js).

🧪 Scripts de prueba (muy importante)
¿Para qué sirven?

Evitan:

Copiar tokens a mano

Ejecutar comandos largos

Errores humanos

Permiten validar rápidamente si la autenticación funciona.

Script: scripts/test-auth.ps1

Este script:

Prueba /health

Hace login

Guarda el token en memoria

Llama a /auth/me con el token

Ejecutar pruebas de auth
Terminal 1 (levantar backend)
npm run dev

Terminal 2 (probar auth)
npm run test:auth


Salida esperada:

==> Probando /health
==> Login
OK: Token recibido
==> Probando /auth/me
OK: Flujo AUTH

📦 Scripts disponibles (npm)

En package.json:

"scripts": {
  "dev": "nodemon src/server.js",
  "test:auth": "powershell -ExecutionPolicy Bypass -File .\\scripts\\test-auth.ps1"
}

🧠 Notas importantes (junior friendly)

El token reemplaza a la contraseña

Nunca copies un token a mano

El backend no mantiene sesiones

El token se valida en cada request

Siempre usa scripts para probar flujos críticos
El script test-auth prueba el flujo completo de autenticación