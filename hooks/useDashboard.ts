"use client"

import { useState } from "react"
import {
  getOverviewStats,
  getRevenueChart,
  getInsights,
  getTopProducts,
  getRecentActivities,
} from "@/servers/dashboard/dashboard.actions"

export const useDashboard = () => {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handle = async <T>(fn: () => Promise<T>): Promise<T | null> => {
    setLoading(true)
    setError(null)
    try {
      return await fn()
    } catch (err: any) {
      setError(err.message)
      return null
    } finally {
      setLoading(false)
    }
  }

  const handleGetOverviewStats = async (userUuid: string) =>
    handle(() => getOverviewStats(userUuid))

  const handleGetRevenueChart = async (userUuid: string, months?: number) =>
    handle(() => getRevenueChart(userUuid, months))

  const handleGetInsights = async (userUuid: string) =>
    handle(() => getInsights(userUuid))

  const handleGetTopProducts = async (userUuid: string, limit?: number) =>
    handle(() => getTopProducts(userUuid, limit))

  const handleGetRecentActivities = async (userUuid: string, limit?: number) =>
    handle(() => getRecentActivities(userUuid, limit))

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
