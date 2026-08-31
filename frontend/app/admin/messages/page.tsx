"use client";

import { useEffect, useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import { apiFetch, getToken } from "@/lib/api";
import AdminNav from "../../components/AdminNav";
import { MailOpen, Check, Trash2 } from "lucide-react";

type MessageContact = {
  id: string;
  nom: string;
  email: string;
  sujet: string | null;
  message: string;
  lu: boolean;
  creeLe: string;
};

function formaterDate(iso: string) {
  return new Date(iso).toLocaleDateString("fr-FR", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

export default function AdminMessages() {
  const router = useRouter();
  const [messages, setMessages] = useState<MessageContact[]>([]);
  const [chargement, setChargement] = useState(true);

  const charger = useCallback(async () => {
    try {
      const res = await apiFetch("/api/contact");
      if (res.status === 401) return router.push("/admin/login");
      setMessages(await res.json());
    } finally {
      setChargement(false);
    }
  }, [router]);

  useEffect(() => {
    if (!getToken()) return void router.push("/admin/login");
    charger();
  }, [router, charger]);

  async function marquerLu(id: string) {
    await apiFetch(`/api/contact/${id}/lu`, { method: "PATCH" });
    charger();
  }

  async function supprimer(id: string) {
    if (!confirm("Supprimer ce message ?")) return;
    await apiFetch(`/api/contact/${id}`, { method: "DELETE" });
    charger();
  }

  return (
    <main className="min-h-screen bg-creme">
      <AdminNav />
      <div className="mx-auto max-w-6xl px-4 py-10 lg:px-8">
        <h2 className="font-display text-2xl font-bold uppercase tracking-wide text-nuit">
          Messages reçus
        </h2>

        {chargement ? (
          <p className="mt-10 font-sans text-sm text-ardoise/60">Chargement…</p>
        ) : messages.length === 0 ? (
          <p className="mt-10 rounded-xl border border-nuit/10 bg-white px-6 py-10 text-center font-sans text-sm text-ardoise/60">
            Aucun message pour le moment.
          </p>
        ) : (
          <ul className="mt-8 space-y-4">
            {messages.map((m) => (
              <li key={m.id} className={`rounded-xl border bg-white p-5 ${m.lu ? "border-nuit/10" : "border-or/40"}`}>
                <div className="flex flex-wrap items-start justify-between gap-4">
                  <div className="min-w-0">
                    <div className="flex items-center gap-2">
                      {!m.lu && (
                        <span className="rounded-full bg-or/15 px-2.5 py-0.5 font-display text-[10px] font-semibold uppercase tracking-wide text-or-fonce">
                          Nouveau
                        </span>
                      )}
                      <span className="font-sans text-xs text-ardoise/50">{formaterDate(m.creeLe)}</span>
                    </div>
                    <p className="mt-1.5 font-display text-base font-semibold text-nuit">{m.nom}</p>
                    <p className="font-sans text-xs text-ardoise/60">{m.email}</p>
                    {m.sujet && (
                      <p className="mt-2 font-display text-sm font-semibold text-nuit">{m.sujet}</p>
                    )}
                    <p className="mt-1 whitespace-pre-line font-sans text-sm text-ardoise/80">
                      {m.message}
                    </p>
                  </div>

                  <div className="flex shrink-0 flex-col gap-2">
                    {!m.lu && (
                      <button onClick={() => marquerLu(m.id)} className="inline-flex items-center justify-center gap-1.5 rounded-lg bg-green-50 px-3 py-2 font-display text-xs font-semibold uppercase tracking-wide text-green-700 hover:bg-green-100">
                        <Check className="h-4 w-4" /> Marquer lu
                      </button>
                    )}
                    <a href={`mailto:${m.email}`} className="inline-flex items-center justify-center gap-1.5 rounded-lg bg-creme px-3 py-2 font-display text-xs font-semibold uppercase tracking-wide text-nuit hover:bg-nuit-900 hover:text-creme">
                      <MailOpen className="h-4 w-4" /> Répondre
                    </a>
                    <button onClick={() => supprimer(m.id)} className="inline-flex items-center justify-center gap-1.5 rounded-lg px-3 py-2 font-display text-xs font-semibold uppercase tracking-wide text-ardoise/50 hover:bg-red-50 hover:text-red-600">
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