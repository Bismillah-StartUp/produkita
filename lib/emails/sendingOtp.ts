import { sendMail } from "../mailer"

export const sendOtpMail = async (email: string, otp: string) => {
  const expiredMinutes = process.env.OTP_EXPIRED_MINUTES ?? 3

  await sendMail({
    to: email,
    subject: "Kode OTP Verifikasi Akun",
    text: `Kode OTP kamu adalah: ${otp}. Berlaku selama ${expiredMinutes} menit.`,
    html: `
      <div style="font-family: sans-serif; max-width: 400px; margin: 0 auto;">
        <h2>Verifikasi Akun</h2>
        <p>Gunakan kode OTP berikut untuk verifikasi akun kamu:</p>
        <div style="font-size: 32px; font-weight: bold; letter-spacing: 8px; text-align: center; padding: 16px; background: #f4f4f4; border-radius: 8px;">
          ${otp}
        </div>
        <p style="color: #888; font-size: 12px; margin-top: 16px;">
          Kode berlaku selama ${expiredMinutes} menit. Jangan bagikan kode ini kepada siapapun.
        </p>
      </div>
    `,
  })
}

export const sendUpdateEmailOtpMail = async (email: string, otp: string) => {
  const expiredMinutes = process.env.OTP_EXPIRED_MINUTES ?? 3

  await sendMail({
    to: email,
    subject: "Kode OTP Ganti Email",
    text: `Kode OTP untuk ganti email kamu adalah: ${otp}. Berlaku selama ${expiredMinutes} menit.`,
    html: `
      <div style="font-family: sans-serif; max-width: 400px; margin: 0 auto;">
        <h2>Konfirmasi Ganti Email</h2>
        <p>Gunakan kode OTP berikut untuk konfirmasi email baru kamu:</p>
        <div style="font-size: 32px; font-weight: bold; letter-spacing: 8px; text-align: center; padding: 16px; background: #f4f4f4; border-radius: 8px;">
          ${otp}
        </div>
        <p style="color: #888; font-size: 12px; margin-top: 16px;">
          Kode berlaku selama ${expiredMinutes} menit. Jangan bagikan kode ini kepada siapapun.
        </p>
      </div>
    `,
  })
}