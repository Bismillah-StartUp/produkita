import prisma from "@/lib/prisma"
import { uploadImage, deleteImage } from "@/configs/cloudinary/utils"
import { generateLicensesCode, generateQRCode, generateBarcode } from "@/lib/utils"
import { logActivity } from "@/servers/dashboard/dashboard.service"
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
      tenant: { user: { uuid: tenantUuid } },
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
      _count: {
        select: { views: true },
      },
    },
    orderBy: { created_at: "desc" },
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

  const updated = await prisma.product.update({
    where: { uuid },
    data,
  })

  await logActivity(product.tenant_id, "product", `Produk "${updated.name}" diperbarui`)

  return updated
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
  const cert = await prisma.certificate.findUnique({
    where: { uuid: certificateUuid },
    include: { product: { select: { name: true, tenant_id: true } } },
  })
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

  const updated = await prisma.certificate.update({
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

  await logActivity(
    cert.product.tenant_id,
    "certificate",
    `Sertifikat ${cert.type.toUpperCase()} "${cert.product.name}" diperbarui`
  )

  return updated
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
      images: { where: { deleted_at: null } },
      serving: { include: { images: { where: { deleted_at: null } } } },
      certificates: { where: { deleted_at: null } },
    },
  })
  if (!product) throw new Error("Produk tidak ditemukan")
  if (product.deleted_at) throw new Error("Produk sudah dihapus")

  const now = new Date()

  const updatedProduct = await prisma.$transaction(async (tx) => {
    await tx.product.update({
      where: { uuid },
      data: { deleted_at: now },
    })

    if (product.images.length > 0) {
      await tx.productImage.updateMany({
        where: { id: { in: product.images.map((img) => img.id) } },
        data: { deleted_at: now },
      })
    }

    if (product.certificates.length > 0) {
      await tx.certificate.updateMany({
        where: { id: { in: product.certificates.map((cert) => cert.id) } },
        data: { deleted_at: now },
      })
    }

    if (product.serving?.images.length) {
      await tx.productServingImage.updateMany({
        where: { id: { in: product.serving.images.map((img) => img.id) } },
        data: { deleted_at: now },
      })
    }

    return tx.product.findUniqueOrThrow({ where: { uuid } })
  })

  const publicIdsToDelete = [
    ...product.images.map((img) => img.public_id),
    ...product.certificates
      .map((cert) => cert.certificate_public_id)
      .filter((id): id is string => !!id),
    ...(product.serving?.images.map((img) => img.public_id) ?? []),
  ]

  await Promise.allSettled(publicIdsToDelete.map((publicId) => deleteImage(publicId)))

  return updatedProduct
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

  const uploadedPublicIds = [
    ...uploadedProductImages.map((r) => r.public_id),
    ...uploadedCertFiles.filter((r): r is NonNullable<typeof r> => !!r).map((r) => r.public_id),
    ...uploadedServingImages.map((r) => r.public_id),
  ]

  // 4. simpan semua ke DB dalam satu transaksi; rollback upload Cloudinary kalau gagal
  let product
  try {
    product = await prisma.$transaction(async (tx) => {
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
  } catch (err) {
    await Promise.allSettled(uploadedPublicIds.map((publicId) => deleteImage(publicId)))
    throw err
  }

  // 5. generate QR + barcode
  let qrCodeDataUrl: string
  let barcodeDataUrl: string
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL ?? "http://localhost:3000"
  const licensePageUrl = `${baseUrl}/licenses/${licenseCode}`
  try {
    qrCodeDataUrl = await generateQRCode(`${licensePageUrl}?source=scan`)
    barcodeDataUrl = await generateBarcode(licensePageUrl)

    // upload ke cloudinary supaya kolom qr_code_url/barcode_url tidak menyimpan base64 raksasa
    const [qrUpload, barcodeUpload] = await Promise.all([
      uploadImage(qrCodeDataUrl.replace(/^data:image\/\w+;base64,/, ""), "products"),
      uploadImage(barcodeDataUrl.replace(/^data:image\/\w+;base64,/, ""), "products"),
    ])
    uploadedPublicIds.push(qrUpload.public_id, barcodeUpload.public_id)

    // 6. simpan QR + barcode ke product
    await prisma.product.update({
      where: { id: product.id },
      data: {
        qr_code_url: qrUpload.secure_url,
        barcode_url: barcodeUpload.secure_url,
      },
    })

    await logActivity(tenant.id, "product", `"${product.name}" berhasil didaftarkan`)
    await logActivity(tenant.id, "qr_code", `QR Code dibuat untuk "${product.name}"`)
  } catch (err) {
    await Promise.allSettled(uploadedPublicIds.map((publicId) => deleteImage(publicId)))
    await prisma.product.update({
      where: { id: product.id },
      data: { deleted_at: new Date() },
    })
    throw err
  }

  return {
    product,
    licenseCode,
    licensePageUrl,
    qrCodeDataUrl,
    barcodeDataUrl,
    tenantEmail,
  }
}