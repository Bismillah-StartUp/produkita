"use client"

import { useEffect, useState } from "react"
import Barcode from "react-barcode"

type PropsData = {
  productName: string
  productType: string
}

export default function BarcodeGenerator({ productName, productType }: PropsData) {
  const [barcodeUrl, setBarcodeUrl] = useState("")
  const [code, setCode] = useState("")

  useEffect(() => {
    const generate = async () => {
      const res = await fetch("/api/licences", {
        method: "POST",
        body: JSON.stringify({ productName, productType }),
      })

      const data = await res.json()

      setBarcodeUrl(data.barcodeUrl)
      setCode(data.licencesCode)
    }

    generate()
  }, [productName, productType])

  return (
    <div>
      <p>Code: {code}</p>

      {barcodeUrl && (
        <Barcode
          value={barcodeUrl}
          format="CODE128"
        />
      )}
    </div>
  )
}