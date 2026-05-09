# Whenevr® — Pixel-Perfect Clone

Next.js 15 + TypeScript + Tailwind CSS clone of [whenevr.framer.website](https://whenevr.framer.website).

## Deploy in 60 seconds

```bash
# 1. Install dependencies
npm install

# 2. Deploy to Vercel (takes ~90s)
npx vercel --prod
```

Or push to GitHub → import at vercel.com/new → auto-deploys.

## What's built

| Section | Details |
|---|---|
| **Nav** | Sticky with blur, active section highlight, full-screen overlay menu with staggered animation |
| **Hero** | Marquee pill strip, animated gradient blob, booking CTA pill with pulse-dot |
| **Logos** | Slow marquee with pause-on-hover |
| **How It Works** | 4-step grid with scroll-reveal |
| **Showcase** | Image grid with hover zoom + overlay |
| **Features** | 6-card grid with icon swap on hover |
| **Pricing** | Monthly/annual toggle, 3-tier cards, savings calc |
| **Testimonials** | 4-card grid with star ratings |
| **FAQ** | CSS grid accordion, no JS libraries |
| **Blog** | Featured post + 3-card grid, static generated |
| **CTA** | Dark panel with gradient blobs |
| **Footer** | 4-column responsive |
| **Booking Dialog** | Full multi-step: calendar → time slots → details → confirmation |
| **Blog pages** | `/blog` index + `/blog/[slug]` statically generated |

## Stack

- **Next.js 15** (App Router, static export capable)
- **TypeScript** (strict)
- **Tailwind CSS** (custom design tokens, CSS vars)
- **react-hook-form + zod** (booking form validation)
- **date-fns** (calendar logic)
- **lucide-react** (icons)

## Design decisions

- CSS custom properties for all colors → dark mode ready
- `reveal-up` scroll animations via IntersectionObserver hook
- `btn-press` / `card-hover` utility classes for consistent micro-interactions
- Instrument Serif italic for display headings (matching Framer original)
- `[mask-image]` gradient fades on marquees
