import { MapPin, ExternalLink } from "lucide-react"
import { TenantData, ViewFieldProps } from "../types/tenants.i"
import Link from "next/link"

const ViewField = ({ label, value }: ViewFieldProps) => (
  <div>
    <p className="text-xs text-gray-500 mb-1">{label}</p>
    <p className="text-sm font-semibold text-gray-900">{value || "—"}</p>
  </div>
)

interface EditFieldProps {
  label: string
  name: string
  value: string
  multiline?: boolean
  rows?: number
  type?: string
  min?: string
  max?: string
  maxLength?: number
  placeholder?: string
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void
}

const EditField = ({ label, name, value, multiline = false, rows = 3, type = "text", min, max, maxLength, placeholder, onChange }: EditFieldProps) => (
  <div>
    <p className="text-xs text-gray-500 mb-1">{label}</p>
    {multiline ? (
      <textarea
        name={name}
        value={value}
        onChange={onChange}
        rows={rows}
        placeholder={placeholder}
        className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-900 bg-white focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 resize-none"
      />
    ) : (
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        min={min}
        max={max}
        maxLength={maxLength}
        placeholder={placeholder}
        className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-900 bg-white focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
      />
    )}
  </div>
)

// format NPWP: XX.XXX.XXX.X-XXX.XXX
const formatNpwp = (value: string) => {
  const digits = value.replace(/\D/g, "").slice(0, 15)
  const parts = [
    digits.slice(0, 2),
    digits.slice(2, 5),
    digits.slice(5, 8),
    digits.slice(8, 9),
    digits.slice(9, 12),
    digits.slice(12, 15),
  ]
  let result = parts[0]
  if (parts[1]) result += "." + parts[1]
  if (parts[2]) result += "." + parts[2]
  if (parts[3]) result += "." + parts[3]
  if (parts[4]) result += "-" + parts[4]
  if (parts[5]) result += "." + parts[5]
  return result
}

interface ProfilePartialProps {
  data: TenantData
  isEditing: boolean
  tempData: TenantData
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void
  onNpwpChange: (value: string) => void
  onPostalCodeChange: (value: string) => void
  onFoundedYearChange: (value: string) => void
}

export default function ProfilePartial({
  data,
  isEditing,
  tempData,
  onChange,
  onNpwpChange,
  onPostalCodeChange,
  onFoundedYearChange,
}: ProfilePartialProps) {
  const currentYear = new Date().getFullYear()

  return (
    <>
      {/* Profil Perusahaan */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <div className="flex items-center justify-between mb-5">
          <h2 className="text-[15px] font-bold text-gray-900">Profil Perusahaan</h2>
          {isEditing && <span className="text-xs font-semibold text-blue-600">Mode Edit Aktif</span>}
        </div>

        <div className="grid grid-cols-2 gap-5">
          {isEditing ? (
            <>
              <EditField label="Nama Perusahaan" name="companyName" value={tempData.companyName} onChange={onChange} />
              <EditField label="Nama Dagang" name="tradeName" value={tempData.tradeName} onChange={onChange} />
              <EditField label="Bidang Usaha" name="businessField" value={tempData.businessField} onChange={onChange} />

              {/* NPWP dengan auto-format */}
              <div>
                <p className="text-xs text-gray-500 mb-1">NPWP</p>
                <input
                  type="text"
                  name="npwp"
                  value={tempData.npwp}
                  onChange={(e) => onNpwpChange(formatNpwp(e.target.value))}
                  placeholder="XX.XXX.XXX.X-XXX.XXX"
                  maxLength={20}
                  className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-900 bg-white focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>

              <div className="col-span-2">
                <EditField
                  label="Deskripsi Usaha"
                  name="businessDescription"
                  value={tempData.businessDescription}
                  multiline
                  rows={4}
                  onChange={onChange}
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

      {/* Alamat */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <h2 className="text-[15px] font-bold text-gray-900 mb-5">Alamat</h2>

        <div className="space-y-4">
          {isEditing ? (
            <EditField label="Jalan / Alamat" name="address" value={tempData.address} onChange={onChange} />
          ) : (
            <ViewField label="Jalan / Alamat" value={data.address} />
          )}

          <div className="grid grid-cols-3 gap-4">
            {isEditing ? (
              <>
                <EditField label="Kota" name="district" value={tempData.district} onChange={onChange} />

                {/* Kode Pos — hanya 5 digit angka */}
                <div>
                  <p className="text-xs text-gray-500 mb-1">Kode Pos</p>
                  <input
                    type="text"
                    name="postalCode"
                    value={tempData.postalCode}
                    onChange={(e) => {
                      const val = e.target.value.replace(/\D/g, "").slice(0, 5)
                      onPostalCodeChange(val)
                    }}
                    placeholder="12345"
                    maxLength={5}
                    className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-900 bg-white focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>

                <EditField label="Provinsi" name="province" value={tempData.province} onChange={onChange} />
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
                  onChange={onChange}
                  className="border border-gray-200 rounded-lg px-3 py-1.5 text-sm w-44 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
            )}
          </div>

          <div className="relative rounded-xl overflow-hidden border border-gray-200 h-48">
            <Link
              href={`https://maps.google.com/maps?q=${encodeURIComponent(data.mapsQuery)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="absolute top-2 left-2 z-10 flex items-center gap-1 bg-white text-gray-700 text-xs font-medium px-2.5 py-1.5 rounded-lg shadow border border-gray-200 hover:bg-gray-50"
            >
              <ExternalLink size={12} />
              Open in Maps
            </Link>
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
    </>
  )
}