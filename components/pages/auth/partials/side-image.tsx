'use client'

import Image from 'next/image'

export default function AuthSideImage() {
  return (
    <div className="hidden lg:flex flex-1 flex-col items-center justify-center px-12 relative overflow-hidden" style={{ backgroundColor: '#193EBE' }}>
      {/* Background Decorative Elements */}
      <div className="absolute top-0 right-0 w-96 h-96 rounded-full blur-3xl opacity-20 -mr-48 -mt-48" style={{ backgroundColor: '#193EBE' }}></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 rounded-full blur-3xl opacity-20 -ml-48 -mb-48" style={{ backgroundColor: '#193EBE' }}></div>

      {/* Content */}
      <div className="relative z-10 text-center w-full flex flex-col items-center justify-center">
        {/* Product Cards Image */}
        <div className="mb-8 w-full px-6 flex justify-center">
          <Image
            src="/assets/auth/auth.webp"
            alt="Produk dan Sertifikasi"
            className="w-full h-auto"
            width={700}
            height={700}
          />
        </div>

        {/* Text */}
        <div className="w-full px-2">
          <h2 className="text-xl font-bold text-white mb-4 text-left">
            Digitalisasikan produk dan operasional bisnis Anda.
          </h2>
          <p className="text-sm text-gray-400 text-left">
            Permudah akses informasi produk dan kelola bisnis lebih efisien dengan layanan terintegrasi.
          </p>
        </div>
      </div>
    </div>
  )
}
