"use client";

import { useState } from "react";
import { Sparkles, ChevronDown } from "lucide-react";

const FAQ_DATA = [
  {
    question: "Apa itu Produkita?",
    answer:
      "Produkita adalah platform digital all-in-one untuk UMKM Indonesia yang membantu pendaftaran produk, manajemen sertifikasi, barcode QR, keuangan, dan analitik bisnis dalam satu dashboard.",
  },
  {
    question: "Apakah saya perlu kemampuan teknis untuk menggunakan Produkita?",
    answer:
      "Sama sekali tidak. Antarmuka Produkita dirancang sangat ramah pengguna (user-friendly) sehingga siapa pun, bahkan tanpa latar belakang IT, dapat menggunakannya dengan mudah.",
  },
  {
    question: "Bagaimana cara kerja QR Code produk?",
    answer:
      "Setelah mendaftarkan produk Anda di sistem kami, Produkita akan otomatis membuatkan QR Code unik. Saat dipindai oleh pelanggan, mereka bisa melihat informasi detail produk, sertifikasi, dan analitik akan terekam di dashboard Anda.",
  },
  {
    question: "Apakah data saya aman di Produkita?",
    answer:
      "Keamanan data Anda adalah prioritas utama kami. Kami menggunakan enkripsi standar industri dan server lokal yang aman untuk memastikan seluruh data bisnis Anda terlindungi dengan baik.",
  },
  {
    question: "Bisakah saya upgrade atau downgrade paket?",
    answer:
      "Tentu! Anda bisa mengubah paket berlangganan kapan saja melalui menu pengaturan di dashboard. Penyesuaian biaya akan dihitung secara proporsional.",
  },
  {
    question: "Apakah tersedia masa percobaan gratis?",
    answer:
      "Ya, kami menyediakan masa percobaan gratis selama 14 hari agar Anda bisa mencoba semua fitur unggulan kami sebelum memutuskan berlangganan.",
  },
];

export const FAQ = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleOpen = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faq" className="bg-white py-20 md:py-32">
      <div className="mx-auto w-[90%] max-w-400 px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-1.5 rounded-full bg-blue-50/80 px-3 py-1 text-[11px] font-bold tracking-widest text-blue-600 uppercase border border-blue-100/50 mb-6">
            <Sparkles className="h-3 w-3 fill-blue-600" />
            FAQ
          </div>
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-slate-900 mb-6">
            Pertanyaan yang Sering Diajukan
          </h2>
          <p className="text-lg text-slate-500">
            Temukan jawaban atas pertanyaan umum tentang Produkita
          </p>
        </div>

        <div className="space-y-4 w-full mx-auto">
          {FAQ_DATA.map((item, index) => {
            const isOpen = openIndex === index;

            return (
              <div
                key={index}
                className={`overflow-hidden rounded-xl border transition-all duration-300 ${
                  isOpen
                    ? "border-blue-300 bg-white shadow-sm shadow-blue-100"
                    : "border-slate-200 bg-white hover:border-blue-200"
                }`}
              >
                <button
                  onClick={() => toggleOpen(index)}
                  className="flex w-full items-center justify-between px-6 py-5 text-left"
                >
                  <span
                    className={`font-semibold text-[15px] ${isOpen ? "text-blue-600" : "text-slate-800"}`}
                  >
                    {item.question}
                  </span>
                  <ChevronDown
                    className={`h-5 w-5 shrink-0 transition-transform duration-300 ${
                      isOpen ? "text-blue-600 rotate-180" : "text-slate-400"
                    }`}
                  />
                </button>

                <div
                  className={`grid transition-all duration-300 ease-in-out ${
                    isOpen
                      ? "grid-rows-[1fr] opacity-100 pb-5"
                      : "grid-rows-[0fr] opacity-0"
                  }`}
                >
                  <div className="overflow-hidden px-6">
                    <p className="text-slate-500 text-[15px] leading-relaxed pt-1">
                      {item.answer}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
