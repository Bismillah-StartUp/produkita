'use client'

import { useState } from 'react'
import type { ProductFormData } from '@/components/pages/registry/partials/product-form'
import type { NutritionFormData } from '@/components/pages/registry/partials/nutritions-form'
import type { EnterpriseFormData } from '@/components/pages/registry/partials/enterprise-form'
import type { LegalityFormData } from '@/components/pages/registry/partials/legality-form'

interface RegistrySubmitPayload {
  productData: ProductFormData & { productPhotoBase64?: string }
  nutritionData: NutritionFormData
  legalityData: LegalityFormData
  enterpriseData: EnterpriseFormData
}

export function useRegistrySubmit() {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)

  const submit = async (data: RegistrySubmitPayload) => {
    setLoading(true)
    setError(null)
    setSuccess(false)

    try {
      // Convert File to base64 if present
      let productPhotoBase64: string | undefined

      if (data.productData.productPhoto instanceof File) {
        productPhotoBase64 = await new Promise<string>((resolve, reject) => {
          const reader = new FileReader()
          reader.onloadend = () => {
            if (typeof reader.result === 'string') {
              resolve(reader.result)
            } else {
              reject(new Error('Failed to read file'))
            }
          }
          reader.onerror = () => reject(reader.error)
          reader.readAsDataURL(data.productData.productPhoto as File)
        })
      } else if (data.productData.productPhotoPreview) {
        productPhotoBase64 = data.productData.productPhotoPreview
      }

      // Prepare payload for API
      const payload: any = {
        productData: {
          productName: data.productData.productName,
          brandName: data.productData.brandName,
          price: data.productData.price,
          weight: data.productData.weight,
          unit: data.productData.unit,
          productPhotoBase64,
        },
        nutritionData: {
          servingSize: data.nutritionData.servingSize,
          calories: data.nutritionData.calories,
          totalFat: data.nutritionData.totalFat,
          saturatedFat: data.nutritionData.saturatedFat,
          carbohydrates: data.nutritionData.carbohydrates,
          protein: data.nutritionData.protein,
          sodium: data.nutritionData.sodium,
          sugar: data.nutritionData.sugar,
        },
        legalityData: {
          hasBpom: data.legalityData.hasBpom,
          hasPirt: data.legalityData.hasPirt,
          hasHalal: data.legalityData.hasHalal,
          bpomNumber: data.legalityData.bpomNumber,
          productCategory: data.legalityData.productCategory,
          bpomRegistrationDate: data.legalityData.bpomRegistrationDate,
          bpomValidUntil: data.legalityData.bpomValidUntil,
          pirtNumber: data.legalityData.pirtNumber,
          pirtRegistrationDate: data.legalityData.pirtRegistrationDate,
          pirtValidUntil: data.legalityData.pirtValidUntil,
          halalCertificateNumber: data.legalityData.halalCertificateNumber,
          halalCertifiedBy: data.legalityData.halalCertifiedBy,
          halalIssuanceDate: data.legalityData.halalIssuanceDate,
          halalValidUntil: data.legalityData.halalValidUntil,
        },
        enterpriseData: {
          companyName: data.enterpriseData.companyName,
          district: data.enterpriseData.district,
          province: data.enterpriseData.province,
          address: data.enterpriseData.address,
          phone: data.enterpriseData.phone,
          email: data.enterpriseData.email,
        },
      }

      console.log('📤 Submitting registry data...')

      const response = await fetch('/api/registry/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      })

      const result = await response.json()

      if (!response.ok) {
        throw new Error(result.error || 'Failed to submit registry')
      }

      setSuccess(true)
      console.log('✅ Registry submitted successfully:', result)

      return result
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Unknown error'
      setError(errorMessage)
      console.error('❌ Registry submission failed:', err)
      throw err
    } finally {
      setLoading(false)
    }
  }

  return { submit, loading, error, success }
}
