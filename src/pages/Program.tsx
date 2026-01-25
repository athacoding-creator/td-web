import { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { usePrograms, Program } from "@/hooks/usePrograms";
import { Skeleton } from "@/components/ui/skeleton";

const ProgramPage = () => {
  const [selectedProgram, setSelectedProgram] = useState<Program | null>(null);
  const { data: programs, isLoading, error } = usePrograms();

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        {/* Hero Section */}
        <section className="py-12 md:py-16 bg-background">
          <div className="container-narrow text-center">
            <h1 className="text-4xl md:text-5xl font-heading font-bold text-foreground mb-4">
              Program Teras Dakwah
            </h1>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              Menunjukkan bahwa semua aktivitas, program, dan inisiatif yayasan—baik kecil maupun besar—bertujuan untuk memberikan kontribusi nyata bagi umat
            </p>
          </div>
        </section>

        {/* Programs Grid */}
        <section className="py-16 md:py-24 bg-secondary/30">
          <div className="container-narrow">
            {isLoading ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {[...Array(6)].map((_, i) => (
                  <Skeleton key={i} className="h-[200px] rounded-2xl" />
                ))}
              </div>
            ) : error ? (
              <div className="text-center text-muted-foreground py-12">
                Gagal memuat program. Silakan coba lagi nanti.
              </div>
            ) : programs && programs.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {programs.map((program) => (
                  <button
                    key={program.id}
                    onClick={() => setSelectedProgram(program)}
                    className="group bg-card p-6 rounded-2xl border border-border hover:shadow-xl hover:border-primary/20 transition-all duration-300 flex items-center justify-center min-h-[200px]"
                  >
                    {program.logo_url ? (
                      <img
                        src={program.logo_url}
                        alt={program.title}
                        className="w-32 h-32 object-contain group-hover:scale-105 transition-transform duration-300"
                      />
                    ) : (
                      <img
                        src="/favicon.png"
                        alt="Teras Dakwah"
                        className="w-28 h-28 object-contain opacity-30 group-hover:opacity-50 transition-opacity duration-300"
                      />
                    )}
                  </button>
                ))}
              </div>
            ) : (
              <div className="text-center text-muted-foreground py-12">
                Belum ada program yang tersedia.
              </div>
            )}
          </div>
        </section>
      </main>
      <Footer />

      {/* Program Detail Dialog */}
      <Dialog open={!!selectedProgram} onOpenChange={() => setSelectedProgram(null)}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          {selectedProgram && (
            <>
              <DialogHeader>
                <DialogTitle className="text-3xl font-heading mb-2">{selectedProgram.title}</DialogTitle>
                {selectedProgram.subtitle && (
                  <p className="text-lg text-muted-foreground font-medium">{selectedProgram.subtitle}</p>
                )}
              </DialogHeader>
              
              <div className="mt-6 space-y-6">
                {/* Description */}
                <p className="text-base text-muted-foreground leading-relaxed">
                  {selectedProgram.description}
                </p>
                
                {/* Documentation Images */}
                {selectedProgram.images && selectedProgram.images.length > 0 && (
                  <div>
                    <h4 className="font-semibold text-lg text-foreground mb-4">Dokumentasi Kegiatan</h4>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                      {selectedProgram.images.map((img, idx) => (
                        <div key={idx} className="aspect-video rounded-lg overflow-hidden border border-border shadow-sm">
                          <img 
                            src={img} 
                            alt={`${selectedProgram.title} - Dokumentasi ${idx + 1}`} 
                            className="w-full h-full object-cover hover:scale-105 transition-transform duration-300" 
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Speaker and Event Date Section */}
                {(selectedProgram.speaker || selectedProgram.event_date) && (
                  <div className="flex flex-wrap items-center gap-3 pt-4 pb-2">
                    <span className="inline-flex items-center px-4 py-2 text-sm font-medium rounded-full bg-primary/10 text-primary border border-primary/20">
                      {selectedProgram.category}
                    </span>
                    
                    {selectedProgram.speaker && (
                      <>
                        <span className="text-muted-foreground">•</span>
                        <span className="text-base font-semibold text-foreground">
                          {selectedProgram.speaker}
                        </span>
                      </>
                    )}
                    
                    {selectedProgram.event_date && (
                      <>
                        <span className="text-muted-foreground">—</span>
                        <span className="text-base font-medium text-foreground">
                          {selectedProgram.event_date}
                        </span>
                      </>
                    )}
                  </div>
                )}
                
                {/* Category only if no speaker/date */}
                {!selectedProgram.speaker && !selectedProgram.event_date && (
                  <div className="pt-4">
                    <span className="inline-flex items-center px-4 py-2 text-sm font-medium rounded-full bg-primary/10 text-primary border border-primary/20">
                      {selectedProgram.category}
                    </span>
                  </div>
                )}
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ProgramPage;
