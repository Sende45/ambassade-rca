import type { Metadata } from "next";
import PageHeader from "../components/PageHeader";
import Reveal from "../components/motion/Reveal";
import { Landmark, ScrollText, Handshake, ShieldCheck } from "lucide-react";

export const metadata: Metadata = {
  title: "Chancellerie | Ambassade de la République Centrafricaine",
  description:
    "La chancellerie de l'Ambassade de la République Centrafricaine en Côte d'Ivoire : mission diplomatique, mot de l'Ambassadeur et valeurs.",
};

const missions = [
  {
    icone: Landmark,
    titre: "Représentation diplomatique",
    texte:
      "Représenter la République Centrafricaine auprès des autorités ivoiriennes et des institutions présentes à Abidjan.",
  },
  {
    icone: Handshake,
    titre: "Coopération bilatérale",
    texte:
      "Renforcer les liens d'amitié et les partenariats économiques, culturels et sécuritaires entre les deux pays.",
  },
  {
    icone: ScrollText,
    titre: "Services aux ressortissants",
    texte:
      "Assurer la protection consulaire et accompagner la communauté centrafricaine dans ses démarches administratives.",
  },
  {
    icone: ShieldCheck,
    titre: "Promotion des intérêts nationaux",
    texte:
      "Défendre les intérêts de la Nation et valoriser l'image de la Centrafrique auprès des investisseurs et partenaires.",
  },
];

export default function ChancelleriePage() {
  return (
    <main>
      <PageHeader
        titre="Chancellerie"
        sousTitre="La mission diplomatique de la République Centrafricaine à Abidjan"
      />

      {/* Mot de l'Ambassadeur */}
      <section className="bg-creme py-20">
        <Reveal>
          <div className="mx-auto grid max-w-7xl gap-12 px-4 lg:grid-cols-3 lg:px-8">
            <div className="lg:col-span-1">
              <div className="aspect-[3/4] overflow-hidden rounded-2xl bg-nuit-gradient ring-1 ring-or/20" />
              <p className="mt-4 text-center font-display text-sm font-semibold uppercase tracking-wide text-nuit">
                S.E. M. [Nom de l'Ambassadeur]
              </p>
              <p className="text-center font-sans text-xs text-ardoise/60">
                Ambassadeur extraordinaire et plénipotentiaire
              </p>
            </div>

            <div className="lg:col-span-2">
              <span className="font-display text-xs font-semibold uppercase tracking-[0.2em] text-or-fonce">
                Mot de l'Ambassadeur
              </span>
              <h2 className="mt-3 font-display text-2xl font-bold uppercase tracking-wide text-nuit sm:text-3xl">
                Bienvenue à l'Ambassade
              </h2>
              <div className="mt-4 h-px w-24 bg-or" />
              <div className="mt-6 space-y-4 font-sans text-base leading-relaxed text-ardoise/80">
                <p>
                  [Texte à fournir par la chancellerie.] C'est avec un profond honneur que je
                  vous souhaite la bienvenue sur le portail officiel de l'Ambassade de la
                  République Centrafricaine en Côte d'Ivoire.
                </p>
                <p>
                  Notre mission est de servir la communauté centrafricaine, de renforcer les
                  liens d'amitié entre nos deux pays frères et d'accompagner tous ceux qui
                  souhaitent découvrir les opportunités qu'offre la Centrafrique.
                </p>
                <p>
                  Nos équipes se tiennent à votre disposition pour vous accompagner dans vos
                  démarches avec rigueur, courtoisie et efficacité.
                </p>
              </div>
            </div>
          </div>
        </Reveal>
      </section>

      {/* Missions */}
      <section className="bg-nuit-900 py-20">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <Reveal>
            <span className="font-display text-xs font-semibold uppercase tracking-[0.2em] text-or">
              Nos missions
            </span>
            <h2 className="mt-3 font-display text-2xl font-bold uppercase tracking-wide text-creme sm:text-3xl">
              Le rôle de la chancellerie
            </h2>
            <div className="mt-4 h-px w-24 bg-or" />
          </Reveal>

          <Reveal delay={0.1}>
            <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2">
              {missions.map((m) => (
                <div
                  key={m.titre}
                  className="rounded-2xl border border-or/20 bg-nuit-800/50 p-7 transition-colors hover:border-or/50"
                >
                  <m.icone className="h-8 w-8 text-or" strokeWidth={1.4} />
                  <h3 className="mt-4 font-display text-lg font-semibold uppercase tracking-wide text-creme">
                    {m.titre}
                  </h3>
                  <p className="mt-2 font-sans text-sm leading-relaxed text-creme/70">
                    {m.texte}
                  </p>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>
    </main>
  );
}