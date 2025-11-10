import Hero from "@/components/Hero";
import About from "@/components/About";
import Churches from "@/components/Churches";
import Registration from "@/components/Registration";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Hero />
      <About />
      <Churches />
      <Registration />
      <Footer />
    </div>
  );
};

export default Index;
