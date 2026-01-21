const StatsSection = () => {
  return (
    <section className="py-12 md:py-16 bg-secondary/50">
      <div className="container-narrow">
        <h2 className="section-title mb-10">Rewind 2025</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="text-center">
            <p className="text-4xl md:text-5xl font-heading font-bold text-primary mb-2">
              16,961
            </p>
            <p className="text-muted-foreground">Total Penerima Manfaat</p>
          </div>
          
          <div className="text-center">
            <p className="text-4xl md:text-5xl font-heading font-bold text-primary mb-2">
              96
            </p>
            <p className="text-muted-foreground">Program Terlaksana</p>
          </div>
          
          <div className="text-center">
            <p className="text-4xl md:text-5xl font-heading font-bold text-primary mb-2">
              2,927
            </p>
            <p className="text-muted-foreground">Total Jamaah Kajian</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default StatsSection;
