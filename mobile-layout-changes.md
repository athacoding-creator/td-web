# Mobile-Centered Layout Implementation

## Perubahan yang Telah Dilakukan

### 1. MobileLayout Component
- **Background**: Gradient dari muted dengan opacity untuk efek depth
- **Container**: max-w-md (mobile width) dengan shadow-2xl untuk efek shadow di sisi kanan-kiri
- **Centering**: Flex justify-center untuk center di desktop

### 2. Header Component
- **Top Bar**: Disesuaikan dengan padding horizontal px-4
- **Font Size**: Dikurangi menjadi text-xs untuk top bar
- **Navigation**: Hamburger menu dengan dropdown yang rapi
- **Height**: Dikurangi dari h-16/h-20 menjadi h-14

### 3. Hero Section
- **Height**: Dikurangi dari 90vh menjadi 60vh
- **Font Size**: Heading dari text-4xl/5xl/6xl menjadi text-3xl
- **Padding**: Disesuaikan untuk mobile (px-6, py-12)
- **Overlay**: Gradient yang lebih soft

### 4. About Section
- **Padding**: py-12 (dikurangi dari py-16/24)
- **Font Size**: Heading text-2xl, body text-sm
- **Cards**: Grid 1 kolom dengan gap-4
- **Icon Size**: Dikurangi dari w-14 menjadi w-12

### 5. Stats Section
- **Layout**: Grid 1 kolom (vertikal stack)
- **Font Size**: Heading text-4xl, label text-sm
- **Padding**: px-6 py-10 untuk card
- **Border Radius**: rounded-2xl

### 6. Program Section
- **Grid**: 2 kolom untuk program cards
- **Card Size**: min-h-[140px] dengan logo w-24 h-24
- **Button**: Full width (w-full)
- **Gap**: gap-3 antar cards

### 7. Video Section
- **Padding**: py-10
- **Font Size**: Heading text-xl
- **Border Radius**: rounded-xl untuk iframe

### 8. Donation Section
- **Layout**: Image di atas, content di bawah (vertical stack)
- **Text Align**: Center untuk semua content
- **Button**: Full width
- **Font Size**: Heading text-xl, body text-sm

### 9. Article Section
- **Grid**: 1 kolom untuk article cards
- **Aspect Ratio**: 16:9 (horizontal)
- **Font Size**: Heading text-base, meta text-xs
- **Gap**: gap-4 antar cards
- **Line Clamp**: line-clamp-2 untuk title

### 10. Footer
- **Layout**: Vertical stack (space-y-8)
- **Font Size**: text-xs untuk body, text-base untuk headings
- **Logo**: h-8 (dikurangi dari h-10)
- **Padding**: py-10

### 11. Global CSS
- **container-narrow**: Diubah menjadi `w-full px-4` untuk konsistensi

## Hasil Visual

✅ **Mobile-Centered Layout**: Website sekarang menampilkan konten dengan lebar mobile (max-w-md) yang ter-center di desktop

✅ **Side Shadows**: Shadow-2xl di sisi kanan-kiri memberikan efek depth yang baik

✅ **Responsive Content**: Semua konten disesuaikan untuk fit dalam mobile width

✅ **Typography**: Font sizes disesuaikan untuk readability di mobile

✅ **Spacing**: Padding dan margin disesuaikan untuk mobile-first approach

✅ **Interactive Elements**: Button dan cards disesuaikan untuk touch-friendly

## Catatan Tambahan

- Layout sekarang mirip dengan Kitabisa.com dengan mobile-centered approach
- Background gradient memberikan visual cue bahwa ini adalah mobile view di desktop
- Semua section menggunakan px-4 untuk consistent horizontal padding
- Font sizes dikurangi untuk better mobile experience
- Cards dan buttons menggunakan full width untuk better touch targets
