import { InfiniteCarousel } from "@/components/ui/infinite-carousel";
import { Sparkles } from "lucide-react";
import Image from "next/image";

export const Partners = () => {
  const partnerData = [
    { name: "Cimory", src: "/assets/landing/icon-cimory.png" },
    { name: "Prekpus", src: "/assets/landing/icon-prekpus.png" },
    { name: "CV Herman", src: "/assets/landing/cv-herman.png" },
    { name: "Cimory", src: "/assets/landing/icon-cimory.png" },
    { name: "Vini Muda", src: "/assets/landing/vini-muda.png" },
    { name: "Cimory", src: "/assets/landing/icon-cimory.png" },
    { name: "Prekpus", src: "/assets/landing/icon-prekpus.png" },
    { name: "CV Herman", src: "/assets/landing/cv-herman.png" },
    { name: "Prekpus", src: "/assets/landing/icon-prekpus.png" },
    { name: "Vini Muda", src: "/assets/landing/vini-muda.png" },
  ];

  const logoElements = partnerData.map((logo, index) => (
    <div
      key={`${logo.name}-${index}`}
      className="flex items-center justify-center h-20 w-40 md:h-24 md:w-48 px-4"
    >
      <Image
        src={logo.src}
        alt={logo.name}
        width={160}
        height={80}
        className="max-h-full max-w-full object-contain"
      />
    </div>
  ));

  const carouselItems = logoElements;

  return (
    <section className="bg-white py-16 md:py-24 border-b border-slate-50">
      <div className="mx-auto w-[90%] max-w-400 px-6 lg:px-8">
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
