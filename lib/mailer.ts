import nodemailer from "nodemailer"

type MailAttachment = {
  filename: string
  content: Buffer
  contentType: string
  contentId?: string
}

type SendMailOptions = {
  to: string | string[]
  subject: string
  html: string
  text: string
  attachments?: MailAttachment[]
}

const getSmtpConfig = () => {
  const host = process.env.SMTP_HOST
  const port = process.env.SMTP_PORT
  const username = process.env.SMTP_USER
  const password = process.env.SMTP_PASSWORD
  const fromEmail = process.env.SMTP_FROM_EMAIL
  const fromName = process.env.SMTP_FROM_NAME || "Entre Certivy"

  if (!host || !port || !username || !password || !fromEmail) {
    throw new Error(
      "Missing SMTP configuration. Set SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASSWORD, and SMTP_FROM_EMAIL."
    )
  }

  return {
    host,
    port: Number(port),
    username,
    password,
    fromEmail,
    fromName,
    secure:
      Number(port) === 465 ||
      (process.env.SMTP_SECURE !== undefined
        ? process.env.SMTP_SECURE === "true"
        : false),
  }
}

export const getMailFrom = () => {
  const { fromEmail, fromName } = getSmtpConfig()

  return `${fromName} <${fromEmail}>`
}

export const sendMail = async ({
  to,
  subject,
  html,
  text,
  attachments,
}: SendMailOptions) => {
  const { host, port, username, password, fromEmail, fromName, secure } =
    getSmtpConfig()

  const transporter = nodemailer.createTransport({
    host,
    port,
    secure,
    auth: {
      user: username,
      pass: password,
    },
  })

  return await transporter.sendMail({
    from: `${fromName} <${fromEmail}>`,
    to,
    subject,
    html,
    text,
    attachments,
  })
}