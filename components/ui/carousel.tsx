"use client"

import * as React from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"

interface CarouselProps {
  children: React.ReactNode[]
  className?: string
}

export function Carousel({ children, className }: CarouselProps) {
  const [current, setCurrent] = React.useState(0)
  const [direction, setDirection] = React.useState<"left" | "right">("right")

  const handlePrev = () => {
    setDirection("left")
    setCurrent((prev) => (prev === 0 ? children.length - 1 : prev - 1))
  }

  const handleNext = () => {
    setDirection("right")
    setCurrent((prev) => (prev === children.length - 1 ? 0 : prev + 1))
  }

  return (
    <div className={cn("relative w-full", className)}>
      <div className="overflow-hidden">
        <div 
          className="relative flex"
          style={{
            width: `${children.length * 100}%`,
            transform: `translateX(-${current * (100 / children.length)}%)`,
            transition: "transform 500ms cubic-bezier(0.4, 0, 0.2, 1)",
          }}
        >
          {children.map((child, index) => (
            <div
              key={index}
              className="shrink-0"
              style={{
                width: `${100 / children.length}%`,
              }}
            >
              {child}
            </div>
          ))}
        </div>
      </div>

      {/* Navigation Buttons */}
      <Button
        variant="outline"
        size="icon"
        className="absolute left-4 top-1/2 -translate-y-1/2 rounded-full bg-white/80 backdrop-blur-sm hover:bg-white"
        onClick={handlePrev}
      >
        <ChevronLeft className="h-4 w-4" />
      </Button>

      <Button
        variant="outline"
        size="icon"
        className="absolute right-4 top-1/2 -translate-y-1/2 rounded-full bg-white/80 backdrop-blur-sm hover:bg-white"
        onClick={handleNext}
      >
        <ChevronRight className="h-4 w-4" />
      </Button>

      {/* Dots Indicator */}
      <div className="mt-6 flex justify-center gap-2">
        {children.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrent(index)}
            className={cn(
              "h-2 rounded-full transition-all duration-300",
              index === current ? "w-8 bg-blue-600" : "w-2 bg-gray-300"
            )}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  )
}
