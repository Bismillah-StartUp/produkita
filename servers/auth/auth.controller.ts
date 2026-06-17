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
  if (!email || !password) throw new Error("Email dan password wajib diisi")
  if (!email.includes("@")) throw new Error("Format email tidak valid")

  return await loginService(email, password, rememberMe)
}

export const registerController = async (
  email: string,
  password: string,
  name: string,
  tenantName: string
) => {
  if (!email || !password) throw new Error("Email dan password wajib diisi")
  if (!email.includes("@")) throw new Error("Format email tidak valid")
  if (password.length < 6) throw new Error("Password minimal 6 karakter")
  if (!tenantName) throw new Error("Nama UMKM wajib diisi")

  const existing = await findUserByEmail(email)

  let user
  if (existing && !existing.is_verified) {
    // update user + tenant dengan data terbaru
    user = await updateUserUnverified(existing.id, password, name, tenantName)
  } else if (existing && existing.is_verified) {
    throw new Error("Email sudah terdaftar")
  } else {
    user = await createUserWithTenant(email, password, name, tenantName)
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

export const updateProfileController = async (uuid: string, data: { name?: string; phonenumber?: string }) => {
  const user = await findUserByUuid(uuid)
  if (!user) throw new Error("User tidak ditemukan")

  return await updateProfile(uuid, data)
}

export const requestUpdateEmailController = async (uuid: string, newEmail: string) => {
  if (!newEmail.includes("@")) throw new Error("Format email tidak valid")

  const user = await findUserByUuid(uuid)
  if (!user) throw new Error("User tidak ditemukan")

  const existing = await findUserByEmailExcludeUuid(newEmail, uuid)
  if (existing) throw new Error("Email sudah dipakai user lain")

  const otp = generateOtp()
  await saveOtpWithType(user.id, otp, "update_email")
  await sendUpdateEmail(newEmail, otp)

  return { email: newEmail }
}

export const verifyUpdateEmailController = async (uuid: string, newEmail: string, otp: string) => {
  if (!newEmail.includes("@")) throw new Error("Format email tidak valid")
  if (!otp) throw new Error("OTP wajib diisi")

  const user = await findUserByUuid(uuid)
  if (!user) throw new Error("User tidak ditemukan")

  const validOtp = await findValidOtpWithType(user.id, otp, "update_email")
  if (!validOtp) throw new Error("OTP tidak valid atau sudah expired")

  await markOtpUsed(validOtp.id)
  await updateEmail(uuid, newEmail)

  return { email: newEmail }
}

export const updatePasswordController = async (uuid: string, oldPassword: string, newPassword: string) => {
  if (!oldPassword || !newPassword) throw new Error("Password lama dan baru wajib diisi")
  if (newPassword.length < 6) throw new Error("Password baru minimal 6 karakter")
  if (oldPassword === newPassword) throw new Error("Password baru tidak boleh sama dengan password lama")

  const user = await findUserByUuid(uuid)
  if (!user) throw new Error("User tidak ditemukan")

  const isValid = await verifyPassword(oldPassword, user.password)
  if (!isValid) throw new Error("Password lama salah")

  return await updatePassword(uuid, newPassword)
}

export const resendOtpController = async (email: string) => {
  if (!email) throw new Error("Email wajib diisi")
  return await resendOtpService(email)
}