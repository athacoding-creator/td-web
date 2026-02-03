import { Button } from "@/components/ui/button";
import { ChevronRight } from "lucide-react";

const HeroSection = () => {
  const heroImage = "https://res.cloudinary.com/dfjvcvbsn/image/upload/v1769567440/Teras-Dakwah-1130x650_dtvso1.jpg";
  
  return (
    <section className="relative">
      {/* Hero Background - Compact */}
      <div className="relative h-[35vh] overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url(${heroImage})` }}
        >
          <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/40 to-black/50" />
        </div>

        {/* Hero Content */}
        <div className="relative z-10 h-full flex flex-col items-center justify-center px-6 text-center">
          <h1 className="text-2xl font-heading font-bold text-white leading-tight drop-shadow-lg">
            Yayasan Teras Dakwah Indonesia
          </h1>
          <p className="text-sm text-white/95 font-light drop-shadow-md mt-2">
            "Manfaat untuk Ummat!"
          </p>
        </div>
      </div>

      {/* CTA Card - Floating Style */}
      <div className="px-4 -mt-12 relative z-20">
        <div className="bg-card rounded-xl shadow-lg border border-border p-5">
          <h3 className="text-lg font-heading font-semibold text-foreground mb-2">
            Lanjutkan Kebaikanmu
          </h3>
          <p className="text-xs text-muted-foreground mb-4 leading-relaxed">
            Bantu sesama melalui program donasi dan sedekah terkurasi dari Teras Dakwah
          </p>
          <Button 
            className="w-full bg-primary hover:bg-primary/90 text-primary-foreground shadow-md" 
            size="lg"
            asChild
          >
            <a 
              href="https://sedekah.terasdakwah.com/campaign/programkebaikan" 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2"
            >
              Sedekah Sekarang
              <ChevronRight className="w-4 h-4" />
            </a>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
