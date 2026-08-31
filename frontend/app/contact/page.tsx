"use client";

import { useState } from "react";
import PageHeader from "../components/PageHeader";
import { MapPin, Phone, Mail, Clock, Send, CheckCircle2 } from "lucide-react";
import { API } from "@/lib/api";

const coordonnees = [
  { icone: MapPin, label: "Adresse", valeur: "Cocody, Abidjan — Côte d'Ivoire" },
  { icone: Phone, label: "Téléphone", valeur: "+225 00 00 00 00 00" },
  { icone: Mail, label: "E-mail", valeur: "contact@ambassade-rca.ci" },
  { icone: Clock, label: "Horaires", valeur: "Lun. – Ven. : 08h30 – 16h30" },
];

export default function ContactPage() {
  const [envoye, setEnvoye] = useState(false);
  const [erreur, setErreur] = useState("");
  const [form, setForm] = useState({ nom: "", email: "", sujet: "", message: "" });

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setErreur("");
    try {
      const res = await fetch(`${API}/api/contact`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok) {
        const d = await res.json();
        setErreur(d.erreur ?? "Envoi impossible.");
        return;
      }
      setEnvoye(true);
      setForm({ nom: "", email: "", sujet: "", message: "" });
    } catch {
      setErreur("Serveur injoignable.");
    }
  }

  const champ =
    "w-full rounded-lg border border-nuit/15 bg-white px-4 py-3 font-sans text-sm text-ardoise outline-none transition-colors focus:border-or";

  return (
    <main>
      <PageHeader titre="Contact" sousTitre="L'Ambassade à votre écoute" />

      <section className="bg-creme py-20">
        <div className="mx-auto grid max-w-7xl gap-12 px-4 lg:grid-cols-5 lg:px-8">
          {/* Coordonnées */}
          <div className="lg:col-span-2">
            <h2 className="font-display text-xl font-bold uppercase tracking-wide text-nuit">
              Nos coordonnées
            </h2>
            <div className="mt-4 h-px w-20 bg-or" />
            <ul className="mt-8 space-y-6">
              {coordonnees.map((c) => (
                <li key={c.label} className="flex gap-4">
                  <span className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-nuit-gradient">
                    <c.icone className="h-5 w-5 text-or" strokeWidth={1.6} />
                  </span>
                  <div>
                    <p className="font-display text-xs font-semibold uppercase tracking-wide text-ardoise/50">
                      {c.label}
                    </p>
                    <p className="mt-0.5 font-sans text-sm text-ardoise/90">{c.valeur}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          {/* Formulaire */}
          <div className="lg:col-span-3">
            <div className="rounded-2xl border border-nuit/10 bg-white p-8 shadow-sm">
              {envoye ? (
                <div className="flex flex-col items-center py-10 text-center">
                  <CheckCircle2 className="h-14 w-14 text-or" strokeWidth={1.3} />
                  <h3 className="mt-4 font-display text-xl font-bold uppercase tracking-wide text-nuit">
                    Message envoyé
                  </h3>
                  <p className="mt-2 font-sans text-sm text-ardoise/70">
                    Merci pour votre message. Nos services vous répondront dans les meilleurs
                    délais.
                  </p>
                  <button
                    onClick={() => setEnvoye(false)}
                    className="mt-6 font-display text-xs font-semibold uppercase tracking-wide text-or-fonce hover:text-nuit"
                  >
                    Envoyer un autre message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  {erreur && (
                    <p className="rounded-lg bg-red-50 px-4 py-2 font-sans text-sm text-red-700">
                      {erreur}
                    </p>
                  )}
                  <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                    <div>
                      <label className="mb-1.5 block font-display text-xs font-semibold uppercase tracking-wide text-ardoise/60">
                        Nom complet
                      </label>
                      <input
                        name="nom"
                        value={form.nom}
                        onChange={handleChange}
                        required
                        className={champ}
                        placeholder="Votre nom"
                      />
                    </div>
                    <div>
                      <label className="mb-1.5 block font-display text-xs font-semibold uppercase tracking-wide text-ardoise/60">
                        E-mail
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={form.email}
                        onChange={handleChange}
                        required
                        className={champ}
                        placeholder="vous@exemple.com"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="mb-1.5 block font-display text-xs font-semibold uppercase tracking-wide text-ardoise/60">
                      Sujet
                    </label>
                    <input
                      name="sujet"
                      value={form.sujet}
                      onChange={handleChange}
                      required
                      className={champ}
                      placeholder="Objet de votre demande"
                    />
                  </div>
                  <div>
                    <label className="mb-1.5 block font-display text-xs font-semibold uppercase tracking-wide text-ardoise/60">
                      Message
                    </label>
                    <textarea
                      name="message"
                      value={form.message}
                      onChange={handleChange}
                      required
                      rows={5}
                      className={champ}
                      placeholder="Votre message…"
                    />
                  </div>
                  <button
                    type="submit"
                    className="inline-flex items-center gap-2 rounded-full bg-or-gradient px-7 py-3.5 font-display text-xs font-semibold uppercase tracking-wide text-nuit-900 shadow-lg shadow-or/25 transition-transform hover:scale-[1.03]"
                  >
                    Envoyer le message
                    <Send className="h-4 w-4" />
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}