"use client";
import Image from "next/image";
import { useBooking } from "@/components/booking/BookingDialog";

const pills = [
  "Social Graphics","UX Design","Pitch Decks","Web Design","Branding",
  "Blog Graphics","Landing Pages","Illustrations","Product Design","Email Design",
  "UI Design","App Design","Style Guides","Icon Design","Ad Creatives",
];

export default function Hero() {
  const { open: openBooking } = useBooking();
  return (
    <section className="relative overflow-hidden pt-28 pb-20 md:pt-36 md:pb-28">
      <div aria-hidden="true"
        className="pointer-events-none absolute right-[-8%] top-[-6%] h-[820px] w-[820px] hero-blob animate-blob md:h-[980px] md:w-[980px]" />

      <div className="container relative">
        {/* Pills marquee */}
        <div className="relative mb-12 -mx-4 overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)]">
          <div className="flex w-max gap-2.5 animate-marquee">
            {[...pills, ...pills].map((p, i) => (
              <span key={i} className="whitespace-nowrap rounded-full bg-[hsl(var(--pill))] px-4 py-1.5 text-[13px] font-medium text-foreground shadow-pill">
                {p}
              </span>
            ))}
          </div>
        </div>

        <h1 className="max-w-[14ch] font-sans text-[44px] font-semibold leading-[1.02] tracking-[-0.04em] text-balance sm:text-6xl md:text-[80px] lg:text-[96px] lg:leading-[0.98]">
          World-class<br />
          design{" "}
          <span className="font-display font-normal tracking-tight">whenevr</span>
          <sup className="ml-0.5 align-super text-base font-sans font-normal text-muted-foreground md:text-xl">®</sup>
          <br />you need it.
        </h1>

        <p className="mt-7 max-w-md text-base leading-relaxed text-muted-foreground md:text-lg">
          A monthly design subscription for startups, creators, and teams who need work done without the wait.
        </p>

        <div className="mt-9 flex flex-col items-start gap-3 sm:flex-row sm:items-center sm:gap-4">
          <a href="#pricing"
            className="group btn-press inline-flex items-center gap-2 rounded-full bg-primary px-7 py-3.5 text-[15px] font-medium text-primary-foreground shadow-pill">
            See Pricing
            <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
          </a>

          <button type="button" onClick={openBooking}
            className="group btn-press inline-flex items-center gap-3 rounded-full bg-[hsl(var(--pill))] py-1.5 pl-1.5 pr-5 shadow-pill text-left">
            <Image src="/assets/avatar-call.jpg" alt="" width={40} height={40}
              className="h-10 w-10 rounded-full object-cover" />
            <span className="flex flex-col text-left leading-tight">
              <span className="text-[13px] font-semibold tracking-tight">Book a 15-min intro call</span>
              <span className="mt-0.5 flex items-center gap-1.5 text-[11px] text-muted-foreground">
                <span className="inline-block h-1.5 w-1.5 rounded-full bg-[hsl(var(--available))] animate-pulse-dot" />
                Available now
              </span>
            </span>
          </button>
        </div>
      </div>
    </section>
  );
}
