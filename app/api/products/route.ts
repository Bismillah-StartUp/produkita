import { NextResponse } from "next/server"
import { getAuthCookie } from "@/lib/auth/token"
import { listProductsApi, submitProductApi } from "@/lib/product/api"

export async function GET() {
  const token = await getAuthCookie()
  if (!token) return NextResponse.json({ ok: false, error: "Unauthorized" }, { status: 401 })

  const res = await listProductsApi(token)
  if (!res.success) {
    return NextResponse.json({ ok: false, error: res.error ?? "Gagal memuat produk" }, { status: 400 })
  }
  return NextResponse.json({ ok: true, data: res.data ?? [] })
}

export async function POST(request: Request) {
  const token = await getAuthCookie()
  if (!token) return NextResponse.json({ ok: false, error: "Unauthorized" }, { status: 401 })

  const body = await request.json()
  const res = await submitProductApi(token, body)
  if (!res.success || !res.data) {
    return NextResponse.json({ ok: false, error: res.error ?? "Gagal mendaftarkan produk" }, { status: 400 })
  }
  return NextResponse.json({ ok: true, data: res.data })
}
