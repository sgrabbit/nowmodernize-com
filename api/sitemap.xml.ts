import type { VercelRequest, VercelResponse } from '@vercel/node';
import { createClient } from '@sanity/client';

const sanityClient = createClient({
  projectId: process.env.VITE_SANITY_PROJECT_ID || '',
  dataset: process.env.VITE_SANITY_DATASET || 'production',
  apiVersion: process.env.VITE_SANITY_API_VERSION || '2026-02-12',
  useCdn: false, // Don't use CDN for sitemap generation
});

interface Post {
  slug: { current: string };
  publishedAt: string;
  _updatedAt: string;
}

export default async function handler(
  req: VercelRequest,
  res: VercelResponse
) {
  try {
    // Fetch all published posts from Sanity
    const posts: Post[] = await sanityClient.fetch(`
      *[_type == "post"] | order(publishedAt desc) {
        slug,
        publishedAt,
        _updatedAt
      }
    `);

    const baseUrl = 'https://nowmodernize.com';

    // Static pages
    const staticPages = [
      { url: '/', priority: 1.0, changefreq: 'weekly' },
      { url: '/services', priority: 0.9, changefreq: 'monthly' },
      { url: '/resources', priority: 0.9, changefreq: 'weekly' },
      { url: '/blog', priority: 0.9, changefreq: 'daily' },
      { url: '/about', priority: 0.8, changefreq: 'monthly' },
      { url: '/contact', priority: 0.8, changefreq: 'monthly' },
      { url: '/privacy', priority: 0.3, changefreq: 'yearly' },
      { url: '/terms', priority: 0.3, changefreq: 'yearly' },
    ];

    // Generate XML sitemap
    const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:news="http://www.google.com/schemas/sitemap-news/0.9"
        xmlns:xhtml="http://www.w3.org/1999/xhtml"
        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1"
        xmlns:video="http://www.google.com/schemas/sitemap-video/1.1">
${staticPages
  .map(
    (page) => `  <url>
    <loc>${baseUrl}${page.url}</loc>
    <changefreq>${page.changefreq}</changefreq>
    <priority>${page.priority}</priority>
  </url>`
  )
  .join('\n')}
${posts
  .map(
    (post) => `  <url>
    <loc>${baseUrl}/blog/${post.slug.current}</loc>
    <lastmod>${new Date(post._updatedAt || post.publishedAt).toISOString()}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>`
  )
  .join('\n')}
</urlset>`;

    // Set appropriate headers
    res.setHeader('Content-Type', 'application/xml');
    res.setHeader('Cache-Control', 's-maxage=3600, stale-while-revalidate');
    
    return res.status(200).send(sitemap);
  } catch (error) {
    console.error('Error generating sitemap:', error);
    return res.status(500).json({ error: 'Failed to generate sitemap' });
  }
}
