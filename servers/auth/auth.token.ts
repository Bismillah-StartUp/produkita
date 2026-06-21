import { SignJWT, jwtVerify } from "jose"
import { cookies } from "next/headers"

const SECRET = new TextEncoder().encode(process.env.JWT_SECRET!)
const COOKIE_NAME = process.env.COOKIE_NAME! || "bebekpalupi"
const EXPIRES_IN = process.env.JWT_EXPIRES_IN! || "1h"
const REMEMBER_EXPIRES_IN = process.env.JWT_EXTENDED_EXPIRES! || "7d"

export const signToken = async (
  payload: { uuid: string; email: string; role: string },
  rememberMe: boolean = false
) => {
  return await new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setExpirationTime(rememberMe ? REMEMBER_EXPIRES_IN : EXPIRES_IN)
    .setIssuedAt()
    .sign(SECRET)
}

export const setAuthCookie = async (token: string, rememberMe: boolean = false) => {
  const cookieStore = await cookies()
  cookieStore.set(COOKIE_NAME, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: rememberMe ? 60 * 60 * 24 * 30 : 60 * 60 * 24 * 7,
    path: "/",
  })
}

export const verifyToken = async (token: string) => {
  const { payload } = await jwtVerify(token, SECRET)
  return payload as { uuid: string; email: string; role: string }
}

export const getAuthCookie = async () => {
  const cookieStore = await cookies()
  return cookieStore.get(COOKIE_NAME)?.value ?? null
}

export const removeAuthCookie = async () => {
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