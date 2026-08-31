import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import PageHeader from "../components/PageHeader";
import Reveal from "../components/motion/Reveal";
import { IMAGES } from "@/lib/images";
import {
  MapPin,
  Languages,
  Coins,
  Calendar,
  Gem,
  Sprout,
  Trees,
  Zap,
  Smartphone,
  Building2,
  ArrowRight,
} from "lucide-react";

export const metadata: Metadata = {
  title: "La Centrafrique | Ambassade de la République Centrafricaine",
  description:
    "Découvrir la République Centrafricaine : institutions, économie, ressources et opportunités d'investissement.",
};

// ⚠️ Contenu de démarrage — à valider et compléter avec les sources officielles de l'Ambassade.
const reperes = [
  { icone: MapPin, label: "Capitale", valeur: "Bangui" },
  { icone: Languages, label: "Langues officielles", valeur: "Sango & Français" },
  { icone: Coins, label: "Monnaie", valeur: "Franc CFA (XAF)" },
  { icone: Calendar, label: "Fête nationale", valeur: "1er décembre" },
];

const secteurs = [
  {
    icone: Gem,
    titre: "Mines & ressources",
    texte: "Diamant, or et autres ressources minières : un potentiel majeur à valoriser.",
  },
  {
    icone: Sprout,
    titre: "Agriculture",
    texte: "Terres fertiles et cultures vivrières et de rente (café, coton, manioc…).",
  },
  {
    icone: Trees,
    titre: "Forêt & bois",
    texte: "Filière bois et exploitation durable des ressources forestières.",
  },
  {
    icone: Zap,
    titre: "Énergie",
    texte: "Fort potentiel hydroélectrique et projets d'énergies renouvelables.",
  },
  {
    icone: Smartphone,
    titre: "Numérique",
    texte: "Économie numérique et innovation, axes prioritaires du développement.",
  },
  {
    icone: Building2,
    titre: "Infrastructures",
    texte: "Routes, bâtiments et grands projets structurants en développement.",
  },
];

export default function CentrafriquePage() {
  return (
    <main>
      <PageHeader
        titre="La Centrafrique"
        sousTitre="Au cœur de l'Afrique, une terre d'histoire et d'opportunités"
      />

      {/* Repères */}
      <section className="bg-creme py-20">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <Reveal>
            <div className="max-w-3xl">
              <span className="font-display text-xs font-semibold uppercase tracking-[0.2em] text-or-fonce">
                Présentation
              </span>
              <h2 className="mt-3 font-display text-2xl font-bold uppercase tracking-wide text-nuit sm:text-3xl">
                Un pays au centre du continent
              </h2>
              <div className="mt-4 h-px w-24 bg-or" />
              <p className="mt-6 font-sans text-base leading-relaxed text-ardoise/80">
                Située au cœur de l'Afrique, la République Centrafricaine est un pays riche
                de son histoire, de sa culture et de ses ressources naturelles. Elle s'engage
                sur la voie du développement, de la stabilité et de l'ouverture aux
                partenaires et investisseurs internationaux.
              </p>
            </div>
          </Reveal>

          {/* Image de Bangui */}
          {IMAGES.bangui && (
            <Reveal delay={0.1}>
              <div className="relative mt-10 h-64 overflow-hidden rounded-2xl sm:h-80 lg:h-96">
                <Image
                  src={IMAGES.bangui}
                  alt="Bangui, capitale de la République Centrafricaine"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1280px) 100vw, 1280px"
                />
                {/* Dégradé nuit pour l'harmonie et la lisibilité */}
                <div
                  className="absolute inset-0"
                  style={{
                    background:
                      "linear-gradient(to top, rgba(10,18,32,0.85) 0%, rgba(10,18,32,0.15) 45%, rgba(10,18,32,0.05) 100%)",
                  }}
                  aria-hidden
                />
                <div className="absolute bottom-0 left-0 p-6 lg:p-8">
                  <p className="font-display text-xs font-semibold uppercase tracking-[0.2em] text-or">
                    La capitale
                  </p>
                  <p className="mt-1 font-display text-2xl font-bold uppercase tracking-wide text-creme sm:text-3xl">
                    Bangui
                  </p>
                </div>
              </div>
            </Reveal>
          )}

          <Reveal delay={0.15}>
            <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {reperes.map((r) => (
                <div key={r.label} className="rounded-2xl border border-nuit/10 bg-white p-6 text-center shadow-sm">
                  <span className="mx-auto inline-flex h-12 w-12 items-center justify-center rounded-xl bg-nuit-gradient">
                    <r.icone className="h-6 w-6 text-or" strokeWidth={1.5} />
                  </span>
                  <p className="mt-4 font-display text-xs font-semibold uppercase tracking-wide text-ardoise/50">
                    {r.label}
                  </p>
                  <p className="mt-1 font-display text-lg font-bold text-nuit">{r.valeur}</p>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* Institutions */}
      <section className="bg-nuit-900 py-20">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <Reveal>
            <span className="font-display text-xs font-semibold uppercase tracking-[0.2em] text-or">
              Institutions
            </span>
            <h2 className="mt-3 font-display text-2xl font-bold uppercase tracking-wide text-creme sm:text-3xl">
              La République
            </h2>
            <div className="mt-4 h-px w-24 bg-or" />
          </Reveal>

          <Reveal delay={0.1}>
            <div className="mt-10 grid gap-6 lg:grid-cols-3">
              {/* Président avec photo */}
              <div className="overflow-hidden rounded-2xl border border-or/20 bg-nuit-800/50 lg:col-span-1">
                <div className="aspect-[4/5] w-full overflow-hidden bg-nuit-gradient">
                  {IMAGES.president ? (
                    <Image
                      src={IMAGES.president}
                      alt="S.E. Faustin-Archange Touadéra, Président de la République Centrafricaine"
                      width={600}
                      height={750}
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <div className="flex h-full w-full items-center justify-center font-sans text-sm text-creme/40">
                      Portrait officiel à venir
                    </div>
                  )}
                </div>
                <div className="p-6">
                  <h3 className="font-display text-sm font-semibold uppercase tracking-wide text-or">
                    Président de la République
                  </h3>
                  <p className="mt-2 font-display text-lg font-bold text-creme">
                    S.E. Faustin-Archange Touadéra
                  </p>
                  <p className="mt-1 font-sans text-sm text-creme/60">
                    Chef de l'État, investi pour un nouveau mandat en 2026.
                  </p>
                </div>
              </div>

              <div className="rounded-2xl border border-or/20 bg-nuit-800/50 p-7 lg:col-span-2">
                <h3 className="font-display text-sm font-semibold uppercase tracking-wide text-or">
                  Régime & organisation
                </h3>
                <p className="mt-3 font-sans text-sm leading-relaxed text-creme/70">
                  La République Centrafricaine est un État de régime présidentiel. Le pouvoir
                  exécutif est dirigé par le Président de la République, assisté d'un
                  gouvernement. Le pays s'appuie sur des institutions garantes de la
                  souveraineté nationale et œuvre à la consolidation de la paix, de la
                  démocratie et du développement.
                </p>
                <p className="mt-3 font-sans text-xs italic text-creme/40">
                  [Section à compléter avec les informations institutionnelles officielles.]
                </p>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Investir */}
      <section className="bg-creme py-20">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <Reveal>
            <div className="max-w-3xl">
              <span className="font-display text-xs font-semibold uppercase tracking-[0.2em] text-or-fonce">
                Économie & opportunités
              </span>
              <h2 className="mt-3 font-display text-2xl font-bold uppercase tracking-wide text-nuit sm:text-3xl">
                Investir en Centrafrique
              </h2>
              <div className="mt-4 h-px w-24 bg-or" />
              <p className="mt-6 font-sans text-base leading-relaxed text-ardoise/80">
                La Centrafrique offre de réelles opportunités aux investisseurs dans des
                secteurs stratégiques. L'Ambassade accompagne les porteurs de projets
                souhaitant contribuer au développement du pays.
              </p>
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {secteurs.map((s) => (
                <div key={s.titre} className="rounded-2xl border border-nuit/10 bg-white p-7 shadow-sm transition-shadow hover:shadow-md">
                  <s.icone className="h-8 w-8 text-or-fonce" strokeWidth={1.5} />
                  <h3 className="mt-4 font-display text-lg font-semibold uppercase tracking-wide text-nuit">
                    {s.titre}
                  </h3>
                  <p className="mt-2 font-sans text-sm leading-relaxed text-ardoise/70">
                    {s.texte}
                  </p>
                </div>
              ))}
            </div>
          </Reveal>

          <Reveal delay={0.15}>
            <div className="mt-14 flex flex-col items-center rounded-2xl bg-nuit-gradient px-8 py-10 text-center">
              <h3 className="font-display text-xl font-bold uppercase tracking-wide text-creme sm:text-2xl">
                Un projet d'investissement ?
              </h3>
              <p className="mx-auto mt-3 max-w-xl font-sans text-sm leading-relaxed text-creme/80">
                Contactez l'Ambassade pour être accompagné dans la découverte des
                opportunités et des démarches en Centrafrique.
              </p>
              <Link
                href="/contact"
                className="mt-6 inline-flex items-center gap-2 rounded-full bg-or-gradient px-7 py-3.5 font-display text-xs font-semibold uppercase tracking-wide text-nuit-900 transition-transform hover:scale-[1.03]"
              >
                Nous contacter
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </Reveal>
        </div>
      </section>
    </main>
  );
}