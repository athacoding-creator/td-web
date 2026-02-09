const VideoSection = () => {
  return (
    <section className="py-10 bg-primary">
      <div className="px-4">
        <h2 className="text-xl font-heading font-bold text-primary-foreground text-center mb-6 leading-tight">
          Setiap Gerak untuk Umat, Setiap Amal untuk Akhirat
        </h2>
        
        <div className="w-full">
          <div className="relative w-full" style={{ paddingBottom: '56.25%' }}>
            <iframe
              className="absolute top-0 left-0 w-full h-full rounded-xl shadow-lg"
              src="https://www.youtube.com/embed/saCM66EwQyI"
              title="Video Teras Dakwah"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default VideoSection;
