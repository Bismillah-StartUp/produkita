import { NextResponse } from "next/server"
import { getAuthCookie, verifyToken } from "@/lib/auth/token"

export async function GET() {
  const token = await getAuthCookie()
  if (!token) return NextResponse.json({ session: null })

  try {
    const session = await verifyToken(token)
    return NextResponse.json({ session })
  } catch {
    return NextResponse.json({ session: null })
  }
}
