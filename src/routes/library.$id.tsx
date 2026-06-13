import { useParams, Link, Navigate } from "react-router-dom";
import { ChevronRight, ArrowRight, BookOpen, Layers } from "lucide-react";
import { DeptIcon } from "../components/DeptIcon";
import { useLibrary } from "../hooks/useLibrary";
import { getNavItem, findNavItemPath } from "../data/library";

export default function LibraryCategory() {
  const { id } = useParams();
  const { categories } = useLibrary();
  const item = getNavItem(id || "", categories);
  const path = findNavItemPath(id || "", categories);

  if (!item || !path) return <Navigate to="/" replace />;

  const children = item.children || [];

  return (
    <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6">
      {/* Breadcrumbs */}
      <nav className="mb-8 flex items-center gap-2 overflow-x-auto whitespace-nowrap text-[11px] font-medium text-muted-foreground sm:text-xs">
        <Link to="/" className="hover:text-primary">
          Bosh sahifa
        </Link>
        {path.map((p, i) => (
          <div key={p.id} className="flex items-center gap-2">
            <ChevronRight size={14} className="shrink-0" />
            <Link
              to={p.type === "article" ? `/article/${p.id}` : `/library/${p.id}`}
              className={i === path.length - 1 ? "text-primary" : "hover:text-primary"}
            >
              {p.title}
            </Link>
          </div>
        ))}
      </nav>

      {/* Header */}
      <div className="mb-12">
        <div className="flex items-baseline gap-3">
          <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
            {item.title}
          </h1>
          {item.englishTitle && (
            <span className="text-2xl font-light text-primary sm:text-3xl">
              ({item.englishTitle})
            </span>
          )}
        </div>
        <p className="mt-6 max-w-3xl text-base leading-relaxed text-muted-foreground sm:text-lg">
          {item.description}
        </p>

        {/* Stats */}
        <div className="mt-8 flex gap-4">
          <div className="flex items-center gap-2 rounded-full border bg-card px-4 py-1.5 text-xs font-semibold text-muted-foreground shadow-sm">
            <Layers size={14} className="text-primary" />
            {item.topicCount || children.length} Modullar
          </div>
          <div className="flex items-center gap-2 rounded-full border bg-card px-4 py-1.5 text-xs font-semibold text-muted-foreground shadow-sm">
            <BookOpen size={14} className="text-primary" />
            {item.articleCount || 0} Maqolalar
          </div>
        </div>
      </div>

      {/* Grid */}
      {/* Grid or Empty State */}
      {children.length > 0 ? (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {children.map((child) => (
            <Link
              key={child.id}
              to={child.type === "article" ? `/article/${child.id}` : `/library/${child.id}`}
              className="group flex flex-col rounded-[32px] border bg-card p-8 shadow-sm transition-all hover:-translate-y-1 hover:border-primary hover:shadow-xl"
            >
              <div className="mb-8 flex items-start justify-between">
                <span className="grid h-16 w-16 place-items-center rounded-2xl bg-primary-soft text-primary transition-colors group-hover:bg-primary group-hover:text-white">
                  <DeptIcon name={child.icon || "Bone"} className="h-8 w-8" />
                </span>
                <div className="relative h-20 w-20 overflow-hidden opacity-10 grayscale group-hover:opacity-20 group-hover:grayscale-0">
                  {/* Decorative background icon */}
                  <DeptIcon
                    name={child.icon || "Bone"}
                    className="absolute -right-4 -top-4 h-24 w-24"
                  />
                </div>
              </div>

              <h3 className="mb-1 text-2xl font-bold text-foreground transition-colors group-hover:text-primary">
                {child.title}
              </h3>
              {child.englishTitle && (
                <p className="mb-4 text-xs font-medium text-muted-foreground/60">
                  ({child.englishTitle})
                </p>
              )}

              <p className="mb-8 line-clamp-3 text-sm leading-relaxed text-muted-foreground/80">
                {child.description ||
                  "Ushbu bo'lim haqida batafsil ma'lumot yaqin orada qo'shiladi."}
              </p>

              <div className="mt-auto space-y-1">
                {child.type === "article" ? (
                  <div className="inline-flex items-center gap-1.5 rounded-full bg-primary-soft px-3 py-1 text-xs font-bold text-primary">
                    Maqolani o'qish →
                  </div>
                ) : (
                  <>
                    <div className="text-sm font-bold text-foreground">
                      {child.topicCount && <span>{child.topicCount} Mavzu</span>}
                      {!child.topicCount && child.children && (
                        <span>{child.children.length} Mavzu</span>
                      )}
                    </div>
                    <div className="text-xs font-medium text-muted-foreground">
                      {child.articleCount || 0} Akademik maqola
                    </div>
                  </>
                )}
              </div>

              <div className="mt-6 flex justify-end">
                <span className="grid h-10 w-10 place-items-center rounded-full bg-muted text-muted-foreground transition-all group-hover:bg-primary group-hover:text-white">
                  <ArrowRight size={18} />
                </span>
              </div>
            </Link>
          ))}
        </div>
      ) : (
        <div className="mt-8 flex flex-col items-center justify-center rounded-[40px] border bg-card p-12 text-center animate-fade-in-section sm:p-20">
          <div className="relative mb-10 h-64 w-64 md:h-80 md:w-80">
            <img
              src="/assets/images/empty-state.png"
              alt="No content"
              className="h-full w-full object-contain"
            />
          </div>
          <h2 className="mb-4 text-4xl font-bold tracking-tight text-foreground">
            Materiallar mavjud emas
          </h2>
          <p className="mb-10 max-w-lg text-lg text-muted-foreground">
            Ushbu bo'lim uchun akademik materiallar yaqin orada qo'shiladi. Hozircha kutubxonamizning
            boshqa bo'limlarini o'rganib turishingiz mumkin.
          </p>
          <Link
            to="/"
            className="rounded-full bg-primary px-10 py-4 text-base font-bold text-white shadow-xl shadow-primary/20 transition-all hover:scale-105 hover:bg-primary/90"
          >
            Bosh sahifaga qaytish
          </Link>
        </div>
      )}


    </div>
  );
}
