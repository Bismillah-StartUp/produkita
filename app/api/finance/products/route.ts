import { NextResponse } from "next/server"
import { getAuthCookie } from "@/lib/auth/token"
import { productsFinanceApi } from "@/lib/finance/api"

export async function GET() {
  const token = await getAuthCookie()
  if (!token) return NextResponse.json({ ok: false, error: "Unauthorized" }, { status: 401 })

  const res = await productsFinanceApi(token)
  if (!res.success) {
    return NextResponse.json({ ok: false, error: res.error ?? "Gagal memuat produk" }, { status: 400 })
  }

  return NextResponse.json({ ok: true, data: res.data ?? [] })
}
