import { NextResponse } from "next/server"
import { signOtpNavigationToken } from "@/lib/auth/token"

export async function POST(request: Request) {
  const { email } = await request.json()

  const token = await signOtpNavigationToken(email)
  return NextResponse.json({ ok: true, data: { token } })
}
