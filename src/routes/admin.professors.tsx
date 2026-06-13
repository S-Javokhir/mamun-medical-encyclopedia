import { useState } from "react";
import { Plus, Search, MoreVertical, Edit, Trash2, Users, X, Save } from "lucide-react";
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
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../components/ui/dialog";
import { Label } from "../components/ui/label";
import { Textarea } from "../components/ui/textarea";
import { Badge } from "../components/ui/badge";
import { Professor } from "../data/library";

export default function AdminProfessors() {
  const { professors, addProfessor, updateProfessor, deleteProfessor, departments } = useLibrary();
  const [searchTerm, setSearchTerm] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProfessor, setEditingProfessor] = useState<Professor | null>(null);

  // Form state
  const [formData, setFormData] = useState<Partial<Professor>>({
    fullName: "",
    title: "",
    department: "",
    avatar: "",
    bio: "",
    quote: "",
    researchInterests: [],
    credentials: [],
  });

  const [interestInput, setInterestInput] = useState("");
  const [credentialInput, setCredentialInput] = useState("");

  const handleOpenModal = (prof?: Professor) => {
    if (prof) {
      setEditingProfessor(prof);
      setFormData(prof);
    } else {
      setEditingProfessor(null);
      setFormData({
        fullName: "",
        title: "",
        department: "",
        avatar: `https://i.pravatar.cc/240?img=${Math.floor(Math.random() * 70)}`,
        bio: "",
        quote: "",
        researchInterests: [],
        credentials: [],
      });
    }
    setIsModalOpen(true);
  };

  const handleSave = () => {
    if (!formData.fullName || !formData.department) return;

    if (editingProfessor) {
      updateProfessor({ ...formData, id: editingProfessor.id } as Professor);
    } else {
      const newProf: Professor = {
        ...formData,
        id: formData.fullName.toLowerCase().replace(/\s+/g, "-"),
      } as Professor;
      addProfessor(newProf);
    }
    setIsModalOpen(false);
  };

  const filteredProfessors = professors.filter((p) =>
    p.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    p.department.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="relative w-full max-w-sm">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Professorlarni qidirish..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        <Button onClick={() => handleOpenModal()} size="sm" className="gap-2">
          <Plus size={16} />
          Yangi professor
        </Button>
      </div>

      <div className="rounded-md border bg-background">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Professor</TableHead>
              <TableHead>Bo'lim</TableHead>
              <TableHead>Ma'lumoti</TableHead>
              <TableHead className="w-[80px] text-right">Amallar</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredProfessors.map((prof) => (
              <TableRow key={prof.id}>
                <TableCell>
                  <div className="flex items-center gap-3">
                    <img
                      src={prof.avatar}
                      alt={prof.fullName}
                      className="h-10 w-10 rounded-full object-cover border"
                    />
                    <div>
                      <div className="font-medium">{prof.fullName}</div>
                      <div className="text-xs text-muted-foreground">{prof.title}</div>
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  <Badge variant="secondary">{prof.department}</Badge>
                </TableCell>
                <TableCell className="max-w-[300px]">
                  <div className="text-sm truncate text-muted-foreground">
                    {prof.bio}
                  </div>
                </TableCell>
                <TableCell className="text-right">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon">
                        <MoreVertical size={16} />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem className="gap-2 cursor-pointer" onClick={() => handleOpenModal(prof)}>
                        <Edit size={14} />
                        Tahrirlash
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        className="gap-2 cursor-pointer text-destructive focus:text-destructive"
                        onClick={() => deleteProfessor(prof.id)}
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

      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>
              {editingProfessor ? "Muallifni tahrirlash" : "Yangi muallif qo'shish"}
            </DialogTitle>
            <DialogDescription>
              Muallif haqidagi barcha malumotlarni kiriting.
            </DialogDescription>
          </DialogHeader>

          <div className="grid gap-6 py-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="fullName">To'liq ismi</Label>
                <Input
                  id="fullName"
                  value={formData.fullName}
                  onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                  placeholder="Masalan: Baxtiyor Alimov"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="title">Unvoni</Label>
                <Input
                  id="title"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  placeholder="Masalan: Prof. Dr. Alimov"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="department">Bo'lim</Label>
                <select
                  id="department"
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  value={formData.department}
                  onChange={(e) => setFormData({ ...formData, department: e.target.value })}
                >
                  <option value="">Tanlang</option>
                  {departments.map((d) => (
                    <option key={d.slug} value={d.name}>
                      {d.name}
                    </option>
                  ))}
                </select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="avatar">Avatar URL</Label>
                <Input
                  id="avatar"
                  value={formData.avatar}
                  onChange={(e) => setFormData({ ...formData, avatar: e.target.value })}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="bio">Biografiya</Label>
              <Textarea
                id="bio"
                value={formData.bio}
                onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                placeholder="Muallif haqida qisqacha..."
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="quote">Iqtibos (Quote)</Label>
              <Input
                id="quote"
                value={formData.quote}
                onChange={(e) => setFormData({ ...formData, quote: e.target.value })}
                placeholder="Muallifning fikri yoki iqtibosi..."
              />
            </div>

            <div className="space-y-2">
              <Label>Ilmiy qiziqishlar</Label>
              <div className="flex gap-2 mb-2">
                <Input
                  value={interestInput}
                  onChange={(e) => setInterestInput(e.target.value)}
                  placeholder="Yangi qiziqish..."
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault();
                      if (interestInput.trim()) {
                        setFormData({
                          ...formData,
                          researchInterests: [...(formData.researchInterests || []), interestInput.trim()],
                        });
                        setInterestInput("");
                      }
                    }
                  }}
                />
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => {
                    if (interestInput.trim()) {
                      setFormData({
                        ...formData,
                        researchInterests: [...(formData.researchInterests || []), interestInput.trim()],
                      });
                      setInterestInput("");
                    }
                  }}
                >
                  Qo'shish
                </Button>
              </div>
              <div className="flex flex-wrap gap-2">
                {formData.researchInterests?.map((item, idx) => (
                  <Badge key={idx} variant="secondary" className="gap-1 px-2 py-1">
                    {item}
                    <X
                      size={12}
                      className="cursor-pointer hover:text-destructive"
                      onClick={() =>
                        setFormData({
                          ...formData,
                          researchInterests: formData.researchInterests?.filter((_, i) => i !== idx),
                        })
                      }
                    />
                  </Badge>
                ))}
              </div>
            </div>

            <div className="space-y-2">
              <Label>Darajalar va Sertifikatlar</Label>
              <div className="flex gap-2 mb-2">
                <Input
                  value={credentialInput}
                  onChange={(e) => setCredentialInput(e.target.value)}
                  placeholder="Yangi daraja..."
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault();
                      if (credentialInput.trim()) {
                        setFormData({
                          ...formData,
                          credentials: [...(formData.credentials || []), credentialInput.trim()],
                        });
                        setCredentialInput("");
                      }
                    }
                  }}
                />
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => {
                    if (credentialInput.trim()) {
                      setFormData({
                        ...formData,
                        credentials: [...(formData.credentials || []), credentialInput.trim()],
                      });
                      setCredentialInput("");
                    }
                  }}
                >
                  Qo'shish
                </Button>
              </div>
              <div className="flex flex-wrap gap-2">
                {formData.credentials?.map((item, idx) => (
                  <Badge key={idx} variant="secondary" className="gap-1 px-2 py-1">
                    {item}
                    <X
                      size={12}
                      className="cursor-pointer hover:text-destructive"
                      onClick={() =>
                        setFormData({
                          ...formData,
                          credentials: formData.credentials?.filter((_, i) => i !== idx),
                        })
                      }
                    />
                  </Badge>
                ))}
              </div>
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setIsModalOpen(false)}>
              Bekor qilish
            </Button>
            <Button onClick={handleSave} className="gap-2">
              <Save size={16} />
              Saqlash
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
