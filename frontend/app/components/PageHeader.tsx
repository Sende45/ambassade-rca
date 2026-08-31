import Link from "next/link";
import { ChevronRight } from "lucide-react";

type PageHeaderProps = {
  titre: string;
  sousTitre?: string;
};

export default function PageHeader({ titre, sousTitre }: PageHeaderProps) {
  return (
    <section className="relative overflow-hidden bg-nuit-gradient">
      <div className="mx-auto max-w-7xl px-4 py-16 lg:px-8 lg:py-20">
        <nav className="flex items-center gap-1.5 font-display text-xs uppercase tracking-wide text-creme/50">
          <Link href="/" className="transition-colors hover:text-or">
            Accueil
          </Link>
          <ChevronRight className="h-3.5 w-3.5" />
          <span className="text-or">{titre}</span>
        </nav>
        <h1 className="mt-4 font-display text-3xl font-bold uppercase tracking-wide text-creme sm:text-4xl">
          {titre}
        </h1>
        {sousTitre && (
          <p className="mt-3 max-w-2xl font-serif text-lg italic text-or-clair">
            {sousTitre}
          </p>
        )}
        <div className="mt-6 h-px w-24 bg-or" />
      </div>
    </section>
  );
}