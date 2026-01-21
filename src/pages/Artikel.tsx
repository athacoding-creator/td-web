import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Link } from "react-router-dom";
import { Calendar } from "lucide-react";

interface Article {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  date: string;
  category: string;
}

const allArticles: Article[] = [
  {
    id: "keutamaan-sedekah",
    title: "Keutamaan Sedekah dalam Islam",
    excerpt: "Sedekah memiliki kedudukan istimewa dalam Islam. Rasulullah SAW bersabda bahwa sedekah tidak akan mengurangi harta...",
    content: `Sedekah memiliki kedudukan istimewa dalam Islam...`,
    date: "15 Januari 2026",
    category: "Fiqih",
  },
  {
    id: "adab-menuntut-ilmu",
    title: "Adab Menuntut Ilmu Menurut Ulama Salaf",
    excerpt: "Para ulama salaf sangat memperhatikan adab dalam menuntut ilmu. Imam Malik rahimahullah berkata...",
    content: `Para ulama salaf sangat memperhatikan adab dalam menuntut ilmu...`,
    date: "12 Januari 2026",
    category: "Akhlak",
  },
  {
    id: "hikmah-shalat-berjamaah",
    title: "Hikmah di Balik Shalat Berjamaah",
    excerpt: "Shalat berjamaah memiliki keutamaan 27 derajat dibanding shalat sendirian. Selain pahala yang berlipat...",
    content: `Shalat berjamaah memiliki keutamaan 27 derajat...`,
    date: "10 Januari 2026",
    category: "Ibadah",
  },
  {
    id: "menjaga-lisan",
    title: "Pentingnya Menjaga Lisan",
    excerpt: "Lisan adalah nikmat besar yang diberikan Allah kepada manusia. Namun jika tidak dijaga, lisan bisa menjadi sumber keburukan...",
    content: `Lisan adalah nikmat besar yang diberikan Allah kepada manusia...`,
    date: "8 Januari 2026",
    category: "Akhlak",
  },
  {
    id: "keberkahan-waktu-pagi",
    title: "Keberkahan Waktu Pagi",
    excerpt: "Rasulullah SAW mendoakan keberkahan untuk umatnya di waktu pagi. Banyak keutamaan yang bisa kita raih...",
    content: `Rasulullah SAW mendoakan keberkahan untuk umatnya di waktu pagi...`,
    date: "5 Januari 2026",
    category: "Ibadah",
  },
];

const ArtikelPage = () => {
  // List view
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        {/* Hero */}
        <section className="py-16 md:py-24 bg-secondary/30">
          <div className="container-narrow text-center">
            <h1 className="text-4xl md:text-5xl font-heading font-bold text-foreground mb-4">
              Artikel
            </h1>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Kumpulan artikel tentang dakwah, fiqih, akhlak, dan berbagai tema keislaman lainnya
            </p>
          </div>
        </section>

        {/* Article List */}
        <section className="py-12 md:py-16 bg-background">
          <div className="container-narrow">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {allArticles.map((article) => (
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
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default ArtikelPage;
