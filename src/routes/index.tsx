import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { ArrowRight, FileText, Files, Search } from "lucide-react";
import { articles, departments, formatDate, getLatestArticles, getProfessor } from "../data/library";
import { DeptIcon } from "../components/DeptIcon";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Talabalar bosh sahifasi — MedKnowledge" },
      { name: "description", content: "Bo'limlarni ko'ring, katalogni qidiring va professorlaringiz tomonidan tayyorlangan so'nggi tibbiy qo'llanmalarni kashf eting." },
      { property: "og:title", content: "Talabalar bosh sahifasi — MedKnowledge" },
      { property: "og:description", content: "Bo'limlarni va so'nggi tibbiy qonunlarni ko'ring." },
    ],
  }),
  component: Dashboard,
});

function Dashboard() {
  const [q, setQ] = useState("");
  const latest = useMemo(() => getLatestArticles(3), []);

  const filtered = useMemo(() => {
    const term = q.trim().toLowerCase();
    if (!term) return null;
    return articles.filter((a) => {
      const prof = getProfessor(a.professorId);
      return (
        a.title.toLowerCase().includes(term) ||
        a.icd11.toLowerCase().includes(term) ||
        (prof?.fullName.toLowerCase().includes(term) ?? false) ||
        a.departmentSlug.includes(term)
      );
    });
  }, [q]);

  return (
    <div className="mx-auto max-w-6xl px-4 sm:px-6">
      {/* Hero */}
      <section className="pt-14 pb-10 text-center sm:pt-20">
        <p className="mb-3 inline-flex items-center gap-2 rounded-full bg-primary-soft px-3 py-1 text-xs font-medium text-primary">
          Universitet tibbiyot kutubxonasi · 2026-yil nashri
        </p>
        <h1 className="mx-auto max-w-3xl text-balance text-3xl font-bold tracking-tight text-foreground sm:text-5xl">
          Talabalar uchun tashkil etilgan dalillarga asoslangan tibbiy bilimlar.
        </h1>
        <p className="mx-auto mt-4 max-w-2xl text-pretty text-base text-muted-foreground">
          Saralangan maqolalarni o'qing, ma'ruza matnlarini yuklab oling va har bir klinik bo'limda professorlaringizning hissalarini kuzatib boring.
        </p>

        <div className="mx-auto mt-8 max-w-2xl">
          <div className="group flex items-center gap-3 rounded-xl border bg-card px-4 py-3 shadow-sm transition focus-within:border-primary focus-within:shadow-md">
            <Search className="text-muted-foreground transition group-focus-within:text-primary" size={20} />
            <input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Kasallik nomi, ICD-11 kodi yoki professor bo'yicha qidirish..."
              className="w-full bg-transparent text-sm outline-none placeholder:text-muted-foreground sm:text-base"
              aria-label="Tibbiyot kutubxonasini qidirish"
            />
            {q && (
              <button
                onClick={() => setQ("")}
                className="rounded-md px-2 py-1 text-xs text-muted-foreground hover:bg-muted"
              >
                Tozalash
              </button>
            )}
          </div>
        </div>
      </section>

      {/* Search results */}
      {filtered && (
        <section className="mb-12">
          <h2 className="mb-4 text-sm font-semibold uppercase tracking-wide text-muted-foreground">
            {filtered.length} natija
          </h2>
          {filtered.length === 0 ? (
            <p className="rounded-lg border bg-card p-6 text-sm text-muted-foreground">
              Mos maqolalar topilmadi. Boshqa kalit so'z yoki ICD-11 kodini sinab ko'ring.
            </p>
          ) : (
            <ul className="grid gap-3">
              {filtered.map((a) => {
                const prof = getProfessor(a.professorId);
                return (
                  <li key={a.id}>
                    <Link
                      to="/article/$id"
                      params={{ id: a.id }}
                      className="flex items-start justify-between gap-4 rounded-lg border bg-card p-4 transition hover:border-primary hover:shadow-sm"
                    >
                      <div>
                        <p className="font-semibold text-foreground">{a.title}</p>
                        <p className="mt-1 text-xs text-muted-foreground">
                          {prof?.title} · {formatDate(a.publishedAt)}
                        </p>
                      </div>
                      <span className="shrink-0 rounded-md bg-primary-soft px-2 py-1 text-xs font-medium text-primary">
                        ICD-11 {a.icd11}
                      </span>
                    </Link>
                  </li>
                );
              })}
            </ul>
          )}
        </section>
      )}

      {/* Departments */}
      <section className="mb-16">
        <div className="mb-5 flex items-end justify-between">
          <h2 className="text-xl font-semibold tracking-tight text-foreground">Bo'limlar</h2>
          <p className="text-xs text-muted-foreground">{departments.length} klinik soha</p>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {departments.map((d) => (
            <div
              key={d.slug}
              className="group flex flex-col rounded-xl border bg-card p-5 transition hover:-translate-y-0.5 hover:border-primary hover:shadow-md"
            >
              <div className="flex items-center gap-3">
                <span className="grid h-11 w-11 place-items-center rounded-lg bg-primary-soft text-primary transition group-hover:bg-primary group-hover:text-primary-foreground">
                  <DeptIcon name={d.icon} className="h-5 w-5" />
                </span>
                <div>
                  <p className="font-semibold text-foreground">{d.name}</p>
                  <p className="text-xs text-muted-foreground">{d.blurb}</p>
                </div>
              </div>
              <div className="mt-5 flex flex-wrap gap-2">
                <span className="inline-flex items-center gap-1.5 rounded-full border bg-background px-2.5 py-1 text-xs text-muted-foreground">
                  <FileText size={12} /> {d.articleCount} maqola
                </span>
                <span className="inline-flex items-center gap-1.5 rounded-full border bg-background px-2.5 py-1 text-xs text-muted-foreground">
                  <Files size={12} /> {d.pdfCount} PDF
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Latest updates */}
      <section className="mb-20">
        <div className="mb-5 flex items-end justify-between">
          <h2 className="text-xl font-semibold tracking-tight text-foreground">So'nggi yangilanishlar</h2>
          <p className="text-xs text-muted-foreground">Yaqinda qo'shilgan qo'llanmalar</p>
        </div>
        <ul className="grid gap-3">
          {latest.map((a) => {
            const prof = getProfessor(a.professorId);
            return (
              <li key={a.id}>
                <Link
                  to="/article/$id"
                  params={{ id: a.id }}
                  className="group flex items-center justify-between gap-4 rounded-lg border bg-card p-4 transition hover:border-primary hover:shadow-sm"
                >
                  <div className="min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="rounded bg-primary-soft px-1.5 py-0.5 text-[10px] font-medium text-primary">
                        ICD-11 {a.icd11}
                      </span>
                      <span className="text-[11px] text-muted-foreground">{formatDate(a.publishedAt)}</span>
                    </div>
                    <p className="mt-1 truncate font-semibold text-foreground">{a.title}</p>
                    <p className="mt-0.5 text-xs text-muted-foreground">Muallif: {prof?.title} · {prof?.department}</p>
                  </div>
                  <ArrowRight className="shrink-0 text-muted-foreground transition group-hover:translate-x-0.5 group-hover:text-primary" size={18} />
                </Link>
              </li>
            );
          })}
        </ul>
      </section>
    </div>
  );
}
