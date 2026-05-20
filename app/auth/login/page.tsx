import LoginForm from '@/components/pages/auth/login'
import AuthSideImage from '@/components/pages/auth/partials/side-image'

export default function LoginPage() {
  return (
    <div className="min-h-screen flex">
      {/* Left Side - Login Form */}
      <div className="flex-1 bg-white">
        <LoginForm />
      </div>

      {/* Right Side - Hero Section */}
      <AuthSideImage />
    </div>
  )
}
