import { NextRequest, NextResponse } from "next/server"
import { getAuthCookie } from "@/lib/auth/token"
import { dashboardFinanceApi } from "@/lib/finance/api"

export async function GET(request: NextRequest) {
  const token = await getAuthCookie()
  if (!token) return NextResponse.json({ ok: false, error: "Unauthorized" }, { status: 401 })

  const now = new Date()
  const { searchParams } = new URL(request.url)
  const year = Number(searchParams.get("year") ?? now.getFullYear())
  const month = Number(searchParams.get("month") ?? now.getMonth() + 1)

  let prevMonth = month - 1
  let prevYear = year
  if (prevMonth < 1) {
    prevMonth = 12
    prevYear -= 1
  }
  prevYear = Number(searchParams.get("prev_year") ?? prevYear)
  prevMonth = Number(searchParams.get("prev_month") ?? prevMonth)

  const res = await dashboardFinanceApi(token, year, month, prevYear, prevMonth)
  if (!res.success || !res.data) {
    return NextResponse.json({ ok: false, error: res.error ?? "Gagal memuat dashboard" }, { status: 400 })
  }

  return NextResponse.json({ ok: true, data: res.data })
}
