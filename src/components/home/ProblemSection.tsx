import { motion } from "framer-motion";
import { AlertTriangle, RefreshCcw, Database } from "lucide-react";
import { getSectionTheme } from "@/lib/section-theme";

const problems = [
  {
    icon: RefreshCcw,
    title: "Repeat incidents don't go away",
    description: "The same issues resurface because quick fixes stack up and root causes never get eliminated—so reliability keeps slipping.",
  },
  {
    icon: AlertTriangle,
    title: "Becomes risky to change",
    description: "Brittle customizations and unmanaged integrations make releases scary. Small changes trigger outages, rollbacks, and long war rooms.",
  },
  {
    icon: Database,
    title: "Data + workflows drift, AI stalls",
    description: "CMDB/integration drift and fragmented workflows break routing and standardization—so automation slows down and AI initiatives fail early.",
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
            The Problem 
          </span>
          <h2 className={`${theme.heading} font-heading font-bold text-foreground mb-4`}>
            ServiceNow doesn't break overnight —{" "}
            <span className="gradient-text">it drifts into a blocker</span>
          </h2>
          <p className={`${theme.subheading} text-muted-foreground ${theme.subheadingWidth}`}>
            In mid-tier SaaS, ServiceNow usually starts strong. Then fast fixes, custom scripts, and messy data pile up, making every change more risky until every change increases incident risk.
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
            Modernization is the first step to unlock the real power of ServiceNow 
            <span className="gradient-text"> and become AI-ready.</span>
          </p>
          <p className={`${theme.smallText} text-muted-foreground mt-3`}>
            If "we're scared to touch it" sounds familiar, you're not alone.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
