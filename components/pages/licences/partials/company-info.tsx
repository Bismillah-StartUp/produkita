'use client'

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
      <h2 className="text-2xl font-bold">Company Information</h2>
      <p className="text-slate-600">Manufacturer details</p>

      <div className="bg-blue-600 text-white rounded-lg p-6">
        <div className="flex items-center gap-3 mb-4">
          <span className="text-2xl">🏢</span>
          <h3 className="text-2xl font-bold">{name}</h3>
        </div>
      </div>

      <div className="space-y-4">
        {address && (
          <div>
            <p className="text-slate-600 text-sm font-medium mb-1">Address</p>
            <p className="text-slate-900">{address}</p>
          </div>
        )}

        {phone && (
          <div>
            <p className="text-slate-600 text-sm font-medium mb-1">Phone</p>
            <a href={`tel:${phone}`} className="text-blue-600 hover:underline">
              {phone}
            </a>
          </div>
        )}

        {email && (
          <div>
            <p className="text-slate-600 text-sm font-medium mb-1">Email</p>
            <a href={`mailto:${email}`} className="text-blue-600 hover:underline">
              {email}
            </a>
          </div>
        )}

        {description && (
          <div>
            <p className="text-slate-600 text-sm font-medium mb-1">Description</p>
            <p className="text-slate-700">{description}</p>
          </div>
        )}

        <div className="bg-blue-50 rounded-lg p-4 text-sm text-slate-700">
          <p>For inquiries or complaints, please contact us during business hours (Mon-Fri, 9AM-5PM WIB)</p>
        </div>
      </div>

      <div className="text-center text-slate-600 text-sm">
        <p>Product information verified on {new Date().toLocaleDateString('id-ID')}</p>
        <button className="text-blue-600 hover:underline font-medium mt-2">Report inaccurate information</button>
      </div>
    </div>
  )
}
