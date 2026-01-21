import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Link, useParams } from "react-router-dom";
import { useState } from "react";
import { Search, Calendar, Share2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useArticle, useArticles } from "@/hooks/useArticles";
import { Skeleton } from "@/components/ui/skeleton";
import { format } from "date-fns";
import { id as idLocale } from "date-fns/locale";

// Social share icons as inline SVGs for better control
const WhatsAppIcon = () => (
  <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
  </svg>
);

const FacebookIcon = () => (
  <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor">
    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
  </svg>
);

const TwitterIcon = () => (
  <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
  </svg>
);

interface ShareButtonsProps {
  title: string;
  url: string;
}

const ShareButtons = ({ title, url }: ShareButtonsProps) => {
  const encodedUrl = encodeURIComponent(url);
  const encodedTitle = encodeURIComponent(title);

  const shareLinks = [
    {
      name: "WhatsApp",
      url: `https://wa.me/?text=${encodedTitle}%20${encodedUrl}`,
      icon: WhatsAppIcon,
      bgColor: "bg-[#25D366] hover:bg-[#20BD5A]",
    },
    {
      name: "Facebook",
      url: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
      icon: FacebookIcon,
      bgColor: "bg-[#1877F2] hover:bg-[#166FE5]",
    },
    {
      name: "Twitter",
      url: `https://twitter.com/intent/tweet?text=${encodedTitle}&url=${encodedUrl}`,
      icon: TwitterIcon,
      bgColor: "bg-black hover:bg-neutral-800",
    },
  ];

  return (
    <div className="flex items-center gap-3">
      <span className="flex items-center gap-1.5 text-sm text-muted-foreground">
        <Share2 className="h-4 w-4" />
        Bagikan:
      </span>
      <div className="flex gap-2">
        {shareLinks.map((link) => (
          <a
            key={link.name}
            href={link.url}
            target="_blank"
            rel="noopener noreferrer"
            className={`${link.bgColor} text-white p-2 rounded-full transition-colors`}
            title={`Bagikan ke ${link.name}`}
          >
            <link.icon />
          </a>
        ))}
      </div>
    </div>
  );
};

const ArtikelDetailPage = () => {
  const { id: slug } = useParams();
  const [searchQuery, setSearchQuery] = useState("");
  
  const { data: article, isLoading: articleLoading, error: articleError } = useArticle(slug || "");
  const { data: allArticles } = useArticles();

  const otherArticles = allArticles?.filter((a) => a.slug !== slug).slice(0, 3) || [];

  const formatDate = (dateStr: string | null) => {
    if (!dateStr) return "";
    try {
      return format(new Date(dateStr), "d MMMM yyyy", { locale: idLocale });
    } catch {
      return dateStr;
    }
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      window.location.href = `/artikel?search=${encodeURIComponent(searchQuery)}`;
    }
  };

  if (articleLoading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1 bg-background">
          <div className="container-narrow py-12 md:py-16">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
              <aside className="lg:col-span-1 order-2 lg:order-1">
                <Skeleton className="h-10 w-full mb-8" />
                <Skeleton className="h-48 w-full" />
              </aside>
              <div className="lg:col-span-2 order-1 lg:order-2">
                <Skeleton className="aspect-video w-full mb-6" />
                <Skeleton className="h-8 w-32 mb-4" />
                <Skeleton className="h-12 w-full mb-6" />
                <Skeleton className="h-64 w-full" />
              </div>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  if (articleError || !article) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1 flex items-center justify-center bg-background">
          <div className="text-center">
            <h1 className="text-2xl font-heading font-bold mb-4">Artikel tidak ditemukan</h1>
            <Link to="/artikel" className="text-primary hover:underline">
              Kembali ke daftar artikel
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 bg-background">
        <div className="container-narrow py-12 md:py-16">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
            {/* Sidebar */}
            <aside className="lg:col-span-1 order-2 lg:order-1">
              {/* Search */}
              <form onSubmit={handleSearch} className="mb-8">
                <div className="relative">
                  <Input
                    type="text"
                    placeholder="Cari Artikel..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pr-12 bg-card border-border"
                  />
                  <Button
                    type="submit"
                    size="icon"
                    className="absolute right-1 top-1/2 -translate-y-1/2 h-8 w-8 bg-primary hover:bg-primary/90"
                  >
                    <Search className="h-4 w-4" />
                  </Button>
                </div>
              </form>

              {/* Other Articles */}
              <div className="mb-8">
                <h3 className="font-heading font-bold text-lg mb-4 text-foreground border-b-2 border-primary pb-2 inline-block">
                  Artikel Lainnya
                </h3>
                <ul className="space-y-3">
                  {otherArticles.map((otherArticle) => (
                    <li key={otherArticle.id}>
                      <Link
                        to={`/artikel/${otherArticle.slug}`}
                        className="text-muted-foreground hover:text-primary transition-colors block py-1"
                      >
                        {otherArticle.title}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Contact CTA */}
              <div className="bg-primary rounded-xl p-6 text-primary-foreground">
                <h3 className="font-heading font-bold text-lg mb-2">
                  Hubungi Kami
                </h3>
                <p className="text-sm opacity-90 mb-4">
                  Untuk informasi lebih lanjut tentang program dan pendaftaran santri baru.
                </p>
                <Link to="/contact">
                  <Button
                    variant="outline"
                    className="w-full bg-transparent border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary"
                  >
                    Kontak Kami
                  </Button>
                </Link>
              </div>
            </aside>

            {/* Main Content */}
            <article className="lg:col-span-2 order-1 lg:order-2">
              {/* Featured Image */}
              <div className="aspect-video bg-secondary/50 rounded-xl mb-6 overflow-hidden">
                {article.image_url ? (
                  <img 
                    src={article.image_url} 
                    alt={article.title}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-primary/10 to-secondary">
                    <span className="text-muted-foreground text-sm">Gambar Artikel</span>
                  </div>
                )}
              </div>

              {/* Date Badge */}
              <div className="flex items-center gap-2 mb-4">
                <span className="inline-flex items-center gap-1.5 text-sm text-primary bg-primary/10 px-3 py-1 rounded-full">
                  <Calendar className="h-3.5 w-3.5" />
                  {formatDate(article.published_at || article.created_at)}
                </span>
                {article.category && (
                  <span className="text-sm font-medium text-accent bg-accent/10 px-3 py-1 rounded-full">
                    {article.category}
                  </span>
                )}
              </div>

              {/* Title */}
              <h1 className="text-2xl md:text-3xl lg:text-4xl font-heading font-bold text-foreground mb-6 leading-tight">
                {article.title}
              </h1>

              {/* Content */}
              <div className="prose prose-lg max-w-none">
                {article.content.split('\n\n').map((paragraph, index) => (
                  <p key={index} className="text-muted-foreground leading-relaxed mb-4">
                    {paragraph}
                  </p>
                ))}
              </div>

              {/* Share Buttons */}
              <div className="mt-8 pt-6 border-t border-border">
                <ShareButtons
                  title={article.title}
                  url={typeof window !== "undefined" ? window.location.href : ""}
                />
              </div>

              {/* Back Link */}
              <div className="mt-6">
                <Link
                  to="/artikel"
                  className="inline-flex items-center text-sm text-primary hover:text-primary/80 font-medium transition-colors"
                >
                  ← Kembali ke Daftar Artikel
                </Link>
              </div>
            </article>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default ArtikelDetailPage;
