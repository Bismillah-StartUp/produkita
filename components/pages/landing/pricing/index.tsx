"use client";

import { Hero, Plans, Cta } from "./partials";

export const LandingPricing = () => {
  return (
    <div className="w-full bg-linear-to-b from-slate-50 to-white overflow-hidden">
      <Hero />
      <Plans />
      <Cta />
    </div>
  );
};
