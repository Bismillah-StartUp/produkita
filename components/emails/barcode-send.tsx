'use server'

import { resend } from '@/lib/resend'

interface SendBarcodeEmailProps {
  email: string
  productName: string
  companyName: string
  licenceCode: string
  barcodeUrl: string
  qrcodeUrl: string
  bpomNumber?: string
  halalNumber?: string
}

export async function sendBarcodeEmail({
  email,
  productName,
  companyName,
  licenceCode,
  barcodeUrl,
  qrcodeUrl,
  bpomNumber,
  halalNumber,
}: SendBarcodeEmailProps) {
  try {
    const response = await resend.emails.send({
      from: 'noreply@entre-certivy.com',
      to: email,
      subject: `Sertifikat Produk: ${productName} - ${licenceCode}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background: white; border: 1px solid #e0e0e0; border-radius: 8px; overflow: hidden;">
          <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 40px 20px; text-align: center;">
            <h1 style="margin: 0; font-size: 24px;">Sertifikat Produk</h1>
            <p style="margin: 5px 0 0 0; font-size: 14px; opacity: 0.9;">Entre-Certivy</p>
          </div>

          <div style="padding: 30px;">
            <p style="font-size: 16px; color: #333; margin-top: 0;">Halo ${companyName},</p>
            <p style="font-size: 14px; color: #666; line-height: 1.6;">
              Sertifikat produk Anda telah berhasil dibuat. Berikut adalah detailnya:
            </p>

            <div style="background: #f9f9f9; padding: 20px; border-radius: 8px; margin: 20px 0;">
              <p style="margin: 0 0 10px 0; font-weight: bold; color: #333;">Informasi Produk</p>
              <p style="margin: 8px 0; color: #666; font-size: 14px;"><strong>Nama Produk:</strong> ${productName}</p>
              <p style="margin: 8px 0; color: #666; font-size: 14px;"><strong>Kode Lisensi:</strong> ${licenceCode}</p>
              ${bpomNumber ? `<p style="margin: 8px 0; color: #666; font-size: 14px;"><strong>Nomor BPOM:</strong> ${bpomNumber}</p>` : ''}
              ${halalNumber ? `<p style="margin: 8px 0; color: #666; font-size: 14px;"><strong>Sertifikat Halal:</strong> ${halalNumber}</p>` : ''}
            </div>

            <div style="background: #f9f9f9; padding: 20px; border-radius: 8px; margin: 20px 0; text-align: center;">
              <p style="margin: 0 0 15px 0; font-weight: bold; color: #333;">Kode Verifikasi</p>
              <div style="display: flex; gap: 20px; justify-content: center;">
                <div>
                  <p style="margin: 0 0 10px 0; font-size: 12px; font-weight: bold; color: #666;">BARCODE</p>
                  <img src="${barcodeUrl}" alt="Barcode" style="max-width: 200px; height: auto;">
                </div>
                <div>
                  <p style="margin: 0 0 10px 0; font-size: 12px; font-weight: bold; color: #666;">QR CODE</p>
                  <img src="${qrcodeUrl}" alt="QR Code" style="max-width: 200px; height: auto;">
                </div>
              </div>
            </div>

            <p style="font-size: 12px; color: #999; text-align: center; margin-top: 30px;">
              Jika ada pertanyaan, hubungi kami di support@entre-certivy.com
            </p>
          </div>

          <div style="background: #f0f0f0; padding: 20px; text-align: center; font-size: 12px; color: #666;">
            <p style="margin: 0;">© 2024 Entre-Certivy. Semua hak dilindungi.</p>
          </div>
        </div>
      `,
    })

    if (response.error) {
      throw new Error(response.error.message)
    }

    return {
      success: true,
      messageId: response.data?.id,
    }
  } catch (error) {
    console.error('Error sending barcode email:', error)
    throw error
  }
}
