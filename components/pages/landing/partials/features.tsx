import { Shield, TrendingUp, Zap, Lock, Award, CheckCircle } from "lucide-react"

const FEATURES = [
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
    description: "Tim support berpengalaman siap membantu Anda kapan saja.",
  },
  {
    icon: CheckCircle,
    title: "Support Dedicated",
    description: "Tim support berpengalaman siap membantu Anda kapan saja.",
  },
  {
    icon: CheckCircle,
    title: "Support Dedicated",
    description: "Tim support berpengalaman siap membantu Anda kapan saja.",
  },
]

export const Features = () => {
  return (
    <section id="features" className="bg-white py-20 md:py-32">
      <div className="mx-auto max-w-6xl px-6">
        <div className="mb-16 space-y-4 text-center">
          <h2 className="text-3xl font-bold text-gray-900 md:text-4xl">
            Fitur Unggulan
          </h2>
          <p className="mx-auto max-w-2xl text-lg text-gray-600">
            Semua yang Anda butuhkan untuk mengelola sertifikasi produk dengan
            efisien
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-3">
          {FEATURES.map((feature, i) => (
            <div
              key={i}
              className="rounded-lg border border-gray-200 p-8 transition-all hover:border-blue-300 hover:shadow-lg"
            >
              <feature.icon className="mb-4 h-8 w-8 text-blue-600" />
              <h3 className="mb-2 font-semibold text-gray-900">
                {feature.title}
              </h3>
              <p className="text-sm text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
