'use client'

import { useState, useEffect } from 'react'
import { AlertCircle, Info } from 'lucide-react'

interface OTPFormProps {
  email?: string
  onSubmit?: (otp: string) => void
}

export default function OTPForm({ email = 'namaanda@gmail.com', onSubmit }: OTPFormProps) {
  const [otp, setOtp] = useState(['', '', '', '', '', ''])
  const [timeLeft, setTimeLeft] = useState(115) // 1:55
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    if (timeLeft > 0) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000)
      return () => clearTimeout(timer)
    }
  }, [timeLeft])

  const handleOtpChange = (index: number, value: string) => {
    if (!/^\d*$/.test(value)) return

    const newOtp = [...otp]
    newOtp[index] = value.slice(-1)
    setOtp(newOtp)

    // Auto-focus next field
    if (value && index < 5) {
      const nextInput = document.getElementById(`otp-${index + 1}`)
      nextInput?.focus()
    }

    // Auto-submit when all 6 digits are filled
    if (newOtp.join('').length === 6) {
      handleSubmitOtp(newOtp.join(''))
    }
  }

  const handleSubmitOtp = async (fullOtp: string) => {
    setError('')
    setIsLoading(true)
    
    // TODO: Implement OTP verification logic
    if (onSubmit) {
      onSubmit(fullOtp)
    }
    
    setTimeout(() => {
      setIsLoading(false)
    }, 1000)
  }

  const handleKeyDown = (index: number, e: React.KeyboardEvent) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      const prevInput = document.getElementById(`otp-${index - 1}`)
      prevInput?.focus()
    }
  }

  const handleResend = async () => {
    // TODO: Implement resend OTP logic
    setTimeLeft(115)
    setOtp(['', '', '', '', '', ''])
  }

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, '0')}`
  }

  return (
    <div className="flex items-center justify-center min-h-screen px-6 sm:px-12 lg:px-16 py-12 bg-white">
      <div className="max-w-md w-full">
        {/* Logo */}
        <div className="mb-8 flex items-center gap-2">
          <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
            <span className="text-white font-bold">P</span>
          </div>
          <span className="font-bold text-xl text-slate-900">Produkita.</span>
        </div>

        {/* Title */}
        <h1 className="text-3xl font-bold text-slate-900 mb-2">Masukkan Kode OTP</h1>
        <p className="text-slate-600 mb-2">Kami telah mengirimkan kode OTP 6 digit ke email</p>
        <p className="text-slate-900 font-semibold mb-8">{email}</p>

        {/* OTP Form */}
        <div className="space-y-6">
          {/* OTP Input Fields */}
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
              Kode akan kadaluarsa dalam <span className="font-bold text-blue-600">{formatTime(timeLeft)}</span>
            </p>
          </div>

          {/* Error Message */}
          {error && (
            <div className="flex gap-2 p-3 bg-red-50 border border-red-200 rounded-lg">
              <AlertCircle size={18} className="text-red-600 shrink-0 mt-0.5" />
              <p className="text-sm text-red-600">{error}</p>
            </div>
          )}

          {/* Info Message */}
          <div className="flex gap-2 p-3 bg-blue-50 border border-blue-200 rounded-lg">
            <Info size={18} className="text-blue-600 shrink-0 mt-0.5" />
            <p className="text-sm text-blue-600">
              Jangan bagikan kode OTP kepada siapa pun, termasuk pihak dari Produkita
            </p>
          </div>

          {/* Loading State */}
          {isLoading && (
            <div className="text-center">
              <p className="text-sm text-blue-600 font-medium">Memverifikasi kode OTP...</p>
            </div>
          )}
        </div>

        {/* Resend Code Section */}
        <div className="mt-8 text-center space-y-3">
          <p className="text-sm text-slate-600">
            Tidak menerima kode?{' '}
            {timeLeft === 0 ? (
              <button
                onClick={handleResend}
                className="text-blue-600 hover:text-blue-700 font-medium"
              >
                Kirim ulang kode
              </button>
            ) : (
              <span className="text-slate-500">Tunggu {formatTime(timeLeft)} untuk mengirim ulang</span>
            )}
          </p>
        </div>
      </div>
    </div>
  )
}
