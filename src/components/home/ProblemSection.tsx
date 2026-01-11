import { motion } from "framer-motion";
import { AlertTriangle, RefreshCcw, Database } from "lucide-react";

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
  return (
    <section className="py-20 md:py-28 bg-secondary/50">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h2 className="font-heading text-2xl sm:text-3xl md:text-4xl font-bold text-foreground mb-4">
            ServiceNow doesn't break overnight —{" "}
            <span className="gradient-text">it drifts into a blocker.</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-base md:text-lg">
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
              <h3 className="font-heading text-lg md:text-xl font-semibold text-foreground mb-3">
                {problem.title}
              </h3>
              <p className="text-muted-foreground text-sm md:text-base leading-relaxed">
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
          <p className="text-lg md:text-xl font-heading font-semibold text-foreground">
            Modernization is the first step to unlock the real power of ServiceNow 
            <span className="gradient-text"> and become AI-ready.</span>
          </p>
          <p className="text-sm text-muted-foreground mt-3">
            If "we're scared to touch it" sounds familiar, you're not alone.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
