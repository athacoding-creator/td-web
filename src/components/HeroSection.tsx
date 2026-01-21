import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import heroImage from "@/assets/hero-mosque.jpg";

const HeroSection = () => {
  return (
    <section className="relative min-h-[70vh] md:min-h-[80vh] flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${heroImage})` }}
      >
        <div className="absolute inset-0 hero-gradient" />
      </div>

      {/* Content */}
      <div className="relative z-10 container-narrow text-center py-20">
        <div className="max-w-3xl mx-auto space-y-6 animate-fade-in">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold text-hero-text leading-tight">
            Yayasan Teras Dakwah Indonesia
          </h1>
          <p className="text-lg md:text-xl text-hero-text/90 font-light">
            "Manfaat untuk Ummat!"
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
            <Button variant="hero" size="lg" asChild>
              <Link to="/contact">Dukung Dakwah</Link>
            </Button>
            <Button variant="heroOutline" size="lg" asChild>
              <Link to="/program">Lihat Program</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
