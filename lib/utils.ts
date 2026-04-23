import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import { createHash, randomBytes } from "crypto"
import QRCode from "qrcode"

interface EmailProps {
  email: string
  productName: string
  companyName: string
  licenseCode: string
  licensePageUrl: string
  barcodeDataUrl: string
  qrCodeDataUrl: string
}

const dataUrlToBuffer = (dataUrl: string) => {
  const base64Content = dataUrl.split(",")[1]
  return Buffer.from(base64Content || "", "base64")
}

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const generateLicensesCode = (productName: string, productType: string) => {
  const timestamp = Date.now().toString()
  const random = randomBytes(4).toString("hex")
  const data = `${productName}${productType}${timestamp}${random}`
  const hash = createHash("sha256").update(data).digest("hex")

  const codeResult = hash.substring(0, 10).toUpperCase()
  
  return codeResult
}

export const generateQRCode = async (url: string) => {
  return await QRCode.toDataURL(url)
}

export const generateBarcode = async (value: string) => {
  const bwipjsModule = await import("bwip-js")
  const bwipjs = (bwipjsModule as any).default ?? bwipjsModule

  const pngBuffer = await new Promise<Buffer>((resolve, reject) => {
    bwipjs.toBuffer(
      {
        bcid: "code128",
        text: value,
        scale: 3,
        height: 10,
        includetext: true,
        textxalign: "center",
        backgroundcolor: "FFFFFF",
      },
      (error: Error | null, png: Buffer) => {
        if (error) {
          reject(error)
          return
        }

        resolve(png)
      }
    )
  })

  return `data:image/png;base64,${pngBuffer.toString("base64")}`
}