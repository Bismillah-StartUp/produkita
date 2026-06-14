import prisma from "@/lib/prisma"
import { uploadImage, deleteImage } from "@/configs/cloudinary/utils"

export const findTenantByUserUuid = async (userUuid: string) => {
  return await prisma.tenant.findFirst({
    where: { user: { uuid: userUuid } },
  })
}

export const findTenantByUuid = async (uuid: string) => {
  return await prisma.tenant.findUnique({ where: { uuid } })
}

export const updateTenantProfile = async (
  uuid: string,
  data: {
    name?: string
    trade_name?: string
    business_field?: string
    npwp?: string
    description?: string
    address?: string
    city?: string
    postal_code?: string
    province?: string
    latitude?: number
    longitude?: number
    email?: string
    phonenumber?: string
    website?: string
    year?: number
  }
) => {
  return await prisma.tenant.update({
    where: { uuid },
    data,
  })
}

export const uploadTenantLogo = async (uuid: string, file: Buffer) => {
  const tenant = await findTenantByUuid(uuid)
  if (!tenant) throw new Error("Tenant tidak ditemukan")

  if (tenant.logo_public_id) {
    await deleteImage(tenant.logo_public_id)
  }

  const result = await uploadImage(file, "tenants")

  return await prisma.tenant.update({
    where: { uuid },
    data: {
      logo_url: result.secure_url,
      logo_public_id: result.public_id,
    },
  })
}

export const uploadTenantPlace = async (uuid: string, file: Buffer) => {
  const tenant = await findTenantByUuid(uuid)
  if (!tenant) throw new Error("Tenant tidak ditemukan")

  if (tenant.place_public_id) {
    await deleteImage(tenant.place_public_id)
  }

  const result = await uploadImage(file, "tenants")

  return await prisma.tenant.update({
    where: { uuid },
    data: {
      place_url: result.secure_url,
      place_public_id: result.public_id,
    },
  })
}

export const deleteTenantLogo = async (uuid: string) => {
  const tenant = await findTenantByUuid(uuid)
  if (!tenant) throw new Error("Tenant tidak ditemukan")
  if (!tenant.logo_public_id) throw new Error("Logo tidak ada")

  await deleteImage(tenant.logo_public_id)

  return await prisma.tenant.update({
    where: { uuid },
    data: {
      logo_url: null,
      logo_public_id: null,
    },
  })
}

export const deleteTenantPlace = async (uuid: string) => {
  const tenant = await findTenantByUuid(uuid)
  if (!tenant) throw new Error("Tenant tidak ditemukan")
  if (!tenant.place_public_id) throw new Error("Foto tempat tidak ada")

  await deleteImage(tenant.place_public_id)

  return await prisma.tenant.update({
    where: { uuid },
    data: {
      place_url: null,
      place_public_id: null,
    },
  })
}