"use client";

import { useEffect, useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import { apiFetch, getToken } from "@/lib/api";
import AdminNav from "../../components/AdminNav";
import UploadMedia from "../../components/UploadMedia";
import { Plus, Pencil, Trash2, X } from "lucide-react";

type Membre = {
  id: string;
  nom: string;
  prenom: string;
  poste: string;
  service: string | null;
  photo: string | null;
  email: string | null;
  ordre: number;
};

const formeVide = { nom: "", prenom: "", poste: "", service: "", photo: "", email: "", ordre: 0 };

export default function AdminPersonnel() {
  const router = useRouter();
  const [membres, setMembres] = useState<Membre[]>([]);
  const [chargement, setChargement] = useState(true);
  const [form, setForm] = useState(formeVide);
  const [editId, setEditId] = useState<string | null>(null);
  const [panneau, setPanneau] = useState(false);
  const [erreur, setErreur] = useState("");

  const charger = useCallback(async () => {
    try {
      const res = await apiFetch("/api/membres");
      if (res.status === 401) return router.push("/admin/login");
      setMembres(await res.json());
    } finally {
      setChargement(false);
    }
  }, [router]);

  useEffect(() => {
    if (!getToken()) return void router.push("/admin/login");
    charger();
  }, [router, charger]);

  function ouvrirCreation() {
    setForm(formeVide);
    setEditId(null);
    setErreur("");
    setPanneau(true);
  }

  function ouvrirEdition(m: Membre) {
    setForm({
      nom: m.nom,
      prenom: m.prenom,
      poste: m.poste,
      service: m.service ?? "",
      photo: m.photo ?? "",
      email: m.email ?? "",
      ordre: m.ordre,
    });
    setEditId(m.id);
    setErreur("");
    setPanneau(true);
  }

  async function enregistrer(e: React.FormEvent) {
    e.preventDefault();
    setErreur("");
    const res = await apiFetch(editId ? `/api/membres/${editId}` : "/api/membres", {
      method: editId ? "PUT" : "POST",
      body: JSON.stringify({ ...form, ordre: Number(form.ordre) }),
    });
    if (res.status === 401) return router.push("/admin/login");
    if (!res.ok) {
      const d = await res.json();
      setErreur(d.erreur ?? "Erreur lors de l'enregistrement.");
      return;
    }
    setPanneau(false);
    charger();
  }

  async function supprimer(id: string) {
    if (!confirm("Supprimer ce membre du personnel ?")) return;
    await apiFetch(`/api/membres/${id}`, { method: "DELETE" });
    charger();
  }

  const champ =
    "w-full rounded-lg border border-nuit/15 bg-white px-4 py-3 font-sans text-sm text-ardoise outline-none transition-colors focus:border-or";
  const label =
    "mb-1.5 block font-display text-xs font-semibold uppercase tracking-wide text-ardoise/60";

  return (
    <main className="min-h-screen bg-creme">
      <AdminNav />

      <div className="mx-auto max-w-6xl px-4 py-10 lg:px-8">
        <div className="flex items-center justify-between">
          <h2 className="font-display text-2xl font-bold uppercase tracking-wide text-nuit">
            Personnel de l'Ambassade
          </h2>
          <button onClick={ouvrirCreation} className="inline-flex items-center gap-2 rounded-full bg-or-gradient px-5 py-2.5 font-display text-xs font-semibold uppercase tracking-wide text-nuit-900 transition-transform hover:scale-[1.03]">
            <Plus className="h-4 w-4" />
            Ajouter un membre
          </button>
        </div>

        <p className="mt-3 font-sans text-sm text-ardoise/60">
          Le champ « Ordre » range les membres du haut (0 = Ambassadeur) vers le bas.
        </p>

        {chargement ? (
          <p className="mt-10 font-sans text-sm text-ardoise/60">Chargement…</p>
        ) : membres.length === 0 ? (
          <p className="mt-10 rounded-xl border border-nuit/10 bg-white px-6 py-10 text-center font-sans text-sm text-ardoise/60">
            Aucun membre. Ajoutez le premier.
          </p>
        ) : (
          <ul className="mt-8 space-y-3">
            {membres.map((m) => (
              <li key={m.id} className="flex flex-wrap items-center justify-between gap-4 rounded-xl border border-nuit/10 bg-white px-5 py-4">
                <div className="flex min-w-0 items-center gap-4">
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center overflow-hidden rounded-full bg-nuit-gradient font-display text-sm font-bold text-or">
                    {m.photo ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img src={m.photo} alt="" className="h-full w-full object-cover" />
                    ) : (
                      m.prenom.charAt(0) + m.nom.charAt(0)
                    )}
                  </span>
                  <div className="min-w-0">
                    <p className="truncate font-display text-sm font-semibold text-nuit">
                      {m.prenom} {m.nom}
                    </p>
                    <p className="truncate font-sans text-xs text-ardoise/60">
                      {m.poste}
                      {m.service ? ` · ${m.service}` : ""}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-1">
                  <span className="mr-2 rounded-full bg-ardoise/10 px-2 py-0.5 font-sans text-xs text-ardoise/50">
                    #{m.ordre}
                  </span>
                  <button onClick={() => ouvrirEdition(m)} title="Modifier" className="rounded-lg p-2 text-ardoise/60 hover:bg-creme hover:text-nuit">
                    <Pencil className="h-4 w-4" />
                  </button>
                  <button onClick={() => supprimer(m.id)} title="Supprimer" className="rounded-lg p-2 text-ardoise/60 hover:bg-red-50 hover:text-red-600">
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Panneau formulaire */}
      {panneau && (
        <div className="fixed inset-0 z-50 flex items-start justify-center overflow-y-auto bg-nuit-900/60 p-4">
          <div className="mt-10 w-full max-w-2xl rounded-2xl bg-creme p-8 shadow-xl">
            <div className="flex items-center justify-between">
              <h3 className="font-display text-lg font-bold uppercase tracking-wide text-nuit">
                {editId ? "Modifier le membre" : "Nouveau membre"}
              </h3>
              <button onClick={() => setPanneau(false)} className="rounded-lg p-1 text-ardoise/50 hover:text-nuit">
                <X className="h-5 w-5" />
              </button>
            </div>

            <form onSubmit={enregistrer} className="mt-6 space-y-5">
              {erreur && (
                <p className="rounded-lg bg-red-50 px-4 py-2 font-sans text-sm text-red-700">{erreur}</p>
              )}
              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                <div>
                  <label className={label}>Prénom</label>
                  <input value={form.prenom} onChange={(e) => setForm((f) => ({ ...f, prenom: e.target.value }))} required className={champ} />
                </div>
                <div>
                  <label className={label}>Nom</label>
                  <input value={form.nom} onChange={(e) => setForm((f) => ({ ...f, nom: e.target.value }))} required className={champ} />
                </div>
              </div>
              <div>
                <label className={label}>Poste</label>
                <input value={form.poste} onChange={(e) => setForm((f) => ({ ...f, poste: e.target.value }))} required className={champ} placeholder="Ex. Ambassadeur, Consul, Secrétaire…" />
              </div>
              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                <div>
                  <label className={label}>Service (facultatif)</label>
                  <input value={form.service} onChange={(e) => setForm((f) => ({ ...f, service: e.target.value }))} className={champ} />
                </div>
                <div>
                  <label className={label}>Ordre hiérarchique</label>
                  <input type="number" value={form.ordre} onChange={(e) => setForm((f) => ({ ...f, ordre: Number(e.target.value) }))} className={champ} />
                </div>
              </div>
              <div>
                <label className={label}>E-mail (facultatif)</label>
                <input type="email" value={form.email} onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))} className={champ} />
              </div>
              <div>
                <label className={label}>Photo (facultatif)</label>
                <UploadMedia valeur={form.photo} onChange={(url) => setForm((f) => ({ ...f, photo: url }))} />
              </div>
              <div className="flex justify-end gap-3 pt-2">
                <button type="button" onClick={() => setPanneau(false)} className="rounded-full px-6 py-3 font-display text-xs font-semibold uppercase tracking-wide text-ardoise/60 hover:text-nuit">
                  Annuler
                </button>
                <button type="submit" className="rounded-full bg-or-gradient px-7 py-3 font-display text-xs font-semibold uppercase tracking-wide text-nuit-900 transition-transform hover:scale-[1.03]">
                  {editId ? "Enregistrer" : "Ajouter"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </main>
  );
}