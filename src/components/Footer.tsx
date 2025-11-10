import { Waves } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-ocean-deep text-white py-12 px-4">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center space-y-6">
          <div className="flex items-center justify-center gap-3">
            <Waves className="w-8 h-8 text-accent" />
            <h3 className="font-script text-4xl text-secondary">Living Water</h3>
          </div>
          
          <p className="font-display text-lg text-ocean-light max-w-2xl mx-auto">
            A Mar Thoma Church Youth Conference
          </p>
          
          <div className="flex flex-col md:flex-row gap-4 md:gap-8 justify-center items-center text-sm text-ocean-light font-display">
            <p>St. Mark's Mar Thoma Church</p>
            <span className="hidden md:inline">•</span>
            <p>Mar Thoma Church of South Florida</p>
          </div>

          <div className="pt-8 border-t border-ocean-medium/30">
            <p className="text-sm text-ocean-light/80">
              © 2026 Living Water Conference. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
