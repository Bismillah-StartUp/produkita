import { NavbarLanding, FooterLanding } from "@/components/navigations"
import { Landing } from "@/components/pages/landing"

export default function Home() {
  return (
    <div className="w-full bg-linear-to-b from-slate-50 to-white">
      <NavbarLanding />
      <Landing />
      <FooterLanding />
    </div>
  )
}
