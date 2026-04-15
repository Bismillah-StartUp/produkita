'use client'

import { useState } from 'react'
import { ChevronLeft } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { ProductFormData, ProductInfoForm, EnterpriseFormData, EnterpriseForm, NutritionForm, NutritionFormData } from './partials'

interface RegistryPageProps {
  onSubmitProductInfo?: (data: ProductFormData) => void
  onSubmitEnterpriseInfo?: (data: EnterpriseFormData) => void
  onSubmitNutritionInfo?: (data: NutritionFormData) => void
}

export function RegistryPage({ onSubmitProductInfo, onSubmitEnterpriseInfo, onSubmitNutritionInfo }: RegistryPageProps) {
  const [currentStep, setCurrentStep] = useState(1)
  const totalSteps = 4

  const handleSubmitProduct = (formData: ProductFormData) => {
    console.log('Product Info Form Data:', formData)
    if (onSubmitProductInfo) {
      onSubmitProductInfo(formData)
    }
  }

  const handleSubmitNutrition = (formData: NutritionFormData) => {
    console.log('Nutrition Info Form Data:', formData)
    if (onSubmitNutritionInfo) {
      onSubmitNutritionInfo(formData)
    }
  }

  const handleSubmitEnterprise = (formData: EnterpriseFormData) => {
    console.log('Enterprise Info Form Data:', formData)
    if (onSubmitEnterpriseInfo) {
      onSubmitEnterpriseInfo(formData)
    }
  }

  // Calculate progress percentage
  const progressPercentage = (currentStep / totalSteps) * 100

  const steps = [
    { id: 1, label: 'Informasi Produk' },
    { id: 2, label: 'Informasi Nutrisi' },
    { id: 3, label: 'Sertifikasi & Legalitas' },
    { id: 4, label: 'Informasi Perusahaan' },
    { id: 5, label: 'Rekap Data' },
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="border-b border-gray-200 bg-white px-4 py-6 sm:px-6 lg:px-8">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="sm" className="p-0">
            <ChevronLeft className="h-5 w-5" />
          </Button>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Pendaftaran Produk</h1>
            <p className="text-sm text-gray-600">Daftarkan produk UMKM Anda untuk legalitas</p>
          </div>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="bg-white px-4 py-4 sm:px-6 lg:px-8">
        <div className="h-2 w-full overflow-hidden rounded-full bg-gray-200">
          <div
            className="h-full bg-blue-600 transition-all duration-300"
            style={{ width: `${progressPercentage}%` }}
          />
        </div>
      </div>

      {/* Tabs/Navigation */}
      <div className="border-b border-gray-200 bg-white px-4 sm:px-6 lg:px-8">
        <div className="flex justify-center gap-4 overflow-x-auto">
          {steps.map((step) => (
            <button
              key={step.id}
              onClick={() => setCurrentStep(step.id)}
              className={`flex items-center gap-2 border-b-2 px-4 py-4 text-sm font-medium transition-all whitespace-nowrap ${
                currentStep === step.id
                  ? 'border-blue-600 text-blue-600'
                  : 'border-transparent text-gray-600 hover:text-gray-900'
              }`}
            >
              <span className={`flex h-5 w-5 items-center justify-center rounded-full text-xs font-semibold ${
                currentStep === step.id
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-200 text-gray-700'
              }`}>
                {step.id}
              </span>
              {step.label}
            </button>
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        {currentStep === 1 && <ProductInfoForm onSubmit={handleSubmitProduct} />}
        {currentStep === 2 && <NutritionForm onSubmit={handleSubmitNutrition} />}
        {currentStep === 3 && (
          <div className="rounded-lg border border-gray-200 bg-white p-8 text-center">
            <p className="text-gray-600">Sertifikasi & Legalitas - Coming Soon</p>
          </div>
        )}
        {currentStep === 4 && <EnterpriseForm onSubmit={handleSubmitEnterprise} />}
        {currentStep === 5 && (
          <div className="rounded-lg border border-gray-200 bg-white p-8 text-center">
            <p className="text-gray-600">Rekap Data - Coming Soon</p>
          </div>
        )}
      </div>
    </div>
  )
}
