import { useState } from "react";
import { useNavigate } from "react-router-dom";
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

export default function AdminArticleNew() {
  const navigate = useNavigate();
  const { addArticle, departments } = useLibrary();
  const [sections, setSections] = useState<ArticleSection[]>([
    { id: "sec-1", heading: "", paragraphs: [""] },
  ]);
  const [downloads, setDownloads] = useState<Download[]>([]);

  // State for metadata
  const [title, setTitle] = useState("");
  const [icd11, setIcd11] = useState("");
  const [departmentSlug, setDepartmentSlug] = useState("");
  const [professorId, setProfessorId] = useState("");
  const [excerpt, setExcerpt] = useState("");

  const handleSave = () => {
    if (!title || !departmentSlug || !professorId) {
      toast.error("❌ Iltimos, sarlavha, bo'lim va muallif maydonlarini to'ldiring.");
      return;
    }

    const newArticle: Article = {
      id: `art-${Date.now()}`,
      title,
      icd11,
      departmentSlug,
      professorId,
      publishedAt: new Date().toISOString().split("T")[0],
      excerpt,
      sections,
      downloads,
      badges: ["NEW"],
    };

    try {
      addArticle(newArticle);
      toast.success("✅ Yangi maqola muvaffaqiyatli qo'shildi!");
      navigate("/admin/articles");
    } catch {
      toast.error("❌ Xatolik yuz berdi. Iltimos qaytadan urinib ko'ring.");
    }
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
    setSections(sections.map((s) => (s.id === id ? { ...s, [field]: value } : s)));
  };

  const updateParagraph = (sectionId: string, pIndex: number, value: string) => {
    setSections(
      sections.map((s) =>
        s.id === sectionId
          ? { ...s, paragraphs: [value] } // We use only the first element for the RTE content
          : s,
      ),
    );
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      const newDownloads: Download[] = Array.from(files).map((file) => ({
        filename: file.name,
        type: file.name.endsWith(".pdf") ? "PDF" : "PPTX",
        sizeMB: parseFloat((file.size / (1024 * 1024)).toFixed(2)),
      }));
      setDownloads([...downloads, ...newDownloads]);
    }
  };

  const removeDownload = (index: number) => {
    setDownloads(downloads.filter((_, i) => i !== index));
  };

  return (
    <div className="mx-auto max-w-5xl space-y-8 pb-20">
      <div className="flex items-center justify-between sticky top-0 z-10 bg-muted/30 backdrop-blur py-4">
        <div>
          <h1 className="text-2xl font-bold">Yangi maqola qo'shish</h1>
          <p className="text-sm text-muted-foreground text-uz">Barcha maydonlarni to'ldiring</p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline" onClick={() => navigate("/admin/articles")}>
            Bekor qilish
          </Button>
          <Button onClick={handleSave}>
            <Save className="mr-2 h-4 w-4" />
            Saqlash
          </Button>
        </div>
      </div>

      <div className="grid gap-8 lg:grid-cols-3">
        <div className="lg:col-span-2 space-y-8">
          {/* Metadata Card */}
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
                  rows={3}
                />
              </div>
            </CardContent>
          </Card>

          {/* Sections Editor */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold">Maqola bo'limlari</h2>
              <Button variant="outline" size="sm" onClick={addSection}>
                <Plus className="mr-2 h-4 w-4" />
                Bo'lim qo'shish
              </Button>
            </div>

            {sections.map((section, sIndex) => (
              <Card key={section.id} className="relative">
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute right-2 top-2 text-muted-foreground hover:text-destructive"
                  onClick={() => removeSection(section.id)}
                >
                  <Trash2 size={16} />
                </Button>
                <CardHeader>
                  <CardTitle className="text-base font-medium">{sIndex + 1}-bo'lim</CardTitle>
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
                      onChange={(html) => updateParagraph(section.id, 0, html)}
                    />
                  </div>

                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="space-y-2">
                      <label className="text-sm font-medium flex items-center gap-2">
                        <ImageIcon size={14} /> Rasm URL (Ixtiyoriy)
                      </label>
                      <Input
                        value={section.image || ""}
                        onChange={(e) => updateSection(section.id, "image", e.target.value)}
                        placeholder="https://..."
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium flex items-center gap-2">
                        <LinkIcon size={14} /> Video URL (Ixtiyoriy)
                      </label>
                      <Input
                        value={section.videoUrl || ""}
                        onChange={(e) => updateSection(section.id, "videoUrl", e.target.value)}
                        placeholder="YouTube embed URL..."
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        <div className="space-y-8">
          {/* Professor Selection */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Muallif</CardTitle>
            </CardHeader>
            <CardContent>
              <Select onValueChange={setProfessorId} value={professorId}>
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

          {/* File Uploads */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Yuklash uchun fayllar</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="relative">
                <input
                  type="file"
                  multiple
                  accept=".pdf,.docx,.pptx"
                  className="absolute inset-0 z-50 h-full w-full cursor-pointer opacity-0"
                  onChange={handleFileUpload}
                />
                <div className="flex flex-col items-center justify-center rounded-lg border-2 border-dashed p-6 text-center">
                  <UploadCloud className="mb-2 h-8 w-8 text-muted-foreground" />
                  <div className="text-sm font-medium">Fayllarni tanlang yoki tashlang</div>
                  <div className="text-xs text-muted-foreground">PDF, DOCX, PPTX (Max. 10MB)</div>
                </div>
              </div>

              {downloads.length > 0 && (
                <div className="space-y-2">
                  {downloads.map((file, idx) => (
                    <div
                      key={idx}
                      className="flex items-center justify-between rounded-md border p-2 text-sm"
                    >
                      <div className="flex items-center gap-2 truncate">
                        <FileIcon size={14} className="text-primary" />
                        <span className="truncate">{file.filename}</span>
                        <Badge variant="outline" className="text-[10px]">
                          {file.sizeMB}MB
                        </Badge>
                      </div>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-6 w-6"
                        onClick={() => removeDownload(idx)}
                      >
                        <X size={14} />
                      </Button>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>

          {/* Settings */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Sozlamalar</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm">Nashr qilish</span>
                <Badge>Active</Badge>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Teglar (Tags)</label>
                <Input placeholder="BIOLOGY, ANATOMY..." />
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
