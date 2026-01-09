import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import heroBg from "@/assets/hero-bg.png";

const valueBullets = [
  "AI-Readiness Health Assessment → scorecard + prioritized roadmap",
  "Modernize workflows across IT / Employee / Customer ops",
  "Fix foundations: CMDB/data quality, performance, governance, security",
];

export function HeroSection() {
  return (
    <section className="relative min-h-[90vh] flex items-center overflow-hidden hero-gradient">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0">
        <img
          src={heroBg}
          alt=""
          className="w-full h-full object-cover opacity-30 brightness-90"
        />
        {/* <div className="absolute inset-0 bg-gradient-to-r from-navy-dark/95 via-navy/90 to-navy/70" /> */}
      </div>

      <div className="container relative z-10 py-20 md:py-24">
        <div className="max-w-3xl">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="font-heading text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-primary-foreground leading-tight mb-6"
          >
            ServiceNow Modernization for Mid-Tier B2B SaaS—
            <span className="text-teal-light">AI-Ready by Design.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-lg md:text-xl text-primary-foreground/80 mb-4 leading-relaxed"
          >
            Reduce incidents by fixing brittle customizations and CMDB/integration issues—so your platform becomes stable now and truly AI-ready next.
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="text-sm md:text-base text-teal-light font-medium mb-8"
          >
            AI-ready = stable platform + standard processes + reliable data.
          </motion.p>

          <motion.ul
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="space-y-3 mb-10"
          >
            {valueBullets.map((bullet, index) => (
              <li key={index} className="flex items-start gap-3 text-primary-foreground/90">
                <CheckCircle2 className="w-5 h-5 text-teal-light flex-shrink-0 mt-0.5" />
                <span className="text-sm md:text-base">{bullet}</span>
              </li>
            ))}
          </motion.ul>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <Button variant="hero" size="xl" asChild className="group">
              <Link to="/contact">
                Get a Free Health Check
                <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
              </Link>
            </Button>
          </motion.div>
        </div>
      </div>

      {/* Decorative gradient orb */}
      <div className="absolute -bottom-40 -right-40 w-96 h-96 bg-teal/20 rounded-full blur-3xl" />
    </section>
  );
}
