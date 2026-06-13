import { useState } from "react";
import { Link } from "react-router-dom";
import { Plus, Search, Filter, MoreVertical, Edit, Trash2, FileText, Check } from "lucide-react";
import { departments } from "../data/library";
import { useLibrary } from "../hooks/useLibrary";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../components/ui/dropdown-menu";
import { Badge } from "../components/ui/badge";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "../components/ui/alert-dialog";

export default function AdminArticles() {
  const { articles, deleteArticle, departments } = useLibrary();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedDepartment, setSelectedDepartment] = useState<string | null>(null);
  const [articleToDelete, setArticleToDelete] = useState<string | null>(null);

  const confirmDelete = () => {
    if (articleToDelete) {
      deleteArticle(articleToDelete);
      setArticleToDelete(null);
    }
  };

  const filteredArticles = articles.filter((article) => {
    const matchesSearch =
      article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      article.id.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesDepartment = !selectedDepartment || article.departmentSlug === selectedDepartment;

    return matchesSearch && matchesDepartment;
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="relative w-full max-w-sm">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Maqolalarni qidirish..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        <div className="flex gap-2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="outline"
                size="sm"
                className={`gap-2 ${selectedDepartment ? "border-primary text-primary" : ""}`}
              >
                <Filter size={16} />
                {selectedDepartment
                  ? departments.find((d) => d.slug === selectedDepartment)?.name
                  : "Filtr"}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuItem
                onClick={() => setSelectedDepartment(null)}
                className="flex items-center justify-between"
              >
                Barchasi
                {!selectedDepartment && <Check size={14} className="text-primary" />}
              </DropdownMenuItem>
              {departments.map((dept) => (
                <DropdownMenuItem
                  key={dept.slug}
                  onClick={() => setSelectedDepartment(dept.slug)}
                  className="flex items-center justify-between"
                >
                  {dept.name}
                  {selectedDepartment === dept.slug && <Check size={14} className="text-primary" />}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
          <Button asChild size="sm" className="gap-2">
            <Link to="/admin/articles/new">
              <Plus size={16} />
              Yangi maqola
            </Link>
          </Button>
        </div>
      </div>

      <div className="rounded-md border bg-background">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Maqola</TableHead>
              <TableHead>Kategoriya</TableHead>
              <TableHead>Sana</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="w-[80px] text-right">Amallar</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredArticles.map((article) => (
              <TableRow key={article.id}>
                <TableCell>
                  <div className="flex items-center gap-3">
                    <div className="flex h-8 w-8 items-center justify-center rounded bg-primary/10 text-primary">
                      <FileText size={16} />
                    </div>
                    <div>
                      <div className="font-medium">{article.title}</div>
                      <div className="text-xs text-muted-foreground">{article.id}</div>
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  <Badge variant="secondary">
                    {departments.find((d) => d.slug === article.departmentSlug)?.name ||
                      article.departmentSlug}
                  </Badge>
                </TableCell>
                <TableCell className="text-sm">
                  {article.publishedAt.includes("T")
                    ? article.publishedAt.split("T")[0]
                    : article.publishedAt}
                </TableCell>
                <TableCell>
                  <Badge className="bg-green-100 text-green-700 hover:bg-green-100">
                    Nashr etilgan
                  </Badge>
                </TableCell>
                <TableCell className="text-right">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon">
                        <MoreVertical size={16} />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem className="gap-2 cursor-pointer" asChild>
                        <Link to={`/admin/articles/edit/${article.id}`}>
                          <Edit size={14} />
                          Tahrirlash
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        className="gap-2 cursor-pointer text-destructive focus:text-destructive"
                        onClick={() => setArticleToDelete(article.id)}
                      >
                        <Trash2 size={14} />
                        O'chirish
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <AlertDialog
        open={!!articleToDelete}
        onOpenChange={(open) => !open && setArticleToDelete(null)}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Maqolani o'chirish</AlertDialogTitle>
            <AlertDialogDescription>
              Haqiqatan ham ushbu maqolani o'chirmoqchimisiz? Bu amalni ortga qaytarib bo'lmaydi.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Bekor qilish</AlertDialogCancel>
            <AlertDialogAction
              onClick={confirmDelete}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              O'chirish
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
