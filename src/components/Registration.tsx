import { Button } from "@/components/ui/button";
import { Calendar, Clock, DollarSign, Users } from "lucide-react";

const Registration = () => {
  return (
    <section className="py-20 px-4 bg-gradient-to-b from-ocean-medium to-ocean-dark text-white">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-16">
          <h2 className="font-barlow font-bold text-5xl md:text-6xl mb-4">
            Join Us This Summer
          </h2>
          <p className="font-display text-xl text-ocean-light max-w-2xl mx-auto">
            Registration details coming soon. Save the date!
          </p>
          <div className="w-24 h-1 bg-gradient-to-r from-secondary via-coral to-white mx-auto rounded-full mt-6" />
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 text-center border border-white/20 hover:bg-white/15 transition-all">
            <Calendar className="w-10 h-10 mx-auto mb-4 text-secondary" />
            <h3 className="font-display font-bold text-lg mb-2">When</h3>
            <p className="text-ocean-light">Summer 2026</p>
            <p className="text-sm text-ocean-light mt-1">(Exact dates TBA)</p>
          </div>

          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 text-center border border-white/20 hover:bg-white/15 transition-all">
            <Clock className="w-10 h-10 mx-auto mb-4 text-secondary" />
            <h3 className="font-display font-bold text-lg mb-2">Duration</h3>
            <p className="text-ocean-light">Weekend</p>
            <p className="text-sm text-ocean-light mt-1">Conference</p>
          </div>

          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 text-center border border-white/20 hover:bg-white/15 transition-all">
            <Users className="w-10 h-10 mx-auto mb-4 text-secondary" />
            <h3 className="font-display font-bold text-lg mb-2">Who</h3>
            <p className="text-ocean-light">Youth</p>
            <p className="text-sm text-ocean-light mt-1">Mar Thoma Church</p>
          </div>

          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 text-center border border-white/20 hover:bg-white/15 transition-all">
            <DollarSign className="w-10 h-10 mx-auto mb-4 text-secondary" />
            <h3 className="font-display font-bold text-lg mb-2">Cost</h3>
            <p className="text-ocean-light">TBA</p>
            <p className="text-sm text-ocean-light mt-1">Details coming soon</p>
          </div>
        </div>

        <div className="bg-white rounded-3xl p-8 md:p-12 max-w-4xl mx-auto">
          <div className="text-center space-y-6">
            <h3 className="font-display font-bold text-3xl md:text-4xl text-ocean-dark">
              Ready to Dive In?
            </h3>
            <p className="font-display text-lg text-muted-foreground max-w-2xl mx-auto">
              Registration will open soon! Sign up for updates to be the first to know when registration begins and to receive important conference information.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-6">
              <Button 
                size="lg"
                className="bg-gradient-to-r from-secondary to-coral hover:from-coral hover:to-secondary text-white font-display font-bold text-lg px-10 py-6 rounded-full shadow-xl hover:shadow-2xl transition-all hover:scale-105"
              >
                Get Updates
              </Button>
              <Button 
                size="lg"
                variant="outline"
                className="border-2 border-ocean-medium text-ocean-dark hover:bg-ocean-medium hover:text-white font-display font-semibold text-lg px-10 py-6 rounded-full transition-all hover:scale-105"
              >
                Contact Organizers
              </Button>
            </div>

            <div className="pt-8 border-t border-ocean-light/30 mt-8">
              <p className="font-display text-sm text-muted-foreground">
                Questions about the conference? Want to volunteer or help with planning?
                <br />
                We'd love to hear from you!
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Registration;
