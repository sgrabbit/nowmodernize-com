import { useQuery } from "@tanstack/react-query";
import { useParams, Link, Navigate } from "react-router-dom";
import { Reveal } from "@/components/motion";
import { ArrowLeft, Calendar, CheckCircle2, Heart, Quote } from "lucide-react";
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

// --- Portable Text renderer (shared with BlogPost) ---

function PortableText({ value }: { value: (PortableTextBlock | PortableTextImage)[] | undefined }) {
  if (!value || value.length === 0) return null;

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
            content = (
              <code className="px-2 py-1 bg-muted/50 rounded font-mono text-[0.92em] text-foreground/90 border border-border/30">
                {content}
              </code>
            );
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
                    className="text-foreground underline decoration-foreground/30 hover:decoration-foreground transition-colors underline-offset-2"
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
              className="ml-8 pl-2 relative before:content-['•'] before:absolute before:-left-6 before:text-foreground/60"
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
                className="font-heading text-2xl md:text-3xl font-bold leading-tight mt-10 mb-4 text-foreground tracking-tight"
              >
                {children}
              </h2>
            );
            break;
          case "h3":
            groupedBlocks.push(
              <h3
                key={block._key}
                className="font-heading text-xl md:text-2xl font-semibold leading-snug mt-8 mb-3 text-foreground"
              >
                {children}
              </h3>
            );
            break;
          case "h4":
            groupedBlocks.push(
              <h4
                key={block._key}
                className="font-heading text-lg md:text-xl font-semibold leading-snug mt-6 mb-3 text-foreground"
              >
                {children}
              </h4>
            );
            break;
          case "blockquote":
            groupedBlocks.push(
              <blockquote
                key={block._key}
                className="border-l-[3px] border-foreground/20 pl-8 pr-8 py-1 my-8 text-[1.1em] leading-[1.7] italic text-foreground/80"
              >
                {children}
              </blockquote>
            );
            break;
          default:
            groupedBlocks.push(
              <p
                key={block._key}
                className="text-lg leading-[1.75] mb-6 text-foreground/90 tracking-normal"
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
              <figcaption className="text-center text-sm text-muted-foreground mt-4 px-4 md:px-0 leading-relaxed">
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

// --- Quote block component ---

function QuoteBlock({ quote }: { quote: CaseStudyQuote }) {
  return (
    <div className="relative bg-secondary/30 rounded-xl p-8 md:p-10 my-10 border border-border/30">
      <Quote className="w-8 h-8 text-primary/30 mb-4" />
      <blockquote className="text-xl md:text-2xl leading-relaxed font-medium text-foreground italic">
        &ldquo;{quote.text}&rdquo;
      </blockquote>
      {quote.attribution && (
        <cite className="block mt-4 text-sm text-muted-foreground not-italic font-medium">
          &mdash; {quote.attribution}
        </cite>
      )}
    </div>
  );
}

// --- Section component ---

function ContentSection({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="mt-14 first:mt-0">
      <h2 className="font-heading text-2xl md:text-3xl font-bold text-foreground mb-6 tracking-tight">
        {title}
      </h2>
      {children}
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
        {/* Back Button */}
        <section className="py-6 md:py-8 bg-background border-b border-border/30">
          <div className="container px-6 md:px-8">
            <div className="max-w-[680px] mx-auto">
              <Link
                to="/case-studies"
                className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors group"
              >
                <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
                <span>Back to Case Studies</span>
              </Link>
            </div>
          </div>
        </section>

        {/* Title & Meta Section */}
        <section className="py-12 md:py-16 bg-background">
          <div className="container px-6 md:px-8">
            <Reveal trigger="mount" className="max-w-[680px] mx-auto">
              {/* Client & Industry Badges */}
              <div className="flex items-center gap-3 mb-6 flex-wrap">
                <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-primary/10 text-primary">
                  {study.clientName}
                </span>
                <span className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-secondary/50 text-foreground">
                  {study.industry}
                </span>
              </div>

              <h1 className="font-heading text-[40px] sm:text-[48px] md:text-[56px] leading-[1.15] font-bold text-foreground mb-6 tracking-tight">
                {study.title}
              </h1>

              {study.excerpt && (
                <p className="text-[22px] leading-[1.5] text-muted-foreground mb-8">
                  {study.excerpt}
                </p>
              )}

              <div className="pt-6 border-t border-border/40">
                <div className="flex items-center gap-3 text-sm text-muted-foreground flex-wrap">
                  <div className="flex items-center gap-1.5">
                    <Calendar className="w-4 h-4" />
                    <time dateTime={study.publishedAt}>
                      {format(new Date(study.publishedAt), "MMM d, yyyy")}
                    </time>
                  </div>
                  {study.services && study.services.length > 0 && (
                    <>
                      <span className="text-muted-foreground/50">&middot;</span>
                      <span>{study.services.join(", ")}</span>
                    </>
                  )}
                </div>
              </div>
            </Reveal>
          </div>
        </section>

        {/* Hero Image */}
        {study.featuredImage && (
          <section className="w-full mb-12 md:mb-16">
            <Reveal trigger="mount" delay={0.2} className="w-full">
              <img
                src={urlFor(study.featuredImage).width(1600).quality(90).url()}
                alt={study.featuredImage.alt || study.title}
                className="w-full"
              />
            </Reveal>
          </section>
        )}

        {/* Body Content */}
        <section className="pb-16 md:pb-20 bg-background">
          <div className="container px-6 md:px-8">
            <Reveal className="max-w-[680px] mx-auto">
              {/* Featured Quote */}
              {study.featuredQuote && (
                <QuoteBlock quote={study.featuredQuote} />
              )}

              {/* Key Highlights */}
              {study.keyHighlights && study.keyHighlights.length > 0 && (
                <div className="bg-card rounded-xl border border-border/50 p-6 md:p-8 my-10">
                  <h2 className="font-heading text-lg font-semibold text-foreground mb-4">
                    Key Highlights
                  </h2>
                  <ul className="space-y-3">
                    {study.keyHighlights.map((item, i) => (
                      <li
                        key={i}
                        className="flex items-start gap-3 text-base text-foreground/90"
                      >
                        <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* What the Client Loves */}
              {study.clientLoves && study.clientLoves.length > 0 && (
                <div className="bg-primary/5 rounded-xl border border-primary/10 p-6 md:p-8 my-10">
                  <h2 className="font-heading text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
                    <Heart className="w-5 h-5 text-primary" />
                    What the Client Loves
                  </h2>
                  <ul className="space-y-3">
                    {study.clientLoves.map((item, i) => (
                      <li
                        key={i}
                        className="flex items-start gap-3 text-base text-foreground/90"
                      >
                        <span className="text-primary font-bold mt-0.5">&bull;</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* About the Company */}
              {study.aboutCompany && study.aboutCompany.length > 0 && (
                <ContentSection title="About the Company">
                  <PortableText value={study.aboutCompany} />
                </ContentSection>
              )}

              {/* The Challenge */}
              {study.challenge && study.challenge.length > 0 && (
                <ContentSection title="The Challenge">
                  <PortableText value={study.challenge} />
                </ContentSection>
              )}

              {/* The Solution */}
              {study.solution && study.solution.length > 0 && (
                <ContentSection title="The Solution">
                  <PortableText value={study.solution} />
                </ContentSection>
              )}

              {/* Results */}
              {study.results && study.results.length > 0 && (
                <ContentSection title="Results">
                  <PortableText value={study.results} />
                </ContentSection>
              )}

              {/* The Bottom Line */}
              {study.bottomLine && study.bottomLine.length > 0 && (
                <ContentSection title="The Bottom Line">
                  <PortableText value={study.bottomLine} />
                </ContentSection>
              )}

              {/* Closing Quote */}
              {study.closingQuote && (
                <QuoteBlock quote={study.closingQuote} />
              )}

              {/* Tags */}
              {study.tags && study.tags.length > 0 && (
                <div className="mt-12 pt-8 border-t border-border/40">
                  <div className="flex flex-wrap gap-2">
                    {study.tags.map((tag) => (
                      <span
                        key={tag}
                        className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-secondary/50 text-foreground hover:bg-secondary transition-colors"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </Reveal>
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
      </article>
    </Layout>
  );
}
