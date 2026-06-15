import prisma from "@/lib/prisma"
import { uploadImage, deleteImage } from "@/configs/cloudinary/utils"
import { generateLicensesCode, generateQRCode, generateBarcode } from "@/lib/utils"
import { ProductCategory, WeightUnits, CertificateType } from "@prisma/client"

export const findProductByUuid = async (uuid: string) => {
  return await prisma.product.findUnique({
    where: { uuid },
    include: {
      images: true,
      nutrition_info: true,
      certificates: true,
      serving: { include: { images: true } },
    },
  })
}

export const findProductsByTenantUuid = async (tenantUuid: string) => {
  return await prisma.product.findMany({
    where: { tenant: { uuid: tenantUuid } },
    include: { images: true },
    orderBy: { created_at: "desc" },
  })
}

export const deleteProductImage = async (imageUuid: string) => {
  const image = await prisma.productImage.findUnique({ where: { uuid: imageUuid } })
  if (!image) throw new Error("Foto tidak ditemukan")
  await deleteImage(image.public_id)
  return await prisma.productImage.delete({ where: { uuid: imageUuid } })
}

export const deleteServingImage = async (imageUuid: string) => {
  const image = await prisma.productServingImage.findUnique({ where: { uuid: imageUuid } })
  if (!image) throw new Error("Foto tidak ditemukan")
  await deleteImage(image.public_id)
  return await prisma.productServingImage.delete({ where: { uuid: imageUuid } })
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
  const tenant = await prisma.tenant.findUnique({ where: { uuid: tenantUuid } })
  if (!tenant) throw new Error("Tenant tidak ditemukan")

  const licenseCode = generateLicensesCode(data.product.name, data.product.type)

  // 1. upload foto produk
  const uploadedProductImages = await Promise.all(
    data.productImages.map((file) => uploadImage(file, "products"))
  )

  // 2. upload file sertifikat (kalau ada)
  const uploadedCertFiles = await Promise.all(
    data.certificates.map(async (cert) => {
      if (cert.file) {
        return await uploadImage(cert.file, "certifications")
      }
      return null
    })
  )

  // 3. upload foto penyajian (kalau ada)
  const uploadedServingImages = await Promise.all(
    (data.serving.images ?? []).map((file) => uploadImage(file, "products"))
  )

  // 4. simpan semua ke DB dalam satu transaksi
  const product = await prisma.$transaction(async (tx) => {
    // create product
    const product = await tx.product.create({
      data: {
        ...data.product,
        tenant_id: tenant.id,
        license_code: licenseCode,
      },
    })

    // create product images
    if (uploadedProductImages.length > 0) {
      await tx.productImage.createMany({
        data: uploadedProductImages.map((result) => ({
          product_id: product.id,
          url: result.secure_url,
          public_id: result.public_id,
        })),
      })
    }

    // create nutrition
    await tx.nutritionInfo.create({
      data: {
        product_id: product.id,
        ...data.nutrition,
      },
    })

    // create certificates
    for (let i = 0; i < data.certificates.length; i++) {
      const cert = data.certificates[i]
      const uploadedFile = uploadedCertFiles[i]

      await tx.certificate.create({
        data: {
          product_id: product.id,
          type: cert.type,
          number: cert.number,
          registered_at: cert.registered_at,
          valid_until: cert.valid_until,
          lab_name: cert.lab_name,
          certificate_url: uploadedFile?.secure_url ?? null,
          certificate_public_id: uploadedFile?.public_id ?? null,
        },
      })
    }

    // create serving
    const serving = await tx.productServing.create({
      data: {
        product_id: product.id,
        serving_info: data.serving.serving_info,
        serving_portion: data.serving.serving_portion,
        storage_info: data.serving.storage_info,
        video_url: data.serving.video_url,
      },
    })

    // create serving images
    if (uploadedServingImages.length > 0) {
      await tx.productServingImage.createMany({
        data: uploadedServingImages.map((result) => ({
          serving_id: serving.id,
          url: result.secure_url,
          public_id: result.public_id,
        })),
      })
    }

    return product
  })

  // 5. generate QR + barcode
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL ?? "http://localhost:3000"
  const licensePageUrl = `${baseUrl}/licenses/${licenseCode}`
  const qrCodeDataUrl = await generateQRCode(licensePageUrl)
  const barcodeDataUrl = await generateBarcode(licensePageUrl)

  // 6. simpan QR + barcode ke product
  await prisma.product.update({
    where: { id: product.id },
    data: {
      qr_code_url: qrCodeDataUrl,
      barcode_url: barcodeDataUrl,
    },
  })

  return {
    product,
    licenseCode,
    licensePageUrl,
    qrCodeDataUrl,
    barcodeDataUrl,
    tenantEmail,
  }
}