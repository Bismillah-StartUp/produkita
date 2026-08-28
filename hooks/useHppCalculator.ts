"use client"

import { useState, useMemo } from "react"
import { HppMethod, HppCategory } from "@prisma/client"
import type { HppCalculationData } from "@/lib/hpp/api"

type ApiResult<T> = { ok: true; data: T } | { ok: false; error: string }

async function apiCall<T>(path: string, method: string, body?: unknown): Promise<ApiResult<T>> {
  const res = await fetch(path, {
    method,
    headers: body ? { "Content-Type": "application/json" } : undefined,
    body: body ? JSON.stringify(body) : undefined,
  })
  const json = await res.json()
  if (!res.ok || !json.ok) {
    return { ok: false, error: json.error ?? "Terjadi kesalahan" }
  }
  return { ok: true, data: json.data }
}

export type CostItem = {
  id: string
  name: string
  unit: string
  quantity: number | ""
  price_per_unit: number | ""
  subtotal: number
}

const generateId = () => crypto.randomUUID()

export const useHppCalculator = () => {
  // ========================
  // STATE LOKAL KALKULATOR
  // ========================
  const [calculation_method, set_calculation_method] = useState<HppMethod>("full")
  const [product_name, set_product_name] = useState("")
  const [production_unit, set_production_unit] = useState("")
  const [production_qty, set_production_qty] = useState<number | "">("")
  const [bbb_items, set_bbb_items] = useState<CostItem[]>([])
  const [btkl_items, set_btkl_items] = useState<CostItem[]>([])
  const [packaging_items, set_packaging_items] = useState<CostItem[]>([])
  const [bop_var_items, set_bop_var_items] = useState<CostItem[]>([])
  const [bop_fix_items, set_bop_fix_items] = useState<CostItem[]>([])
  const [margin_percentage, set_margin_percentage] = useState<number>(30)

  // ========================
  // LOADING & ERROR
  // ========================
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  // ========================
  // ITEM ACTIONS
  // ========================
  const add_item = (set_state: React.Dispatch<React.SetStateAction<CostItem[]>>) => {
    set_state((prev) => [
      ...prev,
      {
        id: generateId(),
        name: "",
        unit: "",
        quantity: "",
        price_per_unit: "",
        subtotal: 0,
      },
    ])
  }

  const remove_item = (
    id: string,
    set_state: React.Dispatch<React.SetStateAction<CostItem[]>>
  ) => {
    set_state((prev) => prev.filter((item) => item.id !== id))
  }

  const update_item = (
    id: string,
    field: keyof CostItem,
    value: string | number,
    set_state: React.Dispatch<React.SetStateAction<CostItem[]>>
  ) => {
    set_state((prev) =>
      prev.map((item) => {
        if (item.id !== id) return item
        const updated = { ...item, [field]: value }
        const qty = Number(updated.quantity) || 0
        const price = Number(updated.price_per_unit) || 0
        return { ...updated, subtotal: qty * price }
      })
    )
  }

  // ========================
  // SUMMARY KALKULASI
  // ========================
  const summary = useMemo(() => {
    const calculate_total = (items: CostItem[]) =>
      items.reduce((sum, item) => sum + (Number(item.subtotal) || 0), 0)

    const total_bbb = calculate_total(bbb_items)
    const total_btkl = calculate_total(btkl_items)
    const total_packaging = calculate_total(packaging_items)
    const total_bop_var = calculate_total(bop_var_items)
    const raw_total_bop_fix = calculate_total(bop_fix_items)
    const total_bop_fix = calculation_method === "full" ? raw_total_bop_fix : 0

    const total_hpp = total_bbb + total_btkl + total_packaging + total_bop_var + total_bop_fix
    const qty = Number(production_qty) || 0
    const hpp_per_unit = qty > 0 ? total_hpp / qty : 0

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

  // ========================
  // HELPER — mapping items ke format DB
  // ========================
  const mapItems = (items: CostItem[], category: HppCategory) =>
    items
      .filter((item) => item.name && Number(item.quantity) > 0 && Number(item.price_per_unit) > 0)
      .map((item) => ({
        category,
        name: item.name,
        unit: item.unit,
        quantity: Number(item.quantity),
        price_per_unit: Number(item.price_per_unit),
        subtotal: item.subtotal,
      }))

  const buildPayload = () => ({
    product_name,
    production_unit,
    production_qty: Number(production_qty),
    calculation_method,
    margin_percentage,
    total_hpp: summary.total_hpp,
    hpp_per_unit: summary.hpp_per_unit,
    recommended_price: summary.recommended_price,
    total_profit: summary.total_profit,
    total_revenue: summary.total_revenue,
    items: [
      ...mapItems(bbb_items, "bbb"),
      ...mapItems(btkl_items, "btkl"),
      ...mapItems(packaging_items, "packaging"),
      ...mapItems(bop_var_items, "bop_var"),
      ...mapItems(bop_fix_items, "bop_fix"),
    ],
  })

  // ========================
  // DB ACTIONS
  // ========================
  const handle = async <T>(fn: () => Promise<ApiResult<T>>): Promise<T | null> => {
    setLoading(true)
    setError(null)
    try {
      const result = await fn()
      if (!result.ok) {
        setError(result.error)
        return null
      }
      return result.data
    } catch (err: any) {
      setError(err.message)
      return null
    } finally {
      setLoading(false)
    }
  }

  const handleGetHpps = async () =>
    handle(() => apiCall<HppCalculationData[]>("/api/hpp", "GET"))

  const handleGetHpp = async (uuid: string) =>
    handle(() => apiCall<HppCalculationData>(`/api/hpp/${uuid}`, "GET"))

  const handleCreateHpp = async () =>
    handle(() => apiCall<HppCalculationData>("/api/hpp", "POST", buildPayload()))

  const handleUpdateHpp = async (uuid: string) =>
    handle(() => apiCall<HppCalculationData>(`/api/hpp/${uuid}`, "PUT", buildPayload()))

  const handleDeleteHpp = async (uuid: string) =>
    handle(() => apiCall<{ deleted: boolean }>(`/api/hpp/${uuid}`, "DELETE"))

  // ========================
  // LOAD KALKULASI KE STATE
  // ========================
  const loadHpp = async (uuid: string) => {
    const result = await handleGetHpp(uuid)
    if (!result) return

    set_product_name(result.product_name)
    set_production_unit(result.production_unit)
    set_production_qty(result.production_qty)
    set_calculation_method(result.calculation_method as HppMethod)
    set_margin_percentage(result.margin_percentage)

    const toStateItem = (item: any): CostItem => ({
      id: generateId(),
      name: item.name,
      unit: item.unit,
      quantity: item.quantity,
      price_per_unit: item.price_per_unit,
      subtotal: item.subtotal,
    })

    const items = result.items ?? []
    set_bbb_items(items.filter((i) => i.category === "bbb").map(toStateItem))
    set_btkl_items(items.filter((i) => i.category === "btkl").map(toStateItem))
    set_packaging_items(items.filter((i) => i.category === "packaging").map(toStateItem))
    set_bop_var_items(items.filter((i) => i.category === "bop_var").map(toStateItem))
    set_bop_fix_items(items.filter((i) => i.category === "bop_fix").map(toStateItem))
  }

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
    loading,
    error,
    getHpps: handleGetHpps,
    createHpp: handleCreateHpp,
    updateHpp: handleUpdateHpp,
    deleteHpp: handleDeleteHpp,
    loadHpp,
  }
}