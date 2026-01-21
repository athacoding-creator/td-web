import Header from "@/components/Header";
import Footer from "@/components/Footer";
import heroMosque from "@/assets/hero-mosque.jpg";
import { useProfilTD } from "@/hooks/useProfilTD";
import { Skeleton } from "@/components/ui/skeleton";

const ProfilTDPage = () => {
  const { data: sections, isLoading } = useProfilTD();

  const sejarah = sections?.sejarah;
  const visi = sections?.visi;
  const misi = sections?.misi;

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        {/* Hero */}
        <section className="py-16 md:py-24 bg-secondary/30">
          <div className="container-narrow text-center">
            <h1 className="text-4xl md:text-5xl font-heading font-bold text-foreground mb-4">
              Profil Teras Dakwah
            </h1>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Mengenal lebih dekat perjalanan dan visi misi Yayasan Teras Dakwah
            </p>
          </div>
        </section>

        {/* Sejarah Section */}
        <section className="py-16 md:py-24 bg-background">
          <div className="container-narrow">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
              {/* Image */}
              <div className="relative rounded-2xl overflow-hidden shadow-xl">
                <img 
                  src={sejarah?.image_url || heroMosque} 
                  alt="Gedung Teras Dakwah" 
                  className="w-full h-[400px] object-cover"
                />
              </div>
              
              {/* Content */}
              <div className="bg-card rounded-2xl p-8 md:p-10 shadow-lg border border-border">
                {isLoading ? (
                  <>
                    <Skeleton className="h-10 w-32 mb-6" />
                    <Skeleton className="h-6 w-48 mb-6" />
                    <Skeleton className="h-32 w-full" />
                  </>
                ) : (
                  <>
                    <h2 className="text-3xl md:text-4xl font-heading font-bold text-primary mb-6">
                      {sejarah?.title || "Sejarah"}
                    </h2>
                    
                    <div className="mb-6">
                      <span className="text-primary font-bold text-xl">2014</span>
                      <span className="text-foreground font-semibold"> • Diresmikan</span>
                    </div>
                    
                    <div className="space-y-4 text-muted-foreground leading-relaxed">
                      {sejarah?.content ? (
                        sejarah.content.split('\n\n').map((paragraph, idx) => (
                          <p key={idx}>{paragraph}</p>
                        ))
                      ) : (
                        <>
                          <p>
                            Teras Dakwah didirikan pada tahun 2021 sebagai wadah dakwah yang bertujuan untuk 
                            menyebarkan nilai-nilai Islam yang rahmatan lil alamin. Berawal dari sebuah 
                            mimpi besar untuk menciptakan pusat dakwah yang modern dan nyaman, Teras Dakwah 
                            kini telah menjadi salah satu pusat kegiatan keislaman di Yogyakarta.
                          </p>
                          <p>
                            Dengan mengusung konsep arsitektur modern yang ramah lingkungan, Teras Dakwah 
                            hadir sebagai tempat yang tidak hanya nyaman untuk beribadah, tetapi juga 
                            menjadi ruang belajar dan berdiskusi tentang Islam yang menyejukkan.
                          </p>
                        </>
                      )}
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* Visi Misi Section */}
        <section className="py-16 md:py-24 bg-secondary/30">
          <div className="container-narrow">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
              {/* Content */}
              <div className="bg-card rounded-2xl p-8 md:p-10 shadow-lg border border-border order-2 lg:order-1">
                {isLoading ? (
                  <>
                    <Skeleton className="h-10 w-32 mb-6" />
                    <Skeleton className="h-48 w-full" />
                  </>
                ) : (
                  <>
                    <h2 className="text-3xl md:text-4xl font-heading font-bold text-primary mb-6">
                      Visi Misi
                    </h2>
                    
                    <div className="space-y-6">
                      <div>
                        <h3 className="text-xl font-semibold text-foreground mb-3">Visi</h3>
                        <p className="text-muted-foreground leading-relaxed">
                          {visi?.content || "Menjadi pusat dakwah Islam yang rahmatan lil alamin, mencerahkan umat dengan ilmu dan akhlak mulia, serta menjadi rujukan dalam pembinaan karakter Islami yang bermanfaat bagi masyarakat."}
                        </p>
                      </div>
                      
                      <div>
                        <h3 className="text-xl font-semibold text-foreground mb-3">Misi</h3>
                        {misi?.content ? (
                          <ul className="space-y-2 text-muted-foreground leading-relaxed">
                            {misi.content.split('\n').map((item, idx) => (
                              <li key={idx} className="flex items-start gap-2">
                                <span className="text-primary mt-1">•</span>
                                {item.replace(/^[-•]\s*/, '')}
                              </li>
                            ))}
                          </ul>
                        ) : (
                          <ul className="space-y-2 text-muted-foreground leading-relaxed">
                            <li className="flex items-start gap-2">
                              <span className="text-primary mt-1">•</span>
                              Menyelenggarakan program kajian Islam yang berkualitas dan mudah dipahami
                            </li>
                            <li className="flex items-start gap-2">
                              <span className="text-primary mt-1">•</span>
                              Membina generasi muda dengan nilai-nilai Islam yang moderat
                            </li>
                            <li className="flex items-start gap-2">
                              <span className="text-primary mt-1">•</span>
                              Mengembangkan program sosial untuk membantu masyarakat yang membutuhkan
                            </li>
                            <li className="flex items-start gap-2">
                              <span className="text-primary mt-1">•</span>
                              Membangun jaringan dakwah yang luas dan berdampak positif
                            </li>
                          </ul>
                        )}
                      </div>
                    </div>
                  </>
                )}
              </div>
              
              {/* Image */}
              <div className="relative rounded-2xl overflow-hidden shadow-xl order-1 lg:order-2">
                <img 
                  src={visi?.image_url || heroMosque} 
                  alt="Gedung Teras Dakwah" 
                  className="w-full h-[400px] object-cover"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Nilai-Nilai Section */}
        <section className="py-16 md:py-24 bg-background">
          <div className="container-narrow">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-heading font-bold text-foreground mb-4">
                Nilai-Nilai Kami
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Prinsip-prinsip yang menjadi landasan setiap langkah dakwah Teras Dakwah
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-card rounded-xl p-6 border border-border text-center">
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-primary/10 flex items-center justify-center">
                  <span className="text-2xl">🤲</span>
                </div>
                <h3 className="font-heading font-semibold text-lg mb-2 text-foreground">Ikhlas</h3>
                <p className="text-muted-foreground text-sm">
                  Setiap amal dakwah dilakukan semata-mata karena Allah SWT
                </p>
              </div>
              
              <div className="bg-card rounded-xl p-6 border border-border text-center">
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-primary/10 flex items-center justify-center">
                  <span className="text-2xl">📚</span>
                </div>
                <h3 className="font-heading font-semibold text-lg mb-2 text-foreground">Ilmu</h3>
                <p className="text-muted-foreground text-sm">
                  Mengutamakan ilmu yang shahih berdasarkan Al-Quran dan Sunnah
                </p>
              </div>
              
              <div className="bg-card rounded-xl p-6 border border-border text-center">
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-primary/10 flex items-center justify-center">
                  <span className="text-2xl">🤝</span>
                </div>
                <h3 className="font-heading font-semibold text-lg mb-2 text-foreground">Ukhuwah</h3>
                <p className="text-muted-foreground text-sm">
                  Membangun persaudaraan yang kuat antar sesama muslim
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

export default ProfilTDPage;
