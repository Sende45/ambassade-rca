import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import PageHeader from "../../components/PageHeader";
import { Calendar, ArrowLeft } from "lucide-react";
import { estVideo } from "@/lib/media";

type Actualite = {
  slug: string;
  titre: string;
  extrait: string | null;
  contenu: string;
  categorie: string;
  image: string | null;
  datePublication: string;
};

const API = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:4000";

async function getActualite(slug: string): Promise<Actualite | null> {
  try {
    const res = await fetch(`${API}/api/actualites/${slug}`, { cache: "no-store" });
    if (!res.ok) return null;
    return await res.json();
  } catch {
    return null;
  }
}

function formaterDate(iso: string) {
  return new Date(iso).toLocaleDateString("fr-FR", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const a = await getActualite(slug);
  if (!a) return { title: "Actualité introuvable" };
  return {
    title: `${a.titre} | Ambassade de la République Centrafricaine`,
    description: a.extrait ?? undefined,
  };
}

export default async function ActualiteDetail({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const a = await getActualite(slug);
  if (!a) notFound();

  return (
    <main>
      <PageHeader titre="Actualité" sousTitre={a.categorie} />

      <article className="bg-creme py-16">
        <div className="mx-auto max-w-3xl px-4 lg:px-8">
          <Link
            href="/actualites"
            className="inline-flex items-center gap-1.5 font-display text-xs font-semibold uppercase tracking-wide text-or-fonce transition-colors hover:text-nuit"
          >
            <ArrowLeft className="h-4 w-4" />
            Retour aux actualités
          </Link>

          <div className="mt-6 flex items-center gap-2 font-sans text-xs">
            <Calendar className="h-3.5 w-3.5 text-or-fonce" />
            <span className="font-semibold text-or-fonce">
              {formaterDate(a.datePublication)}
            </span>
            <span className="text-ardoise/40">•</span>
            <span className="uppercase tracking-wide text-ardoise/60">{a.categorie}</span>
          </div>

          <h1 className="mt-3 font-display text-3xl font-bold leading-tight text-nuit sm:text-4xl">
            {a.titre}
          </h1>
          <div className="mt-5 h-px w-24 bg-or" />

          {a.image && (
            <div className="mt-8 overflow-hidden rounded-2xl">
              {estVideo(a.image) ? (
                <video src={a.image} controls className="w-full" />
              ) : (
                <Image
                  src={a.image}
                  alt={a.titre}
                  width={1200}
                  height={675}
                  className="h-auto w-full object-cover"
                />
              )}
            </div>
          )}

          <div className="mt-8 whitespace-pre-line font-sans text-base leading-relaxed text-ardoise/80">
            {a.contenu}
          </div>
        </div>
      </article>
    </main>
  );
}