import { NextResponse } from "next/server"
import { getAuthCookie } from "@/lib/auth/token"
import { getTenantApi, updateTenantApi } from "@/lib/tenant/api"

export async function GET() {
  const token = await getAuthCookie()
  if (!token) return NextResponse.json({ ok: false, error: "Unauthorized" }, { status: 401 })

  const res = await getTenantApi(token)
  if (!res.success || !res.data) {
    return NextResponse.json({ ok: false, error: res.error ?? "Tenant tidak ditemukan" }, { status: 404 })
  }

  return NextResponse.json({ ok: true, data: res.data })
}

export async function PUT(request: Request) {
  const token = await getAuthCookie()
  if (!token) return NextResponse.json({ ok: false, error: "Unauthorized" }, { status: 401 })

  const body = await request.json()

  const res = await updateTenantApi(token, body)
  if (!res.success || !res.data) {
    return NextResponse.json({ ok: false, error: res.error ?? "Gagal menyimpan profil UMKM" }, { status: 400 })
  }

  return NextResponse.json({ ok: true, data: res.data })
}
