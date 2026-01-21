import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const DonationSection = () => {
  return (
    <section className="py-16 md:py-24 cta-gradient">
      <div className="container-narrow text-center">
        <div className="max-w-2xl mx-auto space-y-6">
          <h2 className="text-3xl md:text-4xl font-heading font-bold text-primary-foreground">
            Dukung Dakwah, Raih Keberkahan
          </h2>
          <p className="text-primary-foreground/90 text-lg leading-relaxed">
            Setiap donasi Anda akan menjadi amal jariyah yang terus mengalir pahalanya. Mari bergabung menjadi bagian dari gerakan dakwah untuk kebaikan umat.
          </p>
          <div className="pt-4">
            <Button variant="hero" size="lg" asChild>
              <Link to="/contact">Infaq Sekarang</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DonationSection;
