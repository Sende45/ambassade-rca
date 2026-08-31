import { Request, Response } from "express";
import { prisma } from "../lib/prisma";

// POST /api/contact — public
export async function creerMessage(req: Request, res: Response) {
  try {
    const { nom, email, sujet, message } = req.body;
    if (!nom || !email || !message) {
      return res.status(400).json({ erreur: "Nom, e-mail et message sont obligatoires." });
    }
    const m = await prisma.messageContact.create({
      data: { nom, email, sujet: sujet ?? null, message },
    });
    res.status(201).json({ succes: true, id: m.id });
  } catch {
    res.status(500).json({ erreur: "Impossible d'envoyer le message." });
  }
}

// GET /api/contact — admin
export async function listerMessages(_req: Request, res: Response) {
  try {
    const messages = await prisma.messageContact.findMany({ orderBy: { creeLe: "desc" } });
    res.json(messages);
  } catch {
    res.status(500).json({ erreur: "Erreur serveur." });
  }
}

// PATCH /api/contact/:id/lu — admin
export async function marquerLu(req: Request, res: Response) {
  try {
    const id = String(req.params.id);
    const m = await prisma.messageContact.update({ where: { id }, data: { lu: true } });
    res.json(m);
  } catch {
    res.status(500).json({ erreur: "Erreur." });
  }
}

// DELETE /api/contact/:id — admin
export async function supprimerMessage(req: Request, res: Response) {
  try {
    const id = String(req.params.id);
    await prisma.messageContact.delete({ where: { id } });
    res.status(204).send();
  } catch {
    res.status(500).json({ erreur: "Erreur." });
  }
}