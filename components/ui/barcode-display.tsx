'use client'

interface BarcodeDisplayProps {
  value: string
}

export function BarcodeDisplay({ value }: BarcodeDisplayProps) {
  // Use a public barcode API service to generate barcode image
  const barcodeApiUrl = `https://api.barcodebakery.com/barcode?type=code128&text=${encodeURIComponent(value)}&height=60`

  return (
    <div className="flex flex-col items-center gap-4">
      <div className="bg-white p-4 rounded-lg border border-gray-200">
        <img 
          src={barcodeApiUrl} 
          alt={`Barcode: ${value}`}
          style={{ maxWidth: '100%', height: 'auto' }}
          onError={(e) => {
            // Fallback if API fails
            (e.target as HTMLImageElement).style.display = 'none'
          }}
        />
      </div>
      <p className="text-sm font-mono text-gray-600 text-center break-all">{value}</p>
    </div>
  )
}
