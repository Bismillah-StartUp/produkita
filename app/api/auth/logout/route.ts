import { NextResponse } from "next/server"
import { removeAuthCookie } from "@/lib/auth/token"

export async function POST() {
  await removeAuthCookie()
  return NextResponse.json({ ok: true })
}
