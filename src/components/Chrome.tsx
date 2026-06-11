import { Link, useLocation } from "react-router-dom";
import { Stethoscope, User, LogIn } from "lucide-react";
import { useAuth } from "../hooks/useAuth";

export function Header() {
  const location = useLocation();
  const { isAuthenticated } = useAuth();

  const links = [
    { to: "/", label: "Bosh sahifa" },
    { to: "/library/subj-1", label: "Kutubxona" },
    { to: "/glossary", label: "Lug'at" },
  ];

  return (
    <header className="sticky top-0 z-40 border-b bg-background/85 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
        <Link to="/" className="flex items-center gap-2 text-foreground">
          <span className="grid h-9 w-9 place-items-center rounded-lg bg-primary text-primary-foreground">
            <Stethoscope size={18} />
          </span>
          <span className="flex flex-col leading-tight">
            <span className="text-sm font-semibold tracking-tight">Mamun University</span>
            <span className="text-[11px] text-muted-foreground uppercase tracking-wider">
              Encyclopedias
            </span>
          </span>
        </Link>
        <nav className="flex items-center gap-1 text-xs sm:text-sm">
          {links.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              className={`rounded-md px-2 py-1.5 font-medium transition-colors hover:bg-muted hover:text-foreground sm:px-3 ${
                location.pathname === l.to ||
                (l.label === "Kutubxona" && location.pathname.startsWith("/library"))
                  ? "bg-primary-soft text-primary"
                  : "text-muted-foreground"
              }`}
            >
              {l.label}
            </Link>
          ))}
          <div className="ml-2 border-l pl-2">
            {isAuthenticated ? (
              <Link
                to="/admin"
                className="flex items-center gap-1.5 rounded-md bg-primary/10 px-3 py-1.5 text-xs font-semibold text-primary transition-colors hover:bg-primary/20"
              >
                <User size={14} />
                <span className="hidden sm:inline">Admin</span>
              </Link>
            ) : (
              <Link
                to="/login"
                className="flex items-center gap-1.5 rounded-md bg-primary/10 px-3 py-1.5 text-xs font-semibold text-primary transition-colors hover:bg-primary/20"
              >
                <LogIn size={14} />
                <span className="hidden sm:inline">Kirish</span>
              </Link>
            )}
          </div>
        </nav>
      </div>
    </header>
  );
}

export function Footer() {
  return (
    <footer className="mt-20 border-t bg-stone-50">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-6 px-6 py-12 text-xs text-muted-foreground lg:flex-row">
        <div className="max-w-xs text-center lg:text-left">
          <div className="font-bold text-foreground mb-1">Mamun University Encyclopedias</div>
          <p className="leading-relaxed">
            Markaziy Osiyodagi eng yirik akademik elektron platforma. Tibbiy bilimlar va
            ensiklopediyalar markazi.
          </p>
        </div>
        <div className="flex gap-8">
          <div className="space-y-2">
            <div className="font-bold text-foreground uppercase tracking-wider">Resurslar</div>
            <div>Institut Repozitoriysi</div>
            <div>Maxfiylik siyosati</div>
            <div>Tibbiy ogohlantirish</div>
          </div>
          <div className="space-y-2">
            <div className="font-bold text-foreground uppercase tracking-wider">Fakultet</div>
            <div>Bog'lanish</div>
            <div>Kutubxona qoidalari</div>
          </div>
        </div>
        <p>
          © {new Date().getFullYear()} Mamun University Encyclopedias. Barcha huquqlar himoyalangan.
        </p>
      </div>
    </footer>
  );
}
