import { NextResponse } from "next/server"
import { getAuthCookie } from "@/lib/auth/token"
import { getTenantEmailApi } from "@/lib/tenant/api"

export async function GET() {
  const token = await getAuthCookie()
  if (!token) return NextResponse.json({ ok: false, error: "Unauthorized" }, { status: 401 })

  const res = await getTenantEmailApi(token)
  if (!res.success || !res.data) {
    return NextResponse.json({ ok: false, error: res.error ?? "Tenant tidak ditemukan" }, { status: 404 })
  }

  return NextResponse.json({ ok: true, data: res.data })
}
