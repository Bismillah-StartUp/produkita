'use client'

import { Button } from '@/components/ui/button'
import { Package, Leaf, Shield, Building2, CheckCircle2 } from 'lucide-react'
import { ProductFormData } from './product'
import { NutritionFormData } from './nutritions-form'
import { LegalityFormData } from './legality-form'
import { EnterpriseFormData } from './enterprise-form'

interface RekapProps {
  productData?: ProductFormData
  nutritionData?: NutritionFormData
  legalityData?: LegalityFormData
  enterpriseData?: EnterpriseFormData
  onSubmit?: () => void
  onEdit?: (step: number) => void
  isLoading?: boolean
}

interface SectionItemProps {
  label: string
  value: string | undefined
  showValue?: boolean
}

function SectionItem({ label, value, showValue = true }: SectionItemProps) {
  return (
    <div className="flex justify-between border-b border-gray-100 px-4 py-3 last:border-0">
      <span className="text-sm font-medium text-gray-600">{label}</span>
      <span className="text-sm font-semibold text-gray-900">
        {showValue ? value || '-' : '•••'}
      </span>
    </div>
  )
}

interface SectionProps {
  title: string
  icon: React.ReactNode
  borderColor: string
  children: React.ReactNode
  stepNumber: number
  onEdit?: (step: number) => void
}

function RecapSection({ title, icon, borderColor, children, stepNumber, onEdit }: SectionProps) {
  return (
    <div className={`rounded-lg border ${borderColor} bg-white overflow-hidden`}>
      <div className={`border-b ${borderColor} px-6 py-4 flex items-center justify-between`}>
        <div className="flex items-center gap-3">
          {icon}
          <h3 className="text-lg font-bold text-gray-900">{title}</h3>
        </div>
        <Button
          type="button"
          variant="outline"
          size="sm"
          className="text-xs font-semibold"
          onClick={() => onEdit?.(stepNumber)}
        >
          Edit
        </Button>
      </div>
      <div className="divide-y divide-gray-100">
        {children}
      </div>
    </div>
  )
}

export function Rekap({
  productData,
  nutritionData,
  legalityData,
  enterpriseData,
  onSubmit,
  onEdit,
  isLoading = false,
}: RekapProps) {
  const hasAllData = productData && nutritionData && legalityData && enterpriseData

  return (
    <div className="space-y-6">
      {/* Status Info */}
      {!hasAllData && (
        <div className="rounded-lg border border-yellow-200 bg-yellow-50 p-4">
          <div className="flex gap-3">
            <div className="shrink-0 pt-0.5">
              <CheckCircle2 className="h-5 w-5 text-yellow-600" />
            </div>
            <div>
              <p className="font-semibold text-yellow-900">Data Belum Lengkap</p>
              <p className="mt-1 text-sm text-yellow-800">
                Harap lengkapi semua informasi di setiap tahap pendaftaran sebelum melanjutkan.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Informasi Produk */}
      {productData && (
        <RecapSection
          title="Informasi Produk"
          icon={<Package className="h-6 w-6 text-blue-600" />}
          borderColor="border-blue-200"
          stepNumber={1}
          onEdit={onEdit}
        >
          <SectionItem label="Nama Produk" value={productData.productName} />
          <SectionItem label="Brand" value={productData.brandName} />
          <SectionItem
            label="Harga"
            value={`Rp ${productData.price ? parseInt(productData.price).toLocaleString('id-ID') : '-'}`}
          />
          <SectionItem
            label="Ukuran/Berat"
            value={`${productData.weight} ${productData.unit}`}
          />
          <SectionItem label="Foto Produk" value="✓ Terupload" showValue={!!productData.productPhotoPreview} />
        </RecapSection>
      )}

      {/* Informasi Nutrisi */}
      {nutritionData && (
        <RecapSection
          title="Informasi Nutrisi"
          icon={<Leaf className="h-6 w-6 text-green-600" />}
          borderColor="border-green-200"
          stepNumber={2}
          onEdit={onEdit}
        >
          <SectionItem label="Takaran Saji" value={nutritionData.servingSize} />
          <SectionItem label="Energi Total" value={`${nutritionData.calories} kkal`} />
          <SectionItem label="Total Lemak" value={`${nutritionData.totalFat} g`} />
          <SectionItem
            label="Lemak Jenuh"
            value={`${nutritionData.saturatedFat} g`}
          />
          <SectionItem label="Karbohidrat" value={`${nutritionData.carbohydrates} g`} />
          <SectionItem label="Protein" value={`${nutritionData.protein} g`} />
          <SectionItem label="Gula" value={`${nutritionData.sugar || '-'} g`} />
          <SectionItem label="Natrium" value={`${nutritionData.sodium} mg`} />
        </RecapSection>
      )}

      {/* Sertifikasi & Legalitas */}
      {legalityData && (
        <RecapSection
          title="Sertifikasi & Legalitas"
          icon={<Shield className="h-6 w-6 text-purple-600" />}
          borderColor="border-purple-200"
          stepNumber={3}
          onEdit={onEdit}
        >
          <div className="px-4 py-3 bg-blue-50">
            <p className="text-xs font-semibold text-blue-900 mb-3">BPOM Distribution Permit</p>
          </div>
          <SectionItem label="Nomor BPOM" value={legalityData.bpomNumber} />
          <SectionItem label="Kategori Produk" value={legalityData.productCategory} />
          <SectionItem
            label="Tanggal Registrasi"
            value={legalityData.bpomRegistrationDate}
          />
          <SectionItem label="Berlaku Hingga" value={legalityData.bpomValidUntil} />

          <div className="px-4 py-3 bg-green-50 border-t border-gray-100">
            <p className="text-xs font-semibold text-green-900">Halal Certification</p>
          </div>
          <SectionItem label="Nomor Sertifikat Halal" value={legalityData.halalCertificateNumber} />
          <SectionItem label="Disertifikasi oleh" value={legalityData.halalCertifiedBy} />
          <SectionItem
            label="Tanggal Terbit"
            value={legalityData.halalIssuanceDate}
          />
          <SectionItem label="Berlaku Hingga" value={legalityData.halalValidUntil} />
        </RecapSection>
      )}

      {/* Informasi Perusahaan */}
      {enterpriseData && (
        <RecapSection
          title="Informasi Perusahaan"
          icon={<Building2 className="h-6 w-6 text-orange-600" />}
          borderColor="border-orange-200"
          stepNumber={4}
          onEdit={onEdit}
        >
          <SectionItem label="Nama Perusahaan" value={enterpriseData.companyName} />
          <SectionItem label="Alamat Lengkap" value={enterpriseData.address} />
          <SectionItem label="Nomor Telepon" value={enterpriseData.phone} />
          <SectionItem label="Email" value={enterpriseData.email} />
        </RecapSection>
      )}

      {/* Submit Section */}
      <div className="border-t border-gray-200 pt-8">
        <div className="rounded-lg bg-blue-50 border border-blue-200 p-6 mb-6">
          <div className="flex gap-3">
            <div className="shrink-0 pt-0.5">
              <CheckCircle2 className="h-5 w-5 text-blue-600" />
            </div>
            <div>
              <p className="font-semibold text-blue-900">Data Siap Dikirim</p>
              <p className="mt-1 text-sm text-blue-800">
                Pastikan semua informasi sudah benar. Anda dapat mengedit data sebelum mengirimkan.
              </p>
            </div>
          </div>
        </div>

        <div className="flex gap-3">
          <Button
            type="button"
            variant="outline"
            className="flex-1 py-2 font-semibold"
            onClick={() => onEdit?.(4)}
          >
            Sebelumnya
          </Button>
          <Button
            type="button"
            disabled={!hasAllData || isLoading}
            className="flex-1 bg-green-600 py-2 text-base font-semibold hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed"
            onClick={onSubmit}
          >
            {isLoading ? 'Memproses...' : 'Daftar Sekarang'}
          </Button>
        </div>
      </div>
    </div>
  )
}
