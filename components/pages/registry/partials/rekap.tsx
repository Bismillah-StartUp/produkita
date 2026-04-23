'use client'

import { Button } from '@/components/ui/button'
import { Package, Leaf, Shield, Building2, CheckCircle2 } from 'lucide-react'
import { ProductFormData } from './product-form'
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

interface NutritionItemProps {
  label: string
  value: string | undefined
  percent: string | undefined
}

function SectionItem({ label, value, showValue = true }: SectionItemProps) {
  return (
    <div className="flex justify-between border-b border-gray-100 px-4 py-2 last:border-0">
      <span className="text-xs font-medium text-gray-600">{label}</span>
      <span className="text-xs font-semibold text-gray-900">
        {showValue ? value || '-' : '•••'}
      </span>
    </div>
  )
}

function NutritionItem({ label, value, percent }: NutritionItemProps) {
  const displayValue = value || '-'
  const displayPercent = percent?.trim() ? `${percent}%` : '-'

  return (
    <div className="grid grid-cols-[minmax(0,1fr)_auto_auto] gap-3 border-b border-gray-100 px-4 py-2 last:border-0">
      <span className="text-xs font-medium text-gray-600">{label}</span>
      <span className="text-right text-xs font-semibold text-gray-900">{displayValue}</span>
      <span className="text-right text-xs font-semibold text-gray-900">{displayPercent}</span>
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
      <div className={`border-b ${borderColor} px-6 py-3 flex items-center justify-between`}>
        <div className="flex items-center gap-2">
          <div className="h-5 w-5">{icon}</div>
          <h3 className="text-base font-bold text-gray-900">{title}</h3>
        </div>
        <Button
          type="button"
          variant="outline"
          size="sm"
          className="text-xs font-semibold px-3 py-1"
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
    <div className="space-y-4">
      {/* Status Info */}
      {!hasAllData && (
        <div className="rounded-lg border border-yellow-200 bg-yellow-50 p-3">
          <div className="flex gap-2">
            <div className="shrink-0 pt-0.5">
              <CheckCircle2 className="h-4 w-4 text-yellow-600" />
            </div>
            <div>
              <p className="text-sm font-semibold text-yellow-900">Data Belum Lengkap</p>
              <p className="mt-0.5 text-xs text-yellow-800">
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
          <div className="grid grid-cols-[minmax(0,1fr)_auto_auto] gap-3 border-b border-gray-100 px-4 py-2 text-xs font-semibold text-gray-500">
            <span>Nama Nutrisi</span>
            <span className="text-right">Nilai</span>
            <span className="text-right">% AKG</span>
          </div>
          <SectionItem label="Takaran Saji" value={nutritionData.servingSize} />
          <SectionItem label="Energi Total" value={`${nutritionData.calories} kkal`} />
          <NutritionItem label="Total Lemak" value={`${nutritionData.totalFat} g`} percent={nutritionData.fatDaily} />
          <NutritionItem
            label="Lemak Jenuh"
            value={`${nutritionData.saturatedFat} g`}
            percent={nutritionData.saturatedFatDaily}
          />
          <NutritionItem
            label="Karbohidrat"
            value={`${nutritionData.carbohydrates} g`}
            percent={nutritionData.carbohydratesDaily}
          />
          <NutritionItem label="Protein" value={`${nutritionData.protein} g`} percent={nutritionData.proteinDaily} />
          <NutritionItem label="Gula" value={`${nutritionData.sugar || '-'} g`} percent={nutritionData.sugarDaily} />
          <NutritionItem label="Natrium" value={`${nutritionData.sodium} mg`} percent={nutritionData.sodiumDaily} />
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
          <SectionItem label="Kategori Produk" value={legalityData.productCategory} />

          {legalityData.hasBpom && (
            <>
              <div className="px-4 py-2 bg-blue-50">
                <p className="mb-2 text-xs font-semibold text-blue-900">BPOM Distribution Permit</p>
              </div>
              <SectionItem label="Nomor BPOM" value={legalityData.bpomNumber} />
              <SectionItem label="Tanggal Registrasi" value={legalityData.bpomRegistrationDate} />
              <SectionItem label="Berlaku Hingga" value={legalityData.bpomValidUntil} />
            </>
          )}

          {legalityData.hasPirt && (
            <>
              <div className="border-t border-gray-100 px-4 py-2 bg-purple-50">
                <p className="mb-2 text-xs font-semibold text-purple-900">PIRT Permit</p>
              </div>
              <SectionItem label="Nomor PIRT" value={legalityData.pirtNumber} />
              <SectionItem label="Tanggal Registrasi" value={legalityData.pirtRegistrationDate} />
              <SectionItem label="Berlaku Hingga" value={legalityData.pirtValidUntil} />
            </>
          )}

          {legalityData.hasHalal && (
            <>
              <div className="border-t border-gray-100 px-4 py-2 bg-green-50">
                <p className="mb-2 text-xs font-semibold text-green-900">Halal Certification</p>
              </div>
              <SectionItem label="Nomor Sertifikat Halal" value={legalityData.halalCertificateNumber} />
              <SectionItem label="Disertifikasi oleh" value={legalityData.halalCertifiedBy} />
              <SectionItem label="Tanggal Terbit" value={legalityData.halalIssuanceDate} />
              <SectionItem label="Berlaku Hingga" value={legalityData.halalValidUntil} />
            </>
          )}

          {!legalityData.hasBpom && !legalityData.hasPirt && !legalityData.hasHalal && (
            <div className="px-4 py-3 text-sm text-gray-600">Tidak ada sertifikat tambahan yang diinput.</div>
          )}
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
          <SectionItem label="Daerah" value={enterpriseData.district} />
          <SectionItem label="Provinsi" value={enterpriseData.province} />
          <SectionItem label="Alamat Lengkap" value={enterpriseData.address} />
          <SectionItem label="Nomor Telepon" value={enterpriseData.phone} />
          <SectionItem label="Email" value={enterpriseData.email} />
        </RecapSection>
      )}

      {/* Submit Section */}
      <div className="border-t border-gray-200 pt-6">
        <div className="rounded-lg bg-blue-50 border border-blue-200 p-4 mb-4">
          <div className="flex gap-2">
            <div className="shrink-0 pt-0.5">
              <CheckCircle2 className="h-4 w-4 text-blue-600" />
            </div>
            <div>
              <p className="text-sm font-semibold text-blue-900">Data Siap Dikirim</p>
              <p className="mt-0.5 text-xs text-blue-800">
                Pastikan semua informasi sudah benar. Anda dapat mengedit data sebelum mengirimkan.
              </p>
            </div>
          </div>
        </div>

        <div className="flex gap-3">
          <Button
            type="button"
            variant="outline"
            className="flex-1 py-6 text-sm font-semibold"
            onClick={() => onEdit?.(4)}
          >
            Sebelumnya
          </Button>
          <Button
            type="button"
            disabled={!hasAllData || isLoading}
            className="flex-1 bg-green-600 py-6 text-base font-semibold hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed"
            onClick={onSubmit}
          >
            {isLoading ? 'Memproses...' : 'Daftar Sekarang'}
          </Button>
        </div>
      </div>
    </div>
  )
}
