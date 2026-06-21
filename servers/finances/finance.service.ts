import prisma from "@/lib/prisma"
import { TransactionType } from "@prisma/client"


export const createFinancialRecord = async (
  tenantUuid: string,
  data: {
    product_id?: number
    product_name: string
    transaction_type: TransactionType
    amount: number
    transaction_date: Date
    notes?: string
  }
) => {
  const tenant = await prisma.tenant.findFirst({
    where: { user: { uuid: tenantUuid } },
  })
  if (!tenant) throw new Error("Tenant tidak ditemukan")

  return await prisma.financialRecord.create({
    data: {
      tenant_id: tenant.id,
      ...data,
    },
  })
}

export const getFinanceByUUID = async (cuid: string, tenantUuid: string) => {
  return await prisma.financialRecord.findFirst({
    where: {
      cuid,
      tenant: { user: { uuid: tenantUuid } },
    },
  })
}

export const getFinancialSummary = async (tenantUuid: string, year: number, month: number) => {
  const startDate = new Date(year, month - 1, 1)
  const endDate = new Date(year, month, 0, 23, 59, 59)

  const records = await prisma.financialRecord.findMany({
    where: {
      tenant: { uuid: tenantUuid },
      transaction_date: { gte: startDate, lte: endDate },
    },
    select: {
      transaction_type: true,
      amount: true,
    },
  })

  const totalIncome = records
    .filter((r) => r.transaction_type === "income")
    .reduce((sum, r) => sum + r.amount, 0)

  const totalExpense = records
    .filter((r) => r.transaction_type === "expense")
    .reduce((sum, r) => sum + r.amount, 0)

  const netProfit = totalIncome - totalExpense
  const profitMargin = totalIncome > 0 ? (netProfit / totalIncome) * 100 : 0

  return {
    totalIncome,
    totalExpense,
    netProfit,
    profitMargin: Math.round(profitMargin * 10) / 10,
  }
}

export const getTransactionDatesInMonth = async (
  tenantUuid: string,
  year: number,
  month: number
) => {
  const startDate = new Date(year, month - 1, 1)
  const endDate = new Date(year, month, 0, 23, 59, 59)

  const records = await prisma.financialRecord.findMany({
    where: {
      tenant: { uuid: tenantUuid },
      transaction_date: { gte: startDate, lte: endDate },
    },
    select: { transaction_date: true },
  })

  // return array of unique dates (day number)
  const dates = records.map((r) => new Date(r.transaction_date).getDate())
  return [...new Set(dates)]
}

export const getFinancialRecords = async (
  tenantUuid: string,
  year: number,
  month: number
) => {
  const startDate = new Date(year, month - 1, 1)
  const endDate = new Date(year, month, 0, 23, 59, 59)

  return await prisma.financialRecord.findMany({
    where: {
      tenant: { uuid: tenantUuid },
      transaction_date: { gte: startDate, lte: endDate },
    },
    select: {
      id: true,
      cuid: true, 
      product_name: true,
      transaction_type: true,
      amount: true,
      transaction_date: true,
      notes: true,
      product: {
        select: { uuid: true, name: true },
      },
    },
    orderBy: { transaction_date: "desc" },
  })
}

export const getFinancialChart = async (
  tenantUuid: string,
  year: number,
  month: number
) => {
  const startDate = new Date(year, month - 1, 1)
  const endDate = new Date(year, month, 0, 23, 59, 59)

  const records = await prisma.financialRecord.findMany({
    where: {
      tenant: { uuid: tenantUuid },
      transaction_date: { gte: startDate, lte: endDate },
    },
    select: {
      transaction_type: true,
      amount: true,
      transaction_date: true,
    },
    orderBy: { transaction_date: "asc" },
  })

  // group by date
  const grouped: Record<number, { income: number; expense: number }> = {}

  for (const record of records) {
    const day = new Date(record.transaction_date).getDate()
    if (!grouped[day]) grouped[day] = { income: 0, expense: 0 }

    if (record.transaction_type === "income") {
      grouped[day].income += record.amount
    } else {
      grouped[day].expense += record.amount
    }
  }

  // return array per day
  const daysInMonth = new Date(year, month, 0).getDate()
  return Array.from({ length: daysInMonth }, (_, i) => ({
    day: i + 1,
    income: grouped[i + 1]?.income ?? 0,
    expense: grouped[i + 1]?.expense ?? 0,
  }))
}

export const getTenantProducts = async (tenantUuid: string) => {
  return await prisma.product.findMany({
    where: {
      tenant: { uuid: tenantUuid },
      deleted_at: null,
    },
    select: {
      id: true,
      uuid: true,
      name: true,
    },
    orderBy: { name: "asc" },
  })
}

export const updateFinancialRecord = async (
  id: string,
  tenantUuid: string,
  data: {
    product_id?: number | null
    product_name?: string
    transaction_type?: TransactionType
    amount?: number
    transaction_date?: Date
    notes?: string
  }
) => {
  const record = await prisma.financialRecord.findFirst({
    where: { id, tenant: { uuid: tenantUuid } },
  })
  if (!record) throw new Error("Transaksi tidak ditemukan")

  return await prisma.financialRecord.update({
    where: { id },
    data,
  })
}


export const deleteFinancialRecord = async (id: string, tenantUuid: string) => {
  const record = await prisma.financialRecord.findFirst({
    where: { id, tenant: { uuid: tenantUuid } },
  })
  if (!record) throw new Error("Transaksi tidak ditemukan")

  return await prisma.financialRecord.delete({ where: { id } })
}

export const getFinancialRecordsForExport = async (
  tenantUuid: string,
  year: number,
  month: number
) => {
  const startDate = new Date(year, month - 1, 1)
  const endDate = new Date(year, month, 0, 23, 59, 59)

  return await prisma.financialRecord.findMany({
    where: {
      tenant: { uuid: tenantUuid },
      transaction_date: { gte: startDate, lte: endDate },
    },
    select: {
      product_name: true,
      transaction_type: true,
      amount: true,
      transaction_date: true,
      notes: true,
    },
    orderBy: { transaction_date: "asc" },
  })
}