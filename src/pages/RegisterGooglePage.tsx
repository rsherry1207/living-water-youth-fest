import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { ExternalLink } from "lucide-react";

const RegisterGooglePage = () => {
  const googleFormUrl = "https://docs.google.com/forms/d/e/1FAIpQLSe3HN5E24ez55v23IbtrOB-qmmCipeJ6DcjRterDbYBO8V-kw/viewform?usp=dialog";

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />
      
      <main className="flex-1 flex items-center justify-center px-4 py-16">
        <div className="max-w-md w-full text-center space-y-8">
          <div className="space-y-4">
            <h1 className="text-4xl md:text-5xl font-display font-bold text-foreground">
              Register for SRYFC
            </h1>
            <p className="text-lg text-muted-foreground">
              Join us for an unforgettable experience! Complete your registration through our secure Google Form.
            </p>
          </div>

          <Button
            asChild
            size="lg"
            className="text-lg px-8 py-6 h-auto"
          >
            <a 
              href={googleFormUrl} 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2"
            >
              Register via Google Form
              <ExternalLink className="h-5 w-5" />
            </a>
          </Button>

          <p className="text-sm text-muted-foreground">
            You'll be redirected to Google Forms in a new tab.
          </p>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default RegisterGooglePage;
