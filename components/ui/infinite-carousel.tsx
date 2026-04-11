"use client"

import * as React from "react"
import { cn } from "@/lib/utils"

interface InfiniteCarouselProps {
  children: React.ReactNode[]
  className?: string
  speed?: number
}

export function InfiniteCarousel({
  children,
  className,
  speed = 30,
}: InfiniteCarouselProps) {
  const duplicatedItems = [...children, ...children, ...children]
  const itemPercentage = 100 / duplicatedItems.length

  return (
    <div className={cn("relative w-full overflow-hidden", className)}>
      <style>{`
        @keyframes scroll {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-${itemPercentage * children.length}%);
          }
        }
        .animate-scroll {
          animation: scroll ${speed}s linear infinite;
        }
      `}</style>

      <div className="animate-scroll flex gap-20 py-8">
        {duplicatedItems.map((item, index) => (
          <div
            key={index}
            className="flex shrink-0 items-center justify-center"
            style={{ width: `${itemPercentage}%` }}
          >
            {item}
          </div>
        ))}
      </div>

      {/* Gradient overlay untuk fade effect */}
      <div className="pointer-events-none absolute top-0 bottom-0 left-0 w-16 bg-linear-to-r from-white to-transparent" />
      <div className="pointer-events-none absolute top-0 right-0 bottom-0 w-16 bg-linear-to-l from-white to-transparent" />
    </div>
  )
}
