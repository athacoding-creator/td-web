
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

        </div>
      </div>
    </section>
  );
};

export default HeroSection;
