📝 Konten Website

Website ini adalah platform informasi dan donasi untuk Teras Dakwah (TD). Website ini dirancang untuk menyajikan profil lembaga, program kerja, artikel edukatif, serta transparansi statistik kepada publik.

Fitur Utama & Halaman Publik:
Beranda (Index): Menampilkan ringkasan menyeluruh mulai dari Hero Section, statistik pencapaian, daftar program unggulan, ajakan donasi, hingga artikel terbaru.

Profil Lembaga (Tentang Kami): Mengelola informasi detail mengenai sejarah, visi, dan misi lembaga. Data ini bersifat dinamis dan diambil langsung dari database melalui custom hook useProfilTD.

Program & Campaign:

Program: Daftar kegiatan rutin atau program kerja lembaga.

Campaign: Halaman khusus untuk penggalangan dana atau kampanye sosial tertentu.

Artikel & Edukasi: Halaman blog yang menyajikan konten edukatif atau berita terkini mengenai kegiatan TD, dilengkapi dengan fitur detail artikel.

Statistik (Stats): Menampilkan data numerik (counter) mengenai dampak sosial atau pencapaian lembaga yang ditampilkan secara visual di halaman utama.

Kontak: Informasi saluran komunikasi dan lokasi lembaga.

Penasihat: Halaman khusus yang menampilkan struktur pembina atau penasihat organisasi.

Fitur Administrasi (Admin Panel):
Website ini memiliki area yang dilindungi (ProtectedRoute) untuk pengelola (admin) guna memperbarui konten secara mandiri tanpa menyentuh kode program:

Dashboard Admin: Ringkasan statistik dan status konten.

Manajemen Program & Campaign: Menambah, mengubah, atau menghapus data program dan donasi.

Manajemen Artikel: Editor untuk mempublikasikan tulisan terbaru.

Manajemen Profil: Mengatur konten dinamis pada bagian "Tentang Kami".

Manajemen Statistik: Memperbarui angka pencapaian secara real-time.

Teknologi yang Digunakan:
Frontend: React (TypeScript) dengan Vite.

Styling: Tailwind CSS & Shadcn/UI untuk komponen antarmuka yang modern.

Backend & Database: Supabase (PostgreSQL) untuk penyimpanan data dan autentikasi admin.

State Management: TanStack Query (React Query) untuk manajemen pengambilan data yang efisien.

Routing: React Router DOM v6.
