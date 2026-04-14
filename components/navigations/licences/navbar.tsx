'use client'

import { useState } from 'react'
import { ShieldCheck, ClipboardCheck, BadgeInfo, Building2 } from 'lucide-react'

interface NavbarLicencesProps {
  activeTab?: 'overview' | 'nutrition' | 'certifications' | 'company'
}

export const Navbar = ({ activeTab = 'company' }: NavbarLicencesProps) => {
  const [active, setActive] = useState(activeTab)

  const tabs = [
    { id: 'overview', label: 'Overview', icon: BadgeInfo },
    { id: 'nutrition', label: 'Nutrition', icon: ClipboardCheck },
    { id: 'certifications', label: 'Certifications', icon: ShieldCheck },
    { id: 'company', label: 'Company', icon: Building2 },
  ]

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-slate-200">
      <div className="px-6 py-4 flex items-center justify-between">
        {tabs.map((tab) => {
          const IconComponent = tab.icon
          return (
            <button
              key={tab.id}
              onClick={() => setActive(tab.id as 'overview' | 'nutrition' | 'certifications' | 'company')}
              className={`flex flex-col items-center gap-2 pb-2 transition-colors flex-1 ${
                active === tab.id
                  ? 'border-b-2 border-blue-600 text-blue-600'
                  : 'text-slate-700 hover:text-slate-900'
              }`}
            >
              <IconComponent size={24} strokeWidth={2} />
              <span className="text-sm font-medium">{tab.label}</span>
            </button>
          )
        })}
      </div>
    </div>
  )
}

export default Navbar