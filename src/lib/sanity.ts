import { createClient } from '@sanity/client';
import imageUrlBuilder from '@sanity/image-url';
import type { SanityImageSource } from '@sanity/image-url/lib/types/types';

// Sanity client configuration
export const sanityClient = createClient({
  projectId: import.meta.env.VITE_SANITY_PROJECT_ID,
  dataset: import.meta.env.VITE_SANITY_DATASET,
  apiVersion: import.meta.env.VITE_SANITY_API_VERSION || '2026-02-12',
  useCdn: true, // Use CDN for faster reads in production
});

// Image URL builder
const builder = imageUrlBuilder(sanityClient);

export function urlFor(source: SanityImageSource) {
  return builder.image(source);
}

// Portable Text types
export interface PortableTextMarkDef {
  _type: string;
  _key: string;
  href?: string;
}

export interface PortableTextChild {
  _type: string;
  _key: string;
  text: string;
  marks?: string[];
}

export interface PortableTextBlock {
  _type: string;
  _key: string;
  style?: string;
  level?: number;
  listItem?: 'bullet' | 'number';
  children?: PortableTextChild[];
  markDefs?: PortableTextMarkDef[];
}

export interface PortableTextImage {
  _type: 'image';
  _key: string;
  asset: {
    _ref: string;
    _type: string;
  };
  alt?: string;
  caption?: string;
}

// Post type definition
export interface Post {
  _id: string;
  _createdAt: string;
  title: string;
  slug: {
    current: string;
  };
  publishedAt: string;
  excerpt?: string;
  image?: {
    asset: {
      _ref: string;
      _type: string;
    };
  };
  body?: (PortableTextBlock | PortableTextImage)[];
}
