import { Request, Response } from "express";
import { prisma } from "../lib/prisma";

function genererSlug(titre: string) {
  return titre
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

// GET /api/actualites
export async function listerActualites(_req: Request, res: Response) {
  try {
    const actualites = await prisma.actualite.findMany({
      where: { publie: true },
      orderBy: { datePublication: "desc" },
    });
    res.json(actualites);
  } catch {
    res.status(500).json({ erreur: "Impossible de charger les actualités." });
  }
}

// GET /api/actualites/:slug
export async function obtenirActualite(req: Request, res: Response) {
  try {
    const slug = String(req.params.slug);
    const actualite = await prisma.actualite.findUnique({ where: { slug } });
    if (!actualite || !actualite.publie) {
      return res.status(404).json({ erreur: "Actualité introuvable." });
    }
    res.json(actualite);
  } catch {
    res.status(500).json({ erreur: "Erreur serveur." });
  }
}

// POST /api/actualites
export async function creerActualite(req: Request, res: Response) {
  try {
    const { titre, extrait, contenu, categorie, image, publie } = req.body;
    if (!titre || !contenu || !categorie) {
      return res.status(400).json({
        erreur: "Les champs titre, contenu et categorie sont obligatoires.",
      });
    }
    const actualite = await prisma.actualite.create({
      data: {
        titre,
        slug: genererSlug(titre),
        extrait: extrait ?? null,
        contenu,
        categorie,
        image: image ?? null,
        publie: publie ?? false,
      },
    });
    res.status(201).json(actualite);
  } catch {
    res.status(500).json({ erreur: "Impossible de créer l'actualité." });
  }
}

// PUT /api/actualites/:id
export async function modifierActualite(req: Request, res: Response) {
  try {
    const id = String(req.params.id);
    const { titre, extrait, contenu, categorie, image, publie } = req.body;
    const actualite = await prisma.actualite.update({
      where: { id },
      data: {
        ...(titre && { titre, slug: genererSlug(titre) }),
        ...(extrait !== undefined && { extrait }),
        ...(contenu && { contenu }),
        ...(categorie && { categorie }),
        ...(image !== undefined && { image }),
        ...(publie !== undefined && { publie }),
      },
    });
    res.json(actualite);
  } catch {
    res.status(500).json({ erreur: "Impossible de modifier l'actualité." });
  }
}

// DELETE /api/actualites/:id
export async function supprimerActualite(req: Request, res: Response) {
  try {
    const id = String(req.params.id);
    await prisma.actualite.delete({ where: { id } });
    res.status(204).send();
  } catch {
    res.status(500).json({ erreur: "Impossible de supprimer l'actualité." });
  }
}

// GET /api/actualites/admin/toutes — toutes les actualités (admin)
export async function listerToutesActualites(_req: Request, res: Response) {
  try {
    const actualites = await prisma.actualite.findMany({ orderBy: { creeLe: "desc" } });
    res.json(actualites);
  } catch {
    res.status(500).json({ erreur: "Impossible de charger les actualités." });
  }
}