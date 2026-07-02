import { Sparkles, CheckCircle2 } from "lucide-react";

export const Pricing = () => {
  return (
    <section id="harga" className="bg-slate-50/50 py-20 md:py-32 relative">
      <div className="mx-auto w-[90%] max-w-400 px-6 lg:px-10 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16 md:mb-20">
          <div className="inline-flex items-center gap-1.5 rounded-full bg-blue-50/80 px-3 py-1 text-[11px] font-bold tracking-widest text-blue-600 uppercase border border-blue-100/50 mb-6">
            <Sparkles className="h-3 w-3 fill-blue-600" />
            Harga
          </div>
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-slate-900 mb-6">
            Pilihan Paket <span className="text-blue-600">Terjangkau</span>
          </h2>
          <p className="text-lg text-slate-500">
            Pilih paket sesuai kebutuhan bisnis Anda, tanpa biaya tersembunyi
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8 w-full mx-auto items-stretch">
          <div className="bg-white rounded-3xl p-8 lg:p-10 border border-slate-200 shadow-sm hover:shadow-xl hover:shadow-slate-200/50 hover:border-blue-200 transition-all duration-300 flex flex-col">
            <h3 className="text-xl font-bold text-slate-900 mb-2">Basic</h3>
            <div className="flex items-baseline gap-1 mb-4">
              <span className="text-4xl font-bold text-slate-900">
                Rp 99.000
              </span>
              <span className="text-sm font-medium text-slate-400">
                per bulan
              </span>
            </div>
            <p className="text-sm text-slate-500 mb-8 h-12 leading-relaxed">
              Cocok untuk UMKM pemula yang baru memulai perjalanan digital.
            </p>

            <ul className="space-y-4 mb-10 flex-1">
              {[
                "10 produk terdaftar",
                "QR Code produk",
                "Dashboard standar",
                "Manajemen keuangan dasar",
                "Kalkulator HPP",
                "Support email (48 jam)",
              ].map((feature, i) => (
                <li
                  key={i}
                  className="flex items-center gap-3 text-sm text-slate-600"
                >
                  <CheckCircle2 className="h-4 w-4 text-blue-600 shrink-0" />
                  {feature}
                </li>
              ))}
            </ul>

            <button className="w-full py-3.5 rounded-xl bg-blue-600 text-white font-semibold hover:bg-blue-700 transition-all duration-300 shadow-md shadow-blue-600/20 hover:shadow-lg hover:shadow-blue-600/40 mt-auto">
              Pilih Basic
            </button>
          </div>

          <div className="bg-blue-600 rounded-[2rem] p-8 lg:p-10 shadow-2xl shadow-blue-600/30 relative border border-blue-500 z-10 flex flex-col">
            <div className="absolute -top-4 left-1/2 -translate-x-1/2">
              <div className="bg-[#FFB800] text-yellow-950 text-[10px] font-black uppercase tracking-widest px-4 py-1.5 rounded-full flex items-center gap-1.5 shadow-lg shadow-yellow-500/20 border border-yellow-400">
                <span>🔥</span> Paling Populer
              </div>
            </div>

            <h3 className="text-xl font-bold text-white mb-2 mt-2">Pro</h3>
            <div className="flex items-baseline gap-1 mb-4">
              <span className="text-4xl font-bold text-white tracking-tight">
                Rp 299.000
              </span>
              <span className="text-sm font-medium text-blue-200">
                per bulan
              </span>
            </div>
            <p className="text-sm text-blue-100 mb-8 h-12 leading-relaxed">
              Solusi lengkap untuk UMKM berkembang yang ingin scaling bisnis.
            </p>

            <ul className="space-y-4 mb-10 flex-1">
              {[
                "Produk tidak terbatas",
                "QR Code premium + analytics",
                "Manajemen keuangan lengkap",
                "Kalkulator HPP otomatis",
                "Integrasi BPOM & Halal",
                "Support prioritas 24/7",
                "Laporan PDF otomatis",
              ].map((feature, i) => (
                <li
                  key={i}
                  className="flex items-center gap-3 text-sm text-blue-50"
                >
                  <CheckCircle2 className="h-4 w-4 text-[#FFB800] shrink-0" />
                  {feature}
                </li>
              ))}
            </ul>

            <button className="w-full py-3.5 rounded-xl bg-white text-blue-600 font-bold hover:bg-slate-50 transition-all duration-300 shadow-lg hover:shadow-xl hover:-translate-y-0.5 mt-auto">
              Pilih Pro
            </button>
          </div>

          <div className="bg-white rounded-3xl p-8 lg:p-10 border border-slate-200 shadow-sm hover:shadow-xl hover:shadow-slate-200/50 hover:border-blue-200 transition-all duration-300 flex flex-col">
            <h3 className="text-xl font-bold text-slate-900 mb-2">
              Enterprise
            </h3>
            <div className="flex items-baseline gap-1 mb-4">
              <span className="text-4xl font-bold text-slate-900">
                Rp 799.000
              </span>
              <span className="text-sm font-medium text-slate-400">
                per bulan
              </span>
            </div>
            <p className="text-sm text-slate-500 mb-8 h-12 leading-relaxed">
              Solusi enterprise untuk bisnis skala besar dengan kebutuhan
              khusus.
            </p>

            <ul className="space-y-4 mb-10 flex-1">
              {[
                "Semua fitur Pro",
                "API access penuh",
                "Multi-akun & multi-cabang",
                "Proximate & Nutrition Test",
                "Dedicated account manager",
                "SLA 99.9% uptime",
                "Onboarding & training khusus",
              ].map((feature, i) => (
                <li
                  key={i}
                  className="flex items-center gap-3 text-sm text-slate-600"
                >
                  <CheckCircle2 className="h-4 w-4 text-blue-600 shrink-0" />
                  {feature}
                </li>
              ))}
            </ul>

            <button className="w-full py-3.5 rounded-xl bg-blue-600 text-white font-semibold hover:bg-blue-700 transition-all duration-300 shadow-md shadow-blue-600/20 hover:shadow-lg hover:shadow-blue-600/40 mt-auto">
              Pilih Enterprise
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
