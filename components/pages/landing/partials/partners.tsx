import { InfiniteCarousel } from "@/components/ui/infinite-carousel";
import { Sparkles, Bird, TentTree, Heart, Milk } from "lucide-react";

export const Partners = () => {
  const dummyLogos = [
    <div
      key="cimory"
      className="flex items-center justify-center h-16 w-32 grayscale hover:grayscale-0 transition-all opacity-60 hover:opacity-100"
    >
      <div className="relative flex flex-col items-center">
        <span className="text-2xl font-serif italic font-bold text-red-600 tracking-tighter">
          Cimory
        </span>
      </div>
    </div>,
    <div
      key="prekpus"
      className="flex items-center justify-center h-16 w-32 grayscale hover:grayscale-0 transition-all opacity-60 hover:opacity-100"
    >
      <div className="flex flex-col items-center gap-1">
        <Bird className="h-7 w-7 text-orange-600 fill-orange-600" />
        <span className="text-[10px] font-bold text-red-600 tracking-widest uppercase">
          Prekpus
        </span>
      </div>
    </div>,
    <div
      key="cv"
      className="flex items-center justify-center h-16 w-32 grayscale hover:grayscale-0 transition-all opacity-60 hover:opacity-100"
    >
      <div className="flex flex-col items-center gap-1">
        <div className="flex">
          <TentTree className="h-6 w-6 text-blue-800 fill-blue-800" />
          <TentTree className="h-6 w-6 text-red-600 fill-red-600 -ml-2" />
        </div>
        <span className="text-[8px] font-bold text-slate-800 tracking-wider">
          CV HERMAWAN PUTRA JAYA
        </span>
      </div>
    </div>,
    <div
      key="vini"
      className="flex items-center justify-center h-16 w-32 grayscale hover:grayscale-0 transition-all opacity-60 hover:opacity-100"
    >
      <div className="flex flex-col items-center gap-1">
        <Heart className="h-7 w-7 text-pink-500 fill-pink-100" />
        <div className="flex flex-col items-center leading-none">
          <span className="text-[10px] font-bold text-slate-800">
            VINI MUDA
          </span>
          <span className="text-[6px] tracking-widest text-slate-500 mt-0.5">
            BERSINAR
          </span>
        </div>
      </div>
    </div>,
    <div
      key="susu"
      className="flex items-center justify-center h-16 w-32 grayscale hover:grayscale-0 transition-all opacity-60 hover:opacity-100"
    >
      <div className="flex flex-col items-center gap-1">
        <Milk className="h-7 w-7 text-blue-500" />
        <span className="text-[10px] font-bold text-blue-900 tracking-wider uppercase">
          Susu Murni
        </span>
      </div>
    </div>,
  ];

  const carouselItems = [...dummyLogos, ...dummyLogos];

  return (
    <section className="bg-white py-16 md:py-24 border-b border-slate-50">
      <div className="mx-auto w-[90%] max-w-400 px-6">
        <div className="flex flex-col items-center text-center mb-12">
          <div className="inline-flex items-center justify-center gap-1.5 rounded-full bg-blue-50/80 px-3 py-1 text-[11px] font-bold tracking-widest text-blue-600 mb-6 uppercase border border-blue-100/50">
            <Sparkles className="h-3 w-3 fill-blue-600" />
            UMKM Indonesia
          </div>

          <h2 className="text-3xl font-bold tracking-tight text-slate-900 md:text-4xl mb-4">
            Dipercaya Oleh <span className="text-blue-600">UMKM Indonesia</span>
          </h2>

          <p className="text-slate-500 max-w-2xl text-base">
            Ribuan UMKM telah mempercayai Produkita untuk mengelola sertifikasi
            produk mereka.
          </p>
        </div>

        <div className="mt-10 overflow-hidden relative w-full">
          <div className="pointer-events-none absolute inset-y-0 left-0 w-24 bg-linear-to-r from-white to-transparent z-10" />
          <div className="pointer-events-none absolute inset-y-0 right-0 w-24 bg-linear-to-l from-white to-transparent z-10" />

          <InfiniteCarousel speed={40}>{carouselItems}</InfiniteCarousel>
        </div>
      </div>
    </section>
  );
};
