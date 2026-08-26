import { NextResponse } from "next/server"
import { findUserByUuid, updateProfile } from "@/lib/auth/service"

export async function PATCH(request: Request) {
  const { uuid, name, phonenumber } = await request.json()

  const user = await findUserByUuid(uuid)
  if (!user) {
    return NextResponse.json({ ok: false, error: "User tidak ditemukan" }, { status: 404 })
  }

  const updated = await updateProfile(uuid, { name, phonenumber })
  return NextResponse.json({ ok: true, data: updated })
}
