import { NextResponse } from "next/server"
import { getAuthCookie } from "@/lib/auth/token"
import { createCertificateApi } from "@/lib/product/api"

export async function POST(request: Request, { params }: { params: Promise<{ uuid: string }> }) {
  const { uuid } = await params
  const token = await getAuthCookie()
  if (!token) return NextResponse.json({ ok: false, error: "Unauthorized" }, { status: 401 })

  const body = await request.json()
  const res = await createCertificateApi(token, uuid, body)
  if (!res.success || !res.data) {
    return NextResponse.json({ ok: false, error: res.error ?? "Gagal menambahkan sertifikat" }, { status: 400 })
  }
  return NextResponse.json({ ok: true, data: res.data })
}
