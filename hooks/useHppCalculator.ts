"use client"

import { useState, useMemo } from "react"

export type CostItem = {
  id: string
  name: string
  unit: string
  quantity: number | ""
  price_per_unit: number | ""
  subtotal: number
}

const generateId = () => `item-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`

export function useHppCalculator() {
  const [calculation_method, set_calculation_method] = useState<"full" | "variable">("full")
  const [product_name, set_product_name] = useState("")
  const [production_unit, set_production_unit] = useState("")
  const [production_qty, set_production_qty] = useState<number | "">("")

  const [bbb_items, set_bbb_items] = useState<CostItem[]>([])
  const [btkl_items, set_btkl_items] = useState<CostItem[]>([])
  const [packaging_items, set_packaging_items] = useState<CostItem[]>([])
  const [bop_var_items, set_bop_var_items] = useState<CostItem[]>([])
  const [bop_fix_items, set_bop_fix_items] = useState<CostItem[]>([])

  const [margin_percentage, set_margin_percentage] = useState<number>(30)

  const add_item = (set_state: React.Dispatch<React.SetStateAction<CostItem[]>>) => {
    const new_item: CostItem = {
      id: generateId(),
      name: "",
      unit: "",
      quantity: "",
      price_per_unit: "",
      subtotal: 0,
    }
    set_state((prev) => [...prev, new_item])
  }

  const remove_item = (id: string, set_state: React.Dispatch<React.SetStateAction<CostItem[]>>) => {
    set_state((prev) => prev.filter((item) => item.id !== id))
  }

  const update_item = (
    id: string,
    field: keyof CostItem,
    value: string | number,
    set_state: React.Dispatch<React.SetStateAction<CostItem[]>>,
  ) => {
    set_state((prev) =>
      prev.map((item) => {
        if (item.id === id) {
          const updated = { ...item, [field]: value }
          const qty = Number(updated.quantity) || 0
          const price = Number(updated.price_per_unit) || 0
          return { ...updated, subtotal: qty * price }
        }
        return item
      }),
    )
  }

  const summary = useMemo(() => {
    const calculate_total = (items: CostItem[]) => items.reduce((sum, item) => sum + (Number(item.subtotal) || 0), 0)

    const total_bbb = calculate_total(bbb_items)
    const total_btkl = calculate_total(btkl_items)
    const total_packaging = calculate_total(packaging_items)
    const total_bop_var = calculate_total(bop_var_items)
    const raw_total_bop_fix = calculate_total(bop_fix_items)
    const total_bop_fix = calculation_method === "full" ? raw_total_bop_fix : 0

    const total_hpp = total_bbb + total_btkl + total_packaging + total_bop_var + total_bop_fix
    const qty = Number(production_qty) || 1
    const hpp_per_unit = total_hpp / qty

    const profit_margin_value = hpp_per_unit * (margin_percentage / 100)
    const recommended_price = hpp_per_unit + profit_margin_value

    return {
      total_bbb,
      total_btkl,
      total_packaging,
      total_bop_var,
      total_bop_fix,
      raw_total_bop_fix,
      total_hpp,
      hpp_per_unit,
      profit_margin_value,
      recommended_price,
      total_revenue: recommended_price * qty,
      total_profit: profit_margin_value * qty,
    }
  }, [
    calculation_method,
    bbb_items,
    btkl_items,
    packaging_items,
    bop_var_items,
    bop_fix_items,
    production_qty,
    margin_percentage,
  ])

  return {
    state: {
      calculation_method,
      product_name,
      production_unit,
      production_qty,
      bbb_items,
      btkl_items,
      packaging_items,
      bop_var_items,
      bop_fix_items,
      margin_percentage,
    },
    setters: {
      set_calculation_method,
      set_product_name,
      set_production_unit,
      set_production_qty,
      set_margin_percentage,
    },
    actions: {
      add_item,
      remove_item,
      update_item,
      set_bbb_items,
      set_btkl_items,
      set_packaging_items,
      set_bop_var_items,
      set_bop_fix_items,
    },
    summary,
  }
}
