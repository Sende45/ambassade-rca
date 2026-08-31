"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Newspaper, CalendarClock, Mail, Users, LogOut } from "lucide-react";

const liens = [
  { href: "/admin", label: "Actualités", icone: Newspaper },
  { href: "/admin/personnel", label: "Personnel", icone: Users },
  { href: "/admin/rendez-vous", label: "Rendez-vous", icone: CalendarClock },
  { href: "/admin/messages", label: "Messages", icone: Mail },
];

export default function AdminNav() {
  const pathname = usePathname();
  const router = useRouter();

  function deconnexion() {
    localStorage.removeItem("rca_token");
    localStorage.removeItem("rca_user");
    router.push("/admin/login");
  }

  return (
    <header className="bg-nuit-900">
      <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-4 px-4 py-4 lg:px-8">
        <nav className="flex flex-wrap items-center gap-1">
          {liens.map((l) => {
            const actif = pathname === l.href;
            return (
              <Link key={l.href} href={l.href} className={`inline-flex items-center gap-1.5 rounded-full px-4 py-2 font-display text-xs font-semibold uppercase tracking-wide transition-colors ${actif ? "bg-or-gradient text-nuit-900" : "text-creme/70 hover:text-or"}`}>
                <l.icone className="h-4 w-4" />
                {l.label}
              </Link>
            );
          })}
        </nav>
        <button onClick={deconnexion} className="inline-flex items-center gap-1.5 font-display text-xs font-semibold uppercase tracking-wide text-creme/70 transition-colors hover:text-or">
          Déconnexion
          <LogOut className="h-4 w-4" />
        </button>
      </div>
    </header>
  );
}