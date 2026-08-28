import { NextResponse } from "next/server"
import { getAuthCookie } from "@/lib/auth/token"
import { getInsightsApi } from "@/lib/dashboard/api"

export async function GET() {
  const token = await getAuthCookie()
  if (!token) return NextResponse.json({ ok: false, error: "Unauthorized" }, { status: 401 })

  const res = await getInsightsApi(token)
  if (!res.success) {
    return NextResponse.json({ ok: false, error: res.error ?? "Gagal memuat insight" }, { status: 400 })
  }
  return NextResponse.json({ ok: true, data: res.data ?? [] })
}
