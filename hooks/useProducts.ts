"use client"

import { useState } from "react"
import { CertificateType, ProductCategory, WeightUnits } from "@prisma/client"
import { toBase64 } from "@/lib/utils"
import type {
  ProductData,
  ProductListItemData,
  CertificateData,
  NutritionInfoData,
  ProductServingData,
  ProductSubmitResultData,
} from "@/lib/product/api"

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

export const useProduct = () => {
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

  const handleGetProduct = async (uuid: string) =>
    handle(() => apiCall<ProductData>(`/api/products/${uuid}`, "GET"))

  const handleGetProductsByTenant = async () =>
    handle(() => apiCall<ProductListItemData[]>("/api/products", "GET"))

  const handleSoftDeleteProduct = async (uuid: string) =>
    handle(() => apiCall(`/api/products/${uuid}`, "DELETE"))

  const handleSubmitProduct = async (
    tenantEmail: string,
    data: {
      product: {
        name: string
        brand?: string
        price?: number
        description?: string
        type: ProductCategory
        weight?: number
        weight_unit?: WeightUnits
      }
      productImages: File[]
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
        type: CertificateType
        number?: string
        registered_at?: Date
        valid_until?: Date
        lab_name?: string
        file?: File
      }[]
      serving: {
        serving_info?: string
        serving_portion?: string
        storage_info?: string
        video_url?: string
        images?: File[]
      }
    }
  ) =>
    handle(async () => {
      const productImages = await Promise.all(data.productImages.map(toBase64))

      const certificates = await Promise.all(
        data.certificates.map(async (cert) => ({
          ...cert,
          registered_at: cert.registered_at?.toISOString(),
          valid_until: cert.valid_until?.toISOString(),
          file: cert.file ? await toBase64(cert.file) : undefined,
        }))
      )

      const servingImages = await Promise.all((data.serving.images ?? []).map(toBase64))

      return apiCall<ProductSubmitResultData>("/api/products", "POST", {
        tenant_email: tenantEmail,
        product: data.product,
        productImages,
        nutrition: data.nutrition,
        certificates,
        serving: data.serving,
        servingImages,
      })
    })

  const handleUpdateProductBasic = async (
    uuid: string,
    data: {
      name?: string
      brand?: string
      price?: number
      description?: string
      type?: ProductCategory
      weight?: number
      weight_unit?: WeightUnits
    }
  ) => handle(() => apiCall<ProductData>(`/api/products/${uuid}`, "PUT", data))

  const handleUpdateProductImages = async (uuid: string, changes: { index: number; file: File }[]) =>
    handle(async () => {
      const encoded = await Promise.all(
        changes.map(async (c) => ({ index: c.index, file: await toBase64(c.file) }))
      )
      return apiCall<ProductData>(`/api/products/${uuid}/images`, "PUT", { changes: encoded })
    })

  const handleSoftDeleteProductImage = async (imageUuid: string) =>
    handle(() => apiCall(`/api/products/images/${imageUuid}`, "DELETE"))

  const handleUpdateNutrition = async (
    productUuid: string,
    data: {
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
  ) => handle(() => apiCall<NutritionInfoData>(`/api/products/${productUuid}/nutrition`, "PUT", data))

  const handleUpdateServing = async (
    productUuid: string,
    data: {
      serving_info?: string
      serving_portion?: string
      storage_info?: string
      video_url?: string
    }
  ) => handle(() => apiCall<ProductServingData>(`/api/products/${productUuid}/serving`, "PUT", data))

  const handleUpdateServingImages = async (productUuid: string, changes: { index: number; file: File }[]) =>
    handle(async () => {
      const encoded = await Promise.all(
        changes.map(async (c) => ({ index: c.index, file: await toBase64(c.file) }))
      )
      return apiCall<ProductServingData>(`/api/products/${productUuid}/serving/images`, "PUT", { changes: encoded })
    })

  const handleCreateCertificate = async (
    productUuid: string,
    data: {
      type: CertificateType
      number?: string
      registered_at?: Date
      valid_until?: Date
      lab_name?: string
      file?: File
    }
  ) =>
    handle(async () => {
      const file = data.file ? await toBase64(data.file) : undefined
      return apiCall<CertificateData>(`/api/products/${productUuid}/certificates`, "POST", {
        ...data,
        registered_at: data.registered_at?.toISOString(),
        valid_until: data.valid_until?.toISOString(),
        file,
      })
    })

  const handleUpdateCertificate = async (
    certificateUuid: string,
    data: {
      number?: string
      registered_at?: Date
      valid_until?: Date
      lab_name?: string
      file?: File
    }
  ) =>
    handle(async () => {
      const file = data.file ? await toBase64(data.file) : undefined
      return apiCall<CertificateData>(`/api/products/certificates/${certificateUuid}`, "PUT", {
        ...data,
        registered_at: data.registered_at?.toISOString(),
        valid_until: data.valid_until?.toISOString(),
        file,
      })
    })

  const handleSoftDeleteCertificate = async (certificateUuid: string) =>
    handle(() => apiCall(`/api/products/certificates/${certificateUuid}`, "DELETE"))

  const handleSoftDeleteServingImage = async (imageUuid: string) =>
    handle(() => apiCall(`/api/products/serving/images/${imageUuid}`, "DELETE"))

  return {
    loading,
    error,
    getProduct: handleGetProduct,
    getProductsByTenant: handleGetProductsByTenant,
    softDeleteProduct: handleSoftDeleteProduct,
    submitProduct: handleSubmitProduct,
    updateProductBasic: handleUpdateProductBasic,
    updateProductImages: handleUpdateProductImages,
    softDeleteProductImage: handleSoftDeleteProductImage,
    updateNutrition: handleUpdateNutrition,
    updateServing: handleUpdateServing,
    updateServingImages: handleUpdateServingImages,
    createCertificate: handleCreateCertificate,
    updateCertificate: handleUpdateCertificate,
    softDeleteCertificate: handleSoftDeleteCertificate,
    softDeleteServingImage: handleSoftDeleteServingImage,
  }
}
