import { sendUpdateEmail } from "@/lib/emails/sendingOtp"
import {
  verifyPassword,
  findUserByUuid,
  updateProfile,
  findUserByEmailExcludeUuid,
  saveOtpWithType,
  findValidOtpWithType,
  markOtpUsed,
  updateEmail,
  updatePassword,
  generateOtp,
} from "./auth.service"

import { loginApi, registerApi, verifyOtpApi, resendOtpApi } from "./auth.api"

import {
  getAuthCookie,
  removeAuthCookie,
  verifyToken,
  setAuthCookie,
} from "./auth.token"

export const loginController = async (
  email: string,
  password: string,
  rememberMe: boolean = false
) => {
  const res = await loginApi(email, password, rememberMe)
  if (!res.success || !res.data) return { ok: false as const, error: res.error ?? "Gagal login" }

  await setAuthCookie(res.data.token, rememberMe)

  const { uuid, email: userEmail, role, name } = res.data.user
  return { ok: true as const, data: { uuid, email: userEmail, role, name } }
}

export const registerController = async (
  email: string,
  password: string,
  name: string,
  tenantName: string
) => {
  const res = await registerApi(email, password, name, tenantName)
  if (!res.success || !res.data) return { ok: false as const, error: res.error ?? "Gagal mendaftar" }

  return { ok: true as const, data: { email: res.data.email } }
}

export const verifyOtpController = async (email: string, otp: string) => {
  const res = await verifyOtpApi(email, otp)
  if (!res.success || !res.data) return { ok: false as const, error: res.error ?? "Verifikasi OTP gagal" }

  return { ok: true as const, data: { email: res.data.email } }
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
  const res = await resendOtpApi(email)
  if (!res.success || !res.data) return { ok: false as const, error: res.error ?? "Gagal mengirim ulang OTP" }

  return { ok: true as const, data: { email: res.data.email } }
}
