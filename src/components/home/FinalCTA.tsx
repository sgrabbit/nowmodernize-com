import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { getSectionTheme } from "@/lib/section-theme";

const reassurances = [
  "No-pressure call — get clarity, not a sales pitch",
  "Modernization-only — no greenfield implementation push",
  "Engineer-led — forward-deployed team that consults + executes",
];

export function FinalCTA() {
  const theme = getSectionTheme("finalCta");
  
  return (
    <section className={`${theme.padding} ${theme.background}`}>
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-teal rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-teal-light rounded-full blur-3xl" />
      </div>

      <div className="container relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="max-w-3xl mx-auto text-center"
        >
          <h2 className={`${theme.heading} font-heading font-bold text-primary-foreground mb-4`}>
            Ready to make ServiceNow stable now—
            <span className="text-teal-light">and AI-ready next?</span>
          </h2>
          <p className={`${theme.subheading} text-primary-foreground/80 mb-8`}>
            Book a 30-minute consult. We'll identify what's driving repeat incidents and change risk, and outline the fastest modernization path.
          </p>

          <ul className="flex flex-col md:flex-row justify-center gap-4 md:gap-8 mb-10">
            {reassurances.map((item, index) => (
              <li key={index} className={`${theme.smallText} flex items-center gap-2 text-primary-foreground/90`}>
                <CheckCircle2 className="w-4 h-4 text-teal-light flex-shrink-0" />
                <span>{item}</span>
              </li>
            ))}
          </ul>

          <Button variant="hero" size="xl" asChild className="group mb-4">
            <Link to="/contact">
              Get a Free Health Check
              <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
            </Link>
          </Button>

          <p className={`${theme.smallText} text-primary-foreground/60`}>
            Prefer email? Use the contact form and we'll respond within 1 business day.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
