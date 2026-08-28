import { NextResponse } from "next/server"
import { getAuthCookie } from "@/lib/auth/token"
import { getFinanceApi, updateFinanceApi, deleteFinanceApi } from "@/lib/finance/api"

export async function GET(_request: Request, { params }: { params: Promise<{ cuid: string }> }) {
  const { cuid } = await params
  const token = await getAuthCookie()
  if (!token) return NextResponse.json({ ok: false, error: "Unauthorized" }, { status: 401 })

  const res = await getFinanceApi(token, cuid)
  if (!res.success || !res.data) {
    return NextResponse.json({ ok: false, error: res.error ?? "Transaksi tidak ditemukan" }, { status: 404 })
  }

  return NextResponse.json({ ok: true, data: res.data })
}

export async function PUT(request: Request, { params }: { params: Promise<{ cuid: string }> }) {
  const { cuid } = await params
  const token = await getAuthCookie()
  if (!token) return NextResponse.json({ ok: false, error: "Unauthorized" }, { status: 401 })

  const body = await request.json()

  const res = await updateFinanceApi(token, cuid, body)
  if (!res.success || !res.data) {
    return NextResponse.json({ ok: false, error: res.error ?? "Gagal memperbarui laporan" }, { status: 400 })
  }

  return NextResponse.json({ ok: true, data: res.data })
}

export async function DELETE(_request: Request, { params }: { params: Promise<{ cuid: string }> }) {
  const { cuid } = await params
  const token = await getAuthCookie()
  if (!token) return NextResponse.json({ ok: false, error: "Unauthorized" }, { status: 401 })

  const res = await deleteFinanceApi(token, cuid)
  if (!res.success) {
    return NextResponse.json({ ok: false, error: res.error ?? "Gagal menghapus laporan" }, { status: 400 })
  }

  return NextResponse.json({ ok: true, data: res.data })
}
