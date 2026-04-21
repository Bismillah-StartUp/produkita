'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { BadgeCheck, FileBadge, PackageCheck, Shield } from 'lucide-react'

export interface LegalityFormData {
  hasBpom: boolean
  hasPirt: boolean
  hasHalal: boolean
  bpomNumber: string
  productCategory: string
  bpomRegistrationDate: string
  bpomValidUntil: string
  pirtNumber: string
  pirtRegistrationDate: string
  pirtValidUntil: string
  halalCertificateNumber: string
  halalCertifiedBy: string
  halalIssuanceDate: string
  halalValidUntil: string
}

interface LegalityFormProps {
  onSubmit?: (data: LegalityFormData) => void
  onPrevious?: () => void
  initialData?: Partial<LegalityFormData>
  isLoading?: boolean
}

export function LegalityForm({ onSubmit, onPrevious, initialData, isLoading = false }: LegalityFormProps) {
  const initialHasBpom = initialData?.hasBpom ?? Boolean(initialData?.bpomNumber)
  const initialHasPirt = initialData?.hasPirt ?? Boolean(initialData?.pirtNumber)
  const initialHasHalal = initialData?.hasHalal ?? Boolean(initialData?.halalCertificateNumber)

  const [hasBpom, setHasBpom] = useState(initialHasBpom)
  const [hasPirt, setHasPirt] = useState(initialHasPirt)
  const [hasHalal, setHasHalal] = useState(initialHasHalal)
  const [formData, setFormData] = useState<LegalityFormData>({
    hasBpom: initialHasBpom,
    hasPirt: initialHasPirt,
    hasHalal: initialHasHalal,
    bpomNumber: initialData?.bpomNumber ?? '',
    productCategory: initialData?.productCategory ?? '',
    bpomRegistrationDate: initialData?.bpomRegistrationDate ?? '',
    bpomValidUntil: initialData?.bpomValidUntil ?? '',
    pirtNumber: initialData?.pirtNumber ?? '',
    pirtRegistrationDate: initialData?.pirtRegistrationDate ?? '',
    pirtValidUntil: initialData?.pirtValidUntil ?? '',
    halalCertificateNumber: initialData?.halalCertificateNumber ?? '',
    halalCertifiedBy: initialData?.halalCertifiedBy ?? '',
    halalIssuanceDate: initialData?.halalIssuanceDate ?? '',
    halalValidUntil: initialData?.halalValidUntil ?? '',
  })

  const [errors, setErrors] = useState<Record<string, string>>({})

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))

    if (errors[name]) {
      setErrors((prev) => {
        const nextErrors = { ...prev }
        delete nextErrors[name]
        return nextErrors
      })
    }
  }

  const clearSectionErrors = (fieldNames: string[]) => {
    setErrors((prev) => {
      const nextErrors = { ...prev }
      fieldNames.forEach((fieldName) => {
        delete nextErrors[fieldName]
      })
      return nextErrors
    })
  }

  const toggleSection = (section: 'bpom' | 'pirt' | 'halal', checked: boolean) => {
    if (section === 'bpom') {
      setHasBpom(checked)
      setFormData((prev) => ({
        ...prev,
        hasBpom: checked,
        bpomNumber: checked ? prev.bpomNumber : '',
        bpomRegistrationDate: checked ? prev.bpomRegistrationDate : '',
        bpomValidUntil: checked ? prev.bpomValidUntil : '',
      }))
      if (!checked) {
        clearSectionErrors(['bpomNumber', 'bpomRegistrationDate', 'bpomValidUntil'])
      }
      return
    }

    if (section === 'pirt') {
      setHasPirt(checked)
      setFormData((prev) => ({
        ...prev,
        hasPirt: checked,
        pirtNumber: checked ? prev.pirtNumber : '',
        pirtRegistrationDate: checked ? prev.pirtRegistrationDate : '',
        pirtValidUntil: checked ? prev.pirtValidUntil : '',
      }))
      if (!checked) {
        clearSectionErrors(['pirtNumber', 'pirtRegistrationDate', 'pirtValidUntil'])
      }
      return
    }

    setHasHalal(checked)
    setFormData((prev) => ({
      ...prev,
      hasHalal: checked,
      halalCertificateNumber: checked ? prev.halalCertificateNumber : '',
      halalCertifiedBy: checked ? prev.halalCertifiedBy : '',
      halalIssuanceDate: checked ? prev.halalIssuanceDate : '',
      halalValidUntil: checked ? prev.halalValidUntil : '',
    }))
    if (!checked) {
      clearSectionErrors(['halalCertificateNumber', 'halalCertifiedBy', 'halalIssuanceDate', 'halalValidUntil'])
    }
  }

  const validateForm = (): boolean => {
    const nextErrors: Record<string, string> = {}

    if (!formData.productCategory.trim()) {
      nextErrors.productCategory = 'Kategori produk wajib dipilih'
    }

    if (hasBpom) {
      if (!formData.bpomNumber.trim()) {
        nextErrors.bpomNumber = 'Nomor BPOM wajib diisi'
      }
      if (!formData.bpomRegistrationDate.trim()) {
        nextErrors.bpomRegistrationDate = 'Tanggal registrasi wajib diisi'
      }
      if (!formData.bpomValidUntil.trim()) {
        nextErrors.bpomValidUntil = 'Berlaku hingga wajib diisi'
      }
    }

    if (hasPirt) {
      if (!formData.pirtNumber.trim()) {
        nextErrors.pirtNumber = 'Nomor PIRT wajib diisi'
      }
      if (!formData.pirtRegistrationDate.trim()) {
        nextErrors.pirtRegistrationDate = 'Tanggal registrasi wajib diisi'
      }
      if (!formData.pirtValidUntil.trim()) {
        nextErrors.pirtValidUntil = 'Berlaku hingga wajib diisi'
      }
    }

    if (hasHalal) {
      if (!formData.halalCertificateNumber.trim()) {
        nextErrors.halalCertificateNumber = 'Nomor sertifikat halal wajib diisi'
      }
      if (!formData.halalCertifiedBy.trim()) {
        nextErrors.halalCertifiedBy = 'Disertifikasi oleh wajib dipilih'
      }
      if (!formData.halalIssuanceDate.trim()) {
        nextErrors.halalIssuanceDate = 'Tanggal terbit wajib diisi'
      }
      if (!formData.halalValidUntil.trim()) {
        nextErrors.halalValidUntil = 'Berlaku hingga wajib diisi'
      }
    }

    setErrors(nextErrors)
    return Object.keys(nextErrors).length === 0
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (validateForm() && onSubmit) {
      onSubmit({
        ...formData,
        hasBpom,
        hasPirt,
        hasHalal,
      })
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="rounded-lg border border-gray-200 bg-white">
        <div className="border-b border-gray-200 px-8 py-6">
          <div className="flex items-center gap-3">
            <Shield className="h-6 w-6 text-gray-900" />
            <div>
              <h2 className="text-lg font-bold text-gray-900">Sertifikasi & Legalitas</h2>
              <p className="text-sm text-gray-600">Pilih sertifikat yang dimiliki. Jika tidak ada, bagian ini bisa dilewati.</p>
            </div>
          </div>
        </div>

        <div className="space-y-6 px-8 py-8">
          <div className="grid gap-3 sm:grid-cols-3">
            <label className={`flex cursor-pointer items-start gap-3 rounded-lg border p-4 ${hasBpom ? 'border-blue-300 bg-blue-50' : 'border-gray-200 bg-white hover:bg-gray-50'}`}>
              <input type="checkbox" checked={hasBpom} onChange={(e) => toggleSection('bpom', e.target.checked)} className="mt-1 h-4 w-4" />
              <span>
                <span className="block text-sm font-semibold text-gray-900">BPOM</span>
                <span className="block text-xs text-gray-600">Opsional, isi hanya jika produk memiliki izin BPOM.</span>
              </span>
            </label>

            <label className={`flex cursor-pointer items-start gap-3 rounded-lg border p-4 ${hasPirt ? 'border-purple-300 bg-purple-50' : 'border-gray-200 bg-white hover:bg-gray-50'}`}>
              <input type="checkbox" checked={hasPirt} onChange={(e) => toggleSection('pirt', e.target.checked)} className="mt-1 h-4 w-4" />
              <span>
                <span className="block text-sm font-semibold text-gray-900">PIRT</span>
                <span className="block text-xs text-gray-600">Opsional, isi hanya jika produk memiliki izin PIRT.</span>
              </span>
            </label>

            <label className={`flex cursor-pointer items-start gap-3 rounded-lg border p-4 ${hasHalal ? 'border-green-300 bg-green-50' : 'border-gray-200 bg-white hover:bg-gray-50'}`}>
              <input type="checkbox" checked={hasHalal} onChange={(e) => toggleSection('halal', e.target.checked)} className="mt-1 h-4 w-4" />
              <span>
                <span className="block text-sm font-semibold text-gray-900">Halal</span>
                <span className="block text-xs text-gray-600">Opsional, isi hanya jika produk memiliki sertifikat halal.</span>
              </span>
            </label>
          </div>

          <div className="rounded-lg border border-gray-200 bg-gray-50 p-4">
            <label htmlFor="productCategory" className="block text-sm font-semibold text-gray-700">
              Kategori Produk <span className="text-red-500">*</span>
            </label>
            <select
              id="productCategory"
              name="productCategory"
              value={formData.productCategory}
              onChange={handleChange}
              className={`mt-2 block w-full rounded-lg border ${errors.productCategory ? 'border-red-500' : 'border-gray-300'} bg-white px-4 py-2 text-sm text-gray-900 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500`}
            >
              <option value="">Pilih Kategori</option>
              <option value="Food & Beverage">Food & Beverage</option>
              <option value="Kosmetik">Kosmetik</option>
              <option value="Farmasi">Farmasi</option>
              <option value="Alat Kesehatan">Alat Kesehatan</option>
              <option value="Lainnya">Lainnya</option>
            </select>
            {errors.productCategory && <p className="mt-1 text-xs font-semibold text-red-600">{errors.productCategory}</p>}
          </div>

          {hasBpom && (
            <div className="rounded-lg border border-blue-200 bg-white">
              <div className="border-b border-blue-200 px-6 py-4">
                <div className="flex items-center gap-3">
                  <PackageCheck className="h-5 w-5 text-blue-600" />
                  <h3 className="text-base font-bold text-gray-900">BPOM Distribution Permit</h3>
                </div>
              </div>
              <div className="space-y-5 px-6 py-6">
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
                    className={`mt-2 block w-full rounded-lg border ${errors.bpomNumber ? 'border-red-500' : 'border-gray-300'} bg-gray-50 px-4 py-2 text-sm text-gray-900 placeholder-gray-400 focus:border-blue-500 focus:bg-white focus:outline-none focus:ring-1 focus:ring-blue-500`}
                  />
                  {errors.bpomNumber && <p className="mt-1 text-xs font-semibold text-red-600">{errors.bpomNumber}</p>}
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
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
                      className={`mt-2 block w-full rounded-lg border ${errors.bpomRegistrationDate ? 'border-red-500' : 'border-gray-300'} bg-gray-50 px-4 py-2 text-sm text-gray-900 focus:border-blue-500 focus:bg-white focus:outline-none focus:ring-1 focus:ring-blue-500`}
                    />
                    {errors.bpomRegistrationDate && <p className="mt-1 text-xs font-semibold text-red-600">{errors.bpomRegistrationDate}</p>}
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
                      className={`mt-2 block w-full rounded-lg border ${errors.bpomValidUntil ? 'border-red-500' : 'border-gray-300'} bg-gray-50 px-4 py-2 text-sm text-gray-900 focus:border-blue-500 focus:bg-white focus:outline-none focus:ring-1 focus:ring-blue-500`}
                    />
                    {errors.bpomValidUntil && <p className="mt-1 text-xs font-semibold text-red-600">{errors.bpomValidUntil}</p>}
                  </div>
                </div>
              </div>
            </div>
          )}

          {hasPirt && (
            <div className="rounded-lg border border-purple-200 bg-white">
              <div className="border-b border-purple-200 px-6 py-4">
                <div className="flex items-center gap-3">
                  <FileBadge className="h-5 w-5 text-purple-600" />
                  <h3 className="text-base font-bold text-gray-900">PIRT Permit</h3>
                </div>
              </div>
              <div className="space-y-5 px-6 py-6">
                <div>
                  <label htmlFor="pirtNumber" className="block text-sm font-semibold text-gray-700">
                    Nomor PIRT <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="pirtNumber"
                    name="pirtNumber"
                    value={formData.pirtNumber}
                    onChange={handleChange}
                    placeholder="Contoh: P-IRT 2088370101234"
                    className={`mt-2 block w-full rounded-lg border ${errors.pirtNumber ? 'border-red-500' : 'border-gray-300'} bg-gray-50 px-4 py-2 text-sm text-gray-900 placeholder-gray-400 focus:border-purple-500 focus:bg-white focus:outline-none focus:ring-1 focus:ring-purple-500`}
                  />
                  {errors.pirtNumber && <p className="mt-1 text-xs font-semibold text-red-600">{errors.pirtNumber}</p>}
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <label htmlFor="pirtRegistrationDate" className="block text-sm font-semibold text-gray-700">
                      Tanggal Registrasi <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="date"
                      id="pirtRegistrationDate"
                      name="pirtRegistrationDate"
                      value={formData.pirtRegistrationDate}
                      onChange={handleChange}
                      className={`mt-2 block w-full rounded-lg border ${errors.pirtRegistrationDate ? 'border-red-500' : 'border-gray-300'} bg-gray-50 px-4 py-2 text-sm text-gray-900 focus:border-purple-500 focus:bg-white focus:outline-none focus:ring-1 focus:ring-purple-500`}
                    />
                    {errors.pirtRegistrationDate && <p className="mt-1 text-xs font-semibold text-red-600">{errors.pirtRegistrationDate}</p>}
                  </div>

                  <div>
                    <label htmlFor="pirtValidUntil" className="block text-sm font-semibold text-gray-700">
                      Berlaku Hingga <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="date"
                      id="pirtValidUntil"
                      name="pirtValidUntil"
                      value={formData.pirtValidUntil}
                      onChange={handleChange}
                      className={`mt-2 block w-full rounded-lg border ${errors.pirtValidUntil ? 'border-red-500' : 'border-gray-300'} bg-gray-50 px-4 py-2 text-sm text-gray-900 focus:border-purple-500 focus:bg-white focus:outline-none focus:ring-1 focus:ring-purple-500`}
                    />
                    {errors.pirtValidUntil && <p className="mt-1 text-xs font-semibold text-red-600">{errors.pirtValidUntil}</p>}
                  </div>
                </div>
              </div>
            </div>
          )}

          {hasHalal && (
            <div className="rounded-lg border border-green-200 bg-white">
              <div className="border-b border-green-200 px-6 py-4">
                <div className="flex items-center gap-3">
                  <BadgeCheck className="h-5 w-5 text-green-600" />
                  <h3 className="text-base font-bold text-gray-900">Halal Certification</h3>
                </div>
              </div>
              <div className="space-y-5 px-6 py-6">
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
                    className={`mt-2 block w-full rounded-lg border ${errors.halalCertificateNumber ? 'border-red-500' : 'border-gray-300'} bg-gray-50 px-4 py-2 text-sm text-gray-900 placeholder-gray-400 focus:border-green-500 focus:bg-white focus:outline-none focus:ring-1 focus:ring-green-500`}
                  />
                  {errors.halalCertificateNumber && <p className="mt-1 text-xs font-semibold text-red-600">{errors.halalCertificateNumber}</p>}
                </div>

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
                      className={`mt-2 block w-full rounded-lg border ${errors.halalCertifiedBy ? 'border-red-500' : 'border-gray-300'} bg-gray-50 px-4 py-2 text-sm text-gray-900 focus:border-green-500 focus:bg-white focus:outline-none focus:ring-1 focus:ring-green-500`}
                    >
                      <option value="">Pilih Lembaga</option>
                      <option value="MUI">MUI</option>
                      <option value="LPPOM MUI">LPPOM MUI</option>
                      <option value="Lainnya">Lainnya</option>
                    </select>
                    {errors.halalCertifiedBy && <p className="mt-1 text-xs font-semibold text-red-600">{errors.halalCertifiedBy}</p>}
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
                      className={`mt-2 block w-full rounded-lg border ${errors.halalIssuanceDate ? 'border-red-500' : 'border-gray-300'} bg-gray-50 px-4 py-2 text-sm text-gray-900 focus:border-green-500 focus:bg-white focus:outline-none focus:ring-1 focus:ring-green-500`}
                    />
                    {errors.halalIssuanceDate && <p className="mt-1 text-xs font-semibold text-red-600">{errors.halalIssuanceDate}</p>}
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
                      className={`mt-2 block w-full rounded-lg border ${errors.halalValidUntil ? 'border-red-500' : 'border-gray-300'} bg-gray-50 px-4 py-2 text-sm text-gray-900 focus:border-green-500 focus:bg-white focus:outline-none focus:ring-1 focus:ring-green-500`}
                    />
                    {errors.halalValidUntil && <p className="mt-1 text-xs font-semibold text-red-600">{errors.halalValidUntil}</p>}
                  </div>
                </div>
              </div>
            </div>
          )}

          {!hasBpom && !hasPirt && !hasHalal && (
            <div className="rounded-lg border border-dashed border-gray-300 bg-gray-50 p-4 text-sm text-gray-600">
              Tidak ada sertifikat yang dipilih. Anda dapat lanjut tanpa mengisi legalitas tambahan.
            </div>
          )}
        </div>
      </div>

      <div className="flex gap-3 pt-8">
        <Button type="button" variant="outline" className="flex-1 py-6 font-semibold" onClick={onPrevious}>
          Sebelumnya
        </Button>
        <Button type="submit" disabled={isLoading} className="flex-1 bg-blue-600 py-6 text-base font-semibold hover:bg-blue-700">
          {isLoading ? 'Memproses...' : 'Selanjutnya'}
        </Button>
      </div>
    </form>
  )
}
