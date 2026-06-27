"use server"

import {
  getHppsController,
  getHppController,
  createHppController,
  updateHppController,
  deleteHppController,
} from "./hpp.controller"
import { HppMethod, HppCategory } from "@prisma/client"

export const getHpps = async (tenantUuid: string) => {
  return await getHppsController(tenantUuid)
}

export const getHpp = async (uuid: string, tenantUuid: string) => {
  return await getHppController(uuid, tenantUuid)
}

export const createHpp = async (
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
  return await createHppController(tenantUuid, data)
}

export const updateHpp = async (
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
  return await updateHppController(uuid, tenantUuid, data)
}

export const deleteHpp = async (uuid: string, tenantUuid: string) => {
  return await deleteHppController(uuid, tenantUuid)
}