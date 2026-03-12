import { m } from "framer-motion";
import { Target, Users, Award, ShieldCheck } from "lucide-react";
import { getSectionTheme } from "@/lib/section-theme";
import { Reveal, staggerContainer, fadeUp } from "@/components/motion";

const differentiators = [
  {
    icon: Target,
    title: "Low Risk Start",
    description: "Read only first. Clear deliverables. No disruption before alignment.",
  },
  {
    icon: Users,
    title: "Forward Deployed Engineers",
    description: "Consult and execute together. Less coordination. Faster delivery.",
  },
  {
    icon: Award,
    title: "High Bar Team",
    description: "Senior led delivery. Hands on decisions. Clean execution standards.",
  },
  {
    icon: ShieldCheck,
    title: "Continuity Built-in",
    description: "Bench buffer + replacement coverage so delivery doesn't stall. Governed by an account manager with senior escalation when needed.",
  },
];

export function WhyUs() {
  const theme = getSectionTheme("whyUs");

  return (
    <section className={`${theme.padding} ${theme.background}`}>
      <div className="container">
        <Reveal className="text-center mb-12">
          <span className={`${theme.label} uppercase tracking-wider text-teal-light text-muted-foreground font-medium mb-3 block`}>
            Why NowModernize
          </span>
          <h2 className={`${theme.heading} font-heading font-bold text-foreground mb-4`}>
            Modernization Partner built for <span className="gradient-text">SaaS teams</span>
          </h2>
          <p className={`${theme.subheading} text-muted-foreground ${theme.subheadingWidth}`}>
            Not generalists. Built for SaaS teams that need reliability now and AI readiness next.
          </p>
        </Reveal>

        <m.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {differentiators.map((item, index) => (
            <m.div
              key={index}
              variants={fadeUp}
              className="bg-card rounded-xl p-6 md:p-8 border border-border/50 hover:border-primary/20 transition-colors duration-300"
            >
              <div className="w-12 h-12 rounded-xl bg-accent flex items-center justify-center mb-5">
                <item.icon className="w-6 h-6 text-primary" />
              </div>
              <h3 className={`${theme.cardTitle} font-heading font-semibold text-foreground mb-3`}>
                {item.title}
              </h3>
              <p className={`${theme.cardDescription} text-muted-foreground leading-relaxed`}>
                {item.description}
              </p>
            </m.div>
          ))}
        </m.div>

        <Reveal delay={0.4} className="mt-12 text-center">
          <p className={`${theme.bodyText} font-heading font-semibold text-foreground`}>
            Start small. Prove value. Earn the long term.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
