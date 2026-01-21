import { Link, useLocation } from "react-router-dom";
import { useState } from "react";
import { Menu, X, Mail, Phone, ChevronDown, ChevronRight, LogIn, User } from "lucide-react";
import { Button } from "@/components/ui/button";
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
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [activeSubmenu, setActiveSubmenu] = useState<string | null>(null);
  const [mobileExpandedMenus, setMobileExpandedMenus] = useState<string[]>([]);
  const location = useLocation();

  // Simulated login state - replace with actual auth later
  const isLoggedIn = false;

  const toggleMobileMenu = (menuName: string) => {
    setMobileExpandedMenus(prev => 
      prev.includes(menuName) 
        ? prev.filter(m => m !== menuName)
        : [...prev, menuName]
    );
  };

  return (
    <header className="sticky top-0 z-50">
      {/* Top Bar */}
      <div className="bg-[#0f2744] text-white py-2">
        <div className="container-narrow">
          <div className="flex items-center justify-between text-sm">
            {/* Contact Info */}
            <div className="flex items-center gap-6">
              <a 
                href="mailto:terasdakwah@gmail.com" 
                className="flex items-center gap-2 hover:text-[#29b6f6] transition-colors"
              >
                <Mail className="w-4 h-4" />
                <span className="hidden sm:inline">terasdakwah@gmail.com</span>
              </a>
              <a 
                href="tel:085320307766" 
                className="flex items-center gap-2 hover:text-[#29b6f6] transition-colors"
              >
                <Phone className="w-4 h-4" />
                <span className="hidden sm:inline">085320307766</span>
              </a>
            </div>
            
            {/* Quick Links */}
            <div className="hidden md:flex items-center gap-6">
              <Link to="/penasihat" className="hover:text-[#29b6f6] transition-colors">
                Penasihat
              </Link>
              <Link to="/tentang" className="hover:text-[#29b6f6] transition-colors">
                Tentang TD
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <div className="bg-background border-b border-border">
        <div className="container-narrow">
          <div className="flex items-center justify-between h-16 md:h-20">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-2">
              <img src={tdLogo} alt="Teras Dakwah Logo" className="h-10 w-auto" />
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center gap-1">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`px-4 py-2 text-sm font-medium transition-colors hover:text-primary ${
                    location.pathname === link.path || location.pathname.startsWith(link.path + '/')
                      ? "text-primary"
                      : "text-foreground"
                  }`}
                >
                  {link.name}
                </Link>
              ))}
            </nav>



            {/* Mobile Menu Button */}
            <button
              className="lg:hidden p-2 text-foreground"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label="Toggle menu"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>

          {/* Mobile Navigation */}
          {isMenuOpen && (
            <nav className="lg:hidden py-4 border-t border-border">
              <div className="flex flex-col gap-1">
                {navLinks.map((link) => (
                  <Link
                    key={link.path}
                    to={link.path}
                    className={`block px-4 py-2 text-sm font-medium transition-colors hover:text-primary ${
                      location.pathname === link.path
                        ? "text-primary"
                        : "text-foreground"
                    }`}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {link.name}
                  </Link>
                ))}
                
                {/* Mobile Quick Links */}
                <div className="mt-4 pt-4 border-t border-border">
                  <Link
                    to="/penasihat"
                    onClick={() => setIsMenuOpen(false)}
                    className="block px-4 py-2 text-sm text-muted-foreground hover:text-primary transition-colors"
                  >
                    Penasihat
                  </Link>
                  <Link
                    to="/tentang"
                    onClick={() => setIsMenuOpen(false)}
                    className="block px-4 py-2 text-sm text-muted-foreground hover:text-primary transition-colors"
                  >
                    Tentang TD
                  </Link>
                </div>


              </div>
            </nav>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;