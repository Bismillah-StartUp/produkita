'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { FileText, Building2, MapPin, User, AlertCircle } from 'lucide-react'

export interface LegalFormData {
  companyRegistration: string
  registrationNumber: string
  registrationDate: string
  taxId: string
  businessLicense: string
  businessLicenseNumber: string
  businessLicenseDate: string
  npwp: string
  siup: string
  tdb: string
  legalStatus: string
  companyType: string
  authorizedPersonName: string
  authorizedPersonTitle: string
  documentationUrl: string
  notes: string
}

interface LegalInfoFormProps {
  onSubmit?: (data: LegalFormData) => void
  isLoading?: boolean
}

export function LegalInfoForm({ onSubmit, isLoading = false }: LegalInfoFormProps) {
  const [formData, setFormData] = useState<LegalFormData>({
    companyRegistration: '',
    registrationNumber: '',
    registrationDate: '',
    taxId: '',
    businessLicense: '',
    businessLicenseNumber: '',
    businessLicenseDate: '',
    npwp: '',
    siup: '',
    tdb: '',
    legalStatus: '',
    companyType: '',
    authorizedPersonName: '',
    authorizedPersonTitle: '',
    documentationUrl: '',
    notes: '',
  })

  const [errors, setErrors] = useState<Record<string, string>>({})

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }))
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: '',
      }))
    }
  }

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {}

    if (!formData.companyRegistration.trim()) {
      newErrors.companyRegistration = 'Registrasi perusahaan wajib diisi'
    }
    if (!formData.registrationNumber.trim()) {
      newErrors.registrationNumber = 'Nomor registrasi wajib diisi'
    }
    if (!formData.companyType.trim()) {
      newErrors.companyType = 'Jenis perusahaan wajib dipilih'
    }
    if (!formData.legalStatus.trim()) {
      newErrors.legalStatus = 'Status hukum wajib dipilih'
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
      companyRegistration: '',
      registrationNumber: '',
      registrationDate: '',
      taxId: '',
      businessLicense: '',
      businessLicenseNumber: '',
      businessLicenseDate: '',
      npwp: '',
      siup: '',
      tdb: '',
      legalStatus: '',
      companyType: '',
      authorizedPersonName: '',
      authorizedPersonTitle: '',
      documentationUrl: '',
      notes: '',
    })
    setErrors({})
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Company Info Section */}
      <div className="rounded-lg border border-blue-200 bg-white">
        <div className="flex items-center gap-3 px-6 py-4">
          <Building2 className="h-6 w-6 text-blue-600" />
          <h3 className="text-lg font-bold text-gray-900">
            Informasi Perusahaan
          </h3>
        </div>

        <div className="border-t border-blue-200 px-6 py-6">
          <div className="grid gap-5 sm:grid-cols-2">
            <div>
              <label htmlFor="companyRegistration" className="block text-sm font-semibold text-gray-700">
                Registrasi Perusahaan <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="companyRegistration"
                name="companyRegistration"
                value={formData.companyRegistration}
                onChange={handleChange}
                placeholder="PT ABC Indonesia"
                className={`mt-2 block w-full rounded-lg border ${
                  errors.companyRegistration
                    ? 'border-red-500'
                    : 'border-gray-300'
                } bg-gray-50 px-4 py-2 text-sm text-gray-900 placeholder-gray-400 focus:border-blue-500 focus:bg-white focus:outline-none focus:ring-1 focus:ring-blue-500`}
              />
              {errors.companyRegistration && (
                <p className="mt-2 text-xs font-semibold text-red-600">
                  {errors.companyRegistration}
                </p>
              )}
            </div>

            <div>
              <label htmlFor="registrationNumber" className="block text-sm font-semibold text-gray-700">
                Nomor Registrasi <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="registrationNumber"
                name="registrationNumber"
                value={formData.registrationNumber}
                onChange={handleChange}
                placeholder="08.01.0123456"
                className={`mt-2 block w-full rounded-lg border ${
                  errors.registrationNumber
                    ? 'border-red-500'
                    : 'border-gray-300'
                } bg-gray-50 px-4 py-2 text-sm text-gray-900 placeholder-gray-400 focus:border-blue-500 focus:bg-white focus:outline-none focus:ring-1 focus:ring-blue-500`}
              />
              {errors.registrationNumber && (
                <p className="mt-2 text-xs font-semibold text-red-600">
                  {errors.registrationNumber}
                </p>
              )}
            </div>

            <div>
              <label htmlFor="registrationDate" className="block text-sm font-semibold text-gray-700">
                Tanggal Registrasi
              </label>
              <input
                type="date"
                id="registrationDate"
                name="registrationDate"
                value={formData.registrationDate}
                onChange={handleChange}
                className="mt-2 block w-full rounded-lg border border-gray-300 bg-gray-50 px-4 py-2 text-sm text-gray-900 focus:border-blue-500 focus:bg-white focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
            </div>

            <div>
              <label htmlFor="companyType" className="block text-sm font-semibold text-gray-700">
                Jenis Perusahaan <span className="text-red-500">*</span>
              </label>
              <select
                id="companyType"
                name="companyType"
                value={formData.companyType}
                onChange={handleChange}
                className={`mt-2 block w-full rounded-lg border ${
                  errors.companyType
                    ? 'border-red-500'
                    : 'border-gray-300'
                } bg-gray-50 px-4 py-2 text-sm text-gray-900 focus:border-blue-500 focus:bg-white focus:outline-none focus:ring-1 focus:ring-blue-500`}
              >
                <option value="">Pilih Jenis Perusahaan</option>
                <option value="PT">PT (Perseroan Terbatas)</option>
                <option value="CV">CV (Commanditaire Vennootschap)</option>
                <option value="PD">PD (Perusahaan Dagang)</option>
                <option value="UMKM">UMKM</option>
                <option value="Koperasi">Koperasi</option>
                <option value="Lainnya">Lainnya</option>
              </select>
              {errors.companyType && (
                <p className="mt-2 text-xs font-semibold text-red-600">{errors.companyType}</p>
              )}
            </div>

            <div>
              <label htmlFor="legalStatus" className="block text-sm font-semibold text-gray-700">
                Status Hukum <span className="text-red-500">*</span>
              </label>
              <select
                id="legalStatus"
                name="legalStatus"
                value={formData.legalStatus}
                onChange={handleChange}
                className={`mt-2 block w-full rounded-lg border ${
                  errors.legalStatus
                    ? 'border-red-500'
                    : 'border-gray-300'
                } bg-gray-50 px-4 py-2 text-sm text-gray-900 focus:border-blue-500 focus:bg-white focus:outline-none focus:ring-1 focus:ring-blue-500`}
              >
                <option value="">Pilih Status Hukum</option>
                <option value="Resmi">Resmi</option>
                <option value="Sedang Proses">Sedang Proses</option>
                <option value="Belum Terdaftar">Belum Terdaftar</option>
              </select>
              {errors.legalStatus && (
                <p className="mt-2 text-xs font-semibold text-red-600">{errors.legalStatus}</p>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Tax & License Section */}
      <div className="rounded-lg border border-purple-200 bg-white">
        <div className="flex items-center gap-3 px-6 py-4">
          <FileText className="h-6 w-6 text-purple-600" />
          <h3 className="text-lg font-bold text-gray-900">
            Data Pajak & Lisensi Bisnis
          </h3>
        </div>

        <div className="border-t border-purple-200 px-6 py-6">
          <div className="grid gap-5 sm:grid-cols-2">
            <div>
              <label htmlFor="taxId" className="block text-sm font-semibold text-gray-700">
                NPWP (Nomor Pokok Wajib Pajak)
              </label>
              <input
                type="text"
                id="taxId"
                name="taxId"
                value={formData.taxId}
                onChange={handleChange}
                placeholder="12.345.678.9-000.000"
                className="mt-2 block w-full rounded-lg border border-gray-300 bg-gray-50 px-4 py-2 text-sm text-gray-900 placeholder-gray-400 focus:border-purple-500 focus:bg-white focus:outline-none focus:ring-1 focus:ring-purple-500"
              />
            </div>

            <div>
              <label htmlFor="npwp" className="block text-sm font-semibold text-gray-700">
                NPWP (Alternatif)
              </label>
              <input
                type="text"
                id="npwp"
                name="npwp"
                value={formData.npwp}
                onChange={handleChange}
                placeholder="NPWP alternatif"
                className="mt-2 block w-full rounded-lg border border-gray-300 bg-gray-50 px-4 py-2 text-sm text-gray-900 placeholder-gray-400 focus:border-purple-500 focus:bg-white focus:outline-none focus:ring-1 focus:ring-purple-500"
              />
            </div>

            <div>
              <label htmlFor="businessLicense" className="block text-sm font-semibold text-gray-700">
                Lisensi Bisnis
              </label>
              <input
                type="text"
                id="businessLicense"
                name="businessLicense"
                value={formData.businessLicense}
                onChange={handleChange}
                placeholder="Jenis Izin Usaha"
                className="mt-2 block w-full rounded-lg border border-gray-300 bg-gray-50 px-4 py-2 text-sm text-gray-900 placeholder-gray-400 focus:border-purple-500 focus:bg-white focus:outline-none focus:ring-1 focus:ring-purple-500"
              />
            </div>

            <div>
              <label htmlFor="businessLicenseNumber" className="block text-sm font-semibold text-gray-700">
                Nomor Lisensi Bisnis
              </label>
              <input
                type="text"
                id="businessLicenseNumber"
                name="businessLicenseNumber"
                value={formData.businessLicenseNumber}
                onChange={handleChange}
                placeholder="Nomor lisensi"
                className="mt-2 block w-full rounded-lg border border-gray-300 bg-gray-50 px-4 py-2 text-sm text-gray-900 placeholder-gray-400 focus:border-purple-500 focus:bg-white focus:outline-none focus:ring-1 focus:ring-purple-500"
              />
            </div>

            <div>
              <label htmlFor="businessLicenseDate" className="block text-sm font-semibold text-gray-700">
                Tanggal Lisensi Bisnis
              </label>
              <input
                type="date"
                id="businessLicenseDate"
                name="businessLicenseDate"
                value={formData.businessLicenseDate}
                onChange={handleChange}
                className="mt-2 block w-full rounded-lg border border-gray-300 bg-gray-50 px-4 py-2 text-sm text-gray-900 focus:border-purple-500 focus:bg-white focus:outline-none focus:ring-1 focus:ring-purple-500"
              />
            </div>

            <div>
              <label htmlFor="siup" className="block text-sm font-semibold text-gray-700">
                SIUP (Surat Izin Usaha Perdagangan)
              </label>
              <input
                type="text"
                id="siup"
                name="siup"
                value={formData.siup}
                onChange={handleChange}
                placeholder="Nomor SIUP"
                className="mt-2 block w-full rounded-lg border border-gray-300 bg-gray-50 px-4 py-2 text-sm text-gray-900 placeholder-gray-400 focus:border-purple-500 focus:bg-white focus:outline-none focus:ring-1 focus:ring-purple-500"
              />
            </div>

            <div>
              <label htmlFor="tdb" className="block text-sm font-semibold text-gray-700">
                TDB (Tanda Daftar Industri)
              </label>
              <input
                type="text"
                id="tdb"
                name="tdb"
                value={formData.tdb}
                onChange={handleChange}
                placeholder="Nomor TDB"
                className="mt-2 block w-full rounded-lg border border-gray-300 bg-gray-50 px-4 py-2 text-sm text-gray-900 placeholder-gray-400 focus:border-purple-500 focus:bg-white focus:outline-none focus:ring-1 focus:ring-purple-500"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Authorized Person Section */}
      <div className="rounded-lg border border-green-200 bg-white">
        <div className="flex items-center gap-3 px-6 py-4">
          <User className="h-6 w-6 text-green-600" />
          <h3 className="text-lg font-bold text-gray-900">
            Orang yang Berwenang
          </h3>
        </div>

        <div className="border-t border-green-200 px-6 py-6">
          <div className="grid gap-5 sm:grid-cols-2">
            <div>
              <label htmlFor="authorizedPersonName" className="block text-sm font-semibold text-gray-700">
                Nama Orang yang Berwenang
              </label>
              <input
                type="text"
                id="authorizedPersonName"
                name="authorizedPersonName"
                value={formData.authorizedPersonName}
                onChange={handleChange}
                placeholder="Nama lengkap"
                className="mt-2 block w-full rounded-lg border border-gray-300 bg-gray-50 px-4 py-2 text-sm text-gray-900 placeholder-gray-400 focus:border-green-500 focus:bg-white focus:outline-none focus:ring-1 focus:ring-green-500"
              />
            </div>

            <div>
              <label htmlFor="authorizedPersonTitle" className="block text-sm font-semibold text-gray-700">
                Jabatan
              </label>
              <input
                type="text"
                id="authorizedPersonTitle"
                name="authorizedPersonTitle"
                value={formData.authorizedPersonTitle}
                onChange={handleChange}
                placeholder="Direktur Utama"
                className="mt-2 block w-full rounded-lg border border-gray-300 bg-gray-50 px-4 py-2 text-sm text-gray-900 placeholder-gray-400 focus:border-green-500 focus:bg-white focus:outline-none focus:ring-1 focus:ring-green-500"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Documentation Section */}
      <div className="rounded-lg border border-orange-200 bg-white">
        <div className="flex items-center gap-3 px-6 py-4">
          <MapPin className="h-6 w-6 text-orange-600" />
          <h3 className="text-lg font-bold text-gray-900">
            Dokumentasi & Catatan
          </h3>
        </div>

        <div className="border-t border-orange-200 px-6 py-6">
          <div className="space-y-5">
            <div>
              <label htmlFor="documentationUrl" className="block text-sm font-semibold text-gray-700">
                URL Dokumentasi
              </label>
              <input
                type="url"
                id="documentationUrl"
                name="documentationUrl"
                value={formData.documentationUrl}
                onChange={handleChange}
                placeholder="https://example.com/documentation"
                className="mt-2 block w-full rounded-lg border border-gray-300 bg-gray-50 px-4 py-2 text-sm text-gray-900 placeholder-gray-400 focus:border-orange-500 focus:bg-white focus:outline-none focus:ring-1 focus:ring-orange-500"
              />
            </div>

            <div>
              <label htmlFor="notes" className="block text-sm font-semibold text-gray-700">
                Catatan Tambahan
              </label>
              <textarea
                id="notes"
                name="notes"
                value={formData.notes}
                onChange={handleChange}
                rows={4}
                placeholder="Informasi tambahan atau keterangan khusus..."
                className="mt-2 block w-full rounded-lg border border-gray-300 bg-gray-50 px-4 py-2 text-sm text-gray-900 placeholder-gray-400 focus:border-orange-500 focus:bg-white focus:outline-none focus:ring-1 focus:ring-orange-500"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Info Box */}
      <div className="flex gap-4 rounded-lg border border-blue-200 bg-blue-50 p-4">
        <div className="shrink-0 pt-0.5">
          <AlertCircle className="h-5 w-5 text-blue-600" />
        </div>
        <div>
          <p className="font-semibold text-blue-900">
            Verifikasi Data Penting
          </p>
          <p className="mt-1 text-sm text-blue-800">
            Informasi yang Anda berikan akan diverifikasi oleh sistem kami. Pastikan semua data yang diisi akurat dan dapat dipertanggungjawabkan sesuai dengan dokumen resmi perusahaan Anda.
          </p>
        </div>
      </div>

      {/* Submit Button */}
      <div className="flex gap-3 pt-4">
        <Button
          type="submit"
          disabled={isLoading}
          className="flex-1 bg-blue-600 py-2 text-base font-semibold hover:bg-blue-700"
        >
          {isLoading ? 'Mengirim...' : 'Lanjutkan'}
        </Button>
        <Button
          type="button"
          variant="outline"
          className="px-6 py-2 font-semibold"
          onClick={resetForm}
        >
          Bersihkan
        </Button>
      </div>
    </form>
  )
}
