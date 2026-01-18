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

          {/* Event Details */}
          <div className="grid md:grid-cols-2 gap-6 mb-12 max-w-4xl mx-auto">
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20 hover:bg-white/15 transition-all">
              <div className="flex items-start gap-4">
                <MapPin className="w-8 h-8 text-secondary flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-display font-bold text-lg mb-2 text-sand-light">Location</h3>
                  <p className="text-sand/80">Christian Retreat Conference Center</p>
                  <p className="text-sand/60">Bradenton, Florida</p>
                </div>
              </div>
            </div>

            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20 hover:bg-white/15 transition-all">
              <div className="flex items-start gap-4">
                <Calendar className="w-8 h-8 text-secondary flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-display font-bold text-lg mb-2 text-sand-light">Dates</h3>
                  <p className="text-sand/80">June 25 – June 28, 2026</p>
                </div>
              </div>
            </div>
          </div>

          {/* Schedule Button */}
          <div className="text-center mb-12">
            <Link to="/schedule">
              <Button 
                size="lg"
                variant="outline"
                className="bg-white/10 backdrop-blur-sm hover:bg-white/20 text-sand-light border-2 border-white/30 font-display font-semibold text-lg px-8 py-6 rounded-full shadow-xl hover:shadow-2xl transition-all hover:scale-105"
              >
                Schedule
              </Button>
            </Link>
          </div>

          {/* Registration Periods */}
          <div className="max-w-4xl mx-auto mb-12">
            <h2 className="text-2xl md:text-3xl font-display font-bold text-sand-light text-center mb-8">
              Registration Periods
            </h2>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 text-center border border-white/20 hover:bg-white/15 transition-all">
                <div className="w-12 h-12 bg-secondary/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-secondary font-bold text-lg">1</span>
                </div>
                <h3 className="font-display font-bold text-lg mb-2 text-sand-light">Early Bird</h3>
                <p className="text-sand/80">January 18 – February 21</p>
              </div>

              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 text-center border border-white/20 hover:bg-white/15 transition-all">
                <div className="w-12 h-12 bg-secondary/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-secondary font-bold text-lg">2</span>
                </div>
                <h3 className="font-display font-bold text-lg mb-2 text-sand-light">Regular</h3>
                <p className="text-sand/80">February 22 – May 9</p>
              </div>

              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 text-center border border-white/20 hover:bg-white/15 transition-all">
                <div className="w-12 h-12 bg-secondary/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-secondary font-bold text-lg">3</span>
                </div>
                <h3 className="font-display font-bold text-lg mb-2 text-sand-light">Late</h3>
                <p className="text-sand/80">May 10 – June 14</p>
              </div>
            </div>
          </div>

          {/* Registration Process */}
          <div className="bg-white rounded-3xl p-8 md:p-12 max-w-4xl mx-auto mb-12">
            <div className="text-center space-y-6">
              <h2 className="font-display font-bold text-3xl md:text-4xl text-ocean-dark">
                Registration Process
              </h2>
              <div className="text-left max-w-2xl mx-auto space-y-4">
                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 bg-secondary rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-white font-bold text-sm">1</span>
                  </div>
                  <p className="font-display text-lg text-muted-foreground">
                    Visit the main registration page and complete your registration.
                  </p>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 bg-secondary rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-white font-bold text-sm">2</span>
                  </div>
                  <p className="font-display text-lg text-muted-foreground">
                    Complete the required Google Form.
                  </p>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 bg-secondary rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-white font-bold text-sm">3</span>
                  </div>
                  <p className="font-display text-lg text-muted-foreground">
                    Finalize registration by paying through Zeffy.
                  </p>
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

          {/* Help Section */}
          <div className="bg-white/10 backdrop-blur-sm rounded-3xl p-8 md:p-12 max-w-4xl mx-auto mb-12 border border-white/20">
            <div className="text-center space-y-6">
              <HelpCircle className="w-16 h-16 mx-auto text-secondary" />
              <h2 className="font-display font-bold text-3xl md:text-4xl text-sand-light">
                Need Help?
              </h2>
              <p className="font-display text-lg text-sand/80 max-w-2xl mx-auto">
                If you have any questions about registration, the conference, or need assistance, please don't hesitate to reach out to us.
              </p>
              
              <div className="flex flex-col items-center gap-4 pt-6">
                <div className="flex items-center justify-center gap-3 text-sand-light">
                  <Mail className="w-5 h-5 text-secondary" />
                  <span className="font-display">sryfconference@gmail.com</span>
                </div>
                <div className="flex items-center justify-center gap-3 text-sand-light">
                  <Phone className="w-5 h-5 text-secondary" />
                  <span className="font-display">(813) 992-7874</span>
                </div>
                <div className="flex items-center justify-center gap-3 text-sand-light">
                  <Phone className="w-5 h-5 text-secondary" />
                  <span className="font-display">(954) 909-3700</span>
                </div>
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
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default RegisterInfoPage;
