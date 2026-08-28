import { NextResponse } from "next/server"
import { getAuthCookie } from "@/lib/auth/token"
import { verifyUpdateEmailApi } from "@/lib/auth/api"

export async function POST(request: Request) {
  const token = await getAuthCookie()
  if (!token) return NextResponse.json({ ok: false, error: "Unauthorized" }, { status: 401 })

  const { newEmail, otp } = await request.json()

  const res = await verifyUpdateEmailApi(token, newEmail, otp)
  if (!res.success || !res.data) {
    return NextResponse.json({ ok: false, error: res.error ?? "Gagal memverifikasi OTP" }, { status: 400 })
  }

  return NextResponse.json({ ok: true, data: res.data })
}
