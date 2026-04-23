import "dotenv/config";
import bcrypt from "bcryptjs";
import { prisma } from "../src/lib/prisma.js";

async function main() {
  const adminEmail = process.env.ADMIN_EMAIL;
  const adminPassword = process.env.ADMIN_PASSWORD;
  const adminName = process.env.ADMIN_NAME || "Admin";

  if (!adminEmail || !adminPassword) {
    throw new Error("Faltan ADMIN_EMAIL o ADMIN_PASSWORD en .env");
  }

  const tenant = await prisma.tenant.upsert({
    where: { slug: "default" },
    update: {},
    create: { name: "Empresa Default", slug: "default" },
  });

  const passwordHash = await bcrypt.hash(adminPassword, 10);

  const user = await prisma.user.upsert({
    where: { email: adminEmail },
    update: { name: adminName, isActive: true },
    create: { email: adminEmail, passwordHash, name: adminName, isActive: true },
  });

  await prisma.userTenant.upsert({
    where: { userId_tenantId: { userId: user.id, tenantId: tenant.id } },
    update: { role: "admin" },
    create: { userId: user.id, tenantId: tenant.id, role: "admin" },
  });

  console.log("✅ Seed OK", { tenant: tenant.slug, admin: user.email });
}

main()
  .catch((e) => {
    console.error("❌ Seed error:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
