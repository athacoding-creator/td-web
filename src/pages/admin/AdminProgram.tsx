import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import AdminLayout from "@/components/admin/AdminLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Plus, Pencil, Trash2, Upload, X, Image as ImageIcon } from "lucide-react";

interface Program {
  id: string;
  title: string;
  subtitle: string | null;
  description: string;
  category: string;
  logo_url: string | null;
  images: string[];
  is_active: boolean;
  display_order: number;
}

const AdminProgram = () => {
  const [programs, setPrograms] = useState<Program[]>([]);
  const [loading, setLoading] = useState(true);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingProgram, setEditingProgram] = useState<Program | null>(null);
  const [uploading, setUploading] = useState(false);
  
  const [formData, setFormData] = useState({
    title: "",
    subtitle: "",
    description: "",
    category: "",
    logo_url: "",
    images: [] as string[],
    is_active: true,
    display_order: 0,
  });

  useEffect(() => {
    fetchPrograms();
  }, []);

  const fetchPrograms = async () => {
    try {
      const { data, error } = await supabase
        .from("programs")
        .select("*")
        .order("display_order");
      
      if (error) throw error;
      setPrograms(data || []);
    } catch (error) {
      console.error("Error fetching programs:", error);
      toast.error("Gagal memuat data program");
    } finally {
      setLoading(false);
    }
  };

  const handleUploadLogo = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    try {
      const fileExt = file.name.split(".").pop();
      const fileName = `programs/logo-${Date.now()}.${fileExt}`;
      
      const { error: uploadError } = await supabase.storage
        .from("media")
        .upload(fileName, file);

      if (uploadError) throw uploadError;

      const { data: { publicUrl } } = supabase.storage
        .from("media")
        .getPublicUrl(fileName);

      setFormData({ ...formData, logo_url: publicUrl });
      toast.success("Logo berhasil diupload");
    } catch (error) {
      console.error("Error uploading logo:", error);
      toast.error("Gagal upload logo");
    } finally {
      setUploading(false);
    }
  };

  const handleUploadImage = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    try {
      const fileExt = file.name.split(".").pop();
      const fileName = `programs/image-${Date.now()}.${fileExt}`;
      
      const { error: uploadError } = await supabase.storage
        .from("media")
        .upload(fileName, file);

      if (uploadError) throw uploadError;

      const { data: { publicUrl } } = supabase.storage
        .from("media")
        .getPublicUrl(fileName);

      setFormData({ 
        ...formData, 
        images: [...formData.images, publicUrl] 
      });
      toast.success("Gambar berhasil diupload");
    } catch (error) {
      console.error("Error uploading image:", error);
      toast.error("Gagal upload gambar");
    } finally {
      setUploading(false);
    }
  };

  const removeImage = (index: number) => {
    setFormData({
      ...formData,
      images: formData.images.filter((_, i) => i !== index)
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      if (editingProgram) {
        const { error } = await supabase
          .from("programs")
          .update(formData)
          .eq("id", editingProgram.id);
        
        if (error) throw error;
        toast.success("Program berhasil diupdate");
      } else {
        const { error } = await supabase
          .from("programs")
          .insert([formData]);
        
        if (error) throw error;
        toast.success("Program berhasil ditambahkan");
      }

      setIsDialogOpen(false);
      resetForm();
      fetchPrograms();
    } catch (error) {
      console.error("Error saving program:", error);
      toast.error("Gagal menyimpan program");
    }
  };

  const handleEdit = (program: Program) => {
    setEditingProgram(program);
    setFormData({
      title: program.title,
      subtitle: program.subtitle || "",
      description: program.description,
      category: program.category,
      logo_url: program.logo_url || "",
      images: program.images || [],
      is_active: program.is_active,
      display_order: program.display_order,
    });
    setIsDialogOpen(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Yakin ingin menghapus program ini?")) return;

    try {
      const { error } = await supabase
        .from("programs")
        .delete()
        .eq("id", id);
      
      if (error) throw error;
      toast.success("Program berhasil dihapus");
      fetchPrograms();
    } catch (error) {
      console.error("Error deleting program:", error);
      toast.error("Gagal menghapus program");
    }
  };

  const resetForm = () => {
    setEditingProgram(null);
    setFormData({
      title: "",
      subtitle: "",
      description: "",
      category: "",
      logo_url: "",
      images: [],
      is_active: true,
      display_order: 0,
    });
  };

  return (
    <AdminLayout 
      title="Kelola Program" 
      description="Tambah, edit, dan hapus program unggulan"
    >
      <div className="flex justify-end mb-6">
        <Dialog open={isDialogOpen} onOpenChange={(open) => {
          setIsDialogOpen(open);
          if (!open) resetForm();
        }}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="w-4 h-4 mr-2" />
              Tambah Program
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>
                {editingProgram ? "Edit Program" : "Tambah Program Baru"}
              </DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="title">Judul Program *</Label>
                <Input
                  id="title"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="subtitle">Subtitle</Label>
                <Input
                  id="subtitle"
                  value={formData.subtitle}
                  onChange={(e) => setFormData({ ...formData, subtitle: e.target.value })}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="category">Kategori *</Label>
                <Input
                  id="category"
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  placeholder="Contoh: Dakwah, Sosial, Pendidikan"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Deskripsi *</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  rows={4}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label>Logo Program</Label>
                <div className="flex items-center gap-4">
                  {formData.logo_url && (
                    <img 
                      src={formData.logo_url} 
                      alt="Logo preview" 
                      className="w-20 h-20 object-contain rounded border"
                    />
                  )}
                  <label className="cursor-pointer">
                    <div className="flex items-center gap-2 px-4 py-2 bg-secondary rounded-md hover:bg-secondary/80">
                      <Upload className="w-4 h-4" />
                      <span>{uploading ? "Uploading..." : "Upload Logo"}</span>
                    </div>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleUploadLogo}
                      className="hidden"
                      disabled={uploading}
                    />
                  </label>
                </div>
              </div>

              <div className="space-y-2">
                <Label>Gambar Dokumentasi</Label>
                <div className="grid grid-cols-3 gap-4">
                  {formData.images.map((img, index) => (
                    <div key={index} className="relative">
                      <img 
                        src={img} 
                        alt={`Image ${index + 1}`} 
                        className="w-full h-24 object-cover rounded border"
                      />
                      <button
                        type="button"
                        onClick={() => removeImage(index)}
                        className="absolute -top-2 -right-2 p-1 bg-destructive text-destructive-foreground rounded-full"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </div>
                  ))}
                  <label className="cursor-pointer border-2 border-dashed rounded flex items-center justify-center h-24 hover:border-primary">
                    <div className="text-center">
                      <ImageIcon className="w-6 h-6 mx-auto text-muted-foreground" />
                      <span className="text-xs text-muted-foreground">Tambah</span>
                    </div>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleUploadImage}
                      className="hidden"
                      disabled={uploading}
                    />
                  </label>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="display_order">Urutan Tampil</Label>
                  <Input
                    id="display_order"
                    type="number"
                    value={formData.display_order}
                    onChange={(e) => setFormData({ ...formData, display_order: parseInt(e.target.value) || 0 })}
                  />
                </div>
                <div className="space-y-2">
                  <Label>Status</Label>
                  <div className="flex items-center gap-2 pt-2">
                    <input
                      type="checkbox"
                      checked={formData.is_active}
                      onChange={(e) => setFormData({ ...formData, is_active: e.target.checked })}
                      className="w-4 h-4"
                    />
                    <span>Aktif</span>
                  </div>
                </div>
              </div>

              <div className="flex gap-3 pt-4">
                <Button type="submit" className="flex-1">
                  {editingProgram ? "Update" : "Simpan"}
                </Button>
                <Button 
                  type="button" 
                  variant="outline" 
                  onClick={() => {
                    setIsDialogOpen(false);
                    resetForm();
                  }}
                >
                  Batal
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {loading ? (
        <div className="text-center py-8 text-muted-foreground">Memuat data...</div>
      ) : programs.length === 0 ? (
        <div className="text-center py-8 text-muted-foreground">
          Belum ada program. Klik "Tambah Program" untuk menambahkan.
        </div>
      ) : (
        <div className="bg-card rounded-lg border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-16">Logo</TableHead>
                <TableHead>Judul</TableHead>
                <TableHead>Kategori</TableHead>
                <TableHead className="w-20">Status</TableHead>
                <TableHead className="w-32">Aksi</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {programs.map((program) => (
                <TableRow key={program.id}>
                  <TableCell>
                    {program.logo_url ? (
                      <img 
                        src={program.logo_url} 
                        alt={program.title} 
                        className="w-12 h-12 object-contain rounded"
                      />
                    ) : (
                      <div className="w-12 h-12 bg-muted rounded flex items-center justify-center">
                        <ImageIcon className="w-6 h-6 text-muted-foreground" />
                      </div>
                    )}
                  </TableCell>
                  <TableCell>
                    <div className="font-medium">{program.title}</div>
                    {program.subtitle && (
                      <div className="text-sm text-muted-foreground">{program.subtitle}</div>
                    )}
                  </TableCell>
                  <TableCell>{program.category}</TableCell>
                  <TableCell>
                    <span className={`px-2 py-1 rounded text-xs ${
                      program.is_active 
                        ? "bg-green-100 text-green-700" 
                        : "bg-gray-100 text-gray-700"
                    }`}>
                      {program.is_active ? "Aktif" : "Nonaktif"}
                    </span>
                  </TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      <Button 
                        variant="ghost" 
                        size="icon"
                        onClick={() => handleEdit(program)}
                      >
                        <Pencil className="w-4 h-4" />
                      </Button>
                      <Button 
                        variant="ghost" 
                        size="icon"
                        onClick={() => handleDelete(program.id)}
                      >
                        <Trash2 className="w-4 h-4 text-destructive" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}
    </AdminLayout>
  );
};

export default AdminProgram;