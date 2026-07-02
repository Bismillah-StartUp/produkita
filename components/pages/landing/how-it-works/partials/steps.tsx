"use client";

import { useState, useEffect } from "react";
import {
  Sparkles,
  ArrowRight,
  ArrowLeft,
  UserPlus,
  Grid,
  FileInput,
  LineChart,
  CheckCircle2,
  Lock,
  Check,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import Image from "next/image";

const STEPS_DATA = [
  {
    id: 1,
    title: "Daftar & Masuk Akun",
    icon: UserPlus,
    description:
      "Buat akun terlebih dahulu untuk mulai menggunakan layanan yang tersedia di Produkita. Setelah berhasil masuk, pengguna dapat mengakses fitur melalui dashboard.",
    bullets: [
      "Isi formulir pendaftaran dengan mudah",
      "Masuk menggunakan akun yang sudah dibuat",
      "Akses dashboard pengguna",
      "Mulai gunakan fitur sesuai kebutuhan",
    ],
  },
  {
    id: 2,
    title: "Pilih Layanan",
    icon: Grid,
    description:
      "Pilih layanan yang ingin digunakan sesuai kebutuhan bisnis Anda, mulai dari pembuatan QR Code, manajemen keuangan, hingga kalkulator HPP.",
    bullets: [
      "Pilih fitur QR Code untuk informasi produk",
      "Gunakan manajemen keuangan untuk pencatatan",
      "Hitung biaya produksi dengan kalkulator HPP",
      "Sesuaikan layanan dengan kebutuhan usaha",
    ],
  },
  {
    id: 3,
    title: "Masukkan Data",
    icon: FileInput,
    description:
      "Masukkan data yang dibutuhkan sesuai layanan yang dipilih. Data tersebut akan digunakan sistem untuk menghasilkan informasi yang lebih rapi dan mudah.",
    bullets: [
      "Input data produk atau usaha",
      "Masukkan pemasukan dan pengeluaran",
      "Isi komponen biaya produksi",
      "Lengkapi data sesuai fitur yang digunakan",
    ],
  },
  {
    id: 4,
    title: "Lihat Hasil & kelola Bisnis",
    icon: LineChart,
    description:
      "Setelah data diproses, pengguna dapat melihat hasilnya melalui sistem dan memanfaatkannya untuk membantu pengelolaan bisnis.",
    bullets: [
      "QR Code siap digunakan",
      "Laporan keuangan lebih tertata",
      "Hasil perhitungan HPP lebih jelas",
      "Bisnis lebih mudah dipantau dan dikelola",
    ],
  },
];

export const Steps = () => {
  const [activeStep, setActiveStep] = useState(1);

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveStep((prev) => (prev === 4 ? 1 : prev + 1));
    }, 5000);

    return () => clearInterval(timer);
  }, [activeStep]);

  const nextStep = () => {
    setActiveStep((prev) => (prev === 4 ? 1 : prev + 1));
  };

  const prevStep = () => {
    if (activeStep > 1) setActiveStep(activeStep - 1);
  };

  return (
    <section className="bg-white pt-24 pb-20 md:pt-32 md:pb-28 relative overflow-hidden">
      <div className="absolute top-1/4 left-0 w-1/2 h-125 bg-blue-50/80 blur-[120px] pointer-events-none -translate-x-1/3" />
      <div className="absolute top-1/4 right-0 w-1/2 h-125 bg-amber-50/80 blur-[120px] pointer-events-none translate-x-1/3" />

      <div className="mx-auto w-[90%] max-w-400 px-6 lg:px-8 relative z-10">
        <div className="text-center mx-auto mb-16">
          <div className="inline-flex items-center gap-1.5 rounded-full bg-blue-50/80 px-3 py-1 text-[11px] font-bold tracking-widest text-blue-600 uppercase border border-blue-100/50 mb-6">
            <Sparkles className="h-3 w-3 fill-blue-600" />
            CARA KERJA
          </div>

          <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-slate-900 mb-6">
            Mulai dalam <span className="text-blue-600">4 Langkah Mudah</span>
          </h2>

          <p className="text-lg text-slate-500 max-w-2xl mx-auto">
            Tidak perlu kemampuan teknis. Dari daftar hingga go digital dalam
            hitungan menit.
          </p>
        </div>

        <div className="grid grid-cols-4 gap-1 mb-2">
          {[1, 2, 3, 4].map((step) => (
            <div
              key={step}
              className={`h-1 w-full rounded-full transition-colors duration-500 ${activeStep >= step ? "bg-blue-600" : "bg-slate-100"}`}
            />
          ))}
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
          {STEPS_DATA.map((step) => {
            const isActive = activeStep === step.id;
            const isCompleted = activeStep > step.id;
            const TabIcon = isCompleted ? Check : step.icon;

            return (
              <button
                key={step.id}
                onClick={() => setActiveStep(step.id)}
                className={`p-6 rounded-[1.5rem] border text-left transition-all duration-300 flex flex-col gap-8 h-40 ${
                  isActive
                    ? "bg-blue-600 border-blue-600 shadow-xl shadow-blue-900/20"
                    : "bg-white border-slate-200 hover:border-blue-300 hover:shadow-md"
                }`}
              >
                <div className="flex items-start justify-between w-full">
                  <div
                    className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 transition-colors ${
                      isActive
                        ? "bg-white text-blue-600"
                        : isCompleted
                          ? "bg-slate-50 text-blue-600"
                          : "bg-slate-50 text-slate-400"
                    }`}
                  >
                    <TabIcon className="h-5 w-5" />
                  </div>
                  <span
                    className={`text-2xl font-bold transition-colors ${isActive ? "text-white" : "text-slate-300"}`}
                  >
                    0{step.id}
                  </span>
                </div>
                <span
                  className={`font-bold text-[15px] transition-colors leading-tight ${isActive ? "text-white" : "text-slate-600"}`}
                >
                  {step.title}
                </span>
              </button>
            );
          })}
        </div>

        <div className="bg-slate-50 rounded-[2.5rem] overflow-hidden relative shadow-inner border border-slate-100">
          <div
            className="flex transition-transform duration-700 ease-in-out w-[400%]"
            style={{ transform: `translateX(-${(activeStep - 1) * 25}%)` }}
          >
            {STEPS_DATA.map((step) => {
              return (
                <div
                  key={step.id}
                  className="w-[25%] p-6 lg:py-14 lg:px-10 grid lg:grid-cols-2 gap-8 lg:gap-12 items-center"
                >
                  <div className="w-full space-y-8">
                    <div className="inline-flex items-center gap-1.5 rounded-full bg-blue-100/50 px-3 py-1 text-[11px] font-bold tracking-widest text-blue-600 uppercase border border-blue-200/50">
                      <UserPlus className="h-3 w-3 text-blue-600" />
                      LANGKAH 0{step.id}
                    </div>

                    <div className="flex items-center gap-4">
                      <span className="text-6xl font-black text-blue-200/80 tracking-tighter">
                        0{step.id}
                      </span>
                      <h3 className="text-3xl md:text-4xl font-bold text-slate-900">
                        {step.title}
                      </h3>
                    </div>

                    <p className="text-slate-500 leading-relaxed text-[15px]">
                      {step.description}
                    </p>

                    <div className="space-y-4 pt-2">
                      {step.bullets.map((bullet, i) => (
                        <div key={i} className="flex items-start gap-3">
                          <div className="w-5 h-5 rounded-full bg-blue-100 flex items-center justify-center shrink-0 mt-0.5">
                            <CheckCircle2 className="h-3.5 w-3.5 text-blue-600" />
                          </div>
                          <span className="text-[14px] text-slate-700 font-medium leading-tight">
                            {bullet}
                          </span>
                        </div>
                      ))}
                    </div>

                    <div className="flex items-center gap-4 pt-6 w-full">
                      <Button
                        onClick={prevStep}
                        disabled={step.id === 1}
                        variant="ghost"
                        className={`flex-1 px-6 py-6 rounded-xl font-bold transition-all ${
                          step.id === 1
                            ? "text-slate-300 hover:text-slate-300 hover:bg-transparent"
                            : "text-blue-600 hover:bg-blue-50"
                        }`}
                      >
                        <ArrowLeft className="h-4 w-4 mr-2" />
                        Sebelumnya
                      </Button>
                      <Button
                        onClick={nextStep}
                        className="flex-1 bg-blue-600 text-white hover:bg-blue-700 px-6 py-6 rounded-xl font-bold shadow-md shadow-blue-600/20 disabled:opacity-50"
                      >
                        {step.id === 4 ? "Berikutnya" : "Berikutnya"}
                        <ArrowRight className="h-4 w-4 ml-2" />
                      </Button>
                    </div>
                  </div>

                  <div className="w-full">
                    <div className="bg-white rounded-2xl shadow-2xl shadow-slate-200/50 border border-slate-200 overflow-hidden flex flex-col">
                      <div className="bg-slate-100 px-4 py-3 flex items-center border-b border-slate-200">
                        <div className="flex gap-2">
                          <div className="w-3 h-3 rounded-full bg-red-400" />
                          <div className="w-3 h-3 rounded-full bg-amber-400" />
                          <div className="w-3 h-3 rounded-full bg-green-400" />
                        </div>
                        <div className="mx-auto bg-white px-6 py-1 rounded-md text-[10px] text-slate-400 font-medium border border-slate-200 flex items-center gap-2">
                          <Lock className="h-3 w-3" />
                          produkita.id/dashboard
                        </div>
                      </div>
                      <div className="w-full bg-slate-50 relative flex overflow-hidden">
                        <Image
                          src={`/assets/landing/steps-${step.id}.png`}
                          alt={`Ilustrasi Langkah ${step.id}: ${step.title}`}
                          width={1200}
                          height={900}
                          className="w-full h-auto block"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};
