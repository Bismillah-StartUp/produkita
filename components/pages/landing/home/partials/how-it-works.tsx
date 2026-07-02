import {
  Sparkles,
  ArrowRight,
  Package,
  QrCode,
  TrendingUp,
  FileText,
  CheckSquare,
  Circle,
  BarChart3,
  Coins,
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
      <div className="mx-auto w-[90%] max-w-400 px-6 lg:px-8">
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

            <div className="mt-16 relative w-full max-w-md mx-auto hidden md:block">
              <div className="absolute inset-0 bg-blue-400/20 blur-[80px] rounded-full" />

              <div className="relative z-10 w-full flex justify-center">
                <div className="relative w-full z-10 bg-white rounded-3xl border border-slate-200/60 shadow-xl shadow-slate-200/50 p-6 flex flex-col gap-6">
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="text-base font-bold text-slate-900">
                        Grafik Keuangan
                      </h3>
                      <p className="text-xs text-slate-500 font-medium mt-0.5">
                        6 bulan terakhir
                      </p>
                    </div>
                    <div className="flex items-center gap-1 bg-blue-50 text-blue-600 px-2.5 py-1 rounded-lg">
                      <TrendingUp className="h-3 w-3" />
                      <span className="text-[11px] font-bold">28%</span>
                    </div>
                  </div>

                  <div className="h-32 w-full flex items-end justify-between gap-2 px-1 mt-4">
                    <div className="flex flex-col items-center justify-end gap-2 flex-1 h-full">
                      <div className="w-full bg-blue-600 rounded-t-sm h-[60%]"></div>
                      <span className="text-[9px] font-semibold text-slate-400">
                        Jan
                      </span>
                    </div>
                    <div className="flex flex-col items-center justify-end gap-2 flex-1 h-full">
                      <div className="w-full bg-blue-100 rounded-t-sm h-[45%]"></div>
                      <span className="text-[9px] font-semibold text-slate-400">
                        Feb
                      </span>
                    </div>
                    <div className="flex flex-col items-center justify-end gap-2 flex-1 h-full">
                      <div className="w-full bg-blue-600 rounded-t-sm h-[55%]"></div>
                      <span className="text-[9px] font-semibold text-slate-400">
                        Mar
                      </span>
                    </div>
                    <div className="flex flex-col items-center justify-end gap-2 flex-1 h-full">
                      <div className="w-full bg-blue-600 rounded-t-sm h-[85%] shadow-sm shadow-blue-600/20"></div>
                      <span className="text-[9px] font-semibold text-slate-400">
                        Apr
                      </span>
                    </div>
                    <div className="flex flex-col items-center justify-end gap-2 flex-1 h-full">
                      <div className="w-full bg-blue-600 rounded-t-sm h-[65%]"></div>
                      <span className="text-[9px] font-semibold text-slate-400">
                        Mei
                      </span>
                    </div>
                    <div className="flex flex-col items-center justify-end gap-2 flex-1 h-full">
                      <div className="w-full bg-blue-100 rounded-t-sm h-[50%]"></div>
                      <span className="text-[9px] font-semibold text-slate-400">
                        Jun
                      </span>
                    </div>
                  </div>

                  <div className="w-full h-px bg-slate-100"></div>

                  <div className="grid grid-cols-3 gap-2 text-center">
                    <div>
                      <p className="text-[13px] font-bold text-blue-600">
                        Rp 28.6Jt
                      </p>
                      <p className="text-[10px] text-slate-500 font-medium">
                        Pemasukan
                      </p>
                    </div>
                    <div>
                      <p className="text-[13px] font-bold text-red-500">
                        Rp 15Jt
                      </p>
                      <p className="text-[10px] text-slate-500 font-medium">
                        Pengeluaran
                      </p>
                    </div>
                    <div>
                      <p className="text-[13px] font-bold text-green-600">
                        24 aktif
                      </p>
                      <p className="text-[10px] text-slate-500 font-medium">
                        Produk
                      </p>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between items-center text-[10px] font-bold">
                      <span className="text-slate-500">Target Bulan Ini</span>
                      <span className="text-blue-600">85%</span>
                    </div>
                    <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
                      <div className="h-full bg-blue-600 rounded-full w-[85%]"></div>
                    </div>
                  </div>
                </div>

                <div className="absolute -left-12 md:-left-16 -top-8 z-20 animate-float bg-white/95 backdrop-blur-sm rounded-xl border border-slate-200/60 shadow-xl shadow-slate-200/50 p-3 flex items-center gap-3">
                  <div className="bg-green-100/80 p-2 rounded-lg">
                    <CheckSquare className="h-5 w-5 text-green-600" />
                  </div>
                  <div className="pr-2">
                    <p className="text-[13px] font-bold text-slate-900 leading-tight">
                      QR Code Dibuat
                    </p>
                    <p className="text-[10px] text-slate-500 font-medium mt-0.5">
                      Susu Segar Premium
                    </p>
                  </div>
                </div>

                <div
                  className="absolute -right-4 md:-right-15 -top-4 z-20 animate-float bg-white/95 backdrop-blur-sm rounded-full border border-slate-200/60 shadow-lg px-4 py-1.5 flex items-center gap-2"
                  style={{ animationDelay: "1s" }}
                >
                  <Circle className="h-2 w-2 text-green-500 fill-green-500 animate-pulse" />
                  <span className="text-[11px] font-bold text-green-600">
                    Live
                  </span>
                </div>

                <div
                  className="absolute -right-12 md:-right-38 top-1/3 z-20 animate-float bg-white/95 backdrop-blur-sm rounded-xl border border-slate-200/60 shadow-xl shadow-slate-200/50 p-3 flex items-center gap-3"
                  style={{ animationDelay: "2s" }}
                >
                  <div className="bg-blue-50 p-2 rounded-lg">
                    <BarChart3 className="h-5 w-5 text-blue-600" />
                  </div>
                  <div className="pr-4">
                    <p className="text-[13px] font-bold text-blue-600 leading-tight">
                      12.540 Scan
                    </p>
                    <p className="text-[10px] text-slate-500 font-medium mt-0.5">
                      Bulan ini
                    </p>
                  </div>
                </div>

                <div
                  className="absolute -left-10 md:-left-12 -bottom-6 z-20 animate-float bg-white/95 backdrop-blur-sm rounded-xl border border-slate-200/60 shadow-xl shadow-slate-200/50 p-3 flex items-center gap-3"
                  style={{ animationDelay: "1.5s" }}
                >
                  <div className="h-10 w-10 rounded-full bg-amber-50 flex items-center justify-center">
                    <Coins className="h-5 w-5 text-amber-600" />
                  </div>
                  <div className="pr-4">
                    <p className="text-[14px] font-bold text-amber-600 leading-tight">
                      +Rp 2.4Jt
                    </p>
                    <p className="text-[10px] text-slate-500 font-medium mt-0.5">
                      Pemasukan hari ini
                    </p>
                  </div>
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
