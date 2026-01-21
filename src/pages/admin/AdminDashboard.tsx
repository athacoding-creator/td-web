import { Link } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { 
  Home, 
  LogOut, 
  Heart, 
  Image, 
  Calendar, 
  FileText, 
  Megaphone, 
  HardDrive,
  Activity,
  ClipboardList,
  BarChart3,
  TrendingUp,
  Eye,
  Users
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

// Sample data for chart
const visitData = [
  { date: "15/01", visits: 45 },
  { date: "16/01", visits: 52 },
  { date: "17/01", visits: 38 },
  { date: "18/01", visits: 65 },
  { date: "19/01", visits: 78 },
  { date: "20/01", visits: 92 },
  { date: "21/01", visits: 120 },
];

interface MenuCard {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  link: string;
}

const menuCards: MenuCard[] = [
  {
    id: "program",
    title: "Program Unggulan",
    description: "Kelola 8 program unggulan di homepage",
    icon: <Heart className="w-6 h-6" />,
    link: "/admin/program",
  },
  {
    id: "artikel",
    title: "Artikel",
    description: "Kelola artikel dan berita",
    icon: <FileText className="w-6 h-6" />,
    link: "/admin/artikel",
  },
  {
    id: "jadwal",
    title: "Jadwal Kegiatan",
    description: "Kelola jadwal kegiatan/program",
    icon: <Calendar className="w-6 h-6" />,
    link: "/admin/jadwal",
  },
  {
    id: "dokumentasi",
    title: "Dokumentasi",
    description: "Kelola foto dan video dokumentasi",
    icon: <Image className="w-6 h-6" />,
    link: "/admin/dokumentasi",
  },
  {
    id: "pengumuman",
    title: "Pengumuman",
    description: "Kelola pengumuman terbaru",
    icon: <Megaphone className="w-6 h-6" />,
    link: "/admin/pengumuman",
  },
  {
    id: "media",
    title: "Media Storage",
    description: "Kelola file media di storage",
    icon: <HardDrive className="w-6 h-6" />,
    link: "/admin/media",
  },
  {
    id: "monitoring",
    title: "Monitoring",
    description: "Monitor status sistem",
    icon: <Activity className="w-6 h-6" />,
    link: "/admin/monitoring",
  },
  {
    id: "log",
    title: "Log Aktivitas",
    description: "Lihat riwayat aktivitas admin",
    icon: <ClipboardList className="w-6 h-6" />,
    link: "/admin/log",
  },
  {
    id: "statistik",
    title: "Statistik",
    description: "Lihat statistik website",
    icon: <BarChart3 className="w-6 h-6" />,
    link: "/admin/statistik",
  },
];

const AdminDashboard = () => {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await signOut();
    toast.success("Berhasil logout");
    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-secondary/30">
      {/* Header */}
      <header className="bg-background border-b border-border sticky top-0 z-50">
        <div className="container-narrow">
          <div className="flex items-center justify-between h-16">
            <h1 className="text-xl font-heading font-bold text-foreground">
              Dashboard Admin
            </h1>
            <div className="flex items-center gap-3">
              <Button variant="outline" size="sm" asChild>
                <Link to="/" className="flex items-center gap-2">
                  <Home className="w-4 h-4" />
                  Website
                </Link>
              </Button>
              <Button variant="outline" size="sm" onClick={handleLogout}>
                <LogOut className="w-4 h-4 mr-2" />
                Logout
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container-narrow py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h2 className="text-2xl md:text-3xl font-heading font-bold text-foreground mb-2">
            Selamat Datang, Admin
          </h2>
          <p className="text-muted-foreground">
            Kelola konten website Teras Dakwah
          </p>
        </div>

        {/* Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-card rounded-xl p-6 border border-border shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <span className="text-sm text-muted-foreground">Total Kunjungan</span>
              <TrendingUp className="w-5 h-5 text-primary" />
            </div>
            <p className="text-3xl font-heading font-bold text-foreground">1,234</p>
            <p className="text-xs text-muted-foreground mt-1">dalam 30 hari terakhir</p>
          </div>

          <div className="bg-card rounded-xl p-6 border border-border shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <span className="text-sm text-muted-foreground">Rata-rata Harian</span>
              <Eye className="w-5 h-5 text-primary" />
            </div>
            <p className="text-3xl font-heading font-bold text-foreground">41.1</p>
            <p className="text-xs text-muted-foreground mt-1">kunjungan per hari</p>
          </div>

          <div className="bg-card rounded-xl p-6 border border-border shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <span className="text-sm text-muted-foreground">Pengunjung Unik</span>
              <Users className="w-5 h-5 text-primary" />
            </div>
            <p className="text-3xl font-heading font-bold text-foreground">856</p>
            <p className="text-xs text-muted-foreground mt-1">dalam 30 hari terakhir</p>
          </div>
        </div>

        {/* Chart Section */}
        <div className="bg-card rounded-xl p-6 border border-border shadow-sm mb-8">
          <h3 className="text-lg font-heading font-semibold text-foreground mb-2">
            Statistik Kunjungan
          </h3>
          <p className="text-sm text-muted-foreground mb-6">
            Grafik kunjungan website per hari
          </p>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={visitData}>
                <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
                <XAxis 
                  dataKey="date" 
                  className="text-muted-foreground"
                  tick={{ fontSize: 12 }}
                />
                <YAxis 
                  className="text-muted-foreground"
                  tick={{ fontSize: 12 }}
                />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'hsl(var(--card))',
                    border: '1px solid hsl(var(--border))',
                    borderRadius: '8px'
                  }}
                />
                <Line 
                  type="monotone" 
                  dataKey="visits" 
                  stroke="hsl(var(--primary))" 
                  strokeWidth={2}
                  dot={{ fill: 'hsl(var(--primary))', strokeWidth: 2 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Menu Cards Grid */}
        <h3 className="text-lg font-heading font-semibold text-foreground mb-4">
          Menu Pengelolaan
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {menuCards.map((card) => (
            <Link
              key={card.id}
              to={card.link}
              className="bg-card rounded-xl p-6 border border-border shadow-sm hover:shadow-lg hover:border-primary/30 transition-all duration-300 group"
            >
              <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                <div className="text-primary">{card.icon}</div>
              </div>
              <h4 className="font-heading font-semibold text-foreground mb-1">
                {card.title}
              </h4>
              <p className="text-sm text-muted-foreground">
                {card.description}
              </p>
            </Link>
          ))}
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;
