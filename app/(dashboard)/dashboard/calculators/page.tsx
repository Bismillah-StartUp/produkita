"use client"

import * as React from "react"
import { Pencil, Trash2, Plus, Star, ChevronDown, Lightbulb, Check } from "lucide-react"
import { cn } from "@/lib/utils"

const formatRp = (value: number) => {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(value)
}

const produkList = [
  "Yogurt Stroberi",
  "Susu Segar Premium",
  "Keju Mozarella",
  "Susu UHT Full Cream",
  "Kefir Plain",
  "Mentega Tawar",
  "Yogurt Plain",
]

const satuanList = ["Pack", "Pcs", "Kg", "Lusin", "Liter", "Box"]

const dummyData = {
  biayaBahanBaku: [
    {
      id: 1,
      name: "Susu Segar",
      unit: "Liter",
      qty: 100,
      price: 10000,
      total: 1000000,
    },
    {
      id: 2,
      name: "Starter Yogurt",
      unit: "Kg",
      qty: 2,
      price: 50000,
      total: 100000,
    },
    {
      id: 3,
      name: "Starter Yogurt",
      unit: "Kg",
      qty: 2,
      price: 50000,
      total: 100000,
    },
  ],
  biayaKemasan: [
    {
      id: 1,
      name: "Botol Plastik 500ml",
      unit: "Pcs",
      qty: 200,
      price: 1500,
      total: 300000,
    },
    {
      id: 2,
      name: "Label & Sticker",
      unit: "Lembar",
      qty: 200,
      price: 500,
      total: 100000,
    },
    {
      id: 3,
      name: "Label & Sticker",
      unit: "Lembar",
      qty: 200,
      price: 500,
      total: 100000,
    },
  ],
  biayaOperasional: [
    {
      id: 1,
      name: "Listrik & Air",
      unit: "Bulan",
      qty: 1,
      price: 600000,
      total: 600000,
    },
    {
      id: 2,
      name: "Tenaga Kerja",
      unit: "Orang",
      qty: 2,
      price: 1500000,
      total: 3000000,
    },
    {
      id: 3,
      name: "Tenaga Kerja",
      unit: "Orang",
      qty: 2,
      price: 1500000,
      total: 3000000,
    },
  ],
  summary: {
    totalBahanBaku: 1100000,
    totalKemasan: 400000,
    totalOperasional: 3600000,
    grandTotal: 5500000,
  },
}

export default function KalkulatorHPPPage() {
  const [selectedProduk, setSelectedProduk] = React.useState(produkList[0])
  const [isProdukOpen, setIsProdukOpen] = React.useState(false)

  const [selectedSatuan, setSelectedSatuan] = React.useState(satuanList[0])
  const [isSatuanOpen, setIsSatuanOpen] = React.useState(false)

  const [jumlahProduksi, setJumlahProduksi] = React.useState("500")

  return (
    <div className="min-h-screen bg-[#F8FAFC] p-6 lg:p-8">
      <div className="flex flex-col items-start gap-6 lg:flex-row">
        <div className="flex w-full flex-col gap-6 lg:w-[65%] xl:w-[68%]">
          <div className="relative z-30 w-full rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="mb-4 text-base font-bold text-slate-800">Informasi Produk</h2>

            <div className="grid grid-cols-1 gap-4 md:grid-cols-12 md:gap-5">
              <div className="flex flex-col gap-2 md:col-span-5">
                <label className="text-[13px] font-semibold text-slate-700">Nama Produk</label>
                <div className="relative w-full">
                  <button
                    type="button"
                    onClick={() => {
                      setIsProdukOpen(!isProdukOpen)
                      setIsSatuanOpen(false)
                    }}
                    className={cn(
                      "flex h-10.5 w-full items-center justify-between rounded-lg border bg-white px-3.5 text-sm transition-colors",
                      isProdukOpen
                        ? "border-blue-500 ring-1 ring-blue-500"
                        : "border-slate-200 text-slate-600 hover:bg-slate-50"
                    )}
                  >
                    <span className="truncate">{selectedProduk}</span>
                    <ChevronDown className="h-4 w-4 shrink-0 text-slate-400" />
                  </button>

                  {isProdukOpen && (
                    <div className="absolute top-full left-0 mt-1.5 w-full rounded-xl border border-slate-200 bg-white p-2 shadow-xl">
                      <div className="mb-1.5 px-3 pt-1.5 text-[10px] font-bold tracking-wider text-slate-400 uppercase">
                        PILIH PRODUK
                      </div>
                      <div className="flex max-h-56 flex-col overflow-y-auto">
                        {produkList.map((item) => (
                          <button
                            key={item}
                            type="button"
                            onClick={() => {
                              setSelectedProduk(item)
                              setIsProdukOpen(false)
                            }}
                            className={cn(
                              "flex w-full items-center justify-between rounded-lg px-3 py-2 text-left text-[13px] font-medium transition-colors",
                              selectedProduk === item ? "bg-blue-50 text-blue-600" : "text-slate-600 hover:bg-slate-50"
                            )}
                          >
                            {item}
                            {selectedProduk === item && <Check className="h-4 w-4" />}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>

              <div className="flex flex-col gap-2 md:col-span-4">
                <label className="text-[13px] font-semibold text-slate-700">Satuan Produksi</label>
                <div className="relative w-full">
                  <button
                    type="button"
                    onClick={() => {
                      setIsSatuanOpen(!isSatuanOpen)
                      setIsProdukOpen(false)
                    }}
                    className={cn(
                      "flex h-10.5 w-full items-center justify-between rounded-lg border bg-white px-3.5 text-sm transition-colors",
                      isSatuanOpen
                        ? "border-blue-500 ring-1 ring-blue-500"
                        : "border-slate-200 text-slate-600 hover:bg-slate-50"
                    )}
                  >
                    <span className="truncate">{selectedSatuan}</span>
                    <ChevronDown className="h-4 w-4 shrink-0 text-slate-400" />
                  </button>

                  {isSatuanOpen && (
                    <div className="absolute top-full left-0 mt-1.5 w-full rounded-xl border border-slate-200 bg-white p-2 shadow-xl">
                      <div className="mb-1.5 px-3 pt-1.5 text-[10px] font-bold tracking-wider text-slate-400 uppercase">
                        PILIH SATUAN
                      </div>
                      <div className="flex max-h-56 flex-col overflow-y-auto">
                        {satuanList.map((item) => (
                          <button
                            key={item}
                            type="button"
                            onClick={() => {
                              setSelectedSatuan(item)
                              setIsSatuanOpen(false)
                            }}
                            className={cn(
                              "flex w-full items-center justify-between rounded-lg px-3 py-2 text-left text-[13px] font-medium transition-colors",
                              selectedSatuan === item ? "bg-blue-50 text-blue-600" : "text-slate-600 hover:bg-slate-50"
                            )}
                          >
                            {item}
                            {selectedSatuan === item && <Check className="h-4 w-4" />}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>

              <div className="flex flex-col gap-2 md:col-span-3">
                <label className="text-[13px] font-semibold text-slate-700">Jumlah Produksi</label>
                <input
                  type="number"
                  value={jumlahProduksi}
                  onChange={(e) => setJumlahProduksi(e.target.value)}
                  placeholder="Contoh: 100"
                  className="h-10.5 w-full rounded-lg border border-slate-200 bg-white px-3.5 text-sm font-medium text-slate-800 transition-all outline-none placeholder:text-slate-400 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                />
              </div>
            </div>
          </div>

          <div className="relative z-10 flex flex-col gap-6">
            <CostTableSection
              number="1"
              title="Biaya Bahan Baku"
              subtitle="Semua bahan baku yang digunakan dalam proses produksi"
              data={dummyData.biayaBahanBaku}
              total={dummyData.summary.totalBahanBaku}
            />
            <CostTableSection
              number="2"
              title="Biaya Kemasan"
              subtitle="Biaya kemasan produk yang digunakan untuk pengemasan"
              data={dummyData.biayaKemasan}
              total={dummyData.summary.totalKemasan}
            />
            <CostTableSection
              number="3"
              title="Biaya Operasional"
              subtitle="Biaya operasional tetap dalam satu periode produksi"
              data={dummyData.biayaOperasional}
              total={dummyData.summary.totalOperasional}
            />

            <div className="flex h-18 items-center justify-between rounded-2xl bg-blue-600 px-6 text-white shadow-md">
              <span className="text-[15px] font-bold">Total HPP (Semua Biaya)</span>
              <span className="text-2xl font-bold">{formatRp(dummyData.summary.grandTotal)}</span>
            </div>
          </div>
        </div>

        <div className="flex w-full flex-col gap-6 lg:w-[35%] xl:w-[32%]">
          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm xl:p-6">
            <h3 className="mb-4 text-[15px] font-bold text-slate-800">Ringkasan Hasil</h3>
            <div className="mb-5 grid grid-cols-2 gap-4">
              <div className="flex flex-col gap-1">
                <p className="text-[11px] font-medium text-slate-400">Total Biaya Produksi</p>
                <p className="text-base font-bold text-blue-600">{formatRp(dummyData.summary.grandTotal)}</p>
              </div>
              <div className="flex flex-col gap-1">
                <p className="text-[11px] font-medium text-slate-400">Jumlah Produksi</p>
                <p className="text-base font-bold text-blue-600">
                  {jumlahProduksi || "0"} {selectedSatuan}
                </p>
              </div>
            </div>
            <div className="rounded-xl bg-[#F4F7FF] p-4">
              <p className="mb-1 text-[11px] font-medium text-slate-400">HPP per {selectedSatuan}</p>
              <div className="flex items-end gap-1 text-blue-600">
                <span className="text-[28px] leading-none font-bold tracking-tight">11Rb</span>
                <span className="mb-1 text-[13px] font-semibold">/ {selectedSatuan}</span>
              </div>
            </div>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm xl:p-6">
            <div className="mb-5 flex items-center gap-2">
              <Lightbulb className="h-5 w-5 text-yellow-400" fill="currentColor" />
              <h3 className="text-[15px] font-bold text-slate-800">Rekomendasi Margin Jual</h3>
            </div>

            <div className="mb-5 flex h-10.5 items-center justify-between rounded-lg border border-slate-200 px-3">
              <span className="text-[13px] font-medium text-slate-500">Target Margin (%)</span>
              <div className="flex items-center gap-1">
                <input
                  type="text"
                  defaultValue="35"
                  readOnly
                  className="w-10 text-right text-[15px] font-bold text-blue-600 outline-none"
                />
                <span className="text-[13px] font-medium text-blue-600">%</span>
              </div>
            </div>

            <div className="flex flex-col gap-3">
              <div className="rounded-xl bg-blue-600 p-4 text-white shadow-md">
                <div className="flex items-start justify-between">
                  <div>
                    <h4 className="flex items-center gap-1.5 text-[15px] font-bold">
                      Margin 35% <Star className="h-3.5 w-3.5" fill="currentColor" />
                    </h4>
                    <p className="mt-1 text-[11px] text-blue-100">Target margin yang kamu tentukan</p>
                  </div>
                  <span className="text-lg font-bold">{formatRp(14850)}</span>
                </div>
                <div className="mt-3.5 flex items-center justify-between border-t border-blue-500/50 pt-2.5 text-[12px] font-medium text-blue-100">
                  <span>Untung/Unit</span>
                  <span>{formatRp(3850)}</span>
                </div>
              </div>

              <div className="relative rounded-xl border-[1.5px] border-blue-500 bg-white p-4 shadow-sm transition-colors hover:bg-slate-50">
                <div className="absolute -top-2.5 right-4 flex items-center gap-1 rounded bg-blue-600 px-1.5 py-0.5 text-[9px] font-bold tracking-wider text-white uppercase shadow-sm">
                  <Star className="h-2.5 w-2.5" fill="currentColor" /> REKOMENDASI
                </div>
                <div className="flex items-start justify-between">
                  <div>
                    <h4 className="text-[15px] font-bold text-slate-800">Margin 30%</h4>
                    <p className="mt-1 text-[11px] text-slate-400">HPP/Unit x 1.30 - Margin aman dan stabil</p>
                  </div>
                  <span className="text-lg font-bold text-blue-600">{formatRp(14300)}</span>
                </div>
                <div className="mt-3.5 flex items-center justify-between border-t border-slate-100 pt-2.5 text-[12px] font-medium text-slate-500">
                  <span>Untung/Unit</span>
                  <span>{formatRp(3300)}</span>
                </div>
              </div>

              <div className="rounded-xl border border-slate-200 bg-white p-4 transition-colors hover:border-blue-300 hover:bg-slate-50">
                <div className="flex items-start justify-between">
                  <div>
                    <h4 className="text-[15px] font-bold text-slate-700">Margin 50%</h4>
                    <p className="mt-1 text-[11px] text-slate-400">HPP/Unit x 1.50 - Margin maksimal</p>
                  </div>
                  <span className="text-lg font-bold text-blue-600">{formatRp(16500)}</span>
                </div>
                <div className="mt-3.5 flex items-center justify-between border-t border-slate-100 pt-2.5 text-[12px] font-medium text-slate-500">
                  <span>Untung/Unit</span>
                  <span>{formatRp(5500)}</span>
                </div>
              </div>
            </div>
          </div>

          <div className="overflow-hidden rounded-2xl bg-[#2563EB] text-white shadow-md">
            <div className="p-5 xl:p-6">
              <h3 className="mb-5 text-[15px] font-bold">Ringkasan - Strategi margin 35%</h3>
              <div className="grid grid-cols-2 gap-3">
                <div className="flex flex-col gap-1 rounded-xl bg-white/10 p-3.5">
                  <p className="text-[9px] font-bold tracking-widest text-blue-200/80 uppercase">HPP PER UNIT</p>
                  <p className="text-[17px] font-bold">Rp 11.000</p>
                  <p className="text-[10px] text-blue-200">Biaya Pokok</p>
                </div>
                <div className="flex flex-col gap-1 rounded-xl bg-white/10 p-3.5">
                  <p className="text-[9px] font-bold tracking-widest text-blue-200/80 uppercase">HARGA 35%</p>
                  <p className="text-[17px] font-bold">Rp 14.850</p>
                  <p className="text-[10px] text-blue-200">Margin 35%</p>
                </div>
                <div className="flex flex-col gap-1 rounded-xl bg-white/10 p-3.5">
                  <p className="text-[9px] font-bold tracking-widest text-blue-200/80 uppercase">PROFIT PER UNIT</p>
                  <p className="text-[17px] font-bold">Rp 3.850</p>
                  <p className="text-[10px] text-blue-200">Profit bersih per unit</p>
                </div>
                <div className="flex flex-col gap-1 rounded-xl bg-white/10 p-3.5">
                  <p className="text-[9px] font-bold tracking-widest text-blue-200/80 uppercase">JUMLAH PRODUKSI</p>
                  <p className="text-[17px] font-bold">
                    {jumlahProduksi || "0"} {selectedSatuan}
                  </p>
                  <p className="text-[10px] text-blue-200">Target produksi / bulan</p>
                </div>
              </div>
            </div>
            <div className="flex min-h-14 items-center justify-between bg-[#FACC15] px-5 text-slate-900 xl:px-6">
              <div className="flex items-center gap-1.5 text-[13px] font-bold">
                <Star className="h-4 w-4" fill="currentColor" />
                <span>Total keuntungan jika terjual semua</span>
              </div>
              <span className="text-[17px] font-black">{formatRp(1925000)}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

function CostTableSection({ number, title, subtitle, data, total }: any) {
  return (
    <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
      <div className="flex flex-col items-start justify-between border-b border-slate-100 bg-white px-5 py-3 sm:flex-row sm:items-center sm:py-3.5 xl:px-6">
        <div className="flex items-center gap-3.5">
          <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-blue-600 text-[13px] font-bold text-white shadow-sm">
            {number}
          </div>
          <div className="flex flex-col gap-0.5">
            <h3 className="text-[15px] font-bold text-slate-800">{title}</h3>
            <p className="text-[11.5px] text-slate-400">{subtitle}</p>
          </div>
        </div>
        <button className="mt-3 flex h-8 items-center gap-1.5 rounded-lg bg-blue-600 px-3.5 text-[13px] font-semibold text-white transition-colors hover:bg-blue-700 sm:mt-0">
          <Plus className="h-3.5 w-3.5" strokeWidth={3} /> Tambah
        </button>
      </div>

      <div className="w-full overflow-x-auto">
        <table className="w-full text-left">
          <thead className="bg-[#F8FAFC]">
            <tr>
              <th className="px-5 py-2 text-[11px] font-bold tracking-wider text-slate-400 uppercase xl:px-6">No</th>
              <th className="px-5 py-2 text-[11px] font-bold tracking-wider text-slate-400 uppercase xl:px-6">Nama Bahan</th>
              <th className="px-5 py-2 text-[11px] font-bold tracking-wider text-slate-400 uppercase xl:px-6">Satuan</th>
              <th className="px-5 py-2 text-[11px] font-bold tracking-wider text-slate-400 uppercase xl:px-6">Jumlah</th>
              <th className="px-5 py-2 text-[11px] font-bold tracking-wider text-slate-400 uppercase xl:px-6">
                Harga Satuan
              </th>
              <th className="px-5 py-2 text-[11px] font-bold tracking-wider text-slate-400 uppercase xl:px-6">Total</th>
              <th className="px-5 py-2 text-center text-[11px] font-bold tracking-wider text-slate-400 uppercase xl:px-6">
                Aksi
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 bg-white">
            {data.map((item: any, index: number) => (
              <tr key={item.id} className="transition-colors hover:bg-slate-50/50">
                <td className="px-5 py-2.5 text-[13px] font-medium text-slate-400 xl:px-6">{index + 1}</td>
                <td className="px-5 py-2.5 text-[13px] font-bold text-slate-800 xl:px-6">{item.name}</td>
                <td className="px-5 py-2.5 text-[13px] text-slate-500 xl:px-6">{item.unit}</td>
                <td className="px-5 py-2.5 text-[13px] text-slate-500 xl:px-6">{item.qty}</td>
                <td className="px-5 py-2.5 text-[13px] text-slate-500 xl:px-6">{formatRp(item.price)}</td>
                <td className="px-5 py-2.5 text-[13px] font-bold text-blue-600 xl:px-6">{formatRp(item.total)}</td>
                <td className="px-5 py-2.5 xl:px-6">
                  <div className="flex items-center justify-center gap-3.5">
                    <button className="text-[#EAB308] transition-colors hover:text-yellow-600" aria-label="Edit">
                      <Pencil className="h-4 w-4" />
                    </button>
                    <button className="text-[#EF4444] transition-colors hover:text-red-600" aria-label="Delete">
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="flex items-center justify-between border-t border-slate-100 bg-white px-5 py-3 xl:px-6">
        <span className="text-[13px] font-semibold text-slate-400">Total {title}</span>
        <span className="text-[15px] font-bold text-blue-600">{formatRp(total)}</span>
      </div>
    </div>
  )
}
