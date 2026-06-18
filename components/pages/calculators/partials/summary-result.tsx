"use client"

import { formatIDR } from "@/lib/format-currency"

interface SummaryResultProps {
  calculation_method: "full" | "variable"
  production_unit?: string
  production_qty?: number | string
  margin_percentage?: number
  stepNumber?: string | number
  summary: {
    total_bbb: number
    total_btkl: number
    total_packaging: number
    total_bop_var: number
    total_bop_fix: number
    raw_total_bop_fix: number
    total_hpp: number
    hpp_per_unit: number
    profit_margin_value: number
    recommended_price: number
    total_revenue: number
    total_profit: number
  }
}

export default function SummaryResult({
  summary,
  calculation_method,
  production_unit = "Unit",
  production_qty = 0,
  margin_percentage = 0,
}: SummaryResultProps) {
  const unitLabel = production_unit || "Unit"
  const qtyNumber = Number(production_qty) || 0
  const is_variable = calculation_method === "variable"

  return (
    <div className="mb-6 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm xl:p-6">
      <div className="mb-6 flex items-center gap-3.5">
        <h2 className="text-[15px] font-bold text-slate-800">Hasil Kalkulasi HPP</h2>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2">
        <div className="flex flex-col border-b border-slate-200 pb-6 lg:border-b-0 lg:border-r lg:pb-0 lg:pr-6 xl:pr-8">
          <h3 className="mb-4 text-[11px] font-bold uppercase tracking-wider text-slate-400">Rincian Biaya</h3>

          <div className="flex flex-col gap-3.5">
            <div className="flex items-center justify-between text-[13px]">
              <div className="flex items-center gap-2.5">
                <span className="h-2 w-2 rounded-full bg-[#51A2FF]"></span>
                <span className="text-slate-500">Biaya Bahan Baku (BBB)</span>
              </div>
              <span className="font-bold text-slate-800">{formatIDR(summary.total_bbb)}</span>
            </div>

            <div className="flex items-center justify-between text-[13px]">
              <div className="flex items-center gap-2.5">
                <span className="h-2 w-2 rounded-full bg-[#05DF72]"></span>
                <span className="text-slate-500">Biaya Tenaga Kerja Langsung</span>
              </div>
              <span className="font-bold text-slate-800">{formatIDR(summary.total_btkl)}</span>
            </div>

            <div className="flex items-center justify-between text-[13px]">
              <div className="flex items-center gap-2.5">
                <span className="h-2 w-2 rounded-full bg-[#FB64B6]"></span>
                <span className="text-slate-500">Biaya Kemasan</span>
              </div>
              <span className="font-bold text-slate-800">{formatIDR(summary.total_packaging)}</span>
            </div>

            <div className="flex items-center justify-between text-[13px]">
              <div className="flex items-center gap-2.5">
                <span className="h-2 w-2 rounded-full bg-[#C27AFF]"></span>
                <span className="text-slate-500">BOP Variabel</span>
              </div>
              <span className="font-bold text-slate-800">{formatIDR(summary.total_bop_var)}</span>
            </div>

            <div className="flex items-center justify-between text-[13px]">
              <div className="flex items-center gap-2.5">
                <span className={`h-2 w-2 rounded-full ${is_variable ? "bg-[#ff8a0476]" : "bg-[#FF8904]"}`}></span>
                <span className={is_variable ? "text-slate-300" : "text-slate-500"}>BOP Tetap</span>
                {is_variable && (
                  <span className="rounded-md px-2 py-0.5 text-[10px] font-extrabold tracking-wide text-orange-200">
                    Period Cost
                  </span>
                )}
              </div>
              <span
                className={`font-bold ${is_variable ? "line-through text-slate-400 decoration-slate-400" : "text-slate-800"}`}
              >
                {formatIDR(is_variable ? summary.raw_total_bop_fix : summary.total_bop_fix)}
              </span>
            </div>

            <div className="my-1 border-t border-dashed border-slate-200"></div>

            <div className="flex items-center justify-between text-[13px]">
              <span className="font-bold text-slate-800">Total HPP Keseluruhan</span>
              <span className="font-bold text-[#1659F4]">{formatIDR(summary.total_hpp)}</span>
            </div>

            <div className="flex items-center justify-between text-[13px]">
              <span className="text-slate-500">HPP per {unitLabel}</span>
              <span className="font-bold text-[#1659F4]">{formatIDR(summary.hpp_per_unit)}</span>
            </div>

            <div className="flex items-center justify-between text-[13px]">
              <span className="text-slate-500">Jumlah Produksi</span>
              <span className="font-bold text-slate-800">
                {qtyNumber} {unitLabel}
              </span>
            </div>
          </div>
        </div>

        <div className="flex h-full flex-col justify-between pt-6 lg:pl-6 lg:pt-0 xl:pl-8">
          <div>
            <div className="mb-4 flex items-center gap-2">
              <h3 className="text-[11px] font-bold uppercase tracking-wider text-slate-400">Rekomendasi Harga Jual</h3>
            </div>

            <div className="flex flex-col gap-3.5">
              <div className="flex items-center justify-between text-[13px]">
                <span className="text-slate-500">HPP Per {unitLabel}</span>
                <span className="font-bold text-slate-800">{formatIDR(summary.hpp_per_unit)}</span>
              </div>

              <div className="flex items-center justify-between text-[13px]">
                <span className="text-slate-500">Target Margin</span>
                <span className="font-bold text-[#1659F4]">{margin_percentage}%</span>
              </div>

              <div className="flex items-center justify-between text-[13px]">
                <span className="text-slate-500">Keuntungan Per {unitLabel}</span>
                <span className="font-bold text-[#00A63E]">{formatIDR(summary.profit_margin_value)}</span>
              </div>

              <div className="my-1 border-t border-dashed border-slate-200"></div>
              <div className="flex items-center justify-between">
                <span className="text-[14px] font-bold text-slate-800">Harga Jual Rekomendasi</span>
                <span className="text-[22px] font-bold text-[#00A63E]">{formatIDR(summary.recommended_price)}</span>
              </div>
            </div>
          </div>

          <div className="mt-6 flex items-start justify-between rounded-xl border border-slate-100 bg-[#DCFCE7] p-5">
            <div className="flex flex-col">
              <span className="mb-1 text-[11px] font-bold tracking-wider text-[#00A63E]">Total Keuntungan</span>
              <span className="text-[30px] font-black leading-none tracking-tight text-[#00A63E] xl:text-[28px]">
                {formatIDR(summary.total_profit)}
              </span>
              <span className="mt-1.5 text-[10px] text-[#00C950]">
                ({qtyNumber} {unitLabel} × {formatIDR(summary.profit_margin_value)})
              </span>
            </div>
            <div className="flex flex-col text-right">
              <span className="mb-1 text-[11px] font-bold tracking-wider text-slate-400">Total Pendapatan</span>
              <span className="text-[20px] font-black leading-none tracking-tight text-[#1659F4] xl:text-[20px]">
                {formatIDR(summary.total_revenue)}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
