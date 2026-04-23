import jwt from "jsonwebtoken";
import { env } from "./env.js";

export function signToken(payload) {
  return jwt.sign(payload, env.JWT_SECRET, { expiresIn: "8h" });
}

export function authRequired(req, res, next) {
  const header = req.headers.authorization || "";
  const [type, token] = header.split(" ");

  if (type !== "Bearer" || !token) {
    return res.status(401).json({ error: "No autenticado" });
  }

  try {
    req.user = jwt.verify(token, env.JWT_SECRET);
    return next();
  } catch {
    return res.status(401).json({ error: "Token inválido" });
  }
}
