import { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import MobileLayout from "@/components/MobileLayout";
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
    <MobileLayout>
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1">
          {/* Hero */}
          <section className="py-12 bg-gradient-to-b from-primary/5 to-background">
            <div className="px-4 text-center">
              <h1 className="text-3xl font-heading font-bold text-foreground mb-3">
                Hubungi Kami
              </h1>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Kami senang mendengar dari Anda. Silakan hubungi kami untuk pertanyaan, saran, atau kerjasama.
              </p>
            </div>
          </section>

          {/* Contact Info Cards */}
          <section className="py-8 bg-background">
            <div className="px-4">
              <h2 className="text-xl font-heading font-semibold text-foreground mb-4">
                Informasi Kontak
              </h2>
              <div className="space-y-3">
                <div className="flex items-start gap-3 p-4 bg-card border border-border rounded-lg">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-5 h-5 text-primary" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-sm text-foreground mb-1">Alamat</h3>
                    <p className="text-xs text-muted-foreground leading-relaxed">
                      Jl. Kaliurang KM 5.5, Caturtunggal, Kec. Depok, Kabupaten Sleman, Daerah Istimewa Yogyakarta 55281
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-4 bg-card border border-border rounded-lg">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <Mail className="w-5 h-5 text-primary" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-sm text-foreground mb-1">Email</h3>
                    <a 
                      href="mailto:admin@terasdakwah.com" 
                      className="text-xs text-primary hover:underline break-all"
                    >
                      admin@terasdakwah.com
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-4 bg-card border border-border rounded-lg">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <Phone className="w-5 h-5 text-primary" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-sm text-foreground mb-1">Telepon</h3>
                    <a 
                      href="tel:+6285320307766" 
                      className="text-xs text-primary hover:underline"
                    >
                      +62 853 2030 7766
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-4 bg-card border border-border rounded-lg">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <Clock className="w-5 h-5 text-primary" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-sm text-foreground mb-1">Jam Operasional</h3>
                    <p className="text-xs text-muted-foreground leading-relaxed">
                      Senin - Jumat: 08:00 - 17:00<br />
                      Sabtu: 08:00 - 12:00
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Google Maps */}
          <section className="py-8 bg-secondary/20">
            <div className="px-4">
              <h2 className="text-xl font-heading font-semibold text-foreground mb-4">
                Lokasi Kami
              </h2>
              <div className="rounded-xl overflow-hidden border border-border shadow-md">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3953.4167!2d110.3853829!3d-7.8264022!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e7a5709020c76fd%3A0x1da0f3faee6edd97!2sTeras%20Dakwah!5e0!3m2!1sen!2sid!4v1705000000000!5m2!1sen!2sid"
                  width="100%"
                  height="250"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Lokasi Teras Dakwah"
                  className="w-full"
                />
              </div>
              <p className="mt-3 text-xs text-center">
                <a 
                  href="https://www.google.com/maps/place/Teras+Dakwah/@-7.8264022,110.3853829,17z"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary hover:underline font-medium"
                >
                  Buka di Google Maps →
                </a>
              </p>
            </div>
          </section>

          {/* Contact Form */}
          <section className="py-8 bg-background">
            <div className="px-4">
              <h2 className="text-xl font-heading font-semibold text-foreground mb-4">
                Kirim Pesan
              </h2>
              <form onSubmit={handleSubmit} className="space-y-4">
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
                    className="text-sm"
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
                    className="text-sm"
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
                    className="text-sm"
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
                    rows={5}
                    className="text-sm resize-none"
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
          </section>
        </main>
        <Footer />
      </div>
    </MobileLayout>
  );
};

export default ContactPage;
