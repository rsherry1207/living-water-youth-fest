import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const AboutMerchPage = () => {
  return (
    <div className="min-h-screen bg-ocean-dark">
      <Navbar />
      <main className="pt-16">
        <div className="container mx-auto px-4 py-20">
          <h1 className="text-4xl md:text-5xl font-display font-bold text-sand-light text-center">
            About Merch
          </h1>
          <p className="text-sand/80 text-center mt-4">Content coming soon...</p>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default AboutMerchPage;
