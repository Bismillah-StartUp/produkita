import { NextResponse } from "next/server"
import { generateLicencesCode } from "@/lib/utils"

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000"

export async function POST(req: Request) {
  const { productName, productType } = await req.json()

  const licencesCode = generateLicencesCode(productName, productType)

  const barcodeUrl = `${BASE_URL}/licences/${licencesCode}`

  return NextResponse.json({
    licencesCode,
    barcodeUrl,
  })
}