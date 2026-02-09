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
          <div className="h-6 bg-muted rounded w-32 mx-auto mb-6 animate-pulse"></div>
          <div className="bg-primary rounded-2xl px-4 py-8 shadow-lg">
            <div className="grid grid-cols-3 gap-2">
              {[1, 2, 3].map((i) => (
                <div key={i} className="text-center animate-pulse">
                  <div className="h-8 bg-primary-foreground/20 rounded mb-2 mx-auto max-w-[80px]"></div>
                  <div className="h-3 bg-primary-foreground/20 rounded mx-auto max-w-[60px]"></div>
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
        
        <div className="bg-primary rounded-2xl px-4 py-8 shadow-lg">
          <div className="grid grid-cols-3 gap-2">
            {activeStats.map((stat) => (
              <div key={stat.id} className="text-center">
                <p className="text-2xl font-heading font-bold text-primary-foreground mb-1">
                  <CountUp end={stat.value} duration={2500} />
                </p>
                <p className="text-[10px] font-medium text-primary-foreground/80">
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
