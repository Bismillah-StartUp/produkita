import { NextResponse } from "next/server"
import { verifyOtpApi } from "@/lib/auth/api"

export async function POST(request: Request) {
  const { email, otp } = await request.json()

  const res = await verifyOtpApi(email, otp)
  if (!res.success || !res.data) {
    return NextResponse.json({ ok: false, error: res.error ?? "Verifikasi OTP gagal" }, { status: 400 })
  }

  return NextResponse.json({ ok: true, data: { email: res.data.email } })
}
