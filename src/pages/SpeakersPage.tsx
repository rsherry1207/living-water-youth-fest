import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const speakers = [
  {
    name: "Pastor John Smith",
    role: "Senior Pastor, Grace Community Church",
    bio: "Pastor John Smith has been serving in ministry for over 25 years. His passion for teaching God's Word and discipling the next generation has impacted thousands of lives across the country. He is known for his engaging speaking style and deep biblical insights that make Scripture come alive for listeners of all ages.",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face"
  },
  {
    name: "Sarah Johnson",
    role: "Youth Ministry Director",
    bio: "Sarah Johnson brings over 15 years of experience in youth ministry. Her dynamic approach to connecting with young people and her heart for worship has made her a sought-after speaker at conferences nationwide. She believes in empowering youth to discover their God-given purpose and live out their faith boldly.",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop&crop=face"
  },
  {
    name: "Dr. Michael Chen",
    role: "Theology Professor & Author",
    bio: "Dr. Michael Chen is a respected theologian and author of several bestselling books on Christian living. His academic background combined with practical ministry experience gives him a unique perspective on applying biblical truths to everyday life. He has a gift for making complex theological concepts accessible and applicable.",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop&crop=face"
  },
  {
    name: "Rebecca Martinez",
    role: "Worship Leader & Recording Artist",
    bio: "Rebecca Martinez is an acclaimed worship leader and recording artist whose music has touched hearts around the world. With multiple albums and a passionate heart for leading others into God's presence, she brings a powerful combination of musical excellence and spiritual depth to every gathering she leads.",
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop&crop=face"
  }
];

const SpeakersPage = () => {
  return (
    <div className="min-h-screen bg-ocean-dark">
      <Navbar />
      <main className="pt-16">
        <div className="container mx-auto px-4 py-20">
          <h1 className="text-4xl md:text-5xl font-display font-bold text-sand-light text-center mb-4">
            Our Speakers
          </h1>
          <p className="text-sand/80 text-center mb-16 max-w-2xl mx-auto">
            Meet the incredible speakers who will be sharing God's Word and inspiring our hearts at this year's conference.
          </p>

          <div className="space-y-20">
            {speakers.map((speaker, index) => (
              <div
                key={speaker.name}
                className={`flex flex-col ${
                  index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                } gap-8 md:gap-12 items-center`}
              >
                {/* Text Content */}
                <div className="flex-1 space-y-4">
                  <h2 className="text-2xl md:text-3xl font-display font-bold text-sand-light">
                    {speaker.name}
                  </h2>
                  <p className="text-water-light font-medium">{speaker.role}</p>
                  <p className="text-sand/80 leading-relaxed">{speaker.bio}</p>
                </div>

                {/* Image */}
                <div className="flex-shrink-0">
                  <div className="w-64 h-64 md:w-80 md:h-80 rounded-2xl overflow-hidden border-4 border-water/30 shadow-xl">
                    <img
                      src={speaker.image}
                      alt={speaker.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default SpeakersPage;
