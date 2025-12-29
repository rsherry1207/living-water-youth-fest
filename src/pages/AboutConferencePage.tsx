import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { MapPin, Users, Calendar, Mail, Instagram } from "lucide-react";

const AboutConferencePage = () => {
  const parishes = [
    "Nashville",
    "Chattanooga", 
    "Atlanta",
    "Jacksonville",
    "Orlando",
    "St. Marks",
    "St. Lukes",
    "South Florida"
  ];

  const conferenceIncludes = [
    "Praise and Worship",
    "Talks from a main speaker",
    "Small Group Breakouts",
    "Merch",
    "Volunteer opportunity for a Charity TBD",
    "Meals",
    "Fellowship with youths across 8 parishes",
    "and more!"
  ];

  return (
    <div className="min-h-screen bg-ocean-dark">
      <Navbar />
      <main className="pt-16">
        <div className="container mx-auto px-4 py-20">
          {/* Header */}
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-display font-bold text-sand-light mb-4">
              About SRYFC
            </h1>
            <p className="text-sand/80 text-lg max-w-2xl mx-auto">
              Interested in connecting with other Mar Thoma youth in the Southern region but don't know where to start? Here's the answers you were looking for!
            </p>
          </div>

          {/* FAQ Cards Grid */}
          <div className="grid gap-8 md:grid-cols-2 max-w-5xl mx-auto">
            
            {/* What is SRYFC? */}
            <div className="bg-ocean-deep/80 backdrop-blur-sm rounded-2xl p-8 border border-teal/20">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 bg-secondary/20 rounded-lg">
                  <Calendar className="w-6 h-6 text-secondary" />
                </div>
                <h2 className="font-script text-2xl text-secondary">What is SRYFC?</h2>
              </div>
              <div className="w-16 h-1 bg-secondary mb-6" />
              <p className="text-sand-light mb-4">
                SRYFC is a 4 day, 3 night conference that is hosted within the Southern Region. It includes:
              </p>
              <ul className="space-y-2">
                {conferenceIncludes.map((item, index) => (
                  <li key={index} className="flex items-start gap-2 text-sand/90">
                    <span className="text-secondary mt-1">•</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Where is SRYFC? */}
            <div className="bg-ocean-deep/80 backdrop-blur-sm rounded-2xl p-8 border border-teal/20">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 bg-secondary/20 rounded-lg">
                  <MapPin className="w-6 h-6 text-secondary" />
                </div>
                <h2 className="font-script text-2xl text-secondary">Where is SRYFC?</h2>
              </div>
              <div className="w-16 h-1 bg-secondary mb-6" />
              <p className="text-sand-light mb-4">
                This year, SRYFC will be hosted at the Christian Retreat Center in Bradenton, FL.
              </p>
              <p className="text-sand/90 font-medium">
                1200 Glory Way Blvd, Bradenton, FL 34212
              </p>
            </div>

            {/* Who can attend? */}
            <div className="bg-ocean-deep/80 backdrop-blur-sm rounded-2xl p-8 border border-teal/20">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 bg-secondary/20 rounded-lg">
                  <Users className="w-6 h-6 text-secondary" />
                </div>
                <h2 className="font-script text-2xl text-secondary">Who can attend?</h2>
              </div>
              <div className="w-16 h-1 bg-secondary mb-6" />
              <p className="text-secondary font-display font-bold text-xl mb-4">
                Regional Youth Conferences are for any youth 12-35!
              </p>
              <p className="text-sand-light mb-3">
                The Southern Region includes the following parishes:
              </p>
              <ul className="grid grid-cols-2 gap-2">
                {parishes.map((parish, index) => (
                  <li key={index} className="flex items-center gap-2 text-sand/90">
                    <span className="text-secondary">•</span>
                    <span>{parish}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Why should I attend? */}
            <div className="bg-ocean-deep/80 backdrop-blur-sm rounded-2xl p-8 border border-teal/20">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 bg-secondary/20 rounded-lg">
                  <Users className="w-6 h-6 text-secondary" />
                </div>
                <h2 className="font-script text-2xl text-secondary">Why should I attend?</h2>
              </div>
              <div className="w-16 h-1 bg-secondary mb-6" />
              <p className="text-sand-light mb-4">Regionals is:</p>
              <ul className="space-y-3">
                <li className="flex items-start gap-2 text-sand/90">
                  <span className="text-secondary mt-1">•</span>
                  <span>A really good opportunity for our youths to interact with like-minded people across our region</span>
                </li>
                <li className="flex items-start gap-2 text-sand/90">
                  <span className="text-secondary mt-1">•</span>
                  <span>Spend time in fellowship, as well as be immersed in an all-inclusive weekend</span>
                </li>
                <li className="flex items-start gap-2 text-sand/90">
                  <span className="text-secondary mt-1">•</span>
                  <span>Centered around growing and strengthening our relationship with Christ, both as individuals and as a youth fellowship</span>
                </li>
              </ul>
            </div>

          </div>

          {/* Contact - Centered at bottom */}
          <div className="max-w-md mx-auto mt-8">
            <div className="bg-ocean-deep/80 backdrop-blur-sm rounded-2xl p-8 border border-teal/20 text-center">
              <div className="flex items-center justify-center gap-3 mb-6">
                <div className="p-2 bg-secondary/20 rounded-lg">
                  <Mail className="w-6 h-6 text-secondary" />
                </div>
                <h2 className="font-script text-2xl text-secondary">Have Questions?</h2>
              </div>
              <div className="w-16 h-1 bg-secondary mb-6 mx-auto" />
              <p className="text-sand-light mb-6">
                If you have any other questions, please feel free to reach out to us!
              </p>
              <div className="space-y-4 flex flex-col items-center">
                <a 
                  href="https://instagram.com/sryfconference" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 text-sand/90 hover:text-secondary transition-colors"
                >
                  <Instagram className="w-5 h-5" />
                  <span>@sryfconference</span>
                </a>
                <a 
                  href="mailto:sryfconference@gmail.com"
                  className="flex items-center gap-3 text-sand/90 hover:text-secondary transition-colors"
                >
                  <Mail className="w-5 h-5" />
                  <span>sryfconference@gmail.com</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default AboutConferencePage;
