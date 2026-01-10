import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, CheckCircle2, Users, Target, Cpu, Database, Shield, Zap } from "lucide-react";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";

const triggers = [
  "Repeat incidents keep resurfacing",
  "Custom scripts and integrations have become fragile",
  "Upgrades slip or feel unsafe",
  "CMDB/routing drift causes mis-assignments and rework",
  "AI initiatives stall due to inconsistent processes and unreliable data",
];

const team = [
  {
    name: "Founder & Delivery Lead",
    bio: "Leads modernization programs end-to-end—from incident recurrence reduction to upgrade safety and platform governance. Works closely with CIO/CTO stakeholders to define the 30/60/90 modernization plan and execute it with minimal disruption.",
    focus: ["Technical debt elimination", "Release risk reduction", "Operating model + governance"],
    highlights: [
      "10+ years in ServiceNow delivery and platform modernization",
      "Led modernization work across ITSM/CSM/HRSD/ITOM environments",
      "Built assessment-led playbooks: scorecard → roadmap → execution",
    ],
  },
  {
    name: "Senior ServiceNow Engineer (Platform & Integrations)",
    bio: "Specializes in stabilizing brittle customizations and integrations that cause repeat incidents. Focuses on upgrade-safe patterns, integration hardening, and reducing \"blast radius\" of changes.",
    focus: ["Script hygiene", "Integration stability", "Performance & reliability"],
    highlights: [
      "Deep experience with scripted customizations, Flow Designer/workflows, and platform patterns",
      "Integration hardening: MID Server patterns, API reliability, retries/monitoring",
      "Upgrade readiness: impact analysis + systematic blocker removal",
    ],
  },
  {
    name: "Senior ServiceNow Consultant (Data, CMDB & Governance)",
    bio: "Improves data reliability and governance so routing works correctly and AI readiness becomes real. Drives CMDB quality, ownership, service mapping hygiene, and controls required for safe automation.",
    focus: ["CMDB/service mapping", "Data quality", "Governance & security guardrails"],
    highlights: [
      "CMDB and routing reliability improvements (ownership, normalization, drift control)",
      "Governance frameworks: roles, approvals, operational controls for safe changes",
      "AI-ready foundations: stable processes + reliable data + guardrails",
    ],
  },
];

const whatWeDo = [
  { icon: Zap, text: "ServiceNow Modernization (technical debt elimination)" },
  { icon: Database, text: "Upgrade Posture Management (predictable, low-risk upgrades)" },
  { icon: Shield, text: "AMS with an automation bias (beyond break-fix)" },
  { icon: Cpu, text: "AI & Automation Readiness (stable processes + reliable data + governance)" },
];

export default function About() {
  return (
    <Layout>
      {/* Hero */}
      <section className="py-16 md:py-24 bg-secondary/30">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="max-w-4xl"
          >
            <h1 className="font-heading text-3xl sm:text-4xl md:text-5xl font-bold text-foreground mb-6">
              We Modernize ServiceNow So Mid-Tier SaaS Teams Can Scale
              <br /><span className="gradient-text">and Become AI-Ready</span>
            </h1>
            <p className="text-muted-foreground text-lg md:text-xl mb-8">
              NowModernize is an IIT-led team of senior ServiceNow practitioners focused on one thing: turning fragile, over-customized instances into stable, upgrade-ready platforms with reliable data and governance for AI.
            </p>
            <div className="flex flex-wrap gap-4">
              <Button variant="default" size="lg" asChild>
                <Link to="/contact">Get a Free Health Check</Link>
              </Button>
              <Button variant="outline" size="lg" asChild>
                <Link to="/resources">View Resources</Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Mission */}
      <section className="py-16 md:py-20 bg-background">
        <div className="container">
          <div className="grid md:grid-cols-2 gap-12 md:gap-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <h2 className="font-heading text-2xl md:text-3xl font-bold text-foreground mb-4">
                Our Mission
              </h2>
              <p className="text-muted-foreground text-lg leading-relaxed">
                Make ServiceNow a strategic asset again—by reducing repeat incidents, de-risking change, and building the foundations required for AI to work in production.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <h2 className="font-heading text-2xl md:text-3xl font-bold text-foreground mb-4">
                Who We Serve
              </h2>
              <p className="text-muted-foreground mb-4">
                We work with mid-tier B2B SaaS companies running ServiceNow across IT, Employee, and Customer operations—especially when the platform has become "too risky to touch."
              </p>
              <p className="font-semibold text-foreground text-sm mb-3">Typical triggers:</p>
              <ul className="space-y-2">
                {triggers.map((trigger, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                    <CheckCircle2 className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                    <span>{trigger}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>
        </div>
      </section>

      {/* How We Work */}
      <section className="py-16 md:py-20 bg-secondary/30">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="max-w-3xl mx-auto text-center"
          >
            <div className="w-16 h-16 rounded-xl gradient-bg flex items-center justify-center mx-auto mb-6">
              <Users className="w-8 h-8 text-primary-foreground" />
            </div>
            <h2 className="font-heading text-2xl md:text-3xl font-bold text-foreground mb-4">
              How We Work (Forward-Deployed Engineers)
            </h2>
            <p className="text-muted-foreground text-lg leading-relaxed">
              We don't throw documents over the wall. Our engineers work embedded with your team to diagnose, plan, and implement fixes in the same motion—so you get speed without handoff delays.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Team */}
      <section className="py-16 md:py-20 bg-background">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-12"
          >
            <h2 className="font-heading text-2xl md:text-3xl font-bold text-foreground mb-4">
              Meet the Team
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Engineer-led, modernization-first. We combine platform depth with an execution mindset.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6 md:gap-8">
            {team.map((member, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-card rounded-xl p-6 md:p-8 border border-border/50"
              >
                <div className="w-16 h-16 rounded-full bg-secondary flex items-center justify-center mb-4">
                  <span className="text-2xl font-bold text-primary">
                    {index + 1}
                  </span>
                </div>
                <h3 className="font-heading text-lg font-semibold text-foreground mb-3">
                  {member.name}
                </h3>
                <p className="text-muted-foreground text-sm mb-4 leading-relaxed">
                  {member.bio}
                </p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {member.focus.map((item, i) => (
                    <span key={i} className="text-xs font-medium bg-accent text-accent-foreground px-2 py-1 rounded-full">
                      {item}
                    </span>
                  ))}
                </div>
                <ul className="space-y-2">
                  {member.highlights.map((highlight, i) => (
                    <li key={i} className="flex items-start gap-2 text-xs text-muted-foreground">
                      <CheckCircle2 className="w-3 h-3 text-primary flex-shrink-0 mt-0.5" />
                      <span>{highlight}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* What We Do / Don't Do */}
      <section className="py-16 md:py-20 bg-secondary/30">
        <div className="container">
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="bg-card rounded-xl p-6 md:p-8 border border-border/50"
            >
              <h3 className="font-heading text-xl font-semibold text-foreground mb-4">
                What we do
              </h3>
              <ul className="space-y-3">
                {whatWeDo.map((item, i) => (
                  <li key={i} className="flex items-start gap-3 text-sm text-muted-foreground">
                    <item.icon className="w-5 h-5 text-primary flex-shrink-0" />
                    <span>{item.text}</span>
                  </li>
                ))}
              </ul>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="bg-card rounded-xl p-6 md:p-8 border border-border/50"
            >
              <h3 className="font-heading text-xl font-semibold text-foreground mb-4">
                What we don't do
              </h3>
              <p className="text-muted-foreground">
                Greenfield implementations or lift-and-shift migrations. We rehabilitate and modernize existing ServiceNow instances.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 md:py-20 hero-gradient">
        <div className="container text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="font-heading text-2xl md:text-3xl font-bold text-primary-foreground mb-4">
              Start with a Free Health Check
            </h2>
            <p className="text-primary-foreground/80 mb-8 max-w-2xl mx-auto">
              You'll get a scorecard delivered in 7–10 business days after read-only access + stakeholder interviews.
            </p>
            <Button variant="hero" size="lg" asChild className="group">
              <Link to="/contact">
                Get a Free Health Check
                <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
              </Link>
            </Button>
          </motion.div>
        </div>
      </section>
    </Layout>
  );
}
