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
                      <div className="w-32 h-32 bg-primary/10 rounded-full flex items-center justify-center">
                        <span className="text-2xl font-bold text-primary">
                          {program.title.charAt(0)}
                        </span>
                      </div>
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
        <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
          {selectedProgram && (
            <>
              <DialogHeader>
                <DialogTitle className="text-2xl font-heading">
                  {selectedProgram.title}
                </DialogTitle>
                {selectedProgram.subtitle && (
                  <p className="text-primary font-medium">
                    {selectedProgram.subtitle}
                  </p>
                )}
              </DialogHeader>

              <div className="mt-4 space-y-6">
                {/* Description */}
                <p className="text-muted-foreground leading-relaxed">
                  {selectedProgram.description}
                </p>

                {/* Documentation Photos */}
                {selectedProgram.images && selectedProgram.images.length > 0 && (
                  <div>
                    <h4 className="font-semibold text-foreground mb-3">Dokumentasi Kegiatan</h4>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                      {selectedProgram.images.map((img, idx) => (
                        <div 
                          key={idx} 
                          className="aspect-[4/3] rounded-lg overflow-hidden"
                        >
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

                {/* Category Badge */}
                <div className="pt-4 border-t border-border">
                  <span className="inline-block px-3 py-1 text-xs font-medium rounded-full bg-primary/10 text-primary">
                    {selectedProgram.category}
                  </span>
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ProgramPage;
