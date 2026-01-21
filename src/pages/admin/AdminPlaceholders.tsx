import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Home, Construction } from "lucide-react";

interface AdminPlaceholderProps {
  title: string;
  description: string;
}

const AdminPlaceholder = ({ title, description }: AdminPlaceholderProps) => {
  return (
    <div className="min-h-screen bg-secondary/30">
      {/* Header */}
      <header className="bg-background border-b border-border sticky top-0 z-50">
        <div className="container-narrow">
          <div className="flex items-center justify-between h-16">
            <Link 
              to="/admin" 
              className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              Kembali ke Dashboard
            </Link>
            <Button variant="outline" size="sm" asChild>
              <Link to="/" className="flex items-center gap-2">
                <Home className="w-4 h-4" />
                Ke Website
              </Link>
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container-narrow py-16">
        <div className="text-center max-w-md mx-auto">
          <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-6">
            <Construction className="w-10 h-10 text-primary" />
          </div>
          <h1 className="text-2xl font-heading font-bold text-foreground mb-4">
            {title}
          </h1>
          <p className="text-muted-foreground mb-8">
            {description}
          </p>
          <Button asChild>
            <Link to="/admin">Kembali ke Dashboard</Link>
          </Button>
        </div>
      </main>
    </div>
  );
};

export const AdminProgram = () => (
  <AdminPlaceholder 
    title="Kelola Program" 
    description="Halaman ini sedang dalam pengembangan. Anda akan dapat mengelola program unggulan di sini."
  />
);

export const AdminArtikel = () => (
  <AdminPlaceholder 
    title="Kelola Artikel" 
    description="Halaman ini sedang dalam pengembangan. Anda akan dapat mengelola artikel dan berita di sini."
  />
);

export const AdminJadwal = () => (
  <AdminPlaceholder 
    title="Kelola Jadwal" 
    description="Halaman ini sedang dalam pengembangan. Anda akan dapat mengelola jadwal kegiatan di sini."
  />
);

export const AdminDokumentasi = () => (
  <AdminPlaceholder 
    title="Kelola Dokumentasi" 
    description="Halaman ini sedang dalam pengembangan. Anda akan dapat mengelola foto dan video dokumentasi di sini."
  />
);

export const AdminPengumuman = () => (
  <AdminPlaceholder 
    title="Kelola Pengumuman" 
    description="Halaman ini sedang dalam pengembangan. Anda akan dapat mengelola pengumuman di sini."
  />
);

export const AdminMedia = () => (
  <AdminPlaceholder 
    title="Media Storage" 
    description="Halaman ini sedang dalam pengembangan. Anda akan dapat mengelola file media di sini."
  />
);

export const AdminMonitoring = () => (
  <AdminPlaceholder 
    title="Monitoring Sistem" 
    description="Halaman ini sedang dalam pengembangan. Anda akan dapat memonitor status sistem di sini."
  />
);

export const AdminLog = () => (
  <AdminPlaceholder 
    title="Log Aktivitas" 
    description="Halaman ini sedang dalam pengembangan. Anda akan dapat melihat riwayat aktivitas admin di sini."
  />
);

export default AdminPlaceholder;
