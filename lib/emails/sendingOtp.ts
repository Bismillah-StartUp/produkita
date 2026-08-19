import { sendMail } from "../mailer";

const generateEmailTemplate = (
  title: string,
  description: string,
  otp: string,
  expiredMinutes: number | string,
) => {
  const formattedOtp = otp.split("").join("&nbsp;&nbsp;");

  return `
<!DOCTYPE html>
<html lang="id">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${title}</title>
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
            <td style="padding: 40px;">
              <h1 style="margin: 0 0 16px; color: #111827; font-size: 24px; font-weight: 700;">${title}</h1>
              <p style="margin: 0 0 32px; color: #4b5563; font-size: 16px; line-height: 26px;">
                ${description}
              </p>

              <!-- OTP Box -->
              <table border="0" cellpadding="0" cellspacing="0" width="100%" style="background-color: #f8fafc; border: 1px solid #e2e8f0; border-radius: 16px;">
                <tr>
                  <td align="center" style="padding: 40px 24px;">
                    <p style="margin: 0 0 16px; color: #94a3b8; font-size: 13px; font-weight: 600; letter-spacing: 2px; text-transform: uppercase;">
                      KODE OTP
                    </p>
                    <p style="margin: 0 0 16px; color: #1d4ed8; font-size: 48px; font-weight: 800; letter-spacing: 4px;">
                      ${formattedOtp}
                    </p>
                    <p style="margin: 0; color: #94a3b8; font-size: 15px;">
                      Berlaku selama <span style="color: #0f172a; font-weight: 600;">${expiredMinutes} menit</span>
                    </p>
                  </td>
                </tr>
              </table>

              <p style="margin: 32px 0 16px; color: #64748b; font-size: 15px; line-height: 24px;">
                Jangan bagikan kode ini kepada siapapun, termasuk tim ProdukIta.
              </p>
              <p style="margin: 0; color: #64748b; font-size: 15px; line-height: 24px;">
                Tidak merasa melakukan ini? Hubungi kami di<br/>
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
  `;
};

export const sendOtpMail = async (email: string, otp: string) => {
  const expiredMinutes = process.env.OTP_EXPIRED_MINUTES ?? 3;

  await sendMail({
    to: email,
    subject: "Kode OTP Verifikasi Akun - Produkita",
    text: `Kode OTP kamu adalah: ${otp}. Berlaku selama ${expiredMinutes} menit.`,
    html: generateEmailTemplate(
      "Verifikasi Akun",
      "Gunakan kode di bawah ini untuk verifikasi akun Produkita kamu.",
      otp,
      expiredMinutes,
    ),
  });
};

export const sendUpdateEmail = async (email: string, otp: string) => {
  const expiredMinutes = process.env.OTP_EXPIRED_MINUTES ?? 3;

  await sendMail({
    to: email,
    subject: "Kode OTP Ganti Email - Produkita",
    text: `Kode OTP untuk ganti email kamu adalah: ${otp}. Berlaku selama ${expiredMinutes} menit.`,
    html: generateEmailTemplate(
      "Konfirmasi Ganti Email",
      "Gunakan kode di bawah ini untuk konfirmasi email baru akun Produkita kamu.",
      otp,
      expiredMinutes,
    ),
  });
};
