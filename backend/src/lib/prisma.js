import "dotenv/config";
import { PrismaClient } from "@prisma/client";
import { PrismaBetterSqlite3 } from "@prisma/adapter-better-sqlite3";

const url = process.env.DATABASE_URL;

if (!url) {
  throw new Error("Falta DATABASE_URL en .env");
}

const adapter = new PrismaBetterSqlite3({ url });

export const prisma = new PrismaClient({ adapter });
