"use server"

import {
  getProductController,
  getProductsByTenantController,
  submitProductController,
  softDeleteProductController,
  updateProductBasicController,
  updateProductImagesController,
  softDeleteProductImageController,
  updateNutritionController,
  updateServingController,
  updateServingImagesController,
  createCertificateController,
  updateCertificateController,
  softDeleteCertificateController,
  softDeleteServingImageController,
} from "./product.controller"
import { CertificateType, ProductCategory, WeightUnits } from "@prisma/client"

export const getProduct = async (uuid: string) => {
  return await getProductController(uuid)
}

export const getProductsByTenant = async (tenantUuid: string) => {
  return await getProductsByTenantController(tenantUuid)
}

export const softDeleteProduct = async (uuid: string) => {
  return await softDeleteProductController(uuid)
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
      type: CertificateType
      number?: string
      registered_at?: Date
      valid_until?: Date
      lab_name?: string
      file?: string
    }[]
    serving: {
      serving_info?: string
      serving_portion?: string
      storage_info?: string
      video_url?: string
      images?: string[]
    }
  }
) => {
  return await submitProductController(tenantUuid, tenantEmail, data)
}

export const updateProductBasic = async (
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
) => {
  return await updateProductBasicController(uuid, data)
}

export const updateProductImages = async (
  uuid: string,
  changes: { index: number; file: string }[]
) => {
  return await updateProductImagesController(uuid, changes)
}

export const softDeleteProductImage = async (imageUuid: string) => {
  return await softDeleteProductImageController(imageUuid)
}

export const updateNutrition = async (
  productUuid: string,
  data: Parameters<typeof updateNutritionController>[1]
) => {
  return await updateNutritionController(productUuid, data)
}

export const updateServingImages = async (
  productUuid: string,
  changes: { index: number; file: string }[]
) => {
  return await updateServingImagesController(productUuid, changes)
}

export const updateServing = async (
  productUuid: string,
  data: Parameters<typeof updateServingController>[1]
) => {
  return await updateServingController(productUuid, data)
}


export const createCertificate = async (
  productUuid: string,
  data: {
    type: CertificateType
    number?: string
    registered_at?: Date
    valid_until?: Date
    lab_name?: string
    file?: Buffer
  }
) => {
  return await createCertificateController(productUuid, data)
}

export const updateCertificate = async (
  certificateUuid: string,
  data: {
    number?: string
    registered_at?: Date
    valid_until?: Date
    lab_name?: string
    file?: Buffer
  }
) => {
  return await updateCertificateController(certificateUuid, data)
}

export const softDeleteCertificate = async (certificateUuid: string) => {
  return await softDeleteCertificateController(certificateUuid)
}

export const softDeleteServingImage = async (imageUuid: string) => {
  return await softDeleteServingImageController(imageUuid)
}