import { CheckCircle } from "lucide-react";
import Image from "next/image";

interface HeaderLicencesProps {
  companyName?: string;
  logoUrl?: string | null;
  isVerified?: boolean;
}

export const Header = ({
  companyName = "Company Name",
  logoUrl,
  isVerified = true,
}: HeaderLicencesProps) => {
  return (
    <div className="border-b border-slate-200 bg-white">
      <div className="mx-auto px-4 lg:px-[6%] py-4 sm:py-5 flex items-center justify-between gap-3">
        <div className="flex items-center gap-2 sm:gap-3 min-w-0">
          <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-slate-100 shrink-0 flex items-center justify-center overflow-hidden">
            {logoUrl ? (
              <Image src={logoUrl} alt={companyName} width={40} height={40} className="object-contain" />
            ) : (
              <span className="text-xs font-bold text-slate-500">Logo</span>
            )}
          </div>
          <h1 className="text-base sm:text-lg md:text-xl font-bold text-gray-900 truncate">
            {companyName}
          </h1>
        </div>
        {isVerified && (
          <div className="flex items-center gap-1.5 px-3 sm:px-4 py-1.5 bg-green-50 border border-green-200 rounded-full text-green-600 shrink-0">
            <CheckCircle size={16} className="sm:size-4" />
            <span className="font-semibold text-xs sm:text-sm">Verified</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default Header;
