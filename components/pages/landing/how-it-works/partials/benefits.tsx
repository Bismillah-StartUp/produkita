import { Sparkles, CheckCircle2 } from "lucide-react";
import Image from "next/image";

export const Benefits = () => {
  return (
    <section className="bg-white pb-24 md:pb-32">
      <div className="mx-auto w-[90%] max-w-400 px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row items-center gap-16 lg:gap-24">
          <div className="flex-1 space-y-5">
            <div className="inline-flex items-center gap-1.5 rounded-full bg-blue-50/80 px-3 py-1 text-[11px] font-bold tracking-widest text-blue-600 uppercase border border-blue-100/50">
              <Sparkles className="h-3 w-3 fill-blue-600" />
              MENGAPA MUDAH?
            </div>

            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-slate-900 leading-tight">
              Dibuat untuk Memudahkan UMKM
            </h2>

            <p className="text-lg text-slate-500 leading-relaxed max-w-xl">
              Produkita dirancang untuk membantu pelaku UMKM mengelola kebutuhan
              bisnis secara lebih praktis, mulai dari pembuatan QR Code,
              pencatatan keuangan, hingga perhitungan HPP dalam satu platform
              yang mudah digunakan.
            </p>

            <div className="space-y-3">
              {[
                "Tidak perlu kemampuan teknis khusus",
                "QR Code dapat ditempel pada kemasan produk",
                "Informasi produk mudah diakses pelanggan",
                "Mendukung data gizi, sertifikat, dan profil usaha",
                "Pencatatan keuangan lebih rapi",
                "Perhitungan HPP lebih mudah dan jelas",
              ].map((item, i) => (
                <div key={i} className="flex items-start gap-3">
                  <CheckCircle2 className="h-4.5 w-4.5 text-blue-600 shrink-0 mt-0.5" />
                  <span className="text-[15px] text-slate-700 font-medium">
                    {item}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="flex-1 w-full flex justify-center lg:justify-end relative">
            <div className="relative flex items-center justify-center w-full">
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[90%] h-[110%] bg-blue-600/5 rounded-full blur-3xl -z-10" />

              <Image
                src="/assets/landing/benefits-mockup.png"
                alt="Manajemen Bisnis UMKM"
                width={1600}
                height={1600}
                className="w-full lg:w-[125%] xl:w-[135%] h-auto relative z-10 drop-shadow-2xl object-contain transform lg:translate-x-8"
                priority
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
