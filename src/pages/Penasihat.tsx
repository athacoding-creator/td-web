import Header from "@/components/Header";
import Footer from "@/components/Footer";
import MobileLayout from "@/components/MobileLayout";
import akhidImage from "@/assets/akhid-subiyanto.png";

const PengasuhPage = () => {
  return (
    <MobileLayout>
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1">
          {/* Hero Section */}
          <section className="relative bg-gradient-to-br from-background via-secondary/30 to-background overflow-hidden">
            <div className="absolute left-0 top-0 w-16 h-full bg-gradient-to-b from-accent/60 to-accent/40" />
            
            <div className="relative z-10 px-4 py-8">
              <div className="text-center mb-6">
                <span className="inline-block bg-accent text-accent-foreground px-4 py-1 rounded-full text-xs font-semibold uppercase tracking-wide">
                  Pengasuh Teras Dakwah
                </span>
              </div>
              
              <div className="text-center space-y-1 mb-6">
                <h1 className="text-2xl font-heading font-bold text-foreground leading-tight">
                  SANG PENDIRI
                </h1>
                <h2 className="text-3xl font-heading font-black text-primary leading-tight">
                  TERAS DAKWAH
                </h2>
              </div>
              
              <div className="flex justify-center mb-6">
                <div className="w-48 h-48 rounded-2xl overflow-hidden shadow-2xl border-4 border-accent/50">
                  <img 
                    src={akhidImage} 
                    alt="M. Akhid Subiyanto - Founder Teras Dakwah"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
              
              <div className="text-center">
                <p className="text-foreground text-sm">
                  Muhammad Achid Subiyanto
                </p>
                <p className="text-primary font-semibold text-lg">
                  "Kang Achid"
                </p>
              </div>
            </div>
          </section>

          {/* Bio Section */}
          <section className="py-6 bg-background">
            <div className="px-4">
              <div className="bg-card rounded-xl p-4 border border-border shadow-sm mb-4">
                <p className="text-foreground text-sm leading-relaxed mb-3">
                  <span className="font-bold text-primary">TERAS DAKWAH</span> merupakan salah satu tempat kajian dan sosial di Yogyakarta yang instagramable dengan suasana kafe nan elegan. Desain tempat ini terlihat modern, etnik, dan industrial.
                </p>
                <p className="text-foreground text-sm leading-relaxed">
                  Hal ini tentu tidak lepas dari ide dan gagasan inovatif sang pendiri Teras Dakwah yang memiliki semangat tinggi dalam menebar kebaikan. Dialah <span className="font-bold">Muhammad Achid Subiyanto</span> yang biasa disapa Kang Achid.
                </p>
              </div>

              <div className="bg-card rounded-xl p-4 border border-border shadow-sm mb-4">
                <h3 className="font-heading font-bold text-base text-foreground mb-2">
                  Kelahiran & Keluarga
                </h3>
                <p className="text-foreground text-sm leading-relaxed">
                  Kang Achid lahir di Yogyakarta, <span className="font-bold">14 Mei 1978</span>. Dia merupakan putra sulung dari Bapak Qomarudin dan Ibu Subiastuti. Semangatnya dalam menebarkan kebaikan kepada semua orang termotivasi dari kedua orang tuanya yang juga memiliki latar belakang aktivis. Ayahnya merupakan <span className="font-bold">aktivis Muhammadiyah</span>. Ibunya juga aktif menjadi Ketua Ranting Aisyiyah Nitikan selama 15 tahun.
                </p>
              </div>

              <div className="bg-primary/5 rounded-xl p-4 border-l-4 border-primary mb-4">
                <blockquote className="text-foreground text-sm leading-relaxed italic">
                  "Kala itu, saya melihat Islam begitu sempit. Kita sering menjumpai Islam terpecah belah karena dikotak-kotakkan oleh baju (golongan). Jadi, saya ingin mengadakan kajian Islam yang tidak terkotak-kotakkan oleh golongan,"
                </blockquote>
                <p className="text-primary font-medium text-xs mt-2">
                  — Kang Achid
                </p>
              </div>

              <div className="bg-card rounded-xl p-4 border border-border shadow-sm mb-4">
                <h3 className="font-heading font-bold text-base text-foreground mb-2">
                  Pendidikan
                </h3>
                <p className="text-foreground text-sm leading-relaxed">
                  Pendidikan formal ditempuh mulai dari SDN Giwangan (1984); SMPN 1 Banguntapan (1990); SMAN 1 Pleret (1993); hingga bangku perkuliahan <span className="font-bold">S1 Fakultas Hukum Universitas Muhammadiyah Yogyakarta</span> (1996).
                </p>
              </div>

              <div className="bg-card rounded-xl p-4 border border-border shadow-sm mb-4">
                <h3 className="font-heading font-bold text-base text-foreground mb-3">
                  Pengalaman Organisasi
                </h3>
                <ol className="space-y-2 text-foreground text-xs leading-relaxed">
                  <li className="flex gap-2">
                    <span className="text-primary font-bold">1.</span>
                    <span>Pemuda Muhammadiyah Nitikan tahun 1995.</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-primary font-bold">2.</span>
                    <span>Angkatan Muda Muhammadiyah (AMM) tahun 1998.</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-primary font-bold">3.</span>
                    <span>Ketua Komisaris Fakultas HMI tahun 1997-1998.</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-primary font-bold">4.</span>
                    <span>Ketua BEM tahun 1998-1999.</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-primary font-bold">5.</span>
                    <span>Takmir Masjid Sulthonain bagian kepemudaan tahun 2000.</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-primary font-bold">6.</span>
                    <span>Ketua 2 Pimpinan Ranting Muhammadiyah Nitikan tahun 2005-2010.</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-primary font-bold">7.</span>
                    <span>Ketua Kelompok Sholawat Kanjeng Anom tahun 2000-2010.</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-primary font-bold">8.</span>
                    <span>Ketua Bagian Dakwah Masjid Muthohirin Nitikan tahun 2008-2013.</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-primary font-bold">9.</span>
                    <span><span className="font-bold">Ketua Lembaga Sosial Teras Dakwah</span> tahun 2014-2021.</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-primary font-bold">10.</span>
                    <span><span className="font-bold">Ketua Yayasan Teras Dakwah</span> tahun 2022.</span>
                  </li>
                </ol>
              </div>

              <div className="bg-card rounded-xl p-4 border border-border shadow-sm mb-4">
                <h3 className="font-heading font-bold text-base text-foreground mb-2">
                  Guru-Guru Inspiratif
                </h3>
                <p className="text-foreground text-sm leading-relaxed">
                  Suksesnya Kang Achid dalam mendirikan dan mengembangkan Teras Dakwah tentu juga berkat andil orang lain. <span className="font-bold">Cak Nun</span>, Kang Puji Hartono, Ustadz Mahroji Khudori, Ustadz Zuhrif Hudaya, dan Abah Fanni rahimahullah merupakan sebagian dari guru-guru beliau yang amat menginspirasi dirinya.
                </p>
              </div>

              <div className="bg-accent/10 rounded-xl p-4 border border-accent/30 mb-4">
                <blockquote className="text-foreground text-sm leading-relaxed italic">
                  "Kalau kita bergerak karena Allah, tidak akan berhenti karena manusia,"
                </blockquote>
                <p className="text-accent font-medium text-xs mt-2">
                  — Pesan dari Ustadz Luqmanulhakim Pontianak kepada Kang Achid
                </p>
              </div>

              <div className="bg-card rounded-xl p-4 border border-border shadow-sm">
                <h3 className="font-heading font-bold text-base text-foreground mb-2">
                  Konsep Teras Dakwah
                </h3>
                <p className="text-foreground text-sm leading-relaxed">
                  Pengalamannya dalam berorganisasi membuat dirinya mampu membuat kegiatan yang sesuai dengan perkembangan zaman. Hal ini terlihat dari konsep kajian Teras Dakwah yang selalu asyik dan santai sehingga bisa diterima dengan baik oleh semua kalangan, khususnya anak muda. <span className="font-bold">"Tempat Ngajinya Anak Muda"</span> begitu Teras Dakwah hari ini dikenal.
                </p>
              </div>
            </div>
          </section>
        </main>
        <Footer />
      </div>
    </MobileLayout>
  );
};

export default PengasuhPage;
