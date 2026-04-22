'use client'

import { useState } from 'react'
import { ChevronLeft, Loader2, AlertCircle, CheckCircle2, Copy } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { ProductFormData, ProductInfoForm, EnterpriseFormData, EnterpriseForm, NutritionForm, NutritionFormData, LegalityForm, LegalityFormData, Rekap } from './partials'
import { useRegistrySubmit } from '@/hooks/useRegistrySubmit'

interface RegistryPageProps {
  onSubmitProductInfo?: (data: ProductFormData) => void
  onSubmitEnterpriseInfo?: (data: EnterpriseFormData) => void
  onSubmitNutritionInfo?: (data: NutritionFormData) => void
  onSubmitLegalityInfo?: (data: LegalityFormData) => void
}

export function RegistryPage({ onSubmitProductInfo, onSubmitEnterpriseInfo, onSubmitNutritionInfo, onSubmitLegalityInfo }: RegistryPageProps) {
  const [currentStep, setCurrentStep] = useState(1)
  const totalSteps = 5

  const [productData, setProductData] = useState<ProductFormData | undefined>()
  const [nutritionData, setNutritionData] = useState<NutritionFormData | undefined>()
  const [legalityData, setLegalityData] = useState<LegalityFormData | undefined>()
  const [enterpriseData, setEnterpriseData] = useState<EnterpriseFormData | undefined>()
  const [submissionData, setSubmissionData] = useState<any>(null)

  const { submit, loading, error, success } = useRegistrySubmit()

  const handleSubmitProduct = (formData: ProductFormData) => {
    console.log('Product Info Form Data:', formData)
    setProductData(formData)
    setCurrentStep(2)
    if (onSubmitProductInfo) {
      onSubmitProductInfo(formData)
    }
  }

  const handleSubmitNutrition = (formData: NutritionFormData) => {
    console.log('Nutrition Info Form Data:', formData)
    setNutritionData(formData)
    setCurrentStep(3)
    if (onSubmitNutritionInfo) {
      onSubmitNutritionInfo(formData)
    }
  }

  const handleSubmitEnterprise = (formData: EnterpriseFormData) => {
    console.log('Enterprise Info Form Data:', formData)
    setEnterpriseData(formData)
    setCurrentStep(5)
    if (onSubmitEnterpriseInfo) {
      onSubmitEnterpriseInfo(formData)
    }
  }

  const handleSubmitLegality = (formData: LegalityFormData) => {
    console.log('Legality Info Form Data:', formData)
    setLegalityData(formData)
    setCurrentStep(4)
    if (onSubmitLegalityInfo) {
      onSubmitLegalityInfo(formData)
    }
  }

  const handleEditStep = (step: number) => {
    setCurrentStep(step)
  }

  const handleFinalSubmit = async () => {
    if (!productData || !nutritionData || !legalityData || !enterpriseData) {
      console.error('Missing required data')
      return
    }

    try {
      const result = await submit({
        productData,
        nutritionData,
        legalityData,
        enterpriseData,
      })
      setSubmissionData(result)
    } catch (err) {
      console.error('Submission failed:', err)
    }
  }

  const handleCopyCode = () => {
    if (submissionData?.data?.licenseCode) {
      navigator.clipboard.writeText(submissionData.data.licenseCode)
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
      <div className="border-b border-gray-200 bg-white px-4 py-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-3">
          <Button variant="ghost" size="sm" className="p-0">
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <div>
            <h1 className="text-lg font-bold text-gray-900">Pendaftaran Produk</h1>
            <p className="text-xs text-gray-600">Daftarkan produk UMKM Anda untuk legalitas</p>
          </div>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="bg-white px-4 py-2 sm:px-6 lg:px-8">
        <div className="h-1.5 w-full overflow-hidden rounded-full bg-gray-200">
          <div
            className="h-full bg-blue-600 transition-all duration-300"
            style={{ width: `${progressPercentage}%` }}
          />
        </div>
      </div>

      {/* Tabs/Navigation */}
      <div className="border-b border-gray-200 bg-white px-4 sm:px-6 lg:px-8">
        <div className="flex justify-center gap-2 overflow-x-auto">
          {steps.map((step) => (
            <button
              key={step.id}
              onClick={() => setCurrentStep(step.id)}
              className={`flex items-center gap-1.5 border-b-2 px-3 py-3 text-xs font-medium transition-all whitespace-nowrap ${
                currentStep === step.id
                  ? 'border-blue-600 text-blue-600'
                  : 'border-transparent text-gray-600 hover:text-gray-900'
              }`}
            >
              <span className={`flex h-4 w-4 items-center justify-center rounded-full text-xxs font-semibold ${
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

      {/* Status Messages */}
      {error && (
        <div className="mx-auto max-w-7xl px-4 py-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3 rounded-lg border border-red-200 bg-red-50 p-4">
            <AlertCircle className="h-5 w-5 text-red-600" />
            <div>
              <p className="font-semibold text-red-900">Terjadi Kesalahan</p>
              <p className="text-sm text-red-700">{error}</p>
            </div>
          </div>
        </div>
      )}

      {success && (
        <div className="mx-auto max-w-7xl px-4 py-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3 rounded-lg border border-green-200 bg-green-50 p-4">
            <CheckCircle2 className="h-5 w-5 text-green-600" />
            <div>
              <p className="font-semibold text-green-900">Berhasil!</p>
              <p className="text-sm text-green-700">Data produk Anda telah berhasil disimpan ke database</p>
            </div>
          </div>
        </div>
      )}

      {/* Content */}
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        {success ? (
          <div className="flex flex-col items-center justify-center space-y-6 rounded-lg border-2 border-dashed border-green-300 bg-green-50 p-12">
            <CheckCircle2 className="h-16 w-16 text-green-600" />
            <h2 className="text-2xl font-bold text-gray-900">Pendaftaran Berhasil!</h2>
            <p className="text-center text-gray-600">
              Terima kasih telah mendaftarkan produk Anda. Data Anda akan kami proses lebih lanjut.
            </p>

            {/* License Code Display */}
            {submissionData?.data?.licenseCode && (
              <div className="w-full max-w-md rounded-lg bg-white p-6 shadow">
                <p className="mb-3 text-center text-sm font-semibold text-gray-700">
                  Kode Lisensi Produk
                </p>
                <div className="flex items-center gap-2">
                  <div className="flex-1 rounded-lg border border-gray-300 bg-gray-50 px-4 py-3">
                    <p className="break-all font-mono text-sm text-gray-900">
                      {submissionData.data.licenseCode}
                    </p>
                  </div>
                  <button
                    onClick={handleCopyCode}
                    className="flex items-center justify-center rounded-lg border border-gray-300 bg-white p-3 hover:bg-gray-50"
                    title="Salin kode"
                  >
                    <Copy className="h-4 w-4 text-gray-600" />
                  </button>
                </div>
              </div>
            )}

            <div className="flex flex-col gap-3 sm:flex-row">
              <Button
                onClick={() => submissionData?.data?.licenseCode && (window.location.href = `/licenses/${submissionData.data.licenseCode}`)}
                className="bg-green-600 hover:bg-green-700"
              >
                Lihat Lisensi Produk
              </Button>
              <Button
                variant="outline"
                onClick={() => window.location.href = '/dashboard'}
              >
                Kembali ke Dashboard
              </Button>
            </div>
          </div>
        ) : (
          <>
            {currentStep === 1 && <ProductInfoForm onSubmit={handleSubmitProduct} initialData={productData} />}
            {currentStep === 2 && <NutritionForm onSubmit={handleSubmitNutrition} onPrevious={() => setCurrentStep(1)} initialData={nutritionData} />}
            {currentStep === 3 && <LegalityForm onSubmit={handleSubmitLegality} onPrevious={() => setCurrentStep(2)} initialData={legalityData} />}
            {currentStep === 4 && <EnterpriseForm onSubmit={handleSubmitEnterprise} onPrevious={() => setCurrentStep(3)} initialData={enterpriseData} />}
            {currentStep === 5 && (
              <Rekap
                productData={productData}
                nutritionData={nutritionData}
                legalityData={legalityData}
                enterpriseData={enterpriseData}
                onSubmit={handleFinalSubmit}
                onEdit={handleEditStep}
                isLoading={loading}
              />
            )}
          </>
        )}
      </div>
    </div>
  )
}
