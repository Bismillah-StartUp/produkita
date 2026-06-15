"use client"

import { Button } from "@/components/ui/button"
import Image from "next/image"
import { Package, Leaf, Shield, Info, AlertCircle, CheckCircle2 } from "lucide-react"
import { ProductFormData } from "./product-form"
import { NutritionFormData } from "./nutritions-form"
import { LegalityFormData } from "./legality-form"
import { ServingFormData } from "./serving-form"

interface RekapProps {
  productData?: ProductFormData
  nutritionData?: NutritionFormData
  legalityData?: LegalityFormData
  servingData?: ServingFormData
  onSubmit?: () => void
  onEdit?: (step: number) => void
  isLoading?: boolean
}

interface SectionRowProps {
  leftLabel: string
  leftValue: string | undefined
  rightLabel: string
  rightValue: string | undefined
}

function SectionRow({ leftLabel, leftValue, rightLabel, rightValue }: SectionRowProps) {
  return (
    <div className="grid grid-cols-2 border-b border-gray-100 last:border-0">
      <div className="flex justify-between px-4 py-2.5 sm:border-r sm:border-gray-100">
        <span className="text-xs font-medium text-gray-500">{leftLabel}</span>
        <span className="text-xs font-semibold text-gray-900">{leftValue || "-"}</span>
      </div>
      <div className="flex justify-between px-4 py-2.5">
        <span className="text-xs font-medium text-gray-500">{rightLabel}</span>
        <span className="text-xs font-semibold text-gray-900">{rightValue || "-"}</span>
      </div>
    </div>
  )
}

interface FullRowProps {
  label: string
  value: string | undefined
}

function FullRow({ label, value }: FullRowProps) {
  return (
    <div className="flex flex-col gap-1 border-b border-gray-100 px-4 py-3 last:border-0 sm:flex-row sm:items-start sm:justify-between sm:gap-6">
      <span className="text-xs font-medium text-gray-500 shrink-0">{label}</span>
      <span className="text-xs font-semibold text-gray-900 whitespace-pre-line sm:text-right">{value || "-"}</span>
    </div>
  )
}

interface SectionProps {
  title: string
  icon: React.ReactNode
  borderColor: string
  headerBg: string
  children: React.ReactNode
  stepNumber: number
  onEdit?: (step: number) => void
  showEditButton?: boolean
}

function RecapSection({
  title,
  icon,
  borderColor,
  headerBg,
  children,
  stepNumber,
  onEdit,
  showEditButton = true,
}: SectionProps) {
  return (
    <div className={`rounded-xl border ${borderColor} bg-white overflow-hidden`}>
      <div className={`border-b ${borderColor} ${headerBg} px-5 py-3 flex items-center justify-between`}>
        <div className="flex items-center gap-2">
          <div className="h-5 w-5 shrink-0">{icon}</div>
          <h3 className="text-base font-bold text-gray-900">{title}</h3>
        </div>
        {showEditButton && (
          <Button
            type="button"
            variant="outline"
            size="sm"
            className="text-xs font-semibold px-3 py-1 bg-white"
            onClick={() => onEdit?.(stepNumber)}
          >
            Edit
          </Button>
        )}
      </div>
      <div className="divide-y divide-gray-100">{children}</div>
    </div>
  )
}

interface CertBadgeProps {
  label: string
  number: string | undefined
  colorClass: string
}

function CertBadge({ label, number, colorClass }: CertBadgeProps) {
  return (
    <div className="flex items-center justify-between border-b border-gray-100 px-4 py-3 last:border-0">
      <div className="flex items-center gap-3">
        <span
          className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-bold text-white ${colorClass}`}
        >
          <CheckCircle2 className="h-3.5 w-3.5" />
          {label}
        </span>
        <span className="text-xs text-gray-500">No. {number || "-"}</span>
      </div>
      <Button type="button" variant="outline" size="sm" className="text-xs font-semibold px-4 py-1 bg-white">
        Lihat
      </Button>
    </div>
  )
}

export function Rekap({
  productData,
  nutritionData,
  legalityData,
  servingData,
  onSubmit,
  onEdit,
  isLoading = false,
}: RekapProps) {
  const hasAllData = productData && nutritionData && legalityData && servingData

  return (
    <div className="space-y-4">
      {hasAllData ? (
        <div className="rounded-lg border border-blue-200 bg-blue-50 p-3">
          <div className="flex items-center gap-2">
            <Info className="h-4 w-4 shrink-0 text-blue-600" />
            <p className="text-sm font-medium text-blue-900">
              Semua data telah terisi. Periksa kembali sebelum mendaftarkan produk.
            </p>
          </div>
        </div>
      ) : (
        <div className="rounded-lg border border-yellow-200 bg-yellow-50 p-3">
          <div className="flex gap-2">
            <div className="shrink-0 pt-0.5">
              <AlertCircle className="h-4 w-4 text-yellow-600" />
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

      {productData && (
        <RecapSection
          title="Informasi Produk"
          icon={<Package className="h-6 w-6 text-blue-600" />}
          borderColor="border-blue-200"
          headerBg="bg-blue-50"
          stepNumber={1}
          onEdit={onEdit}
        >
          <SectionRow
            leftLabel="Nama Produk"
            leftValue={productData.productName}
            rightLabel="Nama Brand"
            rightValue={productData.brandName}
          />
          <SectionRow
            leftLabel="Harga"
            leftValue={productData.price ? `Rp ${parseInt(productData.price).toLocaleString("id-ID")}` : "-"}
            rightLabel="Berat/Volume"
            rightValue={productData.weight ? `${productData.weight} ${productData.unit}` : "-"}
          />
          <SectionRow
            leftLabel="Jenis"
            leftValue={productData.jenis?.length ? productData.jenis.join(", ") : "-"}
            rightLabel="Deskripsi Produk"
            rightValue={productData.deskripsi}
          />
          <div className="flex items-center justify-between px-4 py-2.5">
            <span className="text-xs font-medium text-gray-500">Foto Produk</span>
            {productData.productPhotoPreview?.length ? (
              <div className="flex gap-1.5">
                {productData.productPhotoPreview.map((src, idx) => (
                  <Image
                    key={idx}
                    src={src}
                    alt={`Foto produk ${idx + 1}`}
                    className="h-9 w-9 rounded-md object-cover border border-gray-200"
                    width={80}
                    height={80}
                  />
                ))}
              </div>
            ) : (
              <span className="text-xs font-semibold text-gray-900">-</span>
            )}
          </div>
        </RecapSection>
      )}

      {nutritionData && (
        <RecapSection
          title="Informasi Nutrisi & Gizi"
          icon={<Leaf className="h-6 w-6 text-green-600" />}
          borderColor="border-green-200"
          headerBg="bg-green-50"
          stepNumber={2}
          onEdit={onEdit}
        >
          <SectionRow
            leftLabel="Takaran Saji"
            leftValue={nutritionData.servingSize}
            rightLabel="Sajian Perkemasan"
            rightValue={nutritionData.servingsPerPackage}
          />
          <SectionRow
            leftLabel="Energi Total"
            leftValue={nutritionData.calories ? `${nutritionData.calories} kkal` : undefined}
            rightLabel="Lemak Jenuh"
            rightValue={nutritionData.saturatedFat ? `${nutritionData.saturatedFat} g` : undefined}
          />
          <SectionRow
            leftLabel="Karbohidrat Total"
            leftValue={nutritionData.carbohydrates ? `${nutritionData.carbohydrates} g` : undefined}
            rightLabel="Protein"
            rightValue={nutritionData.protein ? `${nutritionData.protein} g` : undefined}
          />
          <SectionRow
            leftLabel="Gula"
            leftValue={nutritionData.sugar ? `${nutritionData.sugar} g` : undefined}
            rightLabel="Natrium (Garam)"
            rightValue={nutritionData.sodium ? `${nutritionData.sodium} mg` : undefined}
          />
          <SectionRow
            leftLabel="Komposisi"
            leftValue={nutritionData.composition}
            rightLabel="Informasi Alergen"
            rightValue={nutritionData.allergens?.length ? nutritionData.allergens.join(", ") : "-"}
          />
        </RecapSection>
      )}

      {legalityData && (
        <RecapSection
          title="Informasi Sertifikat"
          icon={<Shield className="h-6 w-6 text-purple-600" />}
          borderColor="border-purple-200"
          headerBg="bg-purple-50"
          stepNumber={3}
          onEdit={onEdit}
        >
          {legalityData.hasBpom && <CertBadge label="BPOM" number={legalityData.bpomNumber} colorClass="bg-blue-600" />}
          {legalityData.hasPirt && <CertBadge label="PIRT" number={legalityData.pirtNumber} colorClass="bg-purple-400" />}
          {legalityData.hasHalal && (
            <CertBadge label="Halal MUI" number={legalityData.halalCertificateNumber} colorClass="bg-green-600" />
          )}
          {legalityData.hasCoa && <CertBadge label="COA" number={legalityData.coaNumber} colorClass="bg-amber-600" />}

          {!legalityData.hasBpom && !legalityData.hasPirt && !legalityData.hasHalal && !legalityData.hasCoa && (
            <div className="px-4 py-3 text-sm text-gray-600">Tidak ada sertifikat tambahan yang diinput.</div>
          )}
        </RecapSection>
      )}

      {servingData && (
        <RecapSection
          title="Saran Penyajian"
          icon={<Package className="h-6 w-6 text-blue-600" />}
          borderColor="border-blue-200"
          headerBg="bg-blue-50"
          stepNumber={4}
          onEdit={onEdit}
          showEditButton={false}
        >
          <FullRow label="Informasi Penyajian" value={servingData.servingInfo} />
          <FullRow label="Informasi Penyimpanan" value={servingData.storageInfo} />
          <FullRow label="Informasi Porsi" value={servingData.portionInfo} />
          <FullRow label="Link Video Penyajian" value={servingData.videoLink} />

          <FullRow label="Video Penyajian" value={undefined} />

          <div className="flex flex-col gap-1 border-b border-gray-100 px-4 py-3 last:border-0 sm:flex-row sm:items-start sm:justify-between sm:gap-6">
            <span className="text-xs font-medium text-gray-500 shrink-0">Foto Penyajian</span>
            {servingData.servingPhotoPreviews?.length ? (
              <div className="flex flex-wrap justify-end gap-1.5">
                {servingData.servingPhotoPreviews.map((src, idx) => (
                  <Image
                    key={idx}
                    src={src}
                    alt={`Foto penyajian ${idx + 1}`}
                    className="h-9 w-9 rounded-md object-cover border border-gray-200"
                    width={80}
                    height={80}
                  />
                ))}
              </div>
            ) : (
              <span className="text-xs font-semibold text-gray-900">-</span>
            )}
          </div>
        </RecapSection>
      )}

      <div className="flex gap-3 pt-2">
        <Button type="button" variant="outline" className="flex-1 py-6 text-sm font-semibold" onClick={() => onEdit?.(4)}>
          ← Sebelumnya
        </Button>
        <Button
          type="button"
          disabled={!hasAllData || isLoading}
          className="flex-1 bg-blue-600 py-6 text-base font-semibold hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
          onClick={onSubmit}
        >
          {isLoading ? "Memproses..." : "Daftarkan Produk →"}
        </Button>
      </div>
    </div>
  )
}
