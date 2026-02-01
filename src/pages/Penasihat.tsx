import Header from "@/components/Header";
import Footer from "@/components/Footer";
import MobileLayout from "@/components/MobileLayout";

interface Advisor {
  id: string;
  name: string;
  title: string;
  bio: string;
  image?: string;
}

const advisors: Advisor[] = [
  {
    id: "1",
    name: "Ustadz Dr. H. Ahmad Fadholi, M.A.",
    title: "Penasihat Utama",
    bio: "Beliau adalah seorang ulama yang memiliki kedalaman ilmu dalam bidang fiqih dan ushul fiqih. Lulusan dari Universitas Al-Azhar, Kairo dengan spesialisasi dalam studi Islam. Beliau telah mengabdikan dirinya dalam dunia dakwah selama lebih dari 30 tahun.",
  },
  {
    id: "2",
    name: "Ustadz H. Muhammad Rizal, Lc.",
    title: "Penasihat Bidang Dakwah",
    bio: "Lulusan dari Universitas Islam Madinah dengan keahlian dalam tafsir Al-Quran dan hadits. Beliau aktif dalam berbagai kegiatan dakwah dan pembinaan generasi muda Islam.",
  },
  {
    id: "3",
    name: "Ustadzah Dra. Hj. Siti Maryam, M.Pd.I",
    title: "Penasihat Bidang Pendidikan",
    bio: "Pakar pendidikan Islam dengan pengalaman lebih dari 25 tahun dalam mengembangkan kurikulum pendidikan Islam. Beliau aktif dalam pembinaan muslimah dan program-program kewanitaan.",
  },
];

const PenasihatPage = () => {
  return (
    <MobileLayout>
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1">
          {/* Hero */}
          <section className="py-12 bg-gradient-to-b from-primary/5 to-background">
            <div className="px-4 text-center">
              <h1 className="text-3xl font-heading font-bold text-foreground mb-3">
                Dewan Penasihat
              </h1>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Para ulama dan tokoh yang memberikan bimbingan dan arahan dalam setiap langkah dakwah Teras Dakwah
              </p>
            </div>
          </section>

          {/* Advisors List */}
          <section className="py-8 bg-background">
            <div className="px-4">
              <div className="space-y-4">
                {advisors.map((advisor) => (
                  <div 
                    key={advisor.id}
                    className="bg-card rounded-lg p-4 border border-border shadow-sm"
                  >
                    <div className="flex items-start gap-3">
                      {/* Avatar Placeholder */}
                      <div className="w-16 h-16 flex-shrink-0 rounded-full bg-primary/10 flex items-center justify-center">
                        <span className="text-2xl">👤</span>
                      </div>
                      
                      <div className="flex-1 min-w-0">
                        <h3 className="font-heading font-semibold text-base text-foreground mb-0.5">
                          {advisor.name}
                        </h3>
                        <p className="text-primary text-xs font-medium mb-2">
                          {advisor.title}
                        </p>
                        <p className="text-muted-foreground text-xs leading-relaxed">
                          {advisor.bio}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Message Section */}
          <section className="py-8 bg-secondary/20">
            <div className="px-4">
              <div className="bg-card rounded-xl p-5 border border-border shadow-sm">
                <div className="text-center">
                  <h2 className="text-xl font-heading font-bold text-foreground mb-4">
                    Pesan dari Dewan Penasihat
                  </h2>
                  <blockquote className="text-muted-foreground leading-relaxed italic text-sm mb-4">
                    "Dakwah adalah tanggung jawab bersama. Mari kita sebarkan kebaikan dengan hikmah dan 
                    lemah lembut, sebagaimana yang diajarkan oleh Rasulullah SAW. Semoga Allah SWT 
                    senantiasa memberkahi setiap langkah dakwah kita."
                  </blockquote>
                  <p className="text-primary font-medium text-sm">
                    — Dewan Penasihat Teras Dakwah
                  </p>
                </div>
              </div>
            </div>
          </section>
        </main>
        <Footer />
      </div>
    </MobileLayout>
  );
};

export default PenasihatPage;
