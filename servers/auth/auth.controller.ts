import { sendOtpMail } from "@/lib/emails/sendingOtp"
import {
  findUserByEmail,
  createUser,
  updateUserUnverified,
  verifyPassword,
  verifyUser,
  generateOtp,
  saveOtp,
  findValidOtp,
  markOtpUsed,
} from "./auth.service"

import {
  signToken,
  setAuthCookie,
  getAuthCookie,
  removeAuthCookie,
  verifyToken,
} from "./auth.token"

export const loginController = async (email: string, password: string) => {
  if (!email || !password) throw new Error("Email dan password wajib diisi")
  if (!email.includes("@")) throw new Error("Format email tidak valid")

  const user = await findUserByEmail(email)
  if (!user) throw new Error("Email tidak ditemukan")
  if (!user.is_verified) throw new Error("Akun belum diverifikasi")

  const isValid = await verifyPassword(password, user.password)
  if (!isValid) throw new Error("Password salah")

  const token = await signToken({ uuid: user.uuid, email: user.email, role: user.role })
  await setAuthCookie(token)

  return { uuid: user.uuid, email: user.email, role: user.role }
}

export const registerController = async (email: string, password: string) => {
  if (!email || !password) throw new Error("Email dan password wajib diisi")
  if (!email.includes("@")) throw new Error("Format email tidak valid")
  if (password.length < 6) throw new Error("Password minimal 6 karakter")

  const existing = await findUserByEmail(email)

  let user
  if (existing && !existing.is_verified) {
    // user sudah ada tapi belum verified → update password, kirim OTP baru
    user = await updateUserUnverified(existing.id, password)
  } else if (existing && existing.is_verified) {
    throw new Error("Email sudah terdaftar")
  } else {
    user = await createUser(email, password)
  }

  const otp = generateOtp()
  await saveOtp(user.id, otp)
  await sendOtpMail(email, otp)

  return { email: user.email }
}

export const verifyOtpController = async (email: string, otp: string) => {
  if (!email || !otp) throw new Error("Email dan OTP wajib diisi")

  const user = await findUserByEmail(email)
  if (!user) throw new Error("User tidak ditemukan")

  const validOtp = await findValidOtp(user.id, otp)
  if (!validOtp) throw new Error("OTP tidak valid atau sudah expired")

  await markOtpUsed(validOtp.id)
  await verifyUser(user.id)

  return { email: user.email }
}

export const logoutController = async () => {
  await removeAuthCookie()
}

export const getSessionController = async () => {
  const token = await getAuthCookie()
  if (!token) return null

  try {
    return await verifyToken(token)
  } catch {
    return null
  }
}