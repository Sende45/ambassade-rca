import type { Metadata } from "next";
import PageHeader from "../components/PageHeader";
import Reveal from "../components/motion/Reveal";
import { TrendingUp, GraduationCap, Shield, Globe2, Leaf, Building } from "lucide-react";

export const metadata: Metadata = {
  title: "Coopération | Ambassade de la République Centrafricaine",
  description:
    "Coopération bilatérale entre la République Centrafricaine et la Côte d'Ivoire : économie, culture, sécurité et opportunités d'investissement.",
};

const domaines = [
  {
    icone: TrendingUp,
    titre: "Coopération économique",
    texte: "Échanges commerciaux, investissements et partenariats entre entreprises des deux pays.",
  },
  {
    icone: GraduationCap,
    titre: "Éducation & formation",
    texte: "Mobilité étudiante, bourses et coopération universitaire et technique.",
  },
  {
    icone: Shield,
    titre: "Sécurité & défense",
    texte: "Dialogue et coopération en matière de paix, de stabilité régionale et de sécurité.",
  },
  {
    icone: Leaf,
    titre: "Agriculture & ressources",
    texte: "Valorisation des ressources naturelles et partage de savoir-faire agricole.",
  },
  {
    icone: Globe2,
    titre: "Culture & diplomatie",
    texte: "Rayonnement culturel, événements conjoints et liens entre les peuples.",
  },
  {
    icone: Building,
    titre: "Infrastructures & énergie",
    texte: "Projets structurants et partenariats dans les secteurs porteurs.",
  },
];

export default function CooperationPage() {
  return (
    <main>
      <PageHeader
        titre="Coopération"
        sousTitre="Un partenariat d'excellence entre deux nations amies"
      />

      {/* Intro */}
      <section className="bg-creme py-20">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <Reveal>
            <div className="max-w-3xl">
              <span className="font-display text-xs font-semibold uppercase tracking-[0.2em] text-or-fonce">
                Relations bilatérales
              </span>
              <h2 className="mt-3 font-display text-2xl font-bold uppercase tracking-wide text-nuit sm:text-3xl">
                La Centrafrique et la Côte d'Ivoire
              </h2>
              <div className="mt-4 h-px w-24 bg-or" />
              <p className="mt-6 font-sans text-base leading-relaxed text-ardoise/80">
                La République Centrafricaine et la Côte d'Ivoire entretiennent des relations
                d'amitié et de fraternité fondées sur des valeurs partagées. L'Ambassade œuvre
                au quotidien pour approfondir cette coopération dans des domaines stratégiques
                au bénéfice des deux peuples.
              </p>
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {domaines.map((d) => (
                <div
                  key={d.titre}
                  className="rounded-2xl border border-nuit/10 bg-white p-7 shadow-sm transition-shadow hover:shadow-md"
                >
                  <d.icone className="h-8 w-8 text-or-fonce" strokeWidth={1.5} />
                  <h3 className="mt-4 font-display text-lg font-semibold uppercase tracking-wide text-nuit">
                    {d.titre}
                  </h3>
                  <p className="mt-2 font-sans text-sm leading-relaxed text-ardoise/70">
                    {d.texte}
                  </p>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* Appel investisseurs */}
      <section className="bg-nuit-gradient py-16">
        <Reveal>
          <div className="mx-auto max-w-4xl px-4 text-center lg:px-8">
            <h2 className="font-display text-2xl font-bold uppercase tracking-wide text-creme sm:text-3xl">
              Investir en Centrafrique
            </h2>
            <p className="mx-auto mt-4 max-w-2xl font-sans text-base leading-relaxed text-creme/80">
              Vous êtes investisseur ou porteur de projet ? L'Ambassade vous accompagne dans
              la découverte des opportunités et des secteurs porteurs de la République
              Centrafricaine.
            </p>
            <a href="/contact" className="mt-8 inline-block rounded-full bg-or-gradient px-7 py-3.5 font-display text-xs font-semibold uppercase tracking-wide text-nuit-900 shadow-lg shadow-or/25 transition-transform hover:scale-[1.03]">
              Nous contacter
            </a>
          </div>
        </Reveal>
      </section>
    </main>
  );
}