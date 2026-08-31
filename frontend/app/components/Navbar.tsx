"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { IMAGES } from "@/lib/images";

const liens = [
  { label: "Accueil", href: "/" },
  { label: "Chancellerie", href: "/chancellerie" },
  { label: "Gestion", href: "/gestion" },
  { label: "Actualités", href: "/actualites" },
  { label: "Coopération", href: "/cooperation" },
  { label: "La Centrafrique", href: "/la-centrafrique" },
  { label: "Espace Diaspora", href: "/espace-diaspora" },
  { label: "Le Personnel", href: "/equipe" },
  { label: "Contact", href: "/contact" },
  
];

export default function Navbar() {
  const [ouvert, setOuvert] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-or/20 bg-nuit-900">
      <nav className="mx-auto flex max-w-7xl items-center justify-between gap-6 px-4 py-3 lg:px-8">
        {/* Logo */}
        <Link href="/" className="flex shrink-0 items-center gap-3">
          <Image
            src={IMAGES.blason}
            alt="Blason de la République Centrafricaine"
            width={44}
            height={44}
            className="h-11 w-11 object-contain"
            priority
          />
          <span className="hidden font-display text-[11px] font-semibold leading-tight tracking-wide text-creme sm:block">
            Ambassade de la
            <br />
            République Centrafricaine
            <br />
            <span className="text-or">en Côte d&apos;Ivoire</span>
          </span>
        </Link>

        {/* Liens desktop */}
        <ul className="hidden items-center gap-5 2xl:flex">
          {liens.map((l) => (
            <li key={l.href}>
              <Link
                href={l.href}
                className="whitespace-nowrap font-display text-xs uppercase tracking-wide text-creme/90 transition-colors hover:text-or"
              >
                {l.label}
              </Link>
            </li>
          ))}
        </ul>

        {/* CTA + burger */}
        <div className="flex items-center gap-3">
          <Link
            href="/rendez-vous"
            className="hidden whitespace-nowrap rounded-full bg-or-gradient px-5 py-2.5 font-display text-[11px] font-semibold uppercase tracking-wide text-nuit-900 shadow-lg shadow-or/20 transition-transform hover:scale-[1.03] md:inline-block"
          >
            Prendre rendez-vous
          </Link>

          <button
            type="button"
            onClick={() => setOuvert((v) => !v)}
            aria-label={ouvert ? "Fermer le menu" : "Ouvrir le menu"}
            aria-expanded={ouvert}
            className="text-creme 2xl:hidden"
          >
            <svg
              width="26"
              height="26"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
            >
              {ouvert ? (
                <>
                  <line x1="6" y1="6" x2="18" y2="18" />
                  <line x1="18" y1="6" x2="6" y2="18" />
                </>
              ) : (
                <>
                  <line x1="4" y1="7" x2="20" y2="7" />
                  <line x1="4" y1="12" x2="20" y2="12" />
                  <line x1="4" y1="17" x2="20" y2="17" />
                </>
              )}
            </svg>
          </button>
        </div>
      </nav>

      {/* Menu mobile */}
      {ouvert && (
        <div className="border-t border-or/20 bg-nuit-900 2xl:hidden">
          <ul className="mx-auto flex max-w-7xl flex-col px-4 py-2">
            {liens.map((l) => (
              <li key={l.href}>
                <Link
                  href={l.href}
                  onClick={() => setOuvert(false)}
                  className="block py-3 font-display text-sm uppercase tracking-wide text-creme/90 hover:text-or"
                >
                  {l.label}
                </Link>
              </li>
            ))}
            <li className="py-3">
              <Link
                href="/rendez-vous"
                onClick={() => setOuvert(false)}
                className="inline-block rounded-full bg-or-gradient px-5 py-2.5 font-display text-xs font-semibold uppercase tracking-wide text-nuit-900"
              >
                Prendre rendez-vous
              </Link>
            </li>
          </ul>
        </div>
      )}
    </header>
  );
}