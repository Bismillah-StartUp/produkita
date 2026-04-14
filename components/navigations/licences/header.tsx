import { CheckCircle } from 'lucide-react'

interface HeaderLicencesProps {
  companyName?: string
  isVerified?: boolean
}

export const Header = ({ companyName = 'Company Name', isVerified = true }: HeaderLicencesProps) => {
  return (
    <div className="border-b border-slate-200 bg-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-3 sm:py-4 flex items-center justify-between gap-3">
        <div className="flex items-center gap-2 sm:gap-3 min-w-0">
          <h1 className="text-lg sm:text-2xl md:text-3xl font-bold text-gray-900 truncate">{companyName}</h1>
        </div>
        {isVerified && (
          <div className="flex items-center gap-1 sm:gap-2 text-green-600 shrink-0">
            <CheckCircle size={18} className="sm:size-5" />
            <span className="font-medium text-xs sm:text-sm">Verified</span>
          </div>
        )}
      </div>
    </div>
  )
}

export default Header