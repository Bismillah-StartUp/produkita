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
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-slate-900">Company Information</h2>
      <p className="text-slate-600">Manufacturer details</p>

      <div className="bg-slate-50 border border-slate-200 rounded-lg p-6">
        <div className="flex items-center gap-3 mb-4">
          <Building2 size={32} className="text-slate-900" />
          <h3 className="text-2xl font-bold text-slate-900">{name}</h3>
        </div>
      </div>

      <div className="space-y-4">
        {address && (
          <div>
            <div className="flex items-center gap-2 mb-1">
              <MapPin size={18} className="text-slate-700" />
              <p className="text-slate-700 text-sm font-medium">Address</p>
            </div>
            <p className="text-slate-900 ml-6">{address}</p>
          </div>
        )}

        {phone && (
          <div>
            <div className="flex items-center gap-2 mb-1">
              <Phone size={18} className="text-slate-700" />
              <p className="text-slate-700 text-sm font-medium">Phone</p>
            </div>
            <a href={`tel:${phone}`} className="text-blue-600 hover:underline ml-6">
              {phone}
            </a>
          </div>
        )}

        {email && (
          <div>
            <div className="flex items-center gap-2 mb-1">
              <Mail size={18} className="text-slate-700" />
              <p className="text-slate-700 text-sm font-medium">Email</p>
            </div>
            <a href={`mailto:${email}`} className="text-blue-600 hover:underline ml-6">
              {email}
            </a>
          </div>
        )}

        {description && (
          <div>
            <p className="text-slate-700 text-sm font-medium mb-1">Description</p>
            <p className="text-slate-900">{description}</p>
          </div>
        )}

        <div className="bg-slate-50 border border-slate-200 rounded-lg p-4 text-sm text-slate-900">
          <p>For inquiries or complaints, please contact us during business hours (Mon-Fri, 9AM-5PM WIB)</p>
        </div>
      </div>

      <div className="text-center text-slate-700 text-sm">
        <p>Product information verified on {new Date().toLocaleDateString('id-ID')}</p>
        <button className="text-blue-600 hover:underline font-medium mt-2">Report inaccurate information</button>
      </div>
    </div>
  )
}
