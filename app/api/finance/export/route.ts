import { NextRequest, NextResponse } from "next/server"
import { getAuthCookie } from "@/lib/auth/token"
import { exportFinanceApi } from "@/lib/finance/api"

export async function GET(request: NextRequest) {
  const token = await getAuthCookie()
  if (!token) return NextResponse.json({ ok: false, error: "Unauthorized" }, { status: 401 })

  const now = new Date()
  const { searchParams } = new URL(request.url)
  const year = Number(searchParams.get("year") ?? now.getFullYear())
  const month = Number(searchParams.get("month") ?? now.getMonth() + 1)

  const backendRes = await exportFinanceApi(token, year, month)
  if (!backendRes.ok) {
    const json = await backendRes.json().catch(() => ({}))
    return NextResponse.json({ ok: false, error: json.error ?? "Gagal mengekspor laporan" }, { status: backendRes.status })
  }

  const buffer = await backendRes.arrayBuffer()
  return new NextResponse(buffer, {
    status: 200,
    headers: {
      "Content-Type": "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      "Content-Disposition": backendRes.headers.get("Content-Disposition") ?? `attachment; filename=laporan-keuangan-${year}-${month}.xlsx`,
    },
  })
}
