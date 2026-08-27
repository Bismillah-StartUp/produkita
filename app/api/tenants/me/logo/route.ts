import { NextResponse } from "next/server"
import { getAuthCookie } from "@/lib/auth/token"
import { uploadTenantLogoApi, deleteTenantLogoApi } from "@/lib/tenant/api"

export async function POST(request: Request) {
  const token = await getAuthCookie()
  if (!token) return NextResponse.json({ ok: false, error: "Unauthorized" }, { status: 401 })

  const { file } = await request.json()

  const res = await uploadTenantLogoApi(token, file)
  if (!res.success || !res.data) {
    return NextResponse.json({ ok: false, error: res.error ?? "Gagal mengunggah logo" }, { status: 400 })
  }

  return NextResponse.json({ ok: true, data: res.data })
}

export async function DELETE() {
  const token = await getAuthCookie()
  if (!token) return NextResponse.json({ ok: false, error: "Unauthorized" }, { status: 401 })

  const res = await deleteTenantLogoApi(token)
  if (!res.success || !res.data) {
    return NextResponse.json({ ok: false, error: res.error ?? "Gagal menghapus logo" }, { status: 400 })
  }

  return NextResponse.json({ ok: true, data: res.data })
}
