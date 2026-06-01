---
name: San Antonio Operational Standard
colors:
  surface: '#f7f9fb'
  surface-dim: '#d8dadc'
  surface-bright: '#f7f9fb'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f2f4f6'
  surface-container: '#eceef0'
  surface-container-high: '#e6e8ea'
  surface-container-highest: '#e0e3e5'
  on-surface: '#191c1e'
  on-surface-variant: '#45474d'
  inverse-surface: '#2d3133'
  inverse-on-surface: '#eff1f3'
  outline: '#75777e'
  outline-variant: '#c5c6cd'
  surface-tint: '#525f78'
  primary: '#00030c'
  on-primary: '#ffffff'
  primary-container: '#101d33'
  on-primary-container: '#7985a0'
  inverse-primary: '#bac7e4'
  secondary: '#2d5dab'
  on-secondary: '#ffffff'
  secondary-container: '#80abfe'
  on-secondary-container: '#003d85'
  tertiary: '#00030a'
  on-tertiary: '#ffffff'
  tertiary-container: '#0d1e31'
  on-tertiary-container: '#76869e'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#d7e3ff'
  primary-fixed-dim: '#bac7e4'
  on-primary-fixed: '#0e1b31'
  on-primary-fixed-variant: '#3b475f'
  secondary-fixed: '#d8e2ff'
  secondary-fixed-dim: '#adc6ff'
  on-secondary-fixed: '#001a41'
  on-secondary-fixed-variant: '#054491'
  tertiary-fixed: '#d3e4fe'
  tertiary-fixed-dim: '#b7c8e1'
  on-tertiary-fixed: '#0b1c30'
  on-tertiary-fixed-variant: '#38485d'
  background: '#f7f9fb'
  on-background: '#191c1e'
  surface-variant: '#e0e3e5'
typography:
  display-lg:
    fontFamily: Inter
    fontSize: 32px
    fontWeight: '700'
    lineHeight: 40px
    letterSpacing: -0.02em
  headline-md:
    fontFamily: Inter
    fontSize: 24px
    fontWeight: '600'
    lineHeight: 32px
    letterSpacing: -0.01em
  title-lg:
    fontFamily: Inter
    fontSize: 20px
    fontWeight: '600'
    lineHeight: 28px
  body-md:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
  body-sm:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: '400'
    lineHeight: 20px
  label-md:
    fontFamily: Inter
    fontSize: 12px
    fontWeight: '600'
    lineHeight: 16px
    letterSpacing: 0.05em
  label-sm:
    fontFamily: Inter
    fontSize: 11px
    fontWeight: '500'
    lineHeight: 14px
  display-lg-mobile:
    fontFamily: Inter
    fontSize: 24px
    fontWeight: '700'
    lineHeight: 32px
rounded:
  sm: 0.125rem
  DEFAULT: 0.25rem
  md: 0.375rem
  lg: 0.5rem
  xl: 0.75rem
  full: 9999px
spacing:
  base: 4px
  xs: 4px
  sm: 8px
  md: 16px
  lg: 24px
  xl: 32px
  container-max: 1440px
  gutter: 20px
---

## Brand & Style

This design system is engineered for the rigors of private security human resources management. It balances executive-level reporting with high-utility workforce management. The visual language is **Corporate Modern**, drawing heavily from the structured efficiency of enterprise resource planning (ERP) software. 

The aesthetic is defined by disciplined organization, high information density, and a "digital operating system" feel. It prioritizes clarity and functional hierarchy to evoke feelings of **authority, reliability, and operational excellence**. Every element is designed to feel substantial and intentional, moving away from ephemeral startup trends toward a permanent, institutional presence.

## Colors

The palette is rooted in traditional institutional colors, updated for modern digital interfaces. 

- **Corporate Navy Blue (#101D33):** The foundation of the system, used for primary navigation and high-level headers to establish authority.
- **Security Blue (#2B5BA9):** Used for primary actions, links, and focus states, providing a clear call to action without compromising the professional tone.
- **Steel Silver & Graphite:** A range of grays used for borders, secondary text, and background layering to create a structured, organized environment.
- **Functional Accents:** Success Green and Warning Amber are used strictly for status indicators (Active, Pending, Expired) to ensure critical information is processed immediately.

## Typography

The system utilizes **Inter** for its exceptional legibility at small sizes and its neutral, systematic character. 

Hierarchy is established through weight and color rather than excessive size shifts. Large display titles are reserved for main dashboard views, while the majority of the interface uses highly legible body and label sizes to accommodate data-heavy tables and forms. Upper-case labeling with increased letter-spacing is used for category headers and table columns to provide a clear "metadata" layer distinct from user data.

## Layout & Spacing

This design system employs a **Fixed Grid** philosophy for desktop layouts to maintain a consistent "dashboard" feel, switching to a fluid model for mobile.

- **Desktop (1280px+):** 12-column grid with 24px margins. Content is housed in a standard container to prevent excessive line lengths on ultra-wide monitors.
- **Navigation:** A persistent left-hand sidebar (260px) provides the primary navigation structure, using high-contrast navy backgrounds to separate "System Controls" from "Content Areas."
- **Rhythm:** An 8px base unit (4px for tight components) ensures mathematical consistency across paddings and margins.
- **Mobile:** Elements stack vertically with a minimum 16px horizontal margin. Cards become full-width to maximize touch targets for personnel in the field.

## Elevation & Depth

To maintain a formal, institutional feel, elevation is primarily conveyed through **Tonal Layering** and **Low-Contrast Outlines** rather than heavy shadows.

- **Surface Levels:** The primary background uses a subtle off-white/silver (#F8FAFC). Cards and containers use pure white with a 1px border (#E2E8F0) to create a clear "object" feel.
- **Interactive Depth:** Only active elements (like a modal or a primary dropdown) utilize a shadow. These shadows are "Industrial"—tight, low-blur, and neutral (e.g., `0 4px 6px -1px rgba(0, 0, 0, 0.1)`).
- **Navigation Depth:** The sidebar is visually the "deepest" layer, using the darkest color to act as the anchor for the rest of the interface.

## Shapes

The shape language is **Soft (Level 1)**. 

Standard components (inputs, buttons, cards) use a 4px (0.25rem) corner radius. This provides a modern touch while retaining a rigid, structured appearance that feels more serious than fully rounded or pill-shaped designs. Large containers like the main sidebar or dashboard cards may use up to 8px (0.5rem) to soften the "boxiness" of the enterprise layout, but never enough to appear "playful."

## Components

### Buttons
Buttons are strictly rectangular with 4px rounding. 
- **Primary:** Corporate Navy Blue with White text for high-level actions (e.g., "Save Employee").
- **Secondary:** Steel Silver border with Graphite text for navigational or additive actions (e.g., "Add Document").
- **Ghost:** No background, Blue text, used for tertiary actions like "Cancel" or "View More."

### Cards
Cards are the primary container for data. They feature a 1px #E2E8F0 border, no shadow (unless hovered), and a clear header section separated by a subtle horizontal rule.

### Data Tables
Tables are the heart of the HR platform. They utilize a high-density layout with 12px vertical padding on rows. Header cells use `label-md` styling with a light gray background (#F1F5F9). Every second row is subtly striped to improve horizontal tracking of personnel data.

### Input Fields
Inputs use a white background, 1px gray border, and 14px text. Focus states transition the border to Security Blue with a 2px outer glow of the same color at 10% opacity.

### Status Chips
Small, high-contrast badges for status. 
- **Active:** Green text on light green background.
- **Inactive/Expired:** Red text on light red background.
- **Pending:** Amber text on light amber background.
All chips use semi-bold `label-sm` typography for maximum clarity.