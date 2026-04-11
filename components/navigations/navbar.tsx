import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Shield } from "lucide-react"

export const Navbar = () => {
  return (
    <nav className="sticky top-0 z-40 border-b border-gray-200 bg-white/80 backdrop-blur-sm">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <div className="flex items-center gap-2">
          <Shield className="h-6 w-6 text-blue-600" />
          <span className="text-xl font-bold text-gray-900">EntreCertivy</span>
        </div>

        <div className="hidden items-center gap-8 md:flex">
          <Link
            href="#features"
            className="text-gray-600 transition hover:text-gray-900"
          >
            Fitur
          </Link>
          <Link
            href="#clients"
            className="text-gray-600 transition hover:text-gray-900"
          >
            Klien
          </Link>
          <Link
            href="#pricing"
            className="text-gray-600 transition hover:text-gray-900"
          >
            Harga
          </Link>
        </div>

        <Link href="/dashboard">
          <Button>Dashboard</Button>
        </Link>
      </div>
    </nav>
  )
}
