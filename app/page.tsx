import { BookingProvider } from "@/components/booking/BookingDialog";
import Nav from "@/components/landing/Nav";
import Hero from "@/components/landing/Hero";
import Logos from "@/components/landing/Logos";
import HowItWorks from "@/components/landing/HowItWorks";
import Showcase from "@/components/landing/Showcase";
import Features from "@/components/landing/Features";
import Pricing from "@/components/landing/Pricing";
import Testimonials from "@/components/landing/Testimonials";
import FAQ from "@/components/landing/FAQ";
import Blog from "@/components/landing/Blog";
import CTA from "@/components/landing/CTA";
import Footer from "@/components/landing/Footer";

export default function Home() {
  return (
    <BookingProvider>
      <Nav />
      <main>
        <Hero />
        <Logos />
        <HowItWorks />
        <Showcase />
        <Features />
        <Pricing />
        <Testimonials />
        <FAQ />
        <Blog />
        <CTA />
      </main>
      <Footer />
    </BookingProvider>
  );
}
