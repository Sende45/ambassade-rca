import { Request, Response } from "express";
import { prisma } from "../lib/prisma";

// POST /api/rendez-vous — public
export async function creerRendezVous(req: Request, res: Response) {
  try {
    const { nom, prenom, email, telephone, typeService, dateSouhaitee, creneau, message } = req.body;
    if (!nom || !prenom || !email || !telephone || !typeService || !dateSouhaitee || !creneau) {
      return res.status(400).json({ erreur: "Tous les champs obligatoires ne sont pas remplis." });
    }
    const rdv = await prisma.rendezVous.create({
      data: { nom, prenom, email, telephone, typeService, dateSouhaitee, creneau, message: message ?? null },
    });
    res.status(201).json({ succes: true, id: rdv.id });
  } catch {
    res.status(500).json({ erreur: "Impossible d'enregistrer la demande." });
  }
}

// GET /api/rendez-vous — admin
export async function listerRendezVous(_req: Request, res: Response) {
  try {
    const rdvs = await prisma.rendezVous.findMany({ orderBy: { creeLe: "desc" } });
    res.json(rdvs);
  } catch {
    res.status(500).json({ erreur: "Erreur serveur." });
  }
}

// PATCH /api/rendez-vous/:id/statut — admin
export async function changerStatut(req: Request, res: Response) {
  try {
    const id = String(req.params.id);
    const { statut } = req.body; // EN_ATTENTE | CONFIRME | ANNULE
    const rdv = await prisma.rendezVous.update({ where: { id }, data: { statut } });
    res.json(rdv);
  } catch {
    res.status(500).json({ erreur: "Erreur." });
  }
}

// DELETE /api/rendez-vous/:id — admin
export async function supprimerRendezVous(req: Request, res: Response) {
  try {
    const id = String(req.params.id);
    await prisma.rendezVous.delete({ where: { id } });
    res.status(204).send();
  } catch {
    res.status(500).json({ erreur: "Erreur." });
  }
}