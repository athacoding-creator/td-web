import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

interface Article {
  id: string;
  title: string;
  author: string;
  date: string;
  category?: string;
  image: string;
}

const articles: Article[] = [
  {
    id: "sedekah-menanam-kebaikan",
    title: "Sedekah: Bukan Sekadar Memberi, Tapi Menanam Kebaikan",
    author: "Trsdkwh",
    date: "August 14, 2025",
    category: "DAILY MUSLIM",
    image: "https://images.unsplash.com/photo-1532629345422-7515f3d16bb6?w=600&h=800&fit=crop",
  },
  {
    id: "dakwah-mengajak-dengan-hati",
    title: "Dakwah: Mengajak Dengan Hati, Bukan Memaksa",
    author: "Trsdkwh",
    date: "August 14, 2025",
    image: "https://images.unsplash.com/photo-1585036156171-384164a8c675?w=600&h=800&fit=crop",
  },
  {
    id: "mengenal-fiqih",
    title: "Mengenal Fiqih: Panduan Hidup Seorang Muslim",
    author: "Trsdkwh",
    date: "August 14, 2025",
    image: "https://images.unsplash.com/photo-1609599006353-e629aaabfeae?w=600&h=800&fit=crop",
  },
];

const ArticleSection = () => {
  return (
    <section id="artikel" className="py-16 md:py-24 bg-background">
      <div className="container-narrow">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-heading font-bold text-foreground mb-4">
            Berita dan Artikel Teras Dakwah
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Jadilah penyebar cahaya kebaikan. Simak berita dan artikel terbaru dari kami!
          </p>
        </div>

        {/* Article Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {articles.map((article) => (
            <Link
              key={article.id}
              to={`/artikel/${article.id}`}
              className="group relative block aspect-[3/4] rounded-lg overflow-hidden"
            >
              {/* Background Image */}
              <div 
                className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-105"
                style={{ backgroundImage: `url(${article.image})` }}
              />
              
              {/* Dark Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />
              
              {/* Category Badge */}
              {article.category && (
                <div className="absolute top-4 left-4">
                  <span className="bg-red-600 text-white text-xs font-semibold px-3 py-1.5 rounded">
                    {article.category}
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
                  <span className="underline">{article.author}</span>
                  <span>.</span>
                  <span>{article.date}</span>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* View All Button */}
        <div className="text-center mt-10">
          <Button variant="outline" size="lg" asChild>
            <Link to="/artikel">Lihat Semua Artikel</Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default ArticleSection;
