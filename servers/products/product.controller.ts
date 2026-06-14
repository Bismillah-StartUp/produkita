import {
  findProductByUuid,
  findProductsByTenantUuid,
  deleteProductImage,
  deleteServingImage,
  submitProduct,
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

export const deleteProductImageController = async (imageUuid: string) => {
  return await deleteProductImage(imageUuid)
}

export const deleteServingImageController = async (imageUuid: string) => {
  return await deleteServingImage(imageUuid)
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