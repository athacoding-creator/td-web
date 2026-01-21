import CountUp from "./CountUp";
import { useStats } from "@/hooks/useStats";

// Fallback data jika Supabase gagal
const FALLBACK_STATS = [
  {
    id: "1",
    value: 49200,
    label: "Total Penerima Manfaat",
    display_order: 1,
  },
  {
    id: "2",
    value: 280,
    label: "Program Terlaksana",
    display_order: 2,
  },
  {
    id: "3",
    value: 8456,
    label: "Total Jamaah Kajian",
    display_order: 3,
  },
];

const StatsSection = () => {
  const { stats, isLoading, error } = useStats();

  // Determine which data to use
  let displayStats = FALLBACK_STATS;
  
  if (!isLoading && !error && stats && stats.length > 0) {
    // Use database data if available
    displayStats = stats
      .filter((stat) => stat.is_active)
      .sort((a, b) => a.display_order - b.display_order)
      .map((stat) => ({
        id: stat.id,
        value: stat.value,
        label: stat.label,
        display_order: stat.display_order,
      }));
    
    // If no active stats from DB, use fallback
    if (displayStats.length === 0) {
      displayStats = FALLBACK_STATS;
    }
  }

  return (
    <section className="py-12 md:py-16">
      <div className="container-narrow">
        <h2 className="section-title mb-10 text-center">Rewind 2025</h2>
        
        <div className="bg-[#A4D65E] rounded-3xl px-8 md:px-16 py-12 md:py-16 shadow-lg">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
            {displayStats.map((stat) => (
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
