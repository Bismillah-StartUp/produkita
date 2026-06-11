import CostTable from "./cost-table"
import { CostItem } from "@/hooks/useHppCalculator"
import { SATUAN } from "@/lib/utils"

interface CostSectionProps {
  state: {
    calculation_method: "full" | "variable"
    bbb_items: CostItem[]
    btkl_items: CostItem[]
    packaging_items: CostItem[]
    bop_var_items: CostItem[]
    bop_fix_items: CostItem[]
  }
  actions: {
    add_item: (set_state: any) => void
    remove_item: (id: string, set_state: any) => void
    update_item: (id: string, field: keyof CostItem, value: string | number, set_state: any) => void
    set_bbb_items: any
    set_btkl_items: any
    set_packaging_items: any
    set_bop_var_items: any
    set_bop_fix_items: any
  }
}

export default function CostSection({ state, actions }: CostSectionProps) {
  return (
    <div className="w-full">
      <div className="mb-6 flex items-center gap-3">
        <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-blue-600 text-sm font-bold text-white">
          3
        </div>
        <h2 className="text-lg font-bold text-slate-800">Input Komponen Biaya</h2>
      </div>

      <div className="space-y-6">
        <CostTable
          title="Biaya Bahan Baku Langsung (BBB)"
          description="Material utama pembentuk produk"
          items={state.bbb_items}
          on_add={() => actions.add_item(actions.set_bbb_items)}
          on_remove={(id) => actions.remove_item(id, actions.set_bbb_items)}
          on_update={(id, field, val) => actions.update_item(id, field, val, actions.set_bbb_items)}
          unitOptions={SATUAN.bbb}
        />

        <CostTable
          title="Biaya Tenaga Kerja Langsung (BTKL)"
          description="Upah pekerja yang terlibat langsung membuat produk."
          items={state.btkl_items}
          on_add={() => actions.add_item(actions.set_btkl_items)}
          on_remove={(id) => actions.remove_item(id, actions.set_btkl_items)}
          on_update={(id, field, val) => actions.update_item(id, field, val, actions.set_btkl_items)}
          unitOptions={SATUAN.btkl}
        />

        <CostTable
          title="Biaya Kemasan"
          description="Biaya untuk membungkus atau mengemas produk."
          items={state.packaging_items}
          on_add={() => actions.add_item(actions.set_packaging_items)}
          on_remove={(id) => actions.remove_item(id, actions.set_packaging_items)}
          on_update={(id, field, val) => actions.update_item(id, field, val, actions.set_packaging_items)}
          unitOptions={SATUAN.packaging}
        />

        <CostTable
          title="Biaya Overhead Pabrik (BOP) Variabel"
          description="Biaya pendukung yang berubah sesuai jumlah produksi (listrik, gas, air)."
          items={state.bop_var_items}
          on_add={() => actions.add_item(actions.set_bop_var_items)}
          on_remove={(id) => actions.remove_item(id, actions.set_bop_var_items)}
          on_update={(id, field, val) => actions.update_item(id, field, val, actions.set_bop_var_items)}
          unitOptions={SATUAN.bop_var}
        />

        <CostTable
          title="Biaya Overhead Pabrik (BOP) Tetap"
          description="Biaya yang tetap keluar berapapun produksinya (sewa tempat, penyusutan mesin)."
          items={state.bop_fix_items}
          on_add={() => actions.add_item(actions.set_bop_fix_items)}
          on_remove={(id) => actions.remove_item(id, actions.set_bop_fix_items)}
          on_update={(id, field, val) => actions.update_item(id, field, val, actions.set_bop_fix_items)}
          unitOptions={SATUAN.bop_fix}
          disabled={state.calculation_method === "variable"}
          badge={
            state.calculation_method === "variable" && (
              <span className="rounded-md bg-orange-100 px-2.5 py-0.5 text-[10px] font-extrabold tracking-wide text-orange-300">
                Period Cost — tidak masuk HPP
              </span>
            )
          }
        />
      </div>
    </div>
  )
}
