import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useEffect } from "react";
import { ArrowRight, Zap, RefreshCcw, Headphones, Bot, CheckCircle2 } from "lucide-react";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";

const services = [
  {
    id: "modernization",
    icon: Zap,
    title: "ServiceNow Modernization",
    outcome: "Reduce repeat incidents and change risk by removing brittle customizations and stabilizing foundations.",
    includes: [
      "Customization risk scan: business rules, script includes, client scripts, UI policies, Flow Designer vs legacy workflows",
      "Integration and routing stability: MID server patterns, REST/SOAP integrations, transform maps, event queues, retry/rollback patterns",
      "CMDB + service mapping touchpoints that drive incident routing (assignment groups, service offerings, CI relationships)",
      "Performance hygiene: slow transactions, heavy scripts, database query patterns, long-running business rules, async design",
    ],
    phases: [
      { title: "Phase 1 — Triage & Baseline (Week 1–2)", desc: "recurring incident patterns, top fragile areas, \"safe-to-change\" map" },
      { title: "Phase 2 — Debt Burn-down (Weeks 2–6)", desc: "remove/replace risky custom scripts, standardize workflow variants, stabilize key integrations" },
      { title: "Phase 3 — Hardening (Ongoing)", desc: "governance, coding standards, testing discipline, upgrade-safe patterns" },
    ],
    deliverables: [
      "\"Top 20 risk items\" list (fragile scripts, high-blast-radius changes, routing failures)",
      "Stabilization backlog with sequencing (impact × effort)",
      "Target-state guardrails (what is allowed vs banned going forward)",
    ],
  },
  {
    id: "upgrade-posture-management",
    icon: RefreshCcw,
    title: "Upgrade Posture Management",
    outcome: "Make upgrades predictable and low-risk—no more \"big bang\" upgrade fear.",
    includes: [
      "Automated impact analysis on: ATF coverage gaps, customizations, integrations, UI changes, deprecated APIs/usages",
      "Testing protocol: ATF strategy, smoke suites by module, integration test checkpoints, rollback plans",
      "Release governance: change windows, approvals, feature flags where applicable, post-deploy verification checks",
      "Continuous upgrade readiness: reduce backlog of upgrade blockers continuously instead of yearly firefighting",
    ],
    phases: [
      { title: "Phase 1 — Readiness Baseline", desc: "upgrade blockers map + testing baseline definition" },
      { title: "Phase 2 — Blocker Removal Sprint", desc: "remove high-risk customizations, fix integration fragility, close ATF gaps" },
      { title: "Phase 3 — Industrialized Upgrades", desc: "repeatable cadence with pre/post checks and measurable \"upgrade health\"" },
    ],
    deliverables: [
      "Upgrade blocker register (what breaks upgrades + why)",
      "Test strategy & minimum viable suite (what to automate vs manual)",
      "Upgrade runbook (repeatable process your team can sustain)",
    ],
  },
  {
    id: "ams",
    icon: Headphones,
    title: "Application Management (AMS)",
    outcome: "Keep the platform healthy post-modernization with continuous improvement—not just ticket closure.",
    includes: [
      "L2/L3 engineering support with root-cause discipline (not patch-and-close)",
      "Backlog burn-down: recurring incident elimination, workflow standardization, integration hardening",
      "Operational hygiene: monitoring signals, error budgets (where applicable), runbooks, KB/deflection improvements",
      "Automation bias: identify repetitive ops work and automate safely (flows, orchestration patterns, guardrails)",
    ],
    phases: [
      { title: "Phase 1 — Stabilize Run", desc: "triage model, SLAs, incident recurrence tracking, integration monitoring" },
      { title: "Phase 2 — Improve Continuously", desc: "recurring-issue elimination sprints, workflow cleanup, performance hygiene" },
      { title: "Phase 3 — Enable Automation", desc: "safe automation rollout, governance, and measurement" },
    ],
    deliverables: [
      "Monthly health review (what improved, what regressed, what's next)",
      "Recurrence tracker (top repeat issues + elimination plan)",
      "Backlog roadmap aligned to stability and change risk reduction",
    ],
  },
  {
    id: "ai-automation",
    icon: Bot,
    title: "AI & Automation Readiness",
    outcome: "Build foundations so AI workflows work reliably in production.",
    includes: [
      "Data reliability: CMDB/service mapping quality, ownership, normalization, duplicate control, routing correctness",
      "Process standardization: reduce workflow variants, enforce consistent categorization, define \"truth fields\"",
      "Governance & security: role hygiene, approval controls, auditability, safe automation constraints",
      "Virtual agent readiness: KB quality signals, deflection paths, escalation integrity, guardrails",
    ],
    phases: [
      { title: "Phase 1 — Readiness Baseline", desc: "where AI will fail today (data/process/governance gaps)" },
      { title: "Phase 2 — Foundation Fixes", desc: "stabilize workflows + data quality remediation + guardrails" },
      { title: "Phase 3 — Production Enablement", desc: "controlled rollout of AI-assisted workflows with measurement" },
    ],
    deliverables: [
      "AI-readiness gaps list with \"fix-first\" sequence",
      "Governance and guardrails checklist (what must be true before scaling)",
      "Enablement plan for automation/AI rollout (measured, staged)",
    ],
  },
];

export default function Services() {
  useEffect(() => {
    // Handle scrolling to hash anchor on mount and hash change
    const hash = window.location.hash;
    if (hash) {
      // Small delay to ensure content is rendered
      setTimeout(() => {
        const element = document.querySelector(hash);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, 100);
    }
  }, []);

  return (
    <Layout>
      {/* Hero */}
      <section className="py-16 md:py-24 bg-secondary/30">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="max-w-3xl"
          >
            <h1 className="font-heading text-3xl sm:text-4xl md:text-5xl font-bold text-foreground mb-4">
              Services
            </h1>
            <p className="text-muted-foreground text-lg md:text-xl mb-6">
              Modernization-first ServiceNow services for mid-tier B2B SaaS—reduce repeat incidents now, become AI-ready next.
            </p>
            <div className="flex flex-wrap gap-4 mb-8">
              <Button variant="default" size="lg" asChild>
                <Link to="/contact">Get a Free Health Check</Link>
              </Button>
              <Button variant="outline" size="lg" asChild>
                <Link to="/resources">View Resources</Link>
              </Button>
            </div>
            <div className="bg-accent/70 rounded-lg p-4 border border-border/50">
              <p className="text-sm">
                <span className="font-semibold text-foreground">We don't do:</span>{" "}
                <span className="text-muted-foreground">Greenfield implementations or lift-and-shift migrations.</span>
              </p>
              <p className="text-sm mt-1">
                <span className="font-semibold text-foreground">We do:</span>{" "}
                <span className="text-muted-foreground">Rehabilitate and modernize existing ServiceNow instances.</span>
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Anchor Navigation */}
      <nav className="sticky top-16 md:top-20 z-40 bg-background border-b border-border/50 py-3">
        <div className="container">
          <div className="flex gap-4 md:gap-8 overflow-x-auto pb-2 scrollbar-hide">
            {services.map((service) => (
              <a
                key={service.id}
                href={`#${service.id}`}
                className="text-sm font-medium text-muted-foreground hover:text-primary whitespace-nowrap transition-colors"
              >
                {service.title}
              </a>
            ))}
          </div>
        </div>
      </nav>

      {/* Services Detail */}
      <section className="py-16 md:py-20 bg-background border-t border-b border-border">
        <div className="container space-y-20">
          {services.map((service, index) => (
            <motion.div
              key={service.id}
              id={service.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="scroll-mt-[200px] border border-border rounded-xl p-8 bg-card"
            >
              <div className="flex items-start gap-4 mb-6">
                <div className="w-14 h-14 rounded-xl gradient-bg flex items-center justify-center flex-shrink-0">
                  <service.icon className="w-7 h-7 text-primary-foreground" />
                </div>
                <div>
                  <h2 className="font-heading text-2xl md:text-3xl font-bold text-foreground">
                    {service.title}
                  </h2>
                  <p className="text-primary font-medium mt-1">{service.outcome}</p>
                </div>
              </div>

              <div className="grid lg:grid-cols-2 gap-8">
                <div>
                  <h3 className="font-heading font-semibold text-foreground mb-4">What this includes (technical):</h3>
                  <ul className="space-y-3">
                    {service.includes.map((item, i) => (
                      <li key={i} className="flex items-start gap-3 text-sm text-muted-foreground">
                        <CheckCircle2 className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="space-y-6">
                  <div>
                    <h3 className="font-heading font-semibold text-foreground mb-4">Approach & phases:</h3>
                    <div className="space-y-3">
                      {service.phases.map((phase, i) => (
                        <div key={i} className="bg-secondary/50 rounded-lg p-4">
                          <h4 className="font-semibold text-foreground text-sm">{phase.title}</h4>
                          <p className="text-muted-foreground text-sm mt-1">{phase.desc}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h3 className="font-heading font-semibold text-foreground mb-4">Deliverables:</h3>
                    <ul className="space-y-2">
                      {service.deliverables.map((item, i) => (
                        <li key={i} className="flex items-start gap-3 text-sm text-muted-foreground">
                          <ArrowRight className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>

              {index === 1 && (
                <div className="mt-16 bg-accent/50 rounded-xl p-8 border border-border/50 text-center">
                  <h3 className="font-heading text-xl font-semibold text-foreground mb-2">
                    Not sure which service you need?
                  </h3>
                  <p className="text-muted-foreground mb-6">
                    Start with the Free Health Check—get clarity before committing to execution.
                  </p>
                  <Button variant="default" size="lg" asChild>
                    <Link to="/contact">Get a Free Health Check</Link>
                  </Button>
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-16 md:py-20 hero-gradient">
        <div className="container text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="font-heading text-2xl md:text-3xl font-bold text-primary-foreground mb-4">
              Ready to reduce repeat incidents and de-risk change?
            </h2>
            <p className="text-primary-foreground/80 mb-8">
              Request a Free Health Check—scorecard delivered in 7–10 business days after access + interviews.
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
