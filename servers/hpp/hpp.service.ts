import prisma from "@/lib/prisma"
import { HppCategory, HppMethod } from "@prisma/client"
import { logActivity } from "@/servers/dashboard/dashboard.service"

export const findHppsByTenantUuid = async (tenantUuid: string) => {
  return await prisma.hppCalculation.findMany({
    where: { tenant: { user: { uuid: tenantUuid } } },
    select: {
      uuid: true,
      product_name: true,
      production_unit: true,
      production_qty: true,
      calculation_method: true,
      margin_percentage: true,
      total_hpp: true,
      hpp_per_unit: true,
      recommended_price: true,
      total_profit: true,
      total_revenue: true,
      created_at: true,
      updated_at: true,
    },
    orderBy: { created_at: "desc" },
  })
}

export const findHppByUuid = async (uuid: string, tenantUuid: string) => {
  return await prisma.hppCalculation.findFirst({
    where: { uuid, tenant: { user: { uuid: tenantUuid } } },
    include: { items: true },
  })
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
  const tenant = await prisma.tenant.findFirst({
    where: { user: { uuid: tenantUuid } },
  })
  if (!tenant) throw new Error("Tenant tidak ditemukan")

  const calculation = await prisma.hppCalculation.create({
    data: {
      tenant_id: tenant.id,
      product_name: data.product_name,
      production_unit: data.production_unit,
      production_qty: data.production_qty,
      calculation_method: data.calculation_method,
      margin_percentage: data.margin_percentage,
      total_hpp: data.total_hpp,
      hpp_per_unit: data.hpp_per_unit,
      recommended_price: data.recommended_price,
      total_profit: data.total_profit,
      total_revenue: data.total_revenue,
      items: {
        create: data.items,
      },
    },
    include: { items: true },
  })

  await logActivity(
    tenant.id,
    "hpp",
    `Kalkulasi HPP dijalankan, margin ${data.margin_percentage}%`
  )

  return calculation
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
  const existing = await findHppByUuid(uuid, tenantUuid)
  if (!existing) throw new Error("Kalkulasi tidak ditemukan")

  const updated = await prisma.hppCalculation.update({
    where: { uuid },
    data: {
      product_name: data.product_name,
      production_unit: data.production_unit,
      production_qty: data.production_qty,
      calculation_method: data.calculation_method,
      margin_percentage: data.margin_percentage,
      total_hpp: data.total_hpp,
      hpp_per_unit: data.hpp_per_unit,
      recommended_price: data.recommended_price,
      total_profit: data.total_profit,
      total_revenue: data.total_revenue,
      items: {
        deleteMany: {},
        create: data.items,
      },
    },
    include: { items: true },
  })

  await logActivity(existing.tenant_id, "hpp", `Kalkulasi HPP "${updated.product_name}" diperbarui`)

  return updated
}

export const deleteHpp = async (uuid: string, tenantUuid: string) => {
  const existing = await findHppByUuid(uuid, tenantUuid)
  if (!existing) throw new Error("Kalkulasi tidak ditemukan")

  const deleted = await prisma.hppCalculation.delete({ where: { uuid } })

  await logActivity(existing.tenant_id, "hpp", `Kalkulasi HPP "${existing.product_name}" dihapus`)

  return deleted
}