"use client"

import Image from "next/image"
import { Upload, X } from "lucide-react"
import { useRef } from "react"
import { useTenant } from "@/hooks/useTenants"

interface PhotosPartialProps {
  userUuid: string
  tenantUuid: string
  logoUrl: string | null
  placeUrl: string | null
  onLogoChange: (url: string | null) => void
  onPlaceChange: (url: string | null) => void
}

export default function PhotosPartial({
  userUuid,
  logoUrl,
  placeUrl,
  onLogoChange,
  onPlaceChange,
}: PhotosPartialProps) {
  const { uploadLogo, uploadPlace, deleteLogo, deletePlace, loading } = useTenant()
  const logoRef = useRef<HTMLInputElement>(null)
  const placeRef = useRef<HTMLInputElement>(null)

  const handleUploadLogo = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file || !userUuid) return
    const result = await uploadLogo(userUuid, file)
    if (result) onLogoChange(result.logo_url ?? null)
    e.target.value = ""
  }

  const handleUploadPlace = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file || !userUuid) return
    const result = await uploadPlace(userUuid, file)
    if (result) onPlaceChange(result.place_url ?? null)
    e.target.value = ""
  }

  const handleDeleteLogo = async () => {
    if (!userUuid) return
    const result = await deleteLogo(userUuid)
    if (result !== null) onLogoChange(null)
  }

  const handleDeletePlace = async () => {
    if (!userUuid) return
    const result = await deletePlace(userUuid)
    if (result !== null) onPlaceChange(null)
  }

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-5">
      <h2 className="text-[15px] font-bold text-gray-900 mb-4">Foto Perusahaan</h2>
      <div className="space-y-4">

        {/* Logo */}
        <div>
          <p className="text-xs text-gray-500 mb-2">Logo Perusahaan</p>
          <input
            ref={logoRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleUploadLogo}
          />
          {logoUrl ? (
            <div className="relative w-full h-24 rounded-xl overflow-hidden border border-gray-200">
              <Image src={logoUrl} alt="Logo" fill className="object-contain p-2" />
              <button
                onClick={handleDeleteLogo}
                disabled={loading}
                className="absolute top-1.5 right-1.5 bg-red-500 text-white rounded-full p-0.5 hover:bg-red-600 transition-colors disabled:opacity-50"
              >
                <X size={12} />
              </button>
            </div>
          ) : (
            <div
              onClick={() => !loading && logoRef.current?.click()}
              className="border-2 border-dashed border-gray-200 rounded-xl p-5 flex flex-col items-center gap-1.5 text-gray-400 cursor-pointer hover:border-blue-400 hover:text-blue-500 transition-colors"
            >
              <Upload size={20} />
              <p className="text-xs font-medium">{loading ? "Mengupload..." : "Upload Logo"}</p>
              <p className="text-[11px] text-gray-400">PNG, JPG, SVG</p>
            </div>
          )}
        </div>

        {/* Foto Tempat */}
        <div>
          <p className="text-xs text-gray-500 mb-2">Foto Tempat / Gedung</p>
          <input
            ref={placeRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleUploadPlace}
          />
          {placeUrl ? (
            <div className="relative w-full h-36 rounded-xl overflow-hidden border border-gray-200">
              <Image src={placeUrl} alt="Foto gedung" fill className="object-cover" />
              <button
                onClick={handleDeletePlace}
                disabled={loading}
                className="absolute top-1.5 right-1.5 bg-red-500 text-white rounded-full p-0.5 hover:bg-red-600 transition-colors disabled:opacity-50"
              >
                <X size={12} />
              </button>
            </div>
          ) : (
            <div
              onClick={() => !loading && placeRef.current?.click()}
              className="relative w-full h-36 rounded-xl overflow-hidden border-2 border-dashed border-gray-200 flex flex-col items-center justify-center gap-1.5 text-gray-400 cursor-pointer hover:border-blue-400 hover:text-blue-500 transition-colors"
            >
              <Upload size={20} />
              <p className="text-xs font-medium">{loading ? "Mengupload..." : "Upload Foto Tempat"}</p>
              <p className="text-[11px] text-gray.400">PNG, JPG, WEBP</p>
            </div>
          )}
        </div>

      </div>
    </div>
  )
}