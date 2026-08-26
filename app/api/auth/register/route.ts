import { NextResponse } from "next/server"
import { registerApi } from "@/lib/auth/api"

export async function POST(request: Request) {
  const { email, password, name, tenantName } = await request.json()

  const res = await registerApi(email, password, name, tenantName)
  if (!res.success || !res.data) {
    return NextResponse.json({ ok: false, error: res.error ?? "Gagal mendaftar" }, { status: 400 })
  }

  return NextResponse.json({ ok: true, data: { email: res.data.email } })
}
