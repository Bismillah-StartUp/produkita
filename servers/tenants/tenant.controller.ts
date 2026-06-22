import {
  findTenantByUserUuid,
  updateTenantProfile,
  uploadTenantLogo,
  uploadTenantPlace,
  deleteTenantLogo,
  deleteTenantPlace,
  getTenantEmail,
} from "./tenant.service"

export const getTenantController = async (userUuid: string) => {
  const tenant = await findTenantByUserUuid(userUuid)
  if (!tenant) throw new Error("Tenant tidak ditemukan")
  return tenant
}

export const updateTenantController = async (
  userUuid: string,
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
  const tenant = await findTenantByUserUuid(userUuid)
  if (!tenant) throw new Error("Tenant tidak ditemukan")

  return await updateTenantProfile(tenant.uuid, data)
}

export const uploadTenantLogoController = async (userUuid: string, file: string) => {
  if (!file) throw new Error("File logo wajib diisi")
  const tenant = await findTenantByUserUuid(userUuid)
  if (!tenant) throw new Error("Tenant tidak ditemukan")
  return await uploadTenantLogo(tenant.uuid, file)
}

export const uploadTenantPlaceController = async (userUuid: string, file: string) => {
  if (!file) throw new Error("File foto tempat wajib diisi")
  const tenant = await findTenantByUserUuid(userUuid)
  if (!tenant) throw new Error("Tenant tidak ditemukan")
  return await uploadTenantPlace(tenant.uuid, file)
}

export const deleteTenantLogoController = async (userUuid: string) => {
  const tenant = await findTenantByUserUuid(userUuid)
  if (!tenant) throw new Error("Tenant tidak ditemukan")

  return await deleteTenantLogo(tenant.uuid)
}

export const deleteTenantPlaceController = async (userUuid: string) => {
  const tenant = await findTenantByUserUuid(userUuid)
  if (!tenant) throw new Error("Tenant tidak ditemukan")

  return await deleteTenantPlace(tenant.uuid)
}

export const getTenantEmailController = async (userUuid: string) => {
  return await getTenantEmail(userUuid)
}