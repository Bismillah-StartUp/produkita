"use client"

import { CTA, Testimonials, Features, Partners, Hero } from "./partials"

export const Landing = () => {
  return (
    <div className="w-full bg-linear-to-b from-slate-50 to-white">
      <Hero />
      <Partners />
      <Features />
      <Testimonials />
      <CTA />
    </div>
  )
}
