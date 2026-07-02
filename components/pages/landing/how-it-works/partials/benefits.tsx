import { Sparkles, CheckCircle2, Smartphone, ShieldCheck, Box, LineChart, FileText } from "lucide-react";

export const Benefits = () => {
  return (
    <section className="bg-white pb-24 md:pb-32">
      <div className="mx-auto w-[90%] max-w-[1600px] px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row items-center gap-16 lg:gap-24">
          
          <div className="flex-1 space-y-8">
            <div className="inline-flex items-center gap-1.5 rounded-full bg-blue-50/80 px-3 py-1 text-[11px] font-bold tracking-widest text-blue-600 uppercase border border-blue-100/50">
              <Sparkles className="h-3 w-3 fill-blue-600" />
              SEMAKIN MUDAH
            </div>
            
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-slate-900 leading-tight">
              Dibuat untuk Memudahkan UMKM
            </h2>
            
            <p className="text-lg text-slate-500 leading-relaxed max-w-xl">
              Produkita dirancang untuk membantu pelaku UMKM mengelola kebutuhan bisnis secara lebih praktis, mulai dari pembuatan QR Code, pencatatan keuangan, hingga perhitungan HPP dalam satu platform yang mudah digunakan.
            </p>
            
            <div className="space-y-4 pt-2">
              {[
                "Tidak perlu kemampuan teknis khusus",
                "QR Code dapat ditempel pada kemasan produk",
                "Informasi produk mudah diakses pelanggan",
                "Mendukung data gizi, sertifikat, dan profil usaha",
                "Pencatatan keuangan lebih rapi",
                "Perhitungan HPP lebih mudah dan jelas"
              ].map((item, i) => (
                <div key={i} className="flex items-start gap-3">
                  <div className="w-5 h-5 rounded-full bg-blue-50 flex items-center justify-center shrink-0 mt-0.5">
                    <CheckCircle2 className="h-3.5 w-3.5 text-blue-600" />
                  </div>
                  <span className="text-[15px] text-slate-700 font-medium">{item}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="flex-1 w-full flex justify-center lg:justify-end relative">
            
            <div className="absolute inset-0 bg-slate-100 rounded-[3rem] -z-10 transform rotate-3 scale-95 opacity-50" />
            <div className="absolute inset-0 bg-blue-50 rounded-[3rem] -z-10 transform -rotate-3 scale-95 opacity-50" />

            <div className="relative flex items-center justify-center w-full max-w-[400px] h-[700px]">
              
              <div className="w-[320px] h-[650px] bg-slate-900 rounded-[3rem] p-3 shadow-2xl relative z-10 border border-slate-800 shrink-0">
                <div className="w-full h-full bg-white rounded-[2.5rem] overflow-hidden relative border border-slate-200">
                  <div className="absolute top-0 inset-x-0 h-7 flex justify-center z-20">
                    <div className="w-24 h-5 bg-slate-900 rounded-b-xl" />
                  </div>
                  
                  <div className="w-full h-full bg-slate-50 p-5 pt-12 flex flex-col gap-4">
                    <div className="flex items-center justify-between">
                      <div className="w-24 h-6 bg-slate-200 rounded-full" />
                      <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center">
                        <Smartphone className="h-4 w-4 text-blue-600" />
                      </div>
                    </div>
                    <div className="w-full h-32 bg-blue-600 rounded-2xl shadow-md p-4 flex flex-col justify-end">
                      <div className="w-16 h-3 bg-blue-400/50 rounded-full mb-2" />
                      <div className="w-32 h-6 bg-white rounded-full" />
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      {[...Array(4)].map((_, i) => (
                        <div key={i} className="bg-white p-3 rounded-xl shadow-xs border border-slate-100 flex flex-col gap-2">
                          <div className="w-8 h-8 bg-slate-100 rounded-lg" />
                          <div className="w-full h-2 bg-slate-200 rounded-full" />
                          <div className="w-2/3 h-2 bg-slate-100 rounded-full" />
                        </div>
                      ))}
                    </div>
                    <div className="w-full flex-1 bg-white rounded-t-2xl shadow-[0_-4px_10px_rgba(0,0,0,0.02)] mt-auto border border-slate-100 p-4">
                      <div className="w-full h-full border-2 border-dashed border-slate-200 rounded-xl flex items-center justify-center">
                        <span className="text-xs text-slate-400 font-medium">[ UI Aplikasi ]</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="absolute top-20 -left-12 md:-left-24 bg-white px-5 py-3 rounded-2xl shadow-xl shadow-slate-200/50 border border-slate-100 flex items-center gap-3 z-20 animate-[bounce_4s_infinite]">
                <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center">
                  <Box className="h-5 w-5 text-blue-600" />
                </div>
                <div>
                  <p className="text-xs font-bold text-slate-900">Produk</p>
                  <p className="text-[10px] text-slate-500">Manajemen terpusat</p>
                </div>
              </div>

              <div className="absolute top-1/2 -translate-y-1/2 -left-16 md:-left-32 bg-white px-5 py-3 rounded-2xl shadow-xl shadow-slate-200/50 border-2 border-blue-600 flex items-center gap-3 z-20">
                <div className="w-10 h-10 rounded-xl bg-blue-600 flex items-center justify-center">
                  <LineChart className="h-5 w-5 text-white" />
                </div>
                <div>
                  <p className="text-xs font-bold text-slate-900">Nilai Gizi</p>
                  <p className="text-[10px] text-slate-500">Kalkulasi otomatis</p>
                </div>
              </div>

              <div className="absolute bottom-32 -left-8 md:-left-20 bg-white px-5 py-3 rounded-2xl shadow-xl shadow-slate-200/50 border border-slate-100 flex items-center gap-3 z-20 animate-[bounce_5s_infinite_reverse]">
                <div className="w-10 h-10 rounded-xl bg-purple-50 flex items-center justify-center">
                  <ShieldCheck className="h-5 w-5 text-purple-600" />
                </div>
                <div>
                  <p className="text-xs font-bold text-slate-900">Sertifikat</p>
                  <p className="text-[10px] text-slate-500">Aman terenkripsi</p>
                </div>
              </div>

              <div className="absolute top-32 -right-8 md:-right-20 bg-white px-5 py-3 rounded-2xl shadow-xl shadow-slate-200/50 border border-slate-100 flex items-center gap-3 z-20 animate-[bounce_4.5s_infinite]">
                <div className="w-10 h-10 rounded-xl bg-orange-50 flex items-center justify-center">
                  <FileText className="h-5 w-5 text-orange-600" />
                </div>
                <div>
                  <p className="text-xs font-bold text-slate-900">Pencatatan</p>
                  <p className="text-[10px] text-slate-500">Keuangan harian</p>
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
