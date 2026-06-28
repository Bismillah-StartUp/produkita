import {
  Sparkles,
  ArrowRight,
  Package,
  QrCode,
  TrendingUp,
  FileText,
  CheckCircle,
} from "lucide-react";

export const HowItWorks = () => {
  const steps = [
    {
      step: "01",
      title: "Daftar & Buat Akun",
      description:
        "Buat akun dan masuk ke dashboard untuk mulai menggunakan fitur Produkita.",
      icon: Package,
    },
    {
      step: "02",
      title: "Pilih Layanan",
      description:
        "Pilih layanan sesuai kebutuhan, seperti QR Code, manajemen keuangan, atau kalkulator HPP.",
      icon: QrCode,
    },
    {
      step: "03",
      title: "Masukkan Data",
      description:
        "Isi data produk, keuangan, atau biaya produksi sesuai fitur yang digunakan.",
      icon: TrendingUp,
    },
    {
      step: "04",
      title: "Lihat Hasil & Kelola Bisnis",
      description: "Lihat hasil laporan untuk membantu bisnis lebih terarah.",
      icon: FileText,
    },
  ];

  return (
    <section
      id="cara-kerja"
      className="bg-white py-20 md:py-28 relative overflow-hidden"
    >
      <div className="mx-auto max-w-350 px-6 lg:px-10">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          <div className="space-y-8 lg:pr-10">
            <div>
              <div className="inline-flex items-center gap-1.5 rounded-full bg-blue-50/80 px-3 py-1 text-[11px] font-bold tracking-widest text-blue-600 uppercase border border-blue-100/50 mb-6">
                <Sparkles className="h-3 w-3 fill-blue-600" />
                Cara Kerja
              </div>

              <h2 className="text-4xl lg:text-5xl font-bold tracking-tight text-slate-900 mb-6 leading-[1.2]">
                Mulai dalam <br className="hidden lg:block" />
                <span className="text-blue-600">4 Langkah Mudah</span>
              </h2>

              <p className="text-lg text-slate-500 max-w-md leading-relaxed">
                Tidak perlu keahlian teknis. Bisnis Anda siap go digital dalam
                hitungan menit.
              </p>
            </div>

            <a
              href="#"
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-blue-600 hover:bg-blue-700 px-6 py-3.5 text-sm font-semibold text-white shadow-lg shadow-blue-600/20 transition-all hover:shadow-blue-600/40 w-fit"
            >
              Lihat Selengkapnya <ArrowRight className="h-4 w-4" />
            </a>

            <div className="mt-16 relative w-full max-w-sm hidden md:block">
              <div className="absolute inset-0 bg-blue-400/10 blur-[80px] rounded-full" />

              <div className="relative bg-white rounded-2xl border border-slate-200/60 shadow-xl shadow-slate-200/50 p-5 transform -rotate-2 hover:rotate-0 transition-transform duration-500 z-10">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-3">
                    <div className="bg-green-100/80 p-2 rounded-xl">
                      <CheckCircle className="h-5 w-5 text-green-600" />
                    </div>
                    <div>
                      <p className="text-sm font-bold text-slate-900">
                        QR Code Dibuat
                      </p>
                      <p className="text-[11px] text-slate-500 font-medium">
                        Susu Segar Premium
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-1.5 px-2 py-1 bg-blue-50 rounded-lg text-[10px] font-bold text-blue-600">
                    <TrendingUp className="h-3 w-3" /> 28%
                  </div>
                </div>

                <div className="h-28 w-full flex items-end justify-between gap-2 px-2">
                  <div className="w-full bg-blue-100 rounded-t-sm h-[30%]"></div>
                  <div className="w-full bg-blue-200 rounded-t-sm h-[45%]"></div>
                  <div className="w-full bg-blue-600 rounded-t-sm h-[80%] shadow-sm shadow-blue-600/30"></div>
                  <div className="w-full bg-blue-400 rounded-t-sm h-[60%]"></div>
                  <div className="w-full bg-blue-300 rounded-t-sm h-[50%]"></div>
                </div>
              </div>

              <div className="absolute -bottom-8 -left-8 bg-white/90 backdrop-blur-sm rounded-xl border border-slate-200/60 shadow-lg p-4 flex items-center gap-4 transform rotate-3 z-20">
                <div className="h-10 w-10 rounded-full bg-yellow-100 flex items-center justify-center">
                  <div className="h-5 w-5 bg-yellow-500 rounded-sm rotate-45" />
                </div>
                <div>
                  <p className="text-sm font-bold text-slate-900">+Rp 2.4Jt</p>
                  <p className="text-[10px] text-slate-500">
                    Pemasukan hari ini
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="relative lg:pl-10">
            <div className="absolute left-8.5 top-10 bottom-10 w-0.5 bg-blue-100/70 hidden sm:block"></div>

            <div className="space-y-6 relative">
              {steps.map((step, index) => (
                <div
                  key={index}
                  className="flex flex-col sm:flex-row gap-6 sm:gap-8 relative group"
                >
                  <div className="relative z-10 flex h-14 w-14 sm:h-16 sm:w-16 shrink-0 items-center justify-center rounded-full bg-blue-600 text-white shadow-lg shadow-blue-600/30 text-lg font-bold border-[6px] border-white transition-transform duration-300 group-hover:scale-110 group-hover:bg-blue-700">
                    {index + 1}
                  </div>

                  <div className="flex-1 rounded-2xl border border-slate-200/60 bg-white p-6 sm:p-8 shadow-sm transition-all duration-300 hover:shadow-xl hover:shadow-slate-200/50 hover:border-blue-200">
                    <div className="flex items-center justify-between mb-5">
                      <p className="text-[11px] font-bold tracking-widest text-blue-600 uppercase">
                        Langkah {step.step}
                      </p>
                      <div className="h-10 w-10 rounded-xl bg-slate-50 flex items-center justify-center text-blue-600 transition-colors duration-300 group-hover:bg-blue-600 group-hover:text-white">
                        <step.icon className="h-5 w-5" />
                      </div>
                    </div>

                    <h3 className="text-xl font-bold text-slate-900 mb-3 group-hover:text-blue-600 transition-colors">
                      {step.title}
                    </h3>

                    <p className="text-sm text-slate-500 leading-relaxed mb-6">
                      {step.description}
                    </p>

                    <div className="h-1 w-8 bg-yellow-400 rounded-full transition-all duration-300 group-hover:w-12 group-hover:bg-blue-600" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
