import { NextResponse } from "next/server"
import { sendUpdateEmail } from "@/lib/emails/sendingOtp"
import {
  findUserByUuid,
  findUserByEmailExcludeUuid,
  generateOtp,
  saveOtpWithType,
} from "@/lib/auth/service"

export async function POST(request: Request) {
  const { uuid, newEmail } = await request.json()

  if (!newEmail.includes("@")) {
    return NextResponse.json({ ok: false, error: "Format email tidak valid" }, { status: 400 })
  }

  const user = await findUserByUuid(uuid)
  if (!user) {
    return NextResponse.json({ ok: false, error: "User tidak ditemukan" }, { status: 404 })
  }

  const existing = await findUserByEmailExcludeUuid(newEmail, uuid)
  if (existing) {
    return NextResponse.json({ ok: false, error: "Email sudah dipakai user lain" }, { status: 409 })
  }

  const otp = generateOtp()
  await saveOtpWithType(user.id, otp, "update_email")
  await sendUpdateEmail(newEmail, otp)

  return NextResponse.json({ ok: true, data: { email: newEmail } })
}
