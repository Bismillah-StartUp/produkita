import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";

export const CTA = () => {
  return (
    <section className="py-20 md:py-32 bg-white relative">
      <div className="w-full">
        <div className="relative rounded-[2.5rem] bg-blue-600 shadow-2xl shadow-blue-600/30">
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden rounded-[2.5rem] select-none px-2 md:px-4">
            <h2 className="w-full flex justify-between text-[8rem] md:text-[14rem] lg:text-[18rem] font-black text-white/5 leading-none transform scale-y-125 origin-center -translate-y-4 md:-translate-y-8">
              {"PRODUKKI".split("").map((letter, i) => (
                <span key={i}>{letter}</span>
              ))}
            </h2>
          </div>

          <div className="mx-auto w-[90%] max-w-400 grid lg:grid-cols-2 gap-12 lg:gap-8 relative z-10 py-16 md:py-20 lg:py-24 items-center">
            <div className="space-y-8 max-w-xl">
              <p className="text-blue-100 font-medium tracking-wide">
                Platform digital UMKM — mudah, aman, dan terjangkau
              </p>

              <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-[1.15]">
                Siap Digitalisasi <br />
                Bisnis UMKM <br />
                Anda?
              </h2>

              <Link
                href="/dashboard"
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-white px-8 py-4 text-base font-bold text-blue-600 shadow-xl shadow-blue-900/20 transition-all hover:bg-blue-50 hover:scale-105"
              >
                Mulai Sekarang <ArrowRight className="h-5 w-5" />
              </Link>
            </div>

            <div className="relative w-full hidden md:block">
              <Image
                src="/assets/landing/cta-mockup-phones.webp"
                alt="Mockup Aplikasi Produkita"
                width={800}
                height={800}
                className="absolute -mt-95 right-0 lg:right-12 xl:right-20  w-87.5 lg:w-112.5 xl:w-125 h-auto max-w-none drop-shadow-2xl object-contain z-20"
                priority
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
