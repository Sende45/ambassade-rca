import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import PageHeader from "../components/PageHeader";
import Reveal from "../components/motion/Reveal";
import { Calendar, Newspaper } from "lucide-react";
import { Play } from "lucide-react";
import { estVideo, posterMedia } from "@/lib/media";

export const metadata: Metadata = {
  title: "Actualités | Ambassade de la République Centrafricaine",
  description:
    "Actualités et chroniques diplomatiques de l'Ambassade de la République Centrafricaine en Côte d'Ivoire.",
};

type Actualite = {
  slug: string;
  titre: string;
  categorie: string;
  datePublication: string;
  image: string | null;
};

const API = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:4000";

async function getActualites(): Promise<Actualite[]> {
  try {
    const res = await fetch(`${API}/api/actualites`, { cache: "no-store" });
    if (!res.ok) return [];
    return await res.json();
  } catch {
    return [];
  }
}

function formaterDate(iso: string) {
  return new Date(iso).toLocaleDateString("fr-FR", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

export default async function ActualitesPage() {
  const actualites = await getActualites();

  return (
    <main>
      <PageHeader titre="Actualités" sousTitre="Chroniques diplomatiques de l'Ambassade" />

      <section className="bg-creme py-20">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          {actualites.length === 0 ? (
            <Reveal>
              <div className="flex flex-col items-center rounded-2xl border border-nuit/10 bg-white py-16 text-center">
                <Newspaper className="h-12 w-12 text-or" strokeWidth={1.3} />
                <p className="mt-4 font-display text-lg font-semibold uppercase tracking-wide text-nuit">
                  Aucune actualité pour le moment
                </p>
                <p className="mt-2 max-w-md font-sans text-sm text-ardoise/60">
                  Les prochaines chroniques diplomatiques seront publiées ici.
                </p>
              </div>
            </Reveal>
          ) : (
            <Reveal>
              <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
                {actualites.map((a) => (
                  <Link key={a.slug} href={`/actualites/${a.slug}`} className="group flex flex-col">
                    <div className="relative aspect-[4/3] overflow-hidden rounded-xl bg-nuit-gradient ring-1 ring-nuit-700/40">
                      {a.image && (
                        <Image
                          src={a.image}
                          alt={a.titre}
                          fill
                          className="object-cover transition-transform duration-300 group-hover:scale-105"
                        />
                      )}
                    </div>
                    <div className="mt-4 flex items-center gap-2 font-sans text-xs">
                      <Calendar className="h-3.5 w-3.5 text-or-fonce" />
                      <span className="font-semibold text-or-fonce">
                        {formaterDate(a.datePublication)}
                      </span>
                      <span className="text-ardoise/40">•</span>
                      <span className="uppercase tracking-wide text-ardoise/60">{a.categorie}</span>
                    </div>
                    <h3 className="mt-2 font-display text-lg font-bold leading-snug text-nuit transition-colors group-hover:text-or-fonce">
                      {a.titre}
                    </h3>
                  </Link>
                ))}
              </div>
            </Reveal>
          )}
        </div>
      </section>
    </main>
  );
}