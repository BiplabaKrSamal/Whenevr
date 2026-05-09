export interface Post {
  slug: string;
  tag: string;
  img: string;
  title: string;
  desc: string;
  read: string;
  featured?: boolean;
  content: string[];
}

export const posts: Post[] = [
  {
    slug: "why-startups-get-design-wrong",
    tag: "Branding",
    img: "/assets/blog-1.jpg",
    title: "Why Most Startups Keep Getting Design Wrong",
    desc: "Many teams move fast on product but fall behind on design. This post breaks down why that happens, how it holds you back, and what to do instead.",
    read: "5 min read",
    featured: true,
    content: [
      "Most early teams treat design as a finishing layer — something you sprinkle on once the product 'works'. The result is a feature-complete product that quietly underperforms because every surface fights the user.",
      "The fix isn't a bigger design team. It's bringing design into the same loop as product and engineering: shared context, fast turnarounds, and decisions made on real screens instead of slide decks.",
      "Three patterns we see in teams that get this right: (1) one person owns the visual system end-to-end, (2) feedback ships within 24 hours, (3) every release ends with a quick design review, not just a QA pass.",
      "Done well, design stops being a blocker and starts compounding — every screen you ship makes the next one cheaper and clearer.",
    ],
  },
  {
    slug: "design-without-hiring",
    tag: "Operations",
    img: "/assets/blog-2.jpg",
    title: "How to Get More Done Without Hiring a Full Design Team",
    desc: "Lean teams are using design subscriptions to stay fast without hiring.",
    read: "4 min read",
    content: [
      "Hiring a full design team is slow, expensive, and rarely the right move before product-market fit. A subscription model gives you predictable output without the overhead of recruiting, onboarding, and benefits.",
      "The trick is treating it like a real team: a single backlog, weekly priorities, and async reviews. Skip the one-off Fiverr mindset.",
      "Most founders we work with replace 1.5–2 full-time hires this way and ship more in a month than they did the previous quarter.",
    ],
  },
  {
    slug: "working-with-a-subscription",
    tag: "Workflow",
    img: "/assets/blog-3.jpg",
    title: "What Working With a Design Subscription Actually Looks Like",
    desc: "A behind the scenes look at how founders use design subscriptions.",
    read: "3 min read",
    content: [
      "You drop a request into a board. A designer picks it up the same day. You get a draft within 24–48 hours, iterate over Loom, and ship.",
      "There are no calls unless you want them, no scope negotiations, and no surprise invoices. Pause when you don't need it; resume when you do.",
      "It works best for teams that can write a clear one-paragraph brief and trust the designer to make the small calls.",
    ],
  },
  {
    slug: "real-cost-of-bad-design",
    tag: "Growth",
    img: "/assets/blog-4.jpg",
    title: "The Real Cost of Bad Design (It's Not What You Think)",
    desc: "Poor design slows down decisions, clutters your message, and stalls growth.",
    read: "6 min read",
    content: [
      "Bad design rarely shows up as a single broken screen. It shows up as longer sales cycles, lower activation, and a team that argues about taste instead of shipping.",
      "Every unclear button is a support ticket. Every cluttered landing page is a lower conversion rate. Every inconsistent component is an engineering hour you'll never get back.",
      "Investing in design isn't about looking pretty. It's about removing friction from every decision your customer and your team has to make.",
    ],
  },
];

export const getPost = (slug: string) => posts.find((p) => p.slug === slug);
