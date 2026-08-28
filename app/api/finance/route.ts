import { NextRequest, NextResponse } from "next/server"
import { getAuthCookie } from "@/lib/auth/token"
import { listFinanceApi, createFinanceApi } from "@/lib/finance/api"

export async function GET(request: NextRequest) {
  const token = await getAuthCookie()
  if (!token) return NextResponse.json({ ok: false, error: "Unauthorized" }, { status: 401 })

  const now = new Date()
  const { searchParams } = new URL(request.url)
  const year = Number(searchParams.get("year") ?? now.getFullYear())
  const month = Number(searchParams.get("month") ?? now.getMonth() + 1)

  const res = await listFinanceApi(token, year, month)
  if (!res.success) {
    return NextResponse.json({ ok: false, error: res.error ?? "Gagal memuat transaksi" }, { status: 400 })
  }

  return NextResponse.json({ ok: true, data: res.data ?? [] })
}

export async function POST(request: Request) {
  const token = await getAuthCookie()
  if (!token) return NextResponse.json({ ok: false, error: "Unauthorized" }, { status: 401 })

  const body = await request.json()

  const res = await createFinanceApi(token, body)
  if (!res.success || !res.data) {
    return NextResponse.json({ ok: false, error: res.error ?? "Gagal menyimpan laporan" }, { status: 400 })
  }

  return NextResponse.json({ ok: true, data: res.data })
}
