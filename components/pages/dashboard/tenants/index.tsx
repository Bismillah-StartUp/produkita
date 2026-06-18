"use client"

import { useState } from "react"
import { Building2, CheckCircle, Pencil, X, Check } from "lucide-react"
import Image from "next/image"
import { Camera } from "lucide-react"
import ProfilePartial from "./partials/profile"
import ContactPartial from "./partials/contact"
import PhotosPartial from "./partials/photos"

export interface TenantData {
  companyName: string
  tradeName: string
  businessField: string
  npwp: string
  businessDescription: string
  address: string
  district: string
  postalCode: string
  province: string
  mapsQuery: string
  phone: string
  email: string
  website: string
  foundedYear: string
  productCount: string
}

const defaultData: TenantData = {
  companyName: "PT. Cimory Dairy Foods",
  tradeName: "Cimory",
  businessField: "Produk Olahan Susu",
  npwp: "01.234.567.8-000.000",
  businessDescription:
    "Cimory adalah merek produk olahan susu yang didirikan di Cisarua, Bogor. " +
    "Memproduksi berbagai produk seperti yogurt, keju, dan minuman susu berkualitas " +
    "tinggi dengan bahan baku pilihan langsung dari peternak lokal.",
  address: "Jl. Raya Puncak No. 435, Cisarua",
  district: "Bogor",
  postalCode: "16750",
  province: "Jawa Barat",
  mapsQuery: "Cimory Dairy Cisarua Bogor",
  phone: "+62 251 8254880",
  email: "info@cimory.com",
  website: "www.cimory.com",
  foundedYear: "2006",
  productCount: "50+",
}

export default function TenantsPage() {
  const [isEditing, setIsEditing] = useState(false)
  const [savedData, setSavedData] = useState<TenantData>(defaultData)
  const [tempData, setTempData] = useState<TenantData>(defaultData)

  const data = isEditing ? tempData : savedData

  const handleEdit = () => {
    setTempData({ ...savedData })
    setIsEditing(true)
  }

  const handleCancel = () => {
    setTempData({ ...savedData })
    setIsEditing(false)
  }

  const handleSave = () => {
    setSavedData({ ...tempData })
    setIsEditing(false)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setTempData((prev) => ({ ...prev, [name]: value }))
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Cover Photo */}
      <div className="relative h-48 bg-gray-700 overflow-hidden">
        <Image
          src="https://images.unsplash.com/photo-1565793298595-6a879b1d9492?w=1400&q=80"
          alt="Foto perusahaan"
          fill
          className="object-cover"
          style={{ filter: "brightness(0.7)" }}
        />
        <button className="absolute top-3 right-3 z-10 flex items-center gap-1.5 bg-black/50 text-white text-xs font-medium px-3 py-1.5 rounded-lg hover:bg-black/60 transition-colors">
          <Camera size={13} />
          Ganti Foto Tempat
        </button>
        <div className="absolute bottom-4 left-5 z-10 flex items-center gap-3">
          <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center shadow-md shrink-0">
            <Building2 className="text-blue-600" size={22} />
          </div>
          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <h1 className="text-white font-bold text-lg leading-tight">{savedData.companyName}</h1>
              <span className="flex items-center gap-1 bg-green-500 text-white text-[11px] font-semibold px-2 py-0.5 rounded-full">
                <CheckCircle size={11} />
                Verified
              </span>
            </div>
            <p className="text-white/75 text-sm mt-0.5">
              {savedData.businessField} · Sejak {savedData.foundedYear}
            </p>
          </div>
        </div>
      </div>

      {/* Stats + Actions Bar */}
      <div className="bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
        <div className="flex items-center">
          <div className="pr-10">
            <p className="text-xs text-gray-500">Tahun Berdiri</p>
            {isEditing ? (
              <input
                name="foundedYear"
                value={tempData.foundedYear}
                onChange={handleChange}
                className="text-base font-bold text-gray-900 border-b border-gray-400 bg-transparent focus:outline-none w-24 mt-0.5"
              />
            ) : (
              <p className="text-base font-bold text-gray-900 mt-0.5">{savedData.foundedYear}</p>
            )}
          </div>
          <div className="w-px h-10 bg-gray-200 mr-10" />
          <div>
            <p className="text-xs text-gray-500">Jumlah Produk</p>
            <p className="text-base font-bold text-gray-900 mt-0.5">{savedData.productCount}</p>
          </div>
        </div>

        {isEditing ? (
          <div className="flex items-center gap-2">
            <button
              onClick={handleCancel}
              className="flex items-center gap-1.5 border border-gray-300 text-gray-700 text-sm font-medium px-4 py-1.5 rounded-lg hover:bg-gray-50 transition-colors"
            >
              <X size={14} />
              Batal
            </button>
            <button
              onClick={handleSave}
              className="flex items-center gap-1.5 bg-blue-600 text-white text-sm font-medium px-4 py-1.5 rounded-lg hover:bg-blue-700 transition-colors"
            >
              <Check size={14} />
              Simpan
            </button>
          </div>
        ) : (
          <button
            onClick={handleEdit}
            className="flex items-center gap-1.5 border border-blue-500 text-blue-600 text-sm font-medium px-4 py-1.5 rounded-lg hover:bg-blue-50 transition-colors"
          >
            <Pencil size={14} />
            Edit Informasi
          </button>
        )}
      </div>

      {/* Content */}
      <div className="p-6 flex gap-5">
        <div className="flex-1 min-w-0 space-y-4">
          <ProfilePartial
            data={data}
            isEditing={isEditing}
            tempData={tempData}
            onChange={handleChange}
          />
        </div>
        <div className="w-72 shrink-0 space-y-4">
          <ContactPartial
            data={data}
            isEditing={isEditing}
            onChange={handleChange}
          />
          <PhotosPartial />
        </div>
      </div>
    </div>
  )
}