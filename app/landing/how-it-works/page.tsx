import { NavbarLanding, FooterLanding } from "@/components/navigations";
import { LandingHowItWorks } from "@/components/pages/landing";

export default function HowItWorksPage() {
  return (
    <div className="w-full bg-linear-to-b from-slate-50 to-white">
      <NavbarLanding />
      <LandingHowItWorks />
      <FooterLanding />
    </div>
  );
}
