import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Zap, CheckCircle, Award, Shield, Lock } from "lucide-react"

export const Hero = () => {
  return (
    <section className="relative overflow-hidden py-20 md:py-32">
      <div className="mx-auto max-w-6xl px-6">
        <div className="grid items-center gap-12 md:grid-cols-2 md:gap-8">
          <div className="space-y-6">
            <div className="inline-flex items-center gap-2 rounded-full bg-blue-50 px-4 py-2 text-sm font-medium text-blue-600">
              <Zap className="h-4 w-4" />
              Solusi Sertifikasi Digital
            </div>

            <h1 className="text-4xl leading-tight font-bold text-gray-900 md:text-5xl lg:text-6xl">
              Sertifikasi Produk UMKM
              <span className="block text-blue-600">Jadi Lebih Mudah</span>
            </h1>

            <p className="max-w-lg text-lg text-gray-600">
              Platform terpercaya untuk mengelola dan memverifikasi legalitas
              produk UMKM Anda. Dari BPOM, HALAL, hingga PIRT - semua dalam satu
              tempat.
            </p>

            <div className="flex flex-col gap-4 pt-2 sm:flex-row">
              <Link href="/registry">
                <Button size="lg" className="w-full sm:w-auto cursor-pointer">
                  Mulai Sekarang
                </Button>
              </Link>
              <Button variant="outline" size="lg" className="w-full sm:w-auto cursor-pointer">
                Pelajari Lebih Lanjut
              </Button>
            </div>

            <div className="flex flex-col gap-8 pt-4 text-sm text-gray-600 sm:flex-row">
              <div className="flex items-center gap-2">
                <CheckCircle className="h-5 w-5 text-green-600" />
                <span>Aman & Terpercaya</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="h-5 w-5 text-green-600" />
                <span>Support 24/7</span>
              </div>
            </div>
          </div>

          <div className="relative">
            <div className="absolute inset-0 rounded-2xl bg-linear-to-r from-blue-600 to-purple-600 opacity-20 blur-2xl"></div>
            <div className="relative rounded-2xl border border-gray-100 bg-white p-8 shadow-xl">
              <div className="space-y-4">
                <div className="flex items-center gap-3 rounded-lg bg-green-50 p-4">
                  <Award className="h-5 w-5 text-green-600" />
                  <span className="text-sm font-medium text-green-900">
                    BPOM Terverifikasi
                  </span>
                </div>
                <div className="flex items-center gap-3 rounded-lg bg-blue-50 p-4">
                  <Shield className="h-5 w-5 text-blue-600" />
                  <span className="text-sm font-medium text-blue-900">
                    Sertifikasi HALAL
                  </span>
                </div>
                <div className="flex items-center gap-3 rounded-lg bg-purple-50 p-4">
                  <Lock className="h-5 w-5 text-purple-600" />
                  <span className="text-sm font-medium text-purple-900">
                    PIRT Registered
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
