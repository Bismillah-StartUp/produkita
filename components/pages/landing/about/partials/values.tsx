import { Target, Heart, Lightbulb, Users, Sparkles } from "lucide-react";

const VALUES_DATA = [
  {
    title: "Fokus pada UMKM",
    description: "Setiap fitur kami dirancang khusus untuk memenuhi kebutuhan nyata pelaku UMKM Indonesia.",
    icon: Target,
    highlight: false,
  },
  {
    title: "Empati & Inklusi",
    description: "Kami percaya bahwa digitalisasi harus dapat diakses oleh semua kalangan, tanpa memandang latar belakang teknis.",
    icon: Heart,
    highlight: false,
  },
  {
    title: "Inovasi Berkelanjutan",
    description: "Kami terus berinovasi dan mengembangkan solusi baru sesuai perkembangan kebutuhan industri.",
    icon: Lightbulb,
    highlight: false,
  },
  {
    title: "Komunitas Kuat",
    description: "Kami membangun ekosistem UMKM yang saling mendukung dan berkembang bersama.",
    icon: Users,
    highlight: false,
  },
];

export const Values = () => {
  return (
    <section className="bg-slate-50/30 py-20 md:py-28">
      <div className="mx-auto w-[90%] max-w-[1600px] px-6 lg:px-8">
        
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-1.5 rounded-full bg-blue-50/80 px-3 py-1 text-[11px] font-bold tracking-widest text-blue-600 uppercase border border-blue-100/50 mb-6">
            <Sparkles className="h-3 w-3 fill-blue-600" />
            NILAI KAMI
          </div>
          
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-slate-900">
            Yang Kami Percaya
          </h2>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mx-auto">
          {VALUES_DATA.map((item, index) => {
            const Icon = item.icon;
            return (
              <div
                key={index}
                className={`group rounded-3xl p-8 flex flex-col gap-6 transition-all duration-300 hover:-translate-y-1 ${
                  item.highlight
                    ? "bg-blue-600 shadow-xl shadow-blue-900/20 text-white"
                    : "bg-white border border-slate-200 shadow-sm hover:bg-blue-600 hover:border-blue-600 hover:shadow-2xl hover:shadow-blue-600/20"
                }`}
              >
                <div
                  className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 transition-colors duration-300 ${
                    item.highlight ? "bg-white/10" : "bg-blue-50 group-hover:bg-white/20"
                  }`}
                >
                  <Icon
                    className={`h-6 w-6 transition-colors duration-300 ${
                      item.highlight ? "text-white" : "text-blue-600 group-hover:text-white"
                    }`}
                  />
                </div>
                <div>
                  <h3
                    className={`text-lg font-bold mb-3 transition-colors duration-300 ${
                      item.highlight ? "text-white" : "text-slate-900 group-hover:text-white"
                    }`}
                  >
                    {item.title}
                  </h3>
                  <p
                    className={`text-[14px] leading-relaxed transition-colors duration-300 ${
                      item.highlight ? "text-white/80" : "text-slate-500 group-hover:text-blue-50"
                    }`}
                  >
                    {item.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
