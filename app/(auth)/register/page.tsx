import RegisterForm from '@/components/pages/auth/register'
import AuthSideImage from '@/components/pages/auth/partials/side-image'

export default function RegisterPage() {
  return (
    <div className="min-h-screen flex">
      <AuthSideImage />
      
      <div className="flex-1 bg-white">
        <RegisterForm />
      </div>
    </div>
  )
}
