import Header from "@/components/Header";
import Footer from "@/components/Footer";

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
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        {/* Hero */}
        <section className="py-16 md:py-24 bg-secondary/30">
          <div className="container-narrow text-center">
            <h1 className="text-4xl md:text-5xl font-heading font-bold text-foreground mb-4">
              Dewan Penasihat
            </h1>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Para ulama dan tokoh yang memberikan bimbingan dan arahan dalam setiap langkah dakwah Teras Dakwah
            </p>
          </div>
        </section>

        {/* Advisors Grid */}
        <section className="py-16 md:py-24 bg-background">
          <div className="container-narrow">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {advisors.map((advisor) => (
                <div 
                  key={advisor.id}
                  className="bg-card rounded-2xl p-6 border border-border shadow-lg hover:shadow-xl transition-shadow"
                >
                  {/* Avatar Placeholder */}
                  <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-primary/10 flex items-center justify-center">
                    <span className="text-4xl">👤</span>
                  </div>
                  
                  <div className="text-center">
                    <h3 className="font-heading font-semibold text-lg text-foreground mb-1">
                      {advisor.name}
                    </h3>
                    <p className="text-primary text-sm font-medium mb-4">
                      {advisor.title}
                    </p>
                    <p className="text-muted-foreground text-sm leading-relaxed">
                      {advisor.bio}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Message Section */}
        <section className="py-16 md:py-24 bg-secondary/30">
          <div className="container-narrow">
            <div className="bg-card rounded-2xl p-8 md:p-12 border border-border shadow-lg">
              <div className="text-center max-w-3xl mx-auto">
                <h2 className="text-2xl md:text-3xl font-heading font-bold text-foreground mb-6">
                  Pesan dari Dewan Penasihat
                </h2>
                <blockquote className="text-muted-foreground leading-relaxed italic text-lg mb-6">
                  "Dakwah adalah tanggung jawab bersama. Mari kita sebarkan kebaikan dengan hikmah dan 
                  lemah lembut, sebagaimana yang diajarkan oleh Rasulullah SAW. Semoga Allah SWT 
                  senantiasa memberkahi setiap langkah dakwah kita."
                </blockquote>
                <p className="text-primary font-medium">
                  — Dewan Penasihat Teras Dakwah
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default PenasihatPage;
