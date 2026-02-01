import { Button } from "@/components/ui/button";

const HeroSection = () => {
  const heroImage = "https://res.cloudinary.com/dfjvcvbsn/image/upload/v1769567440/Teras-Dakwah-1130x650_dtvso1.jpg";
  
  return (
    <section className="relative h-[60vh] flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${heroImage})` }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/50 to-black/60" />
      </div>

      {/* Content */}
      <div className="relative z-10 px-6 text-center py-12">
        <div className="space-y-6 animate-fade-in">
          <h1 className="text-3xl font-heading font-bold text-white leading-tight drop-shadow-lg">
            Yayasan Teras Dakwah Indonesia
          </h1>
          <p className="text-base text-white/95 font-light drop-shadow-md">
            "Manfaat untuk Ummat!"
          </p>
          
          {/* CTA Button */}
          <div className="pt-4">
            <Button 
              className="bg-primary hover:bg-primary/90 text-primary-foreground w-full shadow-lg" 
              size="lg" 
              asChild
            >
              <a 
                href="https://sedekah.terasdakwah.com/campaign/programkebaikan" 
                target="_blank" 
                rel="noopener noreferrer"
              >
                Sedekah Sekarang
              </a>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
