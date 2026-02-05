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
     <nav className="fixed bottom-0 left-0 right-0 z-50 bg-background border-t border-border shadow-lg">
       <div className="max-w-md mx-auto">
         <div className="flex items-center justify-around py-2">
           {navItems.map((item) => {
             const Icon = item.icon;
             const isActive = location.pathname === item.path || 
               (item.path !== "/" && location.pathname.startsWith(item.path));
             
             return (
               <Link
                 key={item.path}
                 to={item.path}
                 className={`flex flex-col items-center justify-center min-w-[60px] py-1 px-2 rounded-lg transition-colors ${
                   isActive
                     ? "text-primary"
                     : "text-muted-foreground hover:text-foreground"
                 }`}
               >
                 <Icon className={`w-5 h-5 mb-0.5 ${isActive ? "stroke-[2.5]" : ""}`} />
                 <span className={`text-[10px] ${isActive ? "font-semibold" : "font-medium"}`}>
                   {item.name}
                 </span>
               </Link>
             );
           })}
         </div>
       </div>
     </nav>
   );
 };
 
 export default BottomNavigation;