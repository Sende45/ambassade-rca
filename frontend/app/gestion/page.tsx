import type { Metadata } from "next";
import PageHeader from "../components/PageHeader";
import { Building2, Users, FileText, Wallet, ClipboardList, Briefcase } from "lucide-react";

export const metadata: Metadata = {
  title: "Gestion | Ambassade de la République Centrafricaine",
  description:
    "Organisation et services administratifs de l'Ambassade de la République Centrafricaine en Côte d'Ivoire.",
};

const services = [
  {
    icone: Briefcase,
    titre: "Service diplomatique",
    texte: "Relations bilatérales, protocole et suivi des accords entre les deux États.",
  },
  {
    icone: FileText,
    titre: "Service consulaire",
    texte: "Passeports, visas, état civil et documents administratifs des ressortissants.",
  },
  {
    icone: Users,
    titre: "Affaires de la diaspora",
    texte: "Accompagnement de la communauté centrafricaine et animation de la vie associative.",
  },
  {
    icone: Wallet,
    titre: "Administration & finances",
    texte: "Gestion budgétaire, ressources humaines et logistique de la mission.",
  },
  {
    icone: ClipboardList,
    titre: "Coopération & partenariats",
    texte: "Suivi des projets économiques, culturels et des opportunités d'investissement.",
  },
  {
    icone: Building2,
    titre: "Secrétariat général",
    texte: "Coordination des services et point d'entrée des correspondances officielles.",
  },
];

export default function GestionPage() {
  return (
    <main>
      <PageHeader
        titre="Gestion"
        sousTitre="L'organisation administrative au service des usagers"
      />

      <section className="bg-creme py-20">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <p className="max-w-3xl font-sans text-base leading-relaxed text-ardoise/80">
            L'Ambassade s'organise en plusieurs services complémentaires, chacun dédié à
            une mission précise, afin d'offrir aux usagers un accompagnement clair et
            efficace. Voici les principaux pôles qui structurent la mission.
          </p>

          <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {services.map((s) => (
              <div
                key={s.titre}
                className="group rounded-2xl border border-nuit/10 bg-white p-7 shadow-sm transition-shadow hover:shadow-md"
              >
                <span className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-or-gradient">
                  <s.icone className="h-6 w-6 text-bordeaux" strokeWidth={1.5} />
                </span>
                <h3 className="mt-4 font-display text-lg font-semibold uppercase tracking-wide text-nuit">
                  {s.titre}
                </h3>
                <p className="mt-2 font-sans text-sm leading-relaxed text-ardoise/70">
                  {s.texte}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}