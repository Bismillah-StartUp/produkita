import { NextResponse } from "next/server"
import {
  findUserByUuid,
  findValidOtpWithType,
  markOtpUsed,
  updateEmail,
} from "@/lib/auth/service"

export async function POST(request: Request) {
  const { uuid, newEmail, otp } = await request.json()

  if (!newEmail.includes("@")) {
    return NextResponse.json({ ok: false, error: "Format email tidak valid" }, { status: 400 })
  }
  if (!otp) {
    return NextResponse.json({ ok: false, error: "OTP wajib diisi" }, { status: 400 })
  }

  const user = await findUserByUuid(uuid)
  if (!user) {
    return NextResponse.json({ ok: false, error: "User tidak ditemukan" }, { status: 404 })
  }

  const validOtp = await findValidOtpWithType(user.id, otp, "update_email")
  if (!validOtp) {
    return NextResponse.json({ ok: false, error: "OTP tidak valid atau sudah expired" }, { status: 400 })
  }

  await markOtpUsed(validOtp.id)
  await updateEmail(uuid, newEmail)

  return NextResponse.json({ ok: true, data: { email: newEmail } })
}
