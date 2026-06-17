"use client"

import { useState } from "react"
import {
  createFinancialRecord,
  getFinancialSummary,
  getTransactionDates,
  getFinancialRecords,
  getFinancialChart,
  getTenantProducts,
  updateFinancialRecord,
  deleteFinancialRecord,
  exportFinancialRecords,
} from "@/servers/finances/finance.actions"
import { TransactionType } from "@prisma/client"

export const useFinance = () => {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handle = async <T>(fn: () => Promise<T>): Promise<T | null> => {
    setLoading(true)
    setError(null)
    try {
      return await fn()
    } catch (err: any) {
      setError(err.message)
      return null
    } finally {
      setLoading(false)
    }
  }

  const handleCreateFinancialRecord = async (
    tenantUuid: string,
    data: {
      product_id?: number
      product_name: string
      transaction_type: TransactionType
      amount: number
      transaction_date: Date
      notes?: string
    }
  ) => handle(() => createFinancialRecord(tenantUuid, data))

  const handleGetFinancialSummary = async (tenantUuid: string, year: number, month: number) =>
    handle(() => getFinancialSummary(tenantUuid, year, month))

  const handleGetTransactionDates = async (tenantUuid: string, year: number, month: number) =>
    handle(() => getTransactionDates(tenantUuid, year, month))

  const handleGetFinancialRecords = async (tenantUuid: string, year: number, month: number) =>
    handle(() => getFinancialRecords(tenantUuid, year, month))

  const handleGetFinancialChart = async (tenantUuid: string, year: number, month: number) =>
    handle(() => getFinancialChart(tenantUuid, year, month))

  const handleGetTenantProducts = async (tenantUuid: string) =>
    handle(() => getTenantProducts(tenantUuid))

  const handleUpdateFinancialRecord = async (
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
  ) => handle(() => updateFinancialRecord(id, tenantUuid, data))

  const handleDeleteFinancialRecord = async (id: string, tenantUuid: string) =>
    handle(() => deleteFinancialRecord(id, tenantUuid))

  const handleExportFinancialRecords = async (
    tenantUuid: string,
    year: number,
    month: number
  ) =>
    handle(async () => {
      const buffer = await exportFinancialRecords(tenantUuid, year, month)
      const blob = new Blob([buffer], {
        type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      })
      const url = URL.createObjectURL(blob)
      const a = document.createElement("a")
      a.href = url
      a.download = `laporan-keuangan-${year}-${month}.xlsx`
      a.click()
      URL.revokeObjectURL(url)
    })

  return {
    loading,
    error,
    createFinancialRecord: handleCreateFinancialRecord,
    getFinancialSummary: handleGetFinancialSummary,
    getTransactionDates: handleGetTransactionDates,
    getFinancialRecords: handleGetFinancialRecords,
    getFinancialChart: handleGetFinancialChart,
    getTenantProducts: handleGetTenantProducts,
    updateFinancialRecord: handleUpdateFinancialRecord,
    deleteFinancialRecord: handleDeleteFinancialRecord,
    exportFinancialRecords: handleExportFinancialRecords,
  }
}