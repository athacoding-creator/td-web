import Header from "@/components/Header";
import Footer from "@/components/Footer";
import MobileLayout from "@/components/MobileLayout";
import SEOHead from "@/components/SEOHead";
import ArticleStructuredData from "@/components/ArticleStructuredData";
import ArticleContent from "@/components/ArticleContent";
import ReadingTime from "@/components/ReadingTime";
import TableOfContents from "@/components/TableOfContents";
import ReadingProgress from "@/components/ReadingProgress";
import { Link, useParams, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import { Search, Calendar, Share2, User, Link2, Check } from "lucide-react";
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
  const [copied, setCopied] = useState(false);
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

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  return (
    <div className="bg-secondary/50 rounded-xl p-6 border border-border">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="flex items-center gap-3">
          <span className="flex items-center gap-2 text-sm font-medium text-foreground">
            <Share2 className="h-4 w-4" />
            Bagikan Artikel:
          </span>
          <div className="flex gap-2">
            {shareLinks.map((link) => (
              <a
                key={link.name}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className={`${link.bgColor} text-white p-2.5 rounded-full transition-all hover:scale-110 shadow-sm`}
                title={`Bagikan ke ${link.name}`}
              >
                <link.icon />
              </a>
            ))}
          </div>
        </div>
        <Button
          onClick={copyToClipboard}
          variant="outline"
          size="sm"
          className="gap-2"
        >
          {copied ? (
            <>
              <Check className="h-4 w-4" />
              Tersalin!
            </>
          ) : (
            <>
              <Link2 className="h-4 w-4" />
              Salin Link
            </>
          )}
        </Button>
      </div>
    </div>
  );
};

const ArtikelDetailPage = () => {
  const { id: slug } = useParams();
  const location = useLocation();
  const [searchQuery, setSearchQuery] = useState("");
  
  const { data: article, isLoading: articleLoading, error: articleError } = useArticle(slug || "");
  const { data: allArticles } = useArticles();

  // Get related articles by category
  const relatedArticles = allArticles
    ?.filter((a) => a.slug !== slug && a.category === article?.category)
    .slice(0, 3) || [];
  
  // If not enough related by category, fill with other articles
  const otherArticles = relatedArticles.length < 3
    ? [...relatedArticles, ...allArticles?.filter((a) => a.slug !== slug && a.category !== article?.category).slice(0, 3 - relatedArticles.length) || []]
    : relatedArticles;
  
  // SEO meta information
  const seoTitle = article?.meta_title || article?.title || "Artikel";
  const seoDescription = article?.meta_description || article?.excerpt || article?.content?.substring(0, 160) || "";
  const seoKeywords = article?.meta_keywords || `${article?.category || ""}, dakwah, islam, teras dakwah`;
  const seoImage = article?.image_url || "";
  const publishedTime = article?.published_at || article?.created_at || "";
  const modifiedTime = article?.updated_at || "";

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

  // Add IDs to headings for table of contents
  useEffect(() => {
    if (article?.content) {
      const headingRegex = /^(#{2,4})\s+(.+)$/gm;
      let match;
      const headingIds: { text: string; id: string }[] = [];

      while ((match = headingRegex.exec(article.content)) !== null) {
        const text = match[2].trim();
        const id = text
          .toLowerCase()
          .replace(/[^a-z0-9\s-]/g, '')
          .replace(/\s+/g, '-');
        headingIds.push({ text, id });
      }

      // Add IDs to actual heading elements after render
      setTimeout(() => {
        headingIds.forEach(({ text, id }) => {
          const headings = document.querySelectorAll('h2, h3, h4');
          headings.forEach((heading) => {
            if (heading.textContent?.trim() === text) {
              heading.id = id;
            }
          });
        });
      }, 100);
    }
  }, [article]);

  if (articleLoading) {
    return (
      <MobileLayout>
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
      </MobileLayout>
    );
  }

  if (articleError || !article) {
    return (
      <MobileLayout>
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
      </MobileLayout>
    );
  }

  return (
    <MobileLayout>
      <div className="min-h-screen flex flex-col">
      <ReadingProgress />
      <SEOHead
        title={seoTitle}
        description={seoDescription}
        keywords={seoKeywords}
        image={seoImage}
        url={location.pathname}
        type="article"
        author={article?.author || "Teras Dakwah"}
        publishedTime={publishedTime}
        modifiedTime={modifiedTime}
        section={article?.category || undefined}
      />
      <ArticleStructuredData
        title={seoTitle}
        description={seoDescription}
        image={seoImage}
        author={article?.author || "Teras Dakwah"}
        publishedTime={publishedTime}
        modifiedTime={modifiedTime}
        url={location.pathname}
      />
      <Header />
      <main className="flex-1 bg-background">
        <div className="container max-w-7xl mx-auto px-4 py-12 md:py-16">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
            {/* Sidebar */}
            <aside className="lg:col-span-3 order-2 lg:order-1 space-y-6">
              {/* Search */}
              <div>
                <form onSubmit={handleSearch}>
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
              </div>

              {/* Table of Contents - Desktop Only */}
              <div className="hidden lg:block">
                <TableOfContents content={article.content} />
              </div>

              {/* Other Articles */}
              <div className="bg-card border border-border rounded-lg p-4">
                <h3 className="font-heading font-bold text-sm mb-4 text-foreground border-b border-border pb-2">
                  {relatedArticles.length > 0 ? "Artikel Terkait" : "Artikel Lainnya"}
                </h3>
                <ul className="space-y-4">
                  {otherArticles.map((otherArticle) => (
                    <li key={otherArticle.id}>
                      <Link
                        to={`/artikel/${otherArticle.slug}`}
                        className="group block"
                      >
                        {otherArticle.image_url && (
                          <div className="aspect-video bg-secondary rounded-lg mb-2 overflow-hidden">
                            <img
                              src={otherArticle.image_url}
                              alt={otherArticle.title}
                              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                            />
                          </div>
                        )}
                        <h4 className="text-sm font-medium text-foreground group-hover:text-primary transition-colors line-clamp-2">
                          {otherArticle.title}
                        </h4>
                        {otherArticle.category && (
                          <span className="text-xs text-muted-foreground mt-1 inline-block">
                            {otherArticle.category}
                          </span>
                        )}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Contact CTA */}
              <div className="bg-gradient-to-br from-primary to-primary/80 rounded-xl p-6 text-primary-foreground shadow-lg">
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
            <article className="lg:col-span-9 order-1 lg:order-2">
              {/* Featured Image */}
              <div className="aspect-video bg-secondary/50 rounded-2xl mb-8 overflow-hidden shadow-xl">
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

              {/* Article Meta */}
              <div className="flex flex-wrap items-center gap-3 mb-6">
                <span className="inline-flex items-center gap-1.5 text-sm text-primary bg-primary/10 px-3 py-1.5 rounded-full font-medium">
                  <Calendar className="h-3.5 w-3.5" />
                  {formatDate(article.published_at || article.created_at)}
                </span>
                {article.category && (
                  <span className="text-sm font-medium text-accent bg-accent/10 px-3 py-1.5 rounded-full">
                    {article.category}
                  </span>
                )}
                <ReadingTime content={article.content} />
                {article.author && (
                  <span className="inline-flex items-center gap-1.5 text-sm text-muted-foreground">
                    <User className="h-3.5 w-3.5" />
                    {article.author}
                  </span>
                )}
              </div>

              {/* Title */}
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold text-foreground mb-8 leading-tight">
                {article.title}
              </h1>

              {/* Excerpt */}
              {article.excerpt && (
                <div className="bg-secondary/30 border-l-4 border-primary pl-6 pr-4 py-4 mb-8 rounded-r-lg">
                  <p className="text-lg text-muted-foreground italic leading-relaxed">
                    {article.excerpt}
                  </p>
                </div>
              )}

              {/* Mobile Table of Contents */}
              <div className="lg:hidden mb-8">
                <TableOfContents content={article.content} />
              </div>

              {/* Content */}
              <ArticleContent content={article.content} />

              {/* Share Buttons */}
              <div className="mt-12">
                <ShareButtons
                  title={article.title}
                  url={typeof window !== "undefined" ? window.location.href : ""}
                />
              </div>

              {/* Navigation */}
              <div className="mt-8 pt-8 border-t border-border flex justify-between items-center">
                <Link
                  to="/artikel"
                  className="inline-flex items-center text-sm text-primary hover:text-primary/80 font-medium transition-colors"
                >
                  ← Kembali ke Daftar Artikel
                </Link>
                <Button
                  onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                  variant="outline"
                  size="sm"
                >
                  ↑ Kembali ke Atas
                </Button>
              </div>
            </article>
          </div>
        </div>
      </main>
      <Footer />
      </div>
    </MobileLayout>
  );
};

export default ArtikelDetailPage;
