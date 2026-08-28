"use client"

import { useState } from "react"
import type {
  DashboardOverviewData,
  RevenueChartPointData,
  InsightItemData,
  TopProductData,
  RecentActivityData,
} from "@/lib/dashboard/api"

type ApiResult<T> = { ok: true; data: T } | { ok: false; error: string }

async function apiCall<T>(path: string): Promise<ApiResult<T>> {
  const res = await fetch(path)
  const json = await res.json()
  if (!res.ok || !json.ok) {
    return { ok: false, error: json.error ?? "Terjadi kesalahan" }
  }
  return { ok: true, data: json.data }
}

export const useDashboard = () => {
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

  const handleGetOverviewStats = async () =>
    handle(() => apiCall<DashboardOverviewData>("/api/dashboard/overview"))

  const handleGetRevenueChart = async (months?: number) =>
    handle(() => apiCall<RevenueChartPointData[]>(`/api/dashboard/revenue-chart?months=${months ?? 6}`))

  const handleGetInsights = async () =>
    handle(() => apiCall<InsightItemData[]>("/api/dashboard/insights"))

  const handleGetTopProducts = async (limit?: number) =>
    handle(() => apiCall<TopProductData[]>(`/api/dashboard/top-products?limit=${limit ?? 6}`))

  const handleGetRecentActivities = async (limit?: number) =>
    handle(() => apiCall<RecentActivityData[]>(`/api/dashboard/recent-activities?limit=${limit ?? 6}`))

  return {
    loading,
    error,
    getOverviewStats: handleGetOverviewStats,
    getRevenueChart: handleGetRevenueChart,
    getInsights: handleGetInsights,
    getTopProducts: handleGetTopProducts,
    getRecentActivities: handleGetRecentActivities,
  }
}
