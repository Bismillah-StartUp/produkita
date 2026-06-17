"use server"

import {
  loginController,
  registerController,
  verifyOtpController,
  logoutController,
  getSessionController,
  updateProfileController,
  requestUpdateEmailController,
  verifyUpdateEmailController,
  updatePasswordController,
} from "./auth.controller"
import { signOtpNavigationToken, verifyOtpNavigationToken } from "./auth.token"

export const login = async (email: string, password: string) => {
  return await loginController(email, password)
}

export const register = async (
  email: string,
  password: string,
  name: string,
  tenantName: string
) => {
  return await registerController(email, password, name, tenantName)
}

export const verifyOtp = async (email: string, otp: string) => {
  return await verifyOtpController(email, otp)
}

export const logout = async () => {
  return await logoutController()
}

export const getSession = async () => {
  return await getSessionController()
}

export const updateProfileAction = async (uuid: string, data: { name?: string; phonenumber?: string }) => {
  return await updateProfileController(uuid, data)
}

export const requestUpdateEmail = async (uuid: string, newEmail: string) => {
  return await requestUpdateEmailController(uuid, newEmail)
}

export const verifyUpdateEmail = async (uuid: string, newEmail: string, otp: string) => {
  return await verifyUpdateEmailController(uuid, newEmail, otp)
}

export const updatePasswordAction = async (uuid: string, oldPassword: string, newPassword: string) => {
  return await updatePasswordController(uuid, oldPassword, newPassword)
}

export const generateOtpToken = async (email: string) => {
  return await signOtpNavigationToken(email)
}

export const verifyOtpToken = async (token: string) => {
  return await verifyOtpNavigationToken(token)
}