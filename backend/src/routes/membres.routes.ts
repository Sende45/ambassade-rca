import { Router } from "express";
import {
  listerMembres,
  creerMembre,
  modifierMembre,
  supprimerMembre,
} from "../controllers/membres.controller";
import { protect } from "../middlewares/auth";

const router = Router();

router.get("/", listerMembres);
router.post("/", protect, creerMembre);
router.put("/:id", protect, modifierMembre);
router.delete("/:id", protect, supprimerMembre);

export default router;