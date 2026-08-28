import { NextResponse } from "next/server"
import { getAuthCookie } from "@/lib/auth/token"
import { softDeleteProductImageApi } from "@/lib/product/api"

export async function DELETE(_request: Request, { params }: { params: Promise<{ uuid: string }> }) {
  const { uuid } = await params
  const token = await getAuthCookie()
  if (!token) return NextResponse.json({ ok: false, error: "Unauthorized" }, { status: 401 })

  const res = await softDeleteProductImageApi(token, uuid)
  if (!res.success) {
    return NextResponse.json({ ok: false, error: res.error ?? "Gagal menghapus foto" }, { status: 400 })
  }
  return NextResponse.json({ ok: true, data: res.data })
}
