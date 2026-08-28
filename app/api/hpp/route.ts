import { NextResponse } from "next/server"
import { getAuthCookie } from "@/lib/auth/token"
import { listHppApi, createHppApi } from "@/lib/hpp/api"

export async function GET() {
  const token = await getAuthCookie()
  if (!token) return NextResponse.json({ ok: false, error: "Unauthorized" }, { status: 401 })

  const res = await listHppApi(token)
  if (!res.success) {
    return NextResponse.json({ ok: false, error: res.error ?? "Gagal memuat kalkulasi HPP" }, { status: 400 })
  }

  return NextResponse.json({ ok: true, data: res.data ?? [] })
}

export async function POST(request: Request) {
  const token = await getAuthCookie()
  if (!token) return NextResponse.json({ ok: false, error: "Unauthorized" }, { status: 401 })

  const body = await request.json()

  const res = await createHppApi(token, body)
  if (!res.success || !res.data) {
    return NextResponse.json({ ok: false, error: res.error ?? "Gagal menyimpan kalkulasi HPP" }, { status: 400 })
  }

  return NextResponse.json({ ok: true, data: res.data })
}
