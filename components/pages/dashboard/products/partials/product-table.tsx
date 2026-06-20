"use client";

import { useState } from "react";
import { Eye, Pencil, Trash2, QrCode } from "lucide-react";
import { CertBadge } from "./cert-badge";
import {
  QrCodeModal,
  CertificateModal,
  QrPreviewData,
  CertPreviewData,
} from "@/components/ui/image-display";

const dummyproducts = Array.from({ length: 8 }).map((_, i) => ({
  id: i + 1,
  name: "Susu Segar Premium",
  certs: { bpom: true, mui: true, pirt: false, coa: true },
  views: 450,
  qrCodeUrl: "dummy",
  previewData: {
    title: "Halal (Sertifikasi Halal MUI)",
    description: "Produk memiliki sertifikat halal.",
    numberLabel: "Nomor Halal",
    number: "MD 1234567890",
    registrationDate: "10 Juni 2021",
    validUntil: "10 Juni 2025",
    colorClass: "bg-green-600",
    shortLabel: "Halal MUI",
    themeColor: "border-green-500",
    imageUrl: "",
  },
}));

export function ProductTable() {
  const [selectedQR, setSelectedQR] = useState<QrPreviewData | null>(null);
  const [selectedCert, setSelectedCert] = useState<CertPreviewData | null>(
    null,
  );

  return (
    <>
      <div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-gray-600">
            <thead className="border-b border-gray-100 bg-gray-50/50 text-[11px] font-bold uppercase tracking-wider text-gray-500">
              <tr>
                <th className="px-6 py-4">NO</th>
                <th className="px-6 py-4">NAMA PRODUK</th>
                <th className="px-6 py-4">SERTIFIKAT</th>
                <th className="px-6 py-4 text-center">TOTAL VIEW</th>
                <th className="px-6 py-4 text-center">KODE QR</th>
                <th className="px-6 py-4 text-center">AKSI</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {dummyproducts.map((product) => (
                <tr
                  key={product.id}
                  className="bg-white transition-colors hover:bg-gray-50/50"
                >
                  <td className="whitespace-nowrap px-6 py-4 font-medium text-gray-500">
                    {product.id}
                  </td>
                  <td className="whitespace-nowrap px-6 py-4 font-medium text-gray-900">
                    {product.name}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex gap-2">
                      <CertBadge type="BPOM" active={product.certs.bpom} />
                      <CertBadge type="MUI" active={product.certs.mui} />
                      <CertBadge type="PIRT" active={product.certs.pirt} />
                      <CertBadge type="COA" active={product.certs.coa} />
                    </div>
                  </td>
                  <td className="whitespace-nowrap px-6 py-4 text-center font-medium text-gray-600">
                    {product.views}
                  </td>
                  <td className="px-6 py-4 text-center">
                    <button
                      onClick={() =>
                        setSelectedQR({
                          name: product.name,
                          qrCodeUrl: product.qrCodeUrl,
                        })
                      }
                      className="inline-flex items-center justify-center gap-2 rounded-lg border border-gray-200 bg-white px-3 py-1.5 text-xs font-semibold text-blue-600 transition-colors hover:bg-blue-50"
                    >
                      <QrCode className="h-4 w-4" />
                      Lihat QR
                    </button>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center justify-center gap-3">
                      <button
                        onClick={() => setSelectedCert(product.previewData)}
                        className="text-blue-500 transition-colors hover:text-blue-700"
                        title="Lihat Detail Sertifikat"
                      >
                        <Eye className="h-4 w-4" />
                      </button>
                      <button
                        className="text-yellow-500 transition-colors hover:text-yellow-700"
                        title="Edit"
                      >
                        <Pencil className="h-4 w-4" />
                      </button>
                      <button
                        className="text-red-500 transition-colors hover:text-red-700"
                        title="Hapus"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <QrCodeModal data={selectedQR} onClose={() => setSelectedQR(null)} />
      <CertificateModal
        data={selectedCert}
        onClose={() => setSelectedCert(null)}
      />
    </>
  );
}
