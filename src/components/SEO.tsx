import { Helmet } from 'react-helmet-async';

interface SEOProps {
  title: string;
  description: string;
  image?: string;
  article?: {
    publishedAt: string;
    modifiedAt?: string;
    author?: string;
    tags?: string[];
  };
  type?: 'website' | 'article';
  canonical?: string;
}

export function SEO({ 
  title, 
  description, 
  image, 
  article, 
  type = 'website',
  canonical 
}: SEOProps) {
  const siteUrl = 'https://nowmodernize.com';
  const fullTitle = title.includes('NowModernize') ? title : `${title} | NowModernize`;
  const ogImage = image || `${siteUrl}/og-default.jpg`; // You'll need to create a default OG image
  const url = canonical || siteUrl;

  return (
    <Helmet>
      {/* Basic Meta Tags */}
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      {canonical && <link rel="canonical" href={url} />}

      {/* Open Graph */}
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content={type} />
      <meta property="og:url" content={url} />
      <meta property="og:image" content={ogImage} />
      <meta property="og:site_name" content="NowModernize" />

      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={ogImage} />

      {/* Article specific meta tags */}
      {article && (
        <>
          <meta property="article:published_time" content={article.publishedAt} />
          {article.modifiedAt && (
            <meta property="article:modified_time" content={article.modifiedAt} />
          )}
          {article.author && (
            <meta property="article:author" content={article.author} />
          )}
          {article.tags?.map((tag) => (
            <meta key={tag} property="article:tag" content={tag} />
          ))}
        </>
      )}
    </Helmet>
  );
}

// Structured Data (JSON-LD) for Articles
interface ArticleStructuredDataProps {
  title: string;
  description: string;
  image?: string;
  publishedAt: string;
  modifiedAt?: string;
  author?: string;
  url: string;
}

export function ArticleStructuredData({
  title,
  description,
  image,
  publishedAt,
  modifiedAt,
  author = 'NowModernize',
  url,
}: ArticleStructuredDataProps) {
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: title,
    description: description,
    image: image || 'https://nowmodernize.com/og-default.jpg',
    datePublished: publishedAt,
    dateModified: modifiedAt || publishedAt,
    author: {
      '@type': 'Organization',
      name: author,
      url: 'https://nowmodernize.com',
    },
    publisher: {
      '@type': 'Organization',
      name: 'NowModernize',
      logo: {
        '@type': 'ImageObject',
        url: 'https://nowmodernize.com/nmo_logo.svg',
      },
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': url,
    },
  };

  return (
    <Helmet>
      <script type="application/ld+json">
        {JSON.stringify(structuredData)}
      </script>
    </Helmet>
  );
}

// Breadcrumb Structured Data
interface BreadcrumbItem {
  name: string;
  url: string;
}

export function BreadcrumbStructuredData({ items }: { items: BreadcrumbItem[] }) {
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };

  return (
    <Helmet>
      <script type="application/ld+json">
        {JSON.stringify(structuredData)}
      </script>
    </Helmet>
  );
}
