"use client";

import Link from "next/link";
import { motion, type Variants } from "framer-motion";

type Service = {
  titre: string;
  description: string;
  href: string;
  icone: React.ReactNode;
};

const IconePasseport = () => (
  <svg width="34" height="34" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
    <rect x="5" y="2.5" width="14" height="19" rx="2" />
    <circle cx="12" cy="10" r="2.6" />
    <path d="M9 16h6" />
  </svg>
);

const IconeVisa = () => (
  <svg width="34" height="34" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
    <path d="M6 3h9l3 3v15H6z" />
    <path d="M9 9h6M9 13h6M9 17h3" />
  </svg>
);

const IconeEtatCivil = () => (
  <svg width="34" height="34" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3.5" y="4.5" width="17" height="12" rx="1.5" />
    <circle cx="12" cy="16.5" r="3" />
    <path d="M10.5 19l-1 3 2.5-1.4L14.5 22l-1-3" />
  </svg>
);

const IconeAssistance = () => (
  <svg width="34" height="34" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 12l3-3a2 2 0 0 1 3 3l-4 4-3-1" />
    <path d="M12 12l-3-3a2 2 0 0 0-3 3l4 4 3-1" />
    <circle cx="7" cy="5.5" r="1.8" />
    <circle cx="17" cy="5.5" r="1.8" />
  </svg>
);

const services: Service[] = [
  {
    titre: "Passeports",
    description: "Demandes, renouvellements et retraits accompagnés de bout en bout.",
    href: "/rendez-vous?service=Passeport",
    icone: <IconePasseport />,
  },
  {
    titre: "Visas",
    description: "Procédures pour les voyageurs et les investisseurs vers la RCA.",
    href: "/rendez-vous?service=Visa",
    icone: <IconeVisa />,
  },
  {
    titre: "État civil",
    description: "Actes de naissance, de mariage et laissez-passer certifiés.",
    href: "/rendez-vous?service=État civil",
    icone: <IconeEtatCivil />,
  },
  {
    titre: "Assistance à la diaspora",
    description: "Conseil, rapatriement et solidarité en cas d'urgence.",
    href: "/rendez-vous?service=Assistance à la diaspora",
    icone: <IconeAssistance />,
  },
];

const grille: Variants = {
  cache: {},
  visible: { transition: { staggerChildren: 0.12 } },
};

const carte: Variants = {
  cache: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } },
};

export default function ServicesConsulaires() {
  return (
    <section className="bg-creme py-20">
      <div className="mx-auto max-w-7xl px-4 lg:px-8">
        <div className="max-w-2xl">
          <span className="font-display text-xs font-semibold uppercase tracking-[0.2em] text-or-fonce">
            Services consulaires
          </span>
          <h2 className="mt-3 font-display text-2xl font-bold uppercase tracking-wide text-nuit sm:text-3xl">
            Des démarches accompagnées, de la demande au retrait
          </h2>
          <div className="mt-4 h-px w-24 bg-or" />
        </div>

        <motion.div
          className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4"
          variants={grille}
          initial="cache"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
        >
          {services.map((s) => (
            <motion.div variants={carte} key={s.titre}>
              <Link
                href={s.href}
                className="group flex h-full flex-col rounded-2xl bg-or-gradient p-6 shadow-lg shadow-or-fonce/20 ring-1 ring-or-fonce/30 transition-transform hover:-translate-y-1"
              >
                <span className="text-bordeaux">{s.icone}</span>
                <h3 className="mt-5 font-display text-lg font-bold uppercase tracking-wide text-bordeaux">
                  {s.titre}
                </h3>
                <p className="mt-2 font-sans text-sm leading-relaxed text-bordeaux/80">
                  {s.description}
                </p>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}