import { NextResponse } from "next/server"
import { loginApi } from "@/lib/auth/api"
import { setAuthCookie } from "@/lib/auth/token"

export async function POST(request: Request) {
  const { email, password, rememberMe = false } = await request.json()

  const res = await loginApi(email, password, rememberMe)
  if (!res.success || !res.data) {
    return NextResponse.json({ ok: false, error: res.error ?? "Gagal login" }, { status: 401 })
  }

  await setAuthCookie(res.data.token, rememberMe)

  const { uuid, email: userEmail, role, name } = res.data.user
  return NextResponse.json({ ok: true, data: { uuid, email: userEmail, role, name } })
}
