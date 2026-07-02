import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export const Cta = () => {
  return (
    <section className="bg-white pb-20 md:pb-28">
      <div className="mx-auto w-[90%] max-w-[1600px] px-6 lg:px-8">
        <div className="bg-blue-600 rounded-3xl p-10 md:p-16 shadow-xl shadow-blue-900/20 relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-8">
          
          <div className="absolute -top-24 -right-24 w-64 h-64 bg-white/10 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-white/10 rounded-full blur-3xl pointer-events-none" />
          
          <div className="relative z-10 max-w-2xl text-center md:text-left">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Siap Merasakan Semua Fitur Ini?
            </h2>
            <p className="text-blue-100 text-lg leading-relaxed">
              Pilih paket yang sesuai kebutuhan bisnis Anda dan mulai digitalisasi hari ini.
            </p>
          </div>
          
          <div className="relative z-10 shrink-0">
            <Button className="bg-white text-blue-600 hover:bg-slate-50 font-bold py-6 px-8 rounded-xl shadow-lg hover:shadow-xl transition-all flex items-center gap-2">
              Mulai Sekarang
              <ArrowRight className="h-5 w-5" />
            </Button>
          </div>
          
        </div>
      </div>
    </section>
  );
};
