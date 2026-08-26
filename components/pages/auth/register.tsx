'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Eye, EyeOff } from 'lucide-react'
import { toast } from 'sonner'
import { Button } from '@/components/ui/button'
import { Logo } from '@/components/ui/logo'
import { useAuth } from '@/hooks/useAuth'

export default function RegisterForm() {
  const router = useRouter()
  const { register, loading, error } = useAuth()

  const [nama, setNama] = useState('')
  const [email, setEmail] = useState('')
  const [umkm, setUmkm] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)

  useEffect(() => {
    if (error) toast.error('Gagal mendaftar', { description: error })
  }, [error])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (password !== confirmPassword) {
      toast.warning('Kata sandi tidak cocok', { description: 'Pastikan konfirmasi kata sandi sama dengan kata sandi.' })
      return
    }

    const result = await register(email, password, nama, umkm)
    if (result) {
      toast.success('Pendaftaran berhasil', { description: 'Kode OTP telah dikirim ke email Anda.' })
      const res = await fetch('/api/auth/otp-token', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      })
      const { data } = await res.json()
      // encode token agar aman di URL
      router.push(`/otp/${encodeURIComponent(data.token)}`)
    }
  }

  return (
    <div className="flex items-center justify-center min-h-screen px-6 sm:px-12 lg:px-16 py-12 bg-white">
      <div className="max-w-xl w-full">
        <Logo className="mb-8" />

        {/* Title */}
        <h1 className="text-3xl font-bold text-slate-900 mb-3">Daftarkan UMKM Anda</h1>
        <p className="text-slate-600 mb-8">Bergabunglah dengan platform untuk mengelola produk & keuangan Anda.</p>

        {/* Register Form */}
        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label htmlFor="umkm" className="block text-sm font-medium text-slate-900 mb-2">
                Nama UMKM
              </label>
              <input
                id="umkm"
                type="text"
                placeholder="Contoh: Susu Segar"
                value={umkm}
                onChange={(e) => setUmkm(e.target.value)}
                required
                className="w-full px-4 py-2.5 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent placeholder:text-slate-400"
              />
            </div>

            <div>
              <label htmlFor="nama" className="block text-sm font-medium text-slate-900 mb-2">
                Nama Pemilik
              </label>
              <input
                id="nama"
                type="text"
                placeholder="Contoh: Budi Santoso"
                value={nama}
                onChange={(e) => setNama(e.target.value)}
                required
                className="w-full px-4 py-2.5 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent placeholder:text-slate-400"
              />
            </div>
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium text-slate-900 mb-2">
              Email
            </label>
            <input
              id="email"
              type="email"
              placeholder="contoh@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-4 py-2.5 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent placeholder:text-slate-400"
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-slate-900 mb-2">
              Kata Sandi
            </label>
            <div className="relative">
              <input
                id="password"
                type={showPassword ? 'text' : 'password'}
                placeholder="Masukkan kata sandi"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full px-4 py-2.5 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent placeholder:text-slate-400"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-600 hover:text-slate-900 hover:cursor-pointer"
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          <div>
            <label htmlFor="confirmPassword" className="block text-sm font-medium text-slate-900 mb-2">
              Konfirmasi Kata Sandi
            </label>
            <div className="relative">
              <input
                id="confirmPassword"
                type={showConfirmPassword ? 'text' : 'password'}
                placeholder="Ulangi kata sandi"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
                className="w-full px-4 py-2.5 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent placeholder:text-slate-400"
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-600 hover:text-slate-900 hover:cursor-pointer"
              >
                {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          <Button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-6 rounded-lg transition-colors"
          >
            {loading ? 'Loading...' : 'Daftar Sekarang'}
          </Button>
        </form>

        <p className="text-center text-sm text-slate-600 mt-8">
          Sudah punya akun?{' '}
          <Link href="/login" className="text-blue-600 hover:text-blue-700 font-medium">
            Masuk di sini
          </Link>
        </p>
      </div>
    </div>
  )
}