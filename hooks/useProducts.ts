"use client"

import { useState } from "react"
import {
  getProduct,
  getProductsByTenant,
  submitProduct,
  softDeleteProduct,
  softDeleteProductImage,    
  softDeleteServingImage,
  updateProductBasic,
  addProductImages,
  updateNutrition,
  addCertificate,
  updateCertificate,
  softDeleteCertificate,
  updateServing,
  addServingImages,
} from "@/servers/products/product.actions"
import { CertificateType, ProductCategory, WeightUnits } from "@prisma/client"
import { toBase64 } from "@/lib/utils"

export const useProduct = () => {
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

  const handleGetProduct = async (uuid: string) =>
    handle(() => getProduct(uuid))

  const handleGetProductsByTenant = async (tenantUuid: string) =>
    handle(() => getProductsByTenant(tenantUuid))

  const handleSoftDeleteProduct = async (uuid: string) =>
    handle(() => softDeleteProduct(uuid))

  const handleSubmitProduct = async (
    tenantUuid: string,
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
      const productImages = await Promise.all(
        data.productImages.map(toBase64)
      )

      const certificates = await Promise.all(
        data.certificates.map(async (cert) => ({
          ...cert,
          file: cert.file ? await toBase64(cert.file) : undefined,
        }))
      )

      const servingImages = await Promise.all(
        (data.serving.images ?? []).map(toBase64)
      )

      return await submitProduct(tenantUuid, tenantEmail, {
        ...data,
        productImages,
        certificates,
        serving: { ...data.serving, images: servingImages },
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
  ) => handle(() => updateProductBasic(uuid, data))

  const handleAddProductImages = async (uuid: string, files: File[]) =>
    handle(async () => {
      const buffers = await Promise.all(files.map(async (f) => Buffer.from(await f.arrayBuffer())))
      return await addProductImages(uuid, buffers)
    })

  const handleSoftDeleteProductImage = async (imageUuid: string) =>
    handle(() => softDeleteProductImage(imageUuid))

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
  ) => handle(() => updateNutrition(productUuid, data))

  const handleAddCertificate = async (
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
      const buffer = data.file ? Buffer.from(await data.file.arrayBuffer()) : undefined
      return await addCertificate(productUuid, { ...data, file: buffer })
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
      const buffer = data.file ? Buffer.from(await data.file.arrayBuffer()) : undefined
      return await updateCertificate(certificateUuid, { ...data, file: buffer })
    })

  const handleSoftDeleteCertificate = async (certificateUuid: string) =>
    handle(() => softDeleteCertificate(certificateUuid))

  const handleUpdateServing = async (
    productUuid: string,
    data: {
      serving_info?: string
      serving_portion?: string
      storage_info?: string
      video_url?: string
    }
  ) => handle(() => updateServing(productUuid, data))

  const handleAddServingImages = async (productUuid: string, files: File[]) =>
    handle(async () => {
      const buffers = await Promise.all(files.map(async (f) => Buffer.from(await f.arrayBuffer())))
      return await addServingImages(productUuid, buffers)
    })

  const handleSoftDeleteServingImage = async (imageUuid: string) =>
    handle(() => softDeleteServingImage(imageUuid))

  return {
    loading,
    error,
    getProduct: handleGetProduct,
    getProductsByTenant: handleGetProductsByTenant,
    softDeleteProduct: handleSoftDeleteProduct,
    submitProduct: handleSubmitProduct,
    updateProductBasic: handleUpdateProductBasic,
    addProductImages: handleAddProductImages,
    softDeleteProductImage: handleSoftDeleteProductImage,
    updateNutrition: handleUpdateNutrition,
    addCertificate: handleAddCertificate,
    updateCertificate: handleUpdateCertificate,
    softDeleteCertificate: handleSoftDeleteCertificate,
    updateServing: handleUpdateServing,
    addServingImages: handleAddServingImages,
    softDeleteServingImage: handleSoftDeleteServingImage,
  }
}