import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { ExternalLink, FileText, CreditCard } from "lucide-react";

const GOOGLE_FORM_URL = "https://docs.google.com/forms/d/e/1FAIpQLSe3HN5E24ez55v23IbtrOB-qmmCipeJ6DcjRterDbYBO8V-kw/viewform";
const ZEFFY_PAYMENT_URL = "https://www.zeffy.com/en-US/ticketing/southern-regional-youth-conference--2026";

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
              Complete the two steps below to secure your spot at the conference
            </p>
            <div className="w-24 h-1 bg-gradient-to-r from-secondary via-coral to-white mx-auto rounded-full mt-6" />
          </div>

          {/* Registration Steps */}
          <div className="max-w-2xl mx-auto">
            {/* Step 1: Google Form */}
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 md:p-8 text-center mb-6">
              <div className="flex items-center justify-center gap-3 mb-4">
                <div className="w-10 h-10 bg-secondary rounded-full flex items-center justify-center">
                  <span className="text-white font-bold text-lg">1</span>
                </div>
                <h2 className="text-xl md:text-2xl font-display font-bold text-sand-light">
                  Complete Registration Form
                </h2>
              </div>
              <p className="text-sand-light text-lg mb-6">
                Register for the conference by completing the Google Form using the button below.
              </p>
              <Button
                asChild
                size="lg"
                className="bg-secondary hover:bg-secondary/90 text-white font-display text-lg px-8 py-6"
              >
                <a
                  href={GOOGLE_FORM_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2"
                >
                  <FileText className="w-5 h-5" />
                  Open Registration Form
                  <ExternalLink className="w-4 h-4" />
                </a>
              </Button>
            </div>

            {/* Step 2: Payment */}
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 md:p-8 text-center">
              <div className="flex items-center justify-center gap-3 mb-4">
                <div className="w-10 h-10 bg-coral rounded-full flex items-center justify-center">
                  <span className="text-white font-bold text-lg">2</span>
                </div>
                <h2 className="text-xl md:text-2xl font-display font-bold text-sand-light">
                  Complete Payment
                </h2>
              </div>
              <p className="text-sand-light text-lg mb-6">
                After completing the registration form, finalize your registration by paying through Zeffy.
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
                  <CreditCard className="w-5 h-5" />
                  Proceed to Payment
                  <ExternalLink className="w-4 h-4" />
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
