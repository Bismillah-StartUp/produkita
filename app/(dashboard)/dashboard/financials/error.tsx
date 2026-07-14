"use client"

import { useEffect } from "react"
import { AlertTriangle, RotateCw } from "lucide-react"

export default function FinancialsError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error(error)
  }, [error])

  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center gap-4 px-4 text-center">
      <div className="flex h-14 w-14 items-center justify-center rounded-full bg-amber-50">
        <AlertTriangle className="h-7 w-7 text-amber-500" />
      </div>
      <div>
        <h2 className="text-lg font-semibold text-gray-900">
          Manajemen Keuangan sedang gangguan
        </h2>
        <p className="mt-1 max-w-md text-sm text-gray-500">
          Server sedang sibuk atau koneksi ke database bermasalah. Silakan coba lagi
          dalam beberapa saat.
        </p>
      </div>
      <button
        type="button"
        onClick={reset}
        className="flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
      >
        <RotateCw className="h-4 w-4" />
        Coba Lagi
      </button>
    </div>
  )
}
