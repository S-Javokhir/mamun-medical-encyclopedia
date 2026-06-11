import { useState } from "react";
import {
  Plus,
  ChevronRight,
  ChevronDown,
  MoreVertical,
  Edit,
  Trash2,
  Folder,
  FileText,
} from "lucide-react";
import { NavItem } from "../data/library";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Badge } from "../components/ui/badge";
import { Card, CardContent } from "../components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "../components/ui/dialog";
import { useLibrary } from "../hooks/useLibrary";
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

export default function AdminCategories() {
  const { categories, updateCategories, departments, updateDepartments } = useLibrary();
  const [expanded, setExpanded] = useState<Record<string, boolean>>({ "subj-1": true });
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [parentId, setParentId] = useState<string | null>(null);
  const [newItem, setNewItem] = useState({ title: "", englishTitle: "" });
  const [idToDelete, setIdToDelete] = useState<string | null>(null);

  const toggleExpand = (id: string) => {
    setExpanded((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const handleAddItem = () => {
    const newId = `item-${Date.now()}`;
    const slug = newItem.title.toLowerCase().replace(/\s+/g, "-");

    // Determine type based on where we are adding it
    const findDepth = (items: NavItem[], id: string, currentDepth: number = 0): number | null => {
      for (const item of items) {
        if (item.id === id) return currentDepth;
        if (item.children) {
          const depth = findDepth(item.children, id, currentDepth + 1);
          if (depth !== null) return depth;
        }
      }
      return null;
    };

    const parentDepth = parentId ? findDepth(categories, parentId) : -1;
    let type: NavItem["type"] = "subject";
    if (parentDepth === 0) type = "module";
    if (parentDepth === 1) type = "topic";
    if (parentDepth !== null && parentDepth >= 2) type = "topic";

    const newNav: NavItem = {
      id: newId,
      title: newItem.title,
      englishTitle: newItem.englishTitle || undefined,
      href: `/library/${newId}`,
      type: type,
      children: [],
    };

    if (parentId) {
      // Add as sub-category
      const addAsChild = (items: NavItem[]): NavItem[] => {
        return items.map((item) => {
          if (item.id === parentId) {
            return {
              ...item,
              children: [...(item.children || []), newNav],
            };
          }
          if (item.children) {
            return { ...item, children: addAsChild(item.children) };
          }
          return item;
        });
      };
      updateCategories(addAsChild(categories));
    } else {
      // Add as main subject & department
      updateCategories([...categories, newNav]);
      updateDepartments([
        ...departments,
        {
          slug: slug,
          name: newItem.title,
          icon: "Activity", // Default icon
          articleCount: 0,
          pdfCount: 0,
          blurb: newItem.englishTitle || newItem.title,
        },
      ]);
    }

    setIsAddOpen(false);
    setNewItem({ title: "", englishTitle: "" });
    setParentId(null);
  };

  const deleteItem = (id: string) => {
    setIdToDelete(id);
  };

  const confirmDelete = () => {
    if (!idToDelete) return;

    const id = idToDelete;
    const filterItems = (items: NavItem[]): NavItem[] => {
      return items.filter((item) => {
        if (item.id === id) return false;
        if (item.children) {
          item.children = filterItems(item.children);
        }
        return true;
      });
    };

    const targetItem = categories.find((c) => c.id === id);
    updateCategories(filterItems([...categories]));
    if (targetItem && targetItem.type === "subject") {
      const slug = targetItem.title.toLowerCase().replace(/\s+/g, "-");
      updateDepartments(departments.filter((d) => d.slug !== slug));
    }
    setIdToDelete(null);
  };

  const renderItem = (item: NavItem, depth: number = 0) => {
    const hasChildren = item.children && item.children.length > 0;
    const isExpanded = expanded[item.id];

    return (
      <div key={item.id} className="space-y-1">
        <div
          className={`flex items-center gap-2 rounded-md border p-2 transition-colors hover:bg-muted/50 ${
            depth === 0 ? "bg-muted/20 font-semibold" : "bg-background"
          }`}
          style={{ marginLeft: `${depth * 20}px` }}
        >
          <Button
            variant="ghost"
            size="icon"
            className="h-6 w-6"
            onClick={() => toggleExpand(item.id)}
          >
            {hasChildren ? (
              isExpanded ? (
                <ChevronDown size={14} />
              ) : (
                <ChevronRight size={14} />
              )
            ) : (
              <div className="w-3.5" />
            )}
          </Button>

          <div className="flex flex-1 items-center gap-3">
            {item.type === "article" ? (
              <FileText size={16} className="text-muted-foreground" />
            ) : (
              <Folder size={16} className="text-primary" />
            )}
            <div className="flex flex-col">
              <span className="text-sm">{item.title}</span>
              {item.englishTitle && (
                <span className="text-[10px] text-muted-foreground">{item.englishTitle}</span>
              )}
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Badge variant="outline" className="text-[10px] capitalize">
              {item.type}
            </Badge>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="h-7 w-7">
                  <MoreVertical size={14} />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem
                  className="gap-2"
                  onClick={() => {
                    setParentId(item.id);
                    setIsAddOpen(true);
                  }}
                >
                  <Plus size={14} />
                  Quyi kategoriya qo'shish
                </DropdownMenuItem>
                <DropdownMenuItem className="gap-2" onClick={() => deleteItem(item.id)}>
                  <Trash2 size={14} className="text-destructive" />
                  O'chirish
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>

        {isExpanded && hasChildren && (
          <div className="space-y-1">
            {item.children!.map((child) => renderItem(child, depth + 1))}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg font-semibold">Ierarxiya boshqaruvi</h2>
          <p className="text-sm text-muted-foreground">
            Kutubxona tuzilmasini boshqaring (Sohalar, Modullar, Mavzular)
          </p>
        </div>
        <Button
          size="sm"
          className="gap-2"
          onClick={() => {
            setParentId(null);
            setIsAddOpen(true);
          }}
        >
          <Plus size={16} />
          Asosiy fan qo'shish
        </Button>
      </div>

      <Card>
        <CardContent className="p-6">
          <div className="space-y-2">{categories.map((item) => renderItem(item))}</div>
        </CardContent>
      </Card>

      <div className="rounded-lg bg-blue-50 p-4 text-sm text-blue-700">
        <strong>Eslatma:</strong> Kategoriyalar ierarxiyasi saytning asosiy navigatsiyasiga ta'sir
        qiladi. Artikullarni to'g'ri mavzularga bog'laganingizga amin bo'ling.
      </div>

      <Dialog open={isAddOpen} onOpenChange={setIsAddOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {parentId ? "Yangi quyi kategoriya qo'shish" : "Yangi asosiy fan qo'shish"}
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Nomi (Uzbek)</label>
              <Input
                value={newItem.title}
                onChange={(e) => setNewItem({ ...newItem, title: e.target.value })}
                placeholder="Masalan: Anatomiya"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Nomi (English - ixtiyoriy)</label>
              <Input
                value={newItem.englishTitle}
                onChange={(e) => setNewItem({ ...newItem, englishTitle: e.target.value })}
                placeholder="Masalan: Anatomy"
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsAddOpen(false)}>
              Bekor qilish
            </Button>
            <Button onClick={handleAddItem}>Qo'shish</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      <AlertDialog open={!!idToDelete} onOpenChange={(open) => !open && setIdToDelete(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Kategoriyani o'chirish</AlertDialogTitle>
            <AlertDialogDescription>
              Haqiqatan ham ushbu kategoriyani o'chirmoqchimisiz? Bu kategoriya ostidagi barcha quyi bo'limlar ham o'chib ketishi mumkin.
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
