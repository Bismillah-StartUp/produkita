import "server-only"

import { sendMail } from "@/lib/mailer"

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

const escapeHtml = (value: string) =>
  value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;")

const buildBarcodeEmailHtml = ({
  productName,
  companyName,
  licenseCode,
  licensePageUrl,
}: Pick<EmailProps, "productName" | "companyName" | "licenseCode" | "licensePageUrl">) => {
  const safeProductName = escapeHtml(productName)
  const safeCompanyName = escapeHtml(companyName)
  const safeLicenseCode = escapeHtml(licenseCode)
  const safeLicensePageUrl = escapeHtml(licensePageUrl)

  return `
    <div style="background-color:#f3f4f6;padding:24px 0">
      <div style="max-width:640px;margin:0 auto;background-color:#ffffff;border-radius:16px;overflow:hidden;border:1px solid #e5e7eb;font-family:Arial,sans-serif">
        <div style="padding:32px;background-color:#0f172a;color:#ffffff">
          <p style="margin:0;font-size:12px;letter-spacing:0.12em;text-transform:uppercase;opacity:0.8">
            Barcode & QR Code
          </p>
          <h1 style="margin:8px 0 0;font-size:28px;line-height:1.2">
            ${safeProductName}
          </h1>
          <p style="margin:12px 0 0;font-size:14px;line-height:1.6;opacity:0.9">
            Barcode dan QR code lisensi untuk ${safeCompanyName} sudah tersedia.
          </p>
        </div>

        <div style="padding:32px">
          <p style="margin:0 0 20px;font-size:14px;line-height:1.6;color:#334155">
            Gunakan kode lisensi berikut untuk membuka halaman verifikasi produk.
          </p>

          <div style="margin-bottom:24px;padding:16px;border-radius:12px;background-color:#f8fafc;border:1px solid #e2e8f0">
            <div style="font-size:12px;font-weight:700;letter-spacing:0.08em;text-transform:uppercase;color:#64748b">
              License Code
            </div>
            <div style="margin-top:8px;font-size:24px;font-weight:700;letter-spacing:0.12em;color:#0f172a">
              ${safeLicenseCode}
            </div>
            <div style="margin-top:8px;font-size:13px;color:#475569">
              Buka halaman lisensi di <a href="${safeLicensePageUrl}" style="color:#2563eb;text-decoration:none">${safeLicensePageUrl}</a>
            </div>
          </div>

          <div style="margin-top:24px">
            <a href="${safeLicensePageUrl}" style="display:inline-block;background-color:#2563eb;color:#ffffff;text-decoration:none;padding:12px 20px;border-radius:10px;font-size:14px;font-weight:700">
              Buka Halaman Lisensi
            </a>
          </div>
        </div>
      </div>
    </div>
  `.trim()
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
  const emailContent = buildBarcodeEmailHtml({
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

  return await sendMail({
    to: email,
    subject: `Barcode dan QR Code untuk ${productName}`,
    html: emailContent,
    text: `Barcode dan QR Code untuk ${productName} sudah tersedia. Buka halaman lisensi di ${licensePageUrl}.`,
    attachments,
  })
}