import Header from "@/components/Header";
import Footer from "@/components/Footer";
import MobileLayout from "@/components/MobileLayout";
import SEOHead from "@/components/SEOHead";
import { Link } from "react-router-dom";
import { useArticles } from "@/hooks/useArticles";
import { Skeleton } from "@/components/ui/skeleton";
import { Calendar } from "lucide-react";
import { format } from "date-fns";
import { id as idLocale } from "date-fns/locale";

const ArtikelPage = () => {
  const { data: articles, isLoading, error } = useArticles();

  const formatDate = (dateStr: string | null) => {
    if (!dateStr) return "";
    try {
      return format(new Date(dateStr), "d MMMM yyyy", { locale: idLocale });
    } catch {
      return dateStr;
    }
  };

  return (
    <MobileLayout>
      <div className="min-h-screen flex flex-col">
        <SEOHead
          title="Berita dan Artikel Teras Dakwah"
          description="Kumpulan berita, artikel, dan kajian Islam dari Yayasan Teras Dakwah Indonesia. Jadilah penyebar cahaya kebaikan!"
          keywords="artikel islam, kajian islam, berita dakwah, teras dakwah, sedekah, kebaikan"
          url="/artikel"
        />
        <Header />
        <main className="flex-1">
          {/* Hero */}
          <section className="py-12 bg-gradient-to-b from-primary/5 to-background">
            <div className="px-4 text-center">
              <h1 className="text-3xl font-heading font-bold text-foreground mb-3">
                Berita dan Artikel
              </h1>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Jadilah penyebar cahaya kebaikan. Simak berita dan artikel terbaru dari kami!
              </p>
            </div>
          </section>

          {/* Article List */}
          <section className="py-8 bg-background">
            <div className="px-4">
              {isLoading ? (
                <div className="space-y-4">
                  {[...Array(6)].map((_, i) => (
                    <div key={i} className="flex gap-3">
                      <Skeleton className="w-32 h-24 rounded-lg flex-shrink-0" />
                      <div className="flex-1 space-y-2">
                        <Skeleton className="h-4 w-full" />
                        <Skeleton className="h-3 w-3/4" />
                        <Skeleton className="h-3 w-1/2" />
                      </div>
                    </div>
                  ))}
                </div>
              ) : error ? (
                <div className="text-center text-muted-foreground py-12 text-sm">
                  Gagal memuat artikel. Silakan coba lagi nanti.
                </div>
              ) : articles && articles.length > 0 ? (
                <div className="space-y-4">
                  {articles.map((article) => (
                    <Link
                      key={article.id}
                      to={`/artikel/${article.slug}`}
                      className="group flex gap-3 bg-card border border-border rounded-lg overflow-hidden hover:shadow-md transition-all duration-300"
                    >
                      {/* Image on Left */}
                      <div className="w-32 h-24 flex-shrink-0 bg-muted overflow-hidden relative">
                        {article.image_url ? (
                          <img 
                            src={article.image_url} 
                            alt={article.title}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" 
                          />
                        ) : (
                          <div className="w-full h-full bg-gradient-to-br from-primary/20 to-secondary/20" />
                        )}
                        {/* Category Badge */}
                        {article.category && (
                          <div className="absolute top-2 left-2">
                            <span className="bg-primary text-primary-foreground text-[10px] font-semibold px-2 py-0.5 rounded">
                              {article.category.toUpperCase()}
                            </span>
                          </div>
                        )}
                      </div>
                      
                      {/* Content on Right */}
                      <div className="flex-1 py-3 pr-3 flex flex-col justify-between min-w-0">
                        {/* Date */}
                        <div className="flex items-center gap-1.5 text-xs text-muted-foreground mb-2">
                          <Calendar className="w-3 h-3" />
                          <span>{formatDate(article.published_at || article.created_at)}</span>
                        </div>
                        
                        {/* Title */}
                        <h3 className="font-heading font-semibold text-sm text-foreground leading-tight line-clamp-2 mb-2 group-hover:text-primary transition-colors">
                          {article.title}
                        </h3>
                        
                        {/* Excerpt */}
                        <p className="text-xs text-muted-foreground leading-relaxed line-clamp-2">
                          {article.excerpt || "Baca artikel lengkap untuk mengetahui lebih lanjut tentang topik ini."}
                        </p>
                      </div>
                    </Link>
                  ))}
                </div>
              ) : (
                <div className="text-center text-muted-foreground py-12 text-sm">
                  Belum ada artikel yang tersedia.
                </div>
              )}
            </div>
          </section>
        </main>
        <Footer />
      </div>
    </MobileLayout>
  );
};

export default ArtikelPage;
