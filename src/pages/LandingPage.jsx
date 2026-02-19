import Navbar from "@/components/landing/Navbar";
import HeroSection from "@/components/landing/HeroSection";
import FeaturedListings from "@/components/landing/FeaturedListings";
import WhyBoundry from "@/components/landing/WhyBoundry";
import GlobalReach from "@/components/landing/GlobalReach";
import Footer from "@/components/landing/Footer";

export default function LandingPage() {
  return (
    <div className="bg-boundry-bg-light text-boundry-text-dark font-display antialiased selection:bg-boundry-primary selection:text-white">
      <Navbar />
      <HeroSection />
      <FeaturedListings />
      <WhyBoundry />
      <GlobalReach />
      <Footer />
    </div>
  );
}
