import express from "express";
import cors from "cors";
import helmet from "helmet";
import rateLimit from "express-rate-limit";
import dotenv from "dotenv";
import actualitesRoutes from "./routes/actualites.routes";
import authRoutes from "./routes/auth.routes";
import contactRoutes from "./routes/contact.routes";
import rendezVousRoutes from "./routes/rendezvous.routes";
import membresRoutes from "./routes/membres.routes";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 4000;

app.use(helmet());
app.use(
  cors({
    origin: process.env.FRONTEND_URL?.split(",") ?? "*",
    credentials: true,
  })
);
app.use(express.json({ limit: "1mb" }));

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 200,
  standardHeaders: true,
  legacyHeaders: false,
});
app.use(limiter);

app.get("/", (_req, res) => {
  res.json({ statut: "ok", service: "API Ambassade RCA" });
});

app.use("/api/auth", authRoutes);
app.use("/api/actualites", actualitesRoutes);
app.use("/api/contact", contactRoutes);
app.use("/api/rendez-vous", rendezVousRoutes);
app.use("/api/membres", membresRoutes);


app.listen(PORT, () => {
  console.log(`API démarrée sur http://localhost:${PORT}`);
});