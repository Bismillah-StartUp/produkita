"use client";

import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Star } from "lucide-react";

interface Paket {
  id: string;
  name: string;
  tier: number;
  price: string;
  letter: string;
  iconBg: string;
  badge: number;
  featured?: boolean;
  permissions: Record<string, boolean[]>;
}

const PERM_LABELS = ["AKSES", "BUAT", "EDIT", "EKSPOR", "HAPUS"];

const buildPerms = (pattern: string): boolean[] =>
  pattern.split("").map((c) => c === "1");

const mockPackages: Paket[] = [
  {
    id: "gratis",
    name: "Paket Gratis",
    tier: 1,
    price: "Gratis",
    letter: "G",
    iconBg: "bg-slate-400",
    badge: 11,
    permissions: {},
  },
  {
    id: "basic",
    name: "Paket Basic",
    tier: 2,
    price: "Rp 99.000 /bln",
    letter: "B",
    iconBg: "bg-blue-500",
    badge: 16,
    permissions: {},
  },
  {
    id: "pro",
    name: "Paket Pro",
    tier: 3,
    price: "Rp 299.000 /bln",
    letter: "P",
    iconBg: "bg-violet-500",
    badge: 44,
    featured: true,
    permissions: {},
  },
  {
    id: "enterprise",
    name: "Paket Enterprise",
    tier: 4,
    price: "Custom",
    letter: "E",
    iconBg: "bg-indigo-900",
    badge: 70,
    permissions: {},
  },
];

const permissionMatrix: [string, [string, string][]][] = [
  [
    "Produk & Barcode",
    [
      ["Produk UMKM", "11101"],
      ["QR Code Generator", "11101"],
      ["QR Code Analytics", "00000"],
      ["Export Data Produk", "00000"],
    ],
  ],
  [
    "Dashboard & Laporan",
    [
      ["Dashboard Overview", "10000"],
      ["Laporan Penjualan", "10000"],
      ["Laporan Real-time", "00000"],
      ["Export Laporan (PDF/CSV)", "00000"],
    ],
  ],
  [
    "Keuangan",
    [
      ["Manajemen Keuangan", "11100"],
      ["Kalkulator HPP", "11000"],
      ["HPP Otomatis", "00000"],
    ],
  ],
  [
    "Sertifikasi & Regulasi",
    [
      ["Integrasi BPOM", "00000"],
      ["Integrasi Halal MUI", "00000"],
      ["Manajemen Sertifikasi", "00000"],
    ],
  ],
  [
    "Support & Layanan",
    [
      ["Support Email", "10000"],
      ["Support Prioritas 24/7", "00000"],
      ["Dedicated Account Manager", "00000"],
    ],
  ],
  [
    "Enterprise & API",
    [
      ["API Access", "00000"],
      ["Multi-akun & Cabang", "00000"],
      ["Proximate Test", "00000"],
      ["Nutrition Test", "00000"],
    ],
  ],
];

mockPackages[1].permissions = Object.fromEntries(
  permissionMatrix.map(([group, rows]) => [group, rows.flatMap(([, p]) => buildPerms(p))])
);

function PermCheckbox({ checked, onToggle }: { checked: boolean; onToggle: () => void }) {
  return (
    <button
      type="button"
      onClick={onToggle}
      className={`inline-flex items-center gap-1.5 text-xs font-semibold transition-colors ${
        checked ? "text-blue-600" : "text-slate-400"
      }`}
    >
      <span
        className={`w-4 h-4 rounded border flex items-center justify-center text-[10px] ${
          checked
            ? "bg-blue-600 border-blue-600 text-white"
            : "bg-white border-slate-300 text-transparent"
        }`}
      >
        ✓
      </span>
      {checked ? "Ya" : "Tidak"}
    </button>
  );
}

export function PackagePermission() {
  const [selectedId, setSelectedId] = useState("basic");
  const [perms, setPerms] = useState<Record<string, boolean[]>>(
    () => mockPackages[1].permissions
  );

  const selected = mockPackages.find((p) => p.id === selectedId)!;

  const togglePerm = (group: string, index: number) => {
    setPerms((prev) => ({
      ...prev,
      [group]: prev[group].map((v, i) => (i === index ? !v : v)),
    }));
  };

  const allPerms = Object.values(perms).flat();
  const totalActive = allPerms.filter(Boolean).length;
  const totalPossible = allPerms.length;

  const summary = PERM_LABELS.map((_, col) =>
    Object.values(perms).filter((row) => row[col]).length
  );

  return (
    <div className="flex flex-col lg:flex-row bg-white border border-slate-200 rounded-2xl overflow-hidden">
      {/* Left: Package selector */}
      <div className="w-full lg:w-80 border-r border-slate-200 p-4 space-y-1">
        {mockPackages.map((paket) => {
          const active = selectedId === paket.id;
          return (
            <button
              key={paket.id}
              onClick={() => setSelectedId(paket.id)}
              className={`w-full flex items-center gap-3 py-3 text-left transition-colors relative ${
                active
                  ? "bg-blue-50 border-l-4 border-blue-500 pl-3 pr-3"
                  : "border-l-4 border-transparent hover:bg-slate-50 px-3"
              }`}
            >
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center text-white text-sm font-bold shrink-0 ${paket.iconBg}`}
              >
                {paket.letter}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-bold text-slate-900 flex items-center gap-1.5">
                  {paket.name}
                  {paket.featured && <Star className="h-3.5 w-3.5 fill-yellow-400 text-yellow-400" />}
                </p>
                <p className="text-xs text-slate-400 mt-0.5">{paket.price}</p>
              </div>
              <span
                className={`shrink-0 min-w-6 h-6 px-2 rounded-full flex items-center justify-center text-xs font-bold ${
                  active
                    ? "bg-blue-500 text-white"
                    : "bg-slate-100 text-slate-500"
                }`}
              >
                {paket.badge}
              </span>
            </button>
          );
        })}
      </div>

      {/* Right: Permission detail */}
      <div className="flex-1 w-full p-6 space-y-6">
        {/* Header */}
        <div className="flex items-start justify-between gap-4 flex-wrap pb-6 border-b border-slate-200">
          <div className="flex items-center gap-4">
            <div className={`w-12 h-12 rounded-2xl flex items-center justify-center text-white text-lg font-bold ${selected.iconBg}`}>
              {selected.letter}
            </div>
            <div>
              <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
                {selected.name}
                <span className="text-sm font-normal text-slate-400">· Tier {selected.tier}</span>
              </h2>
              <p className="text-sm font-semibold text-blue-600 mt-0.5">
                {selected.price.replace(" /bln", "")}
                <span className="text-slate-400 font-normal"> /bulan</span>
              </p>
            </div>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" className="rounded-full h-9 px-5 text-sm">
              Reset Default
            </Button>
            <Button className="rounded-full h-9 px-5 text-sm bg-blue-500 hover:bg-blue-600 text-white">
              Simpan Perubahan
            </Button>
          </div>
        </div>

        {/* Summary bar */}
        <div className="flex items-center justify-between gap-8 flex-wrap pb-6 border-b border-slate-200">
          <div className="flex-1 min-w-48">
            <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
              <div
                className="h-full bg-blue-500 rounded-full transition-all"
                style={{ width: `${(totalActive / totalPossible) * 100}%` }}
              />
            </div>
            <p className="text-sm mt-2">
              <span className="font-bold text-blue-600">{totalActive}</span>
              <span className="text-slate-400"> / {totalPossible} izin aktif</span>
            </p>
          </div>
          <div className="flex gap-8">
            {PERM_LABELS.map((label, i) => (
              <div key={label} className="text-center">
                <p className="text-lg font-extrabold text-slate-900">{summary[i]}</p>
                <p className="text-[10px] font-bold text-slate-400 tracking-wider">{label}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Permission matrix */}
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-slate-200">
                <th className="text-left pb-3 font-semibold text-slate-500 min-w-56">Fitur</th>
                {PERM_LABELS.map((label) => (
                  <th key={label} className="pb-3 px-2 text-xs font-bold text-slate-400 tracking-wider text-center min-w-20">
                    {label}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {permissionMatrix.map(([group, rows]) => (
                <>
                  <tr key={group} className="bg-slate-50/80">
                    <td colSpan={6} className="py-2.5 px-3">
                      <span className="text-xs font-bold text-slate-600 uppercase tracking-wider">{group}</span>
                    </td>
                  </tr>
                  {rows.map(([label], rowIdx) => {
                    const rowPerms = perms[group]?.slice(rowIdx * 5, rowIdx * 5 + 5) ?? [false, false, false, false, false];
                    const hasAny = rowPerms.some(Boolean);
                    return (
                      <tr key={`${group}-${label}`} className="border-b border-slate-100">
                        <td className="py-3.5 px-3">
                          <div className="flex items-center gap-2.5">
                            <span className={`w-1.5 h-1.5 rounded-full shrink-0 ${hasAny ? "bg-blue-500" : "bg-slate-300"}`} />
                            <span className="text-sm text-slate-700">{label}</span>
                          </div>
                        </td>
                        {PERM_LABELS.map((_, colIdx) => (
                          <td key={colIdx} className="py-3.5 px-2 text-center">
                            <PermCheckbox
                              checked={rowPerms[colIdx] ?? false}
                              onToggle={() => togglePerm(group, rowIdx * 5 + colIdx)}
                            />
                          </td>
                        ))}
                      </tr>
                    );
                  })}
                </>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
