"use client";

import { useIsLoggedIn } from "@/shared/lib/useIsLoggedIn";
import LandingPage from "@/views/LandingPage";
import Footer from "@/widgets/Footer";
import SiteHeader from "@/widgets/SiteHeader";
import HomeDashboard from "./HomeDashboard";

export default function HomePage() {
  const isLoggedIn = useIsLoggedIn();

  return (
    <>
      <SiteHeader />
      {isLoggedIn === null ? (
        <main className="min-h-screen bg-white" />
      ) : (
        <>
          {isLoggedIn ? <HomeDashboard /> : <LandingPage />}
          <Footer />
        </>
      )}
    </>
  );
}
