import Navbar from "../../components/layout/Navbar";
import Hero from "../../components/common/Hero";
import ServicesSection from "../../components/common/ServicesSection";
import Features from "../../components/common/Features";
import Footer from "../../components/layout/Footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <Hero />
      <ServicesSection />
      <Features />
      <Footer />
    </>
  );
}