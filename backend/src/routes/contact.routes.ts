import { Router } from "express";
import { creerMessage, listerMessages, marquerLu, supprimerMessage } from "../controllers/contact.controller";
import { protect } from "../middlewares/auth";

const router = Router();

router.post("/", creerMessage);
router.get("/", protect, listerMessages);
router.patch("/:id/lu", protect, marquerLu);
router.delete("/:id", protect, supprimerMessage);

export default router;