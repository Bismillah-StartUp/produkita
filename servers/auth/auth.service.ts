import prisma from "@/lib/prisma"
import bcrypt from "bcryptjs"
import crypto from "crypto"

export const findUserByEmail = async (email: string) => {
  return await prisma.user.findUnique({ where: { email } })
}

export const createUser = async (email: string, password: string) => {
  const hashedPassword = await bcrypt.hash(password, 10)
  return await prisma.user.create({
    data: {
      email,
      password: hashedPassword,
      role: "user",
      is_verified: false,
    },
  })
}

export const updateUserUnverified = async (id: number, password: string) => {
  const hashedPassword = await bcrypt.hash(password, 10)
  return await prisma.user.update({
    where: { id },
    data: {
      password: hashedPassword,
      is_verified: false,
    },
  })
}

export const verifyPassword = async (password: string, hashedPassword: string) => {
  return await bcrypt.compare(password, hashedPassword)
}

export const verifyUser = async (id: number) => {
  return await prisma.user.update({
    where: { id },
    data: { is_verified: true },
  })
}

export const generateOtp = () => {
  return crypto.randomInt(100000, 999999).toString()
}

export const saveOtp = async (userId: number, otp: string) => {
  const expiredMinutes = Number(process.env.OTP_EXPIRED_MINUTES ?? 3)

  await prisma.oTP.updateMany({
    where: { user_id: userId, is_used: false },
    data: { is_used: true },
  })

  return await prisma.oTP.create({
    data: {
      uuid: crypto.randomUUID(),
      user_id: userId,
      otp,
      is_used: false,
      expired_at: new Date(Date.now() + expiredMinutes * 60 * 1000),
    },
  })
}

export const findValidOtp = async (userId: number, otp: string) => {
  return await prisma.oTP.findFirst({
    where: {
      user_id: userId,
      otp,
      is_used: false,
      expired_at: { gt: new Date() },
    },
  })
}

export const markOtpUsed = async (id: number) => {
  return await prisma.oTP.update({
    where: { id },
    data: { is_used: true },
  })
}