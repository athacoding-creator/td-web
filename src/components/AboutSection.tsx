const AboutSection = () => {
  return (
    <section id="tentang" className="py-12 bg-background">
      <div className="px-4">
        <h2 className="text-2xl font-heading font-semibold text-foreground text-center mb-8">Tentang Kami</h2>
        
        <div className="space-y-4">
          <p className="text-sm text-muted-foreground leading-relaxed text-center">
            <span className="font-bold text-foreground">Teras Dakwah</span> adalah wadah dakwah yang mengusung konsep terbuka, sederhana, dan merangkul semua kalangan, dengan keyakinan bahwa dakwah dapat dimulai dari tempat yang dekat dan nyaman bagi masyarakat.
          </p>
          <p className="text-sm text-muted-foreground leading-relaxed text-center">
            Hadir sebagai <span className="font-bold text-foreground">ruang kajian yang ramah dan relevan bagi anak muda</span>, Teras Dakwah memudahkan umat khususnya masyarakat awam mempelajari Islam secara kaffah berdasarkan Al-Qur'an dan Sunnah tanpa rasa minder atau kaku, sekaligus menjadi pemersatu umat Islam lintas harokah.
          </p>
          <p className="text-sm text-muted-foreground leading-relaxed text-center">
            Berawal dari tiga penggerak, Teras Dakwah berkembang menjadi gerakan dakwah yang aktif melalui kajian, program sosial, pembinaan desa, dan sinergi dengan berbagai lembaga, dengan harapan menjadi inspirasi dakwah Nusantara yang bermakna meski berangkat dari kesederhanaan.
          </p>
        </div>

        {/* Values - Stacked vertically */}
        <div className="flex flex-col gap-3 mt-8">
          <div className="flex items-center gap-3 p-3 rounded-xl bg-secondary/50 border border-border/50">
            <div className="w-10 h-10 flex-shrink-0 rounded-full cta-gradient flex items-center justify-center">
              <svg className="w-5 h-5 text-primary-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>
            </div>
            <div>
              <h3 className="font-heading font-bold text-sm text-foreground">Dakwah</h3>
              <p className="text-xs text-muted-foreground">Menyebarkan nilai-nilai Islam berdasarkan Al-Qur'an dan Sunnah</p>
            </div>
          </div>

          <div className="flex items-center gap-3 p-3 rounded-xl bg-secondary/50 border border-border/50">
            <div className="w-10 h-10 flex-shrink-0 rounded-full cta-gradient flex items-center justify-center">
              <svg className="w-5 h-5 text-primary-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
              </svg>
            </div>
            <div>
              <h3 className="font-heading font-bold text-sm text-foreground">Pendidikan Islam</h3>
              <p className="text-xs text-muted-foreground">Memfasilitasi pembelajaran agama bagi semua kalangan</p>
            </div>
          </div>

          <div className="flex items-center gap-3 p-3 rounded-xl bg-secondary/50 border border-border/50">
            <div className="w-10 h-10 flex-shrink-0 rounded-full cta-gradient flex items-center justify-center">
              <svg className="w-5 h-5 text-primary-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
            </div>
            <div>
              <h3 className="font-heading font-bold text-sm text-foreground">Sosial & Kemanusiaan</h3>
              <p className="text-xs text-muted-foreground">Berkontribusi nyata untuk kesejahteraan umat</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
