import { useParams, Link, Navigate } from "react-router-dom";
import { ChevronRight, ArrowRight, BookOpen, Layers } from "lucide-react";
import { getNavItem, findNavItemPath } from "../data/library";
import { DeptIcon } from "../components/DeptIcon";

export default function LibraryCategory() {
  const { id } = useParams();
  const item = getNavItem(id || "");
  const path = findNavItemPath(id || "");

  if (!item || !path) return <Navigate to="/" replace />;

  const children = item.children || [];

  return (
    <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6">
      {/* Breadcrumbs */}
      <nav className="mb-8 flex items-center gap-2 overflow-x-auto whitespace-nowrap text-[11px] font-medium text-muted-foreground sm:text-xs">
        <Link to="/" className="hover:text-primary">Bosh sahifa</Link>
        {path.map((p, i) => (
          <div key={p.id} className="flex items-center gap-2">
            <ChevronRight size={14} className="shrink-0" />
            <Link 
              to={p.type === 'article' ? `/article/${p.id}` : `/library/${p.id}`}
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
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {children.map((child) => (
          <Link
            key={child.id}
            to={child.type === 'article' ? `/article/${child.id}` : `/library/${child.id}`}
            className="group flex flex-col rounded-[32px] border bg-card p-8 shadow-sm transition-all hover:-translate-y-1 hover:border-primary hover:shadow-xl"
          >
            <div className="mb-8 flex items-start justify-between">
              <span className="grid h-16 w-16 place-items-center rounded-2xl bg-primary-soft text-primary transition-colors group-hover:bg-primary group-hover:text-white">
                <DeptIcon name={child.icon || "Bone"} className="h-8 w-8" />
              </span>
              <div className="relative h-20 w-20 overflow-hidden opacity-10 grayscale group-hover:opacity-20 group-hover:grayscale-0">
                 {/* Decorative background icon */}
                 <DeptIcon name={child.icon || "Bone"} className="absolute -right-4 -top-4 h-24 w-24" />
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
              {child.description || "Ushbu bo'lim haqida batafsil ma'lumot yaqin orada qo'shiladi."}
            </p>

            <div className="mt-auto space-y-1">
              {child.type === 'article' ? (
                <div className="inline-flex items-center gap-1.5 rounded-full bg-primary-soft px-3 py-1 text-xs font-bold text-primary">
                  Maqolani o'qish →
                </div>
              ) : (
                <>
                  <div className="text-sm font-bold text-foreground">
                    {child.topicCount && <span>{child.topicCount} Mavzu</span>}
                    {!child.topicCount && child.children && <span>{child.children.length} Mavzu</span>}
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

      {/* Explore Section (from image) */}
      <div className="mt-24 rounded-[40px] bg-surface p-8 sm:p-16">
        <div className="flex flex-col items-center gap-12 lg:flex-row">
          <div className="flex-1 space-y-6">
            <h2 className="text-4xl font-bold tracking-tight text-foreground">
              Explore the {item.englishTitle || item.title} Atlas
            </h2>
            <p className="text-lg text-muted-foreground">
              Access our high-resolution 3D anatomical models and the full peer-reviewed medical repository curated by the faculty.
            </p>
            <div className="flex flex-wrap gap-4 pt-4">
              <button className="rounded-full bg-primary px-8 py-3 font-bold text-white shadow-lg transition hover:bg-primary/90">
                Browse Repository
              </button>
              <button className="rounded-full bg-white px-8 py-3 font-bold text-foreground border shadow-sm transition hover:bg-muted">
                View Faculty
              </button>
            </div>
          </div>
          <div className="relative flex-1">
             <img 
               src="https://images.unsplash.com/photo-1576086213369-97a306d36557?auto=format&fit=crop&q=80&w=800" 
               alt="Atlas" 
               className="rounded-3xl shadow-2xl"
             />
             <div className="absolute -bottom-6 -left-6 rounded-3xl bg-white p-6 shadow-xl hidden sm:block">
               <div className="flex items-center gap-4">
                 <div className="h-12 w-12 rounded-full bg-primary-soft text-primary grid place-items-center">
                   <BookOpen size={24} />
                 </div>
                 <div>
                   <div className="text-xl font-bold text-foreground">3D Models</div>
                   <div className="text-xs text-muted-foreground">Interactive exploration</div>
                 </div>
               </div>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
}
