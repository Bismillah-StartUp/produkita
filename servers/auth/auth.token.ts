import { SignJWT, jwtVerify } from "jose"
import { cookies } from "next/headers"

const SECRET = new TextEncoder().encode(process.env.JWT_SECRET!)
const COOKIE_NAME = process.env.COOKIE_NAME! || "bebekpalupi"
const EXPIRES_IN = process.env.JWT_EXPIRES_IN! || "1h"

export async function signToken(payload: { uuid: string; email: string; role: string }) {
  return await new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setExpirationTime(EXPIRES_IN)
    .setIssuedAt()
    .sign(SECRET)
}

export async function verifyToken(token: string) {
  const { payload } = await jwtVerify(token, SECRET)
  return payload as { uuid: string; email: string; role: string }
}

export async function setAuthCookie(token: string) {
  const cookieStore = await cookies()
  cookieStore.set(COOKIE_NAME, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 60 * 60 * 24 * 7,
    path: "/",
  })
}

export async function getAuthCookie() {
  const cookieStore = await cookies()
  return cookieStore.get(COOKIE_NAME)?.value ?? null
}

export async function removeAuthCookie() {
  const cookieStore = await cookies()
  cookieStore.delete(COOKIE_NAME)
}

export const signOtpNavigationToken = async (email: string) => {
  return await new SignJWT({ email })
    .setProtectedHeader({ alg: "HS256" })
    .setExpirationTime("10m")
    .setIssuedAt()
    .sign(SECRET)
}

export const verifyOtpNavigationToken = async (token: string) => {
  const { payload } = await jwtVerify(token, SECRET)
  return payload as { email: string }
}