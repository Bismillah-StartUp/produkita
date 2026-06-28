import Link from "next/link";
import { ArrowRight } from "lucide-react";

export const CTA = () => {
  return (
    <section className="py-20 md:py-32 bg-white relative">
      <div className="w-full">
        <div className="relative rounded-[2.5rem] bg-blue-600 shadow-2xl shadow-blue-600/30">
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden rounded-[2.5rem] select-none">
            <h2 className="text-[15rem] md:text-[20rem] font-black text-white/5 tracking-tighter whitespace-nowrap">
              PRODI
            </h2>
          </div>

          <div className="mx-auto w-[90%] max-w-400 grid lg:grid-cols-2 gap-12 lg:gap-8 relative z-10 py-16 md:py-20 lg:py-24 items-center">
            <div className="space-y-8 max-w-xl">
              <p className="text-blue-100 font-medium tracking-wide">
                Platform digital UMKM — mudah, aman, dan terjangkau
              </p>

              <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-[1.15]">
                Siap Digitalisasi <br />
                Bisnis UMKM <br />
                Anda?
              </h2>

              <Link
                href="/dashboard"
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-white px-8 py-4 text-base font-bold text-blue-600 shadow-xl shadow-blue-900/20 transition-all hover:bg-blue-50 hover:scale-105"
              >
                Mulai Sekarang <ArrowRight className="h-5 w-5" />
              </Link>
            </div>

            <div className="relative h-100 lg:h-112.5 hidden md:block">
              <div className="absolute top-1/2 lg:-top-12 right-1/4 lg:-right-4 -translate-y-1/2 lg:translate-y-0 -rotate-12 w-60 h-120 bg-slate-50 rounded-[2.5rem] border-[6px] border-slate-800 shadow-2xl flex flex-col overflow-hidden">
                <div className="w-1/3 h-5 bg-slate-800 rounded-b-xl mx-auto absolute top-0 left-1/2 -translate-x-1/2 z-20"></div>
                <div className="flex-1 p-4 pt-8 bg-slate-50 flex flex-col gap-3">
                  <div className="h-20 bg-blue-100 rounded-xl" />
                  <div className="h-12 bg-white border border-slate-200 rounded-xl" />
                  <div className="h-12 bg-white border border-slate-200 rounded-xl" />
                  <div className="h-12 bg-white border border-slate-200 rounded-xl" />
                </div>
              </div>

              <div className="absolute top-1/2 lg:top-8 right-0 lg:-right-24 -translate-y-1/2 lg:translate-y-0 w-65 h-130 bg-white rounded-[2.5rem] border-8 border-slate-900 shadow-2xl shadow-slate-900/50 flex flex-col overflow-hidden z-10">
                <div className="w-[35%] h-6 bg-slate-900 rounded-full mx-auto absolute top-2 left-1/2 -translate-x-1/2 z-20"></div>
                <div className="flex-1 p-5 pt-12 bg-slate-50 flex flex-col gap-4 overflow-hidden relative">
                  <div>
                    <h3 className="font-bold text-slate-900 text-lg">
                      PT Susu Ceria
                    </h3>
                    <p className="text-[10px] text-blue-600 font-bold uppercase mt-1">
                      Sertifikat & Izin
                    </p>
                  </div>

                  <div className="grid grid-cols-2 gap-3 mb-2">
                    <div className="bg-white rounded-lg p-3 text-center shadow-sm border border-slate-100">
                      <p className="font-bold text-lg text-slate-900">4</p>
                      <p className="text-[9px] text-slate-500">
                        Total Sertifikat
                      </p>
                    </div>
                    <div className="bg-white rounded-lg p-3 text-center shadow-sm border border-slate-100">
                      <p className="font-bold text-lg text-green-600">4</p>
                      <p className="text-[9px] text-green-600/80">Aktif</p>
                    </div>
                  </div>

                  {/* List Items */}
                  <div className="bg-white border border-blue-100 rounded-xl p-3 shadow-sm flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-blue-100 shrink-0" />
                    <div className="space-y-1 w-full">
                      <div className="h-2 w-full bg-slate-200 rounded" />
                      <div className="h-2 w-2/3 bg-slate-100 rounded" />
                    </div>
                  </div>
                  <div className="bg-white border border-slate-200 rounded-xl p-3 shadow-sm flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-purple-100 shrink-0" />
                    <div className="space-y-1 w-full">
                      <div className="h-2 w-full bg-slate-200 rounded" />
                      <div className="h-2 w-2/3 bg-slate-100 rounded" />
                    </div>
                  </div>
                  <div className="bg-white border border-slate-200 rounded-xl p-3 shadow-sm flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-green-100 shrink-0" />
                    <div className="space-y-1 w-full">
                      <div className="h-2 w-full bg-slate-200 rounded" />
                      <div className="h-2 w-2/3 bg-slate-100 rounded" />
                    </div>
                  </div>
                </div>

                <div className="h-16 bg-white border-t border-slate-100 flex items-center justify-around px-2 z-20">
                  <div className="w-8 h-8 rounded-full bg-slate-100" />
                  <div className="w-8 h-8 rounded-full bg-slate-100" />
                  <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center">
                    <div className="w-4 h-4 bg-blue-600 rounded-full" />
                  </div>
                  <div className="w-8 h-8 rounded-full bg-slate-100" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
