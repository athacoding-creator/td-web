import CountUp from "./CountUp";
import { useStats } from "@/hooks/useStats";

const StatsSection = () => {
  const { stats, isLoading, error } = useStats();

  // Filter only active stats and sort by display_order
  const activeStats = stats
    .filter((stat) => stat.is_active)
    .sort((a, b) => a.display_order - b.display_order);

  // Show loading state
  if (isLoading) {
    return (
      <section className="py-12 md:py-16">
        <div className="container-narrow">
          <h2 className="section-title mb-10 text-center">Rewind 2025</h2>
          
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

  // Show error state (with fallback to prevent blank page)
  if (error) {
    console.error("Error loading stats:", error);
  }

  // If no active stats, don't render the section
  if (activeStats.length === 0) {
    return null;
  }

  return (
    <section className="py-12 md:py-16">
      <div className="container-narrow">
        <h2 className="section-title mb-10 text-center">Rewind 2025</h2>
        
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
