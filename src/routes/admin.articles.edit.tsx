import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "sonner";
import {
  Save,
  X,
  Plus,
  Trash2,
  Image as ImageIcon,
  Link as LinkIcon,
  Type,
  Table as TableIcon,
  UploadCloud,
  File as FileIcon,
} from "lucide-react";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Textarea } from "../components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { professors, ArticleSection, Download, Article } from "../data/library";
import { Badge } from "../components/ui/badge";
import { useLibrary } from "../hooks/useLibrary";
import { Editor } from "../components/Editor";

export default function AdminArticleEdit() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { getArticle, updateArticle, departments } = useLibrary();

  const [sections, setSections] = useState<ArticleSection[]>([]);
  const [downloads, setDownloads] = useState<Download[]>([]);
  const [title, setTitle] = useState("");
  const [icd11, setIcd11] = useState("");
  const [excerpt, setExcerpt] = useState("");
  const [departmentSlug, setDepartmentSlug] = useState("");
  const [professorId, setProfessorId] = useState("");

  const [loadedId, setLoadedId] = useState<string | null>(null);

  useEffect(() => {
    // Only load if the ID has changed and hasn't been loaded yet
    if (loadedId === id || !id) return;

    const article = getArticle(id);
    if (article) {
      setTitle(article.title);
      setIcd11(article.icd11);
      setExcerpt(article.excerpt);
      setDepartmentSlug(article.departmentSlug);
      setProfessorId(article.professorId);
      setSections(article.sections);
      setDownloads(article.downloads);
      setLoadedId(id);
    } else {
      navigate("/admin/articles");
    }
  }, [id, getArticle, navigate, loadedId]);

  const handleSave = () => {
    if (!title || !departmentSlug) {
      toast.error("Ma'lumotlar to'liq emas", {
        description: "Iltimos, sarlavha va bo'lim maydonlarini to'ldiring.",
      });
      return;
    }

    // We get the existing article to preserve fields like publishedAt that are not edited in the form
    const existingArticle = getArticle(id!);
    const originalPublishedAt =
      existingArticle?.publishedAt || new Date().toISOString().split("T")[0];

    const updatedArticle: Article = {
      id: id!,
      title,
      icd11,
      excerpt,
      departmentSlug,
      professorId,
      publishedAt: originalPublishedAt,
      sections,
      downloads,
    };

    try {
      updateArticle(updatedArticle);
      toast.success("Muvaffaqiyatli saqlandi", {
        description: "Maqola ma'lumotlari yangilandi.",
      });
      navigate("/admin/articles");
    } catch {
      toast.error("Xatolik", {
        description: "Ma'lumotlarni saqlashda xatolik yuz berdi.",
      });
    }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      const newDownloads: Download[] = Array.from(files).map((file) => ({
        filename: file.name,
        type: file.name.toUpperCase().endsWith(".PDF") ? "PDF" : "PPTX",
        sizeMB: parseFloat((file.size / (1024 * 1024)).toFixed(2)),
      }));
      setDownloads([...downloads, ...newDownloads]);
    }
  };

  const removeDownload = (index: number) => {
    setDownloads(downloads.filter((_, i) => i !== index));
  };

  const addSection = () => {
    const newSection: ArticleSection = {
      id: `sec-${Date.now()}`,
      heading: "",
      paragraphs: [""],
    };
    setSections([...sections, newSection]);
  };

  const removeSection = (id: string) => {
    setSections(sections.filter((s) => s.id !== id));
  };

  const updateSection = (id: string, field: keyof ArticleSection, value: any) => {
    setSections((prev) => prev.map((s) => (s.id === id ? { ...s, [field]: value } : s)));
  };

  return (
    <div className="mx-auto max-w-5xl space-y-8 pb-20">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Maqolani tahrirlash</h1>
          <p className="text-muted-foreground">Mavjud maqola ma'lumotlarini o'zgartiring</p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline" className="gap-2" onClick={() => navigate("/admin/articles")}>
            <X size={18} />
            Bekor qilish
          </Button>
          <Button className="gap-2 bg-teal-600 hover:bg-teal-700" onClick={handleSave}>
            <Save size={18} />
            Saqlash
          </Button>
        </div>
      </div>

      <div className="grid gap-8 lg:grid-cols-3">
        <div className="lg:col-span-2 space-y-8">
          {/* Main Info */}
          <Card>
            <CardHeader>
              <CardTitle>Asosiy ma'lumotlar</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Maqola sarlavhasi</label>
                <Input
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Masalan: Kallaning ichki asos tuzilishi"
                />
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <label className="text-sm font-medium">ICD-11 kodi</label>
                  <Input
                    value={icd11}
                    onChange={(e) => setIcd11(e.target.value)}
                    placeholder="Masalan: FA01.0"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Bo'lim (Kategoriya)</label>
                  <Select value={departmentSlug} onValueChange={setDepartmentSlug}>
                    <SelectTrigger>
                      <SelectValue placeholder="Tanlang" />
                    </SelectTrigger>
                    <SelectContent>
                      {(departments || []).map((dept) => (
                        <SelectItem key={dept.slug} value={dept.slug}>
                          {dept.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Qisqacha mazmuni (Excerpt)</label>
                <Textarea
                  value={excerpt}
                  onChange={(e) => setExcerpt(e.target.value)}
                  placeholder="Maqola haqida qisqacha ma'lumot..."
                />
              </div>
            </CardContent>
          </Card>

          {/* Sections */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-bold">Maqola bo'limlari</h2>
              <Button variant="outline" size="sm" className="gap-2" onClick={addSection}>
                <Plus size={16} />
                Bo'lim qo'shish
              </Button>
            </div>

            {sections.map((section, index) => (
              <Card key={section.id} className="relative overflow-hidden">
                <div className="absolute left-0 top-0 h-full w-1 bg-teal-500" />
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-base">{index + 1}-bo'lim</CardTitle>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8 text-destructive"
                    onClick={() => removeSection(section.id)}
                  >
                    <Trash2 size={16} />
                  </Button>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Sarlavha (Heading)</label>
                    <Input
                      value={section.heading}
                      onChange={(e) => updateSection(section.id, "heading", e.target.value)}
                      placeholder="Bo'lim sarlavhasi..."
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Matn (Rich Text)</label>
                    <Editor
                      content={section.paragraphs[0] || ""}
                      onChange={(html) => updateSection(section.id, "paragraphs", [html])}
                    />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        <div className="space-y-6">
          {/* Author */}
          <Card>
            <CardHeader>
              <CardTitle>Muallif</CardTitle>
            </CardHeader>
            <CardContent>
              <Select value={professorId} onValueChange={setProfessorId}>
                <SelectTrigger>
                  <SelectValue placeholder="Professor tanlang" />
                </SelectTrigger>
                <SelectContent>
                  {professors.map((p) => (
                    <SelectItem key={p.id} value={p.id}>
                      {p.fullName}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </CardContent>
          </Card>

          {/* Files */}
          <Card>
            <CardHeader>
              <CardTitle>Yuklash uchun fayllar</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="relative">
                <input
                  type="file"
                  multiple
                  accept=".pdf,.docx,.pptx"
                  className="absolute inset-0 z-50 h-full w-full cursor-pointer opacity-0"
                  onChange={handleFileUpload}
                />
                <div className="flex flex-col items-center justify-center rounded-lg border-2 border-dashed border-muted-foreground/25 p-10 text-center">
                  <UploadCloud className="mb-4 h-10 w-10 text-muted-foreground/50" />
                  <p className="text-sm font-medium">Fayllarni tanlang yoki tashlang</p>
                  <p className="text-xs text-muted-foreground mt-1">PDF, DOCX, PPTX (Max. 10MB)</p>
                </div>
              </div>

              {downloads.length > 0 && (
                <div className="mt-4 space-y-2">
                  {downloads.map((file, idx) => (
                    <div
                      key={idx}
                      className="flex items-center justify-between rounded-md border p-2 text-sm"
                    >
                      <div className="flex items-center gap-2 truncate">
                        <FileIcon size={14} className="text-primary" />
                        <span className="truncate max-w-[150px]">{file.filename}</span>
                        <Badge variant="outline" className="text-[10px]">
                          {file.sizeMB}MB
                        </Badge>
                      </div>
                      <div className="flex items-center gap-2 text-uz">
                        <Badge variant="secondary" className="text-[10px]">
                          {file.type}
                        </Badge>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-6 w-6 text-muted-foreground hover:text-destructive"
                          onClick={() => removeDownload(idx)}
                        >
                          <X size={14} />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
