"use client"

import { useState } from "react"
import { login, register, verifyOtp, logout, getSession, updateProfileAction, requestUpdateEmail, verifyUpdateEmail, updatePasswordAction } from "@/servers/auth/auth.actions"
import { useAuthStore } from "@/servers/stores/useAuthStore"

export const useAuth = () => {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const { setSession, clearSession } = useAuthStore()

  const handleLogin = async (email: string, password: string, rememberMe: boolean = false) => {
    setLoading(true)
    setError(null)
    try {
      const result = await login(email, password, rememberMe)
      if (result) setSession(result)
      return result
    } catch (err: any) {
      setError(err.message)
      return null
    } finally {
      setLoading(false)
    }
  }

  const handleRegister = async (
    email: string,
    password: string,
    name: string,
    tenantName: string
  ) => {
    setLoading(true)
    setError(null)
    try {
      return await register(email, password, name, tenantName)
    } catch (err: any) {
      setError(err.message)
      return null
    } finally {
      setLoading(false)
    }
  }

  const handleVerifyOtp = async (email: string, otp: string) => {
    setLoading(true)
    setError(null)
    try {
      return await verifyOtp(email, otp)
    } catch (err: any) {
      setError(err.message)
      return null
    } finally {
      setLoading(false)
    }
  }

  const handleLogout = async () => {
    setLoading(true)
    setError(null)
    try {
      await logout()
      clearSession()
    } catch (err: any) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  const handleUpdateProfile = async (uuid: string, data: { name?: string; phonenumber?: string }) => {
    setLoading(true)
    setError(null)
    try {
      return await updateProfileAction(uuid, data)
    } catch (err: any) {
      setError(err.message)
      return null
    } finally {
      setLoading(false)
    }
  }

  const handleRequestUpdateEmail = async (uuid: string, newEmail: string) => {
    setLoading(true)
    setError(null)
    try {
      return await requestUpdateEmail(uuid, newEmail)
    } catch (err: any) {
      setError(err.message)
      return null
    } finally {
      setLoading(false)
    }
  }

  const handleVerifyUpdateEmail = async (uuid: string, newEmail: string, otp: string) => {
    setLoading(true)
    setError(null)
    try {
      return await verifyUpdateEmail(uuid, newEmail, otp)
    } catch (err: any) {
      setError(err.message)
      return null
    } finally {
      setLoading(false)
    }
  }

  const handleUpdatePassword = async (uuid: string, oldPassword: string, newPassword: string) => {
    setLoading(true)
    setError(null)
    try {
      return await updatePasswordAction(uuid, oldPassword, newPassword)
    } catch (err: any) {
      setError(err.message)
      return null
    } finally {
      setLoading(false)
    }
  }

  return {
    loading,
    error,
    login: handleLogin,
    register: handleRegister,
    verifyOtp: handleVerifyOtp,
    logout: handleLogout,
    getSession,
    updateProfile: handleUpdateProfile,
    requestUpdateEmail: handleRequestUpdateEmail,
    verifyUpdateEmail: handleVerifyUpdateEmail,
    updatePassword: handleUpdatePassword,
  }
}