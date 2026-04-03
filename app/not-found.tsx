"use client";

import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-linear-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800 transition-colors">
      <div className="text-center">
        <div className="mb-8">
          <h1 className="text-9xl font-bold text-transparent bg-clip-text bg-linear-to-r from-blue-600 via-purple-500 to-pink-500">
            404
          </h1>
        </div>
        
        <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-4">
          Halaman Tidak Ditemukan
        </h2>
        
        <p className="text-slate-600 dark:text-gray-400 mb-8 max-w-md mx-auto">
          Maaf, halaman yang Anda cari tidak ada atau telah dipindahkan. 
          Silakan kembali ke halaman utama.
        </p>
        
        <div className="flex gap-4 justify-center">
          <Link
            href="/"
            className="px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-colors"
          >
            Kembali ke Beranda
          </Link>
        </div>
      </div>
    </div>
  );
}
