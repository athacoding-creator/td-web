import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Link } from "react-router-dom";

interface Campaign {
  id: string;
  title: string;
  description: string;
  target: string;
  status: string;
}

const campaigns: Campaign[] = [
  {
    id: "ramadhan-berkah",
    title: "Ramadhan Berkah 1447 H",
    description: "Program berbagi kebahagiaan di bulan suci Ramadhan melalui pembagian sembako, takjil, dan santunan untuk dhuafa dan anak yatim.",
    target: "1000 Penerima Manfaat",
    status: "Sedang Berjalan",
  },
  {
    id: "qurban-peduli",
    title: "Qurban Peduli Desa",
    description: "Penyaluran hewan qurban ke desa-desa pelosok yang jarang mendapat akses daging qurban. Setiap qurban akan didistribusikan langsung kepada masyarakat yang membutuhkan.",
    target: "50 Desa",
    status: "Pendaftaran Dibuka",
  },
  {
    id: "beasiswa-penghafal",
    title: "Beasiswa Penghafal Quran",
    description: "Program beasiswa untuk santri penghafal Al-Quran yang berasal dari keluarga kurang mampu. Beasiswa meliputi biaya pendidikan dan kebutuhan sehari-hari.",
    target: "100 Santri",
    status: "Sedang Berjalan",
  },
  {
    id: "wakaf-quran",
    title: "Wakaf Al-Quran",
    description: "Distribusi mushaf Al-Quran ke masjid-masjid, musholla, dan pesantren di berbagai daerah yang membutuhkan. Satu Quran, ribuan pahala.",
    target: "5000 Mushaf",
    status: "Sedang Berjalan",
  },
  {
    id: "pembangunan-masjid",
    title: "Pembangunan Masjid Desa",
    description: "Membantu pembangunan dan renovasi masjid di desa-desa terpencil agar masyarakat dapat beribadah dengan nyaman dan khusyuk.",
    target: "10 Masjid",
    status: "Pengumpulan Dana",
  },
];

const CampaignPage = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        {/* Hero */}
        <section className="py-16 md:py-24 bg-secondary/30">
          <div className="container-narrow text-center">
            <h1 className="text-4xl md:text-5xl font-heading font-bold text-foreground mb-4">
              Campaign Dakwah
            </h1>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Bergabunglah dalam berbagai campaign kebaikan untuk mendukung dakwah dan membantu sesama
            </p>
          </div>
        </section>

        {/* Campaign List */}
        <section className="py-12 md:py-16 bg-background">
          <div className="container-narrow">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {campaigns.map((campaign) => (
                <div
                  key={campaign.id}
                  className="bg-card rounded-xl border border-border overflow-hidden hover:shadow-lg transition-shadow duration-300"
                >
                  <div className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <span className="inline-block px-3 py-1 text-xs font-medium rounded-full bg-accent/20 text-accent-foreground">
                        {campaign.status}
                      </span>
                    </div>
                    <h3 className="font-heading font-semibold text-xl mb-3 text-foreground">
                      {campaign.title}
                    </h3>
                    <p className="text-muted-foreground text-sm leading-relaxed mb-4">
                      {campaign.description}
                    </p>
                    <div className="pt-4 border-t border-border">
                      <p className="text-sm text-muted-foreground">
                        Target: <span className="font-medium text-foreground">{campaign.target}</span>
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-12 md:py-16 cta-gradient">
          <div className="container-narrow text-center">
            <h2 className="text-2xl md:text-3xl font-heading font-bold text-primary-foreground mb-4">
              Ingin Mendukung Campaign?
            </h2>
            <p className="text-primary-foreground/90 mb-6 max-w-xl mx-auto">
              Hubungi kami untuk informasi lebih lanjut tentang cara berpartisipasi dalam campaign-campaign kebaikan.
            </p>
            <Link
              to="/contact"
              className="inline-flex items-center justify-center h-11 px-8 rounded-md bg-amber-500 text-amber-950 hover:bg-amber-400 font-semibold shadow-lg transition-colors"
            >
              Hubungi Kami
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default CampaignPage;
