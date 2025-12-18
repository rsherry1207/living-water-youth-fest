import { Clock, CalendarDays } from "lucide-react";

const Schedule = () => {
  return (
    <section id="schedule" className="py-20 px-4 bg-gradient-to-b from-ocean-light/30 to-background">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-16">
          <h2 className="font-barlow font-bold text-5xl md:text-6xl text-primary mb-4">
            Schedule
          </h2>
          <p className="font-display text-xl text-muted-foreground max-w-2xl mx-auto">
            Conference schedule details coming soon
          </p>
          <div className="w-24 h-1 bg-gradient-to-r from-secondary via-coral to-accent mx-auto rounded-full mt-6" />
        </div>

        <div className="bg-card rounded-3xl p-8 md:p-12 shadow-xl border-2 border-ocean-light max-w-3xl mx-auto text-center">
          <div className="w-20 h-20 bg-gradient-to-br from-accent to-ocean-dark rounded-full flex items-center justify-center mx-auto mb-6">
            <CalendarDays className="w-10 h-10 text-white" />
          </div>
          <h3 className="font-display font-bold text-2xl text-primary mb-4">
            Coming Soon
          </h3>
          <p className="text-muted-foreground leading-relaxed mb-6">
            We're finalizing the conference schedule with exciting sessions, workshops, worship times, and activities. Check back soon for the full schedule!
          </p>
          <div className="flex items-center justify-center gap-2 text-ocean-dark">
            <Clock className="w-5 h-5" />
            <span className="font-display font-semibold">Summer 2026</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Schedule;
