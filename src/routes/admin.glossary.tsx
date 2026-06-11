import { useState } from "react";
import { Plus, Search, MoreVertical, Edit, Trash2, Book, X, Save } from "lucide-react";
import { GlossaryTerm } from "../data/library";
import { useLibrary } from "../hooks/useLibrary";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Textarea } from "../components/ui/textarea";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "../components/ui/dialog";
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

export default function AdminGlossary() {
  const { glossary, addGlossaryTerm, updateGlossaryTerm, deleteGlossaryTerm } = useLibrary();
  const [searchTerm, setSearchTerm] = useState("");
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [editingTerm, setEditingTerm] = useState<GlossaryTerm | null>(null);
  const [oldTermName, setOldTermName] = useState("");
  const [termToDelete, setTermToDelete] = useState<string | null>(null);

  const [newTerm, setNewTerm] = useState<GlossaryTerm>({
    term: "",
    definition: "",
    category: "",
  });

  const filteredTerms = glossary.filter(
    (t) =>
      t.term.toLowerCase().includes(searchTerm.toLowerCase()) ||
      t.category.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  const handleAddTerm = () => {
    if (!newTerm.term || !newTerm.definition) return;
    addGlossaryTerm(newTerm);
    setIsAddOpen(false);
    setNewTerm({ term: "", definition: "", category: "" });
  };

  const handleEditClick = (term: GlossaryTerm) => {
    setEditingTerm({ ...term });
    setOldTermName(term.term);
    setIsEditOpen(true);
  };

  const handleUpdateTerm = () => {
    if (editingTerm && oldTermName) {
      updateGlossaryTerm(oldTermName, editingTerm);
      setIsEditOpen(false);
      setEditingTerm(null);
    }
  };

  const handleDeleteClick = (termName: string) => {
    setTermToDelete(termName);
  };

  const confirmDelete = () => {
    if (termToDelete) {
      deleteGlossaryTerm(termToDelete);
      setTermToDelete(null);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="relative w-full max-w-sm">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Terminlarni qidirish..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>

        <Dialog open={isAddOpen} onOpenChange={setIsAddOpen}>
          <DialogTrigger asChild>
            <Button size="sm" className="gap-2">
              <Plus size={16} />
              Yangi termin
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Yangi lug'at termini</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Termin nomi</label>
                <Input
                  value={newTerm.term}
                  onChange={(e) => setNewTerm({ ...newTerm, term: e.target.value })}
                  placeholder="Masalan: Anatomiya"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Kategoriya</label>
                <Input
                  value={newTerm.category}
                  onChange={(e) => setNewTerm({ ...newTerm, category: e.target.value })}
                  placeholder="Masalan: Umumiy tibbiyot"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Ta'rif (Definition)</label>
                <Textarea
                  value={newTerm.definition}
                  onChange={(e) => setNewTerm({ ...newTerm, definition: e.target.value })}
                  placeholder="Termin haqida batafsil ma'lumot..."
                  rows={4}
                />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsAddOpen(false)}>
                Bekor qilish
              </Button>
              <Button onClick={handleAddTerm}>Saqlash</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      {/* Edit Dialog */}
      <Dialog open={isEditOpen} onOpenChange={setIsEditOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Terminni tahrirlash</DialogTitle>
          </DialogHeader>
          {editingTerm && (
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Termin nomi</label>
                <Input
                  value={editingTerm.term}
                  onChange={(e) => setEditingTerm({ ...editingTerm, term: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Kategoriya</label>
                <Input
                  value={editingTerm.category}
                  onChange={(e) => setEditingTerm({ ...editingTerm, category: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Ta'rif (Definition)</label>
                <Textarea
                  value={editingTerm.definition}
                  onChange={(e) => setEditingTerm({ ...editingTerm, definition: e.target.value })}
                  rows={4}
                />
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsEditOpen(false)}>
              Bekor qilish
            </Button>
            <Button onClick={handleUpdateTerm}>Yangilash</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <div className="rounded-md border bg-background">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Termin</TableHead>
              <TableHead>Kategoriya</TableHead>
              <TableHead>Ta'rif</TableHead>
              <TableHead className="w-[80px] text-right">Amallar</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredTerms.map((term, idx) => (
              <TableRow key={idx}>
                <TableCell className="font-medium text-teal-700">{term.term}</TableCell>
                <TableCell>
                  <Badge variant="outline" className="bg-teal-50 text-teal-700 border-teal-200">
                    {term.category}
                  </Badge>
                </TableCell>
                <TableCell className="max-w-md truncate text-muted-foreground italic">
                  {term.definition}
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end gap-1">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 hover:text-teal-600 hover:bg-teal-50"
                      onClick={() => handleEditClick(term)}
                    >
                      <Edit size={14} />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 text-destructive hover:bg-red-50"
                      onClick={() => handleDeleteClick(term.term)}
                    >
                      <Trash2 size={14} />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      <AlertDialog open={!!termToDelete} onOpenChange={(open) => !open && setTermToDelete(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Terminni o'chirish</AlertDialogTitle>
            <AlertDialogDescription>
              Haqiqatan ham "{termToDelete}" terminini o'chirmoqchimisiz? Bu amalni ortga qaytarib bo'lmaydi.
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
