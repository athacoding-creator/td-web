import { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import MobileLayout from "@/components/MobileLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { useContactMessages } from "@/hooks/useContactMessages";
import { Mail, MapPin, Phone, Clock } from "lucide-react";

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { submitMessage } = useContactMessages();

  // Template pesan otomatis
  const messageTemplate = "Assalamualaikum kak\nSaya ingin bertanya lebih lanjut terkait informasi dari web Teras Dakwah😁";

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validasi nomor telepon wajib diisi
    if (!formData.phone || formData.phone.trim() === "") {
      toast.error("Nomor telepon wajib diisi", {
        description: "Mohon masukkan nomor telepon Anda untuk melanjutkan ke WhatsApp.",
      });
      return;
    }

    setIsSubmitting(true);
    
    try {
      // Simpan ke database dengan template message
      await submitMessage({
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        message: messageTemplate,
      });
      
      // Format nomor telepon untuk WhatsApp (hapus karakter non-digit)
      let whatsappNumber = formData.phone.replace(/\D/g, "");
      
      // Tambahkan kode negara jika belum ada
      if (!whatsappNumber.startsWith("62")) {
        if (whatsappNumber.startsWith("0")) {
          whatsappNumber = "62" + whatsappNumber.substring(1);
        } else {
          whatsappNumber = "62" + whatsappNumber;
        }
      }
      
      // Buat pesan WhatsApp dengan data user
      const whatsappMessage = `${messageTemplate}

Nama: ${formData.name}
Email: ${formData.email}
Nomor Telepon: ${formData.phone}`;
      
      // Encode message untuk URL
      const encodedMessage = encodeURIComponent(whatsappMessage);
      
      // Nomor WhatsApp Teras Dakwah
      const adminWhatsApp = "6285320307766";
      
      // Redirect ke WhatsApp
      const whatsappUrl = `https://wa.me/${adminWhatsApp}?text=${encodedMessage}`;
      
      toast.success("Data berhasil disimpan!", {
        description: "Anda akan diarahkan ke WhatsApp...",
      });
      
      // Delay sedikit agar toast terlihat, lalu redirect
      setTimeout(() => {
        window.open(whatsappUrl, "_blank");
      }, 1000);
      
      // Reset form
      setFormData({ name: "", email: "", phone: "" });
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
              <p className="text-sm text-foreground leading-relaxed">
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
                    <p className="text-xs text-foreground leading-relaxed">
                      Nitikan UH VI / 413 Jogjakarta, RT.41/RW.11, Sorosutan, Kec. Umbulharjo, Kota Yogyakarta, Daerah Istimewa Yogyakarta 55162
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
                    <p className="text-xs text-foreground leading-relaxed">
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
              
              {/* Template Message Preview */}
              <div className="mb-4 p-4 bg-primary/5 border border-primary/20 rounded-lg">
                <p className="text-xs font-medium text-primary mb-2">📱 Template Pesan:</p>
                <p className="text-xs text-foreground leading-relaxed whitespace-pre-line">
                  {messageTemplate}
                </p>
              </div>

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
                    Nomor Telepon <span className="text-destructive">*</span>
                  </label>
                  <Input
                    id="phone"
                    type="tel"
                    placeholder="Masukkan nomor telepon Anda"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    required
                    disabled={isSubmitting}
                    className="text-sm"
                  />
                  <p className="mt-1 text-xs text-muted-foreground">
                    Contoh: 0812345678 atau +628123456789
                  </p>
                </div>
                
                <Button 
                  type="submit" 
                  size="lg" 
                  className="w-full"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Memproses..." : "Kirim Pesan"}
                </Button>
                
                <p className="text-xs text-center text-muted-foreground">
                  Setelah submit, Anda akan diarahkan ke WhatsApp untuk melanjutkan percakapan
                </p>
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
