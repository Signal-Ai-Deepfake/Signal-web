import HeroSection from "@/widgets/HeroSection";
import HowItWorksSection from "@/widgets/HowItWorksSection";
import LandingAutoScroll from "@/widgets/LandingAutoScroll";
import MobileFeatureGrid from "@/widgets/MobileFeatureGrid";
import MobileHeroSection from "@/widgets/MobileHeroSection";
import MobileWhySignalList from "@/widgets/MobileWhySignalList";
import ScrollToTopButton from "@/widgets/ScrollToTopButton";
import WhySignalSection from "@/widgets/WhySignalSection";

export default function LandingPage() {
  return (
    <main className="flex w-full flex-col items-center bg-white">
      <HeroSection />
      <MobileHeroSection />
      <MobileFeatureGrid />
      <WhySignalSection />
      <MobileWhySignalList />
      <HowItWorksSection />
      <LandingAutoScroll />
      <ScrollToTopButton />
    </main>
  );
}
