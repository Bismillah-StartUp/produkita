import { NextResponse } from "next/server"
import { generateBarcode, generateLicensesCode, generateQRCode } from "@/lib/utils"
import { sendBarcodeEmail } from "@/lib/send-barcode-email"


const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL!

export async function POST(req: Request) {
  const { productName, productType, email, companyName } = await req.json()

  const licenseCode = generateLicensesCode(productName, productType)
  const productUrl = `${BASE_URL}/licenses/${licenseCode}`

  const qrCode = await generateQRCode(productUrl)
  const barcode = await generateBarcode(productUrl)

  if (email) {
    await sendBarcodeEmail({
      email,
      productName,
      companyName,
      licenseCode,
      licensePageUrl: productUrl,
      barcodeDataUrl: barcode,
      qrCodeDataUrl: qrCode,
    })
  }

  return NextResponse.json({
    success: true,
    licenseCode,
    message: "barcode generated and email sent successfully",
  })
}