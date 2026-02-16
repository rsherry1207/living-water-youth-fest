import { Button } from "@/components/ui/button";
import { ExternalLink, Gift } from "lucide-react";

const RAFFLE_PAYMENT_URL = "#";

const prizes = [
  "$500 Southwest Airlines Gift Card",
  "iPad",
  "Nespresso Machine",
];

const Raffle = () => {
  return (
    <section className="py-16 md:py-24 bg-background">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto bg-primary/15 border border-primary/20 rounded-2xl p-8 md:p-12 text-center">
          {/* Title */}
          <h2 className="font-barlow font-bold text-4xl md:text-5xl text-secondary mb-6">
            Raffle
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-secondary via-coral to-white mx-auto rounded-full mb-8" />

          {/* Description */}
          <p className="text-foreground text-lg md:text-xl mb-8">
            Enter our raffle for a chance to win one of these amazing prizes!
          </p>

          {/* Prize List */}
          <div className="space-y-4 mb-10">
            {prizes.map((prize) => (
              <div
                key={prize}
                className="flex items-center gap-3 justify-center text-foreground text-lg"
              >
                <Gift className="w-5 h-5 text-secondary shrink-0" />
                <span className="font-display font-semibold">{prize}</span>
              </div>
            ))}
          </div>

          {/* Pay Now Button */}
          <a
            href={RAFFLE_PAYMENT_URL}
            target="_blank"
            rel="noopener noreferrer"
          >
            <Button
              size="lg"
              className="bg-secondary hover:bg-secondary/90 text-ocean-deep font-display font-bold text-lg px-8 py-6 rounded-full shadow-xl hover:shadow-2xl transition-all hover:scale-105"
            >
              Pay Now
              <ExternalLink className="w-4 h-4 ml-1" />
            </Button>
          </a>

          {/* Disclaimer */}
          <p className="mt-8 text-sm text-muted-foreground leading-relaxed max-w-md mx-auto">
            <span className="font-semibold text-foreground">Note:</span> Once
            you reach the order summary page, please confirm that your total
            amount is correct. Zeffy includes an{" "}
            <span className="italic">optional contribution</span> to support
            their platform — this contribution does{" "}
            <span className="underline">not</span> go to the conference. Please
            ensure your order total reflects only your raffle purchase amount.
          </p>
        </div>
      </div>
    </section>
  );
};

export default Raffle;
