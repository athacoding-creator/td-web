import { Button } from "@/components/ui/button";

const DonationSection = () => {
  return (
    <section className="py-10 bg-background">
      <div className="px-4">
        <div className="space-y-6">
          {/* Image - Poster Program */}
          <div className="flex justify-center">
            <div className="w-full aspect-[4/3] bg-muted rounded-xl flex items-center justify-center overflow-hidden p-4 border border-border/50">
              <img 
                src="https://res.cloudinary.com/dfjvcvbsn/image/upload/v1768960102/BMTD_ym26aw.png" 
                alt="Program Sedekah Teras Dakwah"
                className="w-full h-full object-contain"
              />
            </div>
          </div>

          {/* Content */}
          <div className="space-y-4 text-center">
            <h2 className="text-xl font-heading font-bold text-foreground leading-tight">
              Yuk, jadi bagian dari gerakan kebaikan!
            </h2>
            <p className="text-muted-foreground text-sm leading-relaxed">
              Dengan infaq dan donasi di Teras Dakwah, Anda ikut membantu menghadirkan program-program dakwah, pendidikan, sosial, hingga kemanusiaan yang bermanfaat langsung untuk umat. Setiap rupiah yang Anda titipkan, InsyaAllah menjadi amal jariyah yang terus mengalir dunia hingga akhirat.
            </p>
            <div className="pt-2">
              <Button className="bg-primary hover:bg-primary/90 text-primary-foreground w-full" size="default" asChild>
                <a href="https://sedekah.terasdakwah.com/campaign/programkebaikan" target="_blank" rel="noopener noreferrer">Sedekah Sekarang</a>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DonationSection;
