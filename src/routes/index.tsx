import { Link } from "react-router-dom";
import { BookOpen, Users, Clock, ArrowRight } from "lucide-react";
import { useLibrary } from "../hooks/useLibrary";
import { DeptIcon } from "../components/DeptIcon";
import { SearchBar } from "../components/SearchBar";
import { formatDate } from "../data/library";

export default function Dashboard() {
  const { getLatestArticles, categories } = useLibrary();
  const latestArticles = getLatestArticles(3);
  const subjects = categories;

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-surface py-20 lg:py-32">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent" />
          <div className="absolute -right-20 -top-20 h-96 w-96 rounded-full bg-primary/5 blur-3xl" />
        </div>

        <div className="container relative z-10 mx-auto px-6">
          <div className="mx-auto max-w-3xl text-center">
            <span className="mb-4 inline-flex items-center gap-2 rounded-full bg-primary-soft px-4 py-1.5 text-xs font-bold tracking-wide text-primary uppercase">
              Xorazm Ma'mun Akademiyasi
            </span>
            <h1 className="text-5xl font-extrabold tracking-tight text-foreground sm:text-7xl">
              Mamun <span className="text-primary">University</span>
            </h1>
            <p className="mt-8 text-lg leading-relaxed text-muted-foreground sm:text-xl">
              Tibbiyot talabalari va professorlari uchun mo'ljallangan yagona raqamli bilimlar
              bazasi. Morfologik va klinik fanlar bo'yicha eng ishonchli materiallar.
            </p>

            <SearchBar />

            <div className="mt-12 flex flex-wrap justify-center gap-4">
              <Link
                to="/library/subj-1"
                className="rounded-full bg-primary px-10 py-4 text-base font-bold text-white shadow-xl shadow-primary/20 transition-all hover:scale-105 hover:bg-primary/90"
              >
                Kutubxonani ko'rish
              </Link>
              <Link
                to="/glossary"
                className="rounded-full bg-white px-10 py-4 text-base font-bold text-foreground border shadow-sm transition-all hover:bg-muted"
              >
                Tibbiy Lug'at
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <main className="container mx-auto px-6 py-20">
        {/* Subjects Grid */}
        <section className="mb-24">
          <div className="mb-12 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
            <div>
              <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
                Faylasuflar (Subjects)
              </h2>
              <p className="mt-2 text-muted-foreground">O'quv dasturi bo'yicha asosiy fanlar</p>
            </div>
            <Link
              to="/library/subj-1"
              className="flex items-center gap-2 font-bold text-primary hover:underline"
            >
              Barchasini ko'rish <ArrowRight size={18} />
            </Link>
          </div>

          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {subjects.map((s) => (
              <Link
                key={s.id}
                to={`/library/${s.id}`}
                className="group relative flex flex-col rounded-[32px] border bg-card p-10 transition-all hover:-translate-y-2 hover:border-primary hover:shadow-2xl"
              >
                <div className="mb-8 flex items-start justify-between">
                  <div className="grid h-16 w-16 place-items-center rounded-2xl bg-primary-soft text-primary transition-colors group-hover:bg-primary group-hover:text-white">
                    <DeptIcon name={s.icon || "Bone"} className="h-8 w-8" />
                  </div>
                </div>
                <h3 className="mb-2 text-2xl font-bold text-foreground transition-colors group-hover:text-primary">
                  {s.title}
                </h3>
                <p className="mb-8 text-sm leading-relaxed text-muted-foreground line-clamp-3">
                  {s.description}
                </p>
                <div className="mt-auto flex items-center justify-between">
                  <div className="text-xs font-bold text-muted-foreground">
                    {s.articleCount} Maqolalar
                  </div>
                  <span className="grid h-10 w-10 place-items-center rounded-full bg-muted text-muted-foreground transition-all group-hover:bg-primary group-hover:text-white">
                    <ArrowRight size={18} />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* Latest Articles */}
        <section>
          <div className="mb-12">
            <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              So'nggi maqolalar
            </h2>
            <p className="mt-2 text-muted-foreground">
              Kutubxonaga yangi qo'shilgan ilmiy materiallar
            </p>
          </div>

          <div className="grid gap-8">
            {latestArticles.map((a) => (
              <Link
                key={a.id}
                to={`/article/${a.id}`}
                className="group flex flex-col gap-6 rounded-[32px] border bg-card p-6 transition-all hover:border-primary hover:shadow-lg sm:flex-row sm:items-center sm:p-8"
              >
                <div className="shrink-0 rounded-2xl bg-muted p-6">
                  <BookOpen
                    size={32}
                    className="text-muted-foreground group-hover:text-primary transition-colors"
                  />
                </div>
                <div className="flex-1">
                  <div className="mb-2 flex flex-wrap items-center gap-3">
                    <span className="rounded-full bg-primary-soft px-3 py-1 text-[10px] font-bold tracking-wider text-primary uppercase">
                      {a.departmentSlug}
                    </span>
                    <div className="flex items-center gap-1.5 text-[11px] text-muted-foreground">
                      <Clock size={12} /> {formatDate(a.publishedAt)}
                    </div>
                  </div>
                  <h3 className="text-2xl font-bold text-foreground transition-colors group-hover:text-primary">
                    {a.title}
                  </h3>
                  <p className="mt-3 text-base text-muted-foreground line-clamp-2">{a.excerpt}</p>
                </div>
                <div className="hidden sm:block">
                  <span className="grid h-12 w-12 place-items-center rounded-full bg-muted text-muted-foreground transition-all group-hover:bg-primary group-hover:text-white">
                    <ArrowRight size={20} />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}
