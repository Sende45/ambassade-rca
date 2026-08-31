import type { Metadata } from "next";
import Link from "next/link";
import PageHeader from "../components/PageHeader";
import Reveal from "../components/motion/Reveal";
import { BookUser, Plane, FileText, HeartHandshake, ArrowRight } from "lucide-react";

export const metadata: Metadata = {
  title: "Services consulaires | Ambassade de la République Centrafricaine",
  description:
    "Les services consulaires de l'Ambassade : passeports, visas, état civil et assistance à la diaspora.",
};

const services = [
  {
    icone: BookUser,
    titre: "Passeports",
    texte:
      "Établissement, renouvellement et retrait des passeports centrafricains. Constitution du dossier et suivi personnalisé.",
    href: "/rendez-vous?service=Passeport",
  },
  {
    icone: Plane,
    titre: "Visas",
    texte:
      "Délivrance de visas pour la République Centrafricaine, à destination des voyageurs, des investisseurs et des délégations officielles.",
    href: "/rendez-vous?service=Visa",
  },
  {
    icone: FileText,
    titre: "État civil",
    texte:
      "Actes de naissance, de mariage, laissez-passer et légalisation de documents officiels certifiés.",
    href: "/rendez-vous?service=État civil",
  },
  {
    icone: HeartHandshake,
    titre: "Assistance à la diaspora",
    texte:
      "Conseil, rapatriement et solidarité en cas d'urgence. Accompagnement social et protection des ressortissants.",
    href: "/espace-diaspora",
  },
];

export default function ServicesConsulairesPage() {
  return (
    <main>
      <PageHeader
        titre="Services consulaires"
        sousTitre="Des démarches accompagnées, de la demande au retrait"
      />

      <section className="bg-creme py-20">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <Reveal>
            <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
              {services.map((s) => (
                <div
                  key={s.titre}
                  className="flex flex-col rounded-2xl border border-nuit/10 bg-white p-8 shadow-sm transition-shadow hover:shadow-md"
                >
                  <span className="inline-flex h-14 w-14 items-center justify-center rounded-xl bg-or-gradient">
                    <s.icone className="h-7 w-7 text-bordeaux" strokeWidth={1.4} />
                  </span>
                  <h3 className="mt-5 font-display text-xl font-bold uppercase tracking-wide text-nuit">
                    {s.titre}
                  </h3>
                  <p className="mt-3 flex-1 font-sans text-sm leading-relaxed text-ardoise/70">
                    {s.texte}
                  </p>
                  <Link
                    href={s.href}
                    className="mt-6 inline-flex items-center gap-1.5 font-display text-xs font-semibold uppercase tracking-wide text-or-fonce transition-colors hover:text-nuit"
                  >
                    Faire une demande
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>
              ))}
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <p className="mt-12 rounded-xl border border-or/30 bg-or/5 px-6 py-4 font-sans text-sm text-ardoise/80">
              <span className="font-semibold text-nuit">Bon à savoir :</span> toute démarche
              consulaire se fait sur rendez-vous. Munissez-vous des pièces justificatives
              requises pour accélérer le traitement de votre dossier.
            </p>
          </Reveal>
        </div>
      </section>
    </main>
  );
}