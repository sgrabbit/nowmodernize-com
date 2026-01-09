import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, MessageSquare, ClipboardCheck, Map } from "lucide-react";
import { Button } from "@/components/ui/button";

const steps = [
  {
    icon: MessageSquare,
    number: "1",
    title: "Discovery (30 minutes)",
    description: "Align on pain points, modules in scope, and what 'success' means this quarter.",
  },
  {
    icon: ClipboardCheck,
    number: "2",
    title: "Health Check + Scorecard (7–10 days)",
    description: "A structured assessment across stability, customizations, CMDB/integrations, governance, and performance—delivered as a scorecard + prioritized roadmap.",
  },
  {
    icon: Map,
    number: "3",
    title: "Execution Plan (30/60/90)",
    description: "A staged plan to stabilize now and modernize foundations for AI readiness next.",
  },
];

export function HowWeStart() {
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
            Start with a 30-minute consult.{" "}
            <span className="gradient-text">Leave with clarity.</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-base md:text-lg">
            In one call, we'll understand what's driving repeat incidents and change risk—and map the fastest path to a stable, AI-ready ServiceNow.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6 md:gap-8 mb-12">
          {steps.map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="relative"
            >
              <div className="bg-card rounded-xl p-6 md:p-8 border border-border/50 h-full">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-10 h-10 rounded-full gradient-bg flex items-center justify-center text-primary-foreground font-bold text-lg">
                    {step.number}
                  </div>
                  <step.icon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="font-heading text-lg font-semibold text-foreground mb-3">
                  {step.title}
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {step.description}
                </p>
              </div>
              {index < steps.length - 1 && (
                <div className="hidden md:block absolute top-1/2 -right-4 transform -translate-y-1/2">
                  <ArrowRight className="w-6 h-6 text-border" />
                </div>
              )}
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="text-center"
        >
          <Button variant="hero" size="lg" asChild className="group">
            <Link to="/contact">
              Get a Free Health Check
              <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
            </Link>
          </Button>
          <p className="text-sm text-muted-foreground mt-4">
            No long sales cycle. We start with an assessment and earn the execution.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
