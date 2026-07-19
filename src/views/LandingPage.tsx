import HeroSection from "@/widgets/HeroSection";
import HowItWorksSection from "@/widgets/HowItWorksSection";
import WhySignalSection from "@/widgets/WhySignalSection";

export default function LandingPage() {
  return (
    <main className="flex w-full flex-col items-center bg-white">
      <HeroSection />
      <WhySignalSection />
      <HowItWorksSection />
    </main>
  );
}
