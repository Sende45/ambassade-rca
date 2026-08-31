import type { Metadata } from "next";
import PageHeader from "../components/PageHeader";
import Reveal from "../components/motion/Reveal";
import { Mail, User } from "lucide-react";

export const metadata: Metadata = {
  title: "Le Personnel | Ambassade de la République Centrafricaine",
  description:
    "L'équipe de l'Ambassade de la République Centrafricaine en Côte d'Ivoire, de l'Ambassadeur à l'ensemble des services.",
};

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

const API = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:4000";

async function getMembres(): Promise<Membre[]> {
  try {
    const res = await fetch(`${API}/api/membres`, { cache: "no-store" });
    if (!res.ok) return [];
    return await res.json();
  } catch {
    return [];
  }
}

export default async function EquipePage() {
  const membres = await getMembres();
  const chef = membres[0];
  const autres = membres.slice(1);

  return (
    <main>
      <PageHeader
        titre="Le Personnel"
        sousTitre="L'équipe au service de la diplomatie centrafricaine"
      />

      <section className="bg-creme py-20">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          {membres.length === 0 ? (
            <div className="flex flex-col items-center rounded-2xl border border-nuit/10 bg-white py-16 text-center">
              <User className="h-12 w-12 text-or" strokeWidth={1.3} />
              <p className="mt-4 font-display text-lg font-semibold uppercase tracking-wide text-nuit">
                L'équipe sera présentée prochainement
              </p>
            </div>
          ) : (
            <>
              {/* Le chef de mission, mis en avant */}
              {chef && (
                <Reveal>
                  <div className="mx-auto flex max-w-2xl flex-col items-center rounded-2xl bg-nuit-gradient p-10 text-center">
                    <div className="h-32 w-32 overflow-hidden rounded-full ring-2 ring-or/40">
                      {chef.photo ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img src={chef.photo} alt={`${chef.prenom} ${chef.nom}`} className="h-full w-full object-cover" />
                      ) : (
                        <div className="flex h-full w-full items-center justify-center bg-nuit-800 font-display text-3xl font-bold text-or">
                          {chef.prenom.charAt(0)}
                          {chef.nom.charAt(0)}
                        </div>
                      )}
                    </div>
                    <p className="mt-5 font-display text-xl font-bold uppercase tracking-wide text-creme">
                      {chef.prenom} {chef.nom}
                    </p>
                    <p className="mt-1 font-display text-sm font-semibold uppercase tracking-wide text-or">
                      {chef.poste}
                    </p>
                    {chef.service && (
                      <p className="mt-1 font-sans text-sm text-creme/60">{chef.service}</p>
                    )}
                    {chef.email && (
                      <a href={`mailto:${chef.email}`} className="mt-4 inline-flex items-center gap-1.5 font-sans text-sm text-creme/70 hover:text-or">
                        <Mail className="h-4 w-4" />
                        {chef.email}
                      </a>
                    )}
                  </div>
                </Reveal>
              )}

              {/* Le reste de l'équipe */}
              {autres.length > 0 && (
                <Reveal delay={0.1}>
                  <div className="mt-16">
                    <h2 className="text-center font-display text-xl font-bold uppercase tracking-wide text-nuit">
                      L'équipe de l'Ambassade
                    </h2>
                    <div className="mx-auto mt-3 h-px w-24 bg-or" />

                    <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                      {autres.map((m) => (
                        <div key={m.id} className="flex flex-col items-center rounded-2xl border border-nuit/10 bg-white p-6 text-center shadow-sm transition-shadow hover:shadow-md">
                          <div className="h-24 w-24 overflow-hidden rounded-full ring-1 ring-or/30">
                            {m.photo ? (
                              // eslint-disable-next-line @next/next/no-img-element
                              <img src={m.photo} alt={`${m.prenom} ${m.nom}`} className="h-full w-full object-cover" />
                            ) : (
                              <div className="flex h-full w-full items-center justify-center bg-nuit-gradient font-display text-xl font-bold text-or">
                                {m.prenom.charAt(0)}
                                {m.nom.charAt(0)}
                              </div>
                            )}
                          </div>
                          <p className="mt-4 font-display text-sm font-bold uppercase tracking-wide text-nuit">
                            {m.prenom} {m.nom}
                          </p>
                          <p className="mt-1 font-sans text-xs font-semibold uppercase tracking-wide text-or-fonce">
                            {m.poste}
                          </p>
                          {m.service && (
                            <p className="mt-1 font-sans text-xs text-ardoise/50">{m.service}</p>
                          )}
                          {m.email && (
                            <a href={`mailto:${m.email}`} className="mt-3 inline-flex items-center gap-1 font-sans text-xs text-ardoise/60 hover:text-or-fonce">
                              <Mail className="h-3.5 w-3.5" />
                              Contacter
                            </a>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                </Reveal>
              )}
            </>
          )}
        </div>
      </section>
    </main>
  );
}