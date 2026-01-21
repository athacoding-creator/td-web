import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Link } from "react-router-dom";

interface Article {
  id: string;
  title: string;
  author: string;
  date: string;
  category?: string;
  image: string;
}

const allArticles: Article[] = [
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
  {
    id: "keutamaan-sedekah",
    title: "Keutamaan Sedekah dalam Islam",
    author: "Trsdkwh",
    date: "15 Januari 2026",
    category: "FIQIH",
    image: "https://images.unsplash.com/photo-1469571486292-0ba58a3f068b?w=600&h=800&fit=crop",
  },
  {
    id: "adab-menuntut-ilmu",
    title: "Adab Menuntut Ilmu Menurut Ulama Salaf",
    author: "Trsdkwh",
    date: "12 Januari 2026",
    category: "AKHLAK",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&h=800&fit=crop",
  },
  {
    id: "hikmah-shalat-berjamaah",
    title: "Hikmah di Balik Shalat Berjamaah",
    author: "Trsdkwh",
    date: "10 Januari 2026",
    category: "IBADAH",
    image: "https://images.unsplash.com/photo-1564769625905-50e93615e769?w=600&h=800&fit=crop",
  },
];

const ArtikelPage = () => {
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
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {allArticles.map((article) => (
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
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default ArtikelPage;
