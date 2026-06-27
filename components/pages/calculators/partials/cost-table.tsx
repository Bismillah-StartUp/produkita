"use client"

import { useState } from "react"
import { Plus, Trash2, Pencil, Check, X as XIcon, ChevronDown } from "lucide-react"
import { CostItem } from "@/hooks/useHppCalculator"
import { formatIDR } from "@/lib/format-currency"

interface CostTableProps {
  title: string
  description: string
  items: CostItem[]
  on_add: () => void
  on_remove: (id: string) => void
  on_update: (id: string, field: keyof CostItem, value: string | number) => void
  stepNumber?: string | number
  disabled?: boolean
  badge?: React.ReactNode
  unitOptions?: string[]
}

export default function CostTable({
  title,
  description,
  items,
  on_add,
  on_remove,
  on_update,
  disabled = false,
  badge,
  unitOptions,
}: CostTableProps) {
  const total = items.reduce((sum, item) => sum + (Number(item.subtotal) || 0), 0)

  return (
    <div className="mb-6 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
      <div className="flex flex-col items-start justify-between border-b border-slate-100 bg-white px-5 py-3 sm:flex-row sm:items-center sm:py-3.5 xl:px-6">
        <div className="flex items-center gap-3.5">
          <div className="flex flex-col gap-0.5">
            <h3
              className={`flex items-center gap-2 text-[15px] font-bold ${disabled ? "text-slate-400" : "text-slate-800"}`}
            >
              {title}
              {badge && badge}
            </h3>
            <p className={`text-[11.5px] ${disabled ? "text-slate-300" : "text-slate-400"}`}>{description}</p>
          </div>
        </div>

        <div className="mt-3 flex items-center gap-4 sm:mt-0">
          <span className={`text-[15px] font-bold ${disabled ? "text-slate-400" : "text-blue-600"}`}>
            {formatIDR(total)}
          </span>
          <button
            onClick={on_add}
            disabled={disabled}
            className={`flex h-8 items-center gap-1.5 rounded-lg px-3.5 text-[13px] font-semibold transition-colors ${
              disabled ? "cursor-not-allowed bg-slate-200 text-slate-400" : "bg-blue-600 text-white hover:bg-blue-700"
            }`}
          >
            <Plus className="h-3.5 w-3.5" strokeWidth={3} /> Tambah Data
          </button>
        </div>
      </div>

      <div className="w-full overflow-x-auto">
        <table className={`w-full text-left ${disabled ? "pointer-events-none grayscale opacity-60" : ""}`}>
          <thead className="bg-[#F8FAFC]">
            <tr>
              <th className="px-5 py-2 text-[11px] font-bold tracking-wider text-slate-400 xl:px-6">Nama Item</th>
              <th className="w-32 px-5 py-2 text-[11px] font-bold tracking-wider text-slate-400 xl:px-6">Satuan</th>
              <th className="w-28 px-5 py-2 text-[11px] font-bold tracking-wider text-slate-400 xl:px-6">Jumlah</th>
              <th className="w-36 px-5 py-2 text-[11px] font-bold tracking-wider text-slate-400 xl:px-6">Harga Satuan</th>
              <th className="w-36 px-5 py-2 text-[11px] font-bold tracking-wider text-slate-400 xl:px-6">SubTotal</th>
              <th className="w-24 px-5 py-2 text-center text-[11px] font-bold tracking-wider text-slate-400 xl:px-6">
                Aksi
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 bg-white">
            {items.length === 0 ? (
              <tr>
                <td colSpan={7} className="py-10 text-center text-[13px] font-medium italic text-slate-400">
                  Belum ada data ditambahkan. Klik <span className="font-bold text-blue-600">Tambah Data</span> untuk
                  memulai.
                </td>
              </tr>
            ) : (
              items.map((item) => (
                <EditableRow
                  key={item.id}
                  item={item}
                  on_remove={on_remove}
                  on_update={on_update}
                  disabled={disabled}
                  unitOptions={unitOptions}
                />
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}

function EditableRow({
  item,
  on_remove,
  on_update,
  disabled = false,
  unitOptions,
}: {
  item: CostItem
  on_remove: (id: string) => void
  on_update: (id: string, field: keyof CostItem, value: string | number) => void
  disabled?: boolean
  unitOptions?: string[]
}) {
  const [isNewRow] = useState(!item.name && !item.quantity && !item.price_per_unit)

  const [isEditing, setIsEditing] = useState(isNewRow)

  const [localData, setLocalData] = useState<{
    name: string
    unit: string
    quantity: number | string
    price_per_unit: number | string
  }>({
    name: item.name || "",
    unit: item.unit || "",
    quantity: item.quantity === 0 ? "" : item.quantity,
    price_per_unit: item.price_per_unit === 0 ? "" : item.price_per_unit,
  })

  const handleSave = () => {
    if (!localData.name.trim()) return
    if (!localData.unit) return
    if (!Number(localData.quantity) || Number(localData.quantity) <= 0) return
    if (!Number(localData.price_per_unit) || Number(localData.price_per_unit) <= 0) return

    on_update(item.id, "name", localData.name)
    on_update(item.id, "unit", localData.unit)
    on_update(item.id, "quantity", Number(localData.quantity) || 0)
    on_update(item.id, "price_per_unit", Number(localData.price_per_unit) || 0)
    setIsEditing(false)
  }

  const handleCancel = () => {
    if (isNewRow) {
      on_remove(item.id)
    } else {
      setLocalData({
        name: item.name,
        unit: item.unit,
        quantity: item.quantity === 0 ? "" : item.quantity,
        price_per_unit: item.price_per_unit === 0 ? "" : item.price_per_unit,
      })
      setIsEditing(false)
    }
  }

  if (isEditing) {
    const dynamicSubtotal = (Number(localData.quantity) || 0) * (Number(localData.price_per_unit) || 0)

    return (
      <tr className="bg-blue-50/30 transition-colors">
        <td className="px-5 py-2.5 xl:px-6">
          <input
            type="text"
            value={localData.name}
            onChange={(e) => setLocalData({ ...localData, name: e.target.value })}
            disabled={disabled}
            placeholder="Nama bahan..."
            className="h-8 w-full rounded-md border border-slate-200 px-3 text-[13px] focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 disabled:bg-slate-100"
            autoFocus={isNewRow}
          />
        </td>

        <td className="px-5 py-2.5 xl:px-6">
          {unitOptions && unitOptions.length > 0 ? (
            <div className="relative w-full min-w-22.5">
              <select
                value={localData.unit}
                onChange={(e) => setLocalData({ ...localData, unit: e.target.value })}
                disabled={disabled}
                className="h-8 w-full appearance-none overflow-hidden text-ellipsis rounded-md border border-slate-200 bg-white pl-2 pr-6 text-[13px] text-slate-700 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 disabled:bg-slate-100 disabled:text-slate-400"
              >
                <option value="" disabled>
                  Pilih...
                </option>
                {unitOptions.map((opt) => (
                  <option key={opt} value={opt}>
                    {opt}
                  </option>
                ))}
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-1.5">
                <ChevronDown className="h-3.5 w-3.5 text-slate-400" />
              </div>
            </div>
          ) : (
            <input
              type="text"
              value={localData.unit}
              onChange={(e) => setLocalData({ ...localData, unit: e.target.value })}
              disabled={disabled}
              placeholder="Pcs/Kg"
              className="h-8 w-full rounded-md border border-slate-200 px-3 text-[13px] focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 disabled:bg-slate-100"
            />
          )}
        </td>

        <td className="px-5 py-2.5 xl:px-6">
          <input
            type="text"
            inputMode="numeric"
            value={localData.quantity}
            onChange={(e) => {
              const val = e.target.value.replace(/[^0-9.]/g, "")
              setLocalData({ ...localData, quantity: val })
            }}
            disabled={disabled}
            placeholder="0"
            className="h-8 w-full rounded-md border border-slate-200 px-3 text-[13px] focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 disabled:bg-slate-100"
          />
        </td>
        <td className="px-5 py-2.5 xl:px-6">
          <input
            type="text"
            inputMode="numeric"
            value={localData.price_per_unit}
            onChange={(e) => {
              const val = e.target.value.replace(/[^0-9.]/g, "")
              setLocalData({ ...localData, price_per_unit: val })
            }}
            disabled={disabled}
            placeholder="0"
            className="h-8 w-full rounded-md border border-slate-200 px-3 text-[13px] focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 disabled:bg-slate-100"
          />
        </td>
        <td className="px-5 py-2.5 text-[13px] font-bold text-blue-600 xl:px-6">
          {formatIDR(Number(dynamicSubtotal) || 0)}
        </td>
        <td className="px-5 py-2.5 xl:px-6">
          <div className="flex items-center justify-center gap-3">
            <button
              onClick={handleSave}
              disabled={disabled}
              className="flex h-7 w-7 items-center justify-center rounded-md bg-green-600 text-white transition-colors hover:bg-green-700 disabled:bg-slate-200 disabled:text-slate-400"
              title="Simpan"
            >
              <Check className="h-4 w-4" strokeWidth={3} />
            </button>
            <button
              onClick={handleCancel}
              disabled={disabled}
              className="flex h-7 w-7 items-center justify-center rounded-md bg-red-600 text-white transition-colors hover:bg-red-700 disabled:bg-slate-200 disabled:text-slate-400"
              title="Batal"
            >
              <XIcon className="h-4 w-4" strokeWidth={3} />
            </button>
          </div>
        </td>
      </tr>
    )
  }

  return (
    <tr className="transition-colors hover:bg-slate-50/50">
      <td className="px-5 py-2.5 text-[13px] font-bold text-slate-800 xl:px-6">{item.name}</td>
      <td className="px-5 py-2.5 text-[13px] text-slate-500 xl:px-6">{item.unit}</td>
      <td className="px-5 py-2.5 text-[13px] text-slate-500 xl:px-6">{item.quantity}</td>
      <td className="px-5 py-2.5 text-[13px] text-slate-500 xl:px-6">{formatIDR(Number(item.price_per_unit) || 0)}</td>
      <td className="px-5 py-2.5 text-[13px] font-bold text-blue-600 xl:px-6">{formatIDR(Number(item.subtotal) || 0)}</td>
      <td className="px-5 py-2.5 xl:px-6">
        <div className="flex items-center justify-center gap-3.5">
          <button
            onClick={() => setIsEditing(true)}
            disabled={disabled}
            className={`flex h-7 w-7 items-center justify-center rounded-md transition-colors ${
              disabled ? "bg-slate-100 text-slate-300" : "bg-blue-50 text-[#1659F4] hover:bg-[#EFF6FF] hover:text-[#1659F4]"
            }`}
            title="Edit"
          >
            <Pencil className="h-4 w-4" />
          </button>
          <button
            onClick={() => on_remove(item.id)}
            disabled={disabled}
            className={`flex h-7 w-7 items-center justify-center rounded-md transition-colors ${
              disabled ? "bg-slate-100 text-slate-300" : "bg-red-50 text-[#EF4444] hover:bg-red-50 hover:text-red-600"
            }`}
            title="Hapus"
          >
            <Trash2 className="h-4 w-4" />
          </button>
        </div>
      </td>
    </tr>
  )
}
