import {
  createFinancialRecord,
  getFinancialSummary,
  getTransactionDatesInMonth,
  getFinancialRecords,
  getFinancialChart,
  getTenantProducts,
  updateFinancialRecord,
  deleteFinancialRecord,
  getFinancialRecordsForExport,
} from "./finance.service"
import { TransactionType } from "@prisma/client"
import ExcelJS from "exceljs"

export const createFinancialRecordController = async (
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
  if (!data.product_name) throw new Error("Nama / keterangan wajib diisi")
  if (!data.amount || data.amount <= 0) throw new Error("Jumlah wajib diisi dan lebih dari 0")
  if (!data.transaction_date) throw new Error("Tanggal wajib diisi")
  if (!data.transaction_type) throw new Error("Tipe transaksi wajib diisi")

  return await createFinancialRecord(tenantUuid, data)
}

export const getFinancialSummaryController = async (
  tenantUuid: string,
  year: number,
  month: number
) => {
  return await getFinancialSummary(tenantUuid, year, month)
}

export const getTransactionDatesController = async (
  tenantUuid: string,
  year: number,
  month: number
) => {
  return await getTransactionDatesInMonth(tenantUuid, year, month)
}

export const getFinancialRecordsController = async (
  tenantUuid: string,
  year: number,
  month: number
) => {
  return await getFinancialRecords(tenantUuid, year, month)
}

export const getFinancialChartController = async (
  tenantUuid: string,
  year: number,
  month: number
) => {
  return await getFinancialChart(tenantUuid, year, month)
}

export const getTenantProductsController = async (tenantUuid: string) => {
  return await getTenantProducts(tenantUuid)
}

export const updateFinancialRecordController = async (
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
  if (data.product_name === "") throw new Error("Nama / keterangan tidak boleh kosong")
  if (data.amount !== undefined && data.amount <= 0) throw new Error("Jumlah harus lebih dari 0")

  return await updateFinancialRecord(id, tenantUuid, data)
}

export const deleteFinancialRecordController = async (id: string, tenantUuid: string) => {
  return await deleteFinancialRecord(id, tenantUuid)
}

export const exportFinancialRecordsController = async (
  tenantUuid: string,
  year: number,
  month: number
) => {
  const records = await getFinancialRecordsForExport(tenantUuid, year, month)

  const workbook = new ExcelJS.Workbook()
  const sheet = workbook.addWorksheet("Laporan Keuangan")

  sheet.columns = [
    { header: "Nama / Keterangan", key: "product_name", width: 30 },
    { header: "Tipe", key: "transaction_type", width: 15 },
    { header: "Jumlah (Rp)", key: "amount", width: 20 },
    { header: "Tanggal", key: "transaction_date", width: 20 },
    { header: "Catatan", key: "notes", width: 30 },
  ]

  for (const record of records) {
    sheet.addRow({
      product_name: record.product_name,
      transaction_type: record.transaction_type === "income" ? "Masuk" : "Keluar",
      amount: record.amount,
      transaction_date: new Date(record.transaction_date).toLocaleDateString("id-ID"),
      notes: record.notes ?? "",
    })
  }

  // styling header
  sheet.getRow(1).font = { bold: true }
  sheet.getRow(1).fill = {
    type: "pattern",
    pattern: "solid",
    fgColor: { argb: "FF2563EB" },
  }
  sheet.getRow(1).font = { bold: true, color: { argb: "FFFFFFFF" } }

  const buffer = await workbook.xlsx.writeBuffer()
  return Buffer.from(buffer)
}