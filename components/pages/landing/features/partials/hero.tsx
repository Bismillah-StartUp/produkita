import { Sparkles } from "lucide-react";

export const Hero = () => {
  return (
    <section className="bg-white pt-24 pb-16 md:pt-32 md:pb-20">
      <div className="mx-auto w-[90%] max-w-400 px-6 lg:px-8">
        <div className="text-center mx-auto mb-16">
          <div className="inline-flex items-center gap-1.5 rounded-full bg-blue-50/80 px-3 py-1 text-[11px] font-bold tracking-widest text-blue-600 uppercase border border-blue-100/50 mb-6">
            <Sparkles className="h-3 w-3 fill-blue-600" />
            FITUR PLATFORM
          </div>

          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-slate-900 mb-6 leading-tight">
            Fitur Unggulan <span className="text-blue-600">Produkita</span>
          </h1>

          <p className="text-lg text-slate-500 max-w-3xl mx-auto leading-relaxed">
            Semua yang dibutuhkan pelaku UMKM untuk sertifikasi, analitik, dan
            keamanan data — dalam satu platform terintegrasi.
          </p>
        </div>

        <div className="flex flex-wrap justify-center items-center gap-10 md:gap-20 border-t border-slate-100 pt-10">
          <div className="text-center">
            <h4 className="text-3xl font-bold text-blue-600 mb-1">8</h4>
            <p className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
              Fitur Utama
            </p>
          </div>

          <div className="text-center">
            <h4 className="text-3xl font-bold text-blue-600 mb-1">70%</h4>
            <p className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
              Lebih Cepat
            </p>
          </div>

          <div className="text-center">
            <h4 className="text-3xl font-bold text-blue-600 mb-1">24/7</h4>
            <p className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
              Support
            </p>
          </div>

          <div className="text-center">
            <h4 className="text-3xl font-bold text-blue-600 mb-1">28+</h4>
            <p className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
              Parameter Uji
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
