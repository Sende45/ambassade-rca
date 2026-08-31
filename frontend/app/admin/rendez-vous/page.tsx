"use client";

import { useEffect, useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import { apiFetch, getToken } from "@/lib/api";
import AdminNav from "../../components/AdminNav";
import { Check, X, Clock, Trash2, Mail, Phone } from "lucide-react";

type RendezVous = {
  id: string;
  nom: string;
  prenom: string;
  email: string;
  telephone: string;
  typeService: string;
  dateSouhaitee: string;
  creneau: string;
  message: string | null;
  statut: "EN_ATTENTE" | "CONFIRME" | "ANNULE";
  creeLe: string;
};

const styleStatut: Record<string, string> = {
  EN_ATTENTE: "bg-amber-100 text-amber-700",
  CONFIRME: "bg-green-100 text-green-700",
  ANNULE: "bg-red-100 text-red-700",
};
const libelleStatut: Record<string, string> = {
  EN_ATTENTE: "En attente",
  CONFIRME: "Confirmé",
  ANNULE: "Annulé",
};

export default function AdminRendezVous() {
  const router = useRouter();
  const [rdvs, setRdvs] = useState<RendezVous[]>([]);
  const [chargement, setChargement] = useState(true);

  const charger = useCallback(async () => {
    try {
      const res = await apiFetch("/api/rendez-vous");
      if (res.status === 401) return router.push("/admin/login");
      setRdvs(await res.json());
    } finally {
      setChargement(false);
    }
  }, [router]);

  useEffect(() => {
    if (!getToken()) return void router.push("/admin/login");
    charger();
  }, [router, charger]);

  async function changerStatut(id: string, statut: string) {
    await apiFetch(`/api/rendez-vous/${id}/statut`, {
      method: "PATCH",
      body: JSON.stringify({ statut }),
    });
    charger();
  }

  async function supprimer(id: string) {
    if (!confirm("Supprimer cette demande de rendez-vous ?")) return;
    await apiFetch(`/api/rendez-vous/${id}`, { method: "DELETE" });
    charger();
  }

  return (
    <main className="min-h-screen bg-creme">
      <AdminNav />
      <div className="mx-auto max-w-6xl px-4 py-10 lg:px-8">
        <h2 className="font-display text-2xl font-bold uppercase tracking-wide text-nuit">
          Demandes de rendez-vous
        </h2>

        {chargement ? (
          <p className="mt-10 font-sans text-sm text-ardoise/60">Chargement…</p>
        ) : rdvs.length === 0 ? (
          <p className="mt-10 rounded-xl border border-nuit/10 bg-white px-6 py-10 text-center font-sans text-sm text-ardoise/60">
            Aucune demande de rendez-vous pour le moment.
          </p>
        ) : (
          <ul className="mt-8 space-y-4">
            {rdvs.map((r) => (
              <li key={r.id} className="rounded-xl border border-nuit/10 bg-white p-5">
                <div className="flex flex-wrap items-start justify-between gap-4">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className={`rounded-full px-2.5 py-0.5 font-display text-[10px] font-semibold uppercase tracking-wide ${styleStatut[r.statut]}`}>
                        {libelleStatut[r.statut]}
                      </span>
                      <span className="font-sans text-xs uppercase tracking-wide text-ardoise/50">
                        {r.typeService}
                      </span>
                    </div>
                    <p className="mt-1.5 font-display text-base font-semibold text-nuit">
                      {r.prenom} {r.nom}
                    </p>
                    <div className="mt-1 flex flex-wrap gap-x-4 gap-y-1 font-sans text-xs text-ardoise/60">
                      <span className="inline-flex items-center gap-1">
                        <Mail className="h-3.5 w-3.5" />
                        {r.email}
                      </span>
                      <span className="inline-flex items-center gap-1">
                        <Phone className="h-3.5 w-3.5" />
                        {r.telephone}
                      </span>
                    </div>
                    <p className="mt-2 font-sans text-sm text-ardoise/80">
                      Souhaité le <strong>{r.dateSouhaitee}</strong> · créneau{" "}
                      <strong>{r.creneau}</strong>
                    </p>
                    {r.message && (
                      <p className="mt-2 rounded-lg bg-creme px-3 py-2 font-sans text-sm text-ardoise/70">
                        {r.message}
                      </p>
                    )}
                  </div>

                  <div className="flex shrink-0 flex-col gap-2">
                    <button onClick={() => changerStatut(r.id, "CONFIRME")} className="inline-flex items-center justify-center gap-1.5 rounded-lg bg-green-50 px-3 py-2 font-display text-xs font-semibold uppercase tracking-wide text-green-700 hover:bg-green-100">
                      <Check className="h-4 w-4" /> Confirmer
                    </button>
                    <button onClick={() => changerStatut(r.id, "ANNULE")} className="inline-flex items-center justify-center gap-1.5 rounded-lg bg-red-50 px-3 py-2 font-display text-xs font-semibold uppercase tracking-wide text-red-700 hover:bg-red-100">
                      <X className="h-4 w-4" /> Annuler
                    </button>
                    <button onClick={() => changerStatut(r.id, "EN_ATTENTE")} className="inline-flex items-center justify-center gap-1.5 rounded-lg bg-amber-50 px-3 py-2 font-display text-xs font-semibold uppercase tracking-wide text-amber-700 hover:bg-amber-100">
                      <Clock className="h-4 w-4" /> En attente
                    </button>
                    <button onClick={() => supprimer(r.id)} className="inline-flex items-center justify-center gap-1.5 rounded-lg px-3 py-2 font-display text-xs font-semibold uppercase tracking-wide text-ardoise/50 hover:bg-red-50 hover:text-red-600">
                      <Trash2 className="h-4 w-4" /> Supprimer
                    </button>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </main>
  );
}