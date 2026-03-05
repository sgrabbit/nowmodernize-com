import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import { Reveal } from "@/components/motion";
import { ArrowRight } from "lucide-react";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { SEO, BreadcrumbStructuredData } from "@/components/SEO";
import { sanityClient, urlFor, type CaseStudy } from "@/lib/sanity";
import groq from "groq";
import { format } from "date-fns";

const caseStudiesQuery = groq`
  *[_type == "caseStudy"] | order(publishedAt desc) {
    _id,
    _createdAt,
    title,
    slug,
    publishedAt,
    excerpt,
    clientName,
    industry,
    services,
    featuredImage,
    keyHighlights,
    tags
  }
`;

async function fetchCaseStudies(): Promise<CaseStudy[]> {
  return await sanityClient.fetch(caseStudiesQuery);
}

function CaseStudyCard({
  study,
  index,
}: {
  study: CaseStudy;
  index: number;
}) {
  return (
    <Reveal delay={index * 0.1} className="group">
      <Link to={`/case-studies/${study.slug.current}`} className="block">
        {study.featuredImage && (
          <div className="aspect-[16/10] w-full overflow-hidden mb-6 rounded-lg">
            <img
              src={urlFor(study.featuredImage).width(800).quality(85).url()}
              alt={study.featuredImage.alt || study.title}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
          </div>
        )}

        <div className="space-y-3">
          <div className="flex items-center gap-2 text-xs text-muted-foreground flex-wrap">
            <span className="font-medium text-primary">{study.clientName}</span>
            <span className="text-muted-foreground/50">&middot;</span>
            <span>{study.industry}</span>
            <span className="text-muted-foreground/50">&middot;</span>
            <time dateTime={study.publishedAt}>
              {format(new Date(study.publishedAt), "MMM d, yyyy")}
            </time>
          </div>

          <h2 className="font-heading text-xl md:text-2xl font-bold text-foreground leading-tight group-hover:text-foreground/70 transition-colors">
            {study.title}
          </h2>

          {study.excerpt && (
            <p className="text-muted-foreground text-base leading-relaxed line-clamp-3">
              {study.excerpt}
            </p>
          )}

          {study.services && study.services.length > 0 && (
            <div className="flex flex-wrap gap-1.5 pt-1">
              {study.services.slice(0, 3).map((svc) => (
                <span
                  key={svc}
                  className="inline-flex items-center px-2 py-0.5 rounded text-xs bg-secondary/60 text-muted-foreground"
                >
                  {svc}
                </span>
              ))}
              {study.services.length > 3 && (
                <span className="text-xs text-muted-foreground/60">
                  +{study.services.length - 3}
                </span>
              )}
            </div>
          )}

          <span className="inline-flex items-center gap-1.5 text-sm font-medium text-primary group-hover:gap-2.5 transition-all">
            Read case study
            <ArrowRight className="w-4 h-4" />
          </span>
        </div>
      </Link>
    </Reveal>
  );
}

export default function CaseStudies() {
  const {
    data: studies,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["caseStudies"],
    queryFn: fetchCaseStudies,
  });

  return (
    <Layout>
      <SEO
        title="Case Studies"
        description="Real-world ServiceNow modernization success stories. See how mid-tier B2B SaaS teams stabilized, modernized, and became AI-ready."
        canonical="https://nowmodernize.com/case-studies"
        type="website"
      />

      <BreadcrumbStructuredData
        items={[
          { name: "Home", url: "https://nowmodernize.com" },
          { name: "Case Studies", url: "https://nowmodernize.com/case-studies" },
        ]}
      />

      {/* Hero */}
      <section className="relative py-16 md:py-24 hero-gradient overflow-hidden border-b border-border/30">
        <div className="absolute inset-0">
          <img
            src="/casestudy-bg.jpg"
            alt=""
            loading="eager"
            fetchPriority="high"
            className="w-full h-full object-cover opacity-30 brightness-90"
          />
        </div>

        <div className="container px-6 md:px-8 relative z-10">
          <Reveal trigger="mount" className="max-w-[1100px] mx-auto">
            <h1 className="font-heading text-5xl sm:text-6xl md:text-7xl font-bold text-primary-foreground mb-6 tracking-tight">
              Case Studies
            </h1>
            <p className="text-primary-foreground/80 text-xl md:text-2xl leading-relaxed max-w-3xl">
              Real-world ServiceNow modernization success stories from mid-tier
              B2B SaaS teams.
            </p>
          </Reveal>
        </div>
      </section>

      {/* Case Studies Grid */}
      <section className="py-16 md:py-20 bg-background">
        <div className="container px-6 md:px-8">
          <div className="max-w-[1100px] mx-auto">
            {isLoading && (
              <div className="text-center py-16">
                <p className="text-muted-foreground text-lg">
                  Loading case studies...
                </p>
              </div>
            )}

            {error && (
              <div className="text-center py-16">
                <p className="text-destructive text-lg">
                  Failed to load case studies. Please try again later.
                </p>
              </div>
            )}

            {studies && studies.length === 0 && (
              <div className="text-center py-16">
                <p className="text-muted-foreground text-lg">
                  No case studies yet. Check back soon!
                </p>
              </div>
            )}

            {studies && studies.length > 0 && (
              <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-3 md:gap-x-8 md:gap-y-12">
                {studies.map((study, index) => (
                  <CaseStudyCard
                    key={study._id}
                    study={study}
                    index={index}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="py-16 md:py-20 border-t border-border/30 bg-background">
        <div className="container px-6 md:px-8">
          <Reveal className="max-w-[680px] mx-auto text-center">
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-4 leading-tight">
              Ready to modernize your ServiceNow instance?
            </h2>
            <p className="text-lg md:text-xl text-muted-foreground mb-8 leading-relaxed">
              Get a Free Health Check and receive your scorecard in 7-10
              business days.
            </p>
            <Button variant="default" size="lg" asChild className="px-8">
              <Link to="/contact">Get a Free Health Check</Link>
            </Button>
          </Reveal>
        </div>
      </section>
    </Layout>
  );
}
