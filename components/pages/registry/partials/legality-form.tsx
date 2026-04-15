'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Shield, CheckCircle2 } from 'lucide-react'

export interface LegalityFormData {
  bpomNumber: string
  productCategory: string
  bpomRegistrationDate: string
  bpomValidUntil: string
  halalCertificateNumber: string
  halalCertifiedBy: string
  halalIssuanceDate: string
  halalValidUntil: string
}

interface LegalityFormProps {
  onSubmit?: (data: LegalityFormData) => void
  isLoading?: boolean
}

export function LegalityForm({ onSubmit, isLoading = false }: LegalityFormProps) {
  const [formData, setFormData] = useState<LegalityFormData>({
    bpomNumber: '',
    productCategory: '',
    bpomRegistrationDate: '',
    bpomValidUntil: '',
    halalCertificateNumber: '',
    halalCertifiedBy: '',
    halalIssuanceDate: '',
    halalValidUntil: '',
  })

  const [errors, setErrors] = useState<Record<string, string>>({})

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }))
    if (errors[name]) {
      setErrors(prev => {
        const newErrors = { ...prev }
        delete newErrors[name]
        return newErrors
      })
    }
  }

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {}

    if (!formData.bpomNumber.trim()) {
      newErrors.bpomNumber = 'Nomor BPOM wajib diisi'
    }
    if (!formData.productCategory.trim()) {
      newErrors.productCategory = 'Kategori produk wajib dipilih'
    }
    if (!formData.bpomRegistrationDate.trim()) {
      newErrors.bpomRegistrationDate = 'Tanggal registrasi wajib diisi'
    }
    if (!formData.bpomValidUntil.trim()) {
      newErrors.bpomValidUntil = 'Berlaku hingga wajib diisi'
    }
    if (!formData.halalCertificateNumber.trim()) {
      newErrors.halalCertificateNumber = 'Nomor sertifikat halal wajib diisi'
    }
    if (!formData.halalCertifiedBy.trim()) {
      newErrors.halalCertifiedBy = 'Disertifikasi oleh wajib dipilih'
    }
    if (!formData.halalIssuanceDate.trim()) {
      newErrors.halalIssuanceDate = 'Tanggal terbit wajib diisi'
    }
    if (!formData.halalValidUntil.trim()) {
      newErrors.halalValidUntil = 'Berlaku hingga wajib diisi'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (validateForm() && onSubmit) {
      onSubmit(formData)
    }
  }

  const resetForm = () => {
    setFormData({
      bpomNumber: '',
      productCategory: '',
      bpomRegistrationDate: '',
      bpomValidUntil: '',
      halalCertificateNumber: '',
      halalCertifiedBy: '',
      halalIssuanceDate: '',
      halalValidUntil: '',
    })
    setErrors({})
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* BPOM Distribution Permit Section */}
      <div className="rounded-lg border border-blue-200 bg-white">
        <div className="border-b border-blue-200 px-8 py-6">
          <div className="flex items-center gap-3">
            <Shield className="h-6 w-6 text-blue-600" />
            <h2 className="text-lg font-bold text-gray-900">BPOM Distribution Permit</h2>
          </div>
        </div>

        <div className="space-y-5 px-8 py-8">
          {/* Nomor BPOM */}
          <div>
            <label htmlFor="bpomNumber" className="block text-sm font-semibold text-gray-700">
              Nomor BPOM <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="bpomNumber"
              name="bpomNumber"
              value={formData.bpomNumber}
              onChange={handleChange}
              placeholder="Contoh: MD 12345678901"
              className={`mt-2 block w-full rounded-lg border ${
                errors.bpomNumber ? 'border-red-500' : 'border-gray-300'
              } bg-gray-50 px-4 py-2 text-sm text-gray-900 placeholder-gray-400 focus:border-blue-500 focus:bg-white focus:outline-none focus:ring-1 focus:ring-blue-500`}
            />
            {errors.bpomNumber && (
              <p className="mt-1 text-xs font-semibold text-red-600">{errors.bpomNumber}</p>
            )}
          </div>

          {/* Row: Kategori Produk, Tanggal Registrasi, Berlaku Hingga */}
          <div className="grid gap-4 sm:grid-cols-3">
            <div>
              <label htmlFor="productCategory" className="block text-sm font-semibold text-gray-700">
                Kategori Produk <span className="text-red-500">*</span>
              </label>
              <select
                id="productCategory"
                name="productCategory"
                value={formData.productCategory}
                onChange={handleChange}
                className={`mt-2 block w-full rounded-lg border ${
                  errors.productCategory ? 'border-red-500' : 'border-gray-300'
                } bg-gray-50 px-4 py-2 text-sm text-gray-900 focus:border-blue-500 focus:bg-white focus:outline-none focus:ring-1 focus:ring-blue-500`}
              >
                <option value="">Pilih Kategori</option>
                <option value="Food & Beverage">Food & Beverage</option>
                <option value="Kosmetik">Kosmetik</option>
                <option value="Farmasi">Farmasi</option>
                <option value="Alat Kesehatan">Alat Kesehatan</option>
                <option value="Lainnya">Lainnya</option>
              </select>
              {errors.productCategory && (
                <p className="mt-1 text-xs font-semibold text-red-600">{errors.productCategory}</p>
              )}
            </div>

            <div>
              <label htmlFor="bpomRegistrationDate" className="block text-sm font-semibold text-gray-700">
                Tanggal Registrasi <span className="text-red-500">*</span>
              </label>
              <input
                type="date"
                id="bpomRegistrationDate"
                name="bpomRegistrationDate"
                value={formData.bpomRegistrationDate}
                onChange={handleChange}
                className={`mt-2 block w-full rounded-lg border ${
                  errors.bpomRegistrationDate ? 'border-red-500' : 'border-gray-300'
                } bg-gray-50 px-4 py-2 text-sm text-gray-900 focus:border-blue-500 focus:bg-white focus:outline-none focus:ring-1 focus:ring-blue-500`}
              />
              {errors.bpomRegistrationDate && (
                <p className="mt-1 text-xs font-semibold text-red-600">{errors.bpomRegistrationDate}</p>
              )}
            </div>

            <div>
              <label htmlFor="bpomValidUntil" className="block text-sm font-semibold text-gray-700">
                Berlaku Hingga <span className="text-red-500">*</span>
              </label>
              <input
                type="date"
                id="bpomValidUntil"
                name="bpomValidUntil"
                value={formData.bpomValidUntil}
                onChange={handleChange}
                className={`mt-2 block w-full rounded-lg border ${
                  errors.bpomValidUntil ? 'border-red-500' : 'border-gray-300'
                } bg-gray-50 px-4 py-2 text-sm text-gray-900 focus:border-blue-500 focus:bg-white focus:outline-none focus:ring-1 focus:ring-blue-500`}
              />
              {errors.bpomValidUntil && (
                <p className="mt-1 text-xs font-semibold text-red-600">{errors.bpomValidUntil}</p>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Halal Certification Section */}
      <div className="rounded-lg border border-green-200 bg-white">
        <div className="border-b border-green-200 px-8 py-6">
          <div className="flex items-center gap-3">
            <CheckCircle2 className="h-6 w-6 text-green-600" />
            <h2 className="text-lg font-bold text-gray-900">Halal Certification</h2>
          </div>
        </div>

        <div className="space-y-5 px-8 py-8">
          {/* Nomor Sertifikat Halal */}
          <div>
            <label htmlFor="halalCertificateNumber" className="block text-sm font-semibold text-gray-700">
              Nomor Sertifikat Halal <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="halalCertificateNumber"
              name="halalCertificateNumber"
              value={formData.halalCertificateNumber}
              onChange={handleChange}
              placeholder="Contoh: ID33210012345678"
              className={`mt-2 block w-full rounded-lg border ${
                errors.halalCertificateNumber ? 'border-red-500' : 'border-gray-300'
              } bg-gray-50 px-4 py-2 text-sm text-gray-900 placeholder-gray-400 focus:border-green-500 focus:bg-white focus:outline-none focus:ring-1 focus:ring-green-500`}
            />
            {errors.halalCertificateNumber && (
              <p className="mt-1 text-xs font-semibold text-red-600">{errors.halalCertificateNumber}</p>
            )}
          </div>

          {/* Row: Disertifikasi oleh, Tanggal Terbit, Berlaku Hingga */}
          <div className="grid gap-4 sm:grid-cols-3">
            <div>
              <label htmlFor="halalCertifiedBy" className="block text-sm font-semibold text-gray-700">
                Disertifikasi oleh <span className="text-red-500">*</span>
              </label>
              <select
                id="halalCertifiedBy"
                name="halalCertifiedBy"
                value={formData.halalCertifiedBy}
                onChange={handleChange}
                className={`mt-2 block w-full rounded-lg border ${
                  errors.halalCertifiedBy ? 'border-red-500' : 'border-gray-300'
                } bg-gray-50 px-4 py-2 text-sm text-gray-900 focus:border-green-500 focus:bg-white focus:outline-none focus:ring-1 focus:ring-green-500`}
              >
                <option value="">Pilih Lembaga</option>
                <option value="MUI">MUI</option>
                <option value="LPPOM MUI">LPPOM MUI</option>
                <option value="Lainnya">Lainnya</option>
              </select>
              {errors.halalCertifiedBy && (
                <p className="mt-1 text-xs font-semibold text-red-600">{errors.halalCertifiedBy}</p>
              )}
            </div>

            <div>
              <label htmlFor="halalIssuanceDate" className="block text-sm font-semibold text-gray-700">
                Tanggal Terbit <span className="text-red-500">*</span>
              </label>
              <input
                type="date"
                id="halalIssuanceDate"
                name="halalIssuanceDate"
                value={formData.halalIssuanceDate}
                onChange={handleChange}
                className={`mt-2 block w-full rounded-lg border ${
                  errors.halalIssuanceDate ? 'border-red-500' : 'border-gray-300'
                } bg-gray-50 px-4 py-2 text-sm text-gray-900 focus:border-green-500 focus:bg-white focus:outline-none focus:ring-1 focus:ring-green-500`}
              />
              {errors.halalIssuanceDate && (
                <p className="mt-1 text-xs font-semibold text-red-600">{errors.halalIssuanceDate}</p>
              )}
            </div>

            <div>
              <label htmlFor="halalValidUntil" className="block text-sm font-semibold text-gray-700">
                Berlaku Hingga <span className="text-red-500">*</span>
              </label>
              <input
                type="date"
                id="halalValidUntil"
                name="halalValidUntil"
                value={formData.halalValidUntil}
                onChange={handleChange}
                className={`mt-2 block w-full rounded-lg border ${
                  errors.halalValidUntil ? 'border-red-500' : 'border-gray-300'
                } bg-gray-50 px-4 py-2 text-sm text-gray-900 focus:border-green-500 focus:bg-white focus:outline-none focus:ring-1 focus:ring-green-500`}
              />
              {errors.halalValidUntil && (
                <p className="mt-1 text-xs font-semibold text-red-600">{errors.halalValidUntil}</p>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Submit Buttons */}
      <div className="flex gap-3 pt-8">
          <Button
            type="button"
            variant="outline"
            className="flex-1 py-6 font-semibold"
            onClick={resetForm}
          >
            Sebelumnya
          </Button>
          <Button
            type="submit"
            disabled={isLoading}
            className="flex-1 bg-blue-600 py-6 text-base font-semibold hover:bg-blue-700"
          >
            {isLoading ? 'Memproses...' : 'Selanjutnya'}
          </Button>
        </div>
    </form>
  )
}
