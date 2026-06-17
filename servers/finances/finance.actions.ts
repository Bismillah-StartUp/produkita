"use server"

import {
  createFinancialRecordController,
  getFinancialSummaryController,
  getTransactionDatesController,
  getFinancialRecordsController,
  getFinancialChartController,
  getTenantProductsController,
  updateFinancialRecordController,
  deleteFinancialRecordController,
  exportFinancialRecordsController,
} from "./finance.controller"
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
  return await createFinancialRecordController(tenantUuid, data)
}

export const getFinancialSummary = async (
  tenantUuid: string,
  year: number,
  month: number
) => {
  return await getFinancialSummaryController(tenantUuid, year, month)
}

export const getTransactionDates = async (
  tenantUuid: string,
  year: number,
  month: number
) => {
  return await getTransactionDatesController(tenantUuid, year, month)
}

export const getFinancialRecords = async (
  tenantUuid: string,
  year: number,
  month: number
) => {
  return await getFinancialRecordsController(tenantUuid, year, month)
}

export const getFinancialChart = async (
  tenantUuid: string,
  year: number,
  month: number
) => {
  return await getFinancialChartController(tenantUuid, year, month)
}

export const getTenantProducts = async (tenantUuid: string) => {
  return await getTenantProductsController(tenantUuid)
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
  return await updateFinancialRecordController(id, tenantUuid, data)
}

export const deleteFinancialRecord = async (id: string, tenantUuid: string) => {
  return await deleteFinancialRecordController(id, tenantUuid)
}

export const exportFinancialRecords = async (
  tenantUuid: string,
  year: number,
  month: number
) => {
  return await exportFinancialRecordsController(tenantUuid, year, month)
}