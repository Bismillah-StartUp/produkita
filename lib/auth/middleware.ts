import { NextRequest, NextResponse } from "next/server"
import { jwtVerify } from "jose"

const SECRET = new TextEncoder().encode(process.env.JWT_SECRET!)
const COOKIE_NAME = process.env.COOKIE_NAME! || "bebekpalupi"

const AUTH_PATHS = ["/login", "/register", "/otp"]
const DASHBOARD_PATH = "/dashboard"

const isAuthenticated = async (token: string | undefined) => {
  if (!token) return false
  try {
    await jwtVerify(token, SECRET)
    return true
  } catch {
    return false
  }
}

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl
  const token = request.cookies.get(COOKIE_NAME)?.value
  const authenticated = await isAuthenticated(token)

  const isAuthPath = AUTH_PATHS.some(
    (path) => pathname === path || pathname.startsWith(`${path}/`)
  )
  const isDashboardPath =
    pathname === DASHBOARD_PATH || pathname.startsWith(`${DASHBOARD_PATH}/`)

  if (isDashboardPath && !authenticated) {
    const loginUrl = new URL("/login", request.url)
    loginUrl.searchParams.set("redirect", pathname)
    return NextResponse.redirect(loginUrl)
  }

  if (isAuthPath && authenticated) {
    return NextResponse.redirect(new URL(DASHBOARD_PATH, request.url))
  }

  return NextResponse.next()
}
