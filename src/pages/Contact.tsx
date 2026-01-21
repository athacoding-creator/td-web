import { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 1000));
    
    toast.success("Pesan terkirim!", {
      description: "Terima kasih telah menghubungi kami. Kami akan segera merespons pesan Anda.",
    });
    
    setFormData({ name: "", email: "", message: "" });
    setIsSubmitting(false);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        {/* Hero */}
        <section className="py-16 md:py-24 bg-secondary/30">
          <div className="container-narrow text-center">
            <h1 className="text-4xl md:text-5xl font-heading font-bold text-foreground mb-4">
              Hubungi Kami
            </h1>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Kami senang mendengar dari Anda. Silakan hubungi kami untuk pertanyaan, saran, atau kerjasama.
            </p>
          </div>
        </section>

        {/* Google Maps Embed */}
        <section className="py-12 md:py-16 bg-background">
          <div className="container-narrow">
            <h2 className="text-2xl font-heading font-semibold text-foreground mb-6">
              Lokasi Kami
            </h2>
            <div className="rounded-xl overflow-hidden border border-border shadow-lg">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3953.4167!2d110.3853829!3d-7.8264022!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e7a5709020c76fd%3A0x1da0f3faee6edd97!2sTeras%20Dakwah!5e0!3m2!1sen!2sid!4v1705000000000!5m2!1sen!2sid"
                width="100%"
                height="400"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Lokasi Teras Dakwah"
                className="w-full"
              />
            </div>
            <p className="mt-4 text-sm text-muted-foreground text-center">
              <a 
                href="https://www.google.com/maps/place/Teras+Dakwah/@-7.8264022,110.3853829,17z"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:underline"
              >
                Buka di Google Maps →
              </a>
            </p>
          </div>
        </section>

        {/* Contact Form & Info */}
        <section className="py-12 md:py-16 bg-secondary/30">
          <div className="container-narrow">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              {/* Form */}
              <div>
                <h2 className="text-2xl font-heading font-semibold text-foreground mb-6">
                  Kirim Pesan
                </h2>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-foreground mb-2">
                      Nama
                    </label>
                    <Input
                      id="name"
                      type="text"
                      placeholder="Masukkan nama Anda"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      required
                      className="bg-card"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-foreground mb-2">
                      Email
                    </label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="Masukkan email Anda"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      required
                      className="bg-card"
                    />
                  </div>
                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-foreground mb-2">
                      Pesan
                    </label>
                    <Textarea
                      id="message"
                      placeholder="Tulis pesan Anda di sini..."
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      required
                      rows={6}
                      className="bg-card"
                    />
                  </div>
                  <Button type="submit" variant="cta" size="lg" disabled={isSubmitting}>
                    {isSubmitting ? "Mengirim..." : "Kirim Pesan"}
                  </Button>
                </form>
              </div>

              {/* Contact Info */}
              <div>
                <h2 className="text-2xl font-heading font-semibold text-foreground mb-6">
                  Informasi Kontak
                </h2>
                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-lg cta-gradient flex items-center justify-center flex-shrink-0">
                      <svg className="w-6 h-6 text-primary-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground mb-1">Alamat</h3>
                      <p className="text-muted-foreground text-sm">
                        Jl. Kaliurang KM 5.5, Caturtunggal,<br />
                        Kec. Depok, Kabupaten Sleman,<br />
                        Daerah Istimewa Yogyakarta 55281
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-lg cta-gradient flex items-center justify-center flex-shrink-0">
                      <svg className="w-6 h-6 text-primary-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground mb-1">Email</h3>
                      <p className="text-muted-foreground text-sm">
                        terasdakwah@gmail.com
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-lg cta-gradient flex items-center justify-center flex-shrink-0">
                      <svg className="w-6 h-6 text-primary-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground mb-1">Telepon</h3>
                      <p className="text-muted-foreground text-sm">
                        +62 853 2030 7766
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-lg cta-gradient flex items-center justify-center flex-shrink-0">
                      <svg className="w-6 h-6 text-primary-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground mb-1">Jam Operasional</h3>
                      <p className="text-muted-foreground text-sm">
                        Senin - Jumat: 08:00 - 17:00<br />
                        Sabtu: 08:00 - 12:00
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default ContactPage;
