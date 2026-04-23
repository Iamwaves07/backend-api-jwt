import jwt from "jsonwebtoken";
import { env } from "./env.js";

/**
 * Extrae y valida Bearer token.
 * Inyecta req.auth con datos de sesión: userId, email, tenantId, role
 */
export function authRequired(req, res, next) {
  const header = (req.headers.authorization || "").trim();

  // Permite: "Bearer <token>" con espacios extra
  const match = header.match(/^Bearer\s+(.+)$/i);
  if (!match) {
    return res.status(401).json({ error: "No autenticado" });
  }

  const token = match[1].trim();

  try {
    const payload = jwt.verify(token, env.JWT_SECRET);

    const userId = payload?.sub;
    if (!userId) {
      return res.status(401).json({ error: "Token inválido" });
    }

    req.auth = {
      userId,
      email: payload.email ?? null,
      tenantId: payload.tenantId ?? null,
      role: payload.role ?? "user",
    };

    return next();
  } catch (err) {
    // Mensaje simple y estándar
    // Si quieres diferenciar expirado:
    // if (err?.name === "TokenExpiredError") ...
    return res.status(401).json({ error: "Token inválido" });
  }
}

/**
 * Si la ruta requiere tenantId (cuando actives multiempresa)
 */
export function tenantRequired(req, res, next) {
  if (!req.auth) return res.status(401).json({ error: "No autenticado" });
  if (!req.auth.tenantId) {
    return res.status(400).json({ error: "Tenant no definido" });
  }
  next();
}

/**
 * Autorización por roles.
 * Nota: por defecto, admin pasa siempre.
 */
export function requireRole(...roles) {
  return (req, res, next) => {
    if (!req.auth) return res.status(401).json({ error: "No autenticado" });

    // Override admin
    if (req.auth.role === "admin") return next();

    if (!roles.includes(req.auth.role)) {
      return res.status(403).json({ error: "No autorizado" });
    }

    next();
  };
}
