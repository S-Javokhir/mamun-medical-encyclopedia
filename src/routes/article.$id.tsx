import { useParams, Link, Navigate } from "react-router-dom";
import { ChevronRight, ChevronDown, FileText, Download, ArrowLeft, Quote } from "lucide-react";
import {
  getArticle,
  getProfessor,
  findNavItemPath,
  getNavItem,
  medicalCurriculumData,
  NavItem,
  Article,
  ArticleSection,
  Download as DownloadType,
} from "../data/library";
import { useLibrary } from "../hooks/useLibrary";

function SidebarNode({
  item,
  currentId,
  depth = 0,
}: {
  item: NavItem;
  currentId: string;
  depth?: number;
}) {
  const isActive = item.id === currentId;
  const hasChildren = item.children && item.children.length > 0;

  return (
    <div className="mb-1">
      <Link
        to={item.type === "article" ? `/article/${item.id}` : `/library/${item.id}`}
        className={`flex items-center gap-2 rounded-xl px-4 py-2.5 text-sm transition-all ${
          isActive
            ? "bg-primary-soft text-primary font-bold"
            : "text-muted-foreground hover:bg-muted hover:text-foreground"
        }`}
        style={{ paddingLeft: `${16 + depth * 12}px` }}
      >
        {item.type === "article" ? (
          <FileText size={16} />
        ) : (
          <ChevronRight size={16} className={hasChildren ? "opacity-100" : "opacity-0"} />
        )}
        <span className="truncate">{item.title}</span>
      </Link>
      {hasChildren && (
        <div className="mt-1">
          {item.children?.map((child) => (
            <SidebarNode key={child.id} item={child} currentId={currentId} depth={depth + 1} />
          ))}
        </div>
      )}
    </div>
  );
}

export default function ArticleView() {
  const { id } = useParams();
  const { getArticle } = useLibrary();
  const article = getArticle(id || "");
  const path = findNavItemPath(id || "");

  if (!article || !path) return <Navigate to="/" replace />;

  const prof = getProfessor(article.professorId);
  const moduleItem = path.find((p) => p.type === "module") || path[0];

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6">
      {/* Top Breadcrumbs */}
      <nav className="mb-8 flex items-center justify-center gap-2 rounded-2xl bg-surface px-6 py-3 text-[10px] font-medium text-muted-foreground sm:text-xs">
        <Link to="/" className="hover:text-primary">
          Fanlar
        </Link>
        {path.map((p, i) => (
          <div key={p.id} className="flex items-center gap-2">
            <ChevronRight size={12} className="shrink-0" />
            <Link
              to={p.type === "article" ? `/article/${p.id}` : `/library/${p.id}`}
              className={i === path.length - 1 ? "text-primary" : "hover:text-primary"}
            >
              {p.title}
            </Link>
          </div>
        ))}
      </nav>

      <div className="flex flex-col gap-8 lg:flex-row">
        {/* Left Sidebar: Module Tree */}
        <aside className="w-full shrink-0 space-y-6 lg:w-72">
          <div className="rounded-[32px] border bg-card p-4">
            <div className="mb-4 flex items-center gap-3 px-4 py-2">
              <FileText size={20} className="text-primary" />
              <h3 className="text-lg font-bold text-foreground">{moduleItem.title}</h3>
            </div>
            <div className="max-h-[600px] overflow-y-auto pr-2 custom-scrollbar">
              {moduleItem.children?.map((child) => (
                <SidebarNode key={child.id} item={child} currentId={article.id} />
              ))}
            </div>
            <div className="mt-4 border-t pt-4">
              <Link
                to={`/library/${moduleItem.id}`}
                className="flex items-center gap-2 px-4 py-2 text-xs font-bold text-muted-foreground hover:text-primary transition-colors"
              >
                <ArrowLeft size={14} />
                Barcha modullarga qaytish
              </Link>
            </div>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 min-w-0">
          <div className="rounded-[40px] border bg-card p-8 sm:p-16">
            <h1 className="mb-6 text-4xl font-extrabold tracking-tight text-foreground sm:text-5xl">
              {article.title}
            </h1>

            <div className="mb-10 flex flex-wrap gap-3">
              {article.badges?.map((b: string) => (
                <span
                  key={b}
                  className="rounded-full bg-primary-soft/50 border border-primary/20 px-4 py-1 text-[10px] font-bold tracking-wider text-primary"
                >
                  {b}
                </span>
              ))}
              <span className="rounded-full bg-muted/50 border px-4 py-1 text-[10px] font-bold tracking-wider text-muted-foreground uppercase">
                ICD-11: {article.icd11}
              </span>
            </div>

            <div className="prose prose-slate prose-lg max-w-none prose-headings:font-bold prose-headings:text-foreground prose-p:text-muted-foreground prose-p:leading-relaxed prose-strong:text-foreground">
              {article.sections.map((section: ArticleSection) => (
                <div key={section.id} className="mb-12">
                  <h2 className="text-2xl font-bold mb-4">{section.heading}</h2>
                  {section.paragraphs.map((p: string, idx: number) => (
                    <div
                      key={idx}
                      className="article-content"
                      dangerouslySetInnerHTML={{ __html: p }}
                    />
                  ))}
                  {section.image && (
                    <figure className="my-10">
                      <div className="overflow-hidden rounded-3xl bg-muted/30 p-4 ring-1 ring-border">
                        <img
                          src={section.image}
                          alt={section.heading}
                          className="w-full rounded-2xl shadow-lg"
                        />
                      </div>
                      {section.imageCaption && (
                        <figcaption className="mt-4 text-center text-xs font-medium text-muted-foreground italic">
                          {section.imageCaption}
                        </figcaption>
                      )}
                    </figure>
                  )}
                  {section.videoUrl && (
                    <div className="my-10 overflow-hidden rounded-3xl bg-muted/30 p-4 ring-1 ring-border">
                      <div className="aspect-video w-full overflow-hidden rounded-2xl shadow-lg">
                        <iframe
                          src={section.videoUrl}
                          className="h-full w-full border-0"
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                          allowFullScreen
                        ></iframe>
                      </div>
                    </div>
                  )}
                  {section.table && (
                    <div className="my-10 overflow-hidden rounded-3xl border bg-surface shadow-sm">
                      <div className="overflow-x-auto">
                        <table className="w-full text-left text-sm">
                          <thead className="bg-muted/50 border-b">
                            <tr>
                              {section.table.headers.map((header: string, i: number) => (
                                <th key={i} className="px-6 py-4 font-bold text-foreground">
                                  {header}
                                </th>
                              ))}
                            </tr>
                          </thead>
                          <tbody className="divide-y">
                            {section.table.rows.map((row: string[], i: number) => (
                              <tr key={i} className="transition-colors hover:bg-muted/30">
                                {row.map((cell: string, j: number) => (
                                  <td key={j} className="px-6 py-4 text-muted-foreground">
                                    {cell}
                                  </td>
                                ))}
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </main>

        {/* Right Sidebar: Downloads & Prof */}
        <aside className="w-full shrink-0 space-y-8 lg:w-72">
          {/* Downloads */}
          <div className="rounded-[32px] border bg-card p-8 shadow-sm">
            <div className="mb-6 flex items-center gap-3">
              <span className="grid h-10 w-10 place-items-center rounded-xl bg-primary-soft text-primary">
                <Download size={20} />
              </span>
              <h3 className="text-xl font-bold text-foreground">Materiallar</h3>
            </div>
            <div className="space-y-3">
              {article.downloads.map((d: DownloadType, i: number) => (
                <div
                  key={i}
                  className="flex items-center justify-between rounded-2xl border bg-surface p-3 transition hover:border-primary"
                >
                  <div className="flex items-center gap-3 truncate">
                    <div className="shrink-0 rounded-lg bg-red-100 p-2 text-red-600">
                      <FileText size={18} />
                    </div>
                    <div className="truncate">
                      <div className="truncate text-[11px] font-bold text-foreground">
                        {d.filename}
                      </div>
                      <div className="text-[10px] text-muted-foreground">{d.sizeMB} MB</div>
                    </div>
                  </div>
                  <button className="shrink-0 rounded-full border bg-white p-1.5 text-muted-foreground transition hover:bg-primary hover:text-white">
                    <Download size={14} />
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Professor Card */}
          {prof && (
            <Link to={`/professor/${prof.id}`} className="block group">
              <div className="relative rounded-[32px] border bg-card p-8 shadow-sm transition-all hover:shadow-xl hover:border-primary">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 overflow-hidden rounded-2xl border-4 border-white h-20 w-20 shadow-lg group-hover:scale-110 transition-transform">
                  <img
                    src={prof.avatar}
                    alt={prof.fullName}
                    className="h-full w-full object-cover"
                  />
                </div>
                <div className="mt-8 text-center">
                  <h3 className="text-xl font-extrabold text-foreground transition-colors group-hover:text-primary">
                    {prof.title}
                  </h3>
                  <p className="text-[11px] font-medium text-muted-foreground uppercase tracking-widest mt-1">
                    {prof.department} kafedrasi
                  </p>
                  {prof.quote && (
                    <div className="relative mt-8 rounded-3xl bg-surface p-6 text-sm text-muted-foreground leading-relaxed italic">
                      <Quote
                        className="absolute -top-3 left-6 text-primary/20 rotate-180"
                        size={24}
                      />
                      "{prof.quote}"
                    </div>
                  )}
                </div>
              </div>
            </Link>
          )}
        </aside>
      </div>
    </div>
  );
}
