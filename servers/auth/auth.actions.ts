"use server"

import {
  loginController,
  registerController,
  verifyOtpController,
  logoutController,
  getSessionController,
} from "./auth.controller"

export const login = async (email: string, password: string) => {
  return await loginController(email, password)
}

export const register = async (email: string, password: string) => {
  return await registerController(email, password)
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