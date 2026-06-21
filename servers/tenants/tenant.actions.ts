"use server"

import {
  getTenantController,
  updateTenantController,
  uploadTenantLogoController,
  uploadTenantPlaceController,
  deleteTenantLogoController,
  deleteTenantPlaceController,
  getTenantEmailController,
} from "./tenant.controller"

export const getTenant = async (userUuid: string) => {
  return await getTenantController(userUuid)
}

export const updateTenant = async (
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
  return await updateTenantController(userUuid, data)
}

export const uploadTenantLogo = async (userUuid: string, file: Buffer) => {
  return await uploadTenantLogoController(userUuid, file)
}

export const uploadTenantPlace = async (userUuid: string, file: Buffer) => {
  return await uploadTenantPlaceController(userUuid, file)
}

export const deleteTenantLogo = async (userUuid: string) => {
  return await deleteTenantLogoController(userUuid)
}

export const deleteTenantPlace = async (userUuid: string) => {
  return await deleteTenantPlaceController(userUuid)
}

export const getTenantEmail = async (userUuid: string) => {
  return await getTenantEmailController(userUuid)
}