import { NextResponse } from "next/server"
import { getAuthCookie } from "@/lib/auth/token"
import { updateProfileApi } from "@/lib/auth/api"

export async function PUT(request: Request) {
  const token = await getAuthCookie()
  if (!token) return NextResponse.json({ ok: false, error: "Unauthorized" }, { status: 401 })

  const { name, phonenumber } = await request.json()

  const res = await updateProfileApi(token, { name, phonenumber })
  if (!res.success || !res.data) {
    return NextResponse.json({ ok: false, error: res.error ?? "Gagal memperbarui profil" }, { status: 400 })
  }

  return NextResponse.json({ ok: true, data: res.data })
}
