import express from 'express';
import cors from 'cors';
import helmet from "helmet";
import rateLimit from "express-rate-limit";

import { healthRoutes } from './routes/health.routes.js';
import { authRoutes } from './routes/auth.routes.js';

export const app = express();

const loginLimiter = rateLimit({
  windowMs: 60 * 1000, // 1 minuto
  max: 10, // 10 intentos
  message: {
    error: "Demasiados intentos, intenta más tarde",
  },
});

/**
 * Seguridad
 */
app.use(helmet());

/**
 * CORS
 */
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

/**
 * Body JSON
 */
app.use(express.json());

/**
 * Rate limit solo para login
 */
app.use('/auth/login', loginLimiter);

/**
 * Rutas
 */
app.use('/health', healthRoutes);
app.use('/auth', authRoutes);

/**
 * Fallback 404
 */
app.use((req, res) => {
  res.status(404).json({ error: 'Ruta no encontrada' });
});