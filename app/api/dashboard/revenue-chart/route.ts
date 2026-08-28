import { NextRequest, NextResponse } from "next/server"
import { getAuthCookie } from "@/lib/auth/token"
import { getRevenueChartApi } from "@/lib/dashboard/api"

export async function GET(request: NextRequest) {
  const token = await getAuthCookie()
  if (!token) return NextResponse.json({ ok: false, error: "Unauthorized" }, { status: 401 })

  const months = Number(new URL(request.url).searchParams.get("months") ?? 6)
  const res = await getRevenueChartApi(token, months)
  if (!res.success) {
    return NextResponse.json({ ok: false, error: res.error ?? "Gagal memuat grafik" }, { status: 400 })
  }
  return NextResponse.json({ ok: true, data: res.data ?? [] })
}
