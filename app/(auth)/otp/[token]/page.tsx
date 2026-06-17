import OTPForm from '@/components/pages/auth/otp'
import AuthSideImage from '@/components/pages/auth/partials/side-image'
import { verifyOtpToken } from '@/servers/auth/auth.actions'
import { redirect } from 'next/navigation'

interface OTPPageProps {
  params: Promise<{ token: string }>
}

export default async function OTPPage({ params }: OTPPageProps) {
  const { token } = await params
  let email = ''

  try {
    const payload = await verifyOtpToken(decodeURIComponent(token))
    email = payload.email
  } catch {
    redirect('/register')
  }

  return (
    <div className="min-h-screen flex">
      <AuthSideImage />
      <div className="flex-1 bg-white">
        <OTPForm email={email} token={token} />
      </div>
    </div>
  )
}