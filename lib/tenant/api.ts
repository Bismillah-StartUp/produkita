type ApiEnvelope<T> = {
  success: boolean
  message?: string
  data?: T
  error?: string
}

export type TenantApiData = {
  id: number
  uuid: string
  user_id: number
  name: string | null
  trade_name: string | null
  business_field: string | null
  npwp: string | null
  description: string | null
  address: string | null
  city: string | null
  postal_code: string | null
  province: string | null
  latitude: number | null
  longitude: number | null
  email: string | null
  phonenumber: string | null
  website: string | null
  logo_url: string | null
  logo_public_id: string | null
  place_url: string | null
  place_public_id: string | null
  year: number | null
  status: string
  created_at: string
  updated_at: string
  products_count?: number
}

export type TenantUpdatePayload = {
  name?: string
  trade_name?: string
  business_field?: string
  npwp?: string
  description?: string
  address?: string
  city?: string
  postal_code?: string
  province?: string
  latitude?: number
  longitude?: number
  email?: string
  phonenumber?: string
  website?: string
  year?: number
}

const BACKEND_API_URL = process.env.BACKEND_API_URL!
const BACKEND_API_KEY = process.env.BACKEND_API_KEY!
const API_VERSION = "v1"

async function callTenantApi<T>(path: string, token: string, method: string, body?: unknown): Promise<ApiEnvelope<T>> {
  const res = await fetch(`${BACKEND_API_URL}/${API_VERSION}/tenants${path}`, {
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

export const getTenantApi = (token: string) => {
  return callTenantApi<TenantApiData>("/me", token, "GET")
}

export const updateTenantApi = (token: string, data: TenantUpdatePayload) => {
  return callTenantApi<TenantApiData>("/me", token, "PUT", data)
}

export const getTenantEmailApi = (token: string) => {
  return callTenantApi<{ email: string }>("/me/email", token, "GET")
}

export const uploadTenantLogoApi = (token: string, fileBase64: string) => {
  return callTenantApi<TenantApiData>("/me/logo", token, "POST", { file: fileBase64 })
}

export const uploadTenantPlaceApi = (token: string, fileBase64: string) => {
  return callTenantApi<TenantApiData>("/me/place", token, "POST", { file: fileBase64 })
}

export const deleteTenantLogoApi = (token: string) => {
  return callTenantApi<TenantApiData>("/me/logo", token, "DELETE")
}

export const deleteTenantPlaceApi = (token: string) => {
  return callTenantApi<TenantApiData>("/me/place", token, "DELETE")
}
