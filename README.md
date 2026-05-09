# Whenevr® — Design Subscription Landing Page

A pixel-perfect Next.js 16 clone of the [Whenevr Framer design](https://whenevr.framer.website/).

## Stack

- **Framework**: Next.js 16 (App Router, Turbopack)
- **Styling**: Tailwind CSS v4 (`@theme` API, no config-file tokens)
- **Animations**: CSS keyframes + IntersectionObserver scroll reveals
- **Forms**: React Hook Form + Zod validation
- **Images**: Next.js `<Image>` with AVIF/WebP optimisation
- **Fonts**: Instrument Serif (Google Fonts) + System UI sans

## Features

- Fully responsive (mobile → tablet → desktop)
- Smooth scroll-reveal animations on every section
- Interactive booking dialog with calendar + time-slot picker (multi-step)
- Animated marquees (pill tags, logo strip) with `pause-on-hover`
- Animated blob hero with CSS radial gradients
- Accordion FAQ with CSS `grid-rows` animation
- Annual/monthly pricing toggle
- Blog index + individual post pages (statically generated)
- Full-screen navigation overlay with staggered link reveals
- Hover states, press transforms, and micro-interactions throughout

## Getting started

```bash
npm install
npm run dev       # http://localhost:3000
npm run build     # production build
```

## Project structure

```
app/
  page.tsx              # Home
  blog/
    page.tsx            # Blog index
    [slug]/page.tsx     # Blog post (SSG)
  globals.css           # Tailwind v4 @theme tokens + animations
  layout.tsx
components/
  booking/
    BookingDialog.tsx   # Multi-step booking flow
  landing/
    Nav.tsx Hero.tsx Logos.tsx HowItWorks.tsx Showcase.tsx
    Features.tsx Pricing.tsx Testimonials.tsx FAQ.tsx Blog.tsx
    CTA.tsx Footer.tsx
  ui/
    button.tsx input.tsx textarea.tsx label.tsx dialog.tsx
data/
  posts.ts              # Blog post content
hooks/
  use-scroll-reveal.tsx
  use-active-section.tsx
public/assets/          # Images (avatars, work, blog)
```
