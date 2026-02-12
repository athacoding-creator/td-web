import { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import MobileLayout from "@/components/MobileLayout";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { usePrograms, Program } from "@/hooks/usePrograms";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
} from "@/components/ui/carousel";

const ProgramPage = () => {
  const [selectedProgram, setSelectedProgram] = useState<Program | null>(null);
  const { data: programs, isLoading, error } = usePrograms();

  return (
    <MobileLayout>
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1">
          {/* Hero Section */}
          <section className="py-12 bg-gradient-to-b from-primary/5 to-background">
            <div className="px-4 text-center">
              <h1 className="text-3xl font-heading font-bold text-foreground mb-3">
                Program Teras Dakwah
              </h1>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Menunjukkan bahwa semua aktivitas, program, dan inisiatif yayasan—baik kecil maupun besar—bertujuan untuk memberikan kontribusi nyata bagi umat
              </p>
            </div>
          </section>

          {/* Programs Grid */}
          <section className="py-8 bg-background">
            <div className="px-4">
              {isLoading ? (
                <div className="grid grid-cols-3 gap-4">
                  {[...Array(9)].map((_, i) => (
                    <div key={i} className="flex flex-col items-center gap-2">
                      <Skeleton className="w-20 h-20 rounded-full" />
                      <Skeleton className="h-3 w-16" />
                    </div>
                  ))}
                </div>
              ) : error ? (
                <div className="text-center text-muted-foreground py-12 text-sm">
                  Gagal memuat program. Silakan coba lagi nanti.
                </div>
              ) : programs && programs.length > 0 ? (
                <div className="grid grid-cols-3 gap-4">
                  {programs.map((program) => (
                    <button
                      key={program.id}
                      onClick={() => setSelectedProgram(program)}
                      className="group flex flex-col items-center gap-2"
                    >
                      <div className="w-20 h-20 rounded-full bg-card border-2 border-border hover:border-primary/50 transition-all duration-300 flex items-center justify-center overflow-hidden shadow-md hover:shadow-lg p-2">
                        {program.logo_url ? (
                          <img 
                            src={program.logo_url} 
                            alt={program.title} 
                            className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-300" 
                          />
                        ) : (
                          <img 
                            src="/favicon.png" 
                            alt="Teras Dakwah" 
                            className="w-10 h-10 object-contain opacity-30 group-hover:opacity-50 transition-opacity duration-300" 
                          />
                        )}
                      </div>
                      <span className="text-xs text-center text-foreground font-medium line-clamp-2 leading-tight">
                        {program.title}
                      </span>
                    </button>
                  ))}
                </div>
              ) : (
                <div className="text-center text-muted-foreground py-12 text-sm">
                  Belum ada program yang tersedia.
                </div>
              )}
            </div>
          </section>
        </main>
        <Footer />
      </div>

      {/* Program Detail Dialog */}
      <Dialog open={!!selectedProgram} onOpenChange={() => setSelectedProgram(null)}>
        <DialogContent className="max-w-md max-h-[90vh] overflow-y-auto">
          {selectedProgram && (
            <>
              <DialogHeader>
                <DialogTitle className="text-xl font-heading mb-2">{selectedProgram.title}</DialogTitle>
                {selectedProgram.subtitle && (
                  <p className="text-sm text-muted-foreground font-medium">{selectedProgram.subtitle}</p>
                )}
              </DialogHeader>
              
              <div className="mt-4 space-y-4">
                {/* Description */}
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {selectedProgram.description}
                </p>
                
                {/* Documentation Images */}
                {selectedProgram.images && selectedProgram.images.length > 0 && (
                  <div>
                    <h4 className="font-semibold text-base text-foreground mb-3">Dokumentasi Kegiatan</h4>
                    <div className="relative">
                      <Carousel className="w-full">
                        <CarouselContent className="ml-0">
                          {selectedProgram.images.map((img, idx) => (
                            <CarouselItem key={idx} className="pl-0 basis-full">
                              <div className="aspect-video rounded-lg overflow-hidden border border-border shadow-sm">
                                <img 
                                  src={img} 
                                  alt={`${selectedProgram.title} - Dokumentasi ${idx + 1}`} 
                                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-300" 
                                />
                              </div>
                            </CarouselItem>
                          ))}
                        </CarouselContent>
                        {selectedProgram.images.length > 1 && (
                          <>
                            <CarouselPrevious className="absolute left-2 top-1/2 -translate-y-1/2" />
                            <CarouselNext className="absolute right-2 top-1/2 -translate-y-1/2" />
                          </>
                        )}
                      </Carousel>
                    </div>
                  </div>
                )}

                {/* Speaker and Event Date Section */}
                {(selectedProgram.speaker || selectedProgram.event_date) && (
                  <div className="flex flex-col gap-2 pt-3 pb-2">
                    <span className="inline-flex items-center px-3 py-1.5 text-xs font-medium rounded-full bg-primary/10 text-primary border border-primary/20 w-fit">
                      {selectedProgram.category}
                    </span>
                    
                    {selectedProgram.speaker && (
                      <span className="text-sm font-semibold text-foreground">
                        {selectedProgram.speaker}
                      </span>
                    )}
                    
                    {selectedProgram.event_date && (
                      <span className="text-sm font-medium text-muted-foreground">
                        {selectedProgram.event_date}
                      </span>
                    )}
                  </div>
                )}
                
                {/* Category only if no speaker/date */}
                {!selectedProgram.speaker && !selectedProgram.event_date && (
                  <div className="pt-3">
                    <span className="inline-flex items-center px-3 py-1.5 text-xs font-medium rounded-full bg-primary/10 text-primary border border-primary/20">
                      {selectedProgram.category}
                    </span>
                  </div>
                )}
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </MobileLayout>
  );
};

export default ProgramPage;
