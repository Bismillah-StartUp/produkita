import {
  findHppsByTenantUuid,
  findHppByUuid,
  createHpp,
  updateHpp,
  deleteHpp,
} from "./hpp.service"
import { HppMethod, HppCategory } from "@prisma/client"

export const getHppsController = async (tenantUuid: string) => {
  return await findHppsByTenantUuid(tenantUuid)
}

export const getHppController = async (uuid: string, tenantUuid: string) => {
  const hpp = await findHppByUuid(uuid, tenantUuid)
  if (!hpp) throw new Error("Kalkulasi tidak ditemukan")
  return hpp
}

export const createHppController = async (
  tenantUuid: string,
  data: {
    product_name: string
    production_unit: string
    production_qty: number
    calculation_method: HppMethod
    margin_percentage: number
    total_hpp: number
    hpp_per_unit: number
    recommended_price: number
    total_profit: number
    total_revenue: number
    items: {
      category: HppCategory
      name: string
      unit: string
      quantity: number
      price_per_unit: number
      subtotal: number
    }[]
  }
) => {
  if (!data.product_name) throw new Error("Nama produk wajib diisi")
  if (!data.production_unit) throw new Error("Satuan produksi wajib diisi")
  if (!data.production_qty || data.production_qty <= 0) throw new Error("Jumlah produksi wajib diisi")
  if (data.items.length === 0) throw new Error("Minimal satu item biaya wajib diisi")

  return await createHpp(tenantUuid, data)
}

export const updateHppController = async (
  uuid: string,
  tenantUuid: string,
  data: {
    product_name: string
    production_unit: string
    production_qty: number
    calculation_method: HppMethod
    margin_percentage: number
    total_hpp: number
    hpp_per_unit: number
    recommended_price: number
    total_profit: number
    total_revenue: number
    items: {
      category: HppCategory
      name: string
      unit: string
      quantity: number
      price_per_unit: number
      subtotal: number
    }[]
  }
) => {
  if (!data.product_name) throw new Error("Nama produk wajib diisi")
  if (!data.production_unit) throw new Error("Satuan produksi wajib diisi")
  if (!data.production_qty || data.production_qty <= 0) throw new Error("Jumlah produksi wajib diisi")

  return await updateHpp(uuid, tenantUuid, data)
}

export const deleteHppController = async (uuid: string, tenantUuid: string) => {
  return await deleteHpp(uuid, tenantUuid)
}