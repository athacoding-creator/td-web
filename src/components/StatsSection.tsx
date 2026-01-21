import CountUp from "./CountUp";
import { useStats } from "@/hooks/useStats";

const StatsSection = () => {
  const { data: stats, isLoading, error } = useStats();

  // Show loading state
  if (isLoading) {
    return (
      <section className="py-12 md:py-16">
        <div className="container-narrow">
          <div className="h-8 bg-gray-200 rounded w-48 mx-auto mb-10 animate-pulse"></div>
          <div className="bg-[#A4D65E] rounded-3xl px-8 md:px-16 py-12 md:py-16 shadow-lg">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
              {[1, 2, 3].map((i) => (
                <div key={i} className="text-center animate-pulse">
                  <div className="h-16 bg-gray-700/20 rounded mb-3 mx-auto max-w-[200px]"></div>
                  <div className="h-6 bg-gray-700/20 rounded mx-auto max-w-[150px]"></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    );
  }

  // Log error but continue with any available data
  if (error) {
    console.error("Error loading stats:", error);
  }

  // Filter only active stats and sort by display_order
  const activeStats = stats
    ?.filter((stat) => stat.is_active)
    .sort((a, b) => (a.display_order || 0) - (b.display_order || 0)) || [];

  // If no active stats, don't render the section
  if (activeStats.length === 0) {
    return null;
  }

  // Get the title from the first stat (all stats share the same title)
  const sectionTitle = activeStats[0]?.title || "Rewind 2025";

  return (
    <section className="py-12 md:py-16">
      <div className="container-narrow">
        <h2 className="section-title mb-10 text-center">{sectionTitle}</h2>
        
        <div className="bg-[#A4D65E] rounded-3xl px-8 md:px-16 py-12 md:py-16 shadow-lg">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
            {activeStats.map((stat) => (
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
