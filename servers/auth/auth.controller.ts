import { sendOtpMail, sendUpdateEmail } from "@/lib/emails/sendingOtp"
import {
  findUserByEmail,
  updateUserUnverified,
  verifyPassword,
  verifyUser,
  generateOtp,
  saveOtp,
  findValidOtp,
  markOtpUsed,
  findUserByUuid,
  updateProfile,
  findUserByEmailExcludeUuid,
  saveOtpWithType,
  findValidOtpWithType,
  updateEmail,
  updatePassword,
  createUserWithTenant,
  resendOtpService,
  loginService,
} from "./auth.service"

import {
  getAuthCookie,
  removeAuthCookie,
  verifyToken,
} from "./auth.token"

export const loginController = async (
  email: string,
  password: string,
  rememberMe: boolean = false
) => {
  if (!email || !password) return { ok: false as const, error: "Email dan password wajib diisi" }
  if (!email.includes("@")) return { ok: false as const, error: "Format email tidak valid" }

  return await loginService(email, password, rememberMe)
}

export const registerController = async (
  email: string,
  password: string,
  name: string,
  tenantName: string
) => {
  if (!email || !password) return { ok: false as const, error: "Email dan password wajib diisi" }
  if (!email.includes("@")) return { ok: false as const, error: "Format email tidak valid" }
  if (password.length < 6) return { ok: false as const, error: "Password minimal 6 karakter" }
  if (!tenantName) return { ok: false as const, error: "Nama UMKM wajib diisi" }

  const existing = await findUserByEmail(email)

  let user
  if (existing && !existing.is_verified) {
    // update user + tenant dengan data terbaru
    user = await updateUserUnverified(existing.id, password, name, tenantName)
  } else if (existing && existing.is_verified) {
    return { ok: false as const, error: "Email sudah terdaftar" }
  } else {
    user = await createUserWithTenant(email, password, name, tenantName)
  }

  const otp = generateOtp()
  await saveOtp(user.id, otp)
  await sendOtpMail(email, otp)

  return { ok: true as const, data: { email: user.email } }
}

export const verifyOtpController = async (email: string, otp: string) => {
  if (!email || !otp) return { ok: false as const, error: "Email dan OTP wajib diisi" }

  const user = await findUserByEmail(email)
  if (!user) return { ok: false as const, error: "User tidak ditemukan" }

  const validOtp = await findValidOtp(user.id, otp)
  if (!validOtp) return { ok: false as const, error: "OTP tidak valid atau sudah expired" }

  await markOtpUsed(validOtp.id)
  await verifyUser(user.id)

  return { ok: true as const, data: { email: user.email } }
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

export const updateProfileController = async (uuid: string, data: { name?: string; phonenumber?: string }) => {
  const user = await findUserByUuid(uuid)
  if (!user) return { ok: false as const, error: "User tidak ditemukan" }

  const updated = await updateProfile(uuid, data)
  return { ok: true as const, data: updated }
}

export const requestUpdateEmailController = async (uuid: string, newEmail: string) => {
  if (!newEmail.includes("@")) return { ok: false as const, error: "Format email tidak valid" }

  const user = await findUserByUuid(uuid)
  if (!user) return { ok: false as const, error: "User tidak ditemukan" }

  const existing = await findUserByEmailExcludeUuid(newEmail, uuid)
  if (existing) return { ok: false as const, error: "Email sudah dipakai user lain" }

  const otp = generateOtp()
  await saveOtpWithType(user.id, otp, "update_email")
  await sendUpdateEmail(newEmail, otp)

  return { ok: true as const, data: { email: newEmail } }
}

export const verifyUpdateEmailController = async (uuid: string, newEmail: string, otp: string) => {
  if (!newEmail.includes("@")) return { ok: false as const, error: "Format email tidak valid" }
  if (!otp) return { ok: false as const, error: "OTP wajib diisi" }

  const user = await findUserByUuid(uuid)
  if (!user) return { ok: false as const, error: "User tidak ditemukan" }

  const validOtp = await findValidOtpWithType(user.id, otp, "update_email")
  if (!validOtp) return { ok: false as const, error: "OTP tidak valid atau sudah expired" }

  await markOtpUsed(validOtp.id)
  await updateEmail(uuid, newEmail)

  return { ok: true as const, data: { email: newEmail } }
}

export const updatePasswordController = async (uuid: string, oldPassword: string, newPassword: string) => {
  if (!oldPassword || !newPassword) return { ok: false as const, error: "Password lama dan baru wajib diisi" }
  if (newPassword.length < 6) return { ok: false as const, error: "Password baru minimal 6 karakter" }
  if (oldPassword === newPassword) return { ok: false as const, error: "Password baru tidak boleh sama dengan password lama" }

  const user = await findUserByUuid(uuid)
  if (!user) return { ok: false as const, error: "User tidak ditemukan" }

  const isValid = await verifyPassword(oldPassword, user.password)
  if (!isValid) return { ok: false as const, error: "Password lama salah" }

  const updated = await updatePassword(uuid, newPassword)
  return { ok: true as const, data: updated }
}

export const resendOtpController = async (email: string) => {
  if (!email) return { ok: false as const, error: "Email wajib diisi" }
  return await resendOtpService(email)
}
