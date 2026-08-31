import { Router } from "express";
import {
  listerActualites,
  listerToutesActualites,
  obtenirActualite,
  creerActualite,
  modifierActualite,
  supprimerActualite,
} from "../controllers/actualites.controller";
import { protect } from "../middlewares/auth";

const router = Router();

router.get("/", listerActualites);
router.get("/admin/toutes", protect, listerToutesActualites);
router.get("/:slug", obtenirActualite);

router.post("/", protect, creerActualite);
router.put("/:id", protect, modifierActualite);
router.delete("/:id", protect, supprimerActualite);

export default router;