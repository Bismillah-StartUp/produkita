"use client";

import { useHppCalculator } from "@/hooks/useHppCalculator";
import MethodSelector from "./partials/method-selector";
import ProductInfo from "./partials/product-info";
import CostSection from "./partials/cost-section";
import MarginSelector from "./partials/margin-selector";
import SummaryResult from "./partials/summary-result";

export default function CalculatorsPage() {
  const { state, setters, actions, summary } = useHppCalculator();

  return (
    <div className="w-full p-6 sm:p-8 space-y-6 pb-20">
      <MethodSelector
        selected_method={state.calculation_method}
        on_change={setters.set_calculation_method}
      />

      <ProductInfo
        product_name={state.product_name}
        production_unit={state.production_unit}
        production_qty={state.production_qty}
        on_name_change={setters.set_product_name}
        on_unit_change={setters.set_production_unit}
        on_qty_change={setters.set_production_qty}
      />

      <CostSection state={state} actions={actions} />

      <MarginSelector
        margin_percentage={state.margin_percentage}
        on_change={setters.set_margin_percentage}
        hpp_per_unit={summary.hpp_per_unit}
        production_unit={state.production_unit}
      />

      <SummaryResult
        calculation_method={state.calculation_method}
        production_unit={state.production_unit}
        production_qty={state.production_qty}
        margin_percentage={state.margin_percentage}
        summary={summary}
      />
    </div>
  );
}
