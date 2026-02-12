import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { sanityClient, urlFor, type Post } from "@/lib/sanity";
import groq from "groq";
import { format } from "date-fns";

// GROQ query to fetch all published posts
const postsQuery = groq`
  *[_type == "post"] | order(publishedAt desc) {
    _id,
    _createdAt,
    title,
    slug,
    publishedAt,
    excerpt,
    image,
    body
  }
`;

// Fetch posts from Sanity
async function fetchPosts(): Promise<Post[]> {
  return await sanityClient.fetch(postsQuery);
}

// Calculate reading time based on body content
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

function BlogCard({ post, index }: { post: Post; index: number }) {
  const readingTime = calculateReadingTime(post.body);
  
  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="group"
    >
      <Link to={`/blog/${post.slug.current}`} className="block">
        {post.image && (
          <div className="aspect-[16/10] w-full overflow-hidden mb-6">
            <img
              src={urlFor(post.image).width(800).quality(85).url()}
              alt={post.title}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
          </div>
        )}
        
        <div className="space-y-3">
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <time dateTime={post.publishedAt}>
              {format(new Date(post.publishedAt), 'MMM d, yyyy')}
            </time>
            <span className="text-muted-foreground/50">·</span>
            <span>{readingTime} min read</span>
          </div>
          
          <h2 className="font-heading text-xl md:text-2xl font-bold text-foreground leading-tight group-hover:text-foreground/70 transition-colors">
            {post.title}
          </h2>
          
          {post.excerpt && (
            <p className="text-muted-foreground text-base leading-relaxed line-clamp-3">
              {post.excerpt}
            </p>
          )}
        </div>
      </Link>
    </motion.article>
  );
}

export default function Blog() {
  const { data: posts, isLoading, error } = useQuery({
    queryKey: ['posts'],
    queryFn: fetchPosts,
  });

  return (
    <Layout>
      {/* Hero */}
      <section className="py-16 md:py-24 border-b border-border/30">
        <div className="container px-6 md:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="max-w-[1100px] mx-auto"
          >
            <h1 className="font-heading text-5xl sm:text-6xl md:text-7xl font-bold text-foreground mb-6 tracking-tight">
              Blog
            </h1>
            <p className="text-muted-foreground text-xl md:text-2xl leading-relaxed max-w-3xl">
              Insights, strategies, and practical guidance for modernizing ServiceNow and achieving AI readiness.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Blog Posts Grid */}
      <section className="py-16 md:py-20 bg-background">
        <div className="container px-6 md:px-8">
          <div className="max-w-[1100px] mx-auto">
            {isLoading && (
              <div className="text-center py-16">
                <p className="text-muted-foreground text-lg">Loading posts...</p>
              </div>
            )}

            {error && (
              <div className="text-center py-16">
                <p className="text-destructive text-lg">Failed to load posts. Please try again later.</p>
              </div>
            )}

            {posts && posts.length === 0 && (
              <div className="text-center py-16">
                <p className="text-muted-foreground text-lg">No blog posts yet. Check back soon!</p>
              </div>
            )}

            {posts && posts.length > 0 && (
              <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-3 md:gap-x-8 md:gap-y-12">
                {posts.map((post, index) => (
                  <BlogCard key={post._id} post={post} index={index} />
                ))}
              </div>
            )}
          </div>
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
              <Link to="/contact">
                Get a Free Health Check
              </Link>
            </Button>
          </motion.div>
        </div>
      </section>
    </Layout>
  );
}
