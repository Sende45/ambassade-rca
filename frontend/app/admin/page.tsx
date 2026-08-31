"use client";

import { useEffect, useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import { apiFetch, getToken } from "@/lib/api";
import UploadMedia from "../components/UploadMedia";
import AdminNav from "../components/AdminNav";
import { Plus, Pencil, Trash2, Eye, EyeOff, X } from "lucide-react";


type Actualite = {
  id: string;
  titre: string;
  extrait: string | null;
  contenu: string;
  categorie: string;
  image: string | null;
  publie: boolean;
};

const formeVide = { titre: "", categorie: "", extrait: "", contenu: "", image: "", publie: false };

export default function AdminDashboard() {
  const router = useRouter();
  const [actualites, setActualites] = useState<Actualite[]>([]);
  const [chargement, setChargement] = useState(true);
  const [form, setForm] = useState(formeVide);
  const [editId, setEditId] = useState<string | null>(null);
  const [panneau, setPanneau] = useState(false);
  const [erreur, setErreur] = useState("");

  const charger = useCallback(async () => {
    try {
      const res = await apiFetch("/api/actualites/admin/toutes");
      if (res.status === 401) return router.push("/admin/login");
      setActualites(await res.json());
    } catch {
      setErreur("Impossible de charger les actualités.");
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

  function ouvrirEdition(a: Actualite) {
    setForm({
      titre: a.titre,
      categorie: a.categorie,
      extrait: a.extrait ?? "",
      contenu: a.contenu,
      image: a.image ?? "",
      publie: a.publie,
    });
    setEditId(a.id);
    setErreur("");
    setPanneau(true);
  }

  async function enregistrer(e: React.FormEvent) {
    e.preventDefault();
    setErreur("");
    const res = await apiFetch(editId ? `/api/actualites/${editId}` : "/api/actualites", {
      method: editId ? "PUT" : "POST",
      body: JSON.stringify(form),
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

  async function basculerPublication(a: Actualite) {
    await apiFetch(`/api/actualites/${a.id}`, {
      method: "PUT",
      body: JSON.stringify({ publie: !a.publie }),
    });
    charger();
  }

  async function supprimer(id: string) {
    if (!confirm("Supprimer définitivement cette actualité ?")) return;
    await apiFetch(`/api/actualites/${id}`, { method: "DELETE" });
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
            Gérer les actualités
          </h2>
          <button onClick={ouvrirCreation} className="inline-flex items-center gap-2 rounded-full bg-or-gradient px-5 py-2.5 font-display text-xs font-semibold uppercase tracking-wide text-nuit-900 transition-transform hover:scale-[1.03]">
            <Plus className="h-4 w-4" />
            Nouvelle actualité
          </button>
        </div>

        {chargement ? (
          <p className="mt-10 font-sans text-sm text-ardoise/60">Chargement…</p>
        ) : actualites.length === 0 ? (
          <p className="mt-10 rounded-xl border border-nuit/10 bg-white px-6 py-10 text-center font-sans text-sm text-ardoise/60">
            Aucune actualité. Créez la première.
          </p>
        ) : (
          <ul className="mt-8 space-y-3">
            {actualites.map((a) => (
              <li key={a.id} className="flex flex-wrap items-center justify-between gap-4 rounded-xl border border-nuit/10 bg-white px-5 py-4">
                <div className="min-w-0">
                  <div className="flex items-center gap-2">
                    <span className={`rounded-full px-2.5 py-0.5 font-display text-[10px] font-semibold uppercase tracking-wide ${a.publie ? "bg-green-100 text-green-700" : "bg-ardoise/10 text-ardoise/60"}`}>
                      {a.publie ? "Publiée" : "Brouillon"}
                    </span>
                    <span className="font-sans text-xs uppercase tracking-wide text-ardoise/50">{a.categorie}</span>
                  </div>
                  <p className="mt-1 truncate font-display text-sm font-semibold text-nuit">{a.titre}</p>
                </div>
                <div className="flex items-center gap-1">
                  <button onClick={() => basculerPublication(a)} title={a.publie ? "Dépublier" : "Publier"} className="rounded-lg p-2 text-ardoise/60 hover:bg-creme hover:text-or-fonce">
                    {a.publie ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                  <button onClick={() => ouvrirEdition(a)} title="Modifier" className="rounded-lg p-2 text-ardoise/60 hover:bg-creme hover:text-nuit">
                    <Pencil className="h-4 w-4" />
                  </button>
                  <button onClick={() => supprimer(a.id)} title="Supprimer" className="rounded-lg p-2 text-ardoise/60 hover:bg-red-50 hover:text-red-600">
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
                {editId ? "Modifier l'actualité" : "Nouvelle actualité"}
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
                  <label className={label}>Titre</label>
                  <input value={form.titre} onChange={(e) => setForm((f) => ({ ...f, titre: e.target.value }))} required className={champ} />
                </div>
                <div>
                  <label className={label}>Catégorie</label>
                  <input value={form.categorie} onChange={(e) => setForm((f) => ({ ...f, categorie: e.target.value }))} required className={champ} />
                </div>
              </div>
              <div>
                <label className={label}>Extrait (résumé court)</label>
                <input value={form.extrait} onChange={(e) => setForm((f) => ({ ...f, extrait: e.target.value }))} className={champ} />
              </div>
              <div>
                <label className={label}>Contenu</label>
                <textarea value={form.contenu} onChange={(e) => setForm((f) => ({ ...f, contenu: e.target.value }))} required rows={6} className={champ} />
              </div>
              <div>
                <label className={label}>Média (photo ou vidéo)</label>
                <UploadMedia valeur={form.image} onChange={(url) => setForm((f) => ({ ...f, image: url }))} />
              </div>
              <label className="flex items-center gap-2 font-sans text-sm text-ardoise/80">
                <input type="checkbox" checked={form.publie} onChange={(e) => setForm((f) => ({ ...f, publie: e.target.checked }))} className="h-4 w-4 accent-[#C9A24B]" />
                Publier immédiatement
              </label>
              <div className="flex justify-end gap-3 pt-2">
                <button type="button" onClick={() => setPanneau(false)} className="rounded-full px-6 py-3 font-display text-xs font-semibold uppercase tracking-wide text-ardoise/60 hover:text-nuit">
                  Annuler
                </button>
                <button type="submit" className="rounded-full bg-or-gradient px-7 py-3 font-display text-xs font-semibold uppercase tracking-wide text-nuit-900 transition-transform hover:scale-[1.03]">
                  {editId ? "Enregistrer" : "Créer"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </main>
  );
}