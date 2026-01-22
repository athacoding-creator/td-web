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
import { Plus, Pencil, Trash2, Upload, Image as ImageIcon, Eye } from "lucide-react";
import { format } from "date-fns";
import { useLogActivity } from "@/hooks/useActivityLogs";

interface Article {
  id: string;
  slug: string;
  title: string;
  excerpt: string | null;
  content: string;
  category: string | null;
  image_url: string | null;
  author: string;
  is_published: boolean;
  published_at: string | null;
  created_at: string;
  meta_title: string | null;
  meta_description: string | null;
  meta_keywords: string | null;
}

const AdminArtikel = () => {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingArticle, setEditingArticle] = useState<Article | null>(null);
  const [uploading, setUploading] = useState(false);
  const logActivity = useLogActivity();
  
  const [formData, setFormData] = useState({
    title: "",
    slug: "",
    excerpt: "",
    content: "",
    category: "",
    image_url: "",
    author: "Trsdkwh",
    is_published: false,
    meta_title: "",
    meta_description: "",
    meta_keywords: "",
  });

  useEffect(() => {
    fetchArticles();
  }, []);

  const fetchArticles = async () => {
    try {
      const { data, error } = await supabase
        .from("articles")
        .select("*")
        .order("created_at", { ascending: false });
      
      if (error) throw error;
      setArticles(data || []);
    } catch (error) {
      console.error("Error fetching articles:", error);
      toast.error("Gagal memuat data artikel");
    } finally {
      setLoading(false);
    }
  };

  const generateSlug = (title: string) => {
    return title
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, "")
      .replace(/\s+/g, "-")
      .replace(/-+/g, "-");
  };

  const handleUploadImage = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    try {
      const fileExt = file.name.split(".").pop();
      const fileName = `articles/image-${Date.now()}.${fileExt}`;
      
      const { error: uploadError } = await supabase.storage
        .from("media")
        .upload(fileName, file);

      if (uploadError) throw uploadError;

      const { data: { publicUrl } } = supabase.storage
        .from("media")
        .getPublicUrl(fileName);

      setFormData({ ...formData, image_url: publicUrl });
      toast.success("Gambar berhasil diupload");
    } catch (error) {
      console.error("Error uploading image:", error);
      toast.error("Gagal upload gambar");
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const dataToSave = {
      ...formData,
      slug: formData.slug || generateSlug(formData.title),
      published_at: formData.is_published ? new Date().toISOString() : null,
    };

    try {
      if (editingArticle) {
        const { error } = await supabase
          .from("articles")
          .update(dataToSave)
          .eq("id", editingArticle.id);
        
        if (error) throw error;
        
        logActivity.mutate({
          action: "UPDATE",
          table_name: "articles",
          record_id: editingArticle.id,
          description: `Update artikel: ${formData.title}`,
        });
        
        toast.success("Artikel berhasil diupdate");
      } else {
        const { data, error } = await supabase
          .from("articles")
          .insert([dataToSave])
          .select()
          .single();
        
        if (error) throw error;
        
        logActivity.mutate({
          action: "CREATE",
          table_name: "articles",
          record_id: data?.id,
          description: `Tambah artikel: ${formData.title}`,
        });
        
        toast.success("Artikel berhasil ditambahkan");
      }

      setIsDialogOpen(false);
      resetForm();
      fetchArticles();
    } catch (error) {
      console.error("Error saving article:", error);
      toast.error("Gagal menyimpan artikel");
    }
  };

  const handleEdit = (article: Article) => {
    setEditingArticle(article);
    setFormData({
      title: article.title,
      slug: article.slug,
      excerpt: article.excerpt || "",
      content: article.content,
      category: article.category || "",
      image_url: article.image_url || "",
      author: article.author,
      is_published: article.is_published,
      meta_title: article.meta_title || "",
      meta_description: article.meta_description || "",
      meta_keywords: article.meta_keywords || "",
    });
    setIsDialogOpen(true);
  };

  const handleDelete = async (id: string, title: string) => {
    if (!confirm("Yakin ingin menghapus artikel ini?")) return;

    try {
      const { error } = await supabase
        .from("articles")
        .delete()
        .eq("id", id);
      
      if (error) throw error;
      
      logActivity.mutate({
        action: "DELETE",
        table_name: "articles",
        record_id: id,
        description: `Hapus artikel: ${title}`,
      });
      
      toast.success("Artikel berhasil dihapus");
      fetchArticles();
    } catch (error) {
      console.error("Error deleting article:", error);
      toast.error("Gagal menghapus artikel");
    }
  };

  const togglePublish = async (article: Article) => {
    try {
      const { error } = await supabase
        .from("articles")
        .update({ 
          is_published: !article.is_published,
          published_at: !article.is_published ? new Date().toISOString() : null
        })
        .eq("id", article.id);
      
      if (error) throw error;
      
      logActivity.mutate({
        action: "UPDATE",
        table_name: "articles",
        record_id: article.id,
        description: article.is_published 
          ? `Sembunyikan artikel: ${article.title}` 
          : `Publikasikan artikel: ${article.title}`,
      });
      
      toast.success(article.is_published ? "Artikel disembunyikan" : "Artikel dipublikasikan");
      fetchArticles();
    } catch (error) {
      console.error("Error toggling publish:", error);
      toast.error("Gagal mengubah status artikel");
    }
  };

  const resetForm = () => {
    setEditingArticle(null);
    setFormData({
      title: "",
      slug: "",
      excerpt: "",
      content: "",
      category: "",
      image_url: "",
      author: "Trsdkwh",
      is_published: false,
      meta_title: "",
      meta_description: "",
      meta_keywords: "",
    });
  };

  return (
    <AdminLayout 
      title="Kelola Artikel" 
      description="Tambah, edit, dan hapus artikel"
    >
      <div className="flex justify-end mb-6">
        <Dialog open={isDialogOpen} onOpenChange={(open) => {
          setIsDialogOpen(open);
          if (!open) resetForm();
        }}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="w-4 h-4 mr-2" />
              Tambah Artikel
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>
                {editingArticle ? "Edit Artikel" : "Tambah Artikel Baru"}
              </DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="title">Judul Artikel *</Label>
                <Input
                  id="title"
                  value={formData.title}
                  onChange={(e) => {
                    setFormData({ 
                      ...formData, 
                      title: e.target.value,
                      slug: generateSlug(e.target.value)
                    });
                  }}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="slug">Slug URL</Label>
                <Input
                  id="slug"
                  value={formData.slug}
                  onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                  placeholder="auto-generated-from-title"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="category">Kategori</Label>
                  <Input
                    id="category"
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    placeholder="Contoh: Kajian, Sosial"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="author">Penulis</Label>
                  <Input
                    id="author"
                    value={formData.author}
                    onChange={(e) => setFormData({ ...formData, author: e.target.value })}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="excerpt">Ringkasan</Label>
                <Textarea
                  id="excerpt"
                  value={formData.excerpt}
                  onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
                  rows={2}
                  placeholder="Ringkasan singkat artikel"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="content">Konten *</Label>
                <Textarea
                  id="content"
                  value={formData.content}
                  onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                  rows={10}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label>Gambar Cover</Label>
                <div className="flex items-center gap-4">
                  {formData.image_url && (
                    <img 
                      src={formData.image_url} 
                      alt="Preview" 
                      className="w-24 h-16 object-cover rounded border"
                    />
                  )}
                  <label className="cursor-pointer">
                    <div className="flex items-center gap-2 px-4 py-2 bg-secondary rounded-md hover:bg-secondary/80">
                      <Upload className="w-4 h-4" />
                      <span>{uploading ? "Uploading..." : "Upload Gambar"}</span>
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

              {/* SEO Section */}
              <div className="border-t pt-4 mt-4">
                <h3 className="text-sm font-semibold mb-3">SEO Settings (Opsional)</h3>
                <p className="text-xs text-muted-foreground mb-4">
                  Isi untuk optimasi pencarian Google. Jika kosong, akan menggunakan judul dan ringkasan artikel.
                </p>
                
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="meta_title">SEO Title (maks 60 karakter)</Label>
                    <Input
                      id="meta_title"
                      value={formData.meta_title}
                      onChange={(e) => setFormData({ ...formData, meta_title: e.target.value })}
                      placeholder="Judul yang muncul di hasil pencarian Google"
                      maxLength={60}
                    />
                    <span className="text-xs text-muted-foreground">{formData.meta_title.length}/60</span>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="meta_description">SEO Description (maks 160 karakter)</Label>
                    <Textarea
                      id="meta_description"
                      value={formData.meta_description}
                      onChange={(e) => setFormData({ ...formData, meta_description: e.target.value })}
                      placeholder="Deskripsi yang muncul di hasil pencarian Google"
                      rows={2}
                      maxLength={160}
                    />
                    <span className="text-xs text-muted-foreground">{formData.meta_description.length}/160</span>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="meta_keywords">SEO Keywords (pisahkan dengan koma)</Label>
                    <Input
                      id="meta_keywords"
                      value={formData.meta_keywords}
                      onChange={(e) => setFormData({ ...formData, meta_keywords: e.target.value })}
                      placeholder="sedekah, kebaikan, dakwah, islam"
                    />
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2 pt-2">
                <input
                  type="checkbox"
                  checked={formData.is_published}
                  onChange={(e) => setFormData({ ...formData, is_published: e.target.checked })}
                  className="w-4 h-4"
                />
                <span>Publikasikan artikel</span>
              </div>

              <div className="flex gap-3 pt-4">
                <Button type="submit" className="flex-1">
                  {editingArticle ? "Update" : "Simpan"}
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
      ) : articles.length === 0 ? (
        <div className="text-center py-8 text-muted-foreground">
          Belum ada artikel. Klik "Tambah Artikel" untuk menambahkan.
        </div>
      ) : (
        <div className="bg-card rounded-lg border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-16">Cover</TableHead>
                <TableHead>Judul</TableHead>
                <TableHead>Kategori</TableHead>
                <TableHead className="w-24">Tanggal</TableHead>
                <TableHead className="w-20">Status</TableHead>
                <TableHead className="w-32">Aksi</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {articles.map((article) => (
                <TableRow key={article.id}>
                  <TableCell>
                    {article.image_url ? (
                      <img 
                        src={article.image_url} 
                        alt={article.title} 
                        className="w-12 h-12 object-cover rounded"
                      />
                    ) : (
                      <div className="w-12 h-12 bg-muted rounded flex items-center justify-center">
                        <ImageIcon className="w-6 h-6 text-muted-foreground" />
                      </div>
                    )}
                  </TableCell>
                  <TableCell>
                    <div className="font-medium">{article.title}</div>
                    <div className="text-xs text-muted-foreground">/{article.slug}</div>
                  </TableCell>
                  <TableCell>{article.category || "-"}</TableCell>
                  <TableCell className="text-sm text-muted-foreground">
                    {format(new Date(article.created_at), "dd/MM/yyyy")}
                  </TableCell>
                  <TableCell>
                    <span className={`px-2 py-1 rounded text-xs ${
                      article.is_published 
                        ? "bg-green-100 text-green-700" 
                        : "bg-yellow-100 text-yellow-700"
                    }`}>
                      {article.is_published ? "Published" : "Draft"}
                    </span>
                  </TableCell>
                  <TableCell>
                    <div className="flex gap-1">
                      <Button 
                        variant="ghost" 
                        size="icon"
                        onClick={() => togglePublish(article)}
                        title={article.is_published ? "Sembunyikan" : "Publikasikan"}
                      >
                        <Eye className={`w-4 h-4 ${article.is_published ? "text-green-600" : "text-muted-foreground"}`} />
                      </Button>
                      <Button 
                        variant="ghost" 
                        size="icon"
                        onClick={() => handleEdit(article)}
                      >
                        <Pencil className="w-4 h-4" />
                      </Button>
                      <Button 
                        variant="ghost" 
                        size="icon"
                        onClick={() => handleDelete(article.id, article.title)}
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

export default AdminArtikel;