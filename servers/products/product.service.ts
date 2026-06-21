import prisma from "@/lib/prisma"
import { uploadImage, deleteImage } from "@/configs/cloudinary/utils"
import { generateLicensesCode, generateQRCode, generateBarcode } from "@/lib/utils"
import { ProductCategory, WeightUnits, CertificateType } from "@prisma/client"

export const findProductByUuid = async (uuid: string) => {
  return await prisma.product.findUnique({
    where: { uuid, deleted_at: null },
    include: {
      images: { where: { deleted_at: null } },
      nutrition_info: true,
      certificates: { where: { deleted_at: null } },
      serving: {
        include: {
          images: { where: { deleted_at: null } },
        },
      },
    },
  })
}

export const findProductsByTenantUuid = async (tenantUuid: string) => {
  return await prisma.product.findMany({
    where: {
      tenant: { uuid: tenantUuid },
      deleted_at: null,
    },
    select: {
      uuid: true,
      name: true,
      type: true,
      license_code: true,
      qr_code_url: true,
      created_at: true,
      certificates: {
        select: { type: true },
      },
    },
    orderBy: { created_at: "desc" },
  })
}

export const addProductImages = async (uuid: string, files: Buffer[]) => {
  const product = await prisma.product.findUnique({
    where: { uuid, deleted_at: null },
    include: {
      images: { where: { deleted_at: null } },
    },
  })
  if (!product) throw new Error("Produk tidak ditemukan")
  if (product.images.length + files.length > 5) throw new Error("Maksimal 5 foto produk")

  const uploaded = await Promise.all(
    files.map((file) => uploadImage(file, "products"))
  )

  return await prisma.productImage.createMany({
    data: uploaded.map((result) => ({
      product_id: product.id,
      url: result.secure_url,
      public_id: result.public_id,
    })),
  })
}

export const addServingImages = async (productUuid: string, files: Buffer[]) => {
  const serving = await prisma.productServing.findFirst({
    where: { product: { uuid: productUuid } },
    include: { images: { where: { deleted_at: null } } },
  })
  if (!serving) throw new Error("Data penyajian tidak ditemukan")
  if (serving.images.length + files.length > 5) throw new Error("Maksimal 5 foto penyajian")

  const uploaded = await Promise.all(
    files.map((file) => uploadImage(file, "products"))
  )

  return await prisma.productServingImage.createMany({
    data: uploaded.map((result) => ({
      serving_id: serving.id,
      url: result.secure_url,
      public_id: result.public_id,
    })),
  })
}

export const addCertificate = async (
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
  const product = await prisma.product.findUnique({ where: { uuid: productUuid, deleted_at: null } })
  if (!product) throw new Error("Produk tidak ditemukan")

  let certificateUrl = null
  let certificatePublicId = null

  if (data.file) {
    const result = await uploadImage(data.file, "certifications")
    certificateUrl = result.secure_url
    certificatePublicId = result.public_id
  }

  return await prisma.certificate.create({
    data: {
      product_id: product.id,
      type: data.type,
      number: data.number,
      registered_at: data.registered_at,
      valid_until: data.valid_until,
      lab_name: data.lab_name,
      certificate_url: certificateUrl,
      certificate_public_id: certificatePublicId,
    },
  })
}

export const updateServing = async (
  productUuid: string,
  data: {
    serving_info?: string
    serving_portion?: string
    storage_info?: string
    video_url?: string
  }
) => {
  const product = await prisma.product.findUnique({ where: { uuid: productUuid, deleted_at: null } })
  if (!product) throw new Error("Produk tidak ditemukan")

  return await prisma.productServing.update({
    where: { product_id: product.id },
    data,
  })
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
  const product = await prisma.product.findUnique({ where: { uuid, deleted_at: null } })
  if (!product) throw new Error("Produk tidak ditemukan")

  return await prisma.product.update({
    where: { uuid },
    data,
  })
}

export const updateNutrition = async (
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
) => {
  const product = await prisma.product.findUnique({ where: { uuid: productUuid, deleted_at: null } })
  if (!product) throw new Error("Produk tidak ditemukan")

  return await prisma.nutritionInfo.update({
    where: { product_id: product.id },
    data,
  })
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
  const cert = await prisma.certificate.findUnique({ where: { uuid: certificateUuid } })
  if (!cert) throw new Error("Sertifikat tidak ditemukan")
  if (cert.deleted_at) throw new Error("Sertifikat sudah dihapus")

  let certificateUrl = cert.certificate_url
  let certificatePublicId = cert.certificate_public_id

  if (data.file) {
    if (cert.certificate_public_id) {
      await deleteImage(cert.certificate_public_id)
    }
    const result = await uploadImage(data.file, "certifications")
    certificateUrl = result.secure_url
    certificatePublicId = result.public_id
  }

  return await prisma.certificate.update({
    where: { uuid: certificateUuid },
    data: {
      number: data.number,
      registered_at: data.registered_at,
      valid_until: data.valid_until,
      lab_name: data.lab_name,
      certificate_url: certificateUrl,
      certificate_public_id: certificatePublicId,
    },
  })
}

export const softDeleteCertificate = async (certificateUuid: string) => {
  const cert = await prisma.certificate.findUnique({ where: { uuid: certificateUuid } })
  if (!cert) throw new Error("Sertifikat tidak ditemukan")
  if (cert.deleted_at) throw new Error("Sertifikat sudah dihapus")

  return await prisma.certificate.update({
    where: { uuid: certificateUuid },
    data: { deleted_at: new Date() },
  })
}

export const softDeleteServingImage = async (imageUuid: string) => {
  const image = await prisma.productServingImage.findUnique({ where: { uuid: imageUuid } })
  if (!image) throw new Error("Foto tidak ditemukan")
  if (image.deleted_at) throw new Error("Foto sudah dihapus")

  return await prisma.productServingImage.update({
    where: { uuid: imageUuid },
    data: { deleted_at: new Date() },
  })
}

export const softDeleteProductImage = async (imageUuid: string) => {
  const image = await prisma.productImage.findUnique({ where: { uuid: imageUuid } })
  if (!image) throw new Error("Foto tidak ditemukan")
  if (image.deleted_at) throw new Error("Foto sudah dihapus")

  return await prisma.productImage.update({
    where: { uuid: imageUuid },
    data: { deleted_at: new Date() },
  })
}

export const softDeleteProduct = async (uuid: string) => {
  const product = await prisma.product.findUnique({
    where: { uuid },
    include: {
      images: true,
      serving: { include: { images: true } },
      certificates: true,
    },
  })
  if (!product) throw new Error("Produk tidak ditemukan")
  if (product.deleted_at) throw new Error("Produk sudah dihapus")

  return await prisma.product.update({
    where: { uuid },
    data: { deleted_at: new Date() },
  })
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
  const tenant = await prisma.tenant.findFirst({
    where: { user: { uuid: tenantUuid } },
  })

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