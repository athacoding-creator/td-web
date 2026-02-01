import CountUp from "./CountUp";
import { useStats } from "@/hooks/useStats";
import { useStatsConfig } from "@/hooks/useStatsConfig";

const StatsSection = () => {
  const { data: stats, isLoading: statsLoading, error } = useStats();
  const { data: config, isLoading: configLoading } = useStatsConfig();
  
  const isLoading = statsLoading || configLoading;

  // Show loading state
  if (isLoading) {
    return (
      <section className="py-10">
        <div className="px-4">
          <div className="h-6 bg-gray-200 rounded w-32 mx-auto mb-6 animate-pulse"></div>
          <div className="bg-[#A4D65E] rounded-2xl px-6 py-10 shadow-lg">
            <div className="grid grid-cols-1 gap-6">
              {[1, 2, 3].map((i) => (
                <div key={i} className="text-center animate-pulse">
                  <div className="h-12 bg-gray-700/20 rounded mb-2 mx-auto max-w-[150px]"></div>
                  <div className="h-5 bg-gray-700/20 rounded mx-auto max-w-[120px]"></div>
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

  // Get the title from config, fallback to stats title, then default
  const sectionTitle = config?.title || activeStats[0]?.title || "Rewind 2025";

  return (
    <section className="py-10">
      <div className="px-4">
        <h2 className="text-2xl font-heading font-semibold text-foreground text-center mb-6">{sectionTitle}</h2>
        
        <div className="bg-[#A4D65E] rounded-2xl px-6 py-10 shadow-lg">
          <div className="grid grid-cols-1 gap-6">
            {activeStats.map((stat) => (
              <div key={stat.id} className="text-center">
                <p className="text-4xl font-heading font-bold text-gray-800 mb-2">
                  <CountUp end={stat.value} duration={2500} />
                </p>
                <p className="text-sm font-medium text-gray-700">
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
