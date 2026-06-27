"use client";

import { Navigation, MapPin } from "lucide-react";
import Image from "next/image";

interface CompanyInfoProps {
  name: string;
  address?: string;
  phone?: string;
  email?: string;
  description?: string;
  bannerImage?: string;
  foundedYear?: string;
  totalProducts?: string;
  trademark?: string;
  npwp?: string;
  businessType?: string;
  website?: string;
  mapUrl?: string;
}

export default function CompanyInfo({
  name,
  address,
  phone,
  email,
  description,
  bannerImage,
  foundedYear,
  totalProducts,
  trademark,
  npwp,
  businessType,
  website,
  mapUrl,
}: CompanyInfoProps) {
  // Fallbacks to match the reference image exactly if data is not provided
  return (
    <div className="flex flex-col w-full -mt-2 lg:mt-0">
      {/* Header Texts */}
      <div className="mb-4 lg:mb-6">
        <h4 className="text-blue-600 font-bold text-[10px] lg:text-sm tracking-widest uppercase mb-0.5 lg:mb-2 leading-tight">
          TENTANG PRODUSEN
        </h4>
        <h2 className="text-[22px] lg:text-[28px] font-bold text-slate-900 mb-0.5 lg:mb-1 leading-tight">
          {name}
        </h2>
        <p className="text-[12px] lg:text-[15px] text-slate-500">
          {trademark} • {businessType}
        </p>
      </div>

      {/* Banner Image */}
      <div className="w-full aspect-21/9 sm:aspect-3/1 lg:aspect-5/1 relative rounded-xl lg:rounded-2xl overflow-hidden mb-6 lg:mb-10 bg-slate-100">
        {bannerImage && (
          <Image src={bannerImage} alt={name} fill className="object-cover" />
        )}
      </div>

      {/* TENTANG CIMORY */}
      <div className="mb-6 lg:mb-8">
        <p className="mb-2 lg:mb-3 text-[10px] lg:text-xs font-bold text-slate-800 uppercase tracking-widest">
          TENTANG {trademark?.toUpperCase() || ""}
        </p>
        <p className="text-slate-500 text-[11px] lg:text-[14px] leading-relaxed mb-4 lg:mb-6 text-justify lg:text-left">
          {description}
        </p>

        <div className="flex w-full border border-slate-100 rounded-xl lg:rounded-2xl py-3 lg:py-6 bg-white shadow-sm mb-2">
          <div className="flex-1 flex flex-col items-center justify-center border-r border-slate-100">
            <span className="text-lg lg:text-2xl font-bold text-blue-600">
              {foundedYear}
            </span>
            <span className="text-[10px] lg:text-xs text-slate-400 mt-0.5">
              Berdiri
            </span>
          </div>
          <div className="flex-1 flex flex-col items-center justify-center">
            <span className="text-lg lg:text-2xl font-bold text-blue-600">
              {totalProducts}
            </span>
            <span className="text-[10px] lg:text-xs text-slate-400 mt-0.5">
              Produk
            </span>
          </div>
        </div>
      </div>

      {/* PROFIL PERUSAHAAN */}
      <div className="rounded-xl lg:rounded-2xl border border-slate-200 overflow-hidden mb-6 lg:mb-8">
        <div className="bg-slate-50 border-b border-slate-200 px-4 py-3 lg:px-6 lg:py-4">
          <h3 className="text-[11px] lg:text-xs font-bold text-slate-800 uppercase">
            PROFIL PERUSAHAAN
          </h3>
        </div>
        <div className="flex flex-col px-4 lg:px-6">
          <TableRow label="Nama Resmi" value={name} />
          <TableRow label="Merek Dagang" value={trademark} />
          <TableRow label="NPWP" value={npwp} />
          <TableRow label="Bidang Usaha" value={businessType} isLast />
        </div>
      </div>

      {/* KONTAK */}
      <div className="rounded-xl lg:rounded-2xl border border-slate-200 overflow-hidden mb-6 lg:mb-8">
        <div className="bg-slate-50 border-b border-slate-200 px-4 py-3 lg:px-6 lg:py-4">
          <h3 className="text-[11px] lg:text-xs font-bold text-slate-800 uppercase">
            KONTAK
          </h3>
        </div>
        <div className="flex flex-col px-4 lg:px-6">
          <TableRow
            label="Telepon"
            value={phone}
            isLink
            href={phone ? `tel:${phone.replace(/\\s/g, "")}` : undefined}
          />
          <TableRow
            label="Email"
            value={email}
            isLink
            href={email ? `mailto:${email}` : undefined}
          />
          <TableRow
            label="Website"
            value={website}
            isLink
            href={website ? `https://${website}` : undefined}
            isLast
          />
        </div>
      </div>

      {/* LOKASI */}
      <div className="rounded-xl lg:rounded-2xl border border-slate-200 overflow-hidden">
        <div className="bg-slate-50 border-b border-slate-200 px-4 py-3 lg:px-6 lg:py-4">
          <h3 className="text-[11px] lg:text-xs font-bold text-slate-800 uppercase">
            LOKASI
          </h3>
        </div>
        <div className="flex flex-col px-4 lg:px-6 pb-4 lg:px-6">
          <TableRow label="Alamat" value={address} />

          {/* Map Box */}
          <div className="w-full aspect-2/1 sm:aspect-21/9 lg:aspect-3/1 bg-[#eef3f9] rounded-xl lg:rounded-2xl border border-[#dce6f2] relative overflow-hidden flex items-center justify-center mt-3 mb-4 lg:mb-5">
            {/* Map Grid Pattern Placeholder */}
            <div className="absolute inset-0 grid grid-cols-4 grid-rows-3 gap-1.5 p-1.5 opacity-[0.85]">
              {Array.from({ length: 12 }).map((_, i) => (
                <div key={i} className="bg-[#e4ebf5] rounded-md"></div>
              ))}
            </div>

            <div className="relative z-10 flex flex-col items-center justify-center">
              <div className="w-10 h-10 lg:w-16 lg:h-16 bg-[#185cf1] rounded-full flex items-center justify-center text-white shadow-[0_8px_16px_rgba(24,92,241,0.3)] relative">
                <MapPin className="w-5 h-5 lg:w-8 lg:h-8" strokeWidth={2.5} />
                {/* Pin tail */}
                <div className="absolute -bottom-1 w-3 h-3 lg:w-4 lg:h-4 bg-[#185cf1] rotate-45 z-[-1] rounded-sm"></div>
              </div>
              <div className="w-5 h-1.5 lg:w-6 lg:h-2 bg-blue-900/10 rounded-full mt-2 lg:mt-3 blur-[1px]"></div>
            </div>
          </div>

          <a
            href={mapUrl || "#"}
            target="_blank"
            rel="noreferrer"
            className="w-full flex items-center justify-center gap-2 bg-[#185cf1] hover:bg-blue-700 transition-colors text-white py-3 lg:py-4 rounded-xl font-semibold text-xs lg:text-base"
          >
            <Navigation className="w-4 h-4 lg:w-5 lg:h-5 fill-current" />
            Buka Maps
          </a>
        </div>
      </div>
    </div>
  );
}

function TableRow({
  label,
  value,
  isLink,
  href,
  isLast,
}: {
  label: string;
  value?: string;
  isLink?: boolean;
  href?: string;
  isLast?: boolean;
}) {
  if (!value) return null;
  return (
    <div
      className={`flex py-3 lg:py-4 ${!isLast ? "border-b border-slate-200" : ""}`}
    >
      <div className="w-27.5 sm:w-37.5 lg:w-60 shrink-0 pr-2 lg:pr-4 text-slate-500 text-[11px] lg:text-[13px] font-medium">
        {label}
      </div>
      <div className="flex-1 text-[11px] lg:text-[14px] font-medium text-slate-900 wrap-break-word">
        {isLink ? (
          <a
            href={href}
            className="text-[#185cf1] hover:underline font-semibold"
          >
            {value}
          </a>
        ) : (
          value
        )}
      </div>
    </div>
  );
}
