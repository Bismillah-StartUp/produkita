import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Carousel } from "@/components/ui/carousel"
import { InfiniteCarousel } from "@/components/ui/infinite-carousel"
import { TestimonialCard } from "@/components/testimonial-card"
import {
  CheckCircle,
  Shield,
  Zap,
  TrendingUp,
  Award,
  Lock,
} from "lucide-react"

export default function Home() {
  const testimonials = [
    {
      name: "Budi Santoso",
      company: "PT Batik Nusantara",
      description:
        "Dengan Certivy, proses sertifikasi produk kami menjadi lebih mudah dan cepat. Tim support mereka sangat responsif dan membantu.",
      rating: 5,
    },
    {
      name: "Siti Nurhaliza",
      company: "Kue Cokelat Rumahan",
      description:
        "Platform ini sudah membantu kami mendapatkan sertifikat BPOM dan HALAL dengan lebih terstruktur. Sangat merekomendasikan!",
      rating: 5,
    },
    {
      name: "Rudi Harjanto",
      company: "Minyak Kelapa Organik",
      description:
        "Interface-nya user-friendly dan dokumentasi lengkap. Sekarang produk kami lebih percaya diri di pasaran.",
      rating: 5,
    },
    {
      name: "Dina Wijaya",
      company: "Kerajinan Kulit Handmade",
      description:
        "Investasi terbaik untuk bisnis kami. Dashboard analytics sangat membantu tracking status sertifikasi.",
      rating: 5,
    },
  ]

  return (
    <div className="w-full bg-linear-to-b from-slate-50 to-white">
      {/* Navigation */}
      <nav className="border-b border-gray-200 bg-white/80 backdrop-blur-sm sticky top-0 z-40">
        <div className="mx-auto max-w-6xl px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Shield className="h-6 w-6 text-blue-600" />
            <span className="text-xl font-bold text-gray-900">EntreCertivy</span>
          </div>
          <div className="hidden md:flex items-center gap-8">
            <a href="#features" className="text-gray-600 hover:text-gray-900 transition">
              Fitur
            </a>
            <a href="#clients" className="text-gray-600 hover:text-gray-900 transition">
              Klien
            </a>
            <a href="#pricing" className="text-gray-600 hover:text-gray-900 transition">
              Harga
            </a>
          </div>
          <Link href="/dashboard">
            <Button>Dashboard</Button>
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative overflow-hidden py-20 md:py-32">
        <div className="mx-auto max-w-6xl px-6">
          <div className="grid gap-12 md:grid-cols-2 md:gap-8 items-center">
            <div className="space-y-6">
              <div className="inline-flex items-center gap-2 rounded-full bg-blue-50 px-4 py-2 text-sm font-medium text-blue-600">
                <Zap className="h-4 w-4" />
                Solusi Sertifikasi Digital
              </div>

              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight text-gray-900">
                Sertifikasi Produk UMKM
                <span className="block text-blue-600">Jadi Lebih Mudah</span>
              </h1>

              <p className="text-lg text-gray-600 max-w-lg">
                Platform terpercaya untuk mengelola dan memverifikasi legalitas
                produk UMKM Anda. Dari BPOM, HALAL, hingga PIRT - semua dalam
                satu tempat.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 pt-2">
                <Link href="/dashboard">
                  <Button size="lg" className="w-full sm:w-auto">
                    Mulai Sekarang
                  </Button>
                </Link>
                <Button
                  variant="outline"
                  size="lg"
                  className="w-full sm:w-auto"
                >
                  Pelajari Lebih Lanjut
                </Button>
              </div>

              <div className="flex flex-col sm:flex-row gap-8 pt-4 text-sm text-gray-600">
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 text-green-600" />
                  <span>Aman & Terpercaya</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 text-green-600" />
                  <span>Support 24/7</span>
                </div>
              </div>
            </div>

            <div className="relative">
              <div className="absolute inset-0 bg-linear-to-r from-blue-600 to-purple-600 rounded-2xl blur-2xl opacity-20"></div>
              <div className="relative bg-white rounded-2xl p-8 shadow-xl border border-gray-100">
                <div className="space-y-4">
                  <div className="flex items-center gap-3 p-4 bg-green-50 rounded-lg">
                    <Award className="h-5 w-5 text-green-600" />
                    <span className="text-sm font-medium text-green-900">
                      BPOM Terverifikasi
                    </span>
                  </div>
                  <div className="flex items-center gap-3 p-4 bg-blue-50 rounded-lg">
                    <Shield className="h-5 w-5 text-blue-600" />
                    <span className="text-sm font-medium text-blue-900">
                      Sertifikasi HALAL
                    </span>
                  </div>
                  <div className="flex items-center gap-3 p-4 bg-purple-50 rounded-lg">
                    <Lock className="h-5 w-5 text-purple-600" />
                    <span className="text-sm font-medium text-purple-900">
                      PIRT Registered
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Partners Section */}
      <section className="py-20 md:py-32 bg-white">
        <div className="mx-auto max-w-6xl px-6">
          <div className="mb-16 text-center space-y-4">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
              Dipercaya oleh UMKM Indonesia
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Ribuan UMKM telah mempercayai EntreCertivy untuk mengelola sertifikasi produk mereka
            </p>
          </div>

          <InfiniteCarousel speed={10}>
            {[
              <div key="logo1" className="w-20 h-20 flex items-center justify-center bg-gray-100 rounded-lg">
                <div className="text-center">
                  <div className="text-xs font-bold text-blue-600">BPOM</div>
                </div>
              </div>,
              <div key="logo2" className="w-20 h-20 flex items-center justify-center bg-gray-100 rounded-lg">
                <div className="text-center">
                  <div className="text-xs font-bold text-red-600">HALAL</div>
                </div>
              </div>,
              <div key="logo3" className="w-20 h-20 flex items-center justify-center bg-gray-100 rounded-lg">
                <div className="text-center">
                  <div className="text-xs font-bold text-green-600">PIRT</div>
                </div>
              </div>,
              <div key="logo4" className="w-20 h-20 flex items-center justify-center bg-gray-100 rounded-lg">
                <div className="text-center">
                  <div className="text-xs font-bold text-purple-600">SNI</div>
                </div>
              </div>,
              <div key="logo5" className="w-20 h-20 flex items-center justify-center bg-gray-100 rounded-lg">
                <div className="text-center">
                  <div className="text-xs font-bold text-orange-600">UMKM+</div>
                </div>
              </div>,
              <div key="logo6" className="w-20 h-20 flex items-center justify-center bg-gray-100 rounded-lg">
                <div className="text-center">
                  <div className="text-xs font-bold text-indigo-600">ISO</div>
                </div>
              </div>,
            ]}
          </InfiniteCarousel>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 md:py-32 bg-white">
        <div className="mx-auto max-w-6xl px-6">
          <div className="mb-16 text-center space-y-4">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
              Fitur Unggulan
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Semua yang Anda butuhkan untuk mengelola sertifikasi produk dengan
              efisien
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: Shield,
                title: "Manajemen Sertifikasi",
                description:
                  "Kelola semua jenis sertifikasi produk Anda dalam satu dashboard terpusat.",
              },
              {
                icon: TrendingUp,
                title: "Analytics & Reporting",
                description:
                  "Laporan detail dan analytics untuk tracking progres sertifikasi real-time.",
              },
              {
                icon: Zap,
                title: "Proses Cepat",
                description:
                  "Streamlined workflow untuk mempercepat proses sertifikasi produk Anda.",
              },
              {
                icon: Lock,
                title: "Keamanan Data",
                description:
                  "Enkripsi end-to-end untuk melindungi data sensitif bisnis Anda.",
              },
              {
                icon: Award,
                title: "Integrasi Regulasi",
                description:
                  "Selalu update dengan regulasi terbaru dari BPOM, Halal, dan PIRT.",
              },
              {
                icon: CheckCircle,
                title: "Support Dedicated",
                description:
                  "Tim support berpengalaman siap membantu Anda kapan saja.",
              },
            ].map((feature, i) => (
              <div
                key={i}
                className="rounded-lg border border-gray-200 p-8 hover:border-blue-300 hover:shadow-lg transition-all"
              >
                <feature.icon className="h-8 w-8 text-blue-600 mb-4" />
                <h3 className="font-semibold text-gray-900 mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-600 text-sm">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="clients" className="py-20 md:py-32">
        <div className="mx-auto max-w-6xl px-6">
          <div className="mb-16 text-center space-y-4">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
              Dipercaya oleh UMKM Indonesia
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Ribuan UMKM telah mempercayai EntreCertivy untuk mengelola
              sertifikasi produk mereka
            </p>
          </div>

          <div className="mb-12">
            <Carousel className="max-w-4xl mx-auto">
              {testimonials.map((testimonial, i) => (
                <div key={i} className="px-4">
                  <TestimonialCard {...testimonial} />
                </div>
              ))}
            </Carousel>
          </div>

          <div className="grid md:grid-cols-4 gap-6 text-center mt-16 pt-12 border-t border-gray-200">
            <div>
              <p className="text-3xl font-bold text-blue-600">2,500+</p>
              <p className="text-gray-600 mt-2">UMKM Aktif</p>
            </div>
            <div>
              <p className="text-3xl font-bold text-blue-600">15,000+</p>
              <p className="text-gray-600 mt-2">Produk Tersertifikasi</p>
            </div>
            <div>
              <p className="text-3xl font-bold text-blue-600">98%</p>
              <p className="text-gray-600 mt-2">Kepuasan Klien</p>
            </div>
            <div>
              <p className="text-3xl font-bold text-blue-600">24/7</p>
              <p className="text-gray-600 mt-2">Support Tersedia</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 md:py-32 bg-linear-to-r from-blue-600 to-blue-800">
        <div className="mx-auto max-w-4xl px-6 text-center space-y-8">
          <h2 className="text-3xl md:text-4xl font-bold text-white">
            Siap Memulai Perjalanan Sertifikasi Anda?
          </h2>
          <p className="text-lg text-blue-100 max-w-2xl mx-auto">
            Daftar sekarang dan dapatkan konsultasi gratis dengan tim expert kami
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
            <Link href="/dashboard">
              <Button size="lg" variant="secondary" className="w-full sm:w-auto">
                Daftar Gratis
              </Button>
            </Link>
            <Button
              size="lg"
              variant="outline"
              className="w-full sm:w-auto bg-white/10 border-white text-white hover:bg-white/20"
            >
              Hubungi Sales
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-gray-200 bg-gray-50 py-12">
        <div className="mx-auto max-w-6xl px-6">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Shield className="h-5 w-5 text-blue-600" />
                <span className="font-bold text-gray-900">EntreCertivy</span>
              </div>
              <p className="text-sm text-gray-600">
                Platform sertifikasi produk UMKM terpercaya
              </p>
            </div>
            <div>
              <h4 className="font-semibold text-gray-900 mb-4">Produk</h4>
              <ul className="space-y-2 text-sm text-gray-600">
                <li><a href="#" className="hover:text-gray-900">Fitur</a></li>
                <li><a href="#" className="hover:text-gray-900">Harga</a></li>
                <li><a href="#" className="hover:text-gray-900">FAQ</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-gray-900 mb-4">Perusahaan</h4>
              <ul className="space-y-2 text-sm text-gray-600">
                <li><a href="#" className="hover:text-gray-900">Tentang</a></li>
                <li><a href="#" className="hover:text-gray-900">Blog</a></li>
                <li><a href="#" className="hover:text-gray-900">Kontak</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-gray-900 mb-4">Legal</h4>
              <ul className="space-y-2 text-sm text-gray-600">
                <li><a href="#" className="hover:text-gray-900">Privacy</a></li>
                <li><a href="#" className="hover:text-gray-900">Terms</a></li>
                <li><a href="#" className="hover:text-gray-900">Security</a></li>
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
    </div>
  )
}
