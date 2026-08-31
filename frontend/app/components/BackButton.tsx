"use client";

import { useRouter } from "next/navigation";

export default function BackButton({ label = "Retour" }: { label?: string }) {
  const router = useRouter();

  return (
    <button
      onClick={() => router.back()}
      className="group inline-flex items-center gap-2.5 rounded-full border border-or/30 bg-nuit-800/80 px-5 py-2.5 font-display text-xs font-semibold uppercase tracking-wider text-creme backdrop-blur-md transition-all duration-300 hover:border-or hover:bg-or/10 hover:shadow-lg hover:shadow-or/10"
    >
      <span className="flex h-5 w-5 items-center justify-center rounded-full bg-or/10 text-or transition-transform duration-300 group-hover:-translate-x-1">
        ←
      </span>
      <span>{label}</span>
    </button>
  );
}