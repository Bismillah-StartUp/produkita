import { NextResponse } from "next/server"
import { getAuthCookie } from "@/lib/auth/token"
import { getHppApi, updateHppApi, deleteHppApi } from "@/lib/hpp/api"

export async function GET(_request: Request, { params }: { params: Promise<{ uuid: string }> }) {
  const { uuid } = await params
  const token = await getAuthCookie()
  if (!token) return NextResponse.json({ ok: false, error: "Unauthorized" }, { status: 401 })

  const res = await getHppApi(token, uuid)
  if (!res.success || !res.data) {
    return NextResponse.json({ ok: false, error: res.error ?? "Kalkulasi tidak ditemukan" }, { status: 404 })
  }

  return NextResponse.json({ ok: true, data: res.data })
}

export async function PUT(request: Request, { params }: { params: Promise<{ uuid: string }> }) {
  const { uuid } = await params
  const token = await getAuthCookie()
  if (!token) return NextResponse.json({ ok: false, error: "Unauthorized" }, { status: 401 })

  const body = await request.json()

  const res = await updateHppApi(token, uuid, body)
  if (!res.success || !res.data) {
    return NextResponse.json({ ok: false, error: res.error ?? "Gagal memperbarui kalkulasi HPP" }, { status: 400 })
  }

  return NextResponse.json({ ok: true, data: res.data })
}

export async function DELETE(_request: Request, { params }: { params: Promise<{ uuid: string }> }) {
  const { uuid } = await params
  const token = await getAuthCookie()
  if (!token) return NextResponse.json({ ok: false, error: "Unauthorized" }, { status: 401 })

  const res = await deleteHppApi(token, uuid)
  if (!res.success) {
    return NextResponse.json({ ok: false, error: res.error ?? "Gagal menghapus kalkulasi HPP" }, { status: 400 })
  }

  return NextResponse.json({ ok: true, data: res.data })
}
