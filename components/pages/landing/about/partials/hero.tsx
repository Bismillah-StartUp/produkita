import { Sparkles, Eye, Target } from "lucide-react";

export const Hero = () => {
  return (
    <section className="relative overflow-hidden bg-white py-24 md:py-32">
      <div className="absolute top-0 left-0 w-1/2 h-full bg-blue-50/80 blur-[120px] pointer-events-none -translate-x-1/4" />
      <div className="absolute top-0 right-0 w-1/2 h-full bg-amber-50/80 blur-[120px] pointer-events-none translate-x-1/4" />

      <div className="mx-auto w-[90%] max-w-[1600px] px-6 lg:px-8 relative z-10">
        
        <div className="text-center mx-auto mb-20">
          <div className="inline-flex items-center gap-1.5 rounded-full bg-blue-50/80 px-3 py-1 text-[11px] font-bold tracking-widest text-blue-600 uppercase border border-blue-100/50 mb-6">
            <Sparkles className="h-3 w-3 fill-blue-600" />
            TENTANG KAMI
          </div>
          
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-slate-900 mb-6 leading-tight">
            Kami Hadir untuk <span className="text-blue-600">UMKM Indonesia</span>
          </h1>
          
          <p className="text-lg text-slate-500 max-w-3xl mx-auto leading-relaxed">
            Produkita lahir dari keinginan membantu pelaku UMKM mengelola produk dan bisnis mereka secara digital dengan mudah.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 mx-auto items-stretch">
          
          <div className="bg-white rounded-3xl p-10 border border-slate-200 shadow-sm hover:shadow-xl hover:shadow-blue-900/5 hover:border-blue-200 transition-all duration-300 flex flex-col gap-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-blue-50 flex items-center justify-center shrink-0">
                <Eye className="h-6 w-6 text-blue-600" />
              </div>
              <h3 className="text-2xl font-bold text-blue-600">Visi</h3>
            </div>
            <p className="text-slate-600 leading-relaxed text-[15px]">
              Menjadi platform digital yang dipercaya oleh UMKM Indonesia untuk mengelola dan mengembangkan produk mereka secara mandiri.
            </p>
          </div>

          <div className="bg-white rounded-3xl p-10 border border-slate-200 shadow-sm hover:shadow-xl hover:shadow-orange-900/5 hover:border-orange-200 transition-all duration-300 flex flex-col gap-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-orange-50 flex items-center justify-center shrink-0">
                <Target className="h-6 w-6 text-orange-500" />
              </div>
              <h3 className="text-2xl font-bold text-orange-500">Misi</h3>
            </div>
            <p className="text-slate-600 leading-relaxed text-[15px]">
              Memudahkan pelaku UMKM mengelola produk, sertifikasi, dan keuangan bisnis secara digital tanpa perlu latar belakang teknologi, dengan harga yang terjangkau.
            </p>
          </div>

        </div>
      </div>
    </section>
  );
};
