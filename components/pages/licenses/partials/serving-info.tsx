"use client";

import { useState } from "react";
import { ThermometerSnowflake, Droplets, PlayCircle } from "lucide-react";
import Image from "next/image";

interface ServingInfoProps {
  productName: string;
  productImage?: string | null;
  images?: string[];
}

export default function ServingInfo({
  productName,
  productImage,
  images = [],
}: ServingInfoProps) {
  const [activeIndex, setActiveIndex] = useState(0);

  // Determine gallery images (max 5)
  // If images array is provided, use it. Otherwise, fallback to single productImage if it exists.
  const galleryImages =
    images && images.length > 0
      ? images.slice(0, 5)
      : productImage
        ? [productImage]
        : [];

  return (
    <div className="flex flex-col w-full -mt-2 lg:mt-0">
      {/* Header Texts */}
      <div className="pb-4 lg:pb-6 mb-5 lg:mb-8 border-b border-slate-100">
        <h4 className="text-blue-600 font-bold text-[10px] lg:text-sm tracking-widest uppercase mb-0.5 lg:mb-2 leading-tight">
          {productName}
        </h4>
        <h2 className="text-[22px] lg:text-3xl font-bold text-slate-900 mb-1 lg:mb-2 leading-tight">
          Saran Penyajian
        </h2>
        <p className="text-[12px] lg:text-base text-slate-500">
          Cara terbaik menikmati {productName}
        </p>
      </div>

      {/* Link Video Tutorial */}
      <div className="mb-6 lg:mb-8">
        <p className="mb-2 lg:mb-3 text-[10px] lg:text-xs font-bold text-slate-800 uppercase">
          VIDEO TUTORIAL
        </p>
        <div className="flex items-center justify-between overflow-hidden rounded-xl border border-slate-200 bg-white p-1.5 pl-3 lg:p-2 lg:pl-4 shadow-sm">
          <div className="flex items-center gap-2 lg:gap-3 overflow-hidden">
            <PlayCircle className="h-5 w-5 lg:h-6 lg:w-6 shrink-0 text-slate-300 fill-slate-200" />
            <span className="truncate text-[11px] lg:text-sm font-medium text-blue-600">
              youtube.com/watch?v=cimory-fresh-milk
            </span>
          </div>
          <button className="shrink-0 rounded-lg bg-blue-600 px-3 py-2 lg:px-4 lg:py-2 text-[10px] lg:text-xs font-bold text-white hover:bg-blue-700 transition-colors">
            Tonton &rarr;
          </button>
        </div>
      </div>

      {/* Foto Penyajian */}
      <div className="mb-6 lg:mb-8">
        <p className="mb-2 lg:mb-3 text-[10px] lg:text-xs font-bold text-slate-800 uppercase">
          FOTO PENYAJIAN
        </p>

        {/* Main Image */}
        <div className="relative w-full aspect-4/3 sm:aspect-video lg:aspect-2/1 rounded-xl lg:rounded-2xl overflow-hidden bg-slate-50 mb-3 lg:mb-4">
          {galleryImages[activeIndex] ? (
            <Image
              src={galleryImages[activeIndex]}
              alt={`Cara Penyajian ${productName}`}
              fill
              className="object-contain"
            />
          ) : (
            <div className="w-full h-full flex flex-col items-center justify-center p-6 text-center border border-slate-200 rounded-xl">
              <span className="text-slate-400 font-medium text-sm lg:text-base">
                Infografis Tata Cara Penyajian
              </span>
            </div>
          )}
        </div>

        {/* Thumbnails (centered) */}
        {galleryImages.length > 1 && (
          <div className="flex justify-center items-center gap-2 sm:gap-3 lg:gap-4 mt-auto">
            {galleryImages.map((img, idx) => (
              <div
                key={idx}
                onClick={() => setActiveIndex(idx)}
                className={`relative w-16 h-12 sm:w-20 sm:h-16 lg:w-24 lg:h-16 rounded-lg lg:rounded-xl overflow-hidden bg-slate-50 cursor-pointer transition-all duration-200 border ${idx === activeIndex ? "border-blue-600 ring-1 ring-blue-600 ring-offset-1 scale-95" : "border-slate-200 opacity-60 hover:opacity-100 hover:scale-95"}`}
              >
                <Image
                  src={img}
                  alt={`Thumbnail ${idx + 1}`}
                  fill
                  className="object-cover"
                />
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Langkah Penyajian */}
      <div className="mb-6 lg:mb-8">
        <p className="mb-3 lg:mb-4 text-[10px] lg:text-xs font-bold text-slate-800 uppercase">
          LANGKAH PENYAJIAN
        </p>
        <div className="space-y-4 lg:space-y-5">
          <div className="flex items-start gap-3 lg:gap-4 pb-4 border-b border-slate-100">
            <div className="flex h-6 w-6 lg:h-7 lg:w-7 shrink-0 items-center justify-center rounded-full border-[1.5px] border-blue-600 text-[10px] lg:text-xs font-bold text-blue-600 bg-white mt-0.5">
              01
            </div>
            <div>
              <h4 className="text-[12px] lg:text-sm font-bold text-slate-900 leading-tight">
                Kocok Sebelum Diminum
              </h4>
              <p className="mt-1 text-[11px] lg:text-[13px] leading-relaxed text-slate-400">
                Kocok kemasan perlahan sebelum dibuka untuk memastikan kandungan
                susu tercampur merata.
              </p>
            </div>
          </div>
          <div className="flex items-start gap-3 lg:gap-4">
            <div className="flex h-6 w-6 lg:h-7 lg:w-7 shrink-0 items-center justify-center rounded-full border-[1.5px] border-blue-600 text-[10px] lg:text-xs font-bold text-blue-600 bg-white mt-0.5">
              02
            </div>
            <div>
              <h4 className="text-[12px] lg:text-sm font-bold text-slate-900 leading-tight">
                Sajikan Langsung
              </h4>
              <p className="mt-1 text-[11px] lg:text-[13px] leading-relaxed text-slate-400">
                {productName} siap dikonsumsi langsung dari kemasan. Tidak perlu
                dimasak atau dipanaskan.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Tips Penyimpanan */}
      <div>
        <p className="mb-2 lg:mb-3 text-[10px] lg:text-xs font-bold text-slate-800 uppercase">
          TIPS PENYIMPANAN
        </p>
        <div className="rounded-xl border border-blue-200 bg-[#f4f8ff] p-3 sm:p-4 lg:p-5 space-y-3 lg:space-y-4 shadow-sm">
          <div className="flex items-start gap-2.5 lg:gap-3">
            <div className="flex h-6 w-6 lg:h-7 lg:w-7 shrink-0 items-center justify-center rounded-full bg-blue-100/70 text-blue-600 mt-0.5">
              <ThermometerSnowflake className="h-3 w-3 lg:h-4 lg:w-4" />
            </div>
            <span className="text-[11px] lg:text-sm font-medium text-blue-600 leading-relaxed pt-0.5">
              Simpan pada suhu 4–10°C, jauhkan dari sinar matahari langsung.
            </span>
          </div>
          <div className="flex items-start gap-2.5 lg:gap-3">
            <div className="flex h-6 w-6 lg:h-7 lg:w-7 shrink-0 items-center justify-center rounded-full bg-blue-100/70 text-blue-600 mt-0.5">
              <Droplets className="h-3 w-3 lg:h-4 lg:w-4" />
            </div>
            <span className="text-[11px] lg:text-sm font-medium text-blue-600 leading-relaxed pt-0.5">
              Jangan bekukan produk — dapat mengubah tekstur & rasa alami susu.
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
