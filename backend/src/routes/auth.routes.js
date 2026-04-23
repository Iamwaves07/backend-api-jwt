import { Router } from "express";
import bcrypt from "bcryptjs";
import { z } from "zod";
import jwt from "jsonwebtoken";

import { prisma } from "../lib/prisma.js";
import { env } from "../lib/env.js";
import { authRequired } from "../lib/auth.middleware.js"; // <-- ajusta si tu archivo tiene otro nombre

export const authRoutes = Router();

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

// POST /auth/login
authRoutes.post("/login", async (req, res) => {
  const parsed = loginSchema.safeParse(req.body);
  if (!parsed.success) {
    return res.status(400).json({
      error: "Datos inválidos",
      details: parsed.error.flatten(),
    });
  }

  const { email, password } = parsed.data;

  const user = await prisma.user.findUnique({
    where: { email },
    include: { tenants: true }, // UserTenant[]
  });

  if (!user || !user.isActive) {
    return res.status(401).json({ error: "Credenciales inválidas" });
  }

  const ok = await bcrypt.compare(password, user.passwordHash);
  if (!ok) {
    return res.status(401).json({ error: "Credenciales inválidas" });
  }

  // Single-tenant hoy: usamos la primera relación
  const rel = user.tenants?.[0] ?? null;

  const token = jwt.sign(
    {
      sub: user.id,
      email: user.email,
      tenantId: rel?.tenantId ?? null,
      role: rel?.role ?? "user",
    },
    env.JWT_SECRET,
    { expiresIn: "8h" }
  );

  return res.json({
    token,
    user: { id: user.id, email: user.email, name: user.name },
    session: { tenantId: rel?.tenantId ?? null, role: rel?.role ?? "user" },
  });
});

// GET /auth/me (protegido) - ahora usa middleware
authRoutes.get("/me", authRequired, async (req, res) => {
  const user = await prisma.user.findUnique({
    where: { id: req.auth.userId },
    select: { id: true, email: true, name: true, isActive: true, createdAt: true },
  });

  if (!user || !user.isActive) {
    return res.status(401).json({ error: "No autorizado" });
  }

  return res.json({
    user,
    session: req.auth, // incluye tenantId y role del token ya verificado por middleware
  });
});
