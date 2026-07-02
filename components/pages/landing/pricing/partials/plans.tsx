import { CheckCircle2, X } from "lucide-react";
import { Button } from "@/components/ui/button";

const PLANS = [
  {
    id: "basic",
    name: "Basic",
    price: "Rp 99.000",
    description: "Cocok untuk UMKM pemula yang baru memulai perjalanan digital.",
    features: [
      { name: "10 produk terdaftar", included: true },
      { name: "QR Code produk", included: true },
      { name: "Dashboard standar", included: true },
      { name: "Support email (48 jam)", included: true },
      { name: "Manajemen keuangan", included: false },
      { name: "Kalkulator HPP", included: false },
      { name: "Analytics lanjutan", included: false },
      { name: "Integrasi BPOM & Halal", included: false },
      { name: "API access", included: false },
    ],
    buttonText: "Pilih Paket Basic",
    highlight: false,
  },
  {
    id: "pro",
    name: "Pro",
    price: "Rp 299.000",
    description: "Solusi lengkap untuk UMKM berkembang yang ingin scaling bisnis.",
    features: [
      { name: "Produk tidak terbatas", included: true },
      { name: "QR Code premium + analytics", included: true },
      { name: "Dashboard komprehensif", included: true },
      { name: "Support prioritas 24/7", included: true },
      { name: "Manajemen keuangan lengkap", included: true },
      { name: "Kalkulator HPP otomatis", included: true },
      { name: "Analytics real-time", included: true },
      { name: "Integrasi BPOM & Halal", included: true },
      { name: "API access", included: false },
    ],
    buttonText: "Pilih Paket Pro",
    highlight: true,
  },
  {
    id: "enterprise",
    name: "Enterprise",
    price: "Custom",
    description: "Solusi enterprise untuk bisnis skala besar dengan kebutuhan khusus.",
    features: [
      { name: "Semua fitur Pro", included: true },
      { name: "Produk tidak terbatas", included: true },
      { name: "Multi-akun & multi-cabang", included: true },
      { name: "Dedicated account manager", included: true },
      { name: "Manajemen keuangan lengkap", included: true },
      { name: "Kalkulator HPP otomatis", included: true },
      { name: "Proximate & Nutrition Test", included: true },
      { name: "Integrasi BPOM & Halal", included: true },
      { name: "API access penuh", included: true },
    ],
    buttonText: "Hubungi Sales",
    highlight: false,
  },
];

export const Plans = () => {
  return (
    <section className="bg-white pb-24 md:pb-32">
      <div className="mx-auto w-[90%] max-w-[1600px] px-6 lg:px-8">
        
        <div className="grid lg:grid-cols-3 gap-8 items-center">
          {PLANS.map((plan) => (
            <div 
              key={plan.id}
              className={`relative rounded-3xl p-8 lg:p-10 flex flex-col h-full transition-all duration-300 ${
                plan.highlight
                  ? "bg-blue-600 shadow-2xl shadow-blue-900/30 scale-100 lg:scale-105 border-0 z-10"
                  : "bg-white border border-slate-200 shadow-sm hover:shadow-xl hover:border-blue-200"
              }`}
            >
              
              {plan.highlight && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                  <span className="bg-amber-400 text-amber-950 text-xs font-bold px-4 py-1.5 rounded-full shadow-md flex items-center gap-1.5">
                    <span>🔥</span> Paling Populer
                  </span>
                </div>
              )}

              <div className="mb-8">
                <h3 className={`text-xl font-bold mb-4 ${plan.highlight ? "text-white" : "text-slate-900"}`}>
                  {plan.name}
                </h3>
                <div className="flex items-baseline gap-2 mb-4">
                  <span className={`text-4xl lg:text-5xl font-extrabold ${plan.highlight ? "text-white" : "text-slate-900"}`}>
                    {plan.price}
                  </span>
                  {plan.price !== "Custom" && (
                    <span className={`text-sm font-medium ${plan.highlight ? "text-blue-200" : "text-slate-500"}`}>
                      / bulan
                    </span>
                  )}
                </div>
                <p className={`text-sm leading-relaxed ${plan.highlight ? "text-blue-100" : "text-slate-500"}`}>
                  {plan.description}
                </p>
              </div>

              <div className="flex-1 space-y-4 mb-8">
                {plan.features.map((feature, index) => (
                  <div key={index} className="flex items-start gap-3">
                    {feature.included ? (
                      <CheckCircle2 className={`h-5 w-5 shrink-0 mt-0.5 ${
                        plan.highlight ? "text-white" : "text-blue-600"
                      }`} />
                    ) : (
                      <X className={`h-5 w-5 shrink-0 mt-0.5 ${
                        plan.highlight ? "text-blue-400/50" : "text-slate-300"
                      }`} />
                    )}
                    <span className={`text-[15px] font-medium leading-tight ${
                      feature.included 
                        ? (plan.highlight ? "text-white" : "text-slate-700") 
                        : (plan.highlight ? "text-blue-400/50" : "text-slate-400")
                    }`}>
                      {feature.name}
                    </span>
                  </div>
                ))}
              </div>

              <Button 
                className={`w-full py-6 rounded-xl font-bold transition-all shadow-md mt-auto ${
                  plan.highlight
                    ? "bg-white text-blue-600 hover:bg-slate-50 hover:shadow-xl"
                    : "bg-blue-600 text-white hover:bg-blue-700 hover:shadow-blue-600/20"
                }`}
              >
                {plan.buttonText}
              </Button>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
