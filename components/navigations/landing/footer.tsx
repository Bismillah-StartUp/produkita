import Link from "next/link";
import { Logo } from "@/components/ui/logo";

const SocialIcon = ({ children }: { children: React.ReactNode }) => (
  <a
    href="#"
    className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-50 text-blue-600 transition-colors hover:bg-blue-600 hover:text-white"
  >
    {children}
  </a>
);

export function Footer() {
  return (
    <footer className="bg-slate-50 pt-20 pb-10">
      <div className="mx-auto w-[90%] max-w-400px-6 lg:px-8">
        <div className="mb-16 grid gap-12 md:grid-cols-2 lg:grid-cols-12">
          <div className="lg:col-span-5 space-y-6">
            <div className="flex items-center gap-2">
              <Logo/>
            </div>
            <p className="text-sm leading-relaxed text-slate-500 max-w-xs">
              Satu platform untuk mengelola produk, sertifikasi, dan keuangan
              bisnis UMKM Anda.
            </p>
            <div className="flex gap-3">
              <SocialIcon>
                <svg
                  className="h-4 w-4"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                </svg>
              </SocialIcon>
              <SocialIcon>
                <svg
                  className="h-4 w-4"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5" />
                </svg>
              </SocialIcon>
              <SocialIcon>
                <svg
                  className="h-4 w-4"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                </svg>
              </SocialIcon>
              <SocialIcon>
                <svg
                  className="h-4 w-4"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
                  <rect x="2" y="9" width="4" height="12"></rect>
                  <circle cx="4" cy="4" r="2"></circle>
                </svg>
              </SocialIcon>
            </div>
          </div>

          <div className="lg:col-span-7 grid grid-cols-2 gap-8 md:grid-cols-3">
            <div>
              <h4 className="mb-6 font-bold text-slate-900 text-sm">
                Platform
              </h4>
              <ul className="space-y-4 text-sm text-slate-500">
                <li>
                  <Link
                    href="#fitur"
                    className="hover:text-blue-600 transition-colors"
                  >
                    Fitur
                  </Link>
                </li>
                <li>
                  <Link
                    href="#cara-kerja"
                    className="hover:text-blue-600 transition-colors"
                  >
                    Cara Kerja
                  </Link>
                </li>
                <li>
                  <Link
                    href="#harga"
                    className="hover:text-blue-600 transition-colors"
                  >
                    Harga
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="mb-6 font-bold text-slate-900 text-sm">
                Perusahaan
              </h4>
              <ul className="space-y-4 text-sm text-slate-500">
                <li>
                  <Link
                    href="#"
                    className="hover:text-blue-600 transition-colors"
                  >
                    Tentang Kami
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="mb-6 font-bold text-slate-900 text-sm">Legal</h4>
              <ul className="space-y-4 text-sm text-slate-500">
                <li>
                  <Link
                    href="#"
                    className="hover:text-blue-600 transition-colors"
                  >
                    Kebijakan Privasi
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="hover:text-blue-600 transition-colors"
                  >
                    Syarat & Ketentuan
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-blue-200/50 pt-8 flex items-center justify-between">
          <p className="text-[13px] text-slate-500">
            © 2026 Produkita oleh Trunodjoyo Madura. Dibuat untuk UMKM
            Indonesia.
          </p>
        </div>
      </div>
    </footer>
  );
}
