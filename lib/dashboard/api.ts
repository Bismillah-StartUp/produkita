type ApiEnvelope<T> = {
  success: boolean
  message?: string
  data?: T
  error?: string
}

export type DashboardOverviewData = {
  totalProducts: number
  productsThisMonth: number
  totalViews: number
  viewsToday: number
}

export type RevenueChartPointData = {
  month: string
  pemasukan: number
  pengeluaran: number
}

export type InsightChildData = { id: string; message: string; href?: string }
export type InsightItemData = {
  id: string
  message: string
  type: "warning" | "success"
  href?: string
  children?: InsightChildData[]
}

export type TopProductData = { uuid: string; name: string; views: number }
export type RecentActivityData = { id: number; type: string; message: string; created_at: string }

const BACKEND_API_URL = process.env.BACKEND_API_URL!
const BACKEND_API_KEY = process.env.BACKEND_API_KEY!
const API_VERSION = "v1"

async function callDashboardApi<T>(path: string, token: string): Promise<ApiEnvelope<T>> {
  const res = await fetch(`${BACKEND_API_URL}/${API_VERSION}/dashboard${path}`, {
    method: "GET",
    headers: {
      "X-Api-Key": BACKEND_API_KEY,
      Authorization: `Bearer ${token}`,
    },
    cache: "no-store",
  })

  return (await res.json()) as ApiEnvelope<T>
}

export const getOverviewStatsApi = (token: string) =>
  callDashboardApi<DashboardOverviewData>("/overview", token)

export const getRevenueChartApi = (token: string, months = 6) =>
  callDashboardApi<RevenueChartPointData[]>(`/revenue-chart?months=${months}`, token)

export const getInsightsApi = (token: string) =>
  callDashboardApi<InsightItemData[]>("/insights", token)

export const getTopProductsApi = (token: string, limit = 6) =>
  callDashboardApi<TopProductData[]>(`/top-products?limit=${limit}`, token)

export const getRecentActivitiesApi = (token: string, limit = 6) =>
  callDashboardApi<RecentActivityData[]>(`/recent-activities?limit=${limit}`, token)
