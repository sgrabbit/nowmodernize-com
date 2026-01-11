import { motion } from "framer-motion";
import { Target, Users, Cpu } from "lucide-react";
import { getSectionTheme } from "@/lib/section-theme";

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
    icon: Cpu,
    title: "High Bar Team",
    description: "Senior led delivery. Hands on decisions. Clean execution standards.",
    
  },
];

export function WhyUs() {
  const theme = getSectionTheme("whyUs");
  
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
            Why NowModernize
          </span>
          <h2 className={`${theme.heading} font-heading font-bold text-foreground mb-4`}>
            Modernization Partner built for  <span className="gradient-text">SaaS teams</span>
          </h2>
          <p className={`${theme.subheading} text-muted-foreground ${theme.subheadingWidth}`}>
            Not generalists. Built for SaaS teams that need reliability now and AI readiness next.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6 md:gap-8">
          {differentiators.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-card rounded-xl p-6 md:p-8 border border-border/50 hover:border-primary/20 transition-colors duration-300"
            >
              <div className="w-14 h-14 rounded-xl bg-accent flex items-center justify-center mb-5">
                <item.icon className="w-7 h-7 text-primary" />
              </div>
              <h3 className={`${theme.cardTitle} font-heading font-semibold text-foreground mb-3`}>
                {item.title}
              </h3>
              <p className={`${theme.cardDescription} text-muted-foreground leading-relaxed`}>
                {item.description}
              </p>
            </motion.div>
          ))}
        </div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mt-12 text-center"
        >
          <p className={`${theme.bodyText} font-heading font-semibold text-foreground`}>
            Start small. Prove value. Earn the long term.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
