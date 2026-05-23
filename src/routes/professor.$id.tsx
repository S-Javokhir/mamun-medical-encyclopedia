import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowRight, GraduationCap } from "lucide-react";
import {
  formatDate,
  getDepartment,
  getProfessor,
  getProfessorArticles,
} from "../data/library";
import { PageSkeleton } from "../components/Skeleton";

export const Route = createFileRoute("/professor/$id")({
  loader: ({ params }) => {
    if (!getProfessor(params.id)) throw notFound();
    return {};
  },
  head: ({ params }) => {
    const p = params?.id ? getProfessor(params.id) : undefined;
    const title = p ? `${p.title} — MedKnowledge` : "Professor — MedKnowledge";
    const desc = p?.bio ?? "Professor profili va taqdim etilgan materiallar.";
    return {
      meta: [
        { title },
        { name: "description", content: desc },
        { property: "og:title", content: title },
        { property: "og:description", content: desc },
      ],
    };
  },
  pendingComponent: PageSkeleton,
  component: ProfessorPage,
});

function ProfessorPage() {
  const { id } = Route.useParams();
  const prof = getProfessor(id)!;
  const items = getProfessorArticles(id);

  return (
    <div className="mx-auto max-w-5xl px-4 py-10 sm:px-6">
      <nav className="mb-6 text-xs text-muted-foreground">
        <Link to="/" className="hover:text-primary">Bosh sahifa</Link>
        <span className="mx-1.5">/</span>
        <span>Professorlar</span>
        <span className="mx-1.5">/</span>
        <span className="text-foreground">{prof.title}</span>
      </nav>

      {/* Header card */}
      <section className="rounded-2xl border bg-card p-6 sm:p-8">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-start">
          <img
            src={prof.avatar}
            alt={prof.fullName}
            className="h-28 w-28 shrink-0 rounded-full border-2 border-primary-soft object-cover sm:h-32 sm:w-32"
          />
          <div className="min-w-0 flex-1">
            <p className="inline-flex items-center gap-1.5 rounded-full bg-primary-soft px-2.5 py-1 text-[11px] font-medium text-primary">
              <GraduationCap size={12} /> {prof.department}
            </p>
            <h1 className="mt-3 text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
              {prof.title}
            </h1>
            <p className="text-sm text-muted-foreground">{prof.fullName}</p>
            <p className="mt-4 text-pretty text-sm leading-relaxed text-foreground/90">
              {prof.bio}
            </p>

            <div className="mt-5">
              <p className="mb-2 text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
                Ilmiy qiziqishlar
              </p>
              <div className="flex flex-wrap gap-2">
                {prof.researchInterests.map((r) => (
                  <span
                    key={r}
                    className="rounded-full border bg-background px-2.5 py-1 text-xs text-foreground/80"
                  >
                    {r}
                  </span>
                ))}
              </div>
            </div>

            <div className="mt-5">
              <p className="mb-2 text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
                Malaka va yutuqlar
              </p>
              <ul className="space-y-1 text-sm text-foreground/90">
                {prof.credentials.map((c) => (
                  <li key={c} className="flex gap-2">
                    <span className="mt-2 inline-block h-1 w-1 shrink-0 rounded-full bg-primary" />
                    {c}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Contributions */}
      <section className="mt-10">
        <div className="mb-5 flex items-end justify-between">
          <h2 className="text-xl font-semibold tracking-tight text-foreground">Maqolalar / Hissalar</h2>
          <p className="text-xs text-muted-foreground">{items.length} ta material</p>
        </div>
        <ul className="divide-y rounded-xl border bg-card">
          {items.map((a) => {
            const dept = getDepartment(a.departmentSlug);
            return (
              <li key={a.id}>
                <Link
                  to="/article/$id"
                  params={{ id: a.id }}
                  className="group flex items-start justify-between gap-4 p-5 transition hover:bg-primary-soft/40"
                >
                  <div className="min-w-0">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="rounded bg-primary-soft px-1.5 py-0.5 text-[10px] font-medium text-primary">
                        ICD-11 {a.icd11}
                      </span>
                      <span className="rounded border bg-background px-1.5 py-0.5 text-[10px] text-muted-foreground">
                        {dept?.name}
                      </span>
                      <span className="text-[11px] text-muted-foreground">{formatDate(a.publishedAt)}</span>
                    </div>
                    <p className="mt-1.5 font-semibold text-foreground">{a.title}</p>
                    <p className="mt-1 line-clamp-2 text-sm text-muted-foreground">{a.excerpt}</p>
                  </div>
                  <ArrowRight
                    size={18}
                    className="mt-1 shrink-0 text-muted-foreground transition group-hover:translate-x-0.5 group-hover:text-primary"
                  />
                </Link>
              </li>
            );
          })}
        </ul>
      </section>
    </div>
  );
}
