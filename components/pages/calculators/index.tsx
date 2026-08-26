"use client"

import { useEffect } from "react"
import { useHppCalculator } from "@/hooks/useHppCalculator"
import { useAuthStore } from "@/stores/useAuthStore"
import MethodSelector from "./partials/method-selector"
import ProductInfo from "./partials/product-info"
import CostSection from "./partials/cost-section"
import MarginSelector from "./partials/margin-selector"
import SummaryResult from "./partials/summary-result"
import { Save } from "lucide-react"
import { toast } from "sonner"

export default function CalculatorsPage() {
  const { uuid } = useAuthStore()
  const { state, setters, actions, summary, loading, error, createHpp } = useHppCalculator()

  useEffect(() => {
    if (error) toast.error("Gagal menyimpan kalkulasi HPP", { description: error })
  }, [error])

  const handleSave = async () => {
    if (!uuid) return
    const result = await createHpp(uuid)
    if (result) {
      toast.success("Kalkulasi HPP berhasil disimpan")
    }
  }

  return (
    <div className="w-full p-6 sm:p-8 space-y-6 pb-20">
      <MethodSelector
        selected_method={state.calculation_method}
        on_change={setters.set_calculation_method}
      />

      <ProductInfo
        product_name={state.product_name}
        production_unit={state.production_unit}
        production_qty={state.production_qty}
        on_name_change={setters.set_product_name}
        on_unit_change={setters.set_production_unit}
        on_qty_change={setters.set_production_qty}
      />

      <CostSection state={state} actions={actions} />

      <MarginSelector
        margin_percentage={state.margin_percentage}
        on_change={setters.set_margin_percentage}
        hpp_per_unit={summary.hpp_per_unit}
        production_unit={state.production_unit}
      />

      <SummaryResult
        calculation_method={state.calculation_method}
        production_unit={state.production_unit}
        production_qty={state.production_qty}
        margin_percentage={state.margin_percentage}
        summary={summary}
      />

      <div className="flex justify-end">
        <button
          onClick={handleSave}
          disabled={loading}
          className="flex items-center gap-2 rounded-xl bg-blue-600 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
        >
          <Save className="h-4 w-4" />
          {loading ? "Menyimpan..." : "Simpan Kalkulasi"}
        </button>
      </div>
    </div>
  )
}