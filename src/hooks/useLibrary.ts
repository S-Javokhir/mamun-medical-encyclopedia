import { useState, useEffect, useCallback } from "react";
import { toast } from "sonner";
import {
  Article,
  GlossaryTerm,
  NavItem,
  Department,
  articles as initialArticles,
  glossaryTerms as initialGlossary,
  medicalCurriculumData as initialCategories,
  departments as initialDepartments,
  professors as initialProfessors,
} from "../data/library";

const STORAGE_KEY = "mamun_library_persistent_data";

interface LibraryData {
  articles: Article[];
  glossary: GlossaryTerm[];
  categories: NavItem[];
  departments: Department[];
  professors: any[]; // We can use Professor type if we import it
}

// Helper: save directly to localStorage inside mutations to avoid the
// navigate-before-effect race condition (component unmounts before useEffect fires).
function saveToStorage(data: LibraryData) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  } catch (e) {
    console.error("Failed to save library data to localStorage", e);
  }
}

export function useLibrary() {
  const [data, setData] = useState<LibraryData>(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    const defaults = {
      articles: initialArticles,
      glossary: initialGlossary,
      categories: initialCategories,
      departments: initialDepartments,
      professors: initialProfessors,
    };

    if (saved) {
      try {
        const parsed = JSON.parse(saved);

        // Merge strategy: keep user changes but bring in any new default articles/glossary
        const mergedArticles = [...(parsed.articles || [])];
        defaults.articles.forEach((defaultArt) => {
          if (!mergedArticles.find((a) => a.id === defaultArt.id)) {
            mergedArticles.push(defaultArt);
          }
        });

        const mergedGlossary = [...(parsed.glossary || [])];
        defaults.glossary.forEach((defaultTerm) => {
          if (!mergedGlossary.find((t) => t.term === defaultTerm.term)) {
            mergedGlossary.push(defaultTerm);
          }
        });

        return {
          ...parsed,
          articles: mergedArticles,
          glossary: mergedGlossary,
          categories: parsed.categories || defaults.categories,
          departments: parsed.departments || defaults.departments,
        };
      } catch (e) {
        console.error("Failed to parse saved library data", e);
      }
    }
    return defaults;
  });

  // Build a fully-updated data snapshot (recalculate counts)
  const buildUpdatedData = useCallback(
    (prev: LibraryData, articles: Article[]): LibraryData => {
      const updatedDepartments = prev.departments.map((dept) => {
        const deptArticles = articles.filter((a) => a.departmentSlug === dept.slug);
        return {
          ...dept,
          articleCount: deptArticles.length,
          pdfCount: deptArticles.reduce(
            (acc, a) => acc + (a.downloads?.filter((d) => d.type === "PDF").length || 0),
            0,
          ),
        };
      });

      const countArticlesUnderNode = (node: NavItem): number => {
        let count = 0;
        if (node.type === "article" && articles.some((a) => a.id === node.id)) count = 1;
        if (node.children)
          count += node.children.reduce((acc, c) => acc + countArticlesUnderNode(c), 0);
        return count;
      };

      const updateNavItemCounts = (items: NavItem[]): NavItem[] =>
        items.map((item) => ({
          ...item,
          ...(item.type !== "article" ? { articleCount: countArticlesUnderNode(item) } : {}),
          ...(item.children ? { children: updateNavItemCounts(item.children) } : {}),
        }));

      return {
        ...prev,
        departments: updatedDepartments,
        categories: updateNavItemCounts(prev.categories),
        articles,
      };
    },
    [],
  );

  // Initial count sync on mount
  useEffect(() => {
    setData((prev) => buildUpdatedData(prev, prev.articles));
  }, []);

  // ─── Article CRUD ──────────────────────────────────────────────────────────

  const addArticle = (article: Article) => {
    setData((prev) => {
      const updatedArticles = [article, ...prev.articles];
      const newData = buildUpdatedData(prev, updatedArticles);
      saveToStorage(newData);
      return newData;
    });
    // Toast is handled in UI component to avoid duplicates
  };

  const updateArticle = (article: Article) => {
    setData((prev) => {
      const updatedArticles = prev.articles.map((a) => (a.id === article.id ? article : a));
      const newData = buildUpdatedData(prev, updatedArticles);
      saveToStorage(newData);
      return newData;
    });
    // Toast is handled in UI component to avoid duplicates
  };

  const deleteArticle = (id: string) => {
    setData((prev) => {
      const updatedArticles = prev.articles.filter((a) => a.id !== id);
      const newData = buildUpdatedData(prev, updatedArticles);
      saveToStorage(newData);
      return newData;
    });
    toast.success("Muvaffaqiyatli o'chirildi", {
      description: "Maqola ro'yxatdan olib tashlandi."
    });
  };

  // ─── Glossary CRUD ────────────────────────────────────────────────────────

  const addGlossaryTerm = (term: GlossaryTerm) => {
    setData((prev) => {
      const newData = { ...prev, glossary: [term, ...prev.glossary] };
      saveToStorage(newData);
      return newData;
    });
    toast.success("Muvaffaqiyatli qo'shildi", {
      description: "Yangi termin lug'atga kiritildi."
    });
  };

  const updateGlossaryTerm = (oldTerm: string, updatedTerm: GlossaryTerm) => {
    setData((prev) => {
      const newData = {
        ...prev,
        glossary: prev.glossary.map((t) => (t.term === oldTerm ? updatedTerm : t)),
      };
      saveToStorage(newData);
      return newData;
    });
    toast.success("Muvaffaqiyatli yangilandi", {
      description: "Termin ma'lumoti muvaffaqiyatli o'zgartirildi."
    });
  };

  const deleteGlossaryTerm = (termName: string) => {
    setData((prev) => {
      const newData = {
        ...prev,
        glossary: prev.glossary.filter((t) => t.term !== termName),
      };
      saveToStorage(newData);
      return newData;
    });
    toast.success("Muvaffaqiyatli o'chirildi", {
      description: "Termin lug'atdan olib tashlandi."
    });
  };

  // ─── Categories & Departments ─────────────────────────────────────────────

  const updateCategories = (categories: NavItem[]) => {
    setData((prev) => {
      const newData = { ...prev, categories };
      saveToStorage(newData);
      return newData;
    });
    // Toast is handled in UI component to avoid duplicates
  };

  const updateDepartments = (departments: Department[]) => {
    setData((prev) => {
      const newData = { ...prev, departments };
      saveToStorage(newData);
      return newData;
    });
    toast.success("Muvaffaqiyatli yangilandi", {
      description: "Bo'limlar ma'lumoti muvaffaqiyatli yangilandi."
    });
  };

  // ─── Selectors ────────────────────────────────────────────────────────────

  const getArticle = useCallback(
    (id: string) => {
      return data.articles.find((a) => a.id === id);
    },
    [data.articles],
  );

  const getLatestArticles = useCallback(
    (count: number) => {
      return [...data.articles]
        .sort((a, b) => b.publishedAt.localeCompare(a.publishedAt))
        .slice(0, count);
    },
    [data.articles],
  );

  const getProfessor = useCallback(
    (id: string) => {
      return data.professors.find((p) => p.id === id);
    },
    [data.professors],
  );

  const getProfessorArticles = useCallback(
    (profId: string) => {
      return data.articles.filter((a) => a.professorId === profId);
    },
    [data.articles],
  );

  const getDepartment = useCallback(
    (slug: string) => {
      return data.departments.find((d) => d.slug === slug);
    },
    [data.departments],
  );

  return {
    articles: data.articles,
    glossary: data.glossary,
    categories: data.categories,
    departments: data.departments,
    addArticle,
    updateArticle,
    deleteArticle,
    addGlossaryTerm,
    updateGlossaryTerm,
    deleteGlossaryTerm,
    updateCategories,
    updateDepartments,
    getArticle,
    getLatestArticles,
    getProfessor,
    getProfessorArticles,
    getDepartment,
    professors: data.professors,
  };
}
