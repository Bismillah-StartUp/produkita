import { NextResponse } from "next/server"
import { getAuthCookie } from "@/lib/auth/token"
import { getProductApi, updateProductBasicApi, softDeleteProductApi } from "@/lib/product/api"

export async function GET(_request: Request, { params }: { params: Promise<{ uuid: string }> }) {
  const { uuid } = await params
  const token = await getAuthCookie()
  if (!token) return NextResponse.json({ ok: false, error: "Unauthorized" }, { status: 401 })

  const res = await getProductApi(token, uuid)
  if (!res.success || !res.data) {
    return NextResponse.json({ ok: false, error: res.error ?? "Produk tidak ditemukan" }, { status: 404 })
  }
  return NextResponse.json({ ok: true, data: res.data })
}

export async function PUT(request: Request, { params }: { params: Promise<{ uuid: string }> }) {
  const { uuid } = await params
  const token = await getAuthCookie()
  if (!token) return NextResponse.json({ ok: false, error: "Unauthorized" }, { status: 401 })

  const body = await request.json()
  const res = await updateProductBasicApi(token, uuid, body)
  if (!res.success || !res.data) {
    return NextResponse.json({ ok: false, error: res.error ?? "Gagal memperbarui produk" }, { status: 400 })
  }
  return NextResponse.json({ ok: true, data: res.data })
}

export async function DELETE(_request: Request, { params }: { params: Promise<{ uuid: string }> }) {
  const { uuid } = await params
  const token = await getAuthCookie()
  if (!token) return NextResponse.json({ ok: false, error: "Unauthorized" }, { status: 401 })

  const res = await softDeleteProductApi(token, uuid)
  if (!res.success) {
    return NextResponse.json({ ok: false, error: res.error ?? "Gagal menghapus produk" }, { status: 400 })
  }
  return NextResponse.json({ ok: true, data: res.data })
}
