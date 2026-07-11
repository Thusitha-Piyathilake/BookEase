import Navbar from "../../components/layout/Navbar";
import Hero from "../../components/common/Hero";
import ServicesSection from "../../components/common/ServicesSection";
import Footer from "../../components/layout/Footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <Hero />
      <ServicesSection />
      <Footer />
    </>
  );
}