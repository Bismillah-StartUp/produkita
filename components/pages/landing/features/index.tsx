"use client";

import { Hero, Grid, Cta } from "./partials";

export const LandingFeatures = () => {
  return (
    <div className="w-full bg-linear-to-b from-slate-50 to-white">
      <Hero />
      <Grid />
      <Cta />
    </div>
  );
};
