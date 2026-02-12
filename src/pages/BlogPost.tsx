import { useQuery } from "@tanstack/react-query";
import { useParams, Link, Navigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, Calendar, Clock } from "lucide-react";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { SEO, ArticleStructuredData, BreadcrumbStructuredData } from "@/components/SEO";
import { sanityClient, urlFor, type Post, type PortableTextBlock, type PortableTextImage, type PortableTextChild, type PortableTextMarkDef } from "@/lib/sanity";
import groq from "groq";
import { format } from "date-fns";

// GROQ query to fetch a single post by slug
const postQuery = groq`
  *[_type == "post" && slug.current == $slug][0] {
    _id,
    _createdAt,
    title,
    slug,
    publishedAt,
    excerpt,
    image,
    body,
    readingTime,
    tags,
    author->{
      name,
      slug,
      image,
      bio
    }
  }
`;

// Fetch single post from Sanity
async function fetchPost(slug: string): Promise<Post | null> {
  return await sanityClient.fetch(postQuery, { slug });
}

// Calculate reading time
function calculateReadingTime(body?: Post['body']): number {
  if (!body) return 1;
  
  const wordsPerMinute = 200;
  const wordCount = body.reduce((count, block) => {
    if (block._type === 'block' && block.children) {
      const blockWords = block.children.reduce((acc, child) => {
        return acc + (child.text?.split(/\s+/).length || 0);
      }, 0);
      return count + blockWords;
    }
    return count;
  }, 0);
  
  return Math.max(1, Math.ceil(wordCount / wordsPerMinute));
}

// Medium-style Portable Text renderer
function PortableText({ value }: { value: Post['body'] }) {
  if (!value || value.length === 0) return null;

  // Helper to render text with marks (including links)
  const renderChild = (child: PortableTextChild, markDefs?: PortableTextMarkDef[]) => {
    let content: React.ReactNode = child.text;

    if (child.marks && child.marks.length > 0) {
      child.marks.forEach((mark) => {
        // Check if mark is a simple style or a reference to markDef
        switch (mark) {
          case 'strong':
            content = <strong className="font-bold">{content}</strong>;
            break;
          case 'em':
            content = <em className="italic">{content}</em>;
            break;
          case 'code':
            content = <code className="px-2 py-1 bg-muted/50 rounded font-mono text-[0.92em] text-foreground/90 border border-border/30">{content}</code>;
            break;
          case 'underline':
            content = <u className="underline decoration-2 decoration-primary/40 underline-offset-2">{content}</u>;
            break;
          default:
            // Check if it's a reference to a mark definition (e.g., link)
            if (markDefs) {
              const markDef = markDefs.find(def => def._key === mark);
              if (markDef && markDef.href) {
                const isExternal = markDef.href.startsWith('http');
                content = (
                  <a
                    href={markDef.href}
                    target={isExternal ? '_blank' : undefined}
                    rel={isExternal ? 'noopener noreferrer' : undefined}
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

  // Group list items together
  const groupedBlocks: React.ReactNode[] = [];
  let currentList: PortableTextBlock[] = [];
  let currentListType: 'bullet' | 'number' | null = null;

  value.forEach((block, index) => {
    if ('listItem' in block && block.listItem) {
      // Start or continue a list
      if (currentListType === block.listItem) {
        currentList.push(block as PortableTextBlock);
      } else {
        // Finish previous list if any
        if (currentList.length > 0 && currentListType) {
          groupedBlocks.push(
            currentListType === 'bullet' ? (
              <ul key={`list-${index}`} className="space-y-3 my-8 text-[21px] leading-[1.75]">
                {currentList.map(item => (
                  <li key={item._key} className="ml-8 pl-2 relative before:content-['•'] before:absolute before:-left-6 before:text-foreground/60">
                    {item.children?.map(child => renderChild(child, item.markDefs))}
                  </li>
                ))}
              </ul>
            ) : (
              <ol key={`list-${index}`} className="space-y-3 my-8 text-[21px] leading-[1.75] list-decimal list-inside">
                {currentList.map(item => (
                  <li key={item._key} className="ml-6 pl-2">
                    {item.children?.map(child => renderChild(child, item.markDefs))}
                  </li>
                ))}
              </ol>
            )
          );
        }
        // Start new list
        currentList = [block as PortableTextBlock];
        currentListType = block.listItem;
      }
    } else {
      // Finish list if any
      if (currentList.length > 0 && currentListType) {
        groupedBlocks.push(
          currentListType === 'bullet' ? (
            <ul key={`list-${index}`} className="space-y-3 my-8 text-[21px] leading-[1.75]">
              {currentList.map(item => (
                <li key={item._key} className="ml-8 pl-2 relative before:content-['•'] before:absolute before:-left-6 before:text-foreground/60">
                  {item.children?.map(child => renderChild(child, item.markDefs))}
                </li>
              ))}
            </ul>
          ) : (
            <ol key={`list-${index}`} className="space-y-3 my-8 text-[21px] leading-[1.75] list-decimal list-inside">
              {currentList.map(item => (
                <li key={item._key} className="ml-6 pl-2">
                  {item.children?.map(child => renderChild(child, item.markDefs))}
                </li>
              ))}
            </ol>
          )
        );
        currentList = [];
        currentListType = null;
      }

      // Render regular blocks
      if (block._type === 'block') {
        const textBlock = block as PortableTextBlock;
        const style = textBlock.style || 'normal';
        const children = textBlock.children?.map(child => renderChild(child, textBlock.markDefs));

        switch (style) {
          case 'h1':
            groupedBlocks.push(
              <h1 key={block._key} className="font-heading text-4xl md:text-5xl font-bold leading-tight mt-16 mb-4 text-foreground tracking-tight">
                {children}
              </h1>
            );
            break;
          case 'h2':
            groupedBlocks.push(
              <h2 key={block._key} className="font-heading text-3xl md:text-4xl font-bold leading-tight mt-14 mb-4 text-foreground tracking-tight">
                {children}
              </h2>
            );
            break;
          case 'h3':
            groupedBlocks.push(
              <h3 key={block._key} className="font-heading text-2xl md:text-3xl font-semibold leading-snug mt-12 mb-3 text-foreground">
                {children}
              </h3>
            );
            break;
          case 'h4':
            groupedBlocks.push(
              <h4 key={block._key} className="font-heading text-xl md:text-2xl font-semibold leading-snug mt-10 mb-3 text-foreground">
                {children}
              </h4>
            );
            break;
          case 'blockquote':
            groupedBlocks.push(
              <blockquote key={block._key} className="border-l-[3px] border-foreground/20 pl-8 pr-8 py-1 my-10 text-[1.1em] leading-[1.7] italic text-foreground/80">
                {children}
              </blockquote>
            );
            break;
          default:
            groupedBlocks.push(
              <p key={block._key} className="text-[21px] leading-[1.75] mb-8 text-foreground/90 tracking-normal">
                {children}
              </p>
            );
        }
      } else if (block._type === 'image') {
        // Render images (Medium-style: centered, full-bleed on mobile)
        const imageBlock = block as PortableTextImage;
        groupedBlocks.push(
          <figure key={block._key} className="my-12 -mx-4 md:mx-0">
            <img
              src={urlFor(imageBlock).width(1400).url()}
              alt={imageBlock.alt || ''}
              className="w-full"
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

  // Finish any remaining list
  if (currentList.length > 0 && currentListType) {
    groupedBlocks.push(
      currentListType === 'bullet' ? (
        <ul key={`list-final`} className="space-y-3 my-8 text-[21px] leading-[1.75]">
          {currentList.map(item => (
            <li key={item._key} className="ml-8 pl-2 relative before:content-['•'] before:absolute before:-left-6 before:text-foreground/60">
              {item.children?.map(child => renderChild(child, item.markDefs))}
            </li>
          ))}
        </ul>
      ) : (
        <ol key={`list-final`} className="space-y-3 my-8 text-[21px] leading-[1.75] list-decimal list-inside">
          {currentList.map(item => (
            <li key={item._key} className="ml-6 pl-2">
              {item.children?.map(child => renderChild(child, item.markDefs))}
            </li>
          ))}
        </ol>
      )
    );
  }

  return (
    <div className="max-w-none">
      {groupedBlocks}
    </div>
  );
}

export default function BlogPost() {
  const { slug } = useParams<{ slug: string }>();
  
  const { data: post, isLoading, error } = useQuery({
    queryKey: ['post', slug],
    queryFn: () => fetchPost(slug!),
    enabled: !!slug,
  });

  if (isLoading) {
    return (
      <Layout>
        <div className="container py-16 md:py-24">
          <div className="text-center">
            <p className="text-muted-foreground">Loading post...</p>
          </div>
        </div>
      </Layout>
    );
  }

  if (error || !post) {
    return <Navigate to="/blog" replace />;
  }

  // Use readingTime from Sanity if available, otherwise calculate it
  const readingTime = post.readingTime || calculateReadingTime(post.body);
  const postUrl = `https://nowmodernize.com/blog/${post.slug.current}`;
  const postImage = post.image ? urlFor(post.image).width(1200).height(630).url() : undefined;
  const authorName = post.author?.name || 'NowModernize';

  return (
    <Layout>
      {/* SEO Meta Tags */}
      <SEO
        title={post.title}
        description={post.excerpt || `Read ${post.title} on the NowModernize blog`}
        image={postImage}
        canonical={postUrl}
        type="article"
        article={{
          publishedAt: post.publishedAt,
          modifiedAt: post._createdAt,
          author: authorName,
          tags: post.tags,
        }}
      />

      {/* Structured Data */}
      <ArticleStructuredData
        title={post.title}
        description={post.excerpt || ''}
        image={postImage}
        publishedAt={post.publishedAt}
        modifiedAt={post._createdAt}
        url={postUrl}
        author={authorName}
      />

      {/* Breadcrumb Structured Data */}
      <BreadcrumbStructuredData
        items={[
          { name: 'Home', url: 'https://nowmodernize.com' },
          { name: 'Blog', url: 'https://nowmodernize.com/blog' },
          { name: post.title, url: postUrl },
        ]}
      />

      <article>
        {/* Back Button */}
        <section className="py-6 md:py-8 bg-background border-b border-border/30">
          <div className="container px-6 md:px-8">
            <div className="max-w-[680px] mx-auto">
              <Link 
                to="/blog" 
                className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors group"
              >
                <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
                <span>Back to Blog</span>
              </Link>
            </div>
          </div>
        </section>

        {/* Title & Meta Section */}
        <section className="py-12 md:py-16 bg-background">
          <div className="container px-6 md:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="max-w-[680px] mx-auto"
            >
              {/* Title */}
              <h1 className="font-heading text-[40px] sm:text-[48px] md:text-[56px] leading-[1.15] font-bold text-foreground mb-6 tracking-tight">
                {post.title}
              </h1>

              {/* Excerpt */}
              {post.excerpt && (
                <p className="text-[24px] leading-[1.5] text-muted-foreground mb-8">
                  {post.excerpt}
                </p>
              )}

              {/* Author & Meta */}
              <div className="pt-6 border-t border-border/40">
                {post.author && (
                  <div className="flex items-center gap-4 mb-4">
                    {post.author.image && (
                      <img
                        src={urlFor(post.author.image).width(48).height(48).url()}
                        alt={post.author.name}
                        className="w-12 h-12 rounded-full object-cover"
                      />
                    )}
                    <div>
                      <div className="font-medium text-foreground">{post.author.name}</div>
                      {post.author.bio && (
                        <div className="text-sm text-muted-foreground line-clamp-1">
                          {post.author.bio}
                        </div>
                      )}
                    </div>
                  </div>
                )}
                
                <div className="flex items-center gap-3 text-sm text-muted-foreground">
                  <div className="flex items-center gap-1.5">
                    <Calendar className="w-4 h-4" />
                    <time dateTime={post.publishedAt}>
                      {format(new Date(post.publishedAt), 'MMM d, yyyy')}
                    </time>
                  </div>
                  <span className="text-muted-foreground/50">·</span>
                  <div className="flex items-center gap-1.5">
                    <Clock className="w-4 h-4" />
                    <span>{readingTime} min read</span>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Hero Image */}
        {post.image && (
          <section className="w-full mb-12 md:mb-16">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="w-full"
            >
              <img
                src={urlFor(post.image).width(1600).quality(90).url()}
                alt={post.title}
                className="w-full"
              />
            </motion.div>
          </section>
        )}

        {/* Body Content */}
        <section className="pb-16 md:pb-20 bg-background">
          <div className="container px-6 md:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="max-w-[680px] mx-auto"
            >
              {post.body && (
                <PortableText value={post.body} />
              )}

              {/* Tags */}
              {post.tags && post.tags.length > 0 && (
                <div className="mt-12 pt-8 border-t border-border/40">
                  <div className="flex flex-wrap gap-2">
                    {post.tags.map((tag) => (
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
            </motion.div>
          </div>
        </section>

        {/* Bottom CTA */}
        <section className="py-16 md:py-20 border-t border-border/30 bg-background">
          <div className="container px-6 md:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="max-w-[680px] mx-auto text-center"
            >
              <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-4 leading-tight">
                Ready to modernize your ServiceNow instance?
              </h2>
              <p className="text-lg md:text-xl text-muted-foreground mb-8 leading-relaxed">
                Get a Free Health Check and receive your scorecard in 7–10 business days.
              </p>
              <Button variant="default" size="lg" asChild className="px-8">
                <Link to="/contact">Get a Free Health Check</Link>
              </Button>
            </motion.div>
          </div>
        </section>
      </article>
    </Layout>
  );
}
