import Header from "@/components/Header";
import Footer from "@/components/Footer";
import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import StatsSection from "@/components/StatsSection";
import ProgramSection from "@/components/ProgramSection";
import VideoSection from "@/components/VideoSection";
import DonationSection from "@/components/DonationSection";
import ArticleSection from "@/components/ArticleSection";
import MobileLayout from "@/components/MobileLayout";

const Index = () => {
  return (
    <MobileLayout>
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1">
          <HeroSection />
          <AboutSection />
          <StatsSection />
          <ProgramSection />
          <VideoSection />
          <DonationSection />
          <ArticleSection />
        </main>
        <Footer />
      </div>
    </MobileLayout>
  );
};

export default Index;
