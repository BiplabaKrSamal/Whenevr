"use client";
import { useEffect, useState } from "react";
import { ChevronDown, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { useBooking } from "@/components/booking/BookingDialog";
import { useActiveSection } from "@/hooks/use-active-section";

const links = [
  { label: "How it works", hash: "how" },
  { label: "Features",     hash: "features" },
  { label: "Pricing",      hash: "pricing" },
  { label: "FAQs",         hash: "faq" },
] as const;

export default function Nav() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled]  = useState(false);
  const { open: openBooking }    = useBooking();
  const activeSection            = useActiveSection();

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 8);
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  const allMenuLinks = [
    { label: "Home", href: "/" },
    ...links.map((l) => ({ label: l.label, href: `/#${l.hash}` })),
    { label: "Showcase", href: "/#showcase" },
    { label: "Blog",     href: "/#blog" },
  ];

  return (
    <>
      <header className={cn(
        "fixed top-0 left-0 right-0 z-40 backdrop-blur-md bg-background/70 border-b border-border/40 transition-shadow duration-300",
        scrolled && "shadow-[0_1px_0_0_hsl(0_0%_0%/0.06),0_4px_16px_hsl(0_0%_0%/0.05)]",
      )}>
        <div className="container flex h-16 items-center justify-between">
          <a href="/" className="flex items-center gap-1 text-2xl font-display italic focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 rounded-sm">
            whenevr<sup className="text-xs not-italic font-sans -ml-0.5">®</sup>
          </a>

          <nav className="hidden md:flex items-center gap-8 text-sm font-medium" aria-label="Main">
            {links.map((l) => (
              <a key={l.hash} href={`/#${l.hash}`}
                className={cn(
                  "transition-colors duration-150 hover:text-foreground",
                  activeSection === l.hash ? "text-foreground font-semibold" : "text-muted-foreground",
                )}>
                {l.label}
              </a>
            ))}
          </nav>

          <button type="button" onClick={() => setMenuOpen((v) => !v)} aria-expanded={menuOpen}
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            className="inline-flex items-center gap-1.5 rounded-full bg-foreground px-5 py-2 text-sm font-medium text-background transition-transform hover:scale-105 active:scale-95">
            {menuOpen ? "Close" : "Menu"}
            {menuOpen ? <X className="h-3.5 w-3.5" /> : <ChevronDown className="h-3.5 w-3.5" />}
          </button>
        </div>
      </header>

      {/* Full-screen overlay */}
      <div role="dialog" aria-modal="true" aria-label="Navigation menu"
        className={cn(
          "fixed inset-0 z-30 bg-background transition-opacity duration-300",
          menuOpen ? "opacity-100" : "pointer-events-none opacity-0",
        )}>
        <div className="flex h-full flex-col items-center justify-center px-6">
          <nav className="flex flex-col items-center gap-2 text-center" aria-label="Full menu">
            {allMenuLinks.map((l, i) => (
              <a key={l.label} href={l.href} onClick={() => setMenuOpen(false)}
                style={{ transitionDelay: menuOpen ? `${i * 35}ms` : "0ms" }}
                className={cn(
                  "text-5xl font-semibold leading-none tracking-tight md:text-7xl",
                  "transition-all duration-500",
                  menuOpen ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0",
                  "hover:italic hover:font-display hover:font-normal hover:text-foreground/80",
                )}>
                {l.label}
              </a>
            ))}
            <button type="button" onClick={() => { setMenuOpen(false); openBooking(); }}
              style={{ transitionDelay: menuOpen ? `${allMenuLinks.length * 35}ms` : "0ms" }}
              className={cn(
                "mt-8 rounded-full bg-foreground px-8 py-3 text-base font-medium text-background",
                "transition-all duration-500 hover:scale-105 active:scale-95",
                menuOpen ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0",
              )}>
              Book a call
            </button>
          </nav>
          <p className="absolute bottom-8 text-xs text-muted-foreground">
            © {new Date().getFullYear()} Whenevr®
          </p>
        </div>
      </div>
    </>
  );
}
