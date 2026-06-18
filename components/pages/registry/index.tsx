"use client"

import { useState } from "react"
import { AlertCircle, CheckCircle2, Copy } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  ProductFormData,
  ProductInfoForm,
  ServingFormData,
  ServingForm,
  NutritionForm,
  NutritionFormData,
  LegalityForm,
  LegalityFormData,
  Rekap,
} from "./partials"
import { useRegistrySubmit } from "@/hooks/useRegistrySubmit"

interface RegistryPageProps {
  onSubmitProductInfo?: (data: ProductFormData) => void
  onSubmitServingInfo?: (data: ServingFormData) => void
  onSubmitNutritionInfo?: (data: NutritionFormData) => void
  onSubmitLegalityInfo?: (data: LegalityFormData) => void
}

const STEPS = [
  { id: 1, label: "Dasar Produk UMKM" },
  { id: 2, label: "Nutrisi & Gizi" },
  { id: 3, label: "Sertifikat" },
  { id: 4, label: "Saran Penyajian" },
  { id: 5, label: "Rekap Data" },
]

export function RegistryPage({
  onSubmitProductInfo,
  onSubmitServingInfo,
  onSubmitNutritionInfo,
  onSubmitLegalityInfo,
}: RegistryPageProps) {
  const [currentStep, setCurrentStep] = useState(1)

  const [productData, setProductData] = useState<ProductFormData | undefined>()
  const [nutritionData, setNutritionData] = useState<NutritionFormData | undefined>()
  const [legalityData, setLegalityData] = useState<LegalityFormData | undefined>()

  const [servingData, setServingData] = useState<ServingFormData | undefined>()

  const [submissionData, setSubmissionData] = useState<any>(null)

  const { submit, loading, error, success } = useRegistrySubmit()

  const handleSubmitProduct = (formData: ProductFormData) => {
    setProductData(formData)
    setCurrentStep(2)
    onSubmitProductInfo?.(formData)
  }

  const handleSubmitNutrition = (formData: NutritionFormData) => {
    setNutritionData(formData)
    setCurrentStep(3)
    onSubmitNutritionInfo?.(formData)
  }

  const handleSubmitLegality = (formData: LegalityFormData) => {
    setLegalityData(formData)
    setCurrentStep(4)
    onSubmitLegalityInfo?.(formData)
  }

  const handleSubmitServing = (formData: ServingFormData) => {
    setServingData(formData)
    setCurrentStep(5)
    onSubmitServingInfo?.(formData)
  }

  const handleEditStep = (step: number) => setCurrentStep(step)

  const handleFinalSubmit = async () => {
    if (!productData || !nutritionData || !legalityData || !servingData) return
    try {
      const result = await submit({ productData, nutritionData, legalityData, servingData })
      setSubmissionData(result)
    } catch (err) {
      console.error("Submission failed:", err)
    }
  }

  const handleCopyCode = () => {
    if (submissionData?.data?.licenseCode) {
      navigator.clipboard.writeText(submissionData.data.licenseCode)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="mb-2 bg-gray-50 px-4 pb-2 pt-5 sm:px-6 lg:px-8">
        <h1 className="text-sm font-semibold text-blue-600">Pendaftaran Produk</h1>
        <p className="mt-1 text-xs text-gray-500">Lengkapi Dasar Produk UMKM untuk mendapatkan QR Code</p>
      </div>

      {/* Progress Bar */}
      <div className="bg-gray-50 px-4 pb-4 sm:px-6 lg:px-8">
        <div className="rounded-xl border border-gray-200 bg-white px-6 py-4">
          {/* Tabs/Navigation */}
          <div className="flex items-center">
            {STEPS.map((step, index) => {
              const isActive = currentStep === step.id
              const isDone = currentStep > step.id
              const isLast = index === STEPS.length - 1

              return (
                <div key={step.id} className="flex min-w-0 flex-1 items-center">
                  <button
                    type="button"
                    onClick={() => setCurrentStep(step.id)}
                    className="flex shrink-0 items-center gap-2 transition-opacity hover:opacity-80"
                  >
                    <span
                      className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-xs font-semibold transition-colors ${
                        isDone
                          ? "bg-green-500 text-white"
                          : isActive
                            ? "bg-blue-600 text-white"
                            : "bg-gray-100 text-gray-400"
                      }`}
                    >
                      {isDone ? (
                        <svg
                          className="h-3.5 w-3.5"
                          viewBox="0 0 14 14"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <polyline points="2,7 5.5,10.5 12,3.5" />
                        </svg>
                      ) : (
                        step.id
                      )}
                    </span>
                    <span
                      className={`whitespace-nowrap text-sm transition-colors ${
                        isDone
                          ? "font-medium text-green-600"
                          : isActive
                            ? "font-semibold text-blue-600"
                            : "font-normal text-gray-400"
                      }`}
                    >
                      {step.label}
                    </span>
                  </button>
                  {!isLast && (
                    <div
                      className={`mx-3 h-px flex-1 transition-colors ${
                        currentStep > step.id ? "bg-green-400" : "bg-gray-200"
                      }`}
                    />
                  )}
                </div>
              )
            })}
          </div>
        </div>
      </div>

      {/* Status Messages */}
      {error && (
        <div className="mx-auto max-w-7xl px-4 pb-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3 rounded-lg border border-red-200 bg-red-50 p-4">
            <AlertCircle className="h-5 w-5 shrink-0 text-red-600" />
            <div>
              <p className="font-semibold text-red-900">Terjadi Kesalahan</p>
              <p className="text-sm text-red-700">{error}</p>
            </div>
          </div>
        </div>
      )}

      {success && (
        <div className="mx-auto max-w-7xl px-4 pb-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3 rounded-lg border border-green-200 bg-green-50 p-4">
            <CheckCircle2 className="h-5 w-5 shrink-0 text-green-600" />
            <div>
              <p className="font-semibold text-green-900">Berhasil!</p>
              <p className="text-sm text-green-700">Data produk Anda telah berhasil disimpan</p>
            </div>
          </div>
        </div>
      )}

      {/* Content */}
      <div className="mx-auto max-w-7xl px-4 pb-12 sm:px-6 lg:px-8">
        {success ? (
          <div className="flex flex-col items-center justify-center space-y-6 rounded-xl border border-gray-200 bg-white p-12">
            <CheckCircle2 className="h-16 w-16 text-green-500" />
            <h2 className="text-2xl font-bold text-gray-900">Pendaftaran Berhasil!</h2>
            <p className="text-center text-gray-500">
              Terima kasih telah mendaftarkan produk Anda. Data Anda akan kami proses lebih lanjut.
            </p>

            {/* License Code Display */}
            {submissionData?.data?.licenseCode && (
              <div className="w-full max-w-md rounded-lg border border-gray-200 bg-gray-50 p-6">
                <p className="mb-3 text-center text-sm font-semibold text-gray-700">Kode Lisensi Produk</p>
                <div className="flex items-center gap-2">
                  <div className="flex-1 rounded-lg border border-gray-200 bg-white px-4 py-3">
                    <p className="break-all font-mono text-sm text-gray-900">{submissionData.data.licenseCode}</p>
                  </div>
                  <button
                    onClick={handleCopyCode}
                    className="flex items-center justify-center rounded-lg border border-gray-200 bg-white p-3 hover:bg-gray-50"
                    title="Salin kode"
                  >
                    <Copy className="h-4 w-4 text-gray-500" />
                  </button>
                </div>
              </div>
            )}

            <div className="flex flex-col gap-3 sm:flex-row">
              <Button
                onClick={() =>
                  submissionData?.data?.licenseCode &&
                  (window.location.href = `/licenses/${submissionData.data.licenseCode}`)
                }
                className="bg-blue-600 hover:bg-blue-700"
              >
                Lihat Lisensi Produk
              </Button>
              <Button variant="outline" onClick={() => (window.location.href = "/dashboard")}>
                Kembali ke Dashboard
              </Button>
            </div>
          </div>
        ) : (
          <>
            {currentStep === 1 && <ProductInfoForm onSubmit={handleSubmitProduct} initialData={productData} />}
            {currentStep === 2 && (
              <NutritionForm
                onSubmit={handleSubmitNutrition}
                onPrevious={() => setCurrentStep(1)}
                initialData={nutritionData}
              />
            )}
            {currentStep === 3 && (
              <LegalityForm
                onSubmit={handleSubmitLegality}
                onPrevious={() => setCurrentStep(2)}
                initialData={legalityData}
              />
            )}
            {currentStep === 4 && (
              <ServingForm onSubmit={handleSubmitServing} onPrevious={() => setCurrentStep(3)} initialData={servingData} />
            )}
            {currentStep === 5 && (
              <Rekap
                productData={productData}
                nutritionData={nutritionData}
                legalityData={legalityData}
                servingData={servingData}
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
