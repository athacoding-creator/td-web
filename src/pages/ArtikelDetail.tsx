import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Link, useParams } from "react-router-dom";
import { useState } from "react";
import { Search, Calendar, Share2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

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

interface Article {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  date: string;
  category: string;
  image?: string;
}

const allArticles: Article[] = [
  {
    id: "keutamaan-sedekah",
    title: "Keutamaan Sedekah dalam Islam",
    excerpt: "Sedekah memiliki kedudukan istimewa dalam Islam. Rasulullah SAW bersabda bahwa sedekah tidak akan mengurangi harta...",
    content: `Sedekah memiliki kedudukan istimewa dalam Islam. Rasulullah SAW bersabda bahwa sedekah tidak akan mengurangi harta, bahkan justru menambah keberkahan di dalamnya.

Dalam hadits riwayat Muslim, Rasulullah SAW bersabda: "Sedekah itu tidak akan mengurangi harta. Allah tidak akan menambah seorang hamba yang suka memaafkan kecuali kemuliaan. Dan tidaklah seseorang merendahkan diri karena Allah kecuali Allah akan meninggikan derajatnya."

Ada beberapa keutamaan sedekah yang perlu kita ketahui:

1. Sedekah dapat menghapus dosa sebagaimana air memadamkan api.
2. Sedekah akan menjadi naungan di hari kiamat.
3. Sedekah dapat menyembuhkan penyakit.
4. Sedekah dapat menolak bala dan musibah.
5. Sedekah membawa keberkahan dalam rezeki.

Semoga kita semua dimudahkan untuk selalu bersedekah.`,
    date: "15 Januari 2026",
    category: "Fiqih",
  },
  {
    id: "adab-menuntut-ilmu",
    title: "Adab Menuntut Ilmu Menurut Ulama Salaf",
    excerpt: "Para ulama salaf sangat memperhatikan adab dalam menuntut ilmu. Imam Malik rahimahullah berkata...",
    content: `Para ulama salaf sangat memperhatikan adab dalam menuntut ilmu. Imam Malik rahimahullah berkata bahwa adab lebih utama dibanding ilmu itu sendiri.

Berikut beberapa adab menuntut ilmu yang diajarkan oleh para ulama:

1. Ikhlas karena Allah - Niat menuntut ilmu haruslah murni untuk mencari ridha Allah, bukan untuk popularitas atau jabatan.

2. Tawadhu kepada guru - Merendahkan diri di hadapan guru adalah kunci mendapatkan ilmu yang bermanfaat.

3. Sabar dan tekun - Ilmu tidak datang dalam sekejap, butuh proses dan kesabaran yang panjang.

4. Mengamalkan ilmu - Ilmu yang tidak diamalkan akan menjadi hujjah di hari kiamat.

5. Mendoakan guru - Setelah selesai belajar, jangan lupa mendoakan kebaikan untuk guru.

Semoga kita semua diberi taufiq untuk menuntut ilmu dengan adab yang baik.`,
    date: "12 Januari 2026",
    category: "Akhlak",
  },
  {
    id: "hikmah-shalat-berjamaah",
    title: "Hikmah di Balik Shalat Berjamaah",
    excerpt: "Shalat berjamaah memiliki keutamaan 27 derajat dibanding shalat sendirian. Selain pahala yang berlipat...",
    content: `Shalat berjamaah memiliki keutamaan 27 derajat dibanding shalat sendirian. Selain pahala yang berlipat, ada banyak hikmah lain yang terkandung di dalamnya.

Hikmah shalat berjamaah antara lain:

1. Mempererat ukhuwah islamiyah - Dengan berkumpul setiap hari di masjid, umat Muslim bisa saling mengenal dan mempererat persaudaraan.

2. Melatih disiplin - Shalat berjamaah mengajarkan kita untuk disiplin waktu karena harus hadir sebelum iqamah.

3. Menyatukan hati umat - Ketika berdiri dalam satu shaf, tidak ada perbedaan status sosial.

4. Mendapat rahmat Allah - Tempat berkumpulnya orang-orang yang berzikir akan dilingkupi rahmat Allah.

5. Sarana dakwah - Masjid adalah tempat terbaik untuk berdakwah dan menyampaikan ilmu.

Mari kita semangat untuk selalu menegakkan shalat berjamaah di masjid.`,
    date: "10 Januari 2026",
    category: "Ibadah",
  },
  {
    id: "menjaga-lisan",
    title: "Pentingnya Menjaga Lisan",
    excerpt: "Lisan adalah nikmat besar yang diberikan Allah kepada manusia. Namun jika tidak dijaga, lisan bisa menjadi sumber keburukan...",
    content: `Lisan adalah nikmat besar yang diberikan Allah kepada manusia. Namun jika tidak dijaga, lisan bisa menjadi sumber keburukan dan penyebab masuk neraka.

Rasulullah SAW bersabda: "Barangsiapa yang beriman kepada Allah dan hari akhir, hendaklah ia berkata baik atau diam."

Beberapa cara menjaga lisan:

1. Berbicara yang bermanfaat - Jika tidak ada manfaatnya, lebih baik diam.

2. Hindari ghibah (menggunjing) - Membicarakan keburukan orang lain adalah dosa besar.

3. Jauhi dusta - Berbohong adalah tanda kemunafikan.

4. Tidak berdebat kusir - Berdebat tanpa ilmu hanya membuang waktu.

5. Perbanyak dzikir - Sibukkan lisan dengan mengingat Allah.

Semoga Allah menjaga lisan kita dari ucapan yang tidak bermanfaat.`,
    date: "8 Januari 2026",
    category: "Akhlak",
  },
  {
    id: "keberkahan-waktu-pagi",
    title: "Keberkahan Waktu Pagi",
    excerpt: "Rasulullah SAW mendoakan keberkahan untuk umatnya di waktu pagi. Banyak keutamaan yang bisa kita raih...",
    content: `Rasulullah SAW mendoakan keberkahan untuk umatnya di waktu pagi. Beliau bersabda: "Ya Allah, berkahilah umatku di waktu paginya."

Waktu pagi adalah waktu yang penuh berkah. Berikut beberapa keutamaannya:

1. Waktu mustajab untuk berdoa - Setelah shalat Subuh hingga terbit matahari adalah waktu yang sangat baik untuk berdoa.

2. Pahala i'tikaf - Orang yang duduk di masjid setelah Subuh hingga terbit matahari mendapat pahala seperti haji dan umrah.

3. Fisik lebih segar - Secara medis, tubuh lebih segar dan produktif di pagi hari.

4. Berkah dalam rezeki - Orang yang memulai kerja di pagi hari akan mendapat berkah dalam rezekinya.

5. Waktu untuk muraja'ah - Pagi hari adalah waktu terbaik untuk menghafal dan mengulang hafalan Al-Quran.

Mari kita manfaatkan waktu pagi dengan sebaik-baiknya.`,
    date: "5 Januari 2026",
    category: "Ibadah",
  },
];

const ArtikelDetailPage = () => {
  const { id } = useParams();
  const [searchQuery, setSearchQuery] = useState("");

  const article = allArticles.find((a) => a.id === id);
  const otherArticles = allArticles.filter((a) => a.id !== id).slice(0, 3);

  if (!article) {
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

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      window.location.href = `/artikel?search=${encodeURIComponent(searchQuery)}`;
    }
  };

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
                        to={`/artikel/${otherArticle.id}`}
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
              {/* Featured Image Placeholder */}
              <div className="aspect-video bg-secondary/50 rounded-xl mb-6 overflow-hidden">
                <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-primary/10 to-secondary">
                  <span className="text-muted-foreground text-sm">Gambar Artikel</span>
                </div>
              </div>

              {/* Date Badge */}
              <div className="flex items-center gap-2 mb-4">
                <span className="inline-flex items-center gap-1.5 text-sm text-primary bg-primary/10 px-3 py-1 rounded-full">
                  <Calendar className="h-3.5 w-3.5" />
                  {article.date}
                </span>
                <span className="text-sm font-medium text-accent bg-accent/10 px-3 py-1 rounded-full">
                  {article.category}
                </span>
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
