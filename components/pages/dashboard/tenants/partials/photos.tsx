import Image from "next/image"
import { Upload } from "lucide-react"

export default function PhotosPartial() {
  return (
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
  )
}