import { motion } from "framer-motion";
import { AlertTriangle, RefreshCcw, Database } from "lucide-react";
import { getSectionTheme } from "@/lib/section-theme";

const problems = [
  {
    icon: AlertTriangle,
    title: "Change feels risky",
    description: "Fear of breakage from heavy customization, unknown dependencies, and poor test coverage. Duplicate logic across scripts and workflows makes every change fragile.",
  },
  {
    icon: RefreshCcw,
    title: "Performance and incidents spiral",
    description: "Slow forms, slow lists, timeouts, and noisy incidents caused by inefficient queries and brittle design. Teams spend cycles firefighting instead of improving.",
  },
  {
    icon: Database,
    title: " Upgrades and automation stall",
    description: "Undocumented scripts and fragile integrations break during upgrades or upstream SaaS changes. Messy data and weak auditability block safe automation and agentic experiences.",
  },
];

export function ProblemSection() {
  const theme = getSectionTheme("problem");
  
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
            The Pain 
          </span>
          <h2 className={`${theme.heading} font-heading font-bold text-foreground mb-4`}>
            ServiceNow doesn't break overnight —{" "}
            <span className="gradient-text">it drifts into a blocker</span>
          </h2>
          <p className={`${theme.subheading} text-muted-foreground ${theme.subheadingWidth}`}>
          In high-growth SaaS, drift shows up as repeat incidents, slowdowns, and upgrade paralysis. The root cause is usually the same: brittle customization, unmanaged dependencies, and weak governance.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6 md:gap-8">
          {problems.map((problem, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-card rounded-xl p-6 md:p-8 shadow-card border border-border/50 hover:shadow-lg transition-shadow duration-300"
            >
              <div className="w-12 h-12 rounded-lg bg-accent flex items-center justify-center mb-5">
                <problem.icon className="w-6 h-6 text-primary" />
              </div>
              <h3 className={`${theme.cardTitle} font-heading font-semibold text-foreground mb-3`}>
                {problem.title}
              </h3>
              <p className={`${theme.cardDescription} text-muted-foreground leading-relaxed`}>
                {problem.description}
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
            When teams say “we’re scared to touch it,” the platform has drifted into a blocker.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
