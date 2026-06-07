"use client"

import { useHppCalculator } from "./hooks/use-hpp-calculator"
import Header from "./partials/header"
import ProductInfo from "./partials/product-info"

export default function CalculatorsPage() {
  const { state, setters } = useHppCalculator()

  return (
    <div className="mx-auto max-w-5xl space-y-8">
      <Header />

      <section className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
        <ProductInfo
          product_name={state.product_name}
          production_qty={state.production_qty}
          on_name_change={setters.set_product_name}
          on_qty_change={setters.set_production_qty}
        />
      </section>

      {/* Nantinya kita tambahkan MethodSelector dan CostTable di bawah sini */}
    </div>
  )
}
