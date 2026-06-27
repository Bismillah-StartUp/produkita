"use client";

import { format } from "date-fns";
import { id as idLocale } from "date-fns/locale";
import {
  CheckCircle2,
  Home,
  FileText,
  FlaskConical,
  CheckCircle,
  ShieldCheck,
} from "lucide-react";
import SetCertificationsVisibility from "./set-certifications-visibility";

export interface CertificationData {
  type: "BPOM" | "HALAL" | "PIRT" | "COA";
  number: string;
  issueDate?: Date;
  validUntil?: Date;
  authority?: string;
  status?: string;
  description?: string;
}

interface CertificationsSectionProps {
  productName?: string;
  certifications: CertificationData[];
}

export default function CertificationsSection({
  productName = "CIMORY FRESH MILK",
  certifications,
}: CertificationsSectionProps) {
  if (!certifications || certifications.length === 0) {
    return <SetCertificationsVisibility enabled={false} />;
  }

  const activeCount = certifications.filter(
    (c) => c.status !== "Inactive",
  ).length;

  const getCertDetails = (type: string) => {
    switch (type) {
      case "BPOM":
        return {
          icon: ShieldCheck,
          colorClass: "border-blue-200",
          headerBgClass: "bg-blue-50/60",
          title: "BPOM (Badan Pengawas Obat dan Makanan)",
          subtitle: "Badan Pengawas Obat & Makanan RI",
          defaultDesc:
            "Produk telah terdaftar dan mendapatkan izin edar resmi dari BPOM RI sebagai produk pangan olahan yang aman untuk dikonsumsi.",
        };
      case "PIRT":
        return {
          icon: Home,
          colorClass: "border-purple-200",
          headerBgClass: "bg-purple-50/60",
          title: "PIRT (Pangan Industri Rumah Tangga)",
          subtitle: "Dinas Kesehatan Kab. Pasuruan",
          defaultDesc:
            "Produk telah terdaftar dan mendapatkan izin edar resmi dari BPOM RI sebagai Sertifikasi dari Dinas Kesehatan yang menjamin bahwa fasilitas produksi Cimory memenuhi persyaratan sanitasi dan higienitas pangan.",
        };
      case "HALAL":
        return {
          icon: CheckCircle2,
          colorClass: "border-green-200",
          headerBgClass: "bg-green-50/60",
          title: "Halal MUI",
          subtitle: "Majelis Ulama Indonesia (MUI)",
          defaultDesc:
            "Seluruh proses produksi Cimory Fresh Milk telah memenuhi syarat halal sesuai standar MUI, mulai dari sumber bahan baku hingga proses pengemasan.",
        };
      case "COA":
        return {
          icon: FlaskConical,
          colorClass: "border-orange-200",
          headerBgClass: "bg-orange-50/60",
          title: "Certificate of Analysis",
          subtitle: "Lab. Balai Besar Industri Agro",
          defaultDesc:
            "Hasil uji analisa laboratorium independen yang mengkonfirmasi kandungan gizi, keamanan mikrobiologi, dan mutu produk sesuai standar SNI 3141.1:2011.",
        };
      default:
        return {
          icon: FileText,
          colorClass: "border-slate-200",
          headerBgClass: "bg-slate-50/60",
          title: "Certification",
          subtitle: "Authority",
          defaultDesc: "Product certification details.",
        };
    }
  };

  const getIconColor = (type: string) => {
    switch (type) {
      case "BPOM":
        return "text-blue-600";
      case "PIRT":
        return "text-purple-500";
      case "HALAL":
        return "text-green-600";
      case "COA":
        return "text-orange-500";
      default:
        return "text-slate-600";
    }
  };

  return (
    <div className="flex flex-col w-full -mt-2 lg:mt-0">
      <SetCertificationsVisibility enabled={true} />

      {/* Header Texts */}
      <div className="mb-4 lg:mb-8">
        <h4 className="text-blue-600 font-bold text-[10px] lg:text-sm tracking-widest uppercase mb-0.5 lg:mb-2 leading-tight">
          {productName}
        </h4>
        <h2 className="text-[22px] lg:text-3xl font-bold text-slate-900 mb-1 lg:mb-2 leading-tight">
          Sertifikat & Izin
        </h2>
        <p className="text-[12px] lg:text-base text-slate-500">
          Dokumen legalitas dan sertifikasi produk resmi
        </p>
      </div>

      {/* Stats Row */}
      <div className="flex w-full mb-6 lg:mb-10 border-y border-slate-200 py-3 lg:py-8">
        <div className="flex-1 flex flex-col items-center justify-center border-r border-slate-200">
          <span className="text-[22px] lg:text-3xl font-bold text-blue-600 mb-0 lg:mb-1">
            {certifications.length}
          </span>
          <span className="text-[11px] lg:text-sm text-slate-400">
            Total Sertifikat
          </span>
        </div>
        <div className="flex-1 flex flex-col items-center justify-center">
          <span className="text-[22px] lg:text-3xl font-bold text-green-500 mb-0 lg:mb-1">
            {activeCount}
          </span>
          <span className="text-[11px] lg:text-sm text-slate-400">Aktif</span>
        </div>
      </div>

      {/* Cards */}
      <div className="space-y-4 lg:space-y-8">
        {certifications.map((cert, index) => {
          const details = getCertDetails(cert.type);
          const IconComponent = details.icon;

          return (
            <div
              key={index}
              className={`border rounded-xl bg-white overflow-hidden ${details.colorClass}`}
            >
              {/* Header inside card */}
              <div
                className={`flex justify-between items-start p-3 sm:p-5 lg:p-6 ${details.headerBgClass}`}
              >
                <div className="flex items-start lg:items-center gap-2.5 sm:gap-4">
                  {/* Icon */}
                  <div
                    className={`p-1.5 lg:p-3 rounded-lg bg-white border ${details.colorClass}`}
                  >
                    <IconComponent
                      className={`w-4 h-4 sm:w-6 sm:h-6 lg:w-7 lg:h-7 ${getIconColor(cert.type)}`}
                    />
                  </div>
                  <div className="mt-0.5 lg:mt-0">
                    <h3 className="text-[13px] lg:text-lg font-bold text-slate-900 leading-snug truncate max-w-40 sm:max-w-xs lg:max-w-none">
                      {details.title}
                    </h3>
                    <p className="text-[10px] lg:text-sm text-slate-500 mt-0">
                      {cert.authority || details.subtitle}
                    </p>
                  </div>
                </div>
                {/* Badge */}
                <div className="flex items-center gap-1 px-2 py-0.5 lg:px-3 lg:py-1 rounded-full bg-green-50 border border-green-200 text-green-600 mt-0">
                  <CheckCircle className="w-3 h-3 lg:w-4 lg:h-4" />
                  <span className="text-[9px] lg:text-xs font-semibold">
                    Aktif
                  </span>
                </div>
              </div>

              {/* Body */}
              <div className="p-3 sm:p-5 lg:p-6 border-t border-slate-100">
                <p className="text-[11px] lg:text-sm text-slate-500 leading-relaxed mb-3 lg:mb-6">
                  {cert.description || details.defaultDesc}
                </p>

                <div className="grid grid-cols-2 gap-2 lg:gap-4">
                  <div>
                    <p className="text-[9px] lg:text-xs text-slate-400 font-semibold uppercase tracking-wider mb-0.5 lg:mb-1">
                      NO. SERTIFIKAT
                    </p>
                    <p className="text-[11px] lg:text-base font-bold text-slate-900 wrap-break-word">
                      {cert.number}
                    </p>
                  </div>
                  <div>
                    <p className="text-[9px] lg:text-xs text-slate-400 font-semibold uppercase tracking-wider mb-0.5 lg:mb-1">
                      BERLAKU HINGGA
                    </p>
                    <p className="text-[11px] lg:text-base font-bold text-slate-900">
                      {cert.validUntil
                        ? format(new Date(cert.validUntil), "d MMMM yyyy", {
                            locale: idLocale,
                          })
                        : "-"}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
