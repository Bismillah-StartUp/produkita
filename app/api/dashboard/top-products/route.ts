import { NextRequest, NextResponse } from "next/server"
import { getAuthCookie } from "@/lib/auth/token"
import { getTopProductsApi } from "@/lib/dashboard/api"

export async function GET(request: NextRequest) {
  const token = await getAuthCookie()
  if (!token) return NextResponse.json({ ok: false, error: "Unauthorized" }, { status: 401 })

  const limit = Number(new URL(request.url).searchParams.get("limit") ?? 6)
  const res = await getTopProductsApi(token, limit)
  if (!res.success) {
    return NextResponse.json({ ok: false, error: res.error ?? "Gagal memuat produk terpopuler" }, { status: 400 })
  }
  return NextResponse.json({ ok: true, data: res.data ?? [] })
}
