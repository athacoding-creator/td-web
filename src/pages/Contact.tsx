import { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { useContactMessages } from "@/hooks/useContactMessages";
import { Mail, MapPin, Phone, Clock } from "lucide-react";

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { submitMessage } = useContactMessages();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      // Submit to database
      await submitMessage({
        name: formData.name,
        email: formData.email,
        phone: formData.phone || undefined,
        message: formData.message,
      });
      
      toast.success("Pesan terkirim!", {
        description: "Terima kasih telah menghubungi kami. Kami akan segera merespons pesan Anda dalam 1x24 jam.",
      });
      
      setFormData({ name: "", email: "", phone: "", message: "" });
    } catch (error) {
      console.error("Error submitting message:", error);
      toast.error("Gagal mengirim pesan", {
        description: "Terjadi kesalahan. Silakan coba lagi atau hubungi kami melalui email/telepon.",
      });
    } finally {
      setIsSubmitting(false);
    }
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
                      Nama <span className="text-destructive">*</span>
                    </label>
                    <Input
                      id="name"
                      type="text"
                      placeholder="Masukkan nama Anda"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      required
                      disabled={isSubmitting}
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-foreground mb-2">
                      Email <span className="text-destructive">*</span>
                    </label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="Masukkan email Anda"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      required
                      disabled={isSubmitting}
                    />
                  </div>

                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-foreground mb-2">
                      Nomor Telepon <span className="text-muted-foreground text-xs">(Opsional)</span>
                    </label>
                    <Input
                      id="phone"
                      type="tel"
                      placeholder="Masukkan nomor telepon Anda"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      disabled={isSubmitting}
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-foreground mb-2">
                      Pesan <span className="text-destructive">*</span>
                    </label>
                    <Textarea
                      id="message"
                      placeholder="Tulis pesan Anda di sini..."
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      required
                      disabled={isSubmitting}
                      rows={6}
                    />
                  </div>
                  
                  <Button 
                    type="submit" 
                    size="lg" 
                    className="w-full"
                    disabled={isSubmitting}
                  >
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
                    <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <MapPin className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground mb-1">Alamat</h3>
                      <p className="text-muted-foreground">
                        Jl. Kaliurang KM 5.5, Caturtunggal,<br />
                        Kec. Depok, Kabupaten Sleman,<br />
                        Daerah Istimewa Yogyakarta 55281
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <Mail className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground mb-1">Email</h3>
                      <a 
                        href="mailto:admin@terasdakwah.com" 
                        className="text-primary hover:underline"
                      >
                        admin@terasdakwah.com
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <Phone className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground mb-1">Telepon</h3>
                      <a 
                        href="tel:+6285320307766" 
                        className="text-primary hover:underline"
                      >
                        +62 853 2030 7766
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <Clock className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground mb-1">Jam Operasional</h3>
                      <p className="text-muted-foreground">
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
