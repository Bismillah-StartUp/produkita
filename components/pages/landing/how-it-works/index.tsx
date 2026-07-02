"use client";

import { Steps, Benefits, Cta } from "./partials";

export const LandingHowItWorks = () => {
  return (
    <div className="w-full bg-linear-to-b from-slate-50 to-white overflow-hidden">
      <Steps />
      <Benefits />
      <Cta />
    </div>
  );
};
