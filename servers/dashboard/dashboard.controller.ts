import {
  getOverviewStats,
  getRevenueChart,
  getInsights,
  getTopProducts,
  getRecentActivities,
  recordProductView,
} from "./dashboard.service"

export const getOverviewStatsController = async (userUuid: string) => {
  if (!userUuid) throw new Error("User wajib diisi")
  return await getOverviewStats(userUuid)
}

export const getRevenueChartController = async (userUuid: string, months?: number) => {
  if (!userUuid) throw new Error("User wajib diisi")
  return await getRevenueChart(userUuid, months)
}

export const getInsightsController = async (userUuid: string) => {
  if (!userUuid) throw new Error("User wajib diisi")
  return await getInsights(userUuid)
}

export const getTopProductsController = async (userUuid: string, limit?: number) => {
  if (!userUuid) throw new Error("User wajib diisi")
  return await getTopProducts(userUuid, limit)
}

export const getRecentActivitiesController = async (userUuid: string, limit?: number) => {
  if (!userUuid) throw new Error("User wajib diisi")
  return await getRecentActivities(userUuid, limit)
}

export const recordProductViewController = async (licenseCode: string, source?: "view" | "scan") => {
  if (!licenseCode) throw new Error("License code wajib diisi")
  return await recordProductView(licenseCode, source)
}
