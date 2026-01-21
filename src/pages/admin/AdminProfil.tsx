import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import AdminLayout from "@/components/admin/AdminLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Upload, Save } from "lucide-react";

interface ProfilSection {
  id: string;
  section_key: string;
  title: string | null;
  content: string | null;
  image_url: string | null;
}

const defaultSections = [
  { key: "sejarah", title: "Sejarah", description: "Sejarah berdirinya Teras Dakwah" },
  { key: "visi", title: "Visi", description: "Visi organisasi" },
  { key: "misi", title: "Misi", description: "Misi organisasi" },
  { key: "nilai_ikhlas", title: "Nilai: Ikhlas", description: "Nilai-nilai organisasi - Ikhlas" },
  { key: "nilai_ilmu", title: "Nilai: Ilmu", description: "Nilai-nilai organisasi - Ilmu" },
  { key: "nilai_ukhuwah", title: "Nilai: Ukhuwah", description: "Nilai-nilai organisasi - Ukhuwah" },
];

const AdminProfil = () => {
  const [sections, setSections] = useState<ProfilSection[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState<string | null>(null);
  const [uploading, setUploading] = useState<string | null>(null);
  const [formData, setFormData] = useState<Record<string, { title: string; content: string; image_url: string }>>({});

  useEffect(() => {
    fetchSections();
  }, []);

  const fetchSections = async () => {
    try {
      const { data, error } = await supabase
        .from("profil_td")
        .select("*");
      
      if (error) throw error;
      
      // Initialize form data with existing or default values
      const initialFormData: Record<string, { title: string; content: string; image_url: string }> = {};
      
      defaultSections.forEach(section => {
        const existing = data?.find(d => d.section_key === section.key);
        initialFormData[section.key] = {
          title: existing?.title || section.title,
          content: existing?.content || "",
          image_url: existing?.image_url || "",
        };
      });

      setFormData(initialFormData);
      setSections(data || []);
    } catch (error) {
      console.error("Error fetching sections:", error);
      toast.error("Gagal memuat data profil");
    } finally {
      setLoading(false);
    }
  };

  const handleUploadImage = async (sectionKey: string, e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(sectionKey);
    try {
      const fileExt = file.name.split(".").pop();
      const fileName = `profil/${sectionKey}-${Date.now()}.${fileExt}`;
      
      const { error: uploadError } = await supabase.storage
        .from("media")
        .upload(fileName, file);

      if (uploadError) throw uploadError;

      const { data: { publicUrl } } = supabase.storage
        .from("media")
        .getPublicUrl(fileName);

      setFormData({
        ...formData,
        [sectionKey]: { ...formData[sectionKey], image_url: publicUrl }
      });
      toast.success("Gambar berhasil diupload");
    } catch (error) {
      console.error("Error uploading image:", error);
      toast.error("Gagal upload gambar");
    } finally {
      setUploading(null);
    }
  };

  const handleSave = async (sectionKey: string) => {
    setSaving(sectionKey);
    
    const sectionData = formData[sectionKey];
    const existingSection = sections.find(s => s.section_key === sectionKey);

    try {
      if (existingSection) {
        const { error } = await supabase
          .from("profil_td")
          .update({
            title: sectionData.title,
            content: sectionData.content,
            image_url: sectionData.image_url,
          })
          .eq("id", existingSection.id);
        
        if (error) throw error;
      } else {
        const { error } = await supabase
          .from("profil_td")
          .insert([{
            section_key: sectionKey,
            title: sectionData.title,
            content: sectionData.content,
            image_url: sectionData.image_url,
          }]);
        
        if (error) throw error;
      }

      toast.success("Berhasil disimpan");
      fetchSections();
    } catch (error) {
      console.error("Error saving section:", error);
      toast.error("Gagal menyimpan data");
    } finally {
      setSaving(null);
    }
  };

  const updateFormData = (sectionKey: string, field: string, value: string) => {
    setFormData({
      ...formData,
      [sectionKey]: { ...formData[sectionKey], [field]: value }
    });
  };

  if (loading) {
    return (
      <AdminLayout title="Kelola Profil TD" description="Edit informasi profil Teras Dakwah">
        <div className="text-center py-8 text-muted-foreground">Memuat data...</div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout 
      title="Kelola Profil TD" 
      description="Edit informasi profil Teras Dakwah"
    >
      <div className="space-y-6">
        {defaultSections.map((section) => (
          <Card key={section.key}>
            <CardHeader>
              <CardTitle>{section.title}</CardTitle>
              <CardDescription>{section.description}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>Judul</Label>
                <Input
                  value={formData[section.key]?.title || ""}
                  onChange={(e) => updateFormData(section.key, "title", e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label>Konten</Label>
                <Textarea
                  value={formData[section.key]?.content || ""}
                  onChange={(e) => updateFormData(section.key, "content", e.target.value)}
                  rows={4}
                />
              </div>

              <div className="space-y-2">
                <Label>Gambar</Label>
                <div className="flex items-center gap-4">
                  {formData[section.key]?.image_url && (
                    <img 
                      src={formData[section.key].image_url} 
                      alt={section.title} 
                      className="w-24 h-16 object-cover rounded border"
                    />
                  )}
                  <label className="cursor-pointer">
                    <div className="flex items-center gap-2 px-4 py-2 bg-secondary rounded-md hover:bg-secondary/80">
                      <Upload className="w-4 h-4" />
                      <span>{uploading === section.key ? "Uploading..." : "Upload Gambar"}</span>
                    </div>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => handleUploadImage(section.key, e)}
                      className="hidden"
                      disabled={uploading === section.key}
                    />
                  </label>
                </div>
              </div>

              <div className="pt-2">
                <Button 
                  onClick={() => handleSave(section.key)}
                  disabled={saving === section.key}
                >
                  <Save className="w-4 h-4 mr-2" />
                  {saving === section.key ? "Menyimpan..." : "Simpan"}
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </AdminLayout>
  );
};

export default AdminProfil;