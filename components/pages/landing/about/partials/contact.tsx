import { Sparkles, Mail, MessageCircle, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";

export const Contact = () => {
  return (
    <section className="bg-white py-20 md:py-28">
      <div className="mx-auto w-[90%] max-w-400 px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 mx-auto items-start">
          <div>
            <div className="inline-flex items-center gap-1.5 rounded-full bg-blue-50/80 px-3 py-1 text-[11px] font-bold tracking-widest text-blue-600 uppercase border border-blue-100/50 mb-6">
              <Sparkles className="h-3 w-3 fill-blue-600" />
              HUBUNGI KAMI
            </div>

            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-slate-900 mb-6 leading-tight">
              Ada Pertanyaan? <br />
              Kami Siap Membantu
            </h2>

            <p className="text-slate-500 text-lg leading-relaxed mb-12">
              Tim kami siap menjawab pertanyaan Anda seputar platform, fitur,
              atau cara memulai digitalisasi bisnis UMKM Anda.
            </p>

            <div className="space-y-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-blue-50 flex items-center justify-center shrink-0">
                  <Mail className="h-5 w-5 text-blue-600" />
                </div>
                <div>
                  <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-0.5">
                    Email
                  </p>
                  <p className="font-semibold text-slate-900">
                    hello@produkita.id
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-blue-50 flex items-center justify-center shrink-0">
                  <MessageCircle className="h-5 w-5 text-blue-600" />
                </div>
                <div>
                  <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-0.5">
                    WhatsApp
                  </p>
                  <p className="font-semibold text-slate-900">
                    +62 812-3456-7890
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-blue-50 flex items-center justify-center shrink-0">
                  <MapPin className="h-5 w-5 text-blue-600" />
                </div>
                <div>
                  <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-0.5">
                    Lokasi
                  </p>
                  <p className="font-semibold text-slate-900">
                    Jakarta Selatan, Indonesia
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-3xl p-8 sm:p-10 border border-slate-200 shadow-xl shadow-slate-200/50">
            <h3 className="text-xl font-bold text-slate-900 mb-8">
              Kirim Pesan
            </h3>

            <form className="space-y-6">
              <div className="grid sm:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label
                    htmlFor="name"
                    className="text-xs font-semibold text-slate-700"
                  >
                    Nama
                  </label>
                  <input
                    type="text"
                    id="name"
                    placeholder="Nama Anda"
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-600/20 focus:border-blue-600 transition-all placeholder:text-slate-400"
                  />
                </div>
                <div className="space-y-2">
                  <label
                    htmlFor="company"
                    className="text-xs font-semibold text-slate-700"
                  >
                    Nama Bisnis
                  </label>
                  <input
                    type="text"
                    id="company"
                    placeholder="Nama Bisnis"
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-600/20 focus:border-blue-600 transition-all placeholder:text-slate-400"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label
                  htmlFor="email"
                  className="text-xs font-semibold text-slate-700"
                >
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  placeholder="email@bisnis.com"
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-600/20 focus:border-blue-600 transition-all placeholder:text-slate-400"
                />
              </div>

              <div className="space-y-2">
                <label
                  htmlFor="message"
                  className="text-xs font-semibold text-slate-700"
                >
                  Pesan
                </label>
                <textarea
                  id="message"
                  rows={4}
                  placeholder="Tulis pertanyaan atau pesan Anda..."
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-600/20 focus:border-blue-600 transition-all placeholder:text-slate-400 resize-none"
                ></textarea>
              </div>

              <Button
                type="button"
                className="w-full bg-blue-600 hover:bg-blue-700 text-white rounded-xl py-6 font-bold shadow-md shadow-blue-600/20"
              >
                Kirim Pesan
              </Button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};
