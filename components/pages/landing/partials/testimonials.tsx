"use client";

import { useState, useRef } from "react";
import Image from "next/image";
import { Sparkles, ChevronLeft, ChevronRight, Star } from "lucide-react";

const TESTIMONIALS = [
  {
    name: "Siti Rahayu",
    company: "Owner Dapur Ibu UMKM",
    description:
      "Fitur kalkulator HPP sangat membantu saya menentukan harga jual yang tepat. Dashboard-nya juga mudah digunakan, bahkan untuk yang tidak paham teknologi.",
    rating: 5,
  },
  {
    name: "Ahmad Rizky",
    company: "Owner Kopi Maju",
    description:
      "Analitik real-time dari Produkita membantu saya memantau perkembangan bisnis kapan saja dan di mana saja. Sangat direkomendasikan!",
    rating: 5,
  },
  {
    name: "Dewi Lestari",
    company: "Owner Keripik Singkong",
    description:
      "Analitik real-time dari Produkita membantu saya memantau perkembangan bisnis kapan saja dan di mana saja. Sangat direkomendasikan!",
    rating: 5,
  },
  {
    name: "Budi Santoso",
    company: "Owner Batik Nusantara",
    description:
      "Proses sertifikasi produk menjadi jauh lebih cepat dan terstruktur berkat fitur yang disediakan. Luar biasa!",
    rating: 5,
  },
];

export const Testimonials = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const scrollTo = (index: number) => {
    setActiveIndex(index);
    if (scrollContainerRef.current) {
      const cardEl = scrollContainerRef.current.children[index] as HTMLElement;
      if (cardEl) {
        scrollContainerRef.current.scrollTo({
          left: cardEl.offsetLeft - scrollContainerRef.current.offsetLeft - 24,
          behavior: "smooth",
        });
      }
    }
  };

  const handleNext = () => {
    const nextIndex = (activeIndex + 1) % TESTIMONIALS.length;
    scrollTo(nextIndex);
  };

  const handlePrev = () => {
    const prevIndex =
      (activeIndex - 1 + TESTIMONIALS.length) % TESTIMONIALS.length;
    scrollTo(prevIndex);
  };

  return (
    <section
      id="testimoni"
      className="bg-linear-to-b from-white to-blue-50/40 py-20 md:py-28 overflow-hidden"
    >
      <div className="mx-auto w-[90%] max-w-400 px-6 lg:px-10">
        {/* Header Area */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div className="space-y-4">
            <div className="inline-flex items-center gap-1.5 rounded-full bg-blue-50/80 px-3 py-1 text-[11px] font-bold tracking-widest text-blue-600 uppercase border border-blue-100/50">
              <Sparkles className="h-3 w-3 fill-blue-600" />
              Testimoni
            </div>

            <h2 className="text-3xl font-bold tracking-tight text-slate-900 md:text-5xl">
              Apa Kata <span className="text-blue-600">Klien Kami?</span>
            </h2>

            <p className="max-w-md text-base text-slate-500">
              Ribuan pelaku UMKM Indonesia telah merasakan manfaat nyata dari
              Produkita.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={handlePrev}
              className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-100 text-slate-400 hover:bg-blue-600 hover:text-white hover:shadow-md hover:shadow-blue-600/20 transition-colors"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <button
              onClick={handleNext}
              className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-100 text-slate-400 hover:bg-blue-600 hover:text-white hover:shadow-md hover:shadow-blue-600/20 transition-colors"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>
        </div>

        <div className="relative mb-8">
          <div
            ref={scrollContainerRef}
            className="flex gap-6 overflow-x-auto pb-12 pt-4 snap-x snap-mandatory hide-scrollbar"
            style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
          >
            {TESTIMONIALS.map((testimonial, i) => {
              const isActive = i === activeIndex;

              return (
                <div
                  key={i}
                  className="flex flex-col gap-10 shrink-0 w-87.5 md:w-100 snap-center"
                >
                  {/* Card */}
                  <div
                    onClick={() => scrollTo(i)}
                    className={`cursor-pointer rounded-2xl p-8 transition-all duration-500 ${
                      isActive
                        ? "bg-white border border-blue-100 shadow-[0_10px_40px_-15px_rgba(37,99,235,0.2)] scale-100"
                        : "bg-white/80 border border-slate-200/50 shadow-sm scale-95 opacity-70 hover:opacity-100 hover:bg-white"
                    }`}
                  >
                    {/* Stars */}
                    <div className="flex items-center gap-1 mb-6">
                      {[...Array(testimonial.rating)].map((_, idx) => (
                        <Star
                          key={idx}
                          className="h-4 w-4 fill-yellow-400 text-yellow-400"
                        />
                      ))}
                    </div>

                    {/* Text */}
                    <p className="text-slate-600 leading-relaxed mb-8 h-24">
                      {testimonial.description}
                    </p>

                    {/* Profile */}
                    <div className="flex items-center gap-4">
                      <div className="h-10 w-10 rounded-full bg-slate-200 overflow-hidden">
                        {/* <Image
                          src={`https://api.dicebear.com/7.x/notionists/svg?seed=${testimonial.name}`}
                          alt={testimonial.name}
                          width={48}
                          height={48}
                          className="w-full h-full object-cover"
                        /> */}
                      </div>
                      <div>
                        <p className="text-sm font-bold text-slate-900">
                          {testimonial.name}
                        </p>
                        <p className="text-[11px] text-slate-400">
                          {testimonial.company}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Line */}
                  <div
                    className={`h-0.5 w-full rounded-full transition-colors duration-500 ${
                      isActive ? "bg-blue-600" : "bg-slate-200"
                    }`}
                  />
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};
