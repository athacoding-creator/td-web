import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

interface Article {
  id: string;
  title: string;
  excerpt: string;
  date: string;
  category: string;
}

const articles: Article[] = [
  {
    id: "keutamaan-sedekah",
    title: "Keutamaan Sedekah dalam Islam",
    excerpt: "Sedekah memiliki kedudukan istimewa dalam Islam. Rasulullah SAW bersabda bahwa sedekah tidak akan mengurangi harta...",
    date: "15 Januari 2026",
    category: "Fiqih",
  },
  {
    id: "adab-menuntut-ilmu",
    title: "Adab Menuntut Ilmu Menurut Ulama Salaf",
    excerpt: "Para ulama salaf sangat memperhatikan adab dalam menuntut ilmu. Imam Malik rahimahullah berkata...",
    date: "12 Januari 2026",
    category: "Akhlak",
  },
  {
    id: "hikmah-shalat-berjamaah",
    title: "Hikmah di Balik Shalat Berjamaah",
    excerpt: "Shalat berjamaah memiliki keutamaan 27 derajat dibanding shalat sendirian. Selain pahala yang berlipat...",
    date: "10 Januari 2026",
    category: "Ibadah",
  },
];

const ArticleSection = () => {
  return (
    <section id="artikel" className="py-16 md:py-24 bg-background">
      <div className="container-narrow">
        <h2 className="section-title mb-12">Artikel Terbaru</h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {articles.map((article) => (
            <article
              key={article.id}
              className="bg-card rounded-xl border border-border overflow-hidden hover:shadow-lg transition-shadow duration-300"
            >
              <div className="p-6">
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-xs text-muted-foreground">{article.date}</span>
                  <span className="w-1 h-1 rounded-full bg-muted-foreground" />
                  <span className="text-xs font-medium text-primary">{article.category}</span>
                </div>
                <h3 className="font-heading font-semibold text-lg mb-3 text-foreground line-clamp-2">
                  {article.title}
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed line-clamp-3 mb-4">
                  {article.excerpt}
                </p>
                <Link
                  to={`/artikel/${article.id}`}
                  className="text-sm font-medium text-primary hover:text-primary/80 transition-colors"
                >
                  Baca Selengkapnya →
                </Link>
              </div>
            </article>
          ))}
        </div>

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
