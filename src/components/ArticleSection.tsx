import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useArticles } from "@/hooks/useArticles";
import { Skeleton } from "@/components/ui/skeleton";
import { Calendar } from "lucide-react";
import { format } from "date-fns";
import { id as idLocale } from "date-fns/locale";

const ArticleSection = () => {
  const { data: articles, isLoading } = useArticles();

  // Take only first 3 articles for homepage
  const displayArticles = articles?.slice(0, 3) || [];

  const formatDate = (dateStr: string | null) => {
    if (!dateStr) return "";
    try {
      return format(new Date(dateStr), "d MMMM yyyy", { locale: idLocale });
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

        {/* Article Cards - Compact Version */}
        {isLoading ? (
          <div className="space-y-3">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="flex gap-3">
                <Skeleton className="w-24 h-24 rounded-lg flex-shrink-0" />
                <div className="flex-1 space-y-2">
                  <Skeleton className="h-3 w-20" />
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-3 w-3/4" />
                </div>
              </div>
            ))}
          </div>
        ) : displayArticles.length > 0 ? (
          <div className="space-y-3">
            {displayArticles.map((article) => (
              <Link
                key={article.id}
                to={`/artikel/${article.slug}`}
                className="group flex gap-3 bg-card border border-border rounded-lg overflow-hidden hover:shadow-md transition-all duration-300"
              >
                {/* Image on Left - Square, Full Display */}
                <div className="w-24 h-24 flex-shrink-0 bg-muted overflow-hidden">
                  {article.image_url ? (
                    <img 
                      src={article.image_url} 
                      alt={article.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" 
                    />
                  ) : (
                    <div className="w-full h-full bg-gradient-to-br from-primary/20 to-secondary/20" />
                  )}
                </div>
                
                {/* Content on Right - Compact */}
                <div className="flex-1 py-2.5 pr-3 flex flex-col justify-center min-w-0">
                  {/* Date */}
                  <div className="flex items-center gap-1 text-xs text-muted-foreground mb-1.5">
                    <Calendar className="w-3 h-3" />
                    <span className="text-xs">{formatDate(article.published_at || article.created_at)}</span>
                  </div>
                  
                  {/* Title */}
                  <h3 className="font-heading font-semibold text-sm text-foreground leading-tight line-clamp-2 mb-1.5 group-hover:text-primary transition-colors">
                    {article.title}
                  </h3>
                  
                  {/* Excerpt */}
                  <p className="text-xs text-muted-foreground leading-relaxed line-clamp-2">
                    {article.excerpt || "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque luctus magna ut vulputate pretium."}
                  </p>
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
