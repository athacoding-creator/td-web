import { Link } from "react-router-dom";
import { Youtube, Instagram, Facebook, Twitter, Mail, Phone, MapPin } from "lucide-react";
import tdLogoFull from "@/assets/td-logo-full.png";

const Footer = () => {
  return (
    <footer className="bg-gradient-to-r from-[#0a1628] to-[#0f2744] py-12 md:py-16">
      <div className="container-narrow">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <img src={tdLogoFull} alt="Teras Dakwah Logo" className="h-10 w-auto" />
            </div>
            <p className="text-white/80 text-sm leading-relaxed">
              Tempat Ngaji Asyik dan Nongkrong Anak Muda Jogja
              Lintas Harokah Berdasarkan Al-Quran dan Sunnah
            </p>
            {/* Social Media Icons */}
            <div className="flex items-center gap-4 pt-2">
              <a 
                href="https://www.youtube.com/@terasdakwah" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-white/70 hover:text-white transition-colors"
              >
                <Youtube className="w-5 h-5" />
              </a>
              <a 
                href="https://www.instagram.com/terasdakwah/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-white/70 hover:text-white transition-colors"
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a 
                href="https://www.facebook.com/TerasDakwah" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-white/70 hover:text-white transition-colors"
              >
                <Facebook className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="font-heading font-semibold text-white text-lg">Quick Links</h4>
            <nav className="flex flex-col gap-3">
              <Link to="/" className="text-white/70 hover:text-white text-sm transition-colors">
                Penasihat
              </Link>
              <Link to="/about" className="text-white/70 hover:text-white text-sm transition-colors">
                Tentang TD
              </Link>
              <Link to="/artikel" className="text-white/70 hover:text-white text-sm transition-colors">
                Berita Ngaji
              </Link>
              <Link to="/program" className="text-white/70 hover:text-white text-sm transition-colors">
                Profil TD
              </Link>
            </nav>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h4 className="font-heading font-semibold text-white text-lg">Contact</h4>
            <div className="space-y-3 text-sm text-white/70">
              <div className="flex items-center gap-3">
                <Mail className="w-4 h-4 flex-shrink-0" />
                <span>admin@terasdakwah.com</span>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="w-4 h-4 flex-shrink-0" />
                <span>085320307766</span>
              </div>
              <div className="flex items-start gap-3">
                <MapPin className="w-4 h-4 flex-shrink-0 mt-0.5" />
                <span>
                  Jalan Nitikan UH VI / 413 RT 41 RW 11<br />
                  Kelurahan Sorosutan Kecamatan Umbulharjo<br />
                  Yogyakarta Indonesia
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-12 pt-6 border-t border-[#29b6f6]/30">
          <p className="text-center text-white/60 text-sm">
            Copyright © 2014 Teras Dakwah. All Rights Reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
