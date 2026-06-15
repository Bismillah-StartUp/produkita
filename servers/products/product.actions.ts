"use server"

import {
  getProductController,
  getProductsByTenantController,
  deleteProductImageController,
  deleteServingImageController,
  submitProductController,
} from "./product.controller"
import { CertificateType, ProductCategory, WeightUnits } from "@prisma/client"

export const getProduct = async (uuid: string) => {
  return await getProductController(uuid)
}

export const getProductsByTenant = async (tenantUuid: string) => {
  return await getProductsByTenantController(tenantUuid)
}

export const deleteProductImage = async (imageUuid: string) => {
  return await deleteProductImageController(imageUuid)
}

export const deleteServingImage = async (imageUuid: string) => {
  return await deleteServingImageController(imageUuid)
}

export const submitProduct = async (
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
    productImages: Buffer[]
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
      file?: Buffer
    }[]
    serving: {
      serving_info?: string
      serving_portion?: string
      storage_info?: string
      video_url?: string
      images?: Buffer[]
    }
  }
) => {
  return await submitProductController(tenantUuid, tenantEmail, data)
}