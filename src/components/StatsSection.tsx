import { useStats } from "@/hooks/useStats";
import CountUp from "./CountUp";

// Fallback data jika Supabase tidak bisa diakses
const FALLBACK_STATS = [
  {
    id: "fallback-1",
    title: "Rewind 2025",
    value: 49200,
    label: "Total Penerima Manfaat",
    display_order: 1,
    is_active: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: "fallback-2",
    title: "Rewind 2025",
    value: 280,
    label: "Program Terlaksana",
    display_order: 2,
    is_active: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: "fallback-3",
    title: "Rewind 2025",
    value: 8456,
    label: "Total Jamaah Kajian",
    display_order: 3,
    is_active: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
];

const StatsSection = () => {
  const { data: stats, isLoading, error } = useStats();

  // Debug logging
  console.log("StatsSection Debug:", {
    isLoading,
    error: error?.message,
    statsCount: stats?.length,
    stats: stats,
  });

  if (isLoading) {
    return (
      <section className="py-12 md:py-16">
        <div className="container-narrow">
          <h2 className="section-title mb-10 text-center">Rewind 2025</h2>
          <div className="bg-[#A4D65E] rounded-3xl px-8 md:px-16 py-12 md:py-16">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
              {[1, 2, 3].map((i) => (
                <div key={i} className="text-center animate-pulse">
                  <div className="h-12 bg-gray-700/20 rounded mb-4"></div>
                  <div className="h-6 bg-gray-700/20 rounded w-3/4 mx-auto"></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    );
  }

  // Use fallback data if error or no data
  const displayStats = (stats && stats.length > 0) ? stats.filter(stat => stat.is_active) : FALLBACK_STATS;

  if (error) {
    console.error("Error loading stats, using fallback data:", error);
  }

  // Get the title from first stat or use default
  const sectionTitle = displayStats.length > 0 ? displayStats[0].title : "Rewind 2025";

  return (
    <section className="py-12 md:py-16">
      <div className="container-narrow">
        <h2 className="section-title mb-10 text-center">{sectionTitle}</h2>
        
        <div className="bg-[#A4D65E] rounded-3xl px-8 md:px-16 py-12 md:py-16 shadow-lg">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
            {displayStats.length > 0 ? (
              displayStats.map((stat) => (
                <div key={stat.id} className="text-center">
                  <p className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold text-gray-800 mb-3">
                    <CountUp end={stat.value || 0} duration={2500} />
                  </p>
                  <p className="text-base md:text-lg font-medium text-gray-700">
                    {stat.label}
                  </p>
                </div>
              ))
            ) : (
              <div className="col-span-3 text-center text-gray-700">
                <p>Belum ada data statistik</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default StatsSection;
