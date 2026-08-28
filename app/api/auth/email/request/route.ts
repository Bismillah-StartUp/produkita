import { NextResponse } from "next/server"
import { getAuthCookie } from "@/lib/auth/token"
import { requestUpdateEmailApi } from "@/lib/auth/api"

export async function POST(request: Request) {
  const token = await getAuthCookie()
  if (!token) return NextResponse.json({ ok: false, error: "Unauthorized" }, { status: 401 })

  const { newEmail } = await request.json()

  const res = await requestUpdateEmailApi(token, newEmail)
  if (!res.success || !res.data) {
    return NextResponse.json({ ok: false, error: res.error ?? "Gagal mengirim OTP ganti email" }, { status: 400 })
  }

  return NextResponse.json({ ok: true, data: res.data })
}
