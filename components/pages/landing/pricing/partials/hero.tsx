import { Sparkles } from "lucide-react";

export const Hero = () => {
  return (
    <section className="bg-white pt-24 pb-16 md:pt-32 md:pb-20 relative overflow-hidden">
      <div className="absolute top-0 left-0 w-1/2 h- 125 bg-blue-50/80 blur-[120px] pointer-events-none -translate-x-1/3" />
      <div className="absolute top-0 right-0 w-1/2 h- 125 bg-amber-50/80 blur-[120px] pointer-events-none translate-x-1/3" />

      <div className="mx-auto w-[90%] max-w-400 px-6 lg:px-8 relative z-10">
        <div className="text-center mx-auto max-w-3xl">
          <div className="inline-flex items-center gap-1.5 rounded-full bg-blue-50/80 px-3 py-1 text-[11px] font-bold tracking-widest text-blue-600 uppercase border border-blue-100/50 mb-6">
            <Sparkles className="h-3 w-3 fill-blue-600" />
            HARGA
          </div>

          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-slate-900 mb-6 leading-tight">
            Paket <span className="text-blue-600">Transparan</span> &{" "}
            <span className="text-blue-600">Terjangkau</span>
          </h1>

          <p className="text-lg text-slate-500 leading-relaxed">
            Pilih paket sesuai kebutuhan bisnis Anda. Tidak ada biaya
            tersembunyi, batalkan kapan saja.
          </p>
        </div>
      </div>
    </section>
  );
};
