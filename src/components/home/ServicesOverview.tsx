import { motion } from "framer-motion";
import { ArrowRight, Zap, RefreshCcw, Headphones, Bot, Users, XCircle, CheckCircle } from "lucide-react";
import { getSectionTheme } from "@/lib/section-theme";

const services = [
  {
    icon: Zap,
    tag: "Technical Debt Elimination",
    title: "ServiceNow Modernization",
    pain: "Reduce repeat incidents and change risk by removing brittle customizations.",
    body: "Transform your over-customized instance into a strategic asset. We eliminate technical debt by reducing risky customizations and simplifying workflows.",
    link: "/services#modernization",
    linkText: "See how we modernize",
  },
  {
    icon: RefreshCcw,
    tag: "Make Upgrades Boring Again",
    title: "Upgrade Posture Management",
    pain: "Stop upgrade delays with risk managed, repeatable releases.",
    body: "We industrialize upgrades with automated impact analysis, disciplined testing, and continuous readiness so upgrades take days, not months.",
    link: "/services#upgrade-posture-management",
    linkText: "See the upgrade playbook",
  },
  {
    icon: Headphones,
    tag: "AMS with Automation Bias",
    title: "Application Management (AMS)",
    pain: "Keep reliability high after modernization with continuous improvement.",
    body: "Beyond break-fix support. Our AMS includes L2/L3 support, backlog burn down, ongoing modernization, and AI automation enablement.",
    link: "/services#ams",
    linkText: "See AMS scope",
  },
  {
    icon: Bot,
    tag: "Prepare for Agentic Future",
    title: "AI & Automation Readiness",
    pain: "Make 'AI-ready' real with stable workflows + reliable data + governance.",
    body: "Get your ServiceNow ready for AI with workflow standardization, data quality remediation, and guardrails required for safe, production-grade automation.",
    link: "/services#ai-automation",
    linkText: "See what AI-ready means",
  },
  {
    icon: Users,
    tag: "For Fast Ramp & Continuity",
    title: "Managed Delivery Capacity",
    pain: "Add delivery-ready ServiceNow engineers quickly with continuity built in.",
    body: "Designed for fast ramp-up when you need capacity now. India-based with US time-zone overlap, onboarding in ~2 weeks, and continuity via bench buffer + replacement coverage.",
    link: "https://www.nowmodernize.com/contact",
    linkText: "Talk to us about capacity",
  },
];

function ServiceCard({ service, index, className }: { service: typeof services[0]; index: number; className?: string }) {
  const theme = getSectionTheme("services");

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.08 }}
      className={`group relative ${className || ''}`}
    >
      <a href={service.link} className="block h-full">
        <div className="h-full bg-card rounded-2xl p-7 md:p-8 border border-border/40 hover:border-primary/20 transition-all duration-300 hover:shadow-lg">
          {/* Tag + Icon row */}
          <div className="flex items-center justify-between mb-5">
            <span className="text-xs font-semibold text-primary bg-accent px-3 py-1 rounded-full tracking-wide">
              {service.tag}
            </span>
            <div className="w-10 h-10 rounded-xl bg-accent/60 flex items-center justify-center">
              <service.icon className="w-5 h-5 text-primary" />
            </div>
          </div>

          {/* Title */}
          <h3 className={`${theme.cardTitle} font-heading font-bold text-foreground mb-3`}>
            {service.title}
          </h3>

          {/* Pain point */}
          <p className={`${theme.cardDescription} text-foreground font-medium mb-3 leading-snug`}>
            {service.pain}
          </p>

          {/* Description */}
          <p className={`${theme.cardDescription} text-muted-foreground leading-relaxed mb-6`}>
            {service.body}
          </p>

          {/* Link */}
          <span className="inline-flex items-center gap-2 text-sm font-semibold text-primary group-hover:gap-3 transition-all duration-300">
            {service.linkText}
            <ArrowRight className="w-4 h-4" />
          </span>
        </div>
      </a>
    </motion.div>
  );
}

export function ServicesOverview() {
  const theme = getSectionTheme("services");
  
  // Split: first 3 in top row, last 2 in bottom row
  const topRow = services.slice(0, 3);
  const bottomRow = services.slice(3);

  return (
    <section className={`${theme.padding} ${theme.background}`}>
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-14"
        >
          <span className={`${theme.label} uppercase tracking-wider text-teal-light text-muted-foreground font-medium mb-3 block`}>
            The Offerings 
          </span>
          <h2 className={`${theme.heading} font-heading font-bold text-foreground mb-4`}>
            Built for high growth <span className="gradient-text">SaaS Companies</span>
          </h2>
          <p className={`${theme.subheading} text-muted-foreground ${theme.subheadingWidth}`}>
            Every service is designed for technology companies running ServiceNow.
          </p>
        </motion.div>

        {/* Top row: 3 cards */}
        <div className="grid md:grid-cols-3 gap-5 md:gap-6 mb-5 md:mb-6">
          {topRow.map((service, index) => (
            <ServiceCard key={index} service={service} index={index} />
          ))}
        </div>

        {/* Bottom row: 2 cards, centered and wider */}
        <div className="grid md:grid-cols-2 gap-5 md:gap-6 max-w-4xl mx-auto">
          {bottomRow.map((service, index) => (
            <ServiceCard key={index + 3} service={service} index={index + 3} />
          ))}
        </div>

        {/* We do / We don't do */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="mt-12 max-w-4xl mx-auto"
        >
          <div className="relative bg-gradient-to-br from-card via-card to-accent/10 rounded-2xl p-6 md:p-8 border border-border/40 overflow-hidden">
            <div className="relative flex flex-col md:flex-row md:items-center gap-4 md:gap-0">
              {/* Do */}
              <div className="flex items-start gap-3 flex-1 md:pr-8">
                <div className="w-8 h-8 rounded-full bg-teal-500/10 flex items-center justify-center flex-shrink-0">
                  <CheckCircle className="w-4 h-4 text-teal-500" strokeWidth={2.5} />
                </div>
                <p className={`${theme.cardDescription} leading-relaxed pt-0.5`}>
                  <span className="font-bold text-foreground">We do:</span>{" "}
                  <span className="text-muted-foreground">Rehabilitate existing ServiceNow instances—making them stable, upgrade-ready, and AI-ready.</span>
                </p>
              </div>
              
              {/* Divider */}
              <div className="hidden md:block w-px h-12 bg-border/60 mx-4 flex-shrink-0" />
              <div className="md:hidden h-px bg-border/40" />
              
              {/* Don't do */}
              <div className="flex items-start gap-3 flex-1 md:pl-8">
                <div className="w-8 h-8 rounded-full bg-red-500/10 flex items-center justify-center flex-shrink-0">
                  <XCircle className="w-4 h-4 text-red-500" strokeWidth={2.5} />
                </div>
                <p className={`${theme.cardDescription} leading-relaxed pt-0.5`}>
                  <span className="font-bold text-foreground">We don't do:</span>{" "}
                  <span className="text-muted-foreground">Greenfield implementations or lift-and-shift migrations.</span>
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
