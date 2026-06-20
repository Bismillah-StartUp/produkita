'use client'

import { Building2, Phone, Mail, MapPin } from 'lucide-react'

interface CompanyInfoProps {
  name: string
  address?: string
  phone?: string
  email?: string
  description?: string
}

export default function CompanyInfo({
  name,
  address,
  phone,
  email,
  description,
}: CompanyInfoProps) {
  return (
    <div className="space-y-4 sm:space-y-6 lg:space-y-8">
      <div>
        <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-slate-900">Company Information</h2>
        <p className="text-xs sm:text-sm text-slate-600 mt-1">Manufacturer details</p>
      </div>

      <div className="bg-slate-50 border border-slate-200 rounded-lg p-3 sm:p-4 lg:p-6">
        <div className="flex items-center gap-2 sm:gap-3">
          <Building2 size={24} className="text-slate-900 shrink-0 sm:size-8 lg:size-9" />
          <h3 className="text-lg sm:text-2xl lg:text-3xl font-bold text-slate-900">{name}</h3>
        </div>
      </div>

      <div className="space-y-3 sm:space-y-4 lg:space-y-5">
        {address && (
          <div>
            <div className="flex items-center gap-2 mb-1">
              <MapPin size={16} className="text-slate-700 shrink-0 sm:size-5" />
              <p className="text-slate-700 text-xs sm:text-sm font-medium">Address</p>
            </div>
            <p className="text-slate-900 text-sm sm:text-base ml-6">{address}</p>
          </div>
        )}

        {phone && (
          <div>
            <div className="flex items-center gap-2 mb-1">
              <Phone size={16} className="text-slate-700 shrink-0 sm:size-5" />
              <p className="text-slate-700 text-xs sm:text-sm font-medium">Phone</p>
            </div>
            <a href={`tel:${phone}`} className="text-blue-600 hover:underline ml-6 text-sm sm:text-base break-all">
              {phone}
            </a>
          </div>
        )}

        {email && (
          <div>
            <div className="flex items-center gap-2 mb-1">
              <Mail size={16} className="text-slate-700 shrink-0 sm:size-5" />
              <p className="text-slate-700 text-xs sm:text-sm font-medium">Email</p>
            </div>
            <a href={`mailto:${email}`} className="text-blue-600 hover:underline ml-6 text-sm sm:text-base break-all">
              {email}
            </a>
          </div>
        )}

        {description && (
          <div>
            <p className="text-slate-700 text-xs sm:text-sm font-medium mb-1">Description</p>
            <p className="text-slate-900 text-sm sm:text-base">{description}</p>
          </div>
        )}

        <div className="bg-slate-50 border border-slate-200 rounded-lg p-3 sm:p-4 text-xs sm:text-sm text-slate-900">
          <p>For inquiries or complaints, please contact us during business hours (Mon-Fri, 9AM-5PM WIB)</p>
        </div>
      </div>

      <div className="text-center text-slate-700 text-xs sm:text-sm space-y-2">
        <p>Product information verified on {new Date().toLocaleDateString('id-ID')}</p>
        <button className="text-blue-600 hover:underline font-medium">Report inaccurate information</button>
      </div>
    </div>
  )
}
