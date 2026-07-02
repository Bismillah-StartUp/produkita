import { NavbarLanding, FooterLanding } from "@/components/navigations";
import { LandingFeatures } from "@/components/pages/landing";

export default function FeaturesPage() {
  return (
    <div className="w-full bg-linear-to-b from-slate-50 to-white">
      <NavbarLanding />
      <LandingFeatures />
      <FooterLanding />
    </div>
  );
}
