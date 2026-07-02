"use client";

import {
  CTA,
  Testimonials,
  Features,
  Partners,
  Hero,
  HowItWorks,
  Pricing,
  FAQ,
} from "./partials";

export const LandingHome = () => {
  return (
    <div className="w-full bg-linear-to-b from-slate-50 to-white">
      <Hero />
      <Partners />
      <Features />
      <HowItWorks />
      <Testimonials />
      <Pricing />
      <FAQ />
      <CTA />
    </div>
  );
};
