import { Link } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { 
  Home, 
  LogOut, 
  Heart, 
  FileText, 
  Megaphone,
  BarChart3,
  Activity,
  History
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

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
    title: "Program",
    description: "Kelola program unggulan dan dokumentasi",
    icon: <Heart className="w-6 h-6" />,
    link: "/admin/program",
  },
  {
    id: "campaign",
    title: "Campaign",
    description: "Kelola campaign dakwah",
    icon: <Megaphone className="w-6 h-6" />,
    link: "/admin/campaign",
  },
  {
    id: "artikel",
    title: "Artikel",
    description: "Kelola artikel dan berita",
    icon: <FileText className="w-6 h-6" />,
    link: "/admin/artikel",
  },
  {
    id: "stats",
    title: "Statistik",
    description: "Kelola data statistik",
    icon: <BarChart3 className="w-6 h-6" />,
    link: "/admin/stats",
  },
  {
    id: "keep-alive",
    title: "Keep-Alive",
    description: "Monitor database keep-alive",
    icon: <Activity className="w-6 h-6" />,
    link: "/admin/keep-alive",
  },
  {
    id: "activity-log",
    title: "Log Aktivitas",
    description: "Riwayat aktivitas admin",
    icon: <History className="w-6 h-6" />,
    link: "/admin/activity-log",
  },
];

const AdminDashboard = () => {
  const { signOut } = useAuth();
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

        {/* Menu Cards Grid */}
        <h3 className="text-lg font-heading font-semibold text-foreground mb-4">
          Menu Pengelolaan
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
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
