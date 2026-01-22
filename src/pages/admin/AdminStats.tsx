import { useState } from "react";
import AdminLayout from "@/components/admin/AdminLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useStats, useCreateStat, useUpdateStat, useDeleteStat, type Stat } from "@/hooks/useStats";
import { useStatsConfig, useUpdateStatsConfig } from "@/hooks/useStatsConfig";
import { Pencil, Trash2, Plus, Save } from "lucide-react";
import { Switch } from "@/components/ui/switch";

const AdminStats = () => {
  const { data: stats, isLoading } = useStats();
  const { data: statsConfig, isLoading: configLoading } = useStatsConfig();
  const updateStatsConfig = useUpdateStatsConfig();
  const createStat = useCreateStat();
  const updateStat = useUpdateStat();
  const deleteStat = useDeleteStat();

  const [sectionTitle, setSectionTitle] = useState("");
  const [isTitleEditing, setIsTitleEditing] = useState(false);

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [selectedStat, setSelectedStat] = useState<Stat | null>(null);
  const [statToDelete, setStatToDelete] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    title: "",
    value: 0,
    label: "",
    display_order: 0,
    is_active: true,
  });

  const handleOpenDialog = (stat?: Stat) => {
    if (stat) {
      setSelectedStat(stat);
      setFormData({
        title: stat.title,
        value: stat.value,
        label: stat.label,
        display_order: stat.display_order || 0,
        is_active: stat.is_active ?? true,
      });
    } else {
      setSelectedStat(null);
      setFormData({
        title: "Rewind 2025",
        value: 0,
        label: "",
        display_order: stats ? stats.length + 1 : 1,
        is_active: true,
      });
    }
    setIsDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setIsDialogOpen(false);
    setSelectedStat(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (selectedStat) {
      await updateStat.mutateAsync({
        id: selectedStat.id,
        updates: formData,
      });
    } else {
      await createStat.mutateAsync(formData);
    }

    handleCloseDialog();
  };

  const handleDeleteClick = (id: string) => {
    setStatToDelete(id);
    setIsDeleteDialogOpen(true);
  };

  const handleConfirmDelete = async () => {
    if (statToDelete) {
      await deleteStat.mutateAsync(statToDelete);
      setIsDeleteDialogOpen(false);
      setStatToDelete(null);
    }
  };
  // Initialize section title when config loads
  const handleEditTitle = () => {
    setSectionTitle(statsConfig?.title || "Rewind 2025");
    setIsTitleEditing(true);
  };

  const handleSaveTitle = async () => {
    await updateStatsConfig.mutateAsync({ title: sectionTitle });
    setIsTitleEditing(false);
  };

  return (
    <AdminLayout title="Kelola Statistik" description="Kelola data statistik yang ditampilkan di halaman utama">
      <div className="space-y-6">
        {/* Section Title Configuration */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Judul Section Statistik</CardTitle>
            <CardDescription>
              Atur judul section yang ditampilkan di atas statistik (contoh: Rewind 2025, Rewind 2026)
            </CardDescription>
          </CardHeader>
          <CardContent>
            {configLoading ? (
              <div className="h-10 bg-muted animate-pulse rounded" />
            ) : isTitleEditing ? (
              <div className="flex gap-3 items-center">
                <Input
                  value={sectionTitle}
                  onChange={(e) => setSectionTitle(e.target.value)}
                  placeholder="Rewind 2025"
                  className="max-w-xs"
                />
                <Button onClick={handleSaveTitle} disabled={updateStatsConfig.isPending}>
                  <Save className="h-4 w-4 mr-2" />
                  {updateStatsConfig.isPending ? "Menyimpan..." : "Simpan"}
                </Button>
                <Button variant="outline" onClick={() => setIsTitleEditing(false)}>
                  Batal
                </Button>
              </div>
            ) : (
              <div className="flex gap-3 items-center">
                <span className="text-lg font-semibold">{statsConfig?.title || "Rewind 2025"}</span>
                <Button variant="outline" size="sm" onClick={handleEditTitle}>
                  <Pencil className="h-4 w-4 mr-2" />
                  Edit
                </Button>
              </div>
            )}
          </CardContent>
        </Card>

        <div className="flex justify-end">
          <Button onClick={() => handleOpenDialog()}>
            <Plus className="mr-2 h-4 w-4" />
            Tambah Statistik
          </Button>
        </div>

        {isLoading ? (
          <div className="text-center py-8">Loading...</div>
        ) : (
          <div className="border rounded-lg">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Judul</TableHead>
                  <TableHead>Nilai</TableHead>
                  <TableHead>Label</TableHead>
                  <TableHead>Urutan</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Aksi</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {stats && stats.length > 0 ? (
                  stats.map((stat) => (
                    <TableRow key={stat.id}>
                      <TableCell className="font-medium">{stat.title}</TableCell>
                      <TableCell>{stat.value.toLocaleString("id-ID")}</TableCell>
                      <TableCell>{stat.label}</TableCell>
                      <TableCell>{stat.display_order}</TableCell>
                      <TableCell>
                        <span
                          className={`px-2 py-1 rounded-full text-xs ${
                            stat.is_active
                              ? "bg-green-100 text-green-800"
                              : "bg-gray-100 text-gray-800"
                          }`}
                        >
                          {stat.is_active ? "Aktif" : "Nonaktif"}
                        </span>
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleOpenDialog(stat)}
                          >
                            <Pencil className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleDeleteClick(stat.id)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={6} className="text-center py-8 text-muted-foreground">
                      Belum ada data statistik
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        )}

        {/* Dialog Form */}
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogContent className="sm:max-w-[500px]">
            <form onSubmit={handleSubmit}>
              <DialogHeader>
                <DialogTitle>
                  {selectedStat ? "Edit Statistik" : "Tambah Statistik"}
                </DialogTitle>
                <DialogDescription>
                  {selectedStat
                    ? "Perbarui data statistik"
                    : "Tambahkan data statistik baru"}
                </DialogDescription>
              </DialogHeader>

              <div className="grid gap-4 py-4">
                <div className="grid gap-2">
                  <Label htmlFor="title">Judul</Label>
                  <Input
                    id="title"
                    value={formData.title}
                    onChange={(e) =>
                      setFormData({ ...formData, title: e.target.value })
                    }
                    placeholder="Rewind 2025"
                    required
                  />
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="value">Nilai</Label>
                  <Input
                    id="value"
                    type="number"
                    value={formData.value}
                    onChange={(e) =>
                      setFormData({ ...formData, value: parseInt(e.target.value) || 0 })
                    }
                    placeholder="49200"
                    required
                  />
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="label">Label</Label>
                  <Input
                    id="label"
                    value={formData.label}
                    onChange={(e) =>
                      setFormData({ ...formData, label: e.target.value })
                    }
                    placeholder="Total Penerima Manfaat"
                    required
                  />
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="display_order">Urutan Tampilan</Label>
                  <Input
                    id="display_order"
                    type="number"
                    value={formData.display_order}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        display_order: parseInt(e.target.value) || 0,
                      })
                    }
                    placeholder="1"
                  />
                </div>

                <div className="flex items-center space-x-2">
                  <Switch
                    id="is_active"
                    checked={formData.is_active}
                    onCheckedChange={(checked) =>
                      setFormData({ ...formData, is_active: checked })
                    }
                  />
                  <Label htmlFor="is_active">Aktif</Label>
                </div>
              </div>

              <DialogFooter>
                <Button type="button" variant="outline" onClick={handleCloseDialog}>
                  Batal
                </Button>
                <Button type="submit" disabled={createStat.isPending || updateStat.isPending}>
                  {createStat.isPending || updateStat.isPending ? "Menyimpan..." : "Simpan"}
                </Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>

        {/* Delete Confirmation Dialog */}
        <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Hapus Statistik</AlertDialogTitle>
              <AlertDialogDescription>
                Apakah Anda yakin ingin menghapus statistik ini? Tindakan ini tidak dapat dibatalkan.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Batal</AlertDialogCancel>
              <AlertDialogAction
                onClick={handleConfirmDelete}
                className="bg-red-600 hover:bg-red-700"
              >
                Hapus
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </AdminLayout>
  );
};

export default AdminStats;
