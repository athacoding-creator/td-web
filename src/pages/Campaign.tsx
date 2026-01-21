import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Link } from "react-router-dom";
import { useCampaigns } from "@/hooks/useCampaigns";
import { Skeleton } from "@/components/ui/skeleton";

const CampaignPage = () => {
  const { data: campaigns, isLoading, error } = useCampaigns();

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
            {isLoading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[...Array(6)].map((_, i) => (
                  <Skeleton key={i} className="h-[250px] rounded-xl" />
                ))}
              </div>
            ) : error ? (
              <div className="text-center text-muted-foreground py-12">
                Gagal memuat campaign. Silakan coba lagi nanti.
              </div>
            ) : campaigns && campaigns.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {campaigns.map((campaign) => (
                  <div
                    key={campaign.id}
                    className="bg-card rounded-xl border border-border overflow-hidden hover:shadow-lg transition-shadow duration-300"
                  >
                    {campaign.image_url && (
                      <div className="aspect-video overflow-hidden">
                        <img
                          src={campaign.image_url}
                          alt={campaign.title}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    )}
                    <div className="p-6">
                      <div className="flex items-center justify-between mb-4">
                        <span className="inline-block px-3 py-1 text-xs font-medium rounded-full bg-accent/20 text-accent-foreground">
                          {campaign.status || "Aktif"}
                        </span>
                      </div>
                      <h3 className="font-heading font-semibold text-xl mb-3 text-foreground">
                        {campaign.title}
                      </h3>
                      <p className="text-muted-foreground text-sm leading-relaxed mb-4">
                        {campaign.description}
                      </p>
                      {campaign.target && (
                        <div className="pt-4 border-t border-border">
                          <p className="text-sm text-muted-foreground">
                            Target: <span className="font-medium text-foreground">{campaign.target}</span>
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center text-muted-foreground py-12">
                Belum ada campaign yang tersedia.
              </div>
            )}
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
