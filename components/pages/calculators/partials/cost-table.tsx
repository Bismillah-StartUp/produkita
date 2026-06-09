"use client";

import { useState } from "react";
import { Plus, Trash2, Pencil, Check, X as XIcon } from "lucide-react";
import { CostItem } from "../hooks/use-hpp-calculator";
import { formatIDR } from "@/lib/format-currency";

interface CostTableProps {
  title: string;
  description: string;
  items: CostItem[];
  on_add: () => void;
  on_remove: (id: string) => void;
  on_update: (
    id: string,
    field: keyof CostItem,
    value: string | number,
  ) => void;
  stepNumber?: string | number;
}

export default function CostTable({
  title,
  description,
  items,
  on_add,
  on_remove,
  on_update,
}: CostTableProps) {
  const total = items.reduce(
    (sum, item) => sum + (Number(item.subtotal) || 0),
    0,
  );

  return (
    <div className="mb-6 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
      <div className="flex flex-col items-start justify-between border-b border-slate-100 bg-white px-5 py-3 sm:flex-row sm:items-center sm:py-3.5 xl:px-6">
        <div className="flex items-center gap-3.5">
          <div className="flex flex-col gap-0.5">
            <h3 className="text-[15px] font-bold text-slate-800">{title}</h3>
            <p className="text-[11.5px] text-slate-400">{description}</p>
          </div>
        </div>

        <div className="mt-3 flex items-center gap-4 sm:mt-0">
          <span className="text-[15px] font-bold text-blue-600">
            {formatIDR(total)}
          </span>
          <button
            onClick={on_add}
            className="flex h-8 items-center gap-1.5 rounded-lg bg-blue-600 px-3.5 text-[13px] font-semibold text-white transition-colors hover:bg-blue-700"
          >
            <Plus className="h-3.5 w-3.5" strokeWidth={3} /> Tambah Data
          </button>
        </div>
      </div>

      <div className="overflow-x-auto w-full">
        <table className="w-full text-left">
          <thead className="bg-[#F8FAFC]">
            <tr>
              <th className="px-5 py-2 text-[11px] font-bold tracking-wider text-slate-400 xl:px-6">
                Nama Item
              </th>
              <th className="px-5 py-2 text-[11px] font-bold tracking-wider text-slate-400 xl:px-6 w-24">
                Satuan
              </th>
              <th className="px-5 py-2 text-[11px] font-bold tracking-wider text-slate-400 xl:px-6 w-28">
                Jumlah
              </th>
              <th className="px-5 py-2 text-[11px] font-bold tracking-wider text-slate-400 xl:px-6 w-36">
                Harga Satuan
              </th>
              <th className="px-5 py-2 text-[11px] font-bold tracking-wider text-slate-400 xl:px-6 w-36">
                SubTotal
              </th>
              <th className="px-5 py-2 text-center text-[11px] font-bold tracking-wider text-slate-400 xl:px-6 w-24">
                Aksi
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 bg-white">
            {items.length === 0 ? (
              <tr>
                <td
                  colSpan={7}
                  className="py-10 text-center text-[13px] font-medium italic text-slate-400"
                >
                  Belum ada data ditambahkan. Klik{" "}
                  <span className="font-bold text-blue-600">Tambah Data</span>{" "}
                  untuk memulai.
                </td>
              </tr>
            ) : (
              items.map((item) => (
                <EditableRow
                  key={item.id}
                  item={item}
                  on_remove={on_remove}
                  on_update={on_update}
                />
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Footer Tabel */}
      {/* {items.length > 0 && (
        <div className="flex items-center justify-between border-t border-slate-100 bg-white px-5 py-3 xl:px-6">
          <span className="text-[13px] font-semibold text-slate-400">
            Total {title}
          </span>
          <span className="text-[15px] font-bold text-blue-600">
            {formatIDR(total)}
          </span>
        </div>
      )} */}
    </div>
  );
}

function EditableRow({
  item,
  on_remove,
  on_update,
}: {
  item: CostItem;
  on_remove: (id: string) => void;
  on_update: (
    id: string,
    field: keyof CostItem,
    value: string | number,
  ) => void;
}) {
  const [isNewRow] = useState(
    !item.name && !item.quantity && !item.price_per_unit,
  );

  const [isEditing, setIsEditing] = useState(isNewRow);

  const [localData, setLocalData] = useState<{
    name: string;
    unit: string;
    quantity: number | string;
    price_per_unit: number | string;
  }>({
    name: item.name || "",
    unit: item.unit || "",
    quantity: item.quantity === 0 ? "" : item.quantity,
    price_per_unit: item.price_per_unit === 0 ? "" : item.price_per_unit,
  });

  const handleSave = () => {
    on_update(item.id, "name", localData.name);
    on_update(item.id, "unit", localData.unit);
    on_update(item.id, "quantity", Number(localData.quantity) || 0);
    on_update(item.id, "price_per_unit", Number(localData.price_per_unit) || 0);
    setIsEditing(false);
  };

  const handleCancel = () => {
    if (isNewRow) {
      on_remove(item.id);
    } else {
      setLocalData({
        name: item.name,
        unit: item.unit,
        quantity: item.quantity === 0 ? "" : item.quantity,
        price_per_unit: item.price_per_unit === 0 ? "" : item.price_per_unit,
      });
      setIsEditing(false);
    }
  };

  if (isEditing) {
    const dynamicSubtotal =
      (Number(localData.quantity) || 0) *
      (Number(localData.price_per_unit) || 0);

    return (
      <tr className="bg-blue-50/30 transition-colors">
        <td className="px-5 py-2.5 xl:px-6">
          <input
            type="text"
            value={localData.name}
            onChange={(e) =>
              setLocalData({ ...localData, name: e.target.value })
            }
            placeholder="Nama bahan..."
            className="h-8 w-full rounded-md border border-slate-200 px-3 text-[13px] focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
            autoFocus={isNewRow}
          />
        </td>
        <td className="px-5 py-2.5 xl:px-6">
          <input
            type="text"
            value={localData.unit}
            onChange={(e) =>
              setLocalData({ ...localData, unit: e.target.value })
            }
            placeholder="Pcs/Kg"
            className="h-8 w-full rounded-md border border-slate-200 px-3 text-[13px] focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
          />
        </td>
        <td className="px-5 py-2.5 xl:px-6">
          <input
            type="number"
            value={localData.quantity}
            onChange={(e) =>
              setLocalData({ ...localData, quantity: e.target.value })
            }
            placeholder="0"
            className="h-8 w-full rounded-md border border-slate-200 px-3 text-[13px] focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
          />
        </td>
        <td className="px-5 py-2.5 xl:px-6">
          <input
            type="number"
            value={localData.price_per_unit}
            onChange={(e) =>
              setLocalData({ ...localData, price_per_unit: e.target.value })
            }
            placeholder="0"
            className="h-8 w-full rounded-md border border-slate-200 px-3 text-[13px] focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
          />
        </td>
        <td className="px-5 py-2.5 text-[13px] font-bold text-blue-600 xl:px-6">
          {formatIDR(Number(dynamicSubtotal) || 0)}
        </td>
        <td className="px-5 py-2.5 xl:px-6">
          <div className="flex items-center justify-center gap-3">
            <button
              onClick={handleSave}
              className="flex h-7 w-7 items-center justify-center rounded-md bg-green-600 text-white transition-colors hover:bg-green-700"
              title="Simpan"
            >
              <Check className="h-4 w-4" strokeWidth={3} />
            </button>
            <button
              onClick={handleCancel}
              className="flex h-7 w-7 items-center justify-center rounded-md bg-red-600 text-white transition-colors hover:bg-red-700"
              title="Batal"
            >
              <XIcon className="h-4 w-4" strokeWidth={3} />
            </button>
          </div>
        </td>
      </tr>
    );
  }

  return (
    <tr className="transition-colors hover:bg-slate-50/50">
      <td className="px-5 py-2.5 text-[13px] font-bold text-slate-800 xl:px-6">
        {item.name}
      </td>
      <td className="px-5 py-2.5 text-[13px] text-slate-500 xl:px-6">
        {item.unit}
      </td>
      <td className="px-5 py-2.5 text-[13px] text-slate-500 xl:px-6">
        {item.quantity}
      </td>
      <td className="px-5 py-2.5 text-[13px] text-slate-500 xl:px-6">
        {formatIDR(Number(item.price_per_unit) || 0)}
      </td>
      <td className="px-5 py-2.5 text-[13px] font-bold text-blue-600 xl:px-6">
        {formatIDR(Number(item.subtotal) || 0)}
      </td>
      <td className="px-5 py-2.5 xl:px-6">
        <div className="flex items-center justify-center gap-3.5">
          <button
            onClick={() => setIsEditing(true)}
            className="flex h-7 w-7 items-center justify-center rounded-md  bg-blue-50 text-[#1659F4] transition-colors hover:bg-[#EFF6FF] hover:text-[#1659F4]"
            title="Edit"
          >
            <Pencil className="h-4 w-4" />
          </button>
          <button
            onClick={() => on_remove(item.id)}
            className="flex h-7 w-7 items-center justify-center rounded-md bg-red-50 text-[#EF4444] transition-colors hover:bg-red-50 hover:text-red-600"
            title="Hapus"
          >
            <Trash2 className="h-4 w-4" />
          </button>
        </div>
      </td>
    </tr>
  );
}
