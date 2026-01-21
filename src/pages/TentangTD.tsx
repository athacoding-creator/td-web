import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { BookOpen, Users, Heart, Target, Eye } from "lucide-react";

const TentangTDPage = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        {/* Hero */}
        <section className="py-16 md:py-24 bg-secondary/30">
          <div className="container-narrow text-center">
            <h1 className="text-4xl md:text-5xl font-heading font-bold text-foreground mb-4">
              Tentang Teras Dakwah
            </h1>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Mengenal lebih dalam tentang Yayasan Teras Dakwah dan komitmen kami dalam menyebarkan dakwah Islam
            </p>
          </div>
        </section>

        {/* About Section */}
        <section className="py-16 md:py-24 bg-background">
          <div className="container-narrow">
            <div className="max-w-3xl mx-auto text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-heading font-bold text-foreground mb-6">
                Siapa Kami?
              </h2>
              <p className="text-muted-foreground leading-relaxed text-lg">
                Teras Dakwah adalah yayasan dakwah yang berdiri sejak tahun 2021 di Yogyakarta. 
                Kami hadir sebagai wadah untuk menyebarkan ajaran Islam yang rahmatan lil alamin 
                melalui berbagai program dakwah, pendidikan, dan kegiatan sosial yang bermanfaat 
                bagi umat.
              </p>
            </div>

            {/* Vision & Mission */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
              <div className="bg-card rounded-2xl p-8 border border-border shadow-lg">
                <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-6">
                  <Eye className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-2xl font-heading font-bold text-foreground mb-4">Visi</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Menjadi pusat dakwah Islam yang rahmatan lil alamin, mencerahkan umat dengan 
                  ilmu dan akhlak mulia, serta menjadi rujukan dalam pembinaan karakter Islami 
                  yang bermanfaat bagi masyarakat.
                </p>
              </div>

              <div className="bg-card rounded-2xl p-8 border border-border shadow-lg">
                <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-6">
                  <Target className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-2xl font-heading font-bold text-foreground mb-4">Misi</h3>
                <ul className="space-y-3 text-muted-foreground">
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-1">•</span>
                    Menyelenggarakan program kajian Islam yang berkualitas
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-1">•</span>
                    Membina generasi muda dengan nilai-nilai Islam yang moderat
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-1">•</span>
                    Mengembangkan program sosial untuk membantu masyarakat
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-1">•</span>
                    Membangun jaringan dakwah yang luas dan berdampak positif
                  </li>
                </ul>
              </div>
            </div>

            {/* Core Values */}
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-heading font-bold text-foreground mb-4">
                Nilai-Nilai Kami
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Prinsip-prinsip yang menjadi landasan setiap langkah dakwah kami
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-card rounded-xl p-6 border border-border text-center hover:shadow-lg transition-shadow">
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-primary/10 flex items-center justify-center">
                  <BookOpen className="w-8 h-8 text-primary" />
                </div>
                <h3 className="font-heading font-semibold text-lg mb-2 text-foreground">Ilmu</h3>
                <p className="text-muted-foreground text-sm">
                  Mengutamakan ilmu yang shahih berdasarkan Al-Quran dan Sunnah dengan pemahaman yang benar
                </p>
              </div>

              <div className="bg-card rounded-xl p-6 border border-border text-center hover:shadow-lg transition-shadow">
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-primary/10 flex items-center justify-center">
                  <Users className="w-8 h-8 text-primary" />
                </div>
                <h3 className="font-heading font-semibold text-lg mb-2 text-foreground">Ukhuwah</h3>
                <p className="text-muted-foreground text-sm">
                  Membangun persaudaraan yang kuat antar sesama muslim tanpa memandang latar belakang
                </p>
              </div>

              <div className="bg-card rounded-xl p-6 border border-border text-center hover:shadow-lg transition-shadow">
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-primary/10 flex items-center justify-center">
                  <Heart className="w-8 h-8 text-primary" />
                </div>
                <h3 className="font-heading font-semibold text-lg mb-2 text-foreground">Ikhlas</h3>
                <p className="text-muted-foreground text-sm">
                  Setiap amal dakwah dilakukan semata-mata karena Allah SWT dengan penuh ketulusan
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Statistics */}
        <section className="py-16 md:py-24 bg-secondary/30">
          <div className="container-narrow">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-heading font-bold text-foreground mb-4">
                Dampak Kami
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Alhamdulillah, dengan izin Allah kami telah memberikan manfaat kepada banyak umat
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="bg-card rounded-xl p-6 border border-border text-center">
                <p className="text-4xl font-heading font-bold text-primary mb-2">16,961</p>
                <p className="text-muted-foreground text-sm">Penerima Manfaat</p>
              </div>
              <div className="bg-card rounded-xl p-6 border border-border text-center">
                <p className="text-4xl font-heading font-bold text-primary mb-2">96</p>
                <p className="text-muted-foreground text-sm">Program Terlaksana</p>
              </div>
              <div className="bg-card rounded-xl p-6 border border-border text-center">
                <p className="text-4xl font-heading font-bold text-primary mb-2">2,927</p>
                <p className="text-muted-foreground text-sm">Jamaah Kajian</p>
              </div>
              <div className="bg-card rounded-xl p-6 border border-border text-center">
                <p className="text-4xl font-heading font-bold text-primary mb-2">4+</p>
                <p className="text-muted-foreground text-sm">Tahun Berdakwah</p>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default TentangTDPage;
