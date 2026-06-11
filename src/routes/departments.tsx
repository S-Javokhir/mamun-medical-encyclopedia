import { useState, useMemo } from "react";
import { Search, FileText, Files, ArrowRight } from "lucide-react";
import { departments } from "../data/library";
import { DeptIcon } from "../components/DeptIcon";

export default function Departments() {
  const [q, setQ] = useState("");

  const filtered = useMemo(() => {
    const term = q.trim().toLowerCase();
    if (!term) return departments;
    return departments.filter(
      (d) => d.name.toLowerCase().includes(term) || d.blurb.toLowerCase().includes(term),
    );
  }, [q]);

  return (
    <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
      <div className="mb-12 text-center">
        <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
          Klinik bo'limlar
        </h1>
        <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">
          MedKnowledge kutubxonasidagi barcha klinik sohalar. Har bir bo'limda professorlar
          tomonidan tayyorlangan maxsus o'quv materiallari mavjud.
        </p>
      </div>

      {/* Search */}
      <div className="mx-auto mb-12 max-w-xl">
        <div className="flex items-center gap-3 rounded-2xl border bg-card px-5 py-4 shadow-sm transition focus-within:border-primary focus-within:shadow-md">
          <Search className="text-muted-foreground" size={22} />
          <input
            type="text"
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Bo'limni qidirish..."
            className="w-full bg-transparent text-base outline-none placeholder:text-muted-foreground"
          />
        </div>
      </div>

      {/* Grid */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((d) => (
          <div
            key={d.slug}
            className="group flex flex-col rounded-3xl border bg-card p-6 shadow-sm transition-all hover:-translate-y-1 hover:border-primary hover:shadow-xl"
          >
            <div className="mb-6 flex items-start justify-between">
              <span className="grid h-14 w-14 place-items-center rounded-2xl bg-primary-soft text-primary transition-colors group-hover:bg-primary group-hover:text-white">
                <DeptIcon name={d.icon} className="h-7 w-7" />
              </span>
              <span className="rounded-full bg-muted px-3 py-1 text-[11px] font-bold text-muted-foreground">
                {d.articleCount + d.pdfCount} material
              </span>
            </div>

            <h3 className="mb-2 text-xl font-bold text-foreground transition-colors group-hover:text-primary">
              {d.name}
            </h3>
            <p className="mb-6 text-sm leading-relaxed text-muted-foreground">{d.blurb}</p>

            <div className="mt-auto flex flex-wrap gap-2 text-[12px]">
              <span className="flex items-center gap-1.5 rounded-full bg-background px-3 py-1.5 font-medium text-foreground border">
                <FileText size={14} className="text-primary" /> {d.articleCount} maqola
              </span>
              <span className="flex items-center gap-1.5 rounded-full bg-background px-3 py-1.5 font-medium text-foreground border">
                <Files size={14} className="text-primary" /> {d.pdfCount} PDF/PPTX
              </span>
            </div>

            <button className="mt-6 flex items-center justify-center gap-2 rounded-xl bg-muted py-3 text-sm font-semibold text-foreground transition-all group-hover:bg-primary group-hover:text-white">
              Bo'limni ko'rish <ArrowRight size={16} />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
