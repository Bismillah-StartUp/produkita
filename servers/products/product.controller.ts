import {
  findProductByUuid,
  findProductsByTenantUuid,
  submitProduct,
  softDeleteProduct,
  updateProductBasic,
  softDeleteProductImage,
  updateNutrition,
  updateCertificate,
  softDeleteCertificate,
  softDeleteServingImage,
} from "./product.service"
import { sendBarcodeEmail } from "@/lib/emails/sendingBarcode"
import { CertificateType, ProductCategory, WeightUnits } from "@prisma/client"

export const getProductController = async (uuid: string) => {
  const product = await findProductByUuid(uuid)
  if (!product) throw new Error("Produk tidak ditemukan")
  return product
}

export const getProductsByTenantController = async (tenantUuid: string) => {
  return await findProductsByTenantUuid(tenantUuid)
}

export const softDeleteProductController = async (uuid: string) => {
  return await softDeleteProduct(uuid)
}

export const submitProductController = async (
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
  if (!data.product.name) throw new Error("Nama produk wajib diisi")
  if (!data.product.type) throw new Error("Jenis produk wajib diisi")
  if (!tenantEmail) throw new Error("Email tenant wajib diisi")

  const result = await submitProduct(tenantUuid, tenantEmail, data)

  await sendBarcodeEmail({
    email: result.tenantEmail,
    productName: result.product.name,
    companyName: result.product.name,
    licenseCode: result.licenseCode,
    licensePageUrl: result.licensePageUrl,
    barcodeDataUrl: result.barcodeDataUrl,
    qrCodeDataUrl: result.qrCodeDataUrl,
  })

  return {
    licenseCode: result.licenseCode,
    licensePageUrl: result.licensePageUrl,
    qrCodeDataUrl: result.qrCodeDataUrl,
    barcodeDataUrl: result.barcodeDataUrl,
  }
}

export const updateProductBasicController = async (
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
  if (data.name === "") throw new Error("Nama produk tidak boleh kosong")
  return await updateProductBasic(uuid, data)
}

export const softDeleteProductImageController = async (imageUuid: string) => {
  return await softDeleteProductImage(imageUuid)
}

export const updateNutritionController = async (
  productUuid: string,
  data: Parameters<typeof updateNutrition>[1]
) => {
  return await updateNutrition(productUuid, data)
}

export const updateCertificateController = async (
  certificateUuid: string,
  data: {
    number?: string
    registered_at?: Date
    valid_until?: Date
    lab_name?: string
    file?: Buffer
  }
) => {
  return await updateCertificate(certificateUuid, data)
}

export const softDeleteCertificateController = async (certificateUuid: string) => {
  return await softDeleteCertificate(certificateUuid)
}

export const softDeleteServingImageController = async (imageUuid: string) => {
  return await softDeleteServingImage(imageUuid)
}