import CountUp from "./CountUp";

// Data statistik hardcoded
const STATS_DATA = [
  {
    id: "1",
    value: 49200,
    label: "Total Penerima Manfaat",
  },
  {
    id: "2",
    value: 280,
    label: "Program Terlaksana",
  },
  {
    id: "3",
    value: 8456,
    label: "Total Jamaah Kajian",
  },
];

const StatsSection = () => {
  return (
    <section className="py-12 md:py-16">
      <div className="container-narrow">
        <h2 className="section-title mb-10 text-center">Rewind 2025</h2>
        
        <div className="bg-[#A4D65E] rounded-3xl px-8 md:px-16 py-12 md:py-16 shadow-lg">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
            {STATS_DATA.map((stat) => (
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
