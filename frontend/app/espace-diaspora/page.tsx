import type { Metadata } from "next";
import Link from "next/link";
import PageHeader from "../components/PageHeader";
import Reveal from "../components/motion/Reveal";
import { UserPlus, FileCheck, CalendarDays, LifeBuoy, Users, Vote } from "lucide-react";

export const metadata: Metadata = {
  title: "Espace Diaspora | Ambassade de la République Centrafricaine",
  description:
    "Ressources et services pour la communauté centrafricaine de Côte d'Ivoire : inscription consulaire, démarches, événements et solidarité.",
};

const ressources = [
  {
    icone: UserPlus,
    titre: "Inscription consulaire",
    texte: "Faites-vous recenser auprès de l'Ambassade pour bénéficier de la protection consulaire.",
  },
  {
    icone: FileCheck,
    titre: "Démarches administratives",
    texte: "Passeports, actes d'état civil, laissez-passer et attestations diverses.",
  },
  {
    icone: LifeBuoy,
    titre: "Assistance & solidarité",
    texte: "Soutien en cas d'urgence, rapatriement et accompagnement social.",
  },
  {
    icone: CalendarDays,
    titre: "Événements communautaires",
    texte: "Fêtes nationales, rencontres et célébrations de la culture centrafricaine.",
  },
  {
    icone: Users,
    titre: "Vie associative",
    texte: "Mise en relation avec les associations de la diaspora centrafricaine en Côte d'Ivoire.",
  },
  {
    icone: Vote,
    titre: "Participation citoyenne",
    texte: "Informations sur les droits, devoirs et démarches liés à la citoyenneté.",
  },
];

export default function EspaceDiasporaPage() {
  return (
    <main>
      <PageHeader
        titre="Espace Diaspora"
        sousTitre="Au service de la communauté centrafricaine de Côte d'Ivoire"
      />

      <section className="bg-creme py-20">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <Reveal>
            <p className="max-w-3xl font-sans text-base leading-relaxed text-ardoise/80">
              L'Espace Diaspora rassemble l'ensemble des ressources destinées aux
              ressortissants centrafricains résidant en Côte d'Ivoire. Retrouvez ici les
              services essentiels pour vivre, vous informer et rester connecté à votre pays.
            </p>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {ressources.map((r) => (
                <div
                  key={r.titre}
                  className="rounded-2xl border border-nuit/10 bg-white p-7 shadow-sm transition-shadow hover:shadow-md"
                >
                  <span className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-nuit-gradient">
                    <r.icone className="h-6 w-6 text-or" strokeWidth={1.5} />
                  </span>
                  <h3 className="mt-4 font-display text-lg font-semibold uppercase tracking-wide text-nuit">
                    {r.titre}
                  </h3>
                  <p className="mt-2 font-sans text-sm leading-relaxed text-ardoise/70">
                    {r.texte}
                  </p>
                </div>
              ))}
            </div>
          </Reveal>

          <Reveal delay={0.15}>
            <div className="mt-14 rounded-2xl bg-nuit-gradient px-8 py-10 text-center">
              <h2 className="font-display text-xl font-bold uppercase tracking-wide text-creme sm:text-2xl">
                Vous venez d'arriver en Côte d'Ivoire ?
              </h2>
              <p className="mx-auto mt-3 max-w-xl font-sans text-sm leading-relaxed text-creme/80">
                Inscrivez-vous au registre consulaire pour faciliter vos démarches et rester
                informé des actualités de la communauté.
              </p>
              <Link href="/rendez-vous" className="mt-6 inline-block rounded-full bg-or-gradient px-7 py-3.5 font-display text-xs font-semibold uppercase tracking-wide text-nuit-900 transition-transform hover:scale-[1.03]">
                Prendre rendez-vous
              </Link>
            </div>
          </Reveal>
        </div>
      </section>
    </main>
  );
}