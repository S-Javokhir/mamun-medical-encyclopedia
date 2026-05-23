import { Link, useParams } from "react-router-dom";
import { useEffect, useState, useMemo } from "react";
import { Download, FileText, Presentation, UserRound, ChevronRight, BookOpen } from "lucide-react";
import { formatDate, getArticle, getDepartment, getProfessor, findNavItemPath, medicalCurriculumData, getNavItem } from "../data/library";
import { PageSkeleton } from "../components/Skeleton";
import { NavTree } from "../components/NavTree";

function useActiveSection(ids: string[]) {
  const [active, setActive] = useState(ids[0] ?? "");
  useEffect(() => {
    const els = ids.map((id) => document.getElementById(id)).filter(Boolean) as HTMLElement[];
    if (!els.length) return;
    const obs = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible[0]) setActive(visible[0].target.id);
      },
      { rootMargin: "-30% 0px -60% 0px", threshold: 0 }
    );
    els.forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, [ids.join("|")]);
  return active;
}

export default function ArticleView() {
  const { id } = useParams();
  
  // Simulation: Default to art-1 if requested (but route param takes precedence)
  const activeId = id || "art-1";
  
  const breadcrumbPath = useMemo(() => findNavItemPath(activeId), [activeId]);
  
  // Content handling (Check hierarchical item first)
  const navItem = getNavItem(activeId);
  const article = (navItem && navItem.type === "article") ? getArticle("1") : getArticle(activeId); 
  
  const displayArticle = article || getArticle("1")!; 
  const prof = getProfessor(displayArticle.professorId);
  const dept = getDepartment(displayArticle.departmentSlug);
  
  const ids = useMemo(() => displayArticle.sections.map((s) => s.id), [displayArticle]);
  const activeSection = useActiveSection(ids);

  if (!displayArticle) return <PageSkeleton />;

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6">
      {/* Breadcrumbs */}
      <nav className="mb-8 flex items-center gap-2 overflow-x-auto whitespace-nowrap text-xs text-muted-foreground">
        <span className="flex items-center gap-1.5">
          <BookOpen size={13} />
          Fanlar
        </span>
        {breadcrumbPath?.map((step) => (
          <div key={step.id} className="flex items-center gap-2">
            <ChevronRight size={12} className="shrink-0" />
            <span className={step.id === activeId ? "font-medium text-foreground" : ""}>
              {step.title}
            </span>
          </div>
        ))}
      </nav>

      <div className="grid gap-8 lg:grid-cols-[260px_minmax(0,1fr)_280px]">
        {/* Sidebar Navigation */}
        <aside className="hidden lg:block lg:sticky lg:top-20 lg:self-start border-r pr-6">
          <p className="mb-4 text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
            O'quv dasturi
          </p>
          <NavTree items={medicalCurriculumData} activeId={activeId} />
        </aside>

        {/* Article Body */}
        <article className="min-w-0">
          <div className="mb-4 flex flex-wrap items-center gap-2">
            <span className="inline-flex items-center rounded-md bg-[#E0F2F1] px-2.5 py-1 text-xs font-semibold text-[#00796B]">
              ICD-11 kodi: {navItem?.icd11 || displayArticle.icd11}
            </span>
            <span className="inline-flex items-center rounded-md border bg-card px-2.5 py-1 text-xs text-muted-foreground">
               {(breadcrumbPath?.[0]?.title) || dept?.name}
            </span>
            <span className="text-xs text-muted-foreground">· {formatDate(displayArticle.publishedAt)} yangilandi</span>
          </div>
          <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            {navItem?.title || displayArticle.title}
          </h1>
          <p className="mt-3 text-base text-muted-foreground">{displayArticle.excerpt}</p>

          <div className="article-prose mt-8">
            {displayArticle.sections.map((s) => (
              <section key={s.id} id={s.id} className="scroll-mt-24">
                <h2>{s.heading}</h2>
                {s.paragraphs.map((p, i) => (
                  <p key={i} dangerouslySetInnerHTML={{ __html: p }} />
                ))}
              </section>
            ))}
          </div>
        </article>

        {/* Sidebar Extras (TOC + Downloads) */}
        <aside className="space-y-6 lg:sticky lg:top-20 lg:self-start">
             {/* TOC Component */}
             <div className="rounded-xl border bg-card p-5">
                <p className="mb-4 text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
                    Maqola bo'limlari
                </p>
                <ul className="space-y-1.5 border-l">
                    {displayArticle.sections.map((s) => (
                    <li key={s.id}>
                        <a
                        href={`#${s.id}`}
                        className={`block -ml-px border-l-2 py-1 pl-3 text-sm transition ${
                            activeSection === s.id
                            ? "border-[#00796B] font-medium text-[#00796B]"
                            : "border-transparent text-muted-foreground hover:border-border hover:text-foreground"
                        }`}
                        >
                        {s.heading}
                        </a>
                    </li>
                    ))}
                </ul>
            </div>

          {prof && (
            <div className="rounded-xl border bg-card p-5">
              <p className="mb-3 text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
                Ma'lumot beruvchi professor
              </p>
              <div className="flex items-center gap-3">
                <img
                  src={prof.avatar}
                  alt={prof.fullName}
                  className="h-12 w-12 rounded-full border object-cover"
                />
                <div className="min-w-0">
                  <p className="truncate font-semibold text-foreground">{prof.title}</p>
                  <p className="truncate text-xs text-muted-foreground">{prof.department}</p>
                </div>
              </div>
              <Link
                to={`/professor/${prof.id}`}
                className="mt-4 inline-flex items-center gap-1.5 text-xs font-medium text-[#00796B] hover:underline"
              >
                <UserRound size={13} /> Profilni ko'rish
              </Link>
            </div>
          )}

          <div className="rounded-xl border bg-card p-5">
            <p className="mb-3 text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
              Kurs materiallari
            </p>
            <ul className="space-y-2">
              {displayArticle.downloads.map((d) => {
                const Icon = d.type === "PDF" ? FileText : Presentation;
                return (
                  <li key={d.filename}>
                    <a
                      href="#"
                      download={d.filename}
                      className="group flex items-center gap-3 rounded-lg border bg-background p-3 transition hover:border-[#00796B] hover:bg-[#E0F2F1]"
                    >
                      <span className="grid h-9 w-9 shrink-0 place-items-center rounded-md bg-[#E0F2F1] text-[#00796B] group-hover:bg-[#00796B] group-hover:text-white">
                        <Icon size={16} />
                      </span>
                      <div className="min-w-0 flex-1">
                        <p className="truncate text-sm font-medium text-foreground">{d.filename}</p>
                        <p className="text-[11px] text-muted-foreground">{d.type} · {d.sizeMB.toFixed(1)} MB</p>
                      </div>
                      <Download size={15} className="shrink-0 text-muted-foreground transition group-hover:text-[#00796B]" />
                    </a>
                  </li>
                );
              })}
            </ul>
          </div>
        </aside>
      </div>
    </div>
  );
}
