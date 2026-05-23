import { useState, useMemo } from "react";
import { Search, Book } from "lucide-react";
import { glossaryTerms, getGlossaryByLetter } from "../data/library";

export default function Glossary() {
  const [activeLetter, setActiveLetter] = useState("A");
  const [searchTerm, setSearchTerm] = useState("");

  const alphabet = "ABDEFGHIJKLMNOPRSTUVXG'SHCH".split("");

  const filteredTerms = useMemo(() => {
    if (searchTerm) {
      return glossaryTerms.filter(
        (t) =>
          t.term.toLowerCase().includes(searchTerm.toLowerCase()) ||
          t.definition.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    return getGlossaryByLetter(activeLetter);
  }, [activeLetter, searchTerm]);

  return (
    <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
      <div className="mb-12 text-center">
        <span className="mb-3 inline-flex items-center gap-2 rounded-full bg-primary-soft px-3 py-1 text-xs font-medium text-primary">
          Tibbiy ensiklopediya
        </span>
        <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
          Tibbiy terminlar lug'ati
        </h1>
        <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">
          Asosiy tibbiy atamalar, tushunchalar va ularning qisqacha izohlari to'plami. 
          Alifbo bo'yicha yoki qidiruv orqali kerakli s'ozni toping.
        </p>
      </div>

      <div className="mb-10 space-y-6">
        {/* Search */}
        <div className="mx-auto max-w-xl">
          <div className="flex items-center gap-3 rounded-xl border bg-card px-4 py-3 shadow-sm transition focus-within:border-primary focus-within:shadow-md">
            <Search className="text-muted-foreground" size={20} />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Atamani qidirish..."
              className="w-full bg-transparent text-sm outline-none placeholder:text-muted-foreground sm:text-base"
            />
          </div>
        </div>

        {/* Alphabet Navigation */}
        {!searchTerm && (
          <div className="flex flex-wrap justify-center gap-2">
            {alphabet.map((letter) => (
              <button
                key={letter}
                onClick={() => setActiveLetter(letter)}
                className={`flex h-10 w-10 items-center justify-center rounded-lg border text-sm font-semibold transition ${
                  activeLetter === letter
                    ? "bg-primary text-primary-foreground border-primary shadow-sm"
                    : "bg-card text-muted-foreground hover:border-primary hover:text-primary"
                }`}
              >
                {letter}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Results */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {filteredTerms.length > 0 ? (
          filteredTerms.map((t) => (
            <div
              key={t.term}
              className="flex flex-col rounded-2xl border bg-card p-6 transition hover:border-primary hover:shadow-md"
            >
              <div className="mb-3 flex items-start justify-between gap-4">
                <h3 className="text-xl font-bold text-foreground">{t.term}</h3>
                <span className="shrink-0 rounded-full bg-muted px-2.5 py-0.5 text-[10px] font-medium text-muted-foreground">
                  {t.category}
                </span>
              </div>
              <p className="text-sm leading-relaxed text-muted-foreground">
                {t.definition}
              </p>
            </div>
          ))
        ) : (
          <div className="col-span-full rounded-2xl border border-dashed p-12 text-center">
            <div className="mx-auto mb-4 grid h-12 w-12 place-items-center rounded-full bg-muted text-muted-foreground">
              <Book size={24} />
            </div>
            <h3 className="text-lg font-semibold text-foreground">Hech narsa topilmadi</h3>
            <p className="mt-1 text-sm text-muted-foreground">
              Boshqa harf yoki kalit so'zni sinab ko'ring.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
