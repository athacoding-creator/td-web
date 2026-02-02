import { Link, useLocation } from "react-router-dom";
import { useState } from "react";
import { Menu, X, Mail, Phone, Home, User, Calendar, Heart, FileText, MessageCircle } from "lucide-react";
import tdLogo from "@/assets/td-logo.png";

const navLinks = [
  { name: "Home", path: "/", icon: Home },
  { name: "Profil TD", path: "/about", icon: User },
  { name: "Program", path: "/program", icon: Calendar },
  { name: "Campaign", path: "/campaign", icon: Heart },
  { name: "Artikel", path: "/artikel", icon: FileText },
  { name: "Contact", path: "/contact", icon: MessageCircle },
];

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  return (
    <header className="sticky top-0 z-50 w-full bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80 border-b border-border/40">
      {/* Top Bar */}
      <div className="bg-gradient-to-r from-[#0a1628] to-[#0f2744] text-white py-2.5">
        <div className="px-4">
          <div className="flex items-center justify-between text-xs">
            {/* Contact Info */}
            <div className="flex items-center gap-3">
              <a 
                href="mailto:terasdakwah@gmail.com" 
                className="flex items-center gap-1.5 hover:text-[#29b6f6] transition-colors"
                aria-label="Email Teras Dakwah"
              >
                <Mail size={14} />
              </a>
              <a 
                href="tel:085320307766" 
                className="flex items-center gap-1.5 hover:text-[#29b6f6] transition-colors"
                aria-label="Telepon Teras Dakwah"
              >
                <Phone size={14} />
              </a>
            </div>
            
            {/* Quick Links */}
            <div className="flex items-center gap-3">
              <Link to="/penasihat" className="hover:text-[#29b6f6] transition-colors text-xs font-medium">
                Pengasuh
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <div className="px-4 py-3">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 group">
            <img src={tdLogo} alt="Teras Dakwah Logo" className="h-9 w-auto transition-transform group-hover:scale-105" />
          </Link>

          {/* Mobile Menu Button */}
          <button
            className="p-2 rounded-lg text-foreground hover:bg-primary/10 hover:text-primary transition-all duration-200"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <nav className="mt-4 pb-2">
            <div className="space-y-1">
              {navLinks.map((link) => {
                const Icon = link.icon;
                const isActive = location.pathname === link.path || location.pathname.startsWith(link.path + '/');
                
                return (
                  <Link
                    key={link.path}
                    to={link.path}
                    className={`flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-all duration-200 ${
                      isActive
                        ? "bg-primary text-primary-foreground shadow-sm"
                        : "text-foreground hover:bg-primary/10 hover:text-primary"
                    }`}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <Icon className="w-4 h-4" />
                    <span>{link.name}</span>
                  </Link>
                );
              })}
              
              {/* Divider */}
              <div className="h-px bg-border my-3" />
              
              {/* Additional Links */}
              <div className="space-y-1">
                <Link
                  to="/penasihat"
                  onClick={() => setIsMenuOpen(false)}
                  className="flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-all duration-200"
                >
                  <User className="w-4 h-4" />
                  <span>Penasihat</span>
                </Link>
                <Link
                  to="/tentang"
                  onClick={() => setIsMenuOpen(false)}
                  className="flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-all duration-200"
                >
                  <FileText className="w-4 h-4" />
                  <span>Tentang TD</span>
                </Link>
              </div>
            </div>
          </nav>
        )}
      </div>
    </header>
  );
};

export default Header;
