import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Link } from "react-router-dom";
import { useArticles } from "@/hooks/useArticles";
import { Skeleton } from "@/components/ui/skeleton";
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
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        {/* Hero */}
        <section className="py-16 md:py-24 bg-secondary/30">
          <div className="container-narrow text-center">
            <h1 className="text-4xl md:text-5xl font-heading font-bold text-foreground mb-4">
              Berita dan Artikel Teras Dakwah
            </h1>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Jadilah penyebar cahaya kebaikan. Simak berita dan artikel terbaru dari kami!
            </p>
          </div>
        </section>

        {/* Article List */}
        <section className="py-12 md:py-16 bg-background">
          <div className="container-narrow">
            {isLoading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[...Array(6)].map((_, i) => (
                  <Skeleton key={i} className="aspect-[3/4] rounded-lg" />
                ))}
              </div>
            ) : error ? (
              <div className="text-center text-muted-foreground py-12">
                Gagal memuat artikel. Silakan coba lagi nanti.
              </div>
            ) : articles && articles.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {articles.map((article) => (
                  <Link
                    key={article.id}
                    to={`/artikel/${article.slug}`}
                    className="group relative block aspect-[3/4] rounded-lg overflow-hidden"
                  >
                    {/* Background Image */}
                    <div 
                      className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-105"
                      style={{ 
                        backgroundImage: article.image_url 
                          ? `url(${article.image_url})` 
                          : "linear-gradient(135deg, hsl(var(--primary)) 0%, hsl(var(--secondary)) 100%)" 
                      }}
                    />
                    
                    {/* Dark Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />
                    
                    {/* Category Badge */}
                    {article.category && (
                      <div className="absolute top-4 left-4">
                        <span className="bg-red-600 text-white text-xs font-semibold px-3 py-1.5 rounded">
                          {article.category.toUpperCase()}
                        </span>
                      </div>
                    )}
                    
                    {/* Content at Bottom */}
                    <div className="absolute bottom-0 left-0 right-0 p-5">
                      <h3 className="font-heading font-semibold text-lg text-white mb-3 leading-tight">
                        {article.title}
                      </h3>
                      <div className="flex items-center gap-2 text-sm text-white/80">
                        <span>By</span>
                        <span className="underline">{article.author || "Trsdkwh"}</span>
                        <span>.</span>
                        <span>{formatDate(article.published_at || article.created_at)}</span>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            ) : (
              <div className="text-center text-muted-foreground py-12">
                Belum ada artikel yang tersedia.
              </div>
            )}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default ArtikelPage;
