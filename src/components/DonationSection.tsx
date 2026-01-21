import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const DonationSection = () => {
  return (
    <section className="py-16 md:py-24 bg-background">
      <div className="container-narrow">
        <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-center">
          {/* Left Content */}
          <div className="space-y-6">
            <h2 className="text-2xl md:text-3xl font-heading font-bold text-foreground leading-tight">
              Yuk, jadi bagian dari gerakan kebaikan!
            </h2>
            <p className="text-muted-foreground text-base leading-relaxed">
              Dengan infaq dan donasi di Teras Dakwah, Anda ikut membantu menghadirkan program-program dakwah, pendidikan, sosial, hingga kemanusiaan yang bermanfaat langsung untuk umat. Setiap rupiah yang Anda titipkan, InsyaAllah menjadi amal jariyah yang terus mengalir dunia hingga akhirat.
            </p>
            <div className="pt-2">
              <Button className="bg-primary hover:bg-primary/90 text-primary-foreground px-8" size="lg" asChild>
                <Link to="/contact">Sedekah Sekarang</Link>
              </Button>
            </div>
          </div>

          {/* Right Image Placeholder */}
          <div className="flex justify-center md:justify-end">
            <div className="w-full max-w-md aspect-[4/3] bg-muted rounded-lg flex items-center justify-center">
              <span className="text-muted-foreground text-center px-4">
                poster program<br />sedekah
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DonationSection;
