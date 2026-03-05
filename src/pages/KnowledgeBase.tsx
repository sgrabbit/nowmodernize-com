import { useState } from "react";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { Reveal } from "@/components/motion";
import { ArrowRight, Download, Mail, CheckCircle2, AlertCircle } from "lucide-react";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { SEO, BreadcrumbStructuredData } from "@/components/SEO";
import { sanityClient, type KnowledgeBaseItem } from "@/lib/sanity";
import groq from "groq";

const knowledgeBaseQuery = groq`
  *[_type == "knowledgeBase" && active == true] | order(_createdAt asc) {
    _id,
    active,
    title,
    slug,
    oneLiner,
    whatYouGet,
    whatsInside,
    resourceUrl,
    "resourceFileUrl": resourceFile.asset->url,
    tags
  }
`;

async function fetchKnowledgeBaseItems(): Promise<(KnowledgeBaseItem & { resourceFileUrl?: string })[]> {
  return await sanityClient.fetch(knowledgeBaseQuery);
}

function KnowledgeBaseCard({
  item,
  index,
}: {
  item: KnowledgeBaseItem & { resourceFileUrl?: string };
  index: number;
}) {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const downloadUrl = item.resourceUrl || item.resourceFileUrl || "";

  const isValidEmail = (val: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(val);
  };

  const isButtonEnabled = email.trim() !== "" && isValidEmail(email);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!isButtonEnabled || isSubmitting) return;

    setIsSubmitting(true);
    setError(null);

    try {
      const response = await fetch("/api/resource-download", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          resourceTitle: item.title,
          resourceUrl: downloadUrl,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to process download request");
      }

      const anchor = document.createElement("a");
      anchor.href = downloadUrl;
      anchor.download = `${item.title}.pdf`;
      anchor.target = "_blank";
      document.body.appendChild(anchor);
      anchor.click();
      document.body.removeChild(anchor);

      setSubmitted(true);
    } catch (err) {
      console.error("Knowledge base download error:", err);
      setError(
        err instanceof Error
          ? err.message
          : "Failed to process request. Please try again."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Reveal
      delay={index * 0.1}
      className="bg-card rounded-xl border border-border/50 overflow-hidden"
    >
      <div className="p-6 md:p-8">
        <h3 className="font-heading text-xl font-semibold text-foreground mb-2">
          {item.title}
        </h3>
        <p className="text-primary text-sm font-medium mb-6">
          {item.oneLiner}
        </p>

        <div className="grid md:grid-cols-2 gap-6 mb-6">
          {item.whatYouGet && item.whatYouGet.length > 0 && (
            <div>
              <h4 className="font-semibold text-foreground text-sm mb-3">
                What you'll get:
              </h4>
              <ul className="space-y-2">
                {item.whatYouGet.map((text, i) => (
                  <li
                    key={i}
                    className="flex items-start gap-2 text-sm text-muted-foreground"
                  >
                    <CheckCircle2 className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                    <span>{text}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
          {item.whatsInside && item.whatsInside.length > 0 && (
            <div>
              <h4 className="font-semibold text-foreground text-sm mb-3">
                What's inside:
              </h4>
              <ul className="space-y-2">
                {item.whatsInside.map((text, i) => (
                  <li
                    key={i}
                    className="flex items-start gap-2 text-sm text-muted-foreground"
                  >
                    <ArrowRight className="w-3 h-3 text-muted-foreground flex-shrink-0 mt-1" />
                    <span>{text}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
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
              <p className="font-semibold text-foreground text-sm">
                Download ready!
              </p>
            </div>
          </div>
        )}
      </div>
    </Reveal>
  );
}

export default function KnowledgeBase() {
  const {
    data: items,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["knowledgeBase"],
    queryFn: fetchKnowledgeBaseItems,
  });

  return (
    <Layout>
      <SEO
        title="Knowledge Base"
        description="Practical guides for mid-tier B2B SaaS teams modernizing ServiceNow to become AI-ready. Download checklists, playbooks, and roadmaps."
        canonical="https://nowmodernize.com/knowledge-base"
        type="website"
      />

      <BreadcrumbStructuredData
        items={[
          { name: "Home", url: "https://nowmodernize.com" },
          {
            name: "Knowledge Base",
            url: "https://nowmodernize.com/knowledge-base",
          },
        ]}
      />

      {/* Hero */}
      <section className="relative py-16 md:py-24 hero-gradient overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="/knowledgebase-bg.jpg"
            alt=""
            loading="eager"
            fetchPriority="high"
            className="w-full h-full object-cover opacity-30 brightness-90"
          />
        </div>

        <div className="container relative z-10">
          <Reveal trigger="mount" className="max-w-3xl">
            <h1 className="font-heading text-3xl sm:text-4xl md:text-5xl font-bold text-primary-foreground mb-4">
              Knowledge Base
            </h1>
            <p className="text-primary-foreground/80 text-lg md:text-xl">
              Practical guides for mid-tier B2B SaaS teams modernizing
              ServiceNow to become AI-ready (stable platform + standard
              processes + reliable data).
            </p>
          </Reveal>
        </div>
      </section>

      {/* Knowledge Base Grid */}
      <section className="py-16 md:py-20 bg-background">
        <div className="container space-y-8">
          {isLoading && (
            <div className="text-center py-16">
              <p className="text-muted-foreground text-lg">Loading...</p>
            </div>
          )}

          {error && (
            <div className="text-center py-16">
              <p className="text-destructive text-lg">
                Failed to load resources. Please try again later.
              </p>
            </div>
          )}

          {items && items.length === 0 && (
            <div className="text-center py-16">
              <p className="text-muted-foreground text-lg">
                No resources yet. Check back soon!
              </p>
            </div>
          )}

          {items &&
            items.length > 0 &&
            items.map((item, index) => (
              <KnowledgeBaseCard key={item._id} item={item} index={index} />
            ))}
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="py-16 md:py-20 bg-secondary/50">
        <div className="container">
          <Reveal className="bg-card rounded-xl p-8 md:p-12 border border-border/50 text-center max-w-3xl mx-auto">
            <h2 className="font-heading text-2xl md:text-3xl font-bold text-foreground mb-4">
              Want a scorecard for your instance?
            </h2>
            <p className="text-muted-foreground mb-8">
              Get a Free Health Check and receive your scorecard in 7-10
              business days after access + interviews.
            </p>
            <Button variant="default" size="lg" asChild className="group">
              <Link to="/contact">
                Get a Free Health Check
                <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
              </Link>
            </Button>
          </Reveal>
        </div>
      </section>
    </Layout>
  );
}
