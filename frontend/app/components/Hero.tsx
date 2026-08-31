"use client";

import Link from "next/link";
import { motion, type Variants } from "framer-motion";
import { IMAGES } from "@/lib/images";

const conteneur: Variants = {
  cache: {},
  visible: { transition: { staggerChildren: 0.15, delayChildren: 0.15 } },
};

const item: Variants = {
  cache: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } },
};

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-nuit-900">
      {/* Image de fond : Abidjan */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url('${IMAGES.hero}')` }}
        aria-hidden
      />
      {/* Voile nuit pour la lisibilité */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(135deg, rgba(10,18,32,0.94) 0%, rgba(10,18,32,0.6) 55%, rgba(10,18,32,0.4) 100%)",
        }}
        aria-hidden
      />

      <motion.div
        className="relative mx-auto max-w-4xl px-4 py-24 text-center sm:py-28 lg:py-36"
        variants={conteneur}
        initial="cache"
        animate="visible"
      >
        <motion.h1
          variants={item}
          className="font-display text-3xl font-bold uppercase leading-tight tracking-wide text-creme sm:text-4xl lg:text-5xl"
        >
          Le prestige de la diplomatie
          <br className="hidden sm:block" /> centrafricaine à Abidjan
        </motion.h1>

        <motion.p
          variants={item}
          className="mx-auto mt-5 max-w-2xl font-display text-sm font-medium uppercase tracking-[0.15em] text-or sm:text-base"
        >
          Une présence d&apos;excellence pour la diaspora et les investisseurs
        </motion.p>

        <motion.div
          variants={item}
          className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row"
        >
          <Link
            href="/services-consulaires"
            className="rounded-full bg-or-gradient px-7 py-3.5 font-display text-xs font-semibold uppercase tracking-wide text-nuit-900 shadow-lg shadow-or/25 transition-transform hover:scale-[1.03]"
          >
            Accéder aux services consulaires
          </Link>
          <Link
            href="/cooperation"
            className="rounded-full border border-or/60 px-7 py-3.5 font-display text-xs font-semibold uppercase tracking-wide text-or transition-colors hover:bg-or/10"
          >
            Explorer les opportunités
          </Link>
        </motion.div>
      </motion.div>
    </section>
  );
}