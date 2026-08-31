"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { API } from "@/lib/api";
import { Lock, LogIn } from "lucide-react";

export default function AdminLoginPage() {
  const router = useRouter();
  const [form, setForm] = useState({ email: "", motDePasse: "" });
  const [erreur, setErreur] = useState("");
  const [chargement, setChargement] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setErreur("");
    setChargement(true);
    try {
      const res = await fetch(`${API}/api/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (!res.ok) {
        setErreur(data.erreur ?? "Connexion impossible.");
        return;
      }
      localStorage.setItem("rca_token", data.token);
      localStorage.setItem("rca_user", JSON.stringify(data.utilisateur));
      router.push("/admin");
    } catch {
      setErreur("Serveur injoignable.");
    } finally {
      setChargement(false);
    }
  }

  const champ =
    "w-full rounded-lg border border-nuit/15 bg-white px-4 py-3 font-sans text-sm text-ardoise outline-none transition-colors focus:border-or";

  return (
    <main className="flex min-h-screen items-center justify-center bg-nuit-gradient px-4">
      <div className="w-full max-w-md rounded-2xl bg-creme p-8 shadow-xl">
        <div className="flex flex-col items-center text-center">
          <span className="inline-flex h-14 w-14 items-center justify-center rounded-xl bg-or-gradient">
            <Lock className="h-6 w-6 text-bordeaux" strokeWidth={1.6} />
          </span>
          <h1 className="mt-4 font-display text-xl font-bold uppercase tracking-wide text-nuit">
            Espace administrateur
          </h1>
          <p className="mt-1 font-sans text-sm text-ardoise/60">
            Ambassade de la République Centrafricaine
          </p>
        </div>

        <form onSubmit={handleSubmit} className="mt-8 space-y-5">
          {erreur && (
            <p className="rounded-lg bg-red-50 px-4 py-2 font-sans text-sm text-red-700">
              {erreur}
            </p>
          )}
          <div>
            <label className="mb-1.5 block font-display text-xs font-semibold uppercase tracking-wide text-ardoise/60">
              E-mail
            </label>
            <input
              type="email"
              value={form.email}
              onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
              required
              className={champ}
            />
          </div>
          <div>
            <label className="mb-1.5 block font-display text-xs font-semibold uppercase tracking-wide text-ardoise/60">
              Mot de passe
            </label>
            <input
              type="password"
              value={form.motDePasse}
              onChange={(e) => setForm((f) => ({ ...f, motDePasse: e.target.value }))}
              required
              className={champ}
            />
          </div>
          <button
            type="submit"
            disabled={chargement}
            className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-or-gradient px-7 py-3.5 font-display text-xs font-semibold uppercase tracking-wide text-nuit-900 transition-transform hover:scale-[1.02] disabled:opacity-60"
          >
            {chargement ? "Connexion…" : "Se connecter"}
            <LogIn className="h-4 w-4" />
          </button>
        </form>
      </div>
    </main>
  );
}