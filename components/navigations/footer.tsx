import { Shield } from "lucide-react"

export function Footer() {
  return (
    <footer className="border-t border-gray-200 bg-gray-50 py-12">
      <div className="mx-auto max-w-6xl px-6">
        <div className="mb-8 grid gap-8 md:grid-cols-4">
          <div>
            <div className="mb-4 flex items-center gap-2">
              <Shield className="h-5 w-5 text-blue-600" />
              <span className="font-bold text-gray-900">EntreCertivy</span>
            </div>
            <p className="text-sm text-gray-600">
              Platform sertifikasi produk UMKM terpercaya
            </p>
          </div>
          <div>
            <h4 className="mb-4 font-semibold text-gray-900">Produk</h4>
            <ul className="space-y-2 text-sm text-gray-600">
              <li>
                <a href="#" className="hover:text-gray-900">
                  Fitur
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-gray-900">
                  Harga
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-gray-900">
                  FAQ
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="mb-4 font-semibold text-gray-900">Perusahaan</h4>
            <ul className="space-y-2 text-sm text-gray-600">
              <li>
                <a href="#" className="hover:text-gray-900">
                  Tentang
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-gray-900">
                  Blog
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-gray-900">
                  Kontak
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="mb-4 font-semibold text-gray-900">Legal</h4>
            <ul className="space-y-2 text-sm text-gray-600">
              <li>
                <a href="#" className="hover:text-gray-900">
                  Privacy
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-gray-900">
                  Terms
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-gray-900">
                  Security
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-200 pt-8">
          <p className="text-center text-sm text-gray-600">
            © 2026 EntreCertivy. Semua hak dilindungi.
          </p>
        </div>
      </div>
    </footer>
  )
}
