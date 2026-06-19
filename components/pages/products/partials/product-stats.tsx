"use client";

import { Box, Clock } from "lucide-react";

interface ProductStatsProps {
  totalProducts: number;
  pendingProducts: number;
}

export function ProductStats({
  totalProducts,
  pendingProducts,
}: ProductStatsProps) {
  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
      <div className="flex items-center gap-4 rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-blue-50">
          <Box className="h-6 w-6 text-blue-600" />
        </div>
        <div>
          <p className="text-sm font-medium text-gray-500">Total Produk</p>
          <div className="flex items-baseline gap-2">
            <h3 className="text-2xl font-bold text-gray-900">
              {totalProducts}
            </h3>
            <p className="text-xs text-gray-500">Produk terdaftar</p>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-4 rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-green-50">
          <Clock className="h-6 w-6 text-green-600" />
        </div>
        <div>
          <p className="text-sm font-medium text-gray-500">
            Menunggu Verifikasi
          </p>
          <div className="flex items-baseline gap-2">
            <h3 className="text-2xl font-bold text-gray-900">
              {pendingProducts}
            </h3>
            <p className="text-xs text-gray-500">
              Produk menunggu persetujuan QR oleh siapa ya
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
