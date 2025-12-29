import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import heroImage from "@/assets/hero-living-water.jpg";

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image with Overlay */}
      <div 
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${heroImage})` }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-ocean-dark/30 via-ocean-dark/20 to-ocean-dark/40" />
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 py-20 text-center">
        <div className="max-w-5xl mx-auto space-y-8 animate-fade-in">
          {/* Year */}
          <div className="inline-block px-6 py-2 bg-secondary/90 backdrop-blur-sm rounded-full">
            <p className="font-display font-bold text-ocean-deep text-lg tracking-wide">
              SUMMER 2026
            </p>
          </div>

          {/* Main Title */}
          <div className="space-y-4">
            <h1 className="font-barlow font-bold text-6xl md:text-8xl lg:text-9xl text-white drop-shadow-2xl tracking-tight">
              LIVING WATER
            </h1>
            <p className="font-script text-4xl md:text-5xl lg:text-6xl text-secondary drop-shadow-lg">
              Youth Conference
            </p>
          </div>

          {/* Subtitle */}
          <div className="space-y-2">
            <p className="font-serif text-xl md:text-2xl text-white font-medium drop-shadow-lg">
              A Mar Thoma Church Regional Conference
            </p>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-8">
            <Link to="/register">
              <Button 
                size="lg" 
                className="bg-secondary hover:bg-secondary/90 text-ocean-deep font-display font-bold text-lg px-8 py-6 rounded-full shadow-xl hover:shadow-2xl transition-all hover:scale-105"
              >
                Register Now
              </Button>
            </Link>
          </div>

          {/* Scroll Indicator */}
          <div className="pt-12 animate-bounce">
            <div className="w-8 h-12 mx-auto border-2 border-white/50 rounded-full flex items-start justify-center p-2">
              <div className="w-1 h-3 bg-white/70 rounded-full" />
            </div>
          </div>
        </div>
      </div>

      {/* Wave Decoration */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg className="w-full h-24 md:h-32" viewBox="0 0 1200 120" preserveAspectRatio="none">
          <path 
            d="M0,60 C300,100 600,20 900,60 C1050,80 1125,90 1200,60 L1200,120 L0,120 Z" 
            fill="hsl(var(--background))"
            opacity="0.9"
          />
        </svg>
      </div>
    </section>
  );
};

export default Hero;
