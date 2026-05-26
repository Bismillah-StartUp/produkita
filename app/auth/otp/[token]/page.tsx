import OTPForm from '@/components/pages/auth/otp'
import AuthSideImage from '@/components/pages/auth/partials/side-image'

interface OTPPageProps {
  params: {
    token: string
  }
}

export default function OTPPage({ params }: OTPPageProps) {
  // TODO: Get email from params or database based on token
  const email = 'namaanda@gmail.com'

  return (
    <div className="min-h-screen flex">
      <AuthSideImage />
      
      <div className="flex-1 bg-white">
        <OTPForm email={email} />
      </div>
    </div>
  )
}
