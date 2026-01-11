import { motion } from "framer-motion";
import { Wrench, Shield, Cpu } from "lucide-react";

const approaches = [
  {
    icon: Wrench,
    title: "Modernization, not reimplementation",
    description: "We rehabilitate what you already have, removing risky customizations, simplifying workflows, and stabilizing integrations without a rip-and-replace.",
  },
  {
    icon: Shield,
    title: "Debt burn down with Upgrade safety",
    description: "We identify upgrade blockers and fragile scripts, then eliminate them in a prioritized sequence so releases become predictable and low-risk.",
  },
  {
    icon: Cpu,
    title: "AI-ready foundations by design",
    description: "We standardize processes and improve data reliability (CMDB, routing, ownership) with governance and security guardrails. So AI workflows can run safely in production.",
  },
];

export function ApproachSection() {
  return (
    <section className="py-20 md:py-28 bg-background">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h2 className="font-heading text-2xl sm:text-3xl md:text-4xl font-bold text-foreground mb-4">
            Our Approach
          </h2>
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
              <h3 className="font-heading text-lg md:text-xl font-semibold text-foreground mb-3">
                {approach.title}
              </h3>
              <p className="text-muted-foreground text-sm md:text-base leading-relaxed">
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
          <p className="text-muted-foreground text-sm md:text-base">
            <span className="font-semibold text-foreground">Scorecard → Roadmap → Execution.</span>{" "}
            Built for mid-tier SaaS teams that need reliability now and AI-readiness next.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
