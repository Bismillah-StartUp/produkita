import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import { createHash, randomBytes } from "crypto"

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000"

type PropsData = {
  productName: string
  productType: string
}

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const generateLicencesCode = (productName: string, productType: string) => {
  const timestamp = Date.now().toString()
  const random = randomBytes(4).toString("hex")
  const data = `${productName}${productType}${timestamp}${random}`
  const hash = createHash("sha256").update(data).digest("hex")

  const codeResult = hash.substring(0, 10).toUpperCase()
  
  return codeResult
}

const generateBarcode = (licencesCode: string) => {
  return `${BASE_URL}/licences/${licencesCode}`
}

export const generateBarcodeUrl = ({productName, productType}: PropsData) => {
  const licencesCode = generateLicencesCode(productName, productType)
  return `${BASE_URL}/api/barcode?code=${licencesCode}`
}

export const generateQRCode = (licencesCode: string) => {
  return `${BASE_URL}/licences/${licencesCode}`
}


