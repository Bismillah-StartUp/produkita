"use client";

import { useState } from "react";
import { ChevronDown, Info } from "lucide-react";
import { cn } from "@/lib/utils";

interface MethodSelectorProps {
  selected_method: "full" | "variable";
  on_change: (method: "full" | "variable") => void;
}

export default function MethodSelector({
  selected_method,
  on_change,
}: MethodSelectorProps) {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm xl:p-6">
      <div
        onClick={() => setIsOpen(!isOpen)}
        className="flex cursor-pointer items-center justify-between"
      >
        <div className="flex items-center gap-3.5">
          <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-blue-600 text-[13px] font-bold text-white shadow-sm">
            1
          </div>
          <h2 className="text-[15px] font-bold text-slate-800">
            Metode Perhitungan HPP
            <span className="mt-0.5 block text-[11px] font-normal text-slate-400">
              Pilih metode sesuai kebutuhan — tiap metode menghasilkan angka
              berbeda
            </span>
          </h2>
        </div>

        <div className="flex items-center gap-2">
          <span
            className={cn(
              "rounded-full border px-3 py-1 text-[12px] font-bold shadow-sm transition-colors",
              selected_method === "full"
                ? "border-blue-200 bg-blue-50 text-blue-700"
                : "border-purple-200 bg-purple-50 text-purple-700",
            )}
          >
            {selected_method === "full" ? "Full Costing" : "Variable Costing"}
          </span>
          <ChevronDown
            className={`h-4 w-4 text-slate-400 transition-transform duration-200 ${
              isOpen ? "rotate-180" : ""
            }`}
          />
        </div>
      </div>

      {isOpen && (
        <div className="mt-6 grid grid-cols-1 gap-5 md:grid-cols-2">
          <div
            onClick={() => on_change("full")}
            className={cn(
              "relative flex cursor-pointer flex-col justify-between rounded-xl border p-5 transition-all",
              selected_method === "full"
                ? "border-blue-500 bg-blue-50/30"
                : "border-slate-200 bg-white hover:border-blue-300",
            )}
          >
            <div>
              <div className="mb-4 flex items-start justify-between">
                <div className="flex flex-col items-start gap-2">
                  <h3 className="text-[15px] font-bold text-slate-800">
                    Full Costing
                  </h3>
                  <span className="inline-flex items-center rounded-full border border-blue-200 bg-blue-50 px-2.5 py-0.5 text-[10px] font-bold text-blue-600">
                    Absorption Costing
                  </span>
                </div>
                <div
                  className={cn(
                    "flex h-4.5 w-4.5 shrink-0 items-center justify-center rounded-full border-2 transition-colors",
                    selected_method === "full"
                      ? "border-blue-600"
                      : "border-slate-300 bg-white",
                  )}
                >
                  {selected_method === "full" && (
                    <div className="h-2 w-2 rounded-full bg-blue-600" />
                  )}
                </div>
              </div>
              <p className="mb-4 text-[13px] font-medium leading-relaxed text-slate-700">
                Semua biaya produksi (tetap + variabel) dibebankan ke produk{" "}
                <br />
                menggunakan satu tarif overhead.
              </p>
              <div className="mb-4 rounded-lg border border-slate-200 bg-white p-3 shadow-sm">
                <code className="text-[11px] font-medium tracking-wide text-slate-500">
                  HPP = BBB + BTKL + (Total BOP ÷ Unit Produksi) × Unit
                </code>
              </div>
            </div>
            <div className="flex items-start gap-1.5 text-[11px] leading-relaxed text-slate-400">
              <Info className="mt-0.5 h-3.5 w-3.5 shrink-0" />
              <p>
                Metode resmi PSAK & perpajakan. Overhead dialokasi sama rata per{" "}
                <br />
                unit berdasarkan volume.
              </p>
            </div>
          </div>

          <div
            onClick={() => on_change("variable")}
            className={cn(
              "relative flex cursor-pointer flex-col justify-between rounded-xl border p-5 transition-all",
              selected_method === "variable"
                ? "border-purple-500 bg-purple-50/30"
                : "border-slate-200 bg-white hover:border-purple-300",
            )}
          >
            <div>
              <div className="mb-4 flex items-start justify-between">
                <div className="flex flex-col items-start gap-2">
                  <h3 className="text-[15px] font-bold text-slate-800">
                    Variable Costing
                  </h3>
                  <span className="inline-flex items-center rounded-full border border-purple-200 bg-purple-50 px-2.5 py-0.5 text-[10px] font-bold text-purple-600">
                    Marginal Costing
                  </span>
                </div>
                <div
                  className={cn(
                    "flex h-4.5 w-4.5 shrink-0 items-center justify-center rounded-full border-2 transition-colors",
                    selected_method === "variable"
                      ? "border-blue-600"
                      : "border-slate-300 bg-white",
                  )}
                >
                  {selected_method === "variable" && (
                    <div className="h-2 w-2 rounded-full bg-blue-600" />
                  )}
                </div>
              </div>
              <p className="mb-4 text-[13px] font-medium leading-relaxed text-slate-700">
                Hanya biaya variabel masuk HPP. BOP Tetap diperlakukan sebagai{" "}
                <br />
                period cost.
              </p>
              <div className="mb-4 rounded-lg border border-slate-200 bg-white p-3 shadow-sm">
                <code className="text-[11px] font-medium tracking-wide text-slate-500">
                  HPP = BBB + BTKL + BK + BOP Var (BOP Tetap → Laba Rugi)
                </code>
              </div>
            </div>
            <div className="flex items-start gap-1.5 text-[11px] leading-relaxed text-slate-400">
              <Info className="mt-0.5 h-3.5 w-3.5 shrink-0" />
              <p>
                Untuk analisis internal, break-even, keputusan pricing jangka{" "}
                <br />
                pendek. Tidak berlaku untuk laporan eksternal (PSAK).
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
