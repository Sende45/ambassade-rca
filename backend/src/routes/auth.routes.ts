import { Router } from "express";
import { inscrire, connecter, moi } from "../controllers/auth.controller";
import { protect } from "../middlewares/auth";

const router = Router();

router.post("/register", inscrire);
router.post("/login", connecter);
router.get("/me", protect, moi);

export default router;