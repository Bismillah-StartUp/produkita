import { formatIDR } from "@/lib/format-currency";
interface MarginSelectorProps {
  margin_percentage: number;
  on_change: (val: number) => void;
  hpp_per_unit: number;
  production_unit: string;
}

export default function MarginSelector({
  margin_percentage,
  on_change,
  hpp_per_unit,
  production_unit,
}: MarginSelectorProps) {
  const is_custom = margin_percentage !== 30 && margin_percentage !== 50;
  const unit = production_unit || "unit";

  const profit_30 = hpp_per_unit * 0.3;
  const price_30 = hpp_per_unit + profit_30;

  const profit_50 = hpp_per_unit * 0.5;
  const price_50 = hpp_per_unit + profit_50;

  const profit_custom = hpp_per_unit * (margin_percentage / 100);
  const price_custom = hpp_per_unit + profit_custom;

  return (
    <div className="w-full">
      <div className="mb-6 flex items-center gap-3">
        <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-blue-600 text-sm font-bold text-white">
          4
        </div>
        <h2 className="text-lg font-bold text-slate-800">
          Target Margin Keuntungan
        </h2>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        <div
          onClick={() => on_change(30)}
          className={`relative flex cursor-pointer flex-col justify-between rounded-2xl border p-5 text-left transition-all ${
            margin_percentage === 30
              ? "border-blue-600 bg-blue-600 shadow-lg shadow-blue-600/20"
              : "border-slate-200 bg-white hover:border-blue-300"
          }`}
        >
          <div>
            <div className="flex w-full items-start justify-between">
              <span
                className={`rounded-full px-3 py-1 text-xs font-semibold ${
                  margin_percentage === 30
                    ? "bg-white/20 text-white"
                    : "bg-blue-50 text-blue-600"
                }`}
              >
                Standar UMKM
              </span>
              {margin_percentage === 30 ? (
                <div className="flex h-5.5 w-5.5 shrink-0 items-center justify-center rounded-full border-2 border-white">
                  <div className="h-2.5 w-2.5 rounded-full bg-white"></div>
                </div>
              ) : (
                <div className="h-5.5 w-5.5 shrink-0 rounded-full border-2 border-slate-200"></div>
              )}
            </div>

            <div className="mt-5 flex items-baseline gap-1">
              <span
                className={`text-[40px] font-black leading-none tracking-tight ${
                  margin_percentage === 30 ? "text-white" : "text-blue-600"
                }`}
              >
                30
              </span>
              <span
                className={`text-2xl font-bold ${margin_percentage === 30 ? "text-white" : "text-blue-600"}`}
              >
                %
              </span>
            </div>

            <p
              className={`mt-2 text-[13px] leading-relaxed ${margin_percentage === 30 ? "text-blue-100" : "text-slate-500"}`}
            >
              Umum digunakan UMKM makanan
            </p>
          </div>

          <div
            className={`mt-6 w-full rounded-xl border p-4 ${
              margin_percentage === 30
                ? "border-white/10 bg-white/10"
                : "border-slate-100 bg-slate-50"
            }`}
          >
            <p
              className={`text-[11px] font-medium ${margin_percentage === 30 ? "text-blue-100" : "text-slate-400"}`}
            >
              Harga Jual / {unit}
            </p>
            <p
              className={`mt-1 text-xl font-bold ${margin_percentage === 30 ? "text-white" : "text-slate-900"}`}
            >
              {formatIDR(price_30)}
            </p>
            <p
              className={`mt-1 text-[11px] font-medium ${margin_percentage === 30 ? "text-blue-100" : "text-green-600"}`}
            >
              Untung {formatIDR(profit_30)} / {unit}
            </p>
          </div>
        </div>

        <div
          onClick={() => on_change(50)}
          className={`relative flex cursor-pointer flex-col justify-between rounded-2xl border p-5 text-left transition-all ${
            margin_percentage === 50
              ? "border-blue-600 bg-blue-600 shadow-lg shadow-blue-600/20"
              : "border-slate-200 bg-white hover:border-blue-300"
          }`}
        >
          <div>
            <div className="flex w-full items-start justify-between">
              <span
                className={`rounded-full border px-3 py-1 text-xs font-semibold ${
                  margin_percentage === 50
                    ? "border-transparent bg-white/20 text-white"
                    : "border-blue-200 bg-white text-blue-600"
                }`}
              >
                Margin Optimal
              </span>
              {margin_percentage === 50 ? (
                <div className="flex h-5.5 w-5.5 shrink-0 items-center justify-center rounded-full border-2 border-white">
                  <div className="h-2.5 w-2.5 rounded-full bg-white"></div>
                </div>
              ) : (
                <div className="h-5.5 w-5.5 shrink-0 rounded-full border-2 border-slate-200"></div>
              )}
            </div>

            <div className="mt-5 flex items-baseline gap-1">
              <span
                className={`text-[40px] font-black leading-none tracking-tight ${
                  margin_percentage === 50 ? "text-white" : "text-blue-600"
                }`}
              >
                50
              </span>
              <span
                className={`text-2xl font-bold ${margin_percentage === 50 ? "text-white" : "text-blue-600"}`}
              >
                %
              </span>
            </div>

            <p
              className={`mt-2 text-[13px] leading-relaxed ${margin_percentage === 50 ? "text-blue-100" : "text-slate-500"}`}
            >
              Ideal produk olahan premium
            </p>
          </div>
          <div
            className={`mt-6 w-full rounded-xl border p-4 ${
              margin_percentage === 50
                ? "border-white/10 bg-white/10"
                : "border-slate-100 bg-slate-50"
            }`}
          >
            <p
              className={`text-[11px] font-medium ${margin_percentage === 50 ? "text-blue-100" : "text-slate-400"}`}
            >
              Harga Jual / {unit}
            </p>
            <p
              className={`mt-1 text-xl font-bold ${margin_percentage === 50 ? "text-white" : "text-slate-900"}`}
            >
              {formatIDR(price_50)}
            </p>
            <p
              className={`mt-1 text-[11px] font-medium ${margin_percentage === 50 ? "text-blue-100" : "text-green-600"}`}
            >
              Untung {formatIDR(profit_50)} / {unit}
            </p>
          </div>
        </div>

        <div
          onClick={() => {
            if (margin_percentage === 30 || margin_percentage === 50) {
              on_change(0);
            }
            setTimeout(() => {
              const input = document.getElementById(
                "custom_margin_input",
              ) as HTMLInputElement;
              if (input) {
                input.focus();
                input.select();
              }
            }, 10);
          }}
          className={`relative flex cursor-pointer flex-col justify-between rounded-2xl border-2 p-5 transition-all ${
            is_custom
              ? "border-blue-400 border-solid bg-blue-50/50 shadow-md"
              : "border-dashed border-slate-200 bg-white hover:border-blue-300"
          }`}
        >
          <div>
            <div className="flex w-full items-start justify-between">
              <span
                className={`rounded-full px-3 py-1 text-xs font-semibold transition-colors ${
                  is_custom
                    ? "bg-blue-100 text-blue-700"
                    : "bg-slate-100 text-slate-500"
                }`}
              >
                Custom
              </span>
              {is_custom ? (
                <div className="flex h-5.5 w-5.5 shrink-0 items-center justify-center rounded-full border-2 border-blue-600">
                  <div className="h-2.5 w-2.5 rounded-full bg-blue-600"></div>
                </div>
              ) : (
                <div className="h-5.5 w-5.5 shrink-0 rounded-full border-2 border-slate-200"></div>
              )}
            </div>

            <div className="mt-5 flex w-full items-center gap-2">
              <input
                id="custom_margin_input"
                type="number"
                value={
                  margin_percentage === 0 && is_custom ? "" : margin_percentage
                }
                onChange={(e) => on_change(Number(e.target.value) || 0)}
                className={`w-full rounded-xl border py-2 text-center text-[40px] font-black leading-none focus:outline-none focus:ring-2 transition-all [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none ${
                  is_custom
                    ? "border-blue-200 bg-white text-blue-600 shadow-sm focus:border-blue-400 focus:ring-blue-400"
                    : "border-slate-200 bg-transparent text-blue-600 placeholder-blue-200 hover:border-blue-300"
                }`}
                placeholder="0"
              />
              <span className="text-3xl font-black text-blue-600">%</span>
            </div>

            <p
              className={`mt-2 text-center text-[11px] leading-relaxed transition-colors ${is_custom ? "text-blue-600/70" : "text-slate-400"}`}
            >
              Ketik angka untuk mengubah
            </p>
          </div>

          <div
            className={`mt-6 w-full rounded-xl border p-4 transition-all ${
              is_custom
                ? "border-blue-100 bg-white shadow-sm"
                : "border-slate-100 bg-slate-50"
            }`}
          >
            <p
              className={`text-[11px] font-medium ${is_custom ? "text-slate-500" : "text-slate-400"}`}
            >
              Harga Jual / {unit}
            </p>
            <p className="mt-1 text-xl font-bold text-slate-900">
              {formatIDR(price_custom)}
            </p>
            <p className="mt-1 text-[11px] font-medium text-green-600">
              Untung {formatIDR(profit_custom)} / {unit}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
