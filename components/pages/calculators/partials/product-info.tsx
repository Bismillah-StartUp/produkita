interface ProductInfoProps {
  product_name: string
  production_qty: number
  on_name_change: (val: string) => void
  on_qty_change: (val: number) => void
}

export default function ProductInfo({ product_name, production_qty, on_name_change, on_qty_change }: ProductInfoProps) {
  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
      <div className="space-y-2">
        <label className="text-sm font-medium text-slate-700">Nama Produk</label>
        <input
          type="text"
          value={product_name}
          onChange={(e) => on_name_change(e.target.value)}
          className="w-full rounded-lg border border-slate-200 p-2 text-sm focus:border-blue-500 focus:outline-none"
          placeholder="Contoh: Keripik Singkong"
        />
      </div>
      <div className="space-y-2">
        <label className="text-sm font-medium text-slate-700">Jumlah Produksi (Unit)</label>
        <input
          type="number"
          value={production_qty}
          onChange={(e) => on_qty_change(Number(e.target.value))}
          className="w-full rounded-lg border border-slate-200 p-2 text-sm focus:border-blue-500 focus:outline-none"
        />
      </div>
    </div>
  )
}
