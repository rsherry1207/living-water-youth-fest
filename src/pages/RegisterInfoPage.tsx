import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { HelpCircle, Mail, Phone, MapPin, Calendar, Users, DollarSign, Clock } from "lucide-react";

const RegisterInfoPage = () => {
  return (
    <div className="min-h-screen bg-ocean-dark">
      <Navbar />
      <main className="pt-16">
        <div className="container mx-auto px-4 py-20">
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-display font-bold text-sand-light">
              Registration Info & Help
            </h1>
            <p className="text-sand/80 text-center mt-4 max-w-2xl mx-auto">
              Everything you need to know about registering for SRYFC 2026
            </p>
            <div className="w-24 h-1 bg-gradient-to-r from-secondary via-coral to-white mx-auto rounded-full mt-6" />
          </div>

          {/* Info Cards */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 text-center border border-white/20 hover:bg-white/15 transition-all">
              <Calendar className="w-10 h-10 mx-auto mb-4 text-secondary" />
              <h3 className="font-display font-bold text-lg mb-2 text-sand-light">When</h3>
              <p className="text-sand/80">Summer 2026</p>
              <p className="text-sm text-sand/60 mt-1">(Exact dates TBA)</p>
            </div>

            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 text-center border border-white/20 hover:bg-white/15 transition-all">
              <Clock className="w-10 h-10 mx-auto mb-4 text-secondary" />
              <h3 className="font-display font-bold text-lg mb-2 text-sand-light">Duration</h3>
              <p className="text-sand/80">Weekend</p>
              <p className="text-sm text-sand/60 mt-1">Conference</p>
            </div>

            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 text-center border border-white/20 hover:bg-white/15 transition-all">
              <Users className="w-10 h-10 mx-auto mb-4 text-secondary" />
              <h3 className="font-display font-bold text-lg mb-2 text-sand-light">Who</h3>
              <p className="text-sand/80">Youth</p>
              <p className="text-sm text-sand/60 mt-1">Mar Thoma Church</p>
            </div>

            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 text-center border border-white/20 hover:bg-white/15 transition-all">
              <DollarSign className="w-10 h-10 mx-auto mb-4 text-secondary" />
              <h3 className="font-display font-bold text-lg mb-2 text-sand-light">Cost</h3>
              <p className="text-sand/80">TBA</p>
              <p className="text-sm text-sand/60 mt-1">Details coming soon</p>
            </div>
          </div>

          {/* Help Section */}
          <div className="bg-white rounded-3xl p-8 md:p-12 max-w-4xl mx-auto mb-12">
            <div className="text-center space-y-6">
              <HelpCircle className="w-16 h-16 mx-auto text-ocean-medium" />
              <h2 className="font-display font-bold text-3xl md:text-4xl text-ocean-dark">
                Need Help?
              </h2>
              <p className="font-display text-lg text-muted-foreground max-w-2xl mx-auto">
                If you have any questions about registration, the conference, or need assistance, please don't hesitate to reach out to us.
              </p>
              
              <div className="grid md:grid-cols-2 gap-6 pt-6">
                <div className="flex items-center justify-center gap-3 text-ocean-dark">
                  <Mail className="w-5 h-5 text-secondary" />
                  <span className="font-display">sryfc@marthomachurch.org</span>
                </div>
                <div className="flex items-center justify-center gap-3 text-ocean-dark">
                  <Phone className="w-5 h-5 text-secondary" />
                  <span className="font-display">(555) 123-4567</span>
                </div>
              </div>

              <div className="pt-8">
                <Link to="/register">
                  <Button 
                    size="lg"
                    className="bg-gradient-to-r from-secondary to-coral hover:from-coral hover:to-secondary text-white font-display font-bold text-lg px-10 py-6 rounded-full shadow-xl hover:shadow-2xl transition-all hover:scale-105"
                  >
                    Register Now
                  </Button>
                </Link>
              </div>
            </div>
          </div>

          {/* FAQ Section */}
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl md:text-3xl font-display font-bold text-sand-light text-center mb-8">
              Frequently Asked Questions
            </h2>
            <div className="space-y-4">
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
                <h3 className="font-display font-bold text-sand-light mb-2">Who can attend SRYFC?</h3>
                <p className="text-sand/80">Youth from all participating Mar Thoma churches are welcome to attend.</p>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
                <h3 className="font-display font-bold text-sand-light mb-2">Do I need parental consent if I'm under 18?</h3>
                <p className="text-sand/80">Yes, participants under 18 must provide parent/guardian contact information during registration.</p>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
                <h3 className="font-display font-bold text-sand-light mb-2">Can I register multiple people at once?</h3>
                <p className="text-sand/80">Each person must be registered individually with their own unique email address.</p>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default RegisterInfoPage;
