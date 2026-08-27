"use client"

import { useState } from "react"
import type { TenantApiData } from "@/lib/tenant/api"

type ApiResult<T> = { ok: true; data: T } | { ok: false; error: string }

async function apiCall<T>(path: string, method: string, body?: unknown): Promise<ApiResult<T>> {
  const res = await fetch(path, {
    method,
    headers: body ? { "Content-Type": "application/json" } : undefined,
    body: body ? JSON.stringify(body) : undefined,
  })
  const json = await res.json()
  if (!res.ok || !json.ok) {
    return { ok: false, error: json.error ?? "Terjadi kesalahan" }
  }
  return { ok: true, data: json.data }
}

const fileToBase64 = async (file: File) => {
  return Buffer.from(await file.arrayBuffer()).toString("base64")
}

export const useTenant = () => {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleGetTenant = async () => {
    setLoading(true)
    setError(null)
    try {
      const result = await apiCall<TenantApiData>("/api/tenants/me", "GET")
      if (!result.ok) {
        setError(result.error)
        return null
      }
      return result.data
    } finally {
      setLoading(false)
    }
  }

  const handleUpdateTenant = async (data: Record<string, unknown>) => {
    setLoading(true)
    setError(null)
    try {
      const result = await apiCall<TenantApiData>("/api/tenants/me", "PUT", data)
      if (!result.ok) {
        setError(result.error)
        return null
      }
      return result.data
    } finally {
      setLoading(false)
    }
  }

  const handleUploadLogo = async (file: File) => {
    setLoading(true)
    setError(null)
    try {
      const base64 = await fileToBase64(file)
      const result = await apiCall<TenantApiData>("/api/tenants/me/logo", "POST", { file: base64 })
      if (!result.ok) {
        setError(result.error)
        return null
      }
      return result.data
    } finally {
      setLoading(false)
    }
  }

  const handleUploadPlace = async (file: File) => {
    setLoading(true)
    setError(null)
    try {
      const base64 = await fileToBase64(file)
      const result = await apiCall<TenantApiData>("/api/tenants/me/place", "POST", { file: base64 })
      if (!result.ok) {
        setError(result.error)
        return null
      }
      return result.data
    } finally {
      setLoading(false)
    }
  }

  const handleDeleteLogo = async () => {
    setLoading(true)
    setError(null)
    try {
      const result = await apiCall<TenantApiData>("/api/tenants/me/logo", "DELETE")
      if (!result.ok) {
        setError(result.error)
        return null
      }
      return result.data
    } finally {
      setLoading(false)
    }
  }

  const handleDeletePlace = async () => {
    setLoading(true)
    setError(null)
    try {
      const result = await apiCall<TenantApiData>("/api/tenants/me/place", "DELETE")
      if (!result.ok) {
        setError(result.error)
        return null
      }
      return result.data
    } finally {
      setLoading(false)
    }
  }

  return {
    loading,
    error,
    getTenant: handleGetTenant,
    updateTenant: handleUpdateTenant,
    uploadLogo: handleUploadLogo,
    uploadPlace: handleUploadPlace,
    deleteLogo: handleDeleteLogo,
    deletePlace: handleDeletePlace,
  }
}
