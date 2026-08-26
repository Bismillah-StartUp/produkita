import prisma from "@/lib/prisma"
import bcrypt from "bcryptjs"
import crypto from "crypto"

export const generateOtp = () => {
  return crypto.randomInt(100000, 999999).toString()
}

export const markOtpUsed = async (id: number) => {
  return await prisma.oTP.update({
    where: { id },
    data: { is_used: true },
  })
}

export const saveOtpWithType = async (userId: number, otp: string, type: "register" | "update_email") => {
  const expiredMinutes = Number(process.env.OTP_EXPIRED_MINUTES ?? 3)

  await prisma.oTP.updateMany({
    where: { user_id: userId, is_used: false, type },
    data: { is_used: true },
  })

  return await prisma.oTP.create({
    data: {
      uuid: crypto.randomUUID(),
      user_id: userId,
      otp,
      is_used: false,
      type,
      expired_at: new Date(Date.now() + expiredMinutes * 60 * 1000),
    },
  })
}

export const findValidOtpWithType = async (userId: number, otp: string, type: "register" | "update_email") => {
  return await prisma.oTP.findFirst({
    where: {
      user_id: userId,
      otp,
      is_used: false,
      type,
      expired_at: { gt: new Date() },
    },
  })
}

export const verifyPassword = async (password: string, hashedPassword: string) => {
  return await bcrypt.compare(password, hashedPassword)
}

export const findUserByUuid = async (uuid: string) => {
  return await prisma.user.findUnique({ where: { uuid } })
}

export const updateProfile = async (uuid: string, data: { name?: string; phonenumber?: string }) => {
  return await prisma.user.update({
    where: { uuid },
    data,
  })
}

export const updateEmail = async (uuid: string, email: string) => {
  return await prisma.user.update({
    where: { uuid },
    data: { email },
  })
}

export const updatePassword = async (uuid: string, newPassword: string) => {
  const hashedPassword = await bcrypt.hash(newPassword, 10)
  return await prisma.user.update({
    where: { uuid },
    data: { password: hashedPassword },
  })
}

export const findUserByEmailExcludeUuid = async (email: string, uuid: string) => {
  return await prisma.user.findFirst({
    where: {
      email,
      NOT: { uuid },
    },
  })
}
