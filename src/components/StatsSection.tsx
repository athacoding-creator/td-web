import CountUp from "./CountUp";
import { useStats } from "@/hooks/useStats";
import { Skeleton } from "@/components/ui/skeleton";

const StatsSection = () => {
  const { data: stats, isLoading } = useStats();

  // Get title from first stat or use default
  const sectionTitle = stats?.[0]?.title || "Rewind 2025";

  if (isLoading) {
    return (
      <section className="py-12 md:py-16">
        <div className="container-narrow">
          <Skeleton className="h-8 w-48 mx-auto mb-10" />
          <div className="bg-[#A4D65E] rounded-3xl px-8 md:px-16 py-12 md:py-16">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
              {[1, 2, 3].map((i) => (
                <div key={i} className="text-center">
                  <Skeleton className="h-14 w-32 mx-auto mb-3" />
                  <Skeleton className="h-6 w-40 mx-auto" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    );
  }

  if (!stats || stats.length === 0) {
    return null;
  }

  return (
    <section className="py-12 md:py-16">
      <div className="container-narrow">
        <h2 className="section-title mb-10 text-center">{sectionTitle}</h2>
        
        <div className="bg-[#A4D65E] rounded-3xl px-8 md:px-16 py-12 md:py-16 shadow-lg">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
            {stats.map((stat) => (
              <div key={stat.id} className="text-center">
                <p className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold text-gray-800 mb-3">
                  <CountUp end={stat.value} duration={2500} />
                </p>
                <p className="text-base md:text-lg font-medium text-gray-700">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default StatsSection;
