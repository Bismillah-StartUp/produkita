import { Star } from "lucide-react"

interface TestimonialCardProps {
  name: string
  company: string
  description: string
  image?: string
  rating?: number
}

export function TestimonialCard({
  name,
  company,
  description,
  image,
  rating = 5,
}: TestimonialCardProps) {
  return (
    <div className="rounded-lg border border-gray-200 bg-white p-8 shadow-lg transition-shadow hover:shadow-xl">
      <div className="mb-4 flex gap-1">
        {Array.from({ length: rating }).map((_, i) => (
          <Star
            key={i}
            className="h-4 w-4 fill-yellow-400 text-yellow-400"
          />
        ))}
      </div>

      <p className="mb-6 text-gray-700">{description}</p>

      <div className="flex items-center gap-4">
        {image && (
          <img
            src={image}
            alt={name}
            className="h-12 w-12 rounded-full object-cover"
          />
        )}
        <div>
          <p className="font-semibold text-gray-900">{name}</p>
          <p className="text-sm text-gray-600">{company}</p>
        </div>
      </div>
    </div>
  )
}
