'use client'

import { format } from 'date-fns'
import { id as idLocale } from 'date-fns/locale'

interface CertificationData {
  type: 'BPOM' | 'HALAL' | 'PIRT'
  number: string
  issueDate?: Date
  validUntil?: Date
  authority?: string
  status?: string
}

interface CertificationsSectionProps {
  certifications: CertificationData[]
}

export default function CertificationsSection({ certifications }: CertificationsSectionProps) {
  if (!certifications || certifications.length === 0) {
    return null
  }

  const getCertIcon = (type: string) => {
    switch (type) {
      case 'BPOM':
        return '🛡️'
      case 'HALAL':
        return '🌿'
      case 'PIRT':
        return '📋'
      default:
        return '📄'
    }
  }

  const getCertColor = (type: string) => {
    switch (type) {
      case 'BPOM':
        return 'border-blue-200 bg-blue-50'
      case 'HALAL':
        return 'border-green-200 bg-green-50'
      case 'PIRT':
        return 'border-purple-200 bg-purple-50'
      default:
        return 'border-slate-200 bg-slate-50'
    }
  }

  const getCertTitle = (type: string) => {
    switch (type) {
      case 'BPOM':
        return 'BPOM Distribution Permit'
      case 'HALAL':
        return 'Halal Certification'
      case 'PIRT':
        return 'PIRT Registration'
      default:
        return 'Certification'
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold">Legal Certifications</h2>
        <p className="text-slate-600">All licenses and permits</p>
      </div>

      <div className="space-y-4">
        {certifications.map((cert, index) => (
          <div
            key={index}
            className={`border rounded-lg p-6 space-y-4 ${getCertColor(cert.type)}`}
          >
            <div className="flex items-center gap-3">
              <span className="text-3xl">{getCertIcon(cert.type)}</span>
              <h3 className="text-lg font-bold">{getCertTitle(cert.type)}</h3>
            </div>

            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-slate-600">
                  {cert.type === 'BPOM' ? 'BPOM Number' : cert.type === 'HALAL' ? 'Halal Number' : 'PIRT Number'}
                </span>
                <span className="font-medium">{cert.number}</span>
              </div>

              {cert.authority && (
                <div className="flex justify-between">
                  <span className="text-slate-600">
                    {cert.type === 'HALAL' ? 'Certified by' : 'Authority'}
                  </span>
                  <span className="font-medium">{cert.authority}</span>
                </div>
              )}

              {cert.issueDate && (
                <div className="flex justify-between">
                  <span className="text-slate-600">
                    {cert.type === 'HALAL' ? 'Issue Date' : 'Registration Date'}
                  </span>
                  <span className="font-medium">
                    {format(new Date(cert.issueDate), 'MMMM dd, yyyy', { locale: idLocale })}
                  </span>
                </div>
              )}

              {cert.validUntil && (
                <div className="flex justify-between">
                  <span className="text-slate-600">Valid Until</span>
                  <span className="font-medium">
                    {format(new Date(cert.validUntil), 'MMMM dd, yyyy', { locale: idLocale })}
                  </span>
                </div>
              )}
            </div>

            {cert.authority && (
              <div className="text-sm text-slate-600 pt-2 border-t">
                Verified by {cert.authority}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}
