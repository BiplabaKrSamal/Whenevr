import Link from "next/link";

const links = {
  Product: ["How it works", "Features", "Pricing", "Showcase"],
  Company:  ["Blog", "About", "Careers", "Contact"],
  Legal:    ["Privacy Policy", "Terms of Service", "Cookie Policy"],
};

const slugify = (s: string) => s.toLowerCase().replace(/\s+/g, "-");

export default function Footer() {
  return (
    <footer className="border-t border-border/60 bg-secondary/20 py-16">
      <div className="container grid gap-12 md:grid-cols-[1fr_auto_auto_auto]">
        {/* Brand */}
        <div>
          <Link href="/" className="text-2xl font-display italic">
            whenevr<sup className="text-xs not-italic font-sans">®</sup>
          </Link>
          <p className="mt-3 max-w-xs text-sm leading-relaxed text-muted-foreground">
            World-class design, whenever you need it. Subscribe, submit, ship.
          </p>
          <p className="mt-6 text-xs text-muted-foreground/60">
            © {new Date().getFullYear()} Whenevr®. All rights reserved.
          </p>
        </div>

        {/* Link columns */}
        {Object.entries(links).map(([group, items]) => (
          <div key={group}>
            <div className="mb-4 text-xs font-semibold uppercase tracking-widest text-muted-foreground/60">{group}</div>
            <ul className="space-y-3">
              {items.map((item) => (
                <li key={item}>
                  <Link href={`/${slugify(item)}`}
                    className="text-sm text-muted-foreground transition-colors hover:text-foreground">
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </footer>
  );
}
