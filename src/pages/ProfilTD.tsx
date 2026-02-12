import Header from "@/components/Header";
import Footer from "@/components/Footer";
import MobileLayout from "@/components/MobileLayout";
import heroMosque from "@/assets/hero-mosque.jpg";
import { useProfilTD } from "@/hooks/useProfilTD";
import { Skeleton } from "@/components/ui/skeleton";

const ProfilTDPage = () => {
  const { data: sections, isLoading } = useProfilTD();

  const sejarah = sections?.sejarah;
  const visi = sections?.visi;
  const misi = sections?.misi;

  return (
    <MobileLayout>
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1">
          {/* Hero */}
          <section className="py-12 bg-gradient-to-b from-primary/5 to-background">
            <div className="px-4 text-center">
              <h1 className="text-3xl font-heading font-bold text-foreground mb-3">
                Profil Teras Dakwah
              </h1>
              <p className="text-sm text-foreground leading-relaxed">
                Mengenal lebih dekat perjalanan dan visi misi Yayasan Teras Dakwah
              </p>
            </div>
          </section>

          {/* Sejarah Section */}
          <section className="py-8 bg-background">
            <div className="px-4">
              <div className="relative rounded-xl overflow-hidden shadow-md mb-4">
                <img 
                  src={sejarah?.image_url || heroMosque} 
                  alt="Gedung Teras Dakwah" 
                  className="w-full h-48 object-cover"
                />
              </div>
              
              <div className="bg-card rounded-xl p-5 shadow-sm border border-border">
                {isLoading ? (
                  <>
                    <Skeleton className="h-8 w-24 mb-4" />
                    <Skeleton className="h-5 w-32 mb-4" />
                    <Skeleton className="h-24 w-full" />
                  </>
                ) : (
                  <>
                    <h2 className="text-2xl font-heading font-bold text-primary mb-4">
                      {sejarah?.title || "Sejarah"}
                    </h2>
                    
                    <div className="mb-4">
                      <span className="text-primary font-bold text-lg">2014</span>
                      <span className="text-foreground font-semibold text-sm"> • Diresmikan</span>
                    </div>
                    
                    <div className="space-y-3 text-sm text-foreground leading-relaxed">
                      {sejarah?.content ? (
                        sejarah.content.split('\n\n').map((paragraph, idx) => (
                          <p key={idx}>{paragraph}</p>
                        ))
                      ) : (
                        <>
                          <p>
                            <span className="font-bold">Teras Dakwah</span> didirikan pada tahun 2014 sebagai wadah dakwah yang bertujuan untuk 
                            menyebarkan nilai-nilai Islam yang rahmatan lil alamin. Berawal dari sebuah 
                            mimpi besar untuk menciptakan pusat dakwah yang modern dan nyaman, Teras Dakwah 
                            kini telah menjadi salah satu pusat kegiatan keislaman di Yogyakarta.
                          </p>
                          <p>
                            Dengan mengusung konsep arsitektur modern yang ramah lingkungan, Teras Dakwah 
                            hadir sebagai tempat yang tidak hanya nyaman untuk beribadah, tetapi juga 
                            menjadi <span className="font-bold">ruang belajar dan berdiskusi</span> tentang Islam yang menyejukkan.
                          </p>
                        </>
                      )}
                    </div>
                  </>
                )}
              </div>
            </div>
          </section>

          {/* Visi Misi Section */}
          <section className="py-8 bg-secondary/20">
            <div className="px-4">
              <div className="relative rounded-xl overflow-hidden shadow-md mb-4">
                <img 
                  src={visi?.image_url || heroMosque} 
                  alt="Gedung Teras Dakwah" 
                  className="w-full h-48 object-cover"
                />
              </div>
              
              <div className="bg-card rounded-xl p-5 shadow-sm border border-border">
                {isLoading ? (
                  <>
                    <Skeleton className="h-8 w-24 mb-4" />
                    <Skeleton className="h-32 w-full" />
                  </>
                ) : (
                  <>
                    <h2 className="text-2xl font-heading font-bold text-primary mb-4">
                      Visi Misi
                    </h2>
                    
                    <div className="space-y-5">
                      <div>
                        <h3 className="text-lg font-semibold text-foreground mb-2">Visi</h3>
                        <p className="text-sm text-foreground leading-relaxed">
                          {visi?.content || "Menjadi pusat dakwah Islam yang rahmatan lil alamin, mencerahkan umat dengan ilmu dan akhlak mulia, serta menjadi rujukan dalam pembinaan karakter Islami yang bermanfaat bagi masyarakat."}
                        </p>
                      </div>
                      
                      <div>
                        <h3 className="text-lg font-semibold text-foreground mb-2">Misi</h3>
                        {misi?.content ? (
                          <ul className="space-y-2 text-sm text-foreground leading-relaxed">
                            {misi.content.split('\n').map((item, idx) => (
                              <li key={idx} className="flex items-start gap-2">
                                <span className="text-primary mt-0.5 flex-shrink-0">•</span>
                                <span>{item.replace(/^[-•]\s*/, '')}</span>
                              </li>
                            ))}
                          </ul>
                        ) : (
                          <ul className="space-y-2 text-sm text-foreground leading-relaxed">
                            <li className="flex items-start gap-2">
                              <span className="text-primary mt-0.5 flex-shrink-0">•</span>
                              <span>Menyelenggarakan program kajian Islam yang berkualitas dan mudah dipahami</span>
                            </li>
                            <li className="flex items-start gap-2">
                              <span className="text-primary mt-0.5 flex-shrink-0">•</span>
                              <span>Membina generasi muda dengan nilai-nilai Islam yang moderat</span>
                            </li>
                            <li className="flex items-start gap-2">
                              <span className="text-primary mt-0.5 flex-shrink-0">•</span>
                              <span>Mengembangkan program sosial untuk membantu masyarakat yang membutuhkan</span>
                            </li>
                            <li className="flex items-start gap-2">
                              <span className="text-primary mt-0.5 flex-shrink-0">•</span>
                              <span>Membangun jaringan dakwah yang luas dan berdampak positif</span>
                            </li>
                          </ul>
                        )}
                      </div>
                    </div>
                  </>
                )}
              </div>
            </div>
          </section>

          {/* Nilai Teras Dakwah Section */}
          <section className="py-8 bg-background">
            <div className="px-4">
              <div className="text-center mb-6">
                <h2 className="text-2xl font-heading font-bold text-foreground mb-2">
                  Nilai Teras Dakwah
                </h2>
                <p className="text-sm text-foreground leading-relaxed">
                  Prinsip-prinsip yang menjadi landasan setiap langkah dakwah Teras Dakwah
                </p>
              </div>
              
              <div className="space-y-3">
                {/* TABRAK DULU */}
                <div className="bg-card rounded-lg p-4 border border-border">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-6 h-6 flex-shrink-0 rounded-full bg-primary flex items-center justify-center">
                      <span className="text-white text-lg font-bold">✓</span>
                    </div>
                    <h3 className="font-heading font-bold text-base text-foreground">TABRAK DULU</h3>
                  </div>
                  <p className="text-xs text-foreground leading-relaxed pl-8">
                    Ada peluang kebaikan, lakukan dulu, pikir belakangan
                  </p>
                </div>
                
                {/* YAKIN */}
                <div className="bg-card rounded-lg p-4 border border-border">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-6 h-6 flex-shrink-0 rounded-full bg-primary flex items-center justify-center">
                      <span className="text-white text-lg font-bold">✓</span>
                    </div>
                    <h3 className="font-heading font-bold text-base text-foreground">YAKIN</h3>
                  </div>
                  <p className="text-xs text-foreground leading-relaxed pl-8">
                    Sepenuh Hati, Luruskan Niat, Totalitas
                  </p>
                </div>
                
                {/* TAWAKAL */}
                <div className="bg-card rounded-lg p-4 border border-border">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-6 h-6 flex-shrink-0 rounded-full bg-primary flex items-center justify-center">
                      <span className="text-white text-lg font-bold">✓</span>
                    </div>
                    <h3 className="font-heading font-bold text-base text-foreground">TAWAKAL</h3>
                  </div>
                  <p className="text-xs text-foreground leading-relaxed pl-8">
                    Pasrah Kepada Allah, Apapun Hasil yang di dapat selalu BerPrasangka Baik
                  </p>
                </div>
                
                {/* PERBAIKI DIRI */}
                <div className="bg-card rounded-lg p-4 border border-border">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-6 h-6 flex-shrink-0 rounded-full bg-primary flex items-center justify-center">
                      <span className="text-white text-lg font-bold">✓</span>
                    </div>
                    <h3 className="font-heading font-bold text-base text-foreground">PERBAIKI DIRI</h3>
                  </div>
                  <p className="text-xs text-foreground leading-relaxed pl-8">
                    Evaluasi: Strategi dan Rupiah
                  </p>
                </div>
                
                {/* SILATURAHMI */}
                <div className="bg-card rounded-lg p-4 border border-border">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-6 h-6 flex-shrink-0 rounded-full bg-primary flex items-center justify-center">
                      <span className="text-white text-lg font-bold">✓</span>
                    </div>
                    <h3 className="font-heading font-bold text-base text-foreground">SILATURAHMI</h3>
                  </div>
                  <p className="text-xs text-foreground leading-relaxed pl-8">
                    Buka pintu Rezeki
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

export default ProfilTDPage;
