"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import PageHeader from "../components/PageHeader";
import { API } from "@/lib/api";
import { CalendarClock, CheckCircle2 } from "lucide-react";

const typesService = [
  "Passeport",
  "Visa",
  "État civil",
  "Assistance à la diaspora",
  "Inscription consulaire",
  "Autre",
];

const creneaux = ["08h30 – 10h00", "10h00 – 11h30", "13h30 – 15h00", "15h00 – 16h30"];

function FormulaireRendezVous() {
  const params = useSearchParams();
  const [envoye, setEnvoye] = useState(false);
  const [erreur, setErreur] = useState("");
  const [form, setForm] = useState({
    nom: "",
    prenom: "",
    email: "",
    telephone: "",
    typeService: "",
    dateSouhaitee: "",
    creneau: "",
    message: "",
  });

  useEffect(() => {
    const service = params.get("service");
    if (service) setForm((f) => ({ ...f, typeService: service }));
  }, [params]);

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setErreur("");
    try {
      const res = await fetch(`${API}/api/rendez-vous`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok) {
        const d = await res.json();
        setErreur(d.erreur ?? "Enregistrement impossible.");
        return;
      }
      setEnvoye(true);
    } catch {
      setErreur("Serveur injoignable.");
    }
  }

  const champ =
    "w-full rounded-lg border border-nuit/15 bg-white px-4 py-3 font-sans text-sm text-ardoise outline-none transition-colors focus:border-or";
  const label =
    "mb-1.5 block font-display text-xs font-semibold uppercase tracking-wide text-ardoise/60";

  return (
    <div className="rounded-2xl border border-nuit/10 bg-white p-8 shadow-sm">
      {envoye ? (
        <div className="flex flex-col items-center py-10 text-center">
          <CheckCircle2 className="h-14 w-14 text-or" strokeWidth={1.3} />
          <h3 className="mt-4 font-display text-xl font-bold uppercase tracking-wide text-nuit">
            Demande enregistrée
          </h3>
          <p className="mt-2 max-w-md font-sans text-sm text-ardoise/70">
            Votre demande de rendez-vous a bien été prise en compte. L'Ambassade vous
            contactera pour confirmer la date et l'heure de votre passage.
          </p>
          <button
            onClick={() => setEnvoye(false)}
            className="mt-6 font-display text-xs font-semibold uppercase tracking-wide text-or-fonce hover:text-nuit"
          >
            Nouvelle demande
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-5">
          {erreur && (
            <p className="rounded-lg bg-red-50 px-4 py-2 font-sans text-sm text-red-700">
              {erreur}
            </p>
          )}

          <div className="mb-2 flex items-center gap-3">
            <span className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-nuit-gradient">
              <CalendarClock className="h-5 w-5 text-or" strokeWidth={1.6} />
            </span>
            <p className="font-sans text-sm text-ardoise/70">
              Remplissez le formulaire, nous confirmerons votre créneau par e-mail.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
            <div>
              <label className={label}>Nom</label>
              <input name="nom" value={form.nom} onChange={handleChange} required className={champ} />
            </div>
            <div>
              <label className={label}>Prénom</label>
              <input name="prenom" value={form.prenom} onChange={handleChange} required className={champ} />
            </div>
            <div>
              <label className={label}>E-mail</label>
              <input type="email" name="email" value={form.email} onChange={handleChange} required className={champ} />
            </div>
            <div>
              <label className={label}>Téléphone</label>
              <input name="telephone" value={form.telephone} onChange={handleChange} required className={champ} placeholder="+225…" />
            </div>
          </div>

          <div>
            <label className={label}>Type de service</label>
            <select name="typeService" value={form.typeService} onChange={handleChange} required className={champ}>
              <option value="">Sélectionnez un service…</option>
              {typesService.map((t) => (
                <option key={t} value={t}>
                  {t}
                </option>
              ))}
            </select>
          </div>

          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
            <div>
              <label className={label}>Date souhaitée</label>
              <input type="date" name="dateSouhaitee" value={form.dateSouhaitee} onChange={handleChange} required className={champ} />
            </div>
            <div>
              <label className={label}>Créneau</label>
              <select name="creneau" value={form.creneau} onChange={handleChange} required className={champ}>
                <option value="">Choisissez un créneau…</option>
                {creneaux.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <label className={label}>Message (facultatif)</label>
            <textarea name="message" value={form.message} onChange={handleChange} rows={4} className={champ} placeholder="Précisez votre demande si besoin…" />
          </div>

          <button
            type="submit"
            className="w-full rounded-full bg-or-gradient px-7 py-3.5 font-display text-xs font-semibold uppercase tracking-wide text-nuit-900 shadow-lg shadow-or/25 transition-transform hover:scale-[1.02] sm:w-auto"
          >
            Confirmer la demande
          </button>
        </form>
      )}
    </div>
  );
}

export default function RendezVousPage() {
  return (
    <main>
      <PageHeader
        titre="Prendre rendez-vous"
        sousTitre="Planifiez votre passage à l'Ambassade en quelques clics"
      />
      <section className="bg-creme py-20">
        <div className="mx-auto max-w-3xl px-4 lg:px-8">
          <Suspense fallback={<div className="h-96 rounded-2xl bg-white/50" />}>
            <FormulaireRendezVous />
          </Suspense>
        </div>
      </section>
    </main>
  );
}