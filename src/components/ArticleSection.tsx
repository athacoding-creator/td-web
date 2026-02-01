import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useArticles } from "@/hooks/useArticles";
import { Skeleton } from "@/components/ui/skeleton";
import { format } from "date-fns";
import { id as idLocale } from "date-fns/locale";

const ArticleSection = () => {
  const { data: articles, isLoading } = useArticles();

  // Take only first 3 articles for homepage
  const displayArticles = articles?.slice(0, 3) || [];

  const formatDate = (dateStr: string | null) => {
    if (!dateStr) return "";
    try {
      return format(new Date(dateStr), "MMMM d, yyyy", { locale: idLocale });
    } catch {
      return dateStr;
    }
  };

  return (
    <section id="artikel" className="py-10 bg-background">
      <div className="px-4">
        {/* Header */}
        <div className="text-center mb-6">
          <h2 className="text-2xl font-heading font-semibold text-foreground mb-2">
            Berita dan Artikel Teras Dakwah
          </h2>
          <p className="text-muted-foreground text-xs leading-relaxed">
            Jadilah penyebar cahaya kebaikan. Simak berita dan artikel terbaru dari kami!
          </p>
        </div>

        {/* Article Cards */}
        {isLoading ? (
          <div className="grid grid-cols-1 gap-4">
            {[...Array(3)].map((_, i) => (
              <Skeleton key={i} className="aspect-[16/9] rounded-xl" />
            ))}
          </div>
        ) : displayArticles.length > 0 ? (
          <div className="grid grid-cols-1 gap-4">
            {displayArticles.map((article) => (
              <Link
                key={article.id}
                to={`/artikel/${article.slug}`}
                className="group relative block aspect-[16/9] rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-shadow"
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
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
                
                {/* Category Badge */}
                {article.category && (
                  <div className="absolute top-3 left-3">
                    <span className="bg-destructive text-destructive-foreground text-xs font-semibold px-2.5 py-1 rounded">
                      {article.category.toUpperCase()}
                    </span>
                  </div>
                )}
                
                {/* Content at Bottom */}
                <div className="absolute bottom-0 left-0 right-0 p-4">
                  <h3 className="font-heading font-semibold text-base text-white mb-2 leading-tight line-clamp-2">
                    {article.title}
                  </h3>
                  <div className="flex items-center gap-1.5 text-xs text-white/80">
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
          <div className="text-center text-muted-foreground text-sm py-8">
            Belum ada artikel yang tersedia.
          </div>
        )}

        {/* View All Button */}
        <div className="text-center mt-6">
          <Button variant="outline" size="default" asChild className="w-full">
            <Link to="/artikel">Lihat Semua Artikel</Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default ArticleSection;
