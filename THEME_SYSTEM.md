# Centralized Section Theme System

## Overview

All homepage sections now use a centralized theme system that allows you to configure text sizes, spacing, backgrounds, and other styling properties from a single location.

## Quick Start

### Change text size for a single section

Edit `src/lib/section-theme.ts`:

```typescript
export const pageSectionThemes = {
  problem: {
    ...sectionThemes.large,    // Use 'default', 'large', 'hero', or 'compact'
    background: "bg-secondary/70",
  },
  // ... other sections
}
```

### Change text size for ALL sections

Edit the global scale multiplier (future enhancement):

```typescript
export const themeConfig = {
  globalTextScale: 1.33,  // 33% larger
  globalSpacingScale: 1.0,
  enableAnimations: true,
}
```

## Available Theme Presets

### `default` - Standard sizing
- Label: `text-xs sm:text-sm`
- Heading: `text-2xl sm:text-3xl md:text-4xl`
- Subheading: `text-base md:text-lg`
- Card Title: `text-lg md:text-xl`
- Card Description: `text-sm md:text-base`

### `large` - 33% larger (currently used in Problem & FinalCTA)
- Label: `text-sm sm:text-base`
- Heading: `text-3xl sm:text-4xl md:text-5xl`
- Subheading: `text-lg md:text-xl`
- Card Title: `text-xl md:text-2xl`
- Card Description: `text-base md:text-lg`

### `hero` - Extra large for hero sections
- Heading: `text-4xl sm:text-5xl md:text-6xl lg:text-7xl`
- Subheading: `text-xl md:text-2xl`

### `compact` - Smaller, denser
- Perfect for dense information sections

## Current Section Assignments

| Section | Theme | Background |
|---------|-------|------------|
| Hero | `hero` | Custom gradient |
| Problem | `large` | `bg-secondary/70` |
| Approach | `default` | `bg-background` |
| Services | `default` | `bg-secondary/70` |
| How We Start | `default` | `bg-background` |
| Why Us | `default` | `bg-secondary/70` |
| FAQ | `default` | `bg-background` |
| Final CTA | `large` | Custom gradient |

## How to Customize

### 1. Create a custom theme variant

```typescript
// In section-theme.ts
export const sectionThemes = {
  // ... existing themes
  
  myCustom: {
    background: "bg-gradient-to-b from-blue-900 to-blue-700",
    padding: "py-32 md:py-40",
    label: "text-base",
    heading: "text-5xl md:text-6xl",
    // ... etc
  } as SectionTheme,
}
```

### 2. Apply to a section

```typescript
export const pageSectionThemes = {
  problem: sectionThemes.myCustom,
  // ... rest
}
```

### 3. Override specific properties

```typescript
export const pageSectionThemes = {
  problem: {
    ...sectionThemes.large,
    background: "bg-gradient-to-b from-purple-900 to-pink-500",
    heading: "text-6xl md:text-7xl",  // Override just the heading
  },
}
```

## Typography Classes Reference

Each theme provides these classes:

- `theme.label` - Small uppercase labels
- `theme.heading` - Section main headings (h2)
- `theme.subheading` - Section subheadings/lead paragraphs
- `theme.cardTitle` - Card/feature titles (h3)
- `theme.cardDescription` - Card/feature descriptions
- `theme.bodyText` - General body text
- `theme.smallText` - Fine print, captions
- `theme.padding` - Section vertical padding
- `theme.background` - Section background

## Example: Making All Sections 50% Larger

```typescript
// Option 1: Use the 'large' preset for more sections
export const pageSectionThemes = {
  hero: sectionThemes.hero,
  problem: sectionThemes.large,
  approach: sectionThemes.large,    // Changed from default
  services: sectionThemes.large,    // Changed from default
  howWeStart: sectionThemes.large,  // Changed from default
  // etc
}

// Option 2: Create a custom 'extraLarge' preset
export const sectionThemes = {
  extraLarge: {
    // ... 50% larger than default
  }
}
```

## Benefits

✅ **Centralized control** - Change text sizes site-wide from one file  
✅ **Consistency** - All sections follow the same typography scale  
✅ **Maintainability** - Easy to experiment with different sizes  
✅ **Type-safe** - TypeScript ensures you don't miss any properties  
✅ **DRY** - No repeated Tailwind classes across components  

## Migration Complete

All 8 homepage sections have been refactored to use this system:
- ✅ HeroSection
- ✅ ProblemSection
- ✅ ApproachSection
- ✅ ServicesOverview
- ✅ HowWeStart
- ✅ WhyUs
- ✅ FAQSection
- ✅ FinalCTA

No linting errors detected. The site should work exactly as before, but now with centralized theme control.
