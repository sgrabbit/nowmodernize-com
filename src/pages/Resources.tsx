import { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, Download, Mail, CheckCircle2, AlertCircle } from "lucide-react";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Alert, AlertDescription } from "@/components/ui/alert";

const resources = [
  {
    active: true,
    title: "AI-Readiness Checklist for ServiceNow (Mid-tier SaaS)",
    oneLiner: "A fast checklist to validate whether AI will work reliably in your ServiceNow environment.",
    whatYouGet: [
      "Checklist across Stability, Process Standardization, Data/CMDB, Governance/Security, Integration Reliability",
      "\"Fix-first\" priorities to unblock AI readiness",
      "A CIO-friendly alignment tool for teams",
    ],
    whatsInside: [
      "Stability prerequisites (repeat incidents, performance, reliability signals)",
      "Workflow prerequisites (standard categories, routing hygiene, fewer variants)",
      "Data/CMDB prerequisites (ownership, service mapping accuracy, drift checks)",
      "Governance prerequisites (roles, approvals, safe automation controls)",
      "Integration prerequisites (sources of truth, sync hygiene, monitoring basics)",
    ],
    url:"https://xennh3a2cyfqv68j.public.blob.vercel-storage.com/NowModernize-AI-Ready-ServiceNow-Leaders.pdf",
  },
  {
    active: true,
    title: "ServiceNow Modernization Scorecard (Sample)",
    oneLiner: "See the exact format we use to assess an instance for modernization + AI readiness.",
    whatYouGet: [
      "Sample 3–5 page scorecard structure",
      "Example scoring areas and executive summary style",
      "A model to communicate risk and priorities clearly",
    ],
    whatsInside: [
      "Stability scoring examples (recurrence patterns, fragility indicators)",
      "Change risk examples (custom scripts, upgrade blockers, testing gaps)",
      "Data & CMDB examples (routing reliability, service mapping, drift indicators)",
      "Governance & security examples (controls, ownership, role hygiene)",
      "AI-readiness narrative (why pilots fail + what to fix first)",
    ],
    url:"https://xennh3a2cyfqv68j.public.blob.vercel-storage.com/NowModernize-AI-Ready-ServiceNow-Leaders.pdf",
  },
  {
    active: true,
    title: "30/60/90 Modernization Roadmap (Sample)",
    oneLiner: "A staged plan to stabilize now and modernize foundations for AI readiness next.",
    whatYouGet: [
      "A CIO/CTO-sponsorable 30/60/90 sequencing blueprint",
      "KPI examples to prove progress (not just activity)",
      "A practical model for phased modernization",
    ],
    whatsInside: [
      "First 30 days: stabilize repeat incidents + reduce fragility",
      "60 days: standardize workflows + fix key CMDB/integration drift",
      "90 days: governance hardening + automation/AI enablement pathway",
      "KPI examples: incident recurrence reduction, routing accuracy, change failure rate",
    ],
    url:"https://xennh3a2cyfqv68j.public.blob.vercel-storage.com/NowModernize-AI-Ready-ServiceNow-Leaders.pdf",
  },
  {
    active: true,
    title: "What \"AI-Ready\" Means for ServiceNow Leaders (1-pager)",
    oneLiner: "A plain-English definition of AI-ready—without buzzwords.",
    whatYouGet: [
      "Clear definition: stable platform + standard processes + reliable data",
      "Common failure modes that break AI in production",
      "A quick readiness checklist leaders can use",
    ],
    whatsInside: [
      "Why AI \"looks good in demos\" but fails in real operations",
      "The minimum foundations needed before AI workflows scale",
      "How to measure readiness simply (signals, not jargon)",
      "What to prioritize first for stable, governed AI automation",
    ],
    url:"https://xennh3a2cyfqv68j.public.blob.vercel-storage.com/NowModernize-AI-Ready-ServiceNow-Leaders.pdf",
  },
  {
    active: true,
    title: "Upgrade Readiness Playbook (Light version)",
    oneLiner: "The minimum system to make upgrades predictable, low-risk, and repeatable.",
    whatYouGet: [
      "A lightweight approach to reduce upgrade fear",
      "A clear \"upgrade blocker\" framework (what to check, what to fix)",
      "Testing + governance baseline mid-tier teams can sustain",
    ],
    whatsInside: [
      "Upgrade blocker categories (custom scripts, integrations, drift, governance)",
      "Impact analysis basics (where upgrades usually break)",
      "Testing baseline (what's enough vs what's overkill)",
      "Release rhythm recommendations (so upgrades stop slipping)",
      "Risk controls (change windows, approvals, rollback discipline)",
    ],
    url:"https://xennh3a2cyfqv68j.public.blob.vercel-storage.com/NowModernize-AI-Ready-ServiceNow-Leaders.pdf",
  },
];

function ResourceCard({ resource, index }: { resource: typeof resources[0]; index: number }) {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Email validation
  const isValidEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const isButtonEnabled = email.trim() !== "" && isValidEmail(email);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!isButtonEnabled || isSubmitting) {
      return;
    }

    setIsSubmitting(true);
    setError(null);

    try {
      // Submit form to API
      const response = await fetch('/api/resource-download', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: email,
          resourceTitle: resource.title,
          resourceUrl: resource.url,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to process download request');
      }

      // Trigger file download
      const link = document.createElement('a');
      link.href = resource.url;
      link.download = `${resource.title}.pdf`;
      link.target = '_blank';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      // Show success state
      setSubmitted(true);
    } catch (err) {
      console.error('Resource download error:', err);
      setError(
        err instanceof Error 
          ? err.message 
          : 'Failed to process request. Please try again.'
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="bg-card rounded-xl border border-border/50 overflow-hidden"
    >
      <div className="p-6 md:p-8">
        <h3 className="font-heading text-xl font-semibold text-foreground mb-2">
          {resource.title}
        </h3>
        <p className="text-primary text-sm font-medium mb-6">
          {resource.oneLiner}
        </p>

        <div className="grid md:grid-cols-2 gap-6 mb-6">
          <div>
            <h4 className="font-semibold text-foreground text-sm mb-3">What you'll get:</h4>
            <ul className="space-y-2">
              {resource.whatYouGet.map((item, i) => (
                <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                  <CheckCircle2 className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-foreground text-sm mb-3">What's inside:</h4>
            <ul className="space-y-2">
              {resource.whatsInside.map((item, i) => (
                <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                  <ArrowRight className="w-3 h-3 text-muted-foreground flex-shrink-0 mt-1" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {!submitted ? (
          <div className="space-y-3">
            {error && (
              <Alert variant="destructive">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}
            <form onSubmit={handleSubmit} className="flex gap-3">
              <div className="relative flex-1">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  type="email"
                  placeholder="Enter your work email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  disabled={isSubmitting}
                  className="pl-10"
                />
              </div>
              <Button 
                type="submit" 
                variant="default"
                disabled={!isButtonEnabled || isSubmitting}
              >
                <Download className="w-4 h-4 mr-2" />
                {isSubmitting ? "Processing..." : "Access"}
              </Button>
            </form>
          </div>
        ) : (
          <div className="bg-accent rounded-lg p-4 flex items-center gap-3">
            <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0" />
            <div>
              <p className="font-semibold text-foreground text-sm">Download ready!</p>
              {/* <p className="text-muted-foreground text-sm">We've also emailed it to you.</p> */}
            </div>
          </div>
        )}
      </div>
    </motion.div>
  );
}

export default function Resources() {
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
              Resources
            </h1>
            <p className="text-muted-foreground text-lg md:text-xl">
              Practical guides for mid-tier B2B SaaS teams modernizing ServiceNow to become AI-ready (stable platform + standard processes + reliable data).
            </p>
          </motion.div>
        </div>
      </section>

      {/* Resources Grid */}
      <section className="py-16 md:py-20 bg-background">
        <div className="container space-y-8">
          {resources.filter(resource => resource.active).map((resource, index) => (
            <ResourceCard key={index} resource={resource} index={index} />
          ))}
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="py-16 md:py-20 bg-secondary/50">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="bg-card rounded-xl p-8 md:p-12 border border-border/50 text-center max-w-3xl mx-auto"
          >
            <h2 className="font-heading text-2xl md:text-3xl font-bold text-foreground mb-4">
              Want a scorecard for your instance?
            </h2>
            <p className="text-muted-foreground mb-8">
              Get a Free Health Check and receive your scorecard in 7–10 business days after access + interviews.
            </p>
            <Button variant="default" size="lg" asChild className="group">
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
