/**
 * Centralized Section Theme Configuration
 * Define consistent styling patterns for all homepage sections
 */

export interface SectionTheme {
  // Background
  background: string;

  // Spacing
  padding: string;

  // Typography
  label: string;
  heading: string;
  subheading: string;
  subheadingWidth: string;
  cardTitle: string;
  cardDescription: string;
  bodyText: string;
  smallText: string;

  // Container
  containerClass?: string;

  // Animation
  enableAnimations?: boolean;
}

/**
 * Predefined theme variants
 */
export const sectionThemes = {
  // Default theme - standard sizing
  default: {
    background: "bg-background",
    padding: "py-16 md:py-24",
    label: "text-xs font-semibold tracking-wide text-primary/60",
    heading:
      "text-[28px] sm:text-[36px] md:text-[44px] leading-tight font-bold",
    subheadingWidth: "max-w-3xl mx-auto",
    subheading: "text-base md:text-lg leading-relaxed",
    cardTitle: "text-lg md:text-xl font-bold",
    cardDescription: "text-sm md:text-base leading-relaxed",
    bodyText: "text-base md:text-lg leading-relaxed",
    smallText: "text-sm",
    enableAnimations: true,
  } as SectionTheme,

  // Large theme - optimized typography
  large: {
    background: "bg-background",
    padding: "py-20 md:py-28",
    label: "text-xs font-semibold tracking-wide text-primary/60",
    heading:
      "text-[32px] sm:text-[44px] md:text-[56px] leading-tight font-bold",
    subheadingWidth: "max-w-3xl mx-auto",
    subheading: "text-lg md:text-xl leading-relaxed",
    cardTitle: "text-xl md:text-[22px] font-bold",
    cardDescription: "text-base md:text-[17px] leading-relaxed",
    bodyText: "text-base md:text-[17px] leading-relaxed",
    smallText: "text-base",
    enableAnimations: true,
  } as SectionTheme,

  // Hero theme - extra large for hero sections
  hero: {
    background: "bg-background",
    padding: "py-24 md:py-32 lg:py-40",
    label: "text-base sm:text-lg",
    heading: "text-4xl sm:text-5xl md:text-6xl lg:text-7xl",
    subheading: "text-xl md:text-2xl",
    cardTitle: "text-2xl md:text-3xl",
    cardDescription: "text-lg md:text-xl",
    bodyText: "text-large md:text-xl",
    smallText: "text-base md:text-lg",
    enableAnimations: true,
  } as SectionTheme,

  // Compact theme - smaller, denser
  compact: {
    background: "bg-background",
    padding: "py-12 md:py-16",
    label: "text-[10px] sm:text-xs",
    heading: "text-xl sm:text-2xl md:text-3xl",
    subheading: "text-sm md:text-base",
    subheadingWidth: "max-w-2xl mx-auto",
    cardTitle: "text-base md:text-lg",
    cardDescription: "text-xs md:text-sm",
    bodyText: "text-sm md:text-base",
    smallText: "text-xs",
    enableAnimations: true,
  } as SectionTheme,
} as const;

/**
 * Section-specific theme assignments
 * Configure which theme each section uses
 */
export const pageSectionThemes = {
  hero: {
    ...sectionThemes.hero,
    background:
      "relative min-h-[90vh] flex items-center overflow-hidden hero-gradient",
    padding: "", // Custom layout for hero
  } as SectionTheme,
  problem: {
    ...sectionThemes.large,
    background: "bg-background",
  } as SectionTheme,
  approach: {
    ...sectionThemes.large,
    background: "bg-slate-50",
  } as SectionTheme,
  services: {
    ...sectionThemes.large,
    background: "teal-band-gradient",
  } as SectionTheme,
  howWeStart: {
    ...sectionThemes.large,
    background: "bg-background",
  } as SectionTheme,
  whyUs: {
    ...sectionThemes.large,
    background: "bg-secondary/70",
  } as SectionTheme,
  faq: {
    ...sectionThemes.default,
    background: "bg-background",
  } as SectionTheme,
  finalCta: {
    ...sectionThemes.large,
    background: "hero-gradient relative overflow-hidden",
  } as SectionTheme,
} as const;

/**
 * Global theme configuration
 * Adjust this multiplier to scale all sections proportionally
 */
export const themeConfig = {
  // Set to 1.0 for default, 1.33 for 33% larger, 0.8 for 20% smaller
  globalTextScale: 1.0,

  // Global spacing multiplier
  globalSpacingScale: 1.0,

  // Enable/disable animations globally
  enableAnimations: true,
} as const;

/**
 * Utility function to merge theme with custom overrides
 */
export function mergeTheme(
  baseTheme: SectionTheme,
  overrides?: Partial<SectionTheme>
): SectionTheme {
  return {
    ...baseTheme,
    ...overrides,
  };
}

/**
 * Get theme for a specific section
 */
export function getSectionTheme(
  sectionName: keyof typeof pageSectionThemes
): SectionTheme {
  return pageSectionThemes[sectionName];
}
