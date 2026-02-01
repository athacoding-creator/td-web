import { Link, useLocation } from "react-router-dom";
import { useState } from "react";
import { Menu, X, Mail, Phone } from "lucide-react";
import tdLogo from "@/assets/td-logo.png";

const navLinks = [
  { name: "Home", path: "/" },
  { name: "Profil TD", path: "/about" },
  { name: "Program TD", path: "/program" },
  { name: "Campaign", path: "/campaign" },
  { name: "Artikel", path: "/artikel" },
  { name: "Contact", path: "/contact" },
];

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  return (
    <header className="sticky top-0 z-50 w-full">
      {/* Top Bar */}
      <div className="bg-[#0f2744] text-white py-2">
        <div className="px-4">
          <div className="flex items-center justify-between text-xs">
            {/* Contact Info */}
            <div className="flex items-center gap-3">
              <a 
                href="mailto:terasdakwah@gmail.com" 
                className="flex items-center gap-1.5 hover:text-[#29b6f6] transition-colors"
              >
                <Mail className="w-3 h-3" />
                <span className="hidden sm:inline text-xs">terasdakwah@gmail.com</span>
              </a>
              <a 
                href="tel:085320307766" 
                className="flex items-center gap-1.5 hover:text-[#29b6f6] transition-colors"
              >
                <Phone className="w-3 h-3" />
                <span className="text-xs">0853-2030-7766</span>
              </a>
            </div>
            
            {/* Quick Links */}
            <div className="flex items-center gap-3">
              <Link to="/penasihat" className="hover:text-[#29b6f6] transition-colors text-xs">
                Penasihat
              </Link>
              <Link to="/tentang" className="hover:text-[#29b6f6] transition-colors text-xs">
                Tentang
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <div className="bg-background border-b border-border">
        <div className="px-4">
          <div className="flex items-center justify-between h-14">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-2">
              <img src={tdLogo} alt="Teras Dakwah Logo" className="h-8 w-auto" />
            </Link>

            {/* Mobile Menu Button */}
            <button
              className="p-2 text-foreground hover:text-primary transition-colors"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label="Toggle menu"
            >
              {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>

          {/* Mobile Navigation */}
          {isMenuOpen && (
            <nav className="py-3 border-t border-border">
              <div className="flex flex-col gap-1">
                {navLinks.map((link) => (
                  <Link
                    key={link.path}
                    to={link.path}
                    className={`block px-3 py-2 text-sm font-medium rounded-md transition-colors ${
                      location.pathname === link.path || location.pathname.startsWith(link.path + '/')
                        ? "text-primary bg-primary/5"
                        : "text-foreground hover:text-primary hover:bg-primary/5"
                    }`}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {link.name}
                  </Link>
                ))}
              </div>
            </nav>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
