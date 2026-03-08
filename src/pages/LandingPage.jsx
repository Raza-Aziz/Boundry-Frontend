import Navbar from "../components/landing/Navbar";
import HeroSection from "../components/landing/HeroSection";
import FeaturedListings from "../components/landing/FeaturedListings";
import WhyBoundry from "../components/landing/WhyBoundry";
import GlobalReach from "../components/landing/GlobalReach";
import Footer from "../components/landing/Footer";

export default function LandingPage() {
  return (
    <div className="bg-boundry-bg-light dark:bg-boundry-bg-dark text-boundry-text-dark dark:text-stone-100 font-display antialiased selection:bg-boundry-primary selection:text-white transition-colors duration-300">
      <Navbar />
      <HeroSection />
      <FeaturedListings />
      <WhyBoundry />
      <GlobalReach />
      <Footer />
    </div>
  );
}
