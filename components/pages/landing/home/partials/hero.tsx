import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { ArrowRight, Play, Sparkles } from "lucide-react";

export const Hero = () => {
  return (
    <section className="relative overflow-hidden pt-20 pb-16 md:pt-28 md:pb-24 bg-linear-to-b from-white via-white to-blue-50/50">
      <div className="mx-auto w-[90%] max-w-400 px-6 lg:px-8 text-center">
        <div className="inline-flex items-center justify-center gap-2 rounded-full bg-blue-50/80 px-4 py-1.5 text-xs font-semibold text-blue-600 mb-8 border border-blue-100/50 shadow-xs">
          <Sparkles className="h-3.5 w-3.5 fill-blue-600 text-blue-600" />
          Solusi Digital Produk UMKM Indonesia
        </div>

        <h1 className="text-4xl md:text-5xl lg:text-[64px] font-bold tracking-tight text-slate-900 mb-6 leading-[1.15]">
          Kelola Produk UMKM <br className="hidden md:block" />
          lebih Cerdas <span className="text-blue-600">Secara Digital.</span>
        </h1>

        <p className="mx-auto max-w-2xl text-base md:text-lg text-slate-500 mb-8 leading-relaxed">
          Platform barcode digital untuk mendaftarkan produk, menampilkan
          informasi gizi & sertifikat, dan mengelola keuangan bisnis dalam satu
          tempat.
        </p>

        <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-3 text-sm font-medium text-slate-500 mb-10">
          <div className="flex items-center gap-2">
            <Sparkles className="h-3.5 w-3.5 text-yellow-400 fill-yellow-400" />
            <span>QR Code Produk</span>
          </div>
          <div className="flex items-center gap-2">
            <Sparkles className="h-3.5 w-3.5 text-orange-400 fill-orange-400" />
            <span>Manajemen Keuangan</span>
          </div>
          <div className="flex items-center gap-2">
            <Sparkles className="h-3.5 w-3.5 text-yellow-400 fill-yellow-400" />
            <span>Kalkulator HPP</span>
          </div>
          <div className="flex items-center gap-2">
            <Sparkles className="h-3.5 w-3.5 text-yellow-400 fill-yellow-400" />
            <span>Analitik Real-time</span>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 relative z-20">
          <Link href="/dashboard">
            <Button
              size="lg"
              className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 text-white rounded-md px-8 text-base shadow-sm"
            >
              Mulai Sekarang
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
          <Button
            size="lg"
            variant="outline"
            className="w-full sm:w-auto bg-white hover:bg-slate-50 text-slate-800 rounded-md px-8 text-base border-slate-200 shadow-xs"
          >
            <Play className="mr-2 h-4 w-4 text-blue-600 fill-blue-600" />
            Lihat Demo
          </Button>
        </div>

        <div className="mt-8 md:mt-12 -mb-24 md:-mb-32 relative mx-auto w-full max-w-5xl">
          <div className="absolute inset-0 top-[10%] bottom-[10%] bg-blue-400/10 blur-[120px] rounded-full" />

          <div className="relative z-10">
            <Image
              src="/assets/landing/dashboard.png"
              alt="ProdukIta Preview"
              width={1600}
              height={1000}
              className="w-full h-auto drop-shadow-2xl object-contain transform scale-[1.4] -translate-y-1 -translate-x-8 md:scale-[1.7] md:-translate-y-1.5 md:-translate-x-12 lg:scale-[2.0] lg:-translate-y-2 lg:-translate-x-18"
              priority
              unoptimized={true}
            />
          </div>
        </div>
      </div>
    </section>
  );
};
