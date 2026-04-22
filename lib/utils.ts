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

export const sendBarcodeEmail = async ({
  email,
  productName,
  companyName,
  licenseCode,
  licensePageUrl,
  barcodeDataUrl,
  qrCodeDataUrl,
}: EmailProps) => {
  const resendApiKey = process.env.RESEND_API_KEY

  if (!resendApiKey) {
    throw new Error("Missing RESEND_API_KEY environment variable")
  }

  const { Resend } = await import("resend")
  const { default: BarcodeEmail } = await import("@/components/emails/sending-barcodes")
  const resend = new Resend(resendApiKey)

  const emailContent = BarcodeEmail({
    productName,
    companyName,
    licenseCode,
    licensePageUrl,
  })

  const attachments = [
    {
      filename: "barcode.png",
      content: dataUrlToBuffer(barcodeDataUrl),
      contentType: "image/png",
      contentId: "barcode-image",
    },
    {
      filename: "qr-code.png",
      content: dataUrlToBuffer(qrCodeDataUrl),
      contentType: "image/png",
      contentId: "qr-code-image",
    },
  ]

  const preferredFromEmail = process.env.RESEND_FROM_EMAIL || "onboarding@resend.dev"
  const fallbackFromEmail = "onboarding@resend.dev"
  const testRecipientEmail = process.env.RESEND_TEST_EMAIL || ""

  const sendWithFrom = async (fromEmail: string, toEmail: string) => {
    const { data, error } = await resend.emails.send({
      from: `Entre Certivy <${fromEmail}>`,
      to: [toEmail],
      subject: `Barcode dan QR Code untuk ${productName}`,
      react: emailContent,
      attachments,
    })

    if (error) {
      throw new Error(error.message || "Failed to send barcode email")
    }

    return data
  }

  try {
    return await sendWithFrom(preferredFromEmail, email)
  } catch (error) {
    const message = error instanceof Error ? error.message : ""
    const isVerifiedDomainError = /domain is not verified|not verified/i.test(message)
    const isTestRecipientError = /only send testing emails to your own email address/i.test(message)

    if (
      preferredFromEmail !== fallbackFromEmail &&
      isVerifiedDomainError
    ) {
      return await sendWithFrom(fallbackFromEmail, email)
    }

    if (isTestRecipientError && testRecipientEmail) {
      return await sendWithFrom(fallbackFromEmail, testRecipientEmail)
    }

    throw error
  }
}