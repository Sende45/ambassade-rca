import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { prisma } from "../lib/prisma";

export interface AuthRequest extends Request {
  utilisateur?: { id: string; role: string };
}

export async function protect(req: AuthRequest, res: Response, next: NextFunction) {
  try {
    const header = req.headers.authorization;
    if (!header?.startsWith("Bearer ")) {
      return res.status(401).json({ erreur: "Non autorisé." });
    }
    const token = header.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as { id: string };
    const utilisateur = await prisma.utilisateur.findUnique({ where: { id: decoded.id } });
    if (!utilisateur) return res.status(401).json({ erreur: "Session invalide." });
    req.utilisateur = { id: utilisateur.id, role: utilisateur.role };
    next();
  } catch {
    return res.status(401).json({ erreur: "Token invalide ou expiré." });
  }
}