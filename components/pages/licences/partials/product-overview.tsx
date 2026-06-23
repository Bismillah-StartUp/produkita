import { useState } from "react";
import Image from "next/image";
import { MapPin, AlertCircle } from "lucide-react";

interface ProductOverviewProps {
  productName: string;
  productImage?: string | null;
  images?: string[];
  price?: number | null;
  volume?: string | null;
  enterpriseName: string;
  enterpriseDistrict?: string | null;
  enterpriseProvince?: string | null;
  certifications: {
    bpomNumber?: string;
    pirtNumber?: string;
    halalNumber?: string;
    coaNumber?: string;
    isLicensed?: boolean;
  };
  description?: string;
  verificationDate?: string;
}

export default function ProductOverview({
  productName,
  productImage,
  images,
  price,
  volume,
  enterpriseName,
  enterpriseDistrict,
  enterpriseProvince,
  certifications,
  description,
  verificationDate,
}: ProductOverviewProps) {
  const [activeIndex, setActiveIndex] = useState(0);

  const locationLabel =
    enterpriseDistrict && enterpriseProvince
      ? `${enterpriseDistrict}, ${enterpriseProvince}`
      : enterpriseName;

  // Use the main image as the first item if images array is empty or not provided
  const galleryImages =
    images && images.length > 0
      ? images
      : productImage
        ? [productImage, productImage, productImage, productImage, productImage]
        : [];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-10 items-stretch">
      {/* Left Column: Image Gallery (Height stretches to match Right Column) */}
      <div className="flex flex-col h-full w-full justify-between">
        {/* Main Product Image */}
        <div className="relative w-full aspect-4/3 lg:aspect-auto lg:flex-1 rounded-2xl overflow-hidden bg-[#f8f6f0] mb-3 lg:mb-4">
          {galleryImages[activeIndex] ? (
            <Image
              src={galleryImages[activeIndex]}
              alt={productName}
              fill
              className="object-contain p-4 mix-blend-multiply"
              priority
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <span className="text-slate-500 text-sm">Tidak ada gambar</span>
            </div>
          )}
        </div>

        {/* Thumbnail Previews */}
        {galleryImages.length > 0 && (
          <div className="grid grid-cols-5 gap-2 sm:gap-3 lg:gap-4 mt-auto">
            {galleryImages.slice(0, 5).map((img, idx) => (
              <div
                key={idx}
                onClick={() => setActiveIndex(idx)}
                className={`relative aspect-4/3 rounded-xl overflow-hidden bg-[#f8f6f0] cursor-pointer transition-all duration-200 ${idx === activeIndex ? "ring-2 ring-blue-600 ring-offset-2 scale-95" : "opacity-60 hover:opacity-100 hover:scale-95"}`}
              >
                <Image
                  src={img}
                  alt={`${productName} thumbnail ${idx + 1}`}
                  fill
                  className="object-cover mix-blend-multiply"
                />
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Right Column: Product Details (Determines the total height) */}
      <div className="flex flex-col h-full w-full">
        {/* Location */}
        <div className="flex items-center gap-1.5 text-blue-600 mb-2 lg:mb-3">
          <MapPin size={16} className="lg:w-4.5 lg:h-4.5" />
          <span className="text-[13px] lg:text-base font-semibold">
            {locationLabel}
          </span>
        </div>

        {/* Title */}
        <h1 className="text-2xl sm:text-3xl lg:text-5xl font-bold text-gray-900 mb-2 tracking-tight">
          {productName}
        </h1>

        {/* Price & Volume */}
        <div className="flex items-end gap-2 lg:gap-3 mb-6 lg:mb-8">
          <span className="text-xl sm:text-2xl lg:text-4xl font-extrabold text-gray-900">
            {price ? `Rp ${price.toLocaleString("id-ID")}` : "Rp -"}
          </span>
          {volume && (
            <span className="text-sm lg:text-lg text-slate-400 mb-0.5 lg:mb-1 font-medium">
              • {volume}
            </span>
          )}
        </div>

        {/* Certifications Section */}
        <h3 className="text-[11px] lg:text-sm font-bold tracking-[0.2em] text-slate-400 uppercase mb-3">
          Sertifikasi Produk
        </h3>
        <div className="border border-slate-200 rounded-xl lg:rounded-2xl overflow-hidden mb-6 lg:mb-8 shadow-sm">
          <div className="grid grid-cols-2 divide-x divide-y divide-slate-200">
            {/* BPOM */}
            <div className="flex flex-col items-center justify-center p-3 lg:p-5">
              <span className="text-xs lg:text-base font-bold text-blue-600 mb-1">
                BPOM
              </span>
              <span className="text-[10px] lg:text-sm text-slate-400">
                {certifications.bpomNumber || "-"}
              </span>
            </div>
            {/* PIRT */}
            <div className="flex flex-col items-center justify-center p-3 lg:p-5">
              <span className="text-xs lg:text-base font-bold text-fuchsia-600 mb-1">
                PIRT
              </span>
              <span className="text-[10px] lg:text-sm text-slate-400">
                {certifications.pirtNumber || "-"}
              </span>
            </div>
            {/* HALAL */}
            <div className="flex flex-col items-center justify-center p-3 lg:p-5 border-t border-slate-200">
              <span className="text-xs lg:text-base font-bold text-emerald-500 mb-1">
                HALAL
              </span>
              <span className="text-[10px] lg:text-sm text-slate-400">
                {certifications.halalNumber || "-"}
              </span>
            </div>
            {/* COA */}
            <div className="flex flex-col items-center justify-center p-3 lg:p-5 border-t border-slate-200">
              <span className="text-xs lg:text-base font-bold text-amber-500 mb-1">
                COA
              </span>
              <span className="text-[10px] lg:text-sm text-slate-400">
                {certifications.coaNumber || "-"}
              </span>
            </div>
          </div>
        </div>

        {/* Description Section */}
        <h3 className="text-[11px] lg:text-sm font-bold tracking-[0.2em] text-slate-400 uppercase mb-3">
          Deskripsi Produk
        </h3>
        <p className="text-xs lg:text-lg text-slate-500 leading-relaxed mb-6 lg:mb-8">
          {description || "-"}
        </p>

        {/* Verification Status Box */}
        <div className="mt-auto bg-[#f0f7ff] border border-blue-100 rounded-xl lg:rounded-2xl p-3 lg:p-5 flex items-start gap-3 lg:gap-4 shadow-sm">
          <div className="text-blue-600 shrink-0 mt-0.5">
            <AlertCircle size={18} className="lg:w-7 lg:h-7" />
          </div>
          <div className="flex flex-col">
            <span className="text-xs lg:text-base font-bold text-blue-700">
              Semua Sertifikasi terverifikasi dan uptodate
            </span>
            {verificationDate && (
              <span className="text-[10px] lg:text-sm text-blue-500/80 mt-0.5 lg:mt-1 font-medium">
                Terakhir diperbarui: {verificationDate}
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
