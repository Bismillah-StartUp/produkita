type ApiEnvelope<T> = {
  success: boolean
  message?: string
  data?: T
  error?: string
}

export type FinancialRecordData = {
  id: number
  cuid: string
  tenant_id: number
  product_id: number | null
  product_name: string
  transaction_type: string
  amount: number
  transaction_date: string
  notes: string | null
  created_at: string
  updated_at: string
  product?: { id: number; uuid: string; name: string } | null
}

export type FinancialSummaryData = {
  totalIncome: number
  totalExpense: number
  netProfit: number
  profitMargin: number
}

export type FinancialChartPointData = {
  day: number
  income: number
  expense: number
}

export type FinancialDashboardData = {
  summary: FinancialSummaryData
  prevSummary: FinancialSummaryData
  chartData: FinancialChartPointData[]
  transactionDates: number[]
  records: FinancialRecordData[]
}

export type ProductOptionData = {
  id: number
  uuid: string
  name: string
}

export type FinancialRecordCreatePayload = {
  product_id?: number | null
  product_name: string
  transaction_type: string
  amount: number
  transaction_date: string
  notes?: string
}

export type FinancialRecordUpdatePayload = Partial<FinancialRecordCreatePayload>

const BACKEND_API_URL = process.env.BACKEND_API_URL!
const BACKEND_API_KEY = process.env.BACKEND_API_KEY!
const API_VERSION = "v1"

async function callFinanceApi<T>(path: string, token: string, method: string, body?: unknown): Promise<ApiEnvelope<T>> {
  const res = await fetch(`${BACKEND_API_URL}/${API_VERSION}/finance${path}`, {
    method,
    headers: {
      "Content-Type": "application/json",
      "X-Api-Key": BACKEND_API_KEY,
      Authorization: `Bearer ${token}`,
    },
    body: body ? JSON.stringify(body) : undefined,
    cache: "no-store",
  })

  return (await res.json()) as ApiEnvelope<T>
}

export const createFinanceApi = (token: string, data: FinancialRecordCreatePayload) => {
  return callFinanceApi<FinancialRecordData>("", token, "POST", data)
}

export const getFinanceApi = (token: string, cuid: string) => {
  return callFinanceApi<FinancialRecordData>(`/${cuid}`, token, "GET")
}

export const listFinanceApi = (token: string, year: number, month: number) => {
  return callFinanceApi<FinancialRecordData[]>(`?year=${year}&month=${month}`, token, "GET")
}

export const summaryFinanceApi = (token: string, year: number, month: number) => {
  return callFinanceApi<FinancialSummaryData>(`/summary?year=${year}&month=${month}`, token, "GET")
}

export const datesFinanceApi = (token: string, year: number, month: number) => {
  return callFinanceApi<number[]>(`/dates?year=${year}&month=${month}`, token, "GET")
}

export const chartFinanceApi = (token: string, year: number, month: number) => {
  return callFinanceApi<FinancialChartPointData[]>(`/chart?year=${year}&month=${month}`, token, "GET")
}

export const dashboardFinanceApi = (
  token: string,
  year: number,
  month: number,
  prevYear: number,
  prevMonth: number
) => {
  return callFinanceApi<FinancialDashboardData>(
    `/dashboard?year=${year}&month=${month}&prev_year=${prevYear}&prev_month=${prevMonth}`,
    token,
    "GET"
  )
}

export const productsFinanceApi = (token: string) => {
  return callFinanceApi<ProductOptionData[]>("/products", token, "GET")
}

export const updateFinanceApi = (token: string, cuid: string, data: FinancialRecordUpdatePayload) => {
  return callFinanceApi<FinancialRecordData>(`/${cuid}`, token, "PUT", data)
}

export const deleteFinanceApi = (token: string, cuid: string) => {
  return callFinanceApi<{ deleted: boolean }>(`/${cuid}`, token, "DELETE")
}

export const exportFinanceApi = async (token: string, year: number, month: number) => {
  return fetch(`${BACKEND_API_URL}/${API_VERSION}/finance/export?year=${year}&month=${month}`, {
    method: "GET",
    headers: {
      "X-Api-Key": BACKEND_API_KEY,
      Authorization: `Bearer ${token}`,
    },
    cache: "no-store",
  })
}
