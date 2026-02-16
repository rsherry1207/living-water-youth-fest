import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Raffle from "@/components/Raffle";
import About from "@/components/About";
import Schedule from "@/components/Schedule";
import Churches from "@/components/Churches";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Navbar />
      <Hero />
      <Raffle />
      <About />
      <Schedule />
      <Churches />
      <Footer />
    </div>
  );
};

export default Index;
