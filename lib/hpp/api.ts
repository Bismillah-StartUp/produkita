type ApiEnvelope<T> = {
  success: boolean
  message?: string
  data?: T
  error?: string
}

export type HppItemData = {
  id: number
  calculation_id: number
  category: string
  name: string
  unit: string
  quantity: number
  price_per_unit: number
  subtotal: number
}

export type HppCalculationData = {
  id: number
  uuid: string
  tenant_id: number
  product_name: string
  production_unit: string
  production_qty: number
  calculation_method: string
  margin_percentage: number
  total_hpp: number
  hpp_per_unit: number
  recommended_price: number
  total_profit: number
  total_revenue: number
  created_at: string
  updated_at: string
  items?: HppItemData[]
}

export type HppItemPayload = {
  category: string
  name: string
  unit: string
  quantity: number
  price_per_unit: number
  subtotal: number
}

export type HppSavePayload = {
  product_name: string
  production_unit: string
  production_qty: number
  calculation_method: string
  margin_percentage: number
  total_hpp: number
  hpp_per_unit: number
  recommended_price: number
  total_profit: number
  total_revenue: number
  items: HppItemPayload[]
}

const BACKEND_API_URL = process.env.BACKEND_API_URL!
const BACKEND_API_KEY = process.env.BACKEND_API_KEY!
const API_VERSION = "v1"

async function callHppApi<T>(path: string, token: string, method: string, body?: unknown): Promise<ApiEnvelope<T>> {
  const res = await fetch(`${BACKEND_API_URL}/${API_VERSION}/hpp${path}`, {
    method,
    headers: {
      "Content-Type": "application/json",
      "X-Api-Key": BACKEND_API_KEY,
      Authorization: `Bearer ${token}`,
    },
    body: body ? JSON.stringify(body) : undefined,
    cache: "no-store",
  })

  return (await res.json()) as ApiEnvelope<T>
}

export const listHppApi = (token: string) => {
  return callHppApi<HppCalculationData[]>("", token, "GET")
}

export const getHppApi = (token: string, uuid: string) => {
  return callHppApi<HppCalculationData>(`/${uuid}`, token, "GET")
}

export const createHppApi = (token: string, data: HppSavePayload) => {
  return callHppApi<HppCalculationData>("", token, "POST", data)
}

export const updateHppApi = (token: string, uuid: string, data: HppSavePayload) => {
  return callHppApi<HppCalculationData>(`/${uuid}`, token, "PUT", data)
}

export const deleteHppApi = (token: string, uuid: string) => {
  return callHppApi<{ deleted: boolean }>(`/${uuid}`, token, "DELETE")
}
