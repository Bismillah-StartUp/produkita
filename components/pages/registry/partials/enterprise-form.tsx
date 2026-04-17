'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Building2 } from 'lucide-react'

export interface EnterpriseFormData {
  companyName: string
  address: string
  phone: string
  email: string
}

interface EnterpriseFormProps {
  onSubmit?: (data: EnterpriseFormData) => void
  onPrevious?: () => void
  initialData?: Partial<EnterpriseFormData>
  isLoading?: boolean
}

export function EnterpriseForm({ onSubmit, onPrevious, initialData, isLoading = false }: EnterpriseFormProps) {
  const [formData, setFormData] = useState<EnterpriseFormData>({
    companyName: initialData?.companyName ?? '',
    address: initialData?.address ?? '',
    phone: initialData?.phone ?? '',
    email: initialData?.email ?? '',
  })

  const [errors, setErrors] = useState<Record<string, string>>({})

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
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

    if (!formData.companyName.trim()) {
      newErrors.companyName = 'Nama perusahaan wajib diisi'
    }
    if (!formData.address.trim()) {
      newErrors.address = 'Alamat lengkap wajib diisi'
    }
    if (!formData.phone.trim()) {
      newErrors.phone = 'Nomor telepon wajib diisi'
    }
    if (!formData.email.trim()) {
      newErrors.email = 'Email wajib diisi'
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Email tidak valid'
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

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {/* Main Card Container */}
      <div className="rounded-lg border border-gray-200 bg-white">
        {/* Header */}
        <div className="border-b border-gray-200 px-8 py-6">
          <div className="flex items-center gap-3">
            <Building2 className="h-6 w-6 text-blue-600" />
            <h2 className="text-lg font-bold text-gray-900">Informasi Perusahaan</h2>
          </div>
        </div>

        {/* Content */}
        <div className="space-y-5 px-8 py-8">
          {/* Company Name */}
          <div>
            <label htmlFor="companyName" className="block text-sm font-semibold text-gray-700">
              Nama Perusahaan <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="companyName"
              name="companyName"
              value={formData.companyName}
              onChange={handleChange}
              placeholder="Contoh: PT Rasa Nusantara Sejahtera"
              className={`mt-2 block w-full rounded-lg border ${
                errors.companyName ? 'border-red-500' : 'border-gray-300'
              } bg-gray-50 px-4 py-2 text-sm text-gray-900 placeholder-gray-400 focus:border-blue-500 focus:bg-white focus:outline-none focus:ring-1 focus:ring-blue-500`}
            />
            {errors.companyName && (
              <p className="mt-1 text-xs font-semibold text-red-600">{errors.companyName}</p>
            )}
          </div>

          {/* Address */}
          <div>
            <label htmlFor="address" className="block text-sm font-semibold text-gray-700">
              Alamat Lengkap <span className="text-red-500">*</span>
            </label>
            <textarea
              id="address"
              name="address"
              value={formData.address}
              onChange={handleChange}
              placeholder="Contoh: Jl. Industri No. 45, Bandung, Jawa Barat 40123"
              rows={5}
              className={`mt-2 block w-full rounded-lg border ${
                errors.address ? 'border-red-500' : 'border-gray-300'
              } bg-gray-50 px-4 py-2 text-sm text-gray-900 placeholder-gray-400 focus:border-blue-500 focus:bg-white focus:outline-none focus:ring-1 focus:ring-blue-500`}
            />
            {errors.address && (
              <p className="mt-1 text-xs font-semibold text-red-600">{errors.address}</p>
            )}
          </div>

          {/* Phone and Email Row */}
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label htmlFor="phone" className="block text-sm font-semibold text-gray-700">
                Nomor Telepon <span className="text-red-500">*</span>
              </label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="Contoh: +62 22 1234 5678"
                className={`mt-2 block w-full rounded-lg border ${
                  errors.phone ? 'border-red-500' : 'border-gray-300'
                } bg-gray-50 px-4 py-2 text-sm text-gray-900 placeholder-gray-400 focus:border-blue-500 focus:bg-white focus:outline-none focus:ring-1 focus:ring-blue-500`}
              />
              {errors.phone && (
                <p className="mt-1 text-xs font-semibold text-red-600">{errors.phone}</p>
              )}
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-semibold text-gray-700">
                Email <span className="text-red-500">*</span>
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Contoh: info@rasanusantara.co.id"
                className={`mt-2 block w-full rounded-lg border ${
                  errors.email ? 'border-red-500' : 'border-gray-300'
                } bg-gray-50 px-4 py-2 text-sm text-gray-900 placeholder-gray-400 focus:border-blue-500 focus:bg-white focus:outline-none focus:ring-1 focus:ring-blue-500`}
              />
              {errors.email && (
                <p className="mt-1 text-xs font-semibold text-red-600">{errors.email}</p>
              )}
            </div>
          </div>

          {/* Submit Buttons */}
          <div className="flex gap-3 pt-8">
            <Button
              type="button"
              variant="outline"
              className="flex-1 py-6 font-semibold"
              onClick={onPrevious}
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
        </div>
      </div>
    </form>
  )
}
