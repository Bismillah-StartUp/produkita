import "server-only";

import { sendMail } from "@/lib/mailer";

interface EmailProps {
  email: string;
  productName: string;
  companyName: string;
  licenseCode: string;
  licensePageUrl: string;
  barcodeDataUrl: string;
  qrCodeDataUrl: string;
}

const dataUrlToBuffer = (dataUrl: string) => {
  const base64Content = dataUrl.split(",")[1];
  return Buffer.from(base64Content || "", "base64");
};

const escapeHtml = (value: string) =>
  value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");

const buildBarcodeEmailHtml = ({
  productName,
  companyName,
  licenseCode,
  licensePageUrl,
}: Pick<
  EmailProps,
  "productName" | "companyName" | "licenseCode" | "licensePageUrl"
>) => {
  const safeProductName = escapeHtml(productName);
  const safeLicenseCode = escapeHtml(licenseCode);
  const safeLicensePageUrl = escapeHtml(licensePageUrl);
  const shortUrl = safeLicensePageUrl.replace(/^https?:\/\//, "");

  return `
<!DOCTYPE html>
<html lang="id">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Barcode & QR Code - ProdukIta</title>
</head>
<body style="margin: 0; padding: 0; background-color: #f9fafb; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;">
  <table border="0" cellpadding="0" cellspacing="0" width="100%" style="background-color: #f9fafb; padding: 40px 20px;">
    <tr>
      <td align="center">
        <!-- Main Card -->
        <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px; background-color: #ffffff; border-radius: 16px; overflow: hidden; box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);">

          <tr>
            <td style="background-color: #1d4ed8; padding: 32px 40px; text-align: left;">
              <table border="0" cellpadding="0" cellspacing="0">
                <tr>
                  <td valign="middle">
                    <div style="background-color: #ffffff; width: 44px; height: 44px; border-radius: 12px; text-align: center; margin-right: 16px; display: inline-block;">
                      <img src="https://img.icons8.com/ios-filled/50/1d4ed8/shopping-bag.png" alt="Logo" style="width: 24px; height: 24px; margin-top: 10px;" />
                    </div>
                  </td>
                  <td valign="middle">
                    <span style="color: #ffffff; font-size: 24px; font-weight: 700; letter-spacing: 0.5px; line-height: 44px;">
                      ProdukIta
                    </span>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <tr>
            <td style="padding: 40px 40px 24px;">
              <table border="0" cellpadding="0" cellspacing="0" width="100%">
                <tr>
                  <td align="left" valign="middle">
                    <h1 style="margin: 0; color: #111827; font-size: 24px; font-weight: 800;">
                      ${safeProductName}
                    </h1>
                  </td>
                  <td align="right" valign="middle">
                    <div style="background-color: #eff6ff; padding: 6px 12px; border-radius: 20px; display: inline-block;">
                      <span style="color: #1d4ed8; font-size: 11px; font-weight: 700; letter-spacing: 0.5px;">
                        <img src="https://img.icons8.com/ios-glyphs/30/1d4ed8/checked--v1.png" style="width: 12px; height: 12px; vertical-align: middle; margin-right: 4px; margin-top: -2px;" />
                        LISENSI AKTIF
                      </span>
                    </div>
                  </td>
                </tr>
              </table>
              <p style="margin: 16px 0 0; color: #4b5563; font-size: 15px; line-height: 24px;">
                Barcode & QR code lisensi produk kamu sudah tersedia.
              </p>
            </td>
          </tr>

          <tr>
            <td style="padding: 0 40px;">
              <div style="border-top: 1px solid #f1f5f9;"></div>
            </td>
          </tr>

          <tr>
            <td style="padding: 32px 40px 40px;">
              <p style="margin: 0 0 24px; color: #64748b; font-size: 15px; line-height: 24px;">
                Gunakan kode lisensi berikut untuk mengakses halaman verifikasi produk kamu.
              </p>

              <p style="margin: 0 0 12px; color: #94a3b8; font-size: 12px; font-weight: 700; letter-spacing: 1.5px; text-transform: uppercase;">
                LICENSE CODE
              </p>
              <table border="0" cellpadding="0" cellspacing="0" width="100%" style="background-color: #f8fafc; border: 1px solid #bfdbfe; border-radius: 12px; margin-bottom: 24px;">
                <tr>
                  <td align="left" style="padding: 24px 32px;">
                    <p style="margin: 0; color: #0f172a; font-size: 32px; font-weight: 800; letter-spacing: 4px;">
                      ${safeLicenseCode}
                    </p>
                  </td>
                </tr>
              </table>

              <p style="margin: 0 0 24px; color: #94a3b8; font-size: 16px;">
                Buka halaman lisensi di <a href="${safeLicensePageUrl}" style="color: #1d4ed8; text-decoration: none;">${shortUrl}</a>
              </p>

              <table border="0" cellpadding="0" cellspacing="0" width="100%">
                <tr>
                  <td align="center" style="background-color: #1d4ed8; border-radius: 8px;">
                    <a href="${safeLicensePageUrl}" style="display: block; padding: 16px; color: #ffffff; text-decoration: none; font-size: 15px; font-weight: 700;">
                      Buka Halaman Lisensi &rarr;
                    </a>
                  </td>
                </tr>
              </table>

              <p style="margin: 32px 0 0; color: #94a3b8; font-size: 14px; line-height: 22px;">
                Tidak merasa melakukan pembelian ini? Segera hubungi<br/>
                <a href="mailto:support@produkita.id" style="color: #1d4ed8; text-decoration: none; font-weight: 600;">support@produkita.id</a>
              </p>
            </td>
          </tr>

          <tr>
            <td style="padding: 0 40px 32px;">
              <table border="0" cellpadding="0" cellspacing="0" width="100%" style="border-top: 1px solid #f1f5f9; padding-top: 32px;">
                <tr>
                  <td align="left" style="color: #cbd5e1; font-size: 13px;">
                    Email otomatis, jangan dibalas.
                  </td>
                  <td align="right" style="color: #cbd5e1; font-size: 13px;">
                    &copy; ${new Date().getFullYear()} ProdukIta
                  </td>
                </tr>
              </table>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>
  `.trim();
};

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
  });

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
  ];

  return await sendMail({
    to: email,
    subject: `Barcode dan QR Code untuk ${productName}`,
    html: emailContent,
    text: `Barcode dan QR Code untuk ${productName} sudah tersedia. Buka halaman lisensi di ${licensePageUrl}.`,
    attachments,
  });
};
