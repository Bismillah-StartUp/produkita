import { middleware } from "@/servers/middlewares/authMiddleware"

export const proxy = middleware

export const config = {
  matcher: ["/dashboard/:path*", "/login", "/register", "/otp/:path*"],
}
