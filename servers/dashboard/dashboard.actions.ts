"use server"

import {
  getOverviewStatsController,
  getRevenueChartController,
  getInsightsController,
  getTopProductsController,
  getRecentActivitiesController,
  recordProductViewController,
} from "./dashboard.controller"

export const getOverviewStats = async (userUuid: string) => {
  return await getOverviewStatsController(userUuid)
}

export const getRevenueChart = async (userUuid: string, months?: number) => {
  return await getRevenueChartController(userUuid, months)
}

export const getInsights = async (userUuid: string) => {
  return await getInsightsController(userUuid)
}

export const getTopProducts = async (userUuid: string, limit?: number) => {
  return await getTopProductsController(userUuid, limit)
}

export const getRecentActivities = async (userUuid: string, limit?: number) => {
  return await getRecentActivitiesController(userUuid, limit)
}

export const recordProductView = async (licenseCode: string, source?: "view" | "scan") => {
  return await recordProductViewController(licenseCode, source)
}
