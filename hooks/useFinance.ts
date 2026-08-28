"use client"

import { useState } from "react"
import { TransactionType } from "@/lib/enums"
import type {
  FinancialRecordData,
  FinancialSummaryData,
  FinancialChartPointData,
  ProductOptionData,
} from "@/lib/finance/api"

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

export const useFinance = () => {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

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

  const handleCreateFinancialRecord = async (data: {
    product_id?: number
    product_name: string
    transaction_type: TransactionType
    amount: number
    transaction_date: Date
    notes?: string
  }) =>
    handle(() =>
      apiCall<FinancialRecordData>("/api/finance", "POST", {
        ...data,
        transaction_date: data.transaction_date.toISOString(),
      })
    )

  const handleGetFinancialSummary = async (year: number, month: number) =>
    handle(() => apiCall<FinancialSummaryData>(`/api/finance/summary?year=${year}&month=${month}`, "GET"))

  const handleGetTransactionDates = async (year: number, month: number) =>
    handle(() => apiCall<number[]>(`/api/finance/dates?year=${year}&month=${month}`, "GET"))

  const handleGetFinancialRecords = async (year: number, month: number) =>
    handle(() => apiCall<FinancialRecordData[]>(`/api/finance?year=${year}&month=${month}`, "GET"))

  const handleGetFinancialChart = async (year: number, month: number) =>
    handle(() => apiCall<FinancialChartPointData[]>(`/api/finance/chart?year=${year}&month=${month}`, "GET"))

  const handleGetTenantProducts = async () =>
    handle(() => apiCall<ProductOptionData[]>("/api/finance/products", "GET"))

  const handleUpdateFinancialRecord = async (
    id: string,
    data: {
      product_id?: number | null
      product_name?: string
      transaction_type?: TransactionType
      amount?: number
      transaction_date?: Date
      notes?: string
    }
  ) =>
    handle(() =>
      apiCall<FinancialRecordData>(`/api/finance/${id}`, "PUT", {
        ...data,
        transaction_date: data.transaction_date?.toISOString(),
      })
    )

  const handleDeleteFinancialRecord = async (id: string) =>
    handle(() => apiCall<{ deleted: boolean }>(`/api/finance/${id}`, "DELETE"))

  const handleExportFinancialRecords = async (year: number, month: number) =>
    handle(async () => {
      const res = await fetch(`/api/finance/export?year=${year}&month=${month}`)
      if (!res.ok) {
        const json = await res.json().catch(() => ({}))
        return { ok: false as const, error: json.error ?? "Gagal mengekspor laporan" }
      }
      const buffer = await res.arrayBuffer()
      const blob = new Blob([buffer], {
        type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      })
      const url = URL.createObjectURL(blob)
      const a = document.createElement("a")
      a.href = url
      a.download = `laporan-keuangan-${year}-${month}.xlsx`
      a.click()
      URL.revokeObjectURL(url)
      return { ok: true as const, data: true }
    })

  return {
    loading,
    error,
    createFinancialRecord: handleCreateFinancialRecord,
    getFinancialSummary: handleGetFinancialSummary,
    getTransactionDates: handleGetTransactionDates,
    getFinancialRecords: handleGetFinancialRecords,
    getFinancialChart: handleGetFinancialChart,
    getTenantProducts: handleGetTenantProducts,
    updateFinancialRecord: handleUpdateFinancialRecord,
    deleteFinancialRecord: handleDeleteFinancialRecord,
    exportFinancialRecords: handleExportFinancialRecords,
  }
}
