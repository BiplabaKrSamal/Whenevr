"use client";
import { useBooking } from "@/components/booking/BookingDialog";
import { useScrollReveal } from "@/hooks/use-scroll-reveal";
import Image from "next/image";

export default function CTA() {
  const { open: openBooking } = useBooking();
  const ref = useScrollReveal<HTMLDivElement>();
  return (
    <section className="py-24 md:py-32">
      <div className="container">
        <div ref={ref} data-revealed="false" className="reveal-up relative overflow-hidden rounded-3xl bg-foreground px-8 py-20 text-center text-background md:py-28">
          {/* decorative blobs */}
          <div aria-hidden="true" className="pointer-events-none absolute -left-24 -top-24 h-80 w-80 rounded-full bg-[hsl(264_90%_70%/0.35)] blur-3xl" />
          <div aria-hidden="true" className="pointer-events-none absolute -bottom-20 -right-20 h-72 w-72 rounded-full bg-[hsl(200_90%70%/0.25)] blur-3xl" />

          <div className="relative">
            <span className="inline-block rounded-full border border-white/15 bg-white/10 px-4 py-1 text-xs font-semibold uppercase tracking-widest text-white/80 mb-6">
              Ready?
            </span>
            <h2 className="text-4xl font-semibold tracking-tight text-white md:text-6xl text-balance">
              Great design is<br />
              <span className="font-display font-normal italic">closer than you think.</span>
            </h2>
            <p className="mx-auto mt-6 max-w-md text-base text-white/60 leading-relaxed">
              Start with a quick intro call. 15 minutes, no pressure, no pitch — just a clear look at how Whenevr works.
            </p>

            <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
              <a href="#pricing"
                className="inline-flex items-center gap-2 rounded-full bg-white px-7 py-3.5 text-[15px] font-semibold text-black transition hover:bg-white/90 btn-press">
                See pricing
              </a>
              <button type="button" onClick={openBooking}
                className="group inline-flex items-center gap-3 rounded-full border border-white/20 bg-white/5 py-2 pl-2 pr-5 backdrop-blur-sm hover:bg-white/10 transition btn-press">
                <Image src="/assets/avatar-call.jpg" alt="" width={36} height={36} className="h-9 w-9 rounded-full object-cover" />
                <span className="text-[13px] font-medium text-white/90">Book a 15-min intro call</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
