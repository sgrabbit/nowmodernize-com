import { motion } from "framer-motion";
import { Target, Users, Cpu } from "lucide-react";
import { getSectionTheme } from "@/lib/section-theme";

const differentiators = [
  {
    icon: Target,
    title: "Modernization-only (no greenfield bias)",
    description: "We rehabilitate what you already have—remove fragile customizations, fix foundations, and make ServiceNow safe to change.",
  },
  {
    icon: Users,
    title: "Forward-Deployed Engineers (consult + execute together)",
    description: "Our engineers work embedded with your team to diagnose issues, shape the roadmap, and implement fixes in the same motion—so you get speed without handoff delays.",
  },
  {
    icon: Cpu,
    title: "AI-ready by design (not as a slogan)",
    description: "AI-ready = stable platform + standard processes + reliable data. We improve CMDB/integration reliability, governance, and security so AI workflows can run safely in production.",
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
          <h2 className={`${theme.heading} font-heading font-bold text-foreground mb-4`}>
            Why NowModernize
          </h2>
          <p className={`${theme.subheading} text-muted-foreground ${theme.subheadingWidth}`}>
            We're not a generalist ServiceNow shop. We modernize existing instances so mid-tier SaaS teams get reliability now—and become AI-ready next.
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
      </div>
    </section>
  );
}
