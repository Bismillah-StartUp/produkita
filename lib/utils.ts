import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import { createHash, randomBytes } from "crypto"
import QRCode from "qrcode"

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
      },
    )
  })

  return `data:image/png;base64,${pngBuffer.toString("base64")}`
}

export const formatTime = (seconds: number) => {
  const mins = Math.floor(seconds / 60)
  const secs = seconds % 60
  return `${mins}:${secs.toString().padStart(2, '0')}`
}

export const SATUAN = {
  bbb: ["Kg", "Gram", "Liter", "ml", "Pcs", "Lembar", "Meter", "Sak", "Ikat"],
  btkl: ["Orang/Hari", "Orang/Jam", "Orang/Bulan", "Borongan", "Pcs"],
  packaging: ["Pcs", "Box", "Pack", "Roll", "Lusin", "Dus", "Lembar"],
  bop_var: ["kWh", "m3", "Tabung", "Liter", "Jam", "Hari", "Bulan", "Pcs"],
  bop_fix: ["Bulan", "Tahun", "Hari", "Paket"],
  Produksi: ["Kg", "Gram", "Liter", "ml", "Pcs", "Box", "Pack", "Lusin", "Karton", "Botol", "Porsi", "Cup"],
}
