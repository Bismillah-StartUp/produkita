"use client"

import { useState } from "react"
import Image from "next/image"
import {
  Building2,
  Phone,
  Mail,
  Globe,
  MapPin,
  Upload,
  Pencil,
  CheckCircle,
  Camera,
  X,
  Check,
  ExternalLink,
} from "lucide-react"

export interface UMKMData {
  companyName: string
  district: string
  province: string
  address: string
  phone: string
  email: string
  tradeName: string
  businessField: string
  npwp: string
  businessDescription: string
  postalCode: string
  website: string
  foundedYear: string
  productCount: string
  mapsQuery: string
}

const defaultData: UMKMData = {
  companyName: "PT. Cimory Dairy Foods",
  district: "Bogor",
  province: "Jawa Barat",
  address: "Jl. Raya Puncak No. 435, Cisarua",
  phone: "+62 251 8254880",
  email: "info@cimory.com",
  tradeName: "Cimory",
  businessField: "Produk Olahan Susu",
  npwp: "01.234.567.8-000.000",

  businessDescription:
    "Cimory adalah merek produk olahan susu yang didirikan di Cisarua, Bogor. " +
    "Memproduksi berbagai produk seperti yogurt, keju, dan minuman susu berkualitas " +
    "tinggi dengan bahan baku pilihan langsung dari peternak lokal.",
  postalCode: "16750",
  website: "www.cimory.com",
  foundedYear: "2006",
  productCount: "50+",
  mapsQuery: "Cimory Dairy Cisarua Bogor",
}

interface ViewFieldProps {
  label: string
  value: string
}

function ViewField({ label, value }: ViewFieldProps) {
  return (
    <div>
      <p className="text-xs text-gray-500 mb-1">{label}</p>
      <p className="text-sm font-semibold text-gray-900">{value || "—"}</p>
    </div>
  )
}

interface EditFieldProps {
  label: string
  name: string
  value: string
  multiline?: boolean
  rows?: number
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void
}

function EditField({ label, name, value, multiline = false, rows = 3, onChange }: EditFieldProps) {
  return (
    <div>
      <p className="text-xs text-gray-500 mb-1">{label}</p>
      {multiline ? (
        <textarea
          name={name}
          value={value}
          onChange={onChange}
          rows={rows}
          className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-900 bg-white focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 resize-none"
        />
      ) : (
        <input
          type="text"
          name={name}
          value={value}
          onChange={onChange}
          className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-900 bg-white focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
        />
      )}
    </div>
  )
}

export function InformasiUMKM() {
  const [isEditing, setIsEditing] = useState(false)

  const [savedData, setSavedData] = useState<UMKMData>(defaultData)

  const [tempData, setTempData] = useState<UMKMData>(defaultData)

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
            {isEditing ? (
              <input
                name="productCount"
                value={tempData.productCount}
                onChange={handleChange}
                className="text-base font-bold text-gray-900 border-b border-gray-400 bg-transparent focus:outline-none w-24 mt-0.5"
              />
            ) : (
              <p className="text-base font-bold text-gray-900 mt-0.5">{savedData.productCount}</p>
            )}
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

      <div className="p-6 flex gap-5">
        <div className="flex-1 min-w-0 space-y-4">
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-5">
              <h2 className="text-[15px] font-bold text-gray-900">Profil Perusahaan</h2>
              {isEditing && <span className="text-xs font-semibold text-blue-600">Mode Edit Aktif</span>}
            </div>

            <div className="grid grid-cols-2 gap-5">
              {isEditing ? (
                <>
                  <EditField
                    label="Nama Perusahaan"
                    name="companyName"
                    value={tempData.companyName}
                    onChange={handleChange}
                  />
                  <EditField label="Nama Dagang" name="tradeName" value={tempData.tradeName} onChange={handleChange} />
                  <EditField
                    label="Bidang Usaha"
                    name="businessField"
                    value={tempData.businessField}
                    onChange={handleChange}
                  />
                  <EditField label="NPWP" name="npwp" value={tempData.npwp} onChange={handleChange} />
                  <div className="col-span-2">
                    <EditField
                      label="Deskripsi Usaha"
                      name="businessDescription"
                      value={tempData.businessDescription}
                      multiline
                      rows={4}
                      onChange={handleChange}
                    />
                  </div>
                </>
              ) : (
                <>
                  <ViewField label="Nama Perusahaan" value={data.companyName} />
                  <ViewField label="Nama Dagang" value={data.tradeName} />
                  <ViewField label="Bidang Usaha" value={data.businessField} />
                  <ViewField label="NPWP" value={data.npwp} />
                  <div className="col-span-2">
                    <p className="text-xs text-gray-500 mb-1">Deskripsi Usaha</p>
                    <p className="text-sm text-gray-900 leading-relaxed">{data.businessDescription || "—"}</p>
                  </div>
                </>
              )}
            </div>
          </div>

          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <h2 className="text-[15px] font-bold text-gray-900 mb-5">Alamat</h2>

            <div className="space-y-4">
              {isEditing ? (
                <EditField label="Jalan / Alamat" name="address" value={tempData.address} onChange={handleChange} />
              ) : (
                <ViewField label="Jalan / Alamat" value={data.address} />
              )}

              <div className="grid grid-cols-3 gap-4">
                {isEditing ? (
                  <>
                    <EditField label="Kota" name="district" value={tempData.district} onChange={handleChange} />
                    <EditField label="Kode Pos" name="postalCode" value={tempData.postalCode} onChange={handleChange} />
                    <EditField label="Provinsi" name="province" value={tempData.province} onChange={handleChange} />
                  </>
                ) : (
                  <>
                    <ViewField label="Kota" value={data.district} />
                    <ViewField label="Kode Pos" value={data.postalCode} />
                    <ViewField label="Provinsi" value={data.province} />
                  </>
                )}
              </div>

              <div className="flex items-start justify-between gap-4 pt-1">
                <div className="flex items-start gap-2">
                  <MapPin size={16} className="text-blue-500 mt-0.5 shrink-0" />
                  <div>
                    <p className="text-sm font-semibold text-gray-900">Lokasi Usaha</p>
                    <p className="text-xs text-gray-500 mt-0.5">
                      {data.address}, {data.district}
                    </p>
                  </div>
                </div>
                {isEditing && (
                  <div className="flex items-center gap-2 shrink-0">
                    <span className="text-xs text-gray-500">Query Maps:</span>
                    <input
                      name="mapsQuery"
                      value={tempData.mapsQuery}
                      onChange={handleChange}
                      className="border border-gray-200 rounded-lg px-3 py-1.5 text-sm w-44 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                )}
              </div>

              <div className="relative rounded-xl overflow-hidden border border-gray-200 h-48">
                <a
                  href={`https://maps.google.com/maps?q=${encodeURIComponent(data.mapsQuery)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="absolute top-2 left-2 z-10 flex items-center gap-1 bg-white text-gray-700 text-xs font-medium px-2.5 py-1.5 rounded-lg shadow border border-gray-200 hover:bg-gray-50"
                >
                  <ExternalLink size={12} />
                  Open in Maps
                </a>
                <iframe
                  title="Peta Lokasi"
                  src={`https://maps.google.com/maps?q=${encodeURIComponent(data.mapsQuery)}&output=embed&z=14`}
                  className="w-full h-full"
                  style={{ border: 0 }}
                  loading="lazy"
                  allowFullScreen
                />
              </div>
            </div>
          </div>
        </div>

        <div className="w-72 shrink-0 space-y-4">
          <div className="bg-white rounded-xl border border-gray-200 p-5">
            <h2 className="text-[15px] font-bold text-gray-900 mb-4">Kontak</h2>

            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-full bg-blue-50 flex items-center justify-center shrink-0 mt-0.5">
                  <Phone size={14} className="text-blue-500" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs text-gray-500">Telepon</p>
                  {isEditing ? (
                    <input
                      name="phone"
                      value={tempData.phone}
                      onChange={handleChange}
                      className="w-full mt-1 border border-gray-200 rounded-lg px-3 py-1.5 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
                    />
                  ) : (
                    <p className="text-sm font-semibold text-gray-900 mt-0.5">{data.phone}</p>
                  )}
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-full bg-blue-50 flex items-center justify-center shrink-0 mt-0.5">
                  <Mail size={14} className="text-blue-500" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs text-gray-500">Email</p>
                  {isEditing ? (
                    <input
                      name="email"
                      value={tempData.email}
                      onChange={handleChange}
                      className="w-full mt-1 border border-gray-200 rounded-lg px-3 py-1.5 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
                    />
                  ) : (
                    <p className="text-sm font-semibold text-gray-900 mt-0.5">{data.email}</p>
                  )}
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-full bg-blue-50 flex items-center justify-center shrink-0 mt-0.5">
                  <Globe size={14} className="text-blue-500" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs text-gray-500">Website</p>
                  {isEditing ? (
                    <input
                      name="website"
                      value={tempData.website}
                      onChange={handleChange}
                      className="w-full mt-1 border border-gray-200 rounded-lg px-3 py-1.5 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
                    />
                  ) : (
                    <p className="text-sm font-semibold text-gray-900 mt-0.5">{data.website}</p>
                  )}
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl border border-gray-200 p-5">
            <h2 className="text-[15px] font-bold text-gray-900 mb-4">Foto Perusahaan</h2>

            <div className="space-y-4">
              <div>
                <p className="text-xs text-gray-500 mb-2">Logo Perusahaan</p>
                <div className="border-2 border-dashed border-gray-200 rounded-xl p-5 flex flex-col items-center gap-1.5 text-gray-400 cursor-pointer hover:border-blue-400 hover:text-blue-500 transition-colors">
                  <Upload size={20} />
                  <p className="text-xs font-medium">Upload Logo</p>
                  <p className="text-[11px] text-gray-400">PNG, JPG, SVG</p>
                </div>
              </div>

              <div>
                <p className="text-xs text-gray-500 mb-2">Foto Tempat / Gedung</p>
                <div className="relative w-full h-36 rounded-xl overflow-hidden">
                  <Image
                    src="https://images.unsplash.com/photo-1565793298595-6a879b1d9492?w=400&q=80"
                    alt="Foto gedung"
                    fill
                    className="object-cover"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
