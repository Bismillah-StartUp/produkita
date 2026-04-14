'use client'

import Image from 'next/image'
import { Shield, Leaf, FileBadge, FileCheck } from 'lucide-react'

interface ProductOverviewProps {
  productName: string
  productImage?: string
  price?: number
  volume?: string
  enterpriseName: string
  certifications: {
    hasBPOM: boolean
    hasPIRT: boolean
    hasHalal: boolean
    isLicensed: boolean
  }
}

export default function ProductOverview({
  productName,
  productImage,
  price,
  volume,
  enterpriseName,
  certifications,
}: ProductOverviewProps) {
  return (
    <div className="space-y-6">
      {/* Product Image */}
      <div className="flex justify-center">
        {productImage ? (
          <div className="relative h-64 w-64 rounded-lg overflow-hidden bg-slate-200">
            <Image
              src={productImage}
              alt={productName}
              fill
              className="object-cover"
              priority
            />
          </div>
        ) : (
          <div className="h-64 w-64 bg-slate-200 rounded-lg flex items-center justify-center">
            <span className="text-slate-500">Tidak ada gambar</span>
          </div>
        )}
      </div>

      {/* Product Info */}
      <div>
        <p className="text-sm text-slate-600">{enterpriseName}</p>
        <h1 className="text-3xl font-bold">{productName}</h1>
        {price && (
          <p className="text-2xl font-bold text-slate-800 mt-2">
            Rp {price.toLocaleString('id-ID')}
            {volume && <span className="text-sm font-normal text-slate-600 ml-2">• {volume}</span>}
          </p>
        )}
      </div>

      {/* Certification Badges */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {certifications.hasBPOM && (
          <div className="bg-blue-50 rounded-lg p-4 text-center space-y-2">
            <div className="flex justify-center"><Shield size={32} className="text-blue-500" /></div>
            <p className="text-sm font-medium text-blue-600">BPOM</p>
          </div>
        )}
        {certifications.hasPIRT && (
          <div className="bg-green-50 rounded-lg p-4 text-center space-y-2">
            <div className="flex justify-center"><FileCheck size={32} className="text-green-500" /></div>
            <p className="text-sm font-medium text-green-600">PIRT</p>
          </div>
        )}
        {certifications.hasHalal && (
          <div className="bg-green-50 rounded-lg p-4 text-center space-y-2">
            <div className="flex justify-center"><Leaf size={32} className="text-green-500" /></div>
            <p className="text-sm font-medium text-green-600">Halal</p>
          </div>
        )}
        {certifications.isLicensed && (
          <div className="bg-purple-50 rounded-lg p-4 text-center space-y-2">
            <div className="flex justify-center"><FileBadge size={32} className="text-purple-500" /></div>
            <p className="text-sm font-medium text-purple-600">Licensed</p>
          </div>
        )}
      </div>

      {/* Verification Status */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 text-center">
        <p className="text-sm text-slate-900">
          <span className="text-green-600 font-medium">✓</span> Semua sertifikasi terverifikasi dan
          up to date
        </p>
      </div>
    </div>
  )
}
