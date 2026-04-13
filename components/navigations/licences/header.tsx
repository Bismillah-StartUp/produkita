interface HeaderLicencesProps {
  companyName?: string
  isVerified?: boolean
}

export const Header = ({ companyName = 'Company Name', isVerified = true }: HeaderLicencesProps) => {
  return (
    <div className="border-b border-slate-200 bg-white">
      <div className="max-w-4xl mx-auto px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <span className="text-2xl">📋</span>
          <h1 className="text-2xl font-bold text-gray-900">{companyName}</h1>
        </div>
        {isVerified && (
          <div className="flex items-center gap-2 text-green-600">
            <span>✓</span>
            <span className="font-medium">Verified</span>
          </div>
        )}
      </div>
    </div>
  )
}

export default Header