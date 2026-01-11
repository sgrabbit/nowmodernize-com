import { motion } from "framer-motion";
import { ArrowRight, Zap, RefreshCcw, Headphones, Bot, XCircle, CheckCircle } from "lucide-react";
import { getSectionTheme } from "@/lib/section-theme";

const services = [
  {
    icon: Zap,
    tag: "Technical Debt Elimination",
    title: "ServiceNow Modernization",
    pain: "Reduce repeat incidents and change risk by removing brittle customizations.",
    body: "Transform your over customized instance into a strategic asset. We eliminate technical debt by reducing risky customizations and simplifying workflows.",
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
    tag: "Prepare for the Agentic Future",
    title: "AI & Automation Readiness",
    pain: "Make 'AI-ready' real with stable workflows + reliable data + governance.",
    body: "Get your ServiceNow ready for AI with workflow standardization, data quality remediation, and guardrails required for safe, production-grade automation.",
    link: "/services#ai-automation",
    linkText: "See what AI-ready means",
  },
];

export function ServicesOverview() {
  const theme = getSectionTheme("services");
  
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
            The Offerings 
          </span>
          <h2 className={`${theme.heading} font-heading font-bold text-foreground mb-4`}>
            Built for high growth <span className="gradient-text">SaaS Companies</span>
          </h2>
          <p className={`${theme.subheading} text-muted-foreground ${theme.subheadingWidth}`}>
            Every service is designed for technology companies running ServiceNow.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-6 md:gap-8">
          {services.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-card rounded-xl p-6 md:p-8 shadow-card border border-border/50 hover:shadow-lg transition-all duration-300 group"
            >
              <div className="flex items-start gap-4 mb-4">
                <div className="w-12 h-12 rounded-lg bg-accent flex items-center justify-center flex-shrink-0">
                  <service.icon className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <span className={`${theme.smallText} inline-block font-semibold text-primary bg-accent px-2.5 py-1 rounded-full mb-2`}>
                    {service.tag}
                  </span>
                  <h3 className={`${theme.cardTitle} font-heading font-semibold text-foreground`}>
                    {service.title}
                  </h3>
                </div>
              </div>
              <p className={`${theme.cardDescription} text-foreground font-medium mb-3`}>
                {service.pain}
              </p>
              <p className={`${theme.cardDescription} text-muted-foreground leading-relaxed mb-5`}>
                {service.body}
              </p>
              <a
                href={service.link}
                className={`${theme.smallText} inline-flex items-center gap-2 font-semibold text-primary hover:text-teal-dark transition-colors group/link`}
              >
                {service.linkText}
                <ArrowRight className="w-4 h-4 transition-transform group-hover/link:translate-x-1" />
              </a>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="mt-12 max-w-6xl mx-auto"
        >
          <div className="relative bg-gradient-to-br from-card via-card to-accent/10 rounded-xl p-6 md:p-8 border border-border/50 overflow-hidden">

            <div className="relative space-y-4">
              {/* Do */}
              <div className="group flex items-start gap-3 p-3 rounded-lg hover:bg-accent/30 transition-all duration-300">
                <div className="w-9 h-9 rounded-full bg-teal-500/10 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
                  <CheckCircle className="w-5 h-5 text-teal-500" strokeWidth={2.5} />
                </div>
                <div className="flex-1 pt-1">
                  <p className={`${theme.bodyText} leading-relaxed`}>
                    <span className="font-bold text-foreground">We do:</span>{" "}
                    <span className="text-muted-foreground">Rehabilitate existing ServiceNow instances—making them stable, upgrade-ready, and AI-ready.</span>
                  </p>
                </div>
              </div>
              
              {/* Divider */}
              <div className="relative h-px bg-gradient-to-r from-transparent via-border to-transparent"></div>
              
              {/* Don't do */}
              <div className="group flex items-start gap-3 p-3 rounded-lg hover:bg-accent/30 transition-all duration-300">
                <div className="w-9 h-9 rounded-full bg-red-500/10 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
                  <XCircle className="w-5 h-5 text-red-500" strokeWidth={2.5} />
                </div>
                <div className="flex-1 pt-1">
                  <p className={`${theme.bodyText} leading-relaxed`}>
                    <span className="font-bold text-foreground">We don't do:</span>{" "}
                    <span className="text-muted-foreground">Greenfield implementations or lift-and-shift migrations.</span>
                  </p>
                </div>
              </div>

            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
