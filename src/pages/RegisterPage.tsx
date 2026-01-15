import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { ExternalLink } from "lucide-react";

const GOOGLE_FORM_URL = "https://docs.google.com/forms/d/e/1FAIpQLSe3HN5E24ez55v23IbtrOB-qmmCipeJ6DcjRterDbYBO8V-kw/viewform?embedded=true";
const ZEFFY_PAYMENT_URL = "https://www.zeffy.com/en-US/ticketing/southern-regional-youth-fellowship-conference--2026";

const RegisterPage = () => {
  return (
    <div className="min-h-screen bg-ocean-dark">
      <Navbar />
      <main className="pt-16">
        <div className="container mx-auto px-4 py-12 md:py-20">
          {/* Header */}
          <div className="text-center mb-8 md:mb-12">
            <h1 className="text-3xl md:text-5xl font-display font-bold text-sand-light">
              Register for SRYFC 2026
            </h1>
            <p className="text-sand/80 text-center mt-4 max-w-2xl mx-auto">
              Fill out the form below to secure your spot at the conference
            </p>
            <div className="w-24 h-1 bg-gradient-to-r from-secondary via-coral to-white mx-auto rounded-full mt-6" />
          </div>

          {/* Google Form Embed */}
          <div className="max-w-4xl mx-auto">
            <div className="bg-white rounded-3xl overflow-hidden shadow-xl">
              <iframe
                src={GOOGLE_FORM_URL}
                width="100%"
                height="800"
                frameBorder="0"
                marginHeight={0}
                marginWidth={0}
                title="SRYFC 2026 Registration Form"
                className="w-full min-h-[600px] md:min-h-[800px]"
              >
                Loading…
              </iframe>
            </div>

            {/* Payment Section */}
            <div className="mt-8 bg-white/10 backdrop-blur-sm rounded-2xl p-6 md:p-8 text-center">
              <p className="text-sand-light text-lg mb-6">
                After completing this registration form, please proceed to payment using the button below.
              </p>
              <Button
                asChild
                size="lg"
                className="bg-coral hover:bg-coral/90 text-white font-display text-lg px-8 py-6"
              >
                <a
                  href={ZEFFY_PAYMENT_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2"
                >
                  Proceed to Payment
                  <ExternalLink className="w-5 h-5" />
                </a>
              </Button>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default RegisterPage;
