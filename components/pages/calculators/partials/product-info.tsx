interface ProductInfoProps {
  product_name: string;
  production_unit: string;
  production_qty: number | "";
  on_name_change: (val: string) => void;
  on_unit_change: (val: string) => void;
  on_qty_change: (val: number | "") => void;
}

export default function ProductInfo({
  product_name,
  production_unit,
  production_qty,
  on_name_change,
  on_unit_change,
  on_qty_change,
}: ProductInfoProps) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
      <div className="mb-6 flex items-center gap-3">
        <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-blue-600 text-sm font-bold text-white">
          2
        </div>
        <h2 className="text-lg font-bold text-slate-800">Informasi Produk</h2>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        <div className="space-y-2">
          <label className="text-sm font-semibold text-slate-500">
            Nama Produk
          </label>
          <input
            type="text"
            value={product_name}
            onChange={(e) => on_name_change(e.target.value)}
            className="w-full rounded-xl border border-slate-200 px-4 py-2.5 text-sm font-medium text-slate-900 transition-colors focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
            placeholder="Contoh: Keju Mozarella"
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-semibold text-slate-500">
            Satuan Produksi
          </label>
          <input
            type="text"
            value={production_unit}
            onChange={(e) => on_unit_change(e.target.value)}
            className="w-full rounded-xl border border-slate-200 px-4 py-2.5 text-sm font-medium text-slate-900 transition-colors focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
            placeholder="Contoh: kg, pcs, box"
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-semibold text-slate-500">
            Jumlah Produksi
          </label>
          <input
            type="number"
            value={production_qty}
            onChange={(e) => {
              const val = e.target.value;
              on_qty_change(val === "" ? "" : Number(val));
            }}
            className="w-full rounded-xl border border-slate-200 px-4 py-2.5 text-sm font-medium text-slate-900 transition-colors focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
            placeholder="Contoh: 50"
          />
        </div>
      </div>
    </div>
  );
}
