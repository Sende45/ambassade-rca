import Link from "next/link";
import Image from "next/image";
import { IMAGES } from "@/lib/images";
const liensRapides = [
  { label: "Chancellerie", href: "/chancellerie" },
  { label: "Services consulaires", href: "/services-consulaires" },
  { label: "Espace Diaspora", href: "/espace-diaspora" },
  { label: "Prendre rendez-vous", href: "/rendez-vous" },
];

const reseaux = [
  {
    label: "Facebook",
    href: "#",
    icone: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
        <path d="M22 12a10 10 0 1 0-11.5 9.9v-7H8v-2.9h2.5V9.8c0-2.5 1.5-3.9 3.8-3.9 1.1 0 2.2.2 2.2.2v2.5h-1.3c-1.2 0-1.6.8-1.6 1.6V12H16l-.4 2.9h-2.3v7A10 10 0 0 0 22 12Z" />
      </svg>
    ),
  },
  {
    label: "LinkedIn",
    href: "#",
    icone: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
        <path d="M4.98 3.5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5ZM3 9h4v12H3zM10 9h3.8v1.7h.05c.53-1 1.83-2.05 3.77-2.05 4 0 4.75 2.65 4.75 6.1V21H21v-5.5c0-1.3 0-3-1.8-3s-2.1 1.4-2.1 2.9V21H13z" />
      </svg>
    ),
  },
  {
    label: "Instagram",
    href: "#",
    icone: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <rect x="3" y="3" width="18" height="18" rx="5" />
        <circle cx="12" cy="12" r="4" />
        <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
      </svg>
    ),
  },
  {
    label: "YouTube",
    href: "#",
    icone: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
        <path d="M23 12s0-3.3-.42-4.9a2.56 2.56 0 0 0-1.8-1.8C19.2 5 12 5 12 5s-7.2 0-8.78.3A2.56 2.56 0 0 0 1.42 7.1C1 8.7 1 12 1 12s0 3.3.42 4.9a2.56 2.56 0 0 0 1.8 1.8C4.8 19 12 19 12 19s7.2 0 8.78-.3a2.56 2.56 0 0 0 1.8-1.8C23 15.3 23 12 23 12ZM9.8 15.3V8.7l6 3.3Z" />
      </svg>
    ),
  },
];

const IconeLieu = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" className="mt-0.5 shrink-0">
    <path d="M12 21s7-5.2 7-11a7 7 0 1 0-14 0c0 5.8 7 11 7 11Z" />
    <circle cx="12" cy="10" r="2.5" />
  </svg>
);
const IconeTel = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" className="mt-0.5 shrink-0">
    <path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1.9.3 1.8.6 2.6a2 2 0 0 1-.5 2.1L8 9.6a16 16 0 0 0 6 6l1.2-1.2a2 2 0 0 1 2.1-.5c.8.3 1.7.5 2.6.6a2 2 0 0 1 1.7 2Z" />
  </svg>
);
const IconeMail = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" className="mt-0.5 shrink-0">
    <rect x="3" y="5" width="18" height="14" rx="2" />
    <path d="m3 7 9 6 9-6" />
  </svg>
);

export default function Footer() {
  return (
    <footer className="bg-bordeaux text-creme">
      <div className="h-px w-full bg-or/40" />

      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-10 px-4 py-14 md:grid-cols-2 lg:grid-cols-4 lg:px-8">
        {/* Contact */}
        <div>
          <h3 className="font-display text-sm font-semibold uppercase tracking-wide text-or">
            Contact
          </h3>
          <ul className="mt-5 space-y-3 text-sm text-creme/85">
            <li className="flex gap-2">
              <IconeLieu />
              <span>Cocody, Abidjan — Côte d&apos;Ivoire</span>
            </li>
            <li className="flex gap-2">
              <IconeTel />
              <span>+225 00 00 00 00 00</span>
            </li>
            <li className="flex gap-2">
              <IconeMail />
              <span>contact@ambassade-rca.ci</span>
            </li>
          </ul>
        </div>

        {/* Liens rapides */}
        <div>
          <h3 className="font-display text-sm font-semibold uppercase tracking-wide text-or">
            Liens rapides
          </h3>
          <ul className="mt-5 space-y-3 text-sm">
            {liensRapides.map((l) => (
              <li key={l.href}>
                <Link href={l.href} className="text-creme/85 transition-colors hover:text-or">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Réseaux */}
        <div>
          <h3 className="font-display text-sm font-semibold uppercase tracking-wide text-or">
            Nous suivre
          </h3>
          <div className="mt-5 flex gap-3">
            {reseaux.map((r) => (
              <a key={r.label} href={r.href} aria-label={r.label} className="flex h-10 w-10 items-center justify-center rounded-full border border-or/30 text-creme/85 transition-colors hover:border-or hover:text-or">
                {r.icone}
              </a>
            ))}
          </div>
        </div>

        {/* Sceau */}
         {/* Sceau */}
        <div className="flex items-start lg:justify-end">
          {IMAGES.sceau && (
            <Image
              src={IMAGES.sceau}
              alt="Sceau de la République Centrafricaine"
              width={120}
              height={120}
              className="h-28 w-28 rounded-lg object-contain opacity-90"
            />
          )}
        </div>
      </div>

      <div className="border-t border-or/20">
        <p className="mx-auto max-w-7xl px-4 py-5 text-center text-xs text-creme/60 lg:px-8">
          © {new Date().getFullYear()} Ambassade de la République Centrafricaine en Côte
          d&apos;Ivoire. Tous droits réservés.
        </p>
      </div>
    </footer>
  );
}