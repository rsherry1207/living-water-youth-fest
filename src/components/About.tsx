import { Waves, Users, Heart } from "lucide-react";

const About = () => {
  return (
    <section id="about" className="py-20 px-4 bg-background">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-16">
          <h2 className="font-barlow font-bold text-5xl md:text-6xl text-primary mb-4">
            About Living Water
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-secondary via-coral to-accent mx-auto rounded-full" />
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-16">
          <div className="bg-card rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all hover:-translate-y-2 border-2 border-ocean-light">
            <div className="w-16 h-16 bg-gradient-to-br from-accent to-ocean-dark rounded-full flex items-center justify-center mb-6 mx-auto">
              <Waves className="w-8 h-8 text-white" />
            </div>
            <h3 className="font-display font-bold text-2xl text-center mb-4 text-primary">
              Spiritual Refreshment
            </h3>
            <p className="text-muted-foreground text-center leading-relaxed">
              Experience the refreshing presence of God through worship, fellowship, and powerful messages that will renew your faith.
            </p>
          </div>

          <div className="bg-card rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all hover:-translate-y-2 border-2 border-sand-light">
            <div className="w-16 h-16 bg-gradient-to-br from-secondary to-coral rounded-full flex items-center justify-center mb-6 mx-auto">
              <Users className="w-8 h-8 text-white" />
            </div>
            <h3 className="font-display font-bold text-2xl text-center mb-4 text-primary">
              Youth Connection
            </h3>
            <p className="text-muted-foreground text-center leading-relaxed">
              Connect with fellow young believers from across the region, building lasting friendships and spiritual community.
            </p>
          </div>

          <div className="bg-card rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all hover:-translate-y-2 border-2 border-coral-light">
            <div className="w-16 h-16 bg-gradient-to-br from-coral to-pink-accent rounded-full flex items-center justify-center mb-6 mx-auto">
              <Heart className="w-8 h-8 text-white" />
            </div>
            <h3 className="font-display font-bold text-2xl text-center mb-4 text-primary">
              Transformative Experience
            </h3>
            <p className="text-muted-foreground text-center leading-relaxed">
              Encounter God in a fresh way and return home equipped and inspired to live out your faith with passion.
            </p>
          </div>
        </div>

        <div className="bg-gradient-to-br from-ocean-light to-sand-light rounded-3xl p-8 md:p-12">
          <div className="max-w-3xl mx-auto text-center space-y-6">
            <p className="font-script text-4xl md:text-5xl text-primary mb-6">
              The Living Water
            </p>
            <p className="font-serif text-xl md:text-2xl text-ocean-deep italic leading-relaxed">
              "Whoever drinks the water I give them will never thirst. Indeed, the water I give them will become in them a spring of water welling up to eternal life."
            </p>
            <p className="font-display font-semibold text-lg text-ocean-dark">
              — John 4:14
            </p>
            <div className="pt-4">
              <p className="font-display text-lg text-foreground leading-relaxed">
                This summer, we invite you to dive deep into the refreshing waters of God's love and grace. 
                Join us for a transformative weekend filled with worship, teaching, fellowship, and fun as we 
                explore what it means to drink from the Living Water that Jesus offers.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
