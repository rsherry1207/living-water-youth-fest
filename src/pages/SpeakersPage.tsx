import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import benAbrahamImg from "@/assets/ben-abraham.jpeg";
import pearlAbrahamImg from "@/assets/pearl-abraham.jpeg";

const speakers = [
  {
    name: "Ben Abraham",
    bio: "Ben Abraham lives in Dallas, TX with his family of four – Pearl Abraham, Judah (age 7) and David (age 4). Ben grew up in the Mar Thoma Church of Dallas, Carrollton and has been involved in mentoring youth for over 15 years. He has a particular passion for mentoring young men to be grounded in the Word and live out their faith. He works as a pediatrician for hospitalized children, and between 2015 and 2019 he lived in Miami, FL where he completed his residency training. During that time he worked closely with the St. Luke's Mar Thoma Church in Margate, FL and helped organize the 2018 Southern Regional Conference. Since that time he moved to St. Louis for fellowship and back to Dallas in 2021 where is currently plugged back into his home church, currently serving in the Young Families Fellowship.",
    image: benAbrahamImg
  },
  {
    name: "Pearl Abraham",
    bio: "Pearl Abraham is Ben's wife and grew up in Dubai until age 16 when she moved to Dallas. After finishing pharmacy school, Pearl moved back home and began working when she met Ben. They got married in 2016 and moved to Florida where she began specializing in oncology pharmacy. She has also been heavily involved in the Mar Thoma Church with a passion for bridging generational gaps, mentoring youth and teaching young children. In her (little) spare time, she likes to read non-fiction, dance, and try new places to eat.",
    image: pearlAbrahamImg
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
