"use client"

import { useState } from "react"
import {
  getProductInfo,
  getProductNutrition,
  getProductCertificates,
  getProductServing,
  getProductCompany,
} from "@/servers/licenses/license.actions"

export const useLicense = () => {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handle = async <T>(fn: () => Promise<T>): Promise<T | null> => {
    setLoading(true)
    setError(null)
    try {
      return await fn()
    } catch (err: any) {
      setError(err.message)
      return null
    } finally {
      setLoading(false)
    }
  }

  const handleGetProductInfo = async (licenseCode: string) =>
    handle(() => getProductInfo(licenseCode))

  const handleGetProductNutrition = async (licenseCode: string) =>
    handle(() => getProductNutrition(licenseCode))

  const handleGetProductCertificates = async (licenseCode: string) =>
    handle(() => getProductCertificates(licenseCode))

  const handleGetProductServing = async (licenseCode: string) =>
    handle(() => getProductServing(licenseCode))

  const handleGetProductCompany = async (licenseCode: string) =>
    handle(() => getProductCompany(licenseCode))

  return {
    loading,
    error,
    getProductInfo: handleGetProductInfo,
    getProductNutrition: handleGetProductNutrition,
    getProductCertificates: handleGetProductCertificates,
    getProductServing: handleGetProductServing,
    getProductCompany: handleGetProductCompany,
  }
}