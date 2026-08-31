import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  const email = "yohannesende@gmail.com";
  const motDePasse = "ChangeMoi2026!";

  const existant = await prisma.utilisateur.findUnique({ where: { email } });
  if (existant) {
    console.log(`ℹ️  L'admin ${email} existe déjà — rien à faire.`);
    return;
  }

  const hash = await bcrypt.hash(motDePasse, 10);
  await prisma.utilisateur.create({
    data: {
      nom: "Administrateur",
      email,
      motDePasse: hash,
    },
  });

  console.log("✅ Compte admin créé :");
  console.log(`   Email        : ${email}`);
  console.log(`   Mot de passe : ${motDePasse}`);
  console.log("   ⚠️  Change ce mot de passe après la première connexion.");
}

main()
  .catch((e) => {
    console.error("❌ Erreur pendant le seed :", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });