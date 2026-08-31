import { Router } from "express";
import { creerRendezVous, listerRendezVous, changerStatut, supprimerRendezVous } from "../controllers/rendezvous.controller";
import { protect } from "../middlewares/auth";

const router = Router();

router.post("/", creerRendezVous);
router.get("/", protect, listerRendezVous);
router.patch("/:id/statut", protect, changerStatut);
router.delete("/:id", protect, supprimerRendezVous);

export default router;