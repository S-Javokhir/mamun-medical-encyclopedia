import { Link, useLocation } from "react-router-dom";
import { Stethoscope } from "lucide-react";

export function Header() {
  const location = useLocation();

  return (
    <header className="sticky top-0 z-40 border-b bg-background/85 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
        <Link to="/" className="flex items-center gap-2 text-foreground">
          <span className="grid h-9 w-9 place-items-center rounded-lg bg-primary text-primary-foreground">
            <Stethoscope size={18} />
          </span>
          <span className="flex flex-col leading-tight">
            <span className="text-sm font-semibold tracking-tight">MedKnowledge</span>
            <span className="text-[11px] text-muted-foreground">Raqamli kutubxona</span>
          </span>
        </Link>
        <nav className="flex items-center gap-1 text-xs sm:text-sm">
          {[
            { to: "/", label: "Bosh sahifa" },
            { to: "/departments", label: "Bo'limlar" },
            { to: "/glossary", label: "Lug'at" },
          ].map((l) => (
            <Link
              key={l.to}
              to={l.to}
              className={`rounded-md px-2 py-1.5 font-medium transition-colors hover:bg-muted hover:text-foreground sm:px-3 ${
                location.pathname === l.to
                  ? "bg-primary-soft text-primary"
                  : "text-muted-foreground"
              }`}
            >
              {l.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}

export function Footer() {
  return (
    <footer className="mt-20 border-t bg-surface">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-2 px-6 py-8 text-xs text-muted-foreground sm:flex-row">
        <p>© {new Date().getFullYear()} MedKnowledge — Universitet raqamli kutubxonasi</p>
        <p>Ro'yxatdan o'tgan talabalar akademik foydalanishi uchun. Klinik ko'rsatmalar o'rnini bosmaydi.</p>
      </div>
    </footer>
  );
}
