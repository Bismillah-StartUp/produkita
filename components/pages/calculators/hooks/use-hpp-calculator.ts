import { useState, useMemo } from "react"

export type CostItem = {
  id: string
  name: string
  unit: string
  quantity: number
  price_per_unit: number
  subtotal: number
}

export function useHppCalculator() {
  const [calculation_method, set_calculation_method] = useState<"full" | "variable">("full")
  const [product_name, set_product_name] = useState("")
  const [production_qty, set_production_qty] = useState(1)

  // State Tabel
  const [bbb_items, set_bbb_items] = useState<CostItem[]>([])
  const [btkl_items, set_btkl_items] = useState<CostItem[]>([])
  const [packaging_items, set_packaging_items] = useState<CostItem[]>([])
  const [bop_var_items, set_bop_var_items] = useState<CostItem[]>([])
  const [bop_fix_items, set_bop_fix_items] = useState<CostItem[]>([])

  const [margin_percentage, set_margin_percentage] = useState(30)

  // Fungsi Helper
  const add_item = (setter: React.Dispatch<React.SetStateAction<CostItem[]>>) => {
    setter((prev) => [
      ...prev,
      {
        id: crypto.randomUUID(),
        name: "",
        unit: "",
        quantity: 0,
        price_per_unit: 0,
        subtotal: 0,
      },
    ])
  }

  const remove_item = (id: string, setter: React.Dispatch<React.SetStateAction<CostItem[]>>) => {
    setter((prev) => prev.filter((item) => item.id !== id))
  }

  const update_item = (
    id: string,
    field: keyof CostItem,
    value: string | number,
    setter: React.Dispatch<React.SetStateAction<CostItem[]>>
  ) => {
    setter((prev) =>
      prev.map((item) => {
        if (item.id === id) {
          const updated = { ...item, [field]: value }
          if (field === "quantity" || field === "price_per_unit") {
            updated.subtotal = Number(updated.quantity) * Number(updated.price_per_unit)
          }
          return updated
        }
        return item
      })
    )
  }

  // Kalkulasi Summary
  const summary = useMemo(() => {
    const calculate_total = (items: CostItem[]) => items.reduce((sum, item) => sum + item.subtotal, 0)

    const total_bbb = calculate_total(bbb_items)
    const total_btkl = calculate_total(btkl_items)
    const total_packaging = calculate_total(packaging_items)
    const total_bop_var = calculate_total(bop_var_items)
    const total_bop_fix = calculation_method === "full" ? calculate_total(bop_fix_items) : 0

    const total_hpp = total_bbb + total_btkl + total_packaging + total_bop_var + total_bop_fix
    const hpp_per_unit = production_qty > 0 ? total_hpp / production_qty : 0
    const recommended_price = hpp_per_unit * (1 + margin_percentage / 100)

    return {
      total_hpp,
      hpp_per_unit,
      recommended_price,
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
      set_production_qty,
      set_margin_percentage,
      set_bbb_items,
      set_btkl_items,
      set_packaging_items,
      set_bop_var_items,
      set_bop_fix_items,
    },
    actions: { add_item, remove_item, update_item },
    summary,
  }
}
