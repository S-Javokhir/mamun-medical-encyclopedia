import { Search } from "lucide-react";

export function SearchBar() {
  return (
    <div className="relative mx-auto mt-10 max-w-2xl">
      <div className="group relative">
        <div className="absolute inset-y-0 left-0 flex items-center pl-6 pointer-events-none">
          <Search className="h-5 w-5 text-muted-foreground group-focus-within:text-primary transition-colors" />
        </div>
        <input
          type="text"
          placeholder="Maqola, mavzu yoki kategoriya bo'yicha qidirish..."
          className="block w-full rounded-2xl border bg-white py-5 pl-14 pr-6 text-base text-foreground shadow-sm ring-primary/20 transition-all focus:border-primary focus:outline-none focus:ring-4 placeholder:text-muted-foreground/60"
        />
        <div className="absolute inset-y-2 right-2 flex items-center">
          <kbd className="hidden sm:inline-flex h-full items-center gap-1 rounded-xl border bg-muted px-3 text-[10px] font-medium text-muted-foreground">
            <span className="text-xs">⌘</span>K
          </kbd>
        </div>
      </div>
      <p className="mt-4 text-center text-sm text-muted-foreground/60 italic">
        Misol uchun: <span className="font-medium text-primary/80">"Osteologiya"</span>,{" "}
        <span className="font-medium text-primary/80">"Yurak anatomiyasi"</span>
      </p>
    </div>
  );
}
