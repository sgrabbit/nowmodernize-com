import { motion } from "framer-motion";
import { Wrench, Shield, Cpu } from "lucide-react";
import { getSectionTheme } from "@/lib/section-theme";

const approaches = [
  {
    icon: Wrench,
    title: "Modernization,",
    subtitle: "not reimplementation",
    description: "We rehabilitate what you already have, removing risky customizations, simplifying workflows, and stabilizing integrations without a rip-and-replace.",
  },
  {
    icon: Shield,
    title: "Upgrade safety,",
    subtitle: "not release chaos",
    description: "We identify upgrade blockers and fragile scripts, then eliminate them in a prioritized sequence so releases become predictable and low-risk.",
  },
  {
    icon: Cpu,
    title: "AI-ready foundations,",
    subtitle: "by design",
    description: "We standardize processes and improve data reliability (CMDB, routing, ownership) with governance and security guardrails. So AI workflows can run safely in production.",
  },
];

export function ApproachSection() {
  const theme = getSectionTheme("approach");
  
  return (
    <section className={`${theme.padding} ${theme.background}`}>
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <span className={`${theme.label} uppercase tracking-wider text-teal-light text-muted-foreground font-medium mb-3 block`}>
            The Approach 
          </span>
          <h2 className={`${theme.heading} font-heading font-bold text-foreground mb-4`}>
            Modernization in the right order—{" "}
            <span className="gradient-text">Stability → Upgrades → AI</span>
          </h2>
          <p className={`${theme.subheading} text-muted-foreground ${theme.subheadingWidth}`}>
            Mid-tier SaaS teams can't pause delivery for a rebuild. We rehabilitate what you already have by reducing risky customizations, fixing CMDB/integration drift, and putting upgrade-safe patterns in place so change becomes predictable and AI readiness becomes real.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6 md:gap-8">
          {approaches.map((approach, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="relative bg-card rounded-xl p-6 md:p-8 border border-border/50 hover:border-primary/30 transition-colors duration-300 group"
            >
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-teal to-navy rounded-t-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="w-14 h-14 rounded-xl gradient-bg flex items-center justify-center mb-5">
                <approach.icon className="w-7 h-7 text-primary-foreground" />
              </div>
              <h3 className={`${theme.cardTitle} font-heading font-semibold text-foreground mb-1`}>
                {approach.title}
                <br />
                <span className="">
                  {approach.subtitle}
                </span>
              </h3>
              <p className={`${theme.cardDescription} text-muted-foreground leading-relaxed mt-2`}>
                {approach.description}
              </p>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mt-10 text-center"
        >
          <p className={`${theme.bodyText} font-heading font-semibold text-foreground`}>
          <span className="gradient-text">Scorecard → Roadmap → Execution</span>{" "}:
            Built for mid-tier SaaS teams that need reliability now and AI-readiness next.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
