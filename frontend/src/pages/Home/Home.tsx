import Navbar from "../../components/layout/Navbar";
import Hero from "../../components/common/Hero";
import ServicesSection from "../../components/common/ServicesSection";
import Features from "../../components/common/Features";
import HowItWorks from "../../components/common/HowItWorks";
import Testimonials from "../../components/common/Testimonials";
import CTA from "../../components/common/CTA";
import Footer from "../../components/layout/Footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <Hero />
      <ServicesSection />
      <Features />
      <HowItWorks />
      <Testimonials />
      <CTA />
      <Footer />
    </>
  );
}