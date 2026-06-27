"use client"

import { useState } from "react"
import {
  getTenant,
  updateTenant,
  uploadTenantLogo,
  uploadTenantPlace,
  deleteTenantLogo,
  deleteTenantPlace,
} from "@/servers/tenants/tenant.actions"

export const useTenant = () => {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleGetTenant = async (userUuid: string) => {
    setLoading(true)
    setError(null)
    try {
      return await getTenant(userUuid)
    } catch (err: any) {
      setError(err.message)
      return null
    } finally {
      setLoading(false)
    }
  }

  const handleUpdateTenant = async (userUuid: string, data: Parameters<typeof updateTenant>[1]) => {
    setLoading(true)
    setError(null)
    try {
      return await updateTenant(userUuid, data)
    } catch (err: any) {
      setError(err.message)
      return null
    } finally {
      setLoading(false)
    }
  }

  const handleUploadLogo = async (userUuid: string, file: File) => {
    setLoading(true)
    setError(null)
    try {
      const base64 = Buffer.from(await file.arrayBuffer()).toString("base64")
      return await uploadTenantLogo(userUuid, base64)
    } catch (err: any) {
      setError(err.message)
      return null
    } finally {
      setLoading(false)
    }
  }

  const handleUploadPlace = async (userUuid: string, file: File) => {
    setLoading(true)
    setError(null)
    try {
      const base64 = Buffer.from(await file.arrayBuffer()).toString("base64")
      return await uploadTenantPlace(userUuid, base64)
    } catch (err: any) {
      setError(err.message)
      return null
    } finally {
      setLoading(false)
    }
  }

  const handleDeleteLogo = async (userUuid: string) => {
    setLoading(true)
    setError(null)
    try {
      return await deleteTenantLogo(userUuid)
    } catch (err: any) {
      setError(err.message)
      return null
    } finally {
      setLoading(false)
    }
  }

  const handleDeletePlace = async (userUuid: string) => {
    setLoading(true)
    setError(null)
    try {
      return await deleteTenantPlace(userUuid)
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
    getTenant: handleGetTenant,
    updateTenant: handleUpdateTenant,
    uploadLogo: handleUploadLogo,
    uploadPlace: handleUploadPlace,
    deleteLogo: handleDeleteLogo,
    deletePlace: handleDeletePlace,
  }
}