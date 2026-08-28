type ApiEnvelope<T> = {
  success: boolean
  message?: string
  data?: T
  error?: string
}

const BACKEND_API_URL = process.env.BACKEND_API_URL!
const BACKEND_API_KEY = process.env.BACKEND_API_KEY!
const API_VERSION = "v1"

async function callLicenseApi<T>(path: string, method: string): Promise<ApiEnvelope<T>> {
  const res = await fetch(`${BACKEND_API_URL}/${API_VERSION}${path}`, {
    method,
    headers: { "X-Api-Key": BACKEND_API_KEY },
    cache: "no-store",
  })

  return (await res.json()) as ApiEnvelope<T>
}

export const getProductInfoApi = (code: string) => callLicenseApi(`/licenses/${code}`, "GET")
export const getProductNutritionApi = (code: string) => callLicenseApi(`/licenses/${code}/nutrition`, "GET")
export const getProductCertificatesApi = (code: string) => callLicenseApi(`/licenses/${code}/certificates`, "GET")
export const getProductServingApi = (code: string) => callLicenseApi(`/licenses/${code}/serving`, "GET")
export const getProductCompanyApi = (code: string) => callLicenseApi(`/licenses/${code}/company`, "GET")
export const recordProductViewApi = (code: string, source: "view" | "scan" = "view") =>
  callLicenseApi(`/licenses/${code}/view?source=${source}`, "POST")
