import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import { ProductCategory } from "@/lib/enums"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const formatTime = (seconds: number) => {
  const mins = Math.floor(seconds / 60)
  const secs = seconds % 60
  return `${mins}:${secs.toString().padStart(2, '0')}`
}

export const toBase64 = async (file: File) => {
  const buffer = await file.arrayBuffer()
  return Buffer.from(buffer).toString("base64")
}

export const SATUAN = {
  produk: [
    { id: "g", label: "Gram (g)" },
    { id: "kg", label: "Kilogram (kg)" },
    { id: "ml", label: "Mililiter (ml)" },
    { id: "l", label: "Liter (l)" },
    { id: "pcs", label: "Pieces (pcs)" },
    { id: "lusin", label: "Lusin" },
  ],
  
  bbb: ["Kg", "Gram", "Liter", "ml", "Pcs", "Lembar", "Meter", "Sak", "Ikat"],
  btkl: ["Orang/Hari", "Orang/Jam", "Orang/Bulan", "Borongan", "Pcs"],
  packaging: ["Pcs", "Box", "Pack", "Roll", "Lusin", "Dus", "Lembar"],
  bop_var: ["kWh", "m3", "Tabung", "Liter", "Jam", "Hari", "Bulan", "Pcs"],
  bop_fix: ["Bulan", "Tahun", "Hari", "Paket"],
  Produksi: ["Kg", "Gram", "Liter", "ml", "Pcs", "Box", "Pack", "Lusin", "Karton", "Botol", "Porsi", "Cup"],
}

export const CATEGORY_OPTIONS: { id: ProductCategory ; label: string }[] = [
  { id: "fnb", label: "Makanan & Minuman" },
  { id: "cosmetic", label: "Kosmetik" },
  { id: "pharmaceutical", label: "Farmasi" },
]

export const CERT_TYPES = ["bpom", "pirt", "halal", "coa"] as const

export const ALLERGEN_OPTIONS = ["Susu", "Kacang Tanah", "Telur", "Gandum", "Ikan", "Udang", "Ayam"]

// format NPWP: XX.XXX.XXX.X-XXX.XXX
export const formatNpwp = (value: string) => {
  const digits = value.replace(/\D/g, "").slice(0, 15)
  const parts = [
    digits.slice(0, 2),
    digits.slice(2, 5),
    digits.slice(5, 8),
    digits.slice(8, 9),
    digits.slice(9, 12),
    digits.slice(12, 15),
  ]
  let result = parts[0]
  if (parts[1]) result += "." + parts[1]
  if (parts[2]) result += "." + parts[2]
  if (parts[3]) result += "." + parts[3]
  if (parts[4]) result += "-" + parts[4]
  if (parts[5]) result += "." + parts[5]
  return result
}