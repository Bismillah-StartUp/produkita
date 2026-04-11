import Link from "next/link"
import { Button } from "@/components/ui/button"

export const CTA = () => {
  return (
    <section className="bg-linear-to-r from-blue-600 to-blue-800 py-20 md:py-32">
      <div className="mx-auto max-w-4xl space-y-8 px-6 text-center">
        <h2 className="text-3xl font-bold text-white md:text-4xl">
          Siap Memulai Perjalanan Sertifikasi Anda?
        </h2>
        <p className="mx-auto max-w-2xl text-lg text-blue-100">
          Daftar sekarang dan dapatkan konsultasi gratis dengan tim expert kami
        </p>
        <div className="flex flex-col justify-center gap-4 pt-4 sm:flex-row">
          <Link href="/dashboard">
            <Button size="lg" variant="secondary" className="w-full sm:w-auto">
              Daftar Gratis
            </Button>
          </Link>
          <Button
            size="lg"
            variant="outline"
            className="w-full border-white bg-white/10 text-white hover:bg-white/20 sm:w-auto"
          >
            Hubungi Sales
          </Button>
        </div>
      </div>
    </section>
  )
}
