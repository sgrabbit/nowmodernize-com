import { useQuery } from "@tanstack/react-query";
import { useParams, Link, Navigate } from "react-router-dom";
import { m } from "framer-motion";
import { Reveal } from "@/components/motion";
import { staggerContainer, fadeUp } from "@/components/motion/variants";
import {
  ArrowLeft,
  ArrowRight,
  Calendar,
  CheckCircle2,
  Heart,
  Quote,
  TrendingUp,
} from "lucide-react";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import {
  SEO,
  ArticleStructuredData,
  BreadcrumbStructuredData,
} from "@/components/SEO";
import {
  sanityClient,
  urlFor,
  type CaseStudy,
  type CaseStudyQuote,
  type PortableTextBlock,
  type PortableTextImage,
  type PortableTextChild,
  type PortableTextMarkDef,
} from "@/lib/sanity";
import groq from "groq";
import { format } from "date-fns";

const caseStudyQuery = groq`
  *[_type == "caseStudy" && slug.current == $slug][0] {
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
    featuredQuote,
    keyHighlights,
    clientLoves,
    aboutCompany,
    challenge,
    solution,
    results,
    bottomLine,
    closingQuote,
    tags
  }
`;

async function fetchCaseStudy(slug: string): Promise<CaseStudy | null> {
  return await sanityClient.fetch(caseStudyQuery, { slug });
}

// --- Portable Text renderer ---

type PortableTextVariant = "default" | "light";

function PortableText({
  value,
  variant = "default",
}: {
  value: (PortableTextBlock | PortableTextImage)[] | undefined;
  variant?: PortableTextVariant;
}) {
  if (!value || value.length === 0) return null;

  const isLight = variant === "light";
  const textColor = isLight ? "text-primary-foreground/90" : "text-foreground/90";
  const headingColor = isLight ? "text-primary-foreground" : "text-foreground";
  const mutedColor = isLight ? "text-primary-foreground/60" : "text-foreground/60";
  const linkColor = isLight
    ? "text-primary-foreground underline decoration-primary-foreground/30 hover:decoration-primary-foreground"
    : "text-foreground underline decoration-foreground/30 hover:decoration-foreground";
  const codeClasses = isLight
    ? "px-2 py-1 bg-white/10 rounded font-mono text-[0.92em] text-primary-foreground/90 border border-white/10"
    : "px-2 py-1 bg-muted/50 rounded font-mono text-[0.92em] text-foreground/90 border border-border/30";
  const quoteClasses = isLight
    ? "border-l-[3px] border-primary-foreground/20 pl-8 pr-8 py-1 my-8 text-[1.1em] leading-[1.7] italic text-primary-foreground/80"
    : "border-l-[3px] border-foreground/20 pl-8 pr-8 py-1 my-8 text-[1.1em] leading-[1.7] italic text-foreground/80";

  const renderChild = (
    child: PortableTextChild,
    markDefs?: PortableTextMarkDef[]
  ) => {
    let content: React.ReactNode = child.text;

    if (child.marks && child.marks.length > 0) {
      child.marks.forEach((mark) => {
        switch (mark) {
          case "strong":
            content = <strong className="font-bold">{content}</strong>;
            break;
          case "em":
            content = <em className="italic">{content}</em>;
            break;
          case "code":
            content = <code className={codeClasses}>{content}</code>;
            break;
          case "underline":
            content = (
              <u className="underline decoration-2 decoration-primary/40 underline-offset-2">
                {content}
              </u>
            );
            break;
          default:
            if (markDefs) {
              const markDef = markDefs.find((def) => def._key === mark);
              if (markDef && markDef.href) {
                const isExternal = markDef.href.startsWith("http");
                content = (
                  <a
                    href={markDef.href}
                    target={isExternal ? "_blank" : undefined}
                    rel={isExternal ? "noopener noreferrer" : undefined}
                    className={`${linkColor} transition-colors underline-offset-2`}
                  >
                    {content}
                  </a>
                );
              }
            }
        }
      });
    }

    return <span key={child._key}>{content}</span>;
  };

  const groupedBlocks: React.ReactNode[] = [];
  let currentList: PortableTextBlock[] = [];
  let currentListType: "bullet" | "number" | null = null;

  const flushList = (keyIndex: number) => {
    if (currentList.length === 0 || !currentListType) return;
    if (currentListType === "bullet") {
      groupedBlocks.push(
        <ul
          key={`list-${keyIndex}`}
          className="space-y-3 my-6 text-lg leading-[1.75]"
        >
          {currentList.map((item) => (
            <li
              key={item._key}
              className={`ml-8 pl-2 relative before:content-['•'] before:absolute before:-left-6 ${isLight ? "before:text-primary-foreground/60" : "before:text-foreground/60"}`}
            >
              {item.children?.map((child) =>
                renderChild(child, item.markDefs)
              )}
            </li>
          ))}
        </ul>
      );
    } else {
      groupedBlocks.push(
        <ol
          key={`list-${keyIndex}`}
          className="space-y-3 my-6 text-lg leading-[1.75] list-decimal list-inside"
        >
          {currentList.map((item) => (
            <li key={item._key} className="ml-6 pl-2">
              {item.children?.map((child) =>
                renderChild(child, item.markDefs)
              )}
            </li>
          ))}
        </ol>
      );
    }
    currentList = [];
    currentListType = null;
  };

  value.forEach((block, index) => {
    if ("listItem" in block && block.listItem) {
      if (currentListType === block.listItem) {
        currentList.push(block as PortableTextBlock);
      } else {
        flushList(index);
        currentList = [block as PortableTextBlock];
        currentListType = block.listItem;
      }
    } else {
      flushList(index);

      if (block._type === "block") {
        const textBlock = block as PortableTextBlock;
        const style = textBlock.style || "normal";
        const children = textBlock.children?.map((child) =>
          renderChild(child, textBlock.markDefs)
        );

        switch (style) {
          case "h2":
            groupedBlocks.push(
              <h2
                key={block._key}
                className={`font-heading text-2xl md:text-3xl font-bold leading-tight mt-10 mb-4 ${headingColor} tracking-tight`}
              >
                {children}
              </h2>
            );
            break;
          case "h3":
            groupedBlocks.push(
              <h3
                key={block._key}
                className={`font-heading text-xl md:text-2xl font-semibold leading-snug mt-8 mb-3 ${headingColor}`}
              >
                {children}
              </h3>
            );
            break;
          case "h4":
            groupedBlocks.push(
              <h4
                key={block._key}
                className={`font-heading text-lg md:text-xl font-semibold leading-snug mt-6 mb-3 ${headingColor}`}
              >
                {children}
              </h4>
            );
            break;
          case "blockquote":
            groupedBlocks.push(
              <blockquote key={block._key} className={quoteClasses}>
                {children}
              </blockquote>
            );
            break;
          default:
            groupedBlocks.push(
              <p
                key={block._key}
                className={`text-lg leading-[1.75] mb-6 ${textColor} tracking-normal`}
              >
                {children}
              </p>
            );
        }
      } else if (block._type === "image") {
        const imageBlock = block as PortableTextImage;
        groupedBlocks.push(
          <figure key={block._key} className="my-10 -mx-4 md:mx-0">
            <img
              src={urlFor(imageBlock).width(1400).url()}
              alt={imageBlock.alt || ""}
              className="w-full rounded-lg"
            />
            {imageBlock.caption && (
              <figcaption className={`text-center text-sm mt-4 px-4 md:px-0 leading-relaxed ${isLight ? "text-primary-foreground/60" : "text-muted-foreground"}`}>
                {imageBlock.caption}
              </figcaption>
            )}
          </figure>
        );
      }
    }
  });

  flushList(value.length);

  return <div className="max-w-none">{groupedBlocks}</div>;
}

// --- Quote block component (full-width breakout) ---

function QuoteBlock({ quote }: { quote: CaseStudyQuote }) {
  return (
    <section className="py-12 md:py-16 bg-secondary/20">
      <div className="container px-6 md:px-8">
        <Reveal className="max-w-3xl mx-auto relative">
          <Quote className="absolute -top-2 -left-2 md:-left-6 w-12 h-12 md:w-16 md:h-16 text-primary/10" />
          <blockquote className="relative z-10 text-xl md:text-2xl lg:text-[28px] leading-relaxed font-medium text-foreground italic pl-4 md:pl-0">
            &ldquo;{quote.text}&rdquo;
          </blockquote>
          {quote.attribution && (
            <cite className="block mt-6 text-base text-muted-foreground not-italic font-medium pl-4 md:pl-0">
              &mdash; {quote.attribution}
            </cite>
          )}
        </Reveal>
      </div>
    </section>
  );
}

export default function CaseStudyPost() {
  const { slug } = useParams<{ slug: string }>();

  const {
    data: study,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["caseStudy", slug],
    queryFn: () => fetchCaseStudy(slug!),
    enabled: !!slug,
  });

  if (isLoading) {
    return (
      <Layout>
        <div className="container py-16 md:py-24">
          <div className="text-center">
            <p className="text-muted-foreground">Loading case study...</p>
          </div>
        </div>
      </Layout>
    );
  }

  if (error || !study) {
    return <Navigate to="/case-studies" replace />;
  }

  const studyUrl = `https://nowmodernize.com/case-studies/${study.slug.current}`;
  const studyImage = study.featuredImage
    ? urlFor(study.featuredImage).width(1200).height(630).url()
    : undefined;

  return (
    <Layout>
      <SEO
        title={`${study.title} | Case Study`}
        description={
          study.excerpt ||
          `Read the ${study.clientName} case study on NowModernize`
        }
        image={studyImage}
        canonical={studyUrl}
        type="article"
        article={{
          publishedAt: study.publishedAt,
          modifiedAt: study._createdAt,
          author: "NowModernize",
          tags: study.tags,
        }}
      />

      <ArticleStructuredData
        title={study.title}
        description={study.excerpt || ""}
        image={studyImage}
        publishedAt={study.publishedAt}
        modifiedAt={study._createdAt}
        url={studyUrl}
        author="NowModernize"
      />

      <BreadcrumbStructuredData
        items={[
          { name: "Home", url: "https://nowmodernize.com" },
          {
            name: "Case Studies",
            url: "https://nowmodernize.com/case-studies",
          },
          { name: study.title, url: studyUrl },
        ]}
      />

      <article>
        {/* ===== 1. IMMERSIVE HERO ===== */}
        <section className="relative hero-gradient overflow-hidden">
          {study.featuredImage && (
            <div className="absolute inset-0">
              <img
                src={urlFor(study.featuredImage).width(1600).quality(85).url()}
                alt=""
                loading="eager"
                fetchPriority="high"
                className="w-full h-full object-cover opacity-20 brightness-75"
              />
            </div>
          )}
          <div className="absolute -bottom-40 -right-40 w-96 h-96 bg-teal/20 rounded-full blur-3xl" />

          <div className="container px-6 md:px-8 relative z-10 pt-8 pb-16 md:pt-12 md:pb-24">
            <Reveal trigger="mount" duration={0.5}>
              <Link
                to="/case-studies"
                className="inline-flex items-center gap-2 text-sm text-primary-foreground/60 hover:text-primary-foreground transition-colors group mb-8"
              >
                <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
                <span>Back to Case Studies</span>
              </Link>
            </Reveal>

            <div className="max-w-4xl">
              <Reveal trigger="mount" duration={0.6} delay={0.05}>
                <div className="flex items-center gap-3 mb-6 flex-wrap">
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-teal-light/20 text-teal-light border border-teal-light/20">
                    {study.clientName}
                  </span>
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-white/10 text-primary-foreground/80 border border-white/10">
                    {study.industry}
                  </span>
                  <div className="flex items-center gap-1.5 text-sm text-primary-foreground/50">
                    <Calendar className="w-3.5 h-3.5" />
                    <time dateTime={study.publishedAt}>
                      {format(new Date(study.publishedAt), "MMM d, yyyy")}
                    </time>
                  </div>
                </div>
              </Reveal>

              <Reveal trigger="mount" duration={0.6} delay={0.1}>
                <h1 className="font-heading text-[36px] sm:text-[44px] md:text-[56px] lg:text-[64px] leading-[1.1] font-bold text-primary-foreground mb-6 tracking-tight">
                  {study.title}
                </h1>
              </Reveal>

              {study.excerpt && (
                <Reveal trigger="mount" duration={0.6} delay={0.15}>
                  <p className="text-lg md:text-xl lg:text-[22px] leading-[1.5] text-primary-foreground/70 mb-8 max-w-3xl">
                    {study.excerpt}
                  </p>
                </Reveal>
              )}

              {study.services && study.services.length > 0 && (
                <Reveal trigger="mount" duration={0.6} delay={0.2}>
                  <div className="flex flex-wrap gap-2">
                    {study.services.map((svc) => (
                      <span
                        key={svc}
                        className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-white/10 text-primary-foreground/70 border border-white/5"
                      >
                        {svc}
                      </span>
                    ))}
                  </div>
                </Reveal>
              )}
            </div>
          </div>
        </section>

        {/* ===== 2. KEY HIGHLIGHTS SNAPSHOT BAR ===== */}
        {study.keyHighlights && study.keyHighlights.length > 0 && (
          <section className="py-10 md:py-14 teal-band-gradient border-y border-border/30">
            <div className="container px-6 md:px-8">
              <m.div
                className="max-w-5xl mx-auto"
                variants={staggerContainer}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-60px" }}
              >
                <m.h2
                  variants={fadeUp}
                  className="font-heading text-lg font-semibold text-foreground mb-8 text-center tracking-tight uppercase"
                >
                  Key Highlights
                </m.h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
                  {study.keyHighlights.map((item, i) => (
                    <m.div
                      key={i}
                      variants={fadeUp}
                      className="flex items-start gap-3 bg-background/80 backdrop-blur-sm rounded-xl p-5 border border-border/50 shadow-sm"
                    >
                      <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                      <span className="text-sm md:text-base text-foreground/90 leading-relaxed">
                        {item}
                      </span>
                    </m.div>
                  ))}
                </div>
              </m.div>
            </div>
          </section>
        )}

        {/* ===== 3. FEATURED QUOTE ===== */}
        {study.featuredQuote && <QuoteBlock quote={study.featuredQuote} />}

        {/* ===== 4. ABOUT THE COMPANY ===== */}
        {study.aboutCompany && study.aboutCompany.length > 0 && (
          <section className="py-14 md:py-20 bg-background">
            <div className="container px-6 md:px-8">
              <Reveal className="max-w-[720px] mx-auto">
                <h2 className="font-heading text-2xl md:text-3xl font-bold text-foreground mb-8 tracking-tight flex items-center gap-3">
                  <span className="w-1 h-8 bg-primary rounded-full" />
                  About the Company
                </h2>
                <PortableText value={study.aboutCompany} />
              </Reveal>
            </div>
          </section>
        )}

        {/* ===== 5. THE CHALLENGE (contrasting band) ===== */}
        {study.challenge && study.challenge.length > 0 && (
          <section className="py-14 md:py-20 bg-secondary/30">
            <div className="container px-6 md:px-8">
              <Reveal className="max-w-[720px] mx-auto">
                <h2 className="font-heading text-2xl md:text-3xl font-bold text-foreground mb-8 tracking-tight flex items-center gap-3">
                  <span className="w-1 h-8 bg-destructive/60 rounded-full" />
                  The Challenge
                </h2>
                <PortableText value={study.challenge} />
              </Reveal>
            </div>
          </section>
        )}

        {/* ===== 6. THE SOLUTION ===== */}
        {study.solution && study.solution.length > 0 && (
          <section className="py-14 md:py-20 bg-background">
            <div className="container px-6 md:px-8">
              <Reveal className="max-w-[720px] mx-auto">
                <h2 className="font-heading text-2xl md:text-3xl font-bold text-foreground mb-8 tracking-tight flex items-center gap-3">
                  <span className="w-1 h-8 bg-primary rounded-full" />
                  The Solution
                </h2>
                {study.services && study.services.length > 0 && (
                  <div className="flex flex-wrap gap-2 mb-8">
                    {study.services.map((svc) => (
                      <span
                        key={svc}
                        className="inline-flex items-center px-3 py-1.5 rounded-lg text-xs font-semibold bg-primary/10 text-primary border border-primary/10"
                      >
                        {svc}
                      </span>
                    ))}
                  </div>
                )}
                <PortableText value={study.solution} />
              </Reveal>
            </div>
          </section>
        )}

        {/* ===== 7. WHAT THE CLIENT LOVES (accent band) ===== */}
        {study.clientLoves && study.clientLoves.length > 0 && (
          <section className="py-14 md:py-20 bg-primary/[0.04]">
            <div className="container px-6 md:px-8">
              <m.div
                className="max-w-4xl mx-auto"
                variants={staggerContainer}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-60px" }}
              >
                <m.h2
                  variants={fadeUp}
                  className="font-heading text-2xl md:text-3xl font-bold text-foreground mb-10 tracking-tight text-center flex items-center justify-center gap-3"
                >
                  <Heart className="w-7 h-7 text-primary" />
                  What the Client Loves
                </m.h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-5">
                  {study.clientLoves.map((item, i) => (
                    <m.div
                      key={i}
                      variants={fadeUp}
                      className="flex items-start gap-4 bg-background rounded-xl p-5 md:p-6 border border-primary/10 shadow-sm hover:shadow-md transition-shadow"
                    >
                      <Heart className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                      <span className="text-base text-foreground/90 leading-relaxed">
                        {item}
                      </span>
                    </m.div>
                  ))}
                </div>
              </m.div>
            </div>
          </section>
        )}

        {/* ===== 8. RESULTS (dark navy band) ===== */}
        {study.results && study.results.length > 0 && (
          <section className="relative py-16 md:py-24 hero-gradient overflow-hidden">
            <div className="absolute -top-40 -left-40 w-80 h-80 bg-teal/10 rounded-full blur-3xl" />
            <div className="absolute -bottom-32 -right-32 w-64 h-64 bg-teal/15 rounded-full blur-3xl" />
            <div className="container px-6 md:px-8 relative z-10">
              <Reveal className="max-w-[720px] mx-auto">
                <h2 className="font-heading text-2xl md:text-3xl font-bold text-primary-foreground mb-10 tracking-tight flex items-center gap-3">
                  <TrendingUp className="w-7 h-7 text-teal-light" />
                  Results &amp; Impact
                </h2>
                <PortableText value={study.results} variant="light" />
              </Reveal>
            </div>
          </section>
        )}

        {/* ===== 9. INLINE CTA ===== */}
        <section className="py-10 md:py-14 bg-accent">
          <div className="container px-6 md:px-8">
            <Reveal className="max-w-2xl mx-auto text-center">
              <p className="font-heading text-xl md:text-2xl font-bold text-accent-foreground mb-4 leading-tight">
                Want similar results for your organization?
              </p>
              <p className="text-base text-accent-foreground/70 mb-6">
                Let us assess your ServiceNow instance and show you the path forward.
              </p>
              <Button variant="default" size="lg" asChild className="px-8">
                <Link to="/contact">
                  Get a Free Health Check
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Link>
              </Button>
            </Reveal>
          </div>
        </section>

        {/* ===== 10. THE BOTTOM LINE ===== */}
        {study.bottomLine && study.bottomLine.length > 0 && (
          <section className="py-14 md:py-20 bg-background">
            <div className="container px-6 md:px-8">
              <Reveal className="max-w-[720px] mx-auto">
                <h2 className="font-heading text-2xl md:text-3xl font-bold text-foreground mb-8 tracking-tight flex items-center gap-3">
                  <span className="w-1 h-8 bg-primary rounded-full" />
                  The Bottom Line
                </h2>
                <PortableText value={study.bottomLine} />
              </Reveal>
            </div>
          </section>
        )}

        {/* ===== 11. CLOSING QUOTE ===== */}
        {study.closingQuote && <QuoteBlock quote={study.closingQuote} />}

        {/* ===== 12. TAGS ===== */}
        {study.tags && study.tags.length > 0 && (
          <section className="py-10 md:py-12 bg-background border-b border-border/30">
            <div className="container px-6 md:px-8">
              <Reveal className="max-w-[720px] mx-auto">
                <div className="flex flex-wrap gap-2 justify-center">
                  {study.tags.map((tag) => (
                    <span
                      key={tag}
                      className="inline-flex items-center px-4 py-1.5 rounded-full text-sm bg-secondary/60 text-foreground hover:bg-secondary transition-colors"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </Reveal>
            </div>
          </section>
        )}

        {/* ===== 13. BOTTOM CTA (gradient) ===== */}
        <section className="relative py-16 md:py-24 hero-gradient overflow-hidden">
          <div className="absolute -top-32 -right-32 w-72 h-72 bg-teal/15 rounded-full blur-3xl" />
          <div className="container px-6 md:px-8 relative z-10">
            <Reveal className="max-w-2xl mx-auto text-center">
              <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold text-primary-foreground mb-5 leading-tight tracking-tight">
                Ready to modernize your ServiceNow instance?
              </h2>
              <p className="text-lg md:text-xl text-primary-foreground/70 mb-10 leading-relaxed">
                Get a Free Health Check and receive your scorecard in 7-10 business days.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Button variant="nav-cta" size="lg" asChild className="px-8 group">
                  <Link to="/contact">
                    Get a Free Health Check
                    <ArrowRight className="w-5 h-5 ml-2 transition-transform group-hover:translate-x-1" />
                  </Link>
                </Button>
                <Button
                  variant="outline"
                  size="lg"
                  asChild
                  className="px-8 border-primary-foreground/20 text-primary-foreground hover:bg-white/10 hover:text-primary-foreground"
                >
                  <Link to="/case-studies">View More Case Studies</Link>
                </Button>
              </div>
            </Reveal>
          </div>
        </section>
      </article>
    </Layout>
  );
}
