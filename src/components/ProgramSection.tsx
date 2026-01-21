import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

// Import all program images
import ngajiAsyik1 from "@/assets/programs/ngaji-asyik-1.jpg";
import ngajiAsyik2 from "@/assets/programs/ngaji-asyik-2.jpg";
import ngajiAsyik3 from "@/assets/programs/ngaji-asyik-3.jpg";
import amida1 from "@/assets/programs/amida-1.jpg";
import amida2 from "@/assets/programs/amida-2.jpg";
import amida3 from "@/assets/programs/amida-3.jpg";
import sahabatBinaan1 from "@/assets/programs/sahabat-binaan-1.jpg";
import sahabatBinaan2 from "@/assets/programs/sahabat-binaan-2.jpg";
import sahabatBinaan3 from "@/assets/programs/sahabat-binaan-3.jpg";
import sirahNabawiyah1 from "@/assets/programs/sirah-nabawiyah-1.jpg";
import sirahNabawiyah2 from "@/assets/programs/sirah-nabawiyah-2.jpg";
import sirahNabawiyah3 from "@/assets/programs/sirah-nabawiyah-3.jpg";
import storyNite1 from "@/assets/programs/story-nite-1.jpg";
import storyNite2 from "@/assets/programs/story-nite-2.jpg";
import storyNite3 from "@/assets/programs/story-nite-3.jpg";
import peduliSesama1 from "@/assets/programs/peduli-sesama-1.jpg";
import peduliSesama2 from "@/assets/programs/peduli-sesama-2.jpg";
import peduliSesama3 from "@/assets/programs/peduli-sesama-3.jpg";

interface Program {
  id: string;
  title: string;
  subtitle?: string;
  description: string;
  category: string;
  logo: string;
  images: string[];
}

const programs: Program[] = [
  {
    id: "ngaji-asyik",
    title: "Ngaji Asyik",
    subtitle: "Kajian Santai & Ramah",
    description: "Kajian rutin yang dikemas dengan suasana santai dan ramah untuk anak muda, membahas berbagai tema keislaman yang relevan dengan kehidupan sehari-hari. Program ini diadakan secara reguler dengan berbagai topik menarik yang disampaikan oleh ustadz-ustadz kompeten.",
    category: "Dakwah",
    logo: "https://res.cloudinary.com/dfjvcvbsn/image/upload/v1768960203/ngaji_asyik_Logo_2_okmsgf.png",
    images: [ngajiAsyik1, ngajiAsyik2, ngajiAsyik3],
  },
  {
    id: "amida",
    title: "AMIDA",
    subtitle: "Akhwat & Ummi Muda",
    description: "Program pendampingan dan pembinaan untuk mualaf dan masyarakat yang ingin mendalami Islam dari dasar dengan bimbingan ustadz yang berpengalaman. AMIDA memberikan pendampingan intensif untuk memastikan setiap peserta dapat memahami dan mengamalkan ajaran Islam dengan baik.",
    category: "Pendidikan",
    logo: "https://res.cloudinary.com/dfjvcvbsn/image/upload/v1768960102/Amida_gz9vbl.png",
    images: [amida1, amida2, amida3],
  },
  {
    id: "sahabat-binaan",
    title: "Sahabat Binaan",
    subtitle: "Pendampingan Sosial",
    description: "Program sosial berupa pendampingan ekonomi dan pendidikan untuk keluarga-keluarga binaan di berbagai daerah. Kami memberikan bantuan langsung serta pembinaan agar keluarga binaan dapat mandiri secara ekonomi sambil tetap istiqomah dalam beribadah.",
    category: "Sosial",
    logo: "https://res.cloudinary.com/dfjvcvbsn/image/upload/v1768960204/SHB_logo_lmpr5u.png",
    images: [sahabatBinaan1, sahabatBinaan2, sahabatBinaan3],
  },
  {
    id: "sirah-nabawiyah",
    title: "Mulai Siroh",
    subtitle: "Meneladani Rasulullah",
    description: "Kajian mendalam tentang perjalanan hidup Rasulullah SAW sebagai teladan dalam menjalani kehidupan sehari-hari. Melalui program ini, jamaah dapat mempelajari hikmah dan pelajaran dari setiap fase kehidupan Nabi Muhammad SAW.",
    category: "Pendidikan",
    logo: "https://res.cloudinary.com/dfjvcvbsn/image/upload/v1768960047/Mulai_Siroh_Logo_xetva9.png",
    images: [sirahNabawiyah1, sirahNabawiyah2, sirahNabawiyah3],
  },
  {
    id: "story-nite",
    title: "Story Nite",
    subtitle: "Sharing Inspiratif",
    description: "Acara sharing dan diskusi yang dikemas dengan format storytelling, membahas kisah-kisah inspiratif dari Al-Quran, hadits, dan kisah para sahabat Nabi SAW. Format yang santai membuat peserta lebih mudah menyerap nilai-nilai kebaikan.",
    category: "Dakwah",
    logo: "https://res.cloudinary.com/dfjvcvbsn/image/upload/v1768960045/Story_Nite_Warna_w05cd8.png",
    images: [storyNite1, storyNite2, storyNite3],
  },
  {
    id: "peduli-sesama",
    title: "Peduli Sesama",
    subtitle: "Kemanusiaan & Sosial",
    description: "Program kemanusiaan yang fokus pada bantuan darurat, tanggap bencana, dan santunan kepada kaum dhuafa. Program ini menjadi sarana bagi donatur untuk menyalurkan sedekah dan zakat kepada yang membutuhkan.",
    category: "Kemanusiaan",
    logo: "https://res.cloudinary.com/dfjvcvbsn/image/upload/v1768960046/Ngaji_Santai_Logo_ugpouc.png",
    images: [peduliSesama1, peduliSesama2, peduliSesama3],
  },
];

const ProgramSection = () => {
  const [selectedProgram, setSelectedProgram] = useState<Program | null>(null);

  return (
    <section id="program" className="py-16 md:py-24 bg-secondary/30">
      <div className="container-narrow">
        <h2 className="section-title mb-4">Program Teras Dakwah</h2>
        <p className="text-center text-muted-foreground max-w-2xl mx-auto mb-12">
          Menunjukkan bahwa semua aktivitas, program, dan inisiatif yayasan—baik kecil maupun besar—bertujuan untuk memberikan kontribusi nyata bagi umat
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {programs.map((program) => (
            <button
              key={program.id}
              onClick={() => setSelectedProgram(program)}
              className="group bg-card p-6 rounded-2xl border border-border hover:shadow-xl hover:border-primary/20 transition-all duration-300 flex items-center justify-center min-h-[200px]"
            >
              <img
                src={program.logo}
                alt={program.title}
                className="w-32 h-32 object-contain group-hover:scale-105 transition-transform duration-300"
              />
            </button>
          ))}
        </div>

        <div className="text-center mt-10">
          <Button variant="cta" size="lg" asChild>
            <Link to="/program">Program Lainnya</Link>
          </Button>
        </div>
      </div>

      {/* Program Detail Dialog */}
      <Dialog open={!!selectedProgram} onOpenChange={() => setSelectedProgram(null)}>
        <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
          {selectedProgram && (
            <>
              <DialogHeader>
                <DialogTitle className="text-2xl font-heading">
                  {selectedProgram.title}
                </DialogTitle>
                {selectedProgram.subtitle && (
                  <p className="text-primary font-medium">
                    {selectedProgram.subtitle}
                  </p>
                )}
              </DialogHeader>

              <div className="mt-4 space-y-6">
                {/* Description */}
                <p className="text-muted-foreground leading-relaxed">
                  {selectedProgram.description}
                </p>

                {/* Documentation Photos */}
                <div>
                  <h4 className="font-semibold text-foreground mb-3">Dokumentasi Kegiatan</h4>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    {selectedProgram.images.map((img, idx) => (
                      <div 
                        key={idx} 
                        className="aspect-[4/3] rounded-lg overflow-hidden"
                      >
                        <img
                          src={img}
                          alt={`${selectedProgram.title} - Dokumentasi ${idx + 1}`}
                          className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                        />
                      </div>
                    ))}
                  </div>
                </div>

                {/* Category Badge */}
                <div className="pt-4 border-t border-border">
                  <span className="inline-block px-3 py-1 text-xs font-medium rounded-full bg-primary/10 text-primary">
                    {selectedProgram.category}
                  </span>
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </section>
  );
};

export default ProgramSection;
