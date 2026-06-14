"use client"

import { useState } from "react"
import { login, register, verifyOtp, logout, getSession } from "@/servers/auth/auth.actions"

export const useAuth = () => {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleLogin = async (email: string, password: string) => {
    setLoading(true)
    setError(null)
    try {
      return await login(email, password)
    } catch (err: any) {
      setError(err.message)
      return null
    } finally {
      setLoading(false)
    }
  }

  const handleRegister = async (email: string, password: string) => {
    setLoading(true)
    setError(null)
    try {
      return await register(email, password)
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
    } catch (err: any) {
      setError(err.message)
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
  }
}