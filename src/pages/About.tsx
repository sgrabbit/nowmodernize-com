import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, CheckCircle2, Users, Target, Cpu, MessageSquare, ClipboardCheck, Map, ShieldCheck, TrendingDown, Sparkles, UserPlus, XCircle, PackageX, UserX } from "lucide-react";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

const missionHighlights= {
  "Stable operations": "fewer repeat incidents and less firefighting",
  "Lower TCO": "simpler to maintain, faster to change, less technical debt",
  "Automation at scale": "reliable data + governance so AI and automation run safely in production",
};

const whoWeServeHighlights = {
  "Mid tier scale": "high growth SaaS and high tech teams on ServiceNow",
  "Operational backbone": "IT, Employee, and Customer workflows run through the platform",
  "Automation push": "teams scaling AI and automation need stronger foundations",
};

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
  { icon: ShieldCheck, text: "Upgrade safety: release readiness and upgrade posture so upgrades are predictable and low risk" },
  { icon: TrendingDown, text: "Lower TCO modernization: reduce customization sprawl, duplicate logic, and maintenance overhead" },
  { icon: Sparkles, text: "AI readiness foundations: reliable data, governance, and operating guardrails for production use" },
  { icon: UserPlus, text: "Staff augmentation: outcome-aligned engineers for modernization, upgrades, and platform work" },
];
const whatWeDontDo = [
  { icon: XCircle, text: "Greenfield ServiceNow implementations" },
  { icon: PackageX, text: "Lift-and-shift migrations or \"rebuild everything\" programs" },
  { icon: UserX, text: "Body shopping: staffing without clear scope, ownership, or standards" },
];

const proofCards = [
  { icon: Target, value: "2016", label: "Founded" },
  { icon: CheckCircle2, value: "100+", label: "Projects Delivered" },
  { icon: Users, value: "300+", label: "Engineer Talent Pool" },
];

const trustDifferentiators = [
  {
    icon: Target,
    title: "Low Risk Start",
    description: "Read only first. Clear deliverables. No disruption before alignment.",
  },
  {
    icon: Users,
    title: "Forward Deployed Engineers",
    description: "Consult and execute together. Less coordination. Faster delivery.",
  },
  {
    icon: Cpu,
    title: "High Bar Team",
    description: "Senior led delivery. Hands on decisions. Clean execution standards.",
  },
];

const howWeWorkSteps = [
  {
    icon: MessageSquare,
    number: "1",
    title: "Discovery (30 minutes)",
    description: "Align on goals, scope, constraints, and what “success” means this quarter.",
  },
  {
    icon: ClipboardCheck,
    number: "2",
    title: "Health Check + Scorecard (7–10 days)",
    description: "A structured assessment with clear findings, risk ranking, and a prioritized modernization roadmap.",
  },
  {
    icon: Map,
    number: "3",
    title: "30/60/90 Execution Plan",
    description: "A staged plan with quick wins and foundational work—sequenced to reduce risk and improve reliability.",
  },
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
              We modernize ServiceNow
              <br /> for high growth SaaS teams
              <br /><span className="gradient-text text-xl sm:text-2xl md:text-3xl text-muted-foreground">Stability now. AI readiness next.</span>
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

      {/* Where We Come From */}
      <section className="py-16 md:py-20 bg-secondary/70">
        <div className="container">
          <div className="grid md:grid-cols-2 gap-12 md:gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <span className="uppercase tracking-wider text-teal-light text-muted-foreground font-medium mb-3 block">
                Where We Come From
              </span>
              <h2 className="font-heading text-2xl md:text-3xl font-bold text-foreground mb-4">
                NowModernize comes from a broader engineering journey.
              </h2>
              <p className="text-muted-foreground text-lg leading-relaxed">
                We're a product and services firm built by engineers who ship enterprise grade systems. We've delivered projects with a global talent pool across platform engineering, automation, and AI workflows. One pattern kept showing up: most ServiceNow environments can't scale upgrades or automation until the foundation is modernized.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="space-y-4"
            >
              {proofCards.map((card, index) => (
                <div key={index} className="bg-card rounded-xl p-6 border border-border/50">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-lg gradient-bg flex items-center justify-center flex-shrink-0">
                      <card.icon className="w-6 h-6 text-primary-foreground" />
                    </div>
                    <div>
                      <div className="text-3xl font-bold text-foreground">{card.value}</div>
                      <div className="text-sm text-muted-foreground">{card.label}</div>
                    </div>
                  </div>
                </div>
              ))}
            </motion.div>
          </div>
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
              <p className="text-muted-foreground mb-4">
              Make ServiceNow a strategic asset again: stable operations, lower TCO, and automation at scale.
              </p>
              <ul className="space-y-2">
                {Object.entries(missionHighlights).map(([key, value]) => (
                    <li key={key} className="flex items-start gap-2 text-base text-muted-foreground">
                    <CheckCircle2 className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                    <span>
                      <span className="font-semibold text-foreground">{key}:</span> {value}
                    </span>
                  </li>
                ))}
              </ul>
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
                Built for mid tier, high growth SaaS and high tech teams that rely on ServiceNow across IT and business ops.
              </p>
              <ul className="space-y-2">
                {Object.entries(whoWeServeHighlights).map(([key, value]) => (
                  <li key={key} className="flex items-start gap-2 text-base text-muted-foreground">
                    <CheckCircle2 className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                    <span>
                      <span className="font-semibold text-foreground">{key}:</span> {value}
                    </span>
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>
        </div>
      </section>


      {/* How We Earn Trust */}
      <section className="py-16 md:py-20 bg-secondary/70">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-12"
          >
            <span className="uppercase tracking-wider text-teal-light text-muted-foreground font-medium mb-3 block">
              How We Earn Trust
            </span>
            <h2 className="font-heading text-2xl md:text-3xl font-bold text-foreground mb-4">
            What it’s like to work with us
            </h2>
            <p className="text-muted-foreground text-lg max-w-3xl mx-auto">
              We work best with teams that want clarity, discipline, and low-risk change. Here’s how we operate.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6 md:gap-8">
            {trustDifferentiators.map((item, index) => (
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
                <h3 className="font-heading text-lg font-semibold text-foreground mb-3">
                  {item.title}
                </h3>
                <p className="text-base text-muted-foreground leading-relaxed">
                  {item.description}
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
            <p className="text-lg font-heading font-semibold text-foreground">
              Start small. Prove value. Earn the long term.
            </p>
          </motion.div>
        </div>
      </section>

      {/* How We Work */}
      <section className="py-16 md:py-20 hero-gradient relative overflow-hidden">
        {/* Grid pattern overlay */}
        <div 
          className="absolute inset-0 opacity-[0.07]"
          style={{
            backgroundImage: `
              linear-gradient(to right, currentColor 1px, transparent 1px),
              linear-gradient(to bottom, currentColor 1px, transparent 1px)
            `,
            backgroundSize: '48px 48px',
            color: 'rgb(255, 255, 255)',
          }}
        />
        
        {/* Decorative gradient orbs */}
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
            className="text-center mb-12"
          >
            <span className="uppercase tracking-wider text-teal-light text-primary-foreground/90 font-medium mb-3 block">
              How We Work
            </span>
            <h2 className="font-heading text-2xl md:text-3xl font-bold text-primary-foreground mb-4">
              Clear deliverables. Low-risk execution.
            </h2>
            <p className="text-lg text-primary-foreground/80 max-w-3xl mx-auto">
              A simple engagement model designed for critical platforms—start read-only, align on evidence, then execute in controlled stages.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6 md:gap-8 mb-12">
            {howWeWorkSteps.map((step, index) => (
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
                  <p className="text-base text-muted-foreground leading-relaxed">
                    {step.description}
                  </p>
                </div>
                {index < howWeWorkSteps.length - 1 && (
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
            <Button variant="hero" size="lg" asChild className="group mb-4">
              <Link to="/contact">
                Get a Free Health Check
                <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
              </Link>
            </Button>
            <p className="text-sm text-primary-foreground/60 mt-4">
              No long sales cycle. We start with an assessment and earn the execution.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Team
      <section className="py-16 md:py-20">
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
      </section> */}

      {/* What We Do / Don't Do */}
      <section className="py-16 md:py-20 ">
        <div className="container">
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-12"
          >
            <span className="uppercase tracking-wider text-teal-light text-muted-foreground font-medium mb-3 block">
              Scope
            </span>
            <h2 className="font-heading text-2xl md:text-3xl font-bold text-foreground mb-4">
            Modernization work, clearly scoped
            </h2>
            <p className="text-muted-foreground text-lg max-w-3xl mx-auto">
              We work best with teams that want clarity, discipline, and low-risk change. Here’s how we operate.
            </p>
          </motion.div>
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="bg-card rounded-xl p-6 md:p-8 border border-border/50"
            >
              <h3 className="font-heading text-xl font-semibold text-foreground mb-4 flex items-center gap-2">
                <CheckCircle2 className="w-6 h-6 text-primary" />
                What we do
              </h3>
              <Separator className="mb-4" />
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
              <h3 className="font-heading text-xl font-semibold text-foreground mb-4 flex items-center gap-2">
                <XCircle className="w-6 h-6 text-destructive" />
                What we don't do
              </h3>
              <Separator className="mb-4" />
              <ul className="space-y-3">
                {whatWeDontDo.map((item, i) => (
                  <li key={i} className="flex items-start gap-3 text-sm text-muted-foreground">
                    <item.icon className="w-5 h-5 text-primary flex-shrink-0" />
                    <span>{item.text}</span>
                  </li>
                ))}
              </ul>
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
