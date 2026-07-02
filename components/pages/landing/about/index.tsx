"use client";

import { Hero, Values, Contact, Stats } from "./partials";

export const LandingAbout = () => {
  return (
    <div className="w-full bg-linear-to-b from-slate-50 to-white">
      <Hero />
      <Values />
      <Contact />
      <Stats />
    </div>
  );
};
