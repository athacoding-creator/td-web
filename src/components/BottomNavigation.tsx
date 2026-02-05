 import { Link, useLocation } from "react-router-dom";
 import { Home, User, Calendar, Heart, FileText } from "lucide-react";
 
 const navItems = [
   { name: "Home", path: "/", icon: Home },
   { name: "Profil", path: "/about", icon: User },
   { name: "Program", path: "/program", icon: Calendar },
   { name: "Campaign", path: "/campaign", icon: Heart },
   { name: "Artikel", path: "/artikel", icon: FileText },
 ];
 
 const BottomNavigation = () => {
   const location = useLocation();
 
   return (
    <nav className="fixed bottom-0 left-1/2 -translate-x-1/2 z-50 w-full max-w-md bg-background/95 backdrop-blur border-t border-border/50 shadow-[0_-2px_10px_rgba(0,0,0,0.1)]">
      <div className="flex items-center justify-around py-1.5 px-1">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = location.pathname === item.path || 
            (item.path !== "/" && location.pathname.startsWith(item.path));
          
          return (
            <Link
              key={item.path}
              to={item.path}
              className={`flex flex-col items-center justify-center min-w-[56px] py-1 px-1.5 rounded-lg transition-all duration-200 ${
                isActive
                  ? "text-primary"
                  : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
              }`}
            >
              <Icon className={`w-5 h-5 ${isActive ? "stroke-[2.5]" : ""}`} />
              <span className={`text-[9px] leading-tight mt-0.5 ${isActive ? "font-semibold" : "font-medium"}`}>
                {item.name}
              </span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
 };
 
 export default BottomNavigation;