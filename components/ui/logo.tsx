import Image from "next/image"
import { cn } from "@/lib/utils"

interface LogoProps {
  className?: string
  iconClassName?: string
}

export function Logo({ className, iconClassName }: LogoProps) {
  return (
    <div className={cn("flex items-center", className)}>
      <div className={cn("relative h-8 w-32 shrink-0", iconClassName)}>
        <Image src="/icons/logo.png" alt="Produkita" fill className="object-contain object-left" />
      </div>
    </div>
  )
}
