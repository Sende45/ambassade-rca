import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { prisma } from "../lib/prisma";
import { AuthRequest } from "../middlewares/auth";

function genererToken(id: string) {
  return jwt.sign({ id }, process.env.JWT_SECRET as string, { expiresIn: "7d" });
}

// POST /api/auth/register — autorisé UNIQUEMENT pour créer le tout premier admin
export async function inscrire(req: Request, res: Response) {
  try {
    const total = await prisma.utilisateur.count();
    if (total > 0) {
      return res.status(403).json({ erreur: "Un administrateur existe déjà." });
    }
    const { nom, email, motDePasse } = req.body;
    if (!nom || !email || !motDePasse) {
      return res.status(400).json({ erreur: "Champs manquants." });
    }
    const hash = await bcrypt.hash(motDePasse, 10);
    const u = await prisma.utilisateur.create({ data: { nom, email, motDePasse: hash } });
    res.status(201).json({
      token: genererToken(u.id),
      utilisateur: { id: u.id, nom: u.nom, email: u.email, role: u.role },
    });
  } catch {
    res.status(500).json({ erreur: "Impossible de créer le compte." });
  }
}

// POST /api/auth/login
export async function connecter(req: Request, res: Response) {
  try {
    const { email, motDePasse } = req.body;
    const u = await prisma.utilisateur.findUnique({ where: { email } });
    if (!u) return res.status(401).json({ erreur: "Identifiants incorrects." });
    const ok = await bcrypt.compare(motDePasse ?? "", u.motDePasse);
    if (!ok) return res.status(401).json({ erreur: "Identifiants incorrects." });
    res.json({
      token: genererToken(u.id),
      utilisateur: { id: u.id, nom: u.nom, email: u.email, role: u.role },
    });
  } catch {
    res.status(500).json({ erreur: "Erreur serveur." });
  }
}

// GET /api/auth/me — vérifie la session
export async function moi(req: AuthRequest, res: Response) {
  const u = await prisma.utilisateur.findUnique({ where: { id: req.utilisateur!.id } });
  if (!u) return res.status(404).json({ erreur: "Introuvable." });
  res.json({ id: u.id, nom: u.nom, email: u.email, role: u.role });
}