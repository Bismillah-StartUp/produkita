import { NextResponse } from "next/server"
import { findUserByUuid, verifyPassword, updatePassword } from "@/lib/auth/service"

export async function PATCH(request: Request) {
  const { uuid, oldPassword, newPassword } = await request.json()

  if (!oldPassword || !newPassword) {
    return NextResponse.json({ ok: false, error: "Password lama dan baru wajib diisi" }, { status: 400 })
  }
  if (newPassword.length < 6) {
    return NextResponse.json({ ok: false, error: "Password baru minimal 6 karakter" }, { status: 400 })
  }
  if (oldPassword === newPassword) {
    return NextResponse.json({ ok: false, error: "Password baru tidak boleh sama dengan password lama" }, { status: 400 })
  }

  const user = await findUserByUuid(uuid)
  if (!user) {
    return NextResponse.json({ ok: false, error: "User tidak ditemukan" }, { status: 404 })
  }

  const isValid = await verifyPassword(oldPassword, user.password)
  if (!isValid) {
    return NextResponse.json({ ok: false, error: "Password lama salah" }, { status: 401 })
  }

  const updated = await updatePassword(uuid, newPassword)
  return NextResponse.json({ ok: true, data: updated })
}
