import { Church, MapPin, Mail, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";

const Churches = () => {
  return (
    <section id="speakers" className="py-20 px-4 bg-gradient-to-b from-background to-ocean-light/30">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-16">
          <h2 className="font-barlow font-bold text-5xl md:text-6xl text-primary mb-4">
            Hosted By
          </h2>

          <div className="w-24 h-1 bg-gradient-to-r from-secondary via-coral to-accent mx-auto rounded-full mt-6" />
        </div>

        <div className="grid md:grid-cols-2 gap-8 mb-12">
          {/* St. Mark's Mar Thoma Church */}
          <div className="bg-card rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-all border-2 border-ocean-medium/20 hover:border-ocean-medium/40">
            <div className="flex items-center justify-center mb-6">
              <div className="w-20 h-20 bg-gradient-to-br from-accent to-ocean-dark rounded-full flex items-center justify-center">
                <Church className="w-10 h-10 text-white" />
              </div>
            </div>
            
            <h3 className="font-display font-bold text-3xl text-center text-primary mb-6">
              St. Mark's Mar Thoma Church
            </h3>
            
            <div className="space-y-4 mb-6">
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-accent flex-shrink-0 mt-1" />
                <p className="text-muted-foreground">
                  11029 Davis Rd, Tampa, FL 33637
                </p>
              </div>
              <div className="flex items-start gap-3">
                <Phone className="w-5 h-5 text-accent flex-shrink-0 mt-1" />
                <p className="text-muted-foreground">
                  (813) 992-7874 (Sushmita Saji)
                </p>
              </div>
              <div className="flex items-start gap-3">
                <Mail className="w-5 h-5 text-accent flex-shrink-0 mt-1" />
                <p className="text-muted-foreground">
                  sryfconference@gmail.com
                </p>
              </div>
            </div>

            <Button 
              variant="outline" 
              className="w-full border-2 border-ocean-medium hover:bg-ocean-medium hover:text-white font-display font-semibold transition-all"
              asChild
            >
              <a href="https://stmarksmtctampa.org/site2/" target="_blank" rel="noopener noreferrer">
                Learn more
              </a>
            </Button>
          </div>

          {/* Mar Thoma Church of South Florida */}
          <div className="bg-card rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-all border-2 border-secondary/20 hover:border-secondary/40">
            <div className="flex items-center justify-center mb-6">
              <div className="w-20 h-20 bg-gradient-to-br from-secondary to-coral rounded-full flex items-center justify-center">
                <Church className="w-10 h-10 text-white" />
              </div>
            </div>
            
            <h3 className="font-display font-bold text-3xl text-center text-primary mb-6">
              Mar Thoma Church of South Florida
            </h3>
            
            <div className="space-y-4 mb-6">
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-coral flex-shrink-0 mt-1" />
                <p className="text-muted-foreground">
                  4740 SW 82nd Ave, Davie, FL 33328
                </p>
              </div>
              <div className="flex items-start gap-3">
                <Phone className="w-5 h-5 text-coral flex-shrink-0 mt-1" />
                <p className="text-muted-foreground">
                  (954) 909-3700 (Steven John)
                </p>
              </div>
              <div className="flex items-start gap-3">
                <Mail className="w-5 h-5 text-coral flex-shrink-0 mt-1" />
                <p className="text-muted-foreground">
                  sryfconference@gmail.com
                </p>
              </div>
            </div>

            <Button 
              variant="outline" 
              className="w-full border-2 border-secondary hover:bg-secondary hover:text-ocean-deep font-display font-semibold transition-all"
              asChild
            >
              <a href="https://www.marthomachurchofsouthflorida.org/" target="_blank" rel="noopener noreferrer">
                Learn more
              </a>
            </Button>
          </div>
        </div>


      </div>
    </section>
  );
};

export default Churches;
