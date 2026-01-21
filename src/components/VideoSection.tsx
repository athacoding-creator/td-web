const VideoSection = () => {
  return (
    <section className="py-16 md:py-24 bg-[#A4D65E]">
      <div className="container-narrow">
        <h2 className="text-2xl md:text-3xl font-heading font-bold text-gray-800 text-center mb-8 md:mb-12">
          Setiap Gerak untuk Umat, Setiap Amal untuk Akhirat
        </h2>
        
        <div className="max-w-4xl mx-auto">
          <div className="relative w-full" style={{ paddingBottom: '56.25%' }}>
            <iframe
              className="absolute top-0 left-0 w-full h-full rounded-2xl shadow-2xl"
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
