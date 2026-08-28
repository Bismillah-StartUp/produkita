import { NextResponse } from "next/server"
import { getAuthCookie } from "@/lib/auth/token"
import { getOverviewStatsApi } from "@/lib/dashboard/api"

export async function GET() {
  const token = await getAuthCookie()
  if (!token) return NextResponse.json({ ok: false, error: "Unauthorized" }, { status: 401 })

  const res = await getOverviewStatsApi(token)
  if (!res.success || !res.data) {
    return NextResponse.json({ ok: false, error: res.error ?? "Gagal memuat ringkasan" }, { status: 400 })
  }
  return NextResponse.json({ ok: true, data: res.data })
}
