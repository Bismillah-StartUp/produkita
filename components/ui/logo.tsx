import { QrCode } from "lucide-react"
import { cn } from "@/lib/utils"

interface LogoProps {
  showWordmark?: boolean
  className?: string
  iconClassName?: string
  wordmarkClassName?: string
}

export function Logo({
  showWordmark = true,
  className,
  iconClassName,
  wordmarkClassName,
}: LogoProps) {
  return (
    <div className={cn("flex items-center gap-1.5", className)}>
      <div
        className={cn(
          "flex items-center justify-center bg-blue-600 text-white rounded-md p-1.5 shadow-sm",
          iconClassName
        )}
      >
        <QrCode className="h-5 w-5" />
      </div>
      {showWordmark && (
        <span
          className={cn(
            "text-xl font-bold tracking-tight text-blue-600",
            wordmarkClassName
          )}
        >
          Produkita<span className="text-yellow-400">.</span>
        </span>
      )}
    </div>
  )
}
