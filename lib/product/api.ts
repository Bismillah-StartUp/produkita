type ApiEnvelope<T> = {
  success: boolean
  message?: string
  data?: T
  error?: string
}

export type ProductImageData = { id: number; uuid: string; url: string; public_id: string }
export type CertificateData = {
  id: number
  uuid: string
  type: string
  number: string | null
  registered_at: string | null
  valid_until: string | null
  certificate_url: string | null
  lab_name: string | null
}
export type NutritionInfoData = {
  id: number
  servings: number | null
  serving_pkgs: number | null
  energy: number | null
  fat: number | null
  saturated_fat: number | null
  protein: number | null
  carbo: number | null
  sugar: number | null
  natrium: number | null
  composition: string | null
  allergens: string[]
}
export type ProductServingImageData = { id: number; uuid: string; url: string; public_id: string }
export type ProductServingData = {
  id: number
  uuid: string
  serving_info: string | null
  serving_portion: string | null
  storage_info: string | null
  video_url: string | null
  images?: ProductServingImageData[]
}
export type ProductData = {
  id: number
  uuid: string
  name: string
  price: number | null
  brand: string | null
  description: string | null
  tenant_id: number
  type: string
  weight: number | null
  weight_unit: string | null
  qr_code_url: string | null
  license_code: string | null
  created_at: string
  updated_at: string
  deleted_at: string | null
  certificates?: CertificateData[]
  nutrition_info?: NutritionInfoData
  serving?: ProductServingData
  images?: ProductImageData[]
}
export type ProductListItemData = {
  uuid: string
  name: string
  type: string
  license_code: string | null
  qr_code_url: string | null
  created_at: string
  certificate_types: string[]
  views_count: number
}

export type ProductSubmitPayload = {
  tenant_email: string
  product: {
    name: string
    brand?: string
    price?: number
    description?: string
    type: string
    weight?: number
    weight_unit?: string
  }
  productImages: string[]
  nutrition: {
    servings?: number
    serving_pkgs?: number
    energy?: number
    fat?: number
    saturated_fat?: number
    protein?: number
    carbo?: number
    sugar?: number
    natrium?: number
    composition?: string
    allergens?: string[]
  }
  certificates: {
    type: string
    number?: string
    registered_at?: string
    valid_until?: string
    lab_name?: string
    file?: string
  }[]
  serving: {
    serving_info?: string
    serving_portion?: string
    storage_info?: string
    video_url?: string
  }
  servingImages: string[]
}

export type ProductSubmitResultData = {
  licenseCode: string
  licensePageUrl: string
  qrCodeDataUrl: string
}

const BACKEND_API_URL = process.env.BACKEND_API_URL!
const BACKEND_API_KEY = process.env.BACKEND_API_KEY!
const API_VERSION = "v1"

async function callProductApi<T>(path: string, token: string, method: string, body?: unknown): Promise<ApiEnvelope<T>> {
  const res = await fetch(`${BACKEND_API_URL}/${API_VERSION}/products${path}`, {
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

export const getProductApi = (token: string, uuid: string) => callProductApi<ProductData>(`/${uuid}`, token, "GET")

export const listProductsApi = (token: string) => callProductApi<ProductListItemData[]>("", token, "GET")

export const submitProductApi = (token: string, data: ProductSubmitPayload) =>
  callProductApi<ProductSubmitResultData>("", token, "POST", data)

export const updateProductBasicApi = (
  token: string,
  uuid: string,
  data: {
    name?: string
    brand?: string
    price?: number
    description?: string
    type?: string
    weight?: number
    weight_unit?: string
  }
) => callProductApi<ProductData>(`/${uuid}`, token, "PUT", data)

export const updateProductImagesApi = (token: string, uuid: string, changes: { index: number; file: string }[]) =>
  callProductApi<ProductData>(`/${uuid}/images`, token, "PUT", { changes })

export const softDeleteProductImageApi = (token: string, imageUuid: string) =>
  callProductApi(`/images/${imageUuid}`, token, "DELETE")

export const updateNutritionApi = (
  token: string,
  productUuid: string,
  data: Record<string, unknown>
) => callProductApi<NutritionInfoData>(`/${productUuid}/nutrition`, token, "PUT", data)

export const updateServingApi = (
  token: string,
  productUuid: string,
  data: Record<string, unknown>
) => callProductApi<ProductServingData>(`/${productUuid}/serving`, token, "PUT", data)

export const updateServingImagesApi = (token: string, productUuid: string, changes: { index: number; file: string }[]) =>
  callProductApi<ProductServingData>(`/${productUuid}/serving/images`, token, "PUT", { changes })

export const softDeleteServingImageApi = (token: string, imageUuid: string) =>
  callProductApi(`/serving/images/${imageUuid}`, token, "DELETE")

export const createCertificateApi = (
  token: string,
  productUuid: string,
  data: {
    type: string
    number?: string
    registered_at?: string
    valid_until?: string
    lab_name?: string
    file?: string
  }
) => callProductApi<CertificateData>(`/${productUuid}/certificates`, token, "POST", data)

export const updateCertificateApi = (
  token: string,
  certUuid: string,
  data: {
    number?: string
    registered_at?: string
    valid_until?: string
    lab_name?: string
    file?: string
  }
) => callProductApi<CertificateData>(`/certificates/${certUuid}`, token, "PUT", data)

export const softDeleteCertificateApi = (token: string, certUuid: string) =>
  callProductApi(`/certificates/${certUuid}`, token, "DELETE")

export const softDeleteProductApi = (token: string, uuid: string) =>
  callProductApi(`/${uuid}`, token, "DELETE")
