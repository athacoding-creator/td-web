import { Link, useLocation } from "react-router-dom";
import { useState } from "react";
import { Menu, X, Mail, Phone, ChevronDown, ChevronRight, LogIn, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import tdLogo from "@/assets/td-logo.png";

const navLinks = [
  { name: "Home", path: "/" },
  { name: "Profil TD", path: "/about" },
  { 
    name: "Program TD", 
    path: "/program",
    hasDropdown: true,
    children: [
      { name: "Program Sosial", path: "/program/sosial" },
      { 
        name: "Program Dakwah", 
        path: "/program/dakwah",
        hasSubmenu: true,
        children: [
          { name: "Ngaji Asyik", path: "/program/ngaji-asyik" },
          { name: "Kajian Amida", path: "/program/kajian-amida" },
          { name: "Sekolah Hadits Bersanad", path: "/program/sekolah-hadits" },
        ]
      },
    ]
  },
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
                <div 
                  key={link.path}
                  className="relative"
                  onMouseEnter={() => link.hasDropdown && setActiveDropdown(link.name)}
                  onMouseLeave={() => {
                    setActiveDropdown(null);
                    setActiveSubmenu(null);
                  }}
                >
                  <Link
                    to={link.path}
                    className={`flex items-center gap-1 px-4 py-2 text-sm font-medium transition-colors hover:text-primary ${
                      location.pathname === link.path || location.pathname.startsWith(link.path + '/')
                        ? "text-primary"
                        : "text-foreground"
                    }`}
                  >
                    {link.name}
                    {link.hasDropdown && (
                      <ChevronDown className={`w-4 h-4 transition-transform ${activeDropdown === link.name ? 'rotate-180' : ''}`} />
                    )}
                  </Link>

                  {/* Dropdown Menu */}
                  {link.hasDropdown && activeDropdown === link.name && (
                    <div className="absolute top-full left-0 pt-2 z-50">
                      <div className="bg-background rounded-lg shadow-lg border border-border py-2 min-w-[200px]">
                        {link.children?.map((child) => (
                          <div 
                            key={child.path}
                            className="relative"
                            onMouseEnter={() => child.hasSubmenu && setActiveSubmenu(child.name)}
                            onMouseLeave={() => !child.hasSubmenu && setActiveSubmenu(null)}
                          >
                            <Link
                              to={child.path}
                              className={`flex items-center justify-between px-4 py-2 text-sm transition-colors hover:bg-secondary hover:text-primary ${
                                activeSubmenu === child.name ? 'text-primary bg-secondary' : 'text-foreground'
                              }`}
                            >
                              {child.name}
                              {child.hasSubmenu && (
                                <ChevronRight className="w-4 h-4" />
                              )}
                            </Link>

                            {/* Submenu */}
                            {child.hasSubmenu && activeSubmenu === child.name && (
                              <div className="absolute left-full top-0 pl-2 z-50">
                                <div className="bg-background rounded-lg shadow-lg border border-border py-2 min-w-[200px]">
                                  {child.children?.map((subChild) => (
                                    <Link
                                      key={subChild.path}
                                      to={subChild.path}
                                      className="block px-4 py-2 text-sm text-foreground hover:bg-secondary hover:text-primary transition-colors"
                                    >
                                      {subChild.name}
                                    </Link>
                                  ))}
                                </div>
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </nav>

            {/* Login/User Button */}
            <div className="hidden lg:block">
              {isLoggedIn ? (
                <div 
                  className="relative"
                  onMouseEnter={() => setActiveDropdown('user')}
                  onMouseLeave={() => setActiveDropdown(null)}
                >
                  <button className="flex items-center gap-1 p-2 rounded-full border border-border hover:border-primary transition-colors">
                    <User className="w-5 h-5 text-muted-foreground" />
                    <ChevronDown className={`w-4 h-4 text-muted-foreground transition-transform ${activeDropdown === 'user' ? 'rotate-180' : ''}`} />
                  </button>
                  
                  {activeDropdown === 'user' && (
                    <div className="absolute top-full right-0 pt-2 z-50">
                      <div className="bg-background rounded-lg shadow-lg border border-border py-2 min-w-[150px]">
                        <Link
                          to="/profil"
                          className="block px-4 py-2 text-sm text-foreground hover:bg-secondary hover:text-primary transition-colors"
                        >
                          Profil Saya
                        </Link>
                        <button
                          className="block w-full text-left px-4 py-2 text-sm text-destructive hover:bg-secondary transition-colors"
                        >
                          Log Out
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <Button 
                  variant="outline" 
                  className="border-[#29b6f6] text-[#29b6f6] hover:bg-[#29b6f6] hover:text-white"
                  asChild
                >
                  <Link to="/login" className="flex items-center gap-2">
                    Login
                    <LogIn className="w-4 h-4" />
                  </Link>
                </Button>
              )}
            </div>

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
                  <div key={link.path}>
                    {link.hasDropdown ? (
                      <>
                        <button
                          onClick={() => toggleMobileMenu(link.name)}
                          className={`flex items-center justify-between w-full px-4 py-2 text-sm font-medium transition-colors ${
                            location.pathname.startsWith(link.path)
                              ? "text-primary"
                              : "text-foreground"
                          }`}
                        >
                          {link.name}
                          <ChevronDown className={`w-4 h-4 transition-transform ${mobileExpandedMenus.includes(link.name) ? 'rotate-180' : ''}`} />
                        </button>
                        
                        {mobileExpandedMenus.includes(link.name) && (
                          <div className="pl-4 border-l-2 border-primary/20 ml-4">
                            {link.children?.map((child) => (
                              <div key={child.path}>
                                {child.hasSubmenu ? (
                                  <>
                                    <button
                                      onClick={() => toggleMobileMenu(child.name)}
                                      className="flex items-center justify-between w-full px-4 py-2 text-sm text-muted-foreground hover:text-primary transition-colors"
                                    >
                                      {child.name}
                                      <ChevronDown className={`w-4 h-4 transition-transform ${mobileExpandedMenus.includes(child.name) ? 'rotate-180' : ''}`} />
                                    </button>
                                    
                                    {mobileExpandedMenus.includes(child.name) && (
                                      <div className="pl-4 border-l-2 border-primary/10 ml-4">
                                        {child.children?.map((subChild) => (
                                          <Link
                                            key={subChild.path}
                                            to={subChild.path}
                                            onClick={() => setIsMenuOpen(false)}
                                            className="block px-4 py-2 text-sm text-muted-foreground hover:text-primary transition-colors"
                                          >
                                            {subChild.name}
                                          </Link>
                                        ))}
                                      </div>
                                    )}
                                  </>
                                ) : (
                                  <Link
                                    to={child.path}
                                    onClick={() => setIsMenuOpen(false)}
                                    className="block px-4 py-2 text-sm text-muted-foreground hover:text-primary transition-colors"
                                  >
                                    {child.name}
                                  </Link>
                                )}
                              </div>
                            ))}
                          </div>
                        )}
                      </>
                    ) : (
                      <Link
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
                    )}
                  </div>
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

                {/* Mobile Login Button */}
                <div className="mt-4 px-4">
                  <Button 
                    variant="outline" 
                    className="w-full border-[#29b6f6] text-[#29b6f6] hover:bg-[#29b6f6] hover:text-white"
                    asChild
                  >
                    <Link to="/login" onClick={() => setIsMenuOpen(false)} className="flex items-center justify-center gap-2">
                      Login
                      <LogIn className="w-4 h-4" />
                    </Link>
                  </Button>
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