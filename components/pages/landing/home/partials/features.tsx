import {
  Shield,
  TrendingUp,
  Zap,
  Lock,
  Award,
  CheckCircle,
  FlaskConical,
  Apple,
  Sparkles,
  ArrowRight,
} from "lucide-react";

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
    icon: FlaskConical,
    title: "Proximate Test",
    description:
      "Analisis komposisi dasar produk seperti kadar air, protein, lemak, abu, dan karbohidrat untuk memastikan kualitas dan kesesuaian standar industri.",
  },
  {
    icon: Apple,
    title: "Nutrition Test",
    description:
      "Pengujian nilai gizi lengkap termasuk energi, vitamin, dan mineral untuk mendukung pelabelan nutrisi yang akurat dan sesuai regulasi.",
  },
];

export const Features = () => {
  return (
    <section id="features" className="bg-slate-50/30 py-20 md:py-28">
      <div className="mx-auto w-[90%] max-w-400 px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div className="space-y-4">
            <div className="inline-flex items-center gap-1.5 rounded-full bg-blue-50/80 px-3 py-1 text-[11px] font-bold tracking-widest text-blue-600 uppercase border border-blue-100/50">
              <Sparkles className="h-3 w-3 fill-blue-600" />
              Fitur Platform
            </div>

            <h2 className="text-3xl font-bold tracking-tight text-slate-900 md:text-5xl">
              Fitur <span className="text-blue-600">Unggulan</span>
            </h2>

            <p className="max-w-xl text-base text-slate-500">
              Semua yang Anda butuhkan dalam satu platform
            </p>
          </div>

          <a
            href="#"
            className="inline-flex items-center gap-2 text-sm font-semibold text-blue-600 hover:text-blue-700 transition-colors"
          >
            Lihat semua layanan <ArrowRight className="h-4 w-4" />
          </a>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {FEATURES.map((feature, i) => (
            <div
              key={i}
              className="group flex flex-col rounded-3xl border border-slate-200/70 bg-white p-8 transition-all duration-300 hover:-translate-y-2 hover:bg-blue-600 hover:border-blue-600 hover:shadow-2xl hover:shadow-blue-600/20"
            >
              <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-50 transition-colors duration-300 group-hover:bg-white/20">
                <feature.icon className="h-6 w-6 text-blue-600 transition-colors duration-300 group-hover:text-white" />
              </div>

              <h3 className="mb-3 text-lg font-bold text-slate-900 transition-colors duration-300 group-hover:text-white">
                {feature.title}
              </h3>

              <p className="mb-8 text-sm leading-relaxed text-slate-500 transition-colors duration-300 group-hover:text-blue-50 line-clamp-4">
                {feature.description}
              </p>

              <div className="mt-auto">
                <div className="inline-flex items-center justify-center gap-2 rounded-full py-2 px-0 transition-all duration-300 group-hover:bg-white group-hover:px-5 group-hover:shadow-md text-sm font-semibold text-blue-600">
                  Pelajari lebih lanjut
                  <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
