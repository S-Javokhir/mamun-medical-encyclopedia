import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { FileText, Book, Layers, Users, TrendingUp } from "lucide-react";
import { professors } from "../data/library";
import { useLibrary } from "../hooks/useLibrary";

export default function AdminDashboard() {
  const { articles, glossary, categories } = useLibrary();

  const stats = [
    { label: "Jami maqolalar", value: articles.length, icon: FileText, color: "text-blue-500" },
    { label: "Lug'at terminlari", value: glossary.length, icon: Book, color: "text-green-500" },
    { label: "Kategoriyalar", value: categories.length, icon: Layers, color: "text-purple-500" },
    { label: "Professorlar", value: professors.length, icon: Users, color: "text-orange-500" },
  ];

  return (
    <div className="space-y-8">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <Card key={stat.label}>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">{stat.label}</CardTitle>
                <Icon className={`h-4 w-4 ${stat.color}`} />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stat.value}</div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>So'nggi qo'shilgan maqolalar</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {articles.slice(0, 5).map((article) => (
                <div
                  key={article.id}
                  className="flex items-center justify-between border-b pb-2 last:border-0"
                >
                  <div>
                    <div className="font-medium">{article.title}</div>
                    <div className="text-xs text-muted-foreground">{article.publishedAt}</div>
                  </div>
                  <TrendingUp className="h-4 w-4 text-muted-foreground" />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Tizim holati</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="rounded-lg bg-primary/5 p-4 text-sm text-primary">
              Barcha tizimlar normal ishlamoqda. Ma'lumotlarni yangilash uchun "Maqolalar" bo'limiga
              o'ting.
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
