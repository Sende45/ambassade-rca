import { Request, Response } from "express";
import { prisma } from "../lib/prisma";

// GET /api/membres — public, triés par ordre hiérarchique
export async function listerMembres(_req: Request, res: Response) {
  try {
    const membres = await prisma.membre.findMany({ orderBy: { ordre: "asc" } });
    res.json(membres);
  } catch {
    res.status(500).json({ erreur: "Impossible de charger les membres." });
  }
}

// POST /api/membres — admin
export async function creerMembre(req: Request, res: Response) {
  try {
    const { nom, prenom, poste, service, photo, email, ordre } = req.body;
    if (!nom || !prenom || !poste) {
      return res.status(400).json({ erreur: "Nom, prénom et poste sont obligatoires." });
    }
    const membre = await prisma.membre.create({
      data: {
        nom,
        prenom,
        poste,
        service: service ?? null,
        photo: photo ?? null,
        email: email ?? null,
        ordre: ordre ?? 0,
      },
    });
    res.status(201).json(membre);
  } catch {
    res.status(500).json({ erreur: "Impossible de créer le membre." });
  }
}

// PUT /api/membres/:id — admin
export async function modifierMembre(req: Request, res: Response) {
  try {
    const id = String(req.params.id);
    const { nom, prenom, poste, service, photo, email, ordre } = req.body;
    const membre = await prisma.membre.update({
      where: { id },
      data: {
        ...(nom && { nom }),
        ...(prenom && { prenom }),
        ...(poste && { poste }),
        ...(service !== undefined && { service }),
        ...(photo !== undefined && { photo }),
        ...(email !== undefined && { email }),
        ...(ordre !== undefined && { ordre }),
      },
    });
    res.json(membre);
  } catch {
    res.status(500).json({ erreur: "Impossible de modifier le membre." });
  }
}

// DELETE /api/membres/:id — admin
export async function supprimerMembre(req: Request, res: Response) {
  try {
    const id = String(req.params.id);
    await prisma.membre.delete({ where: { id } });
    res.status(204).send();
  } catch {
    res.status(500).json({ erreur: "Impossible de supprimer le membre." });
  }
}