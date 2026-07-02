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

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
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

        <style>{`
          @keyframes float {
            0% { transform: translateY(0px); }
            50% { transform: translateY(-20px); }
            100% { transform: translateY(0px); }
          }
          .animate-float {
            animation: float 6s ease-in-out infinite;
          }
          .animate-float-delayed {
            animation: float 8s ease-in-out infinite;
            animation-delay: 3s;
          }
        `}</style>

        <div className="mt-16 md:mt-24 relative mx-auto w-full max-w-5xl">
          <div className="absolute inset-0 -top-10 bg-blue-400/10 blur-[100px] rounded-full" />

          <div className="relative">
            <div className="absolute -left-6 md:-left-43 top-[20%] md:top-[28%] z-20 w-40 md:w-72 animate-float hidden sm:block">
              <Image
                src="/assets/landing/qr.png"
                alt="QR Code"
                width={300}
                height={300}
                className="w-full h-auto drop-shadow-2xl"
              />
            </div>

            <div className="absolute left-8 md:left-[15%] -bottom-13 md:-bottom-5 z-30 w-72 md:w-116 animate-float-delayed hidden sm:block">
              <Image
                src="/assets/landing/produk.png"
                alt="Produk Unggulan"
                width={700}
                height={400}
                className="w-full h-auto drop-shadow-2xl"
              />
            </div>

            <div
              className="absolute -right-6 md:-right-13 top-[35%] md:top-[24%] z-20 w-52 md:w-89 animate-float hidden sm:block"
              style={{ animationDelay: "1.5s" }}
            >
              <Image
                src="/assets/landing/inshigt.png"
                alt="Insights"
                width={400}
                height={300}
                className="w-full h-auto drop-shadow-2xl"
              />
            </div>

            <div className="relative rounded-xl md:rounded-2xl border border-slate-200/60 bg-white shadow-2xl overflow-hidden ring-1 ring-slate-900/5 z-10">
              <div className="flex items-center gap-1.5 border-b border-slate-100 bg-slate-50/50 px-4 py-3">
                <div className="h-3 w-3 rounded-full bg-red-400 shadow-sm" />
                <div className="h-3 w-3 rounded-full bg-yellow-400 shadow-sm" />
                <div className="h-3 w-3 rounded-full bg-green-400 shadow-sm" />
                <div className="mx-auto flex h-6 w-full max-w-xs items-center justify-center rounded-md bg-white border border-slate-200/60 text-[10px] text-slate-400 shadow-xs">
                  app.produkita.id/dashboard
                </div>
                <div className="w-10" />
              </div>

              <div className="relative w-full bg-slate-50">
                <Image
                  src="/assets/landing/Dashboard.png"
                  alt="Dashboard Interface"
                  width={1200}
                  height={800}
                  className="w-full h-auto object-cover object-top"
                  priority
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
