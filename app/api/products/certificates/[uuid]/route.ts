import { NextResponse } from "next/server"
import { getAuthCookie } from "@/lib/auth/token"
import { updateCertificateApi, softDeleteCertificateApi } from "@/lib/product/api"

export async function PUT(request: Request, { params }: { params: Promise<{ uuid: string }> }) {
  const { uuid } = await params
  const token = await getAuthCookie()
  if (!token) return NextResponse.json({ ok: false, error: "Unauthorized" }, { status: 401 })

  const body = await request.json()
  const res = await updateCertificateApi(token, uuid, body)
  if (!res.success || !res.data) {
    return NextResponse.json({ ok: false, error: res.error ?? "Gagal memperbarui sertifikat" }, { status: 400 })
  }
  return NextResponse.json({ ok: true, data: res.data })
}

export async function DELETE(_request: Request, { params }: { params: Promise<{ uuid: string }> }) {
  const { uuid } = await params
  const token = await getAuthCookie()
  if (!token) return NextResponse.json({ ok: false, error: "Unauthorized" }, { status: 401 })

  const res = await softDeleteCertificateApi(token, uuid)
  if (!res.success) {
    return NextResponse.json({ ok: false, error: res.error ?? "Gagal menghapus sertifikat" }, { status: 400 })
  }
  return NextResponse.json({ ok: true, data: res.data })
}
