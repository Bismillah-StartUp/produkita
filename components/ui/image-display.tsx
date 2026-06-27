"use client";

import Image from "next/image";
import { X, Download, CheckCircle2, QrCode } from "lucide-react";

export interface QrPreviewData {
  name: string;
  qrCodeUrl: string;
}

export interface CertPreviewData {
  title: string;
  description: string;
  numberLabel: string;
  number: string;
  registrationDate: string;
  validUntil: string;
  colorClass: string;
  shortLabel: string;
  themeColor: string;
  imageUrl: string;
}

export function QrCodeModal({
  data,
  onClose,
}: {
  data: QrPreviewData | null;
  onClose: () => void;
}) {
  if (!data) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm">
      <div className="w-full max-w-90 overflow-hidden rounded-3xl bg-white shadow-2xl">
        <div className="flex items-start justify-between border-b border-gray-100 p-5">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-blue-50">
              <QrCode className="h-5 w-5 text-blue-600" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-gray-900">
                Kode QR Produk
              </h3>
              <p className="text-xs text-gray-500">{data.name}</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 transition-colors hover:text-gray-600"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="flex flex-col items-center px-6 pb-6 pt-8">
          <div className="mb-6 flex items-center justify-center rounded-3xl bg-white p-3 shadow-[0_8px_30px_rgb(0,0,0,0.08)]">
            {data.qrCodeUrl.startsWith("http") ? (
              <Image
                src={data.qrCodeUrl}
                alt={`QR Code ${data.name}`}
                width={200}
                height={200}
                className="rounded-xl"
              />
            ) : (
              <div className="flex h-50 w-50 items-center justify-center rounded-xl bg-gray-50">
                <QrCode className="h-24 w-24 text-gray-300" strokeWidth={1.5} />
              </div>
            )}
          </div>

          <h4 className="mb-8 text-center text-base font-bold text-gray-800">
            {data.name}
          </h4>

          <div className="flex w-full flex-col gap-3">
            <button className="flex w-full items-center justify-center gap-2 rounded-xl bg-blue-600 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-blue-700 shadow-sm">
              <Download className="h-4 w-4" />
              Download PNG
            </button>
            <button
              onClick={onClose}
              className="w-full rounded-xl border border-gray-200 bg-white py-3.5 text-sm font-semibold text-gray-600 transition-colors hover:bg-gray-50 hover:text-gray-800"
            >
              Tutup
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export function CertificateModal({
  data,
  onClose,
}: {
  data: CertPreviewData | null;
  onClose: () => void;
}) {
  if (!data) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm">
      <div className="flex w-full max-w-4xl flex-col overflow-hidden rounded-2xl bg-white shadow-2xl md:flex-row">
        <div className="relative flex h-64 w-full flex-col bg-gray-900 md:h-112.5 md:w-[45%]">
          {data.imageUrl ? (
            <Image
              src={data.imageUrl}
              alt={data.title}
              fill
              className="object-cover opacity-75"
            />
          ) : (
            <div className="flex h-full w-full flex-col items-center justify-center p-6 text-center">
              <span className="text-sm font-medium text-gray-400">
                Pratinjau tidak tersedia
              </span>
            </div>
          )}
          <div className="absolute bottom-5 left-5 z-10 flex flex-col items-start gap-1.5">
            <span
              className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-bold text-white shadow-sm ${data.colorClass}`}
            >
              <CheckCircle2 className="h-3.5 w-3.5" />
              {data.shortLabel}
            </span>
          </div>
        </div>

        <div className="flex flex-1 flex-col justify-between p-8">
          <div>
            <div className="mb-6 flex items-center gap-4">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-gray-100 bg-white p-2 shadow-sm">
                <div className="flex h-full w-full items-center justify-center rounded-full border-2 border-green-600">
                  <span className="text-[10px] font-bold text-green-600">
                    MUI
                  </span>
                </div>
              </div>
              <div>
                <h3 className="text-lg font-bold text-gray-900">
                  {data.title}
                </h3>
                <p className="text-sm text-gray-500">{data.description}</p>
              </div>
            </div>

            <div className={`border-t-2 ${data.themeColor} w-full pt-6`}>
              <div className="space-y-6">
                <div className="flex items-center justify-between border-b border-gray-100 pb-4">
                  <span className="text-sm font-medium text-gray-500">
                    {data.numberLabel}
                  </span>
                  <span className="text-sm font-bold text-gray-900">
                    {data.number || "-"}
                  </span>
                </div>
                <div className="flex items-center justify-between border-b border-gray-100 pb-4">
                  <span className="text-sm font-medium text-gray-500">
                    Tanggal Registrasi
                  </span>
                  <span className="text-sm font-bold text-gray-900">
                    {data.registrationDate}
                  </span>
                </div>
                <div className="flex items-center justify-between border-b border-gray-100 pb-4">
                  <span className="text-sm font-medium text-gray-500">
                    Berlaku Hingga
                  </span>
                  <span className="text-sm font-bold text-gray-900">
                    {data.validUntil}
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-8 flex justify-end">
            <button
              onClick={onClose}
              className="rounded-lg border border-gray-200 px-8 py-2 text-sm font-semibold text-gray-700 shadow-sm transition-colors hover:bg-gray-50"
            >
              Tutup
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
