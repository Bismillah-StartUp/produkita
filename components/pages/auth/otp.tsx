'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Info } from 'lucide-react'
import { toast } from 'sonner'
import { Logo } from '@/components/ui/logo'
import { useAuth } from '@/hooks/useAuth'
import { formatTime } from '@/lib/utils'

interface OTPFormProps {
  email: string
  token: string
}

export default function OTPForm({ email, token }: OTPFormProps) {
  const router = useRouter()
  const { verifyOtp, loading, error } = useAuth()

  const [otp, setOtp] = useState(['', '', '', '', '', ''])
  const [timeLeft, setTimeLeft] = useState(180)
  const [resendLoading, setResendLoading] = useState(false)

  useEffect(() => {
    if (timeLeft > 0) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000)
      return () => clearTimeout(timer)
    }
  }, [timeLeft])

  useEffect(() => {
    if (error) toast.error('Verifikasi gagal', { description: error })
  }, [error])

  const handleOtpChange = (index: number, value: string) => {
    if (!/^\d*$/.test(value)) return

    const newOtp = [...otp]
    newOtp[index] = value.slice(-1)
    setOtp(newOtp)

    if (value && index < 5) {
      const nextInput = document.getElementById(`otp-${index + 1}`)
      nextInput?.focus()
    }

    if (newOtp.join('').length === 6) {
      handleSubmitOtp(newOtp.join(''))
    }
  }

  const handleKeyDown = (index: number, e: React.KeyboardEvent) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      const prevInput = document.getElementById(`otp-${index - 1}`)
      prevInput?.focus()
    }
  }

  const handleSubmitOtp = async (fullOtp: string) => {
    const result = await verifyOtp(email, fullOtp)
    if (result) {
      toast.success('Verifikasi berhasil', { description: 'Akun Anda telah aktif. Silakan masuk.' })
      router.push('/login')
    }
  }

  const handleResend = async () => {
    setResendLoading(true)
    try {
      const { resendOtp } = await import('@/servers/auth/auth.actions')
      const result = await resendOtp(email)
      if (!result.ok) {
        toast.error('Gagal mengirim ulang kode', { description: result.error })
        return
      }
      toast.success('Kode terkirim', { description: 'Kode OTP baru telah dikirim ke email Anda.' })
      setTimeLeft(180)
      setOtp(['', '', '', '', '', ''])
    } finally {
      setResendLoading(false)
    }
  }

  return (
    <div className="flex items-center justify-center min-h-screen px-6 sm:px-12 lg:px-16 py-12 bg-white">
      <div className="max-w-md w-full">
        <Logo className="mb-8" />

        {/* Title */}
        <h1 className="text-3xl font-bold text-slate-900 mb-2">Masukkan Kode OTP</h1>
        <p className="text-slate-600 mb-2">Kami telah mengirimkan kode OTP 6 digit ke email</p>
        <p className="text-slate-900 font-semibold mb-8">{email}</p>

        <div className="space-y-6">
          {/* OTP Input */}
          <div className="flex gap-3 justify-center">
            {otp.map((digit, index) => (
              <input
                key={index}
                id={`otp-${index}`}
                type="text"
                maxLength={1}
                value={digit}
                onChange={(e) => handleOtpChange(index, e.target.value)}
                onKeyDown={(e) => handleKeyDown(index, e)}
                className="w-14 h-14 text-center text-xl font-bold border-2 border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                inputMode="numeric"
              />
            ))}
          </div>

          {/* Timer */}
          <div className="text-center">
            <p className="text-sm text-slate-600">
              Kode akan kadaluarsa dalam{' '}
              <span className="font-bold text-blue-600">{formatTime(timeLeft)}</span>
            </p>
          </div>

          {/* Info */}
          <div className="flex gap-2 p-3 bg-blue-50 border border-blue-200 rounded-lg">
            <Info size={18} className="text-blue-600 shrink-0 mt-0.5" />
            <p className="text-sm text-blue-600">
              Jangan bagikan kode OTP kepada siapa pun, termasuk pihak dari Produkita
            </p>
          </div>

          {/* Loading */}
          {loading && (
            <div className="text-center">
              <p className="text-sm text-blue-600 font-medium">Memverifikasi kode OTP...</p>
            </div>
          )}
        </div>

        {/* Resend */}
        <div className="mt-8 text-center">
          <p className="text-sm text-slate-600">
            Tidak menerima kode?{' '}
            {timeLeft === 0 ? (
              <button
                onClick={handleResend}
                disabled={resendLoading}
                className="text-blue-600 hover:text-blue-700 font-medium disabled:opacity-50"
              >
                {resendLoading ? 'Mengirim...' : 'Kirim ulang kode'}
              </button>
            ) : (
              <span className="text-slate-500">
                Tunggu {formatTime(timeLeft)} untuk mengirim ulang
              </span>
            )}
          </p>
        </div>
      </div>
    </div>
  )
}