import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function Dashboard() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-linear-to-br from-slate-50 to-slate-100 px-4">
      <div className="max-w-2xl w-full text-center">
        <div className="mb-8 flex justify-center">
          <div className="relative">
            <div className="text-6xl">🔧</div>
            <div className="absolute -top-2 -right-2 w-8 h-8 bg-yellow-400 rounded-full animate-pulse"></div>
          </div>
        </div>

        <h1 className="text-2xl md:text-3xl font-bold text-slate-900 mb-4">
          Dashboard Sedang Dalam Pengembangan
        </h1>

        <p className="text-lg text-slate-600 mb-2">
          Kami sedang mempersiapkan fitur dashboard terbaik untuk Anda.
        </p>

        <p className="text-slate-500 mb-12">
          Halaman ini akan segera tersedia dengan fitur-fitur yang lebih lengkap dan canggih.
        </p>

        <div className="space-y-4">
          <p className="text-slate-600 font-medium">
            Daftarkan Produk Anda Mulai Dari Sekarang!
          </p>
          <Link href="/registry">
            <Button size="lg" className="text-base px-8 py-3 h-auto cursor-pointer">
              Mulai Daftar Sekarang
            </Button>
          </Link>
        </div>

        <div className="mt-12 pt-8 border-t border-slate-200">
          <p className="text-sm text-slate-500">
            Terima kasih atas kesabaran Anda. Kami berkomitmen memberikan pengalaman terbaik.
          </p>
        </div>
      </div>
    </main>
  )
}
