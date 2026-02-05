import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { Mail, Phone } from "lucide-react";
import tdLogo from "@/assets/td-logo.png";

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Set transparent when scrolled more than 50px
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header 
      className={`sticky top-0 z-50 w-full border-b transition-all duration-300 ${
        isScrolled 
          ? "bg-background/70 backdrop-blur-md border-border/20" 
          : "bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80 border-border/40"
      }`}
    >
      {/* Top Bar */}
      <div 
        className={`bg-gradient-to-r from-[#0a1628] to-[#0f2744] text-white transition-all duration-300 ${
          isScrolled ? "py-1.5 opacity-90" : "py-2.5 opacity-100"
        }`}
      >
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
      <div className={`px-4 transition-all duration-300 ${isScrolled ? "py-1.5" : "py-2"}`}>
        <div className="flex items-center justify-center">
          {/* Logo */}
          <Link to="/" className="flex items-center group">
            <img 
              src={tdLogo} 
              alt="Teras Dakwah Logo" 
              className={`w-auto transition-all duration-300 group-hover:scale-105 ${
                isScrolled ? "h-7" : "h-8"
              }`}
            />
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header;
