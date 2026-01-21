import Header from "@/components/Header";
import Footer from "@/components/Footer";
import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import StatsSection from "@/components/StatsSection";
import ProgramSection from "@/components/ProgramSection";
import DonationSection from "@/components/DonationSection";
import ArticleSection from "@/components/ArticleSection";

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <HeroSection />
        <AboutSection />
        <StatsSection />
        <ProgramSection />
        <DonationSection />
        <ArticleSection />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
