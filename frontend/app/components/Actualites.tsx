import Link from "next/link";
import Image from "next/image";
import { Calendar, ArrowUpRight, Newspaper, Play } from "lucide-react";
import { estVideo, posterMedia } from "@/lib/media";

type Actualite = {
  slug: string;
  titre: string;
  categorie: string;
  datePublication: string;
  image: string | null;
};

const API = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:4000";

async function getDernieresActualites(): Promise<Actualite[]> {
  try {
    const res = await fetch(`${API}/api/actualites`, { next: { revalidate: 60 } });
    if (!res.ok) return [];
    const data: Actualite[] = await res.json();
    return data.slice(0, 4);
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

export default async function Actualites() {
  const actualites = await getDernieresActualites();

  return (
    <section className="bg-creme pb-24 pt-4">
      <div className="mx-auto max-w-7xl px-4 lg:px-8">
        {/* En-tête */}
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <span className="font-display text-xs font-semibold uppercase tracking-[0.2em] text-or-fonce">
              Actualités
            </span>
            <h2 className="mt-3 font-display text-2xl font-bold uppercase tracking-wide text-nuit sm:text-3xl">
              Chroniques diplomatiques
            </h2>
            <div className="mt-4 h-px w-24 bg-or" />
          </div>
          <Link href="/actualites" className="inline-flex items-center gap-1.5 font-display text-xs font-semibold uppercase tracking-wide text-or-fonce transition-colors hover:text-nuit">
            Toutes les actualités
            <ArrowUpRight className="h-4 w-4" />
          </Link>
        </div>

        {actualites.length === 0 ? (
          <div className="mt-12 flex flex-col items-center rounded-2xl border border-nuit/10 bg-white py-14 text-center">
            <Newspaper className="h-10 w-10 text-or" strokeWidth={1.3} />
            <p className="mt-3 font-sans text-sm text-ardoise/60">
              Les prochaines actualités seront publiées ici.
            </p>
          </div>
        ) : (
          <div className="mt-12 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {actualites.map((a) => (
              <Link key={a.slug} href={`/actualites/${a.slug}`} className="group flex flex-col overflow-hidden rounded-xl bg-white shadow-sm ring-1 ring-nuit/5 transition-all hover:-translate-y-1 hover:shadow-md">
                <div className="relative aspect-[4/3] overflow-hidden bg-nuit-gradient">
                  {a.image && (
                    <>
                      <Image src={posterMedia(a.image)} alt={a.titre} fill className="object-cover transition-transform duration-300 group-hover:scale-105" />
                      {estVideo(a.image) && (
                        <span className="absolute inset-0 flex items-center justify-center">
                          <span className="rounded-full bg-nuit-900/60 p-3 backdrop-blur">
                            <Play className="h-6 w-6 text-creme" />
                          </span>
                        </span>
                      )}
                    </>
                  )}
                  <span className="absolute left-3 top-3 rounded-full bg-nuit-900/80 px-3 py-1 font-display text-[10px] font-semibold uppercase tracking-wide text-or backdrop-blur">
                    {a.categorie}
                  </span>
                </div>
                <div className="flex flex-1 flex-col p-5">
                  <div className="flex items-center gap-1.5 font-sans text-xs text-ardoise/50">
                    <Calendar className="h-3.5 w-3.5 text-or-fonce" />
                    <span>{formaterDate(a.datePublication)}</span>
                  </div>
                  <h3 className="mt-2 font-display text-base font-bold leading-snug text-nuit transition-colors group-hover:text-or-fonce">
                    {a.titre}
                  </h3>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}