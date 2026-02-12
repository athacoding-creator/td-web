import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
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
  type CarouselApi,
} from "@/components/ui/carousel";
import { ChevronLeft, ChevronRight } from "lucide-react";

const ProgramSection = () => {
  const [selectedProgram, setSelectedProgram] = useState<Program | null>(null);
  const { data: programs, isLoading } = usePrograms();
  const [carouselApi, setCarouselApi] = useState<CarouselApi>();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [slideCount, setSlideCount] = useState(0);

  useEffect(() => {
    if (!carouselApi) return;
    setSlideCount(carouselApi.scrollSnapList().length);
    setCurrentSlide(carouselApi.selectedScrollSnap());
    carouselApi.on("select", () => setCurrentSlide(carouselApi.selectedScrollSnap()));
  }, [carouselApi]);

  const displayPrograms = programs?.slice(0, 6) || [];

  return (
    <section id="program" className="py-10 bg-secondary/30">
      <div className="px-4">
        <h2 className="text-2xl font-heading font-semibold text-foreground text-center mb-3">Program Teras Dakwah</h2>
        <p className="text-center text-xs text-muted-foreground mb-8 leading-relaxed">
          Menunjukkan bahwa semua aktivitas, program, dan inisiatif yayasan—baik kecil maupun besar—bertujuan untuk memberikan kontribusi nyata bagi umat
        </p>

        {isLoading ? (
          <div className="grid grid-cols-3 gap-4">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="flex flex-col items-center gap-2">
                <Skeleton className="w-20 h-20 rounded-full" />
                <Skeleton className="h-3 w-16" />
              </div>
            ))}
          </div>
        ) : displayPrograms.length > 0 ? (
          <div className="grid grid-cols-3 gap-4">
            {displayPrograms.map((program) => (
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
          <div className="text-center text-muted-foreground text-sm py-8">Belum ada program yang tersedia.</div>
        )}

        <div className="text-center mt-6">
          <Button variant="cta" size="default" asChild className="w-full">
            <Link to="/program">Program Lainnya</Link>
          </Button>
        </div>
      </div>

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
                    <div className="space-y-3">
                      <div className="relative">
                        <Carousel className="w-full" setApi={setCarouselApi}>
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
                              <button
                                onClick={() => carouselApi?.scrollPrev()}
                                className="absolute left-2 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/90 backdrop-blur-sm text-foreground flex items-center justify-center hover:bg-white transition-all shadow-lg border-2 border-border hover:border-primary z-10"
                                aria-label="Previous image"
                              >
                                <ChevronLeft className="w-6 h-6" />
                              </button>
                              <button
                                onClick={() => carouselApi?.scrollNext()}
                                className="absolute right-2 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/90 backdrop-blur-sm text-foreground flex items-center justify-center hover:bg-white transition-all shadow-lg border-2 border-border hover:border-primary z-10"
                                aria-label="Next image"
                              >
                                <ChevronRight className="w-6 h-6" />
                              </button>
                            </>
                          )}
                        </Carousel>
                      </div>
                      
                      {/* Dots Indicator */}
                      {slideCount > 1 && (
                        <div className="flex justify-center gap-2">
                          {Array.from({ length: slideCount }).map((_, i) => (
                            <button
                              key={i}
                              onClick={() => carouselApi?.scrollTo(i)}
                              className={`transition-all duration-300 rounded-full ${
                                i === currentSlide 
                                  ? 'w-8 h-3 bg-primary' 
                                  : 'w-3 h-3 bg-border hover:bg-muted-foreground/30'
                              }`}
                              aria-label={`Go to slide ${i + 1}`}
                            />
                          ))}
                        </div>
                      )}
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
    </section>
  );
};

export default ProgramSection;
