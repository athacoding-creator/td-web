import { ReactNode } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { 
  Home, 
  FileText, 
  Target, 
  MessageSquare, 
  User, 
  BarChart3, 
  Activity, 
  Clock,
  Settings as SettingsIcon,
  LogOut 
} from "lucide-react";

interface AdminLayoutProps {
  children: ReactNode;
}

const AdminLayout = ({ children }: AdminLayoutProps) => {
  const location = useLocation();
  const navigate = useNavigate();
  const { signOut } = useAuth();

  const handleLogout = async () => {
    await signOut();
    navigate("/login");
  };

  const menuItems = [
    { path: "/admin", icon: Home, label: "Dashboard" },
    { path: "/admin/program", icon: Target, label: "Program" },
    { path: "/admin/campaign", icon: FileText, label: "Campaign" },
    { path: "/admin/artikel", icon: FileText, label: "Artikel" },
    { path: "/admin/profil", icon: User, label: "Profil TD" },
    { path: "/admin/messages", icon: MessageSquare, label: "Pesan" },
    { path: "/admin/stats", icon: BarChart3, label: "Statistik" },
    { path: "/admin/activity-log", icon: Activity, label: "Activity Log" },
    { path: "/admin/keep-alive", icon: Clock, label: "Keep Alive" },
    { path: "/admin/settings", icon: SettingsIcon, label: "Pengaturan" },
  ];

  return (
    <div className="min-h-screen bg-background flex">
      {/* Sidebar */}
      <aside className="w-64 bg-card border-r border-border flex flex-col">
        <div className="p-6 border-b border-border">
          <h1 className="text-xl font-heading font-bold text-primary">
            Admin Panel
          </h1>
          <p className="text-xs text-muted-foreground mt-1">
            Teras Dakwah
          </p>
        </div>

        <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;

            return (
              <Link
                key={item.path}
                to={item.path}
                className={`
                  flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors
                  ${isActive 
                    ? "bg-primary text-primary-foreground" 
                    : "text-foreground hover:bg-muted"
                  }
                `}
              >
                <Icon className="w-4 h-4" />
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="p-4 border-t border-border">
          <Button
            variant="outline"
            className="w-full justify-start gap-2"
            onClick={handleLogout}
          >
            <LogOut className="w-4 h-4" />
            Logout
          </Button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto">
        {children}
      </main>
    </div>
  );
};

export default AdminLayout;
