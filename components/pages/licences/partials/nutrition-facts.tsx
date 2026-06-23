"use client";

import { AKG, calculateAKG } from "@/lib/nutrition";

interface NutritionFactsProps {
  productName?: string;
  servings?: number;
  calories?: number;
  fat?: number;
  saturatedFat?: number;
  carbs?: number;
  protein?: number;
  sodium?: number;
  sugar?: number;
  allergens?: string[];
  ingredients?: string;
}

export default function NutritionFacts({
  productName = "CIMORY FRESH MILK",
  servings = 1,
  calories = 150,
  fat = 8,
  saturatedFat = 5,
  carbs = 3,
  protein = 5,
  sodium = 40,
  sugar = 5,
  allergens = ["Kacang"],
  ingredients = "Susu segar murni (100%) — diperoleh langsung dari peternakan sapi Cimory di kawasan Puncak, Bogor. Tanpa bahan pengawet, tanpa pewarna tambahan, tanpa pemanis buatan.",
}: NutritionFactsProps) {
  const fatDaily = calculateAKG(fat, AKG.fat);
  const saturatedFatDaily = calculateAKG(saturatedFat, AKG.saturatedFat);
  const proteinDaily = calculateAKG(protein, AKG.protein);
  const carbsDaily = calculateAKG(carbs, AKG.carbs);
  const sugarDaily = calculateAKG(sugar, AKG.sugar);
  const sodiumDaily = calculateAKG(sodium, AKG.sodium);

  return (
    <div className="flex flex-col w-full">
      {/* Header Texts */}
      <div className="mb-5 lg:mb-8 -mt-2 lg:mt-0">
        <h4 className="text-blue-600 font-bold text-[10px] sm:text-xs lg:text-sm tracking-widest uppercase mb-0 lg:mb-2 leading-tight">
          {productName}
        </h4>
        <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-slate-900 leading-tight -mt-0.5 lg:mt-0">
          Nilai Gizi & Nutrisi
        </h2>
      </div>

      {/* Serving & Calories Box */}
      <div className="border border-slate-300 rounded-xl lg:rounded-2xl overflow-hidden mb-6 lg:mb-10 shadow-sm bg-white">
        <div className="grid grid-cols-2 divide-x divide-slate-300 border-b border-slate-300 bg-slate-50">
          <div className="p-3 lg:p-6 flex flex-col justify-center">
            <span className="text-[10px] lg:text-sm font-semibold text-slate-500 mb-0.5 lg:mb-2 uppercase">
              TAKARAN SAJI
            </span>
            <span className="text-[13px] sm:text-sm lg:text-lg font-bold text-slate-900">
              250 ml (1 kemasan)
            </span>
          </div>
          <div className="p-3 lg:p-6 flex flex-col justify-center items-end text-right">
            <span className="text-[10px] lg:text-sm font-semibold text-slate-500 mb-0.5 lg:mb-2 uppercase">
              SAJIAN PER KEMASAN
            </span>
            <span className="text-[13px] sm:text-sm lg:text-lg font-bold text-slate-900">
              {servings} sajian
            </span>
          </div>
        </div>
        <div className="p-3 lg:p-6 flex justify-between items-center">
          <span className="text-[13px] sm:text-sm lg:text-base font-medium text-slate-400">
            Kalori Per Sajian
          </span>
          <div className="flex items-baseline gap-1 lg:gap-1.5">
            <span className="text-xl sm:text-2xl lg:text-3xl font-bold text-blue-600">
              {calories}
            </span>
            <span className="text-[11px] sm:text-sm lg:text-base font-medium text-slate-400">
              kkal
            </span>
          </div>
        </div>
      </div>

      {/* Table & Disclaimer Box */}
      <div className="w-full mb-6 lg:mb-10 border border-slate-200 rounded-xl lg:rounded-2xl overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          {/* Removed min-w-[500px] to prevent horizontal scroll on mobile */}
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b-2 lg:border-b-[3px] border-slate-800">
                <th className="py-2.5 lg:py-4 pl-3 lg:pl-6 pr-2 lg:pr-4 font-bold text-slate-900 text-[11px] sm:text-xs lg:text-base">
                  Item
                </th>
                <th className="py-2.5 lg:py-4 px-2 lg:px-4 text-right font-bold text-slate-900 text-[11px] sm:text-xs lg:text-base w-16 sm:w-20 lg:w-32">
                  Value
                </th>
                <th className="py-2.5 lg:py-4 pr-3 lg:pr-6 pl-2 lg:pl-4 text-right font-bold text-slate-900 text-[11px] sm:text-xs lg:text-base w-14 sm:w-16 lg:w-28">
                  %AKG*
                </th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-slate-200">
                <td className="py-2.5 lg:py-4 pl-3 lg:pl-6 pr-2 lg:pr-4 text-[11px] sm:text-xs lg:text-base text-slate-900 font-medium">
                  Energi Total /Total energy
                </td>
                <td className="py-2.5 lg:py-4 px-2 lg:px-4 text-right text-[11px] sm:text-xs lg:text-base font-medium text-slate-900">
                  {calories}kkal
                </td>
                <td className="py-2.5 lg:py-4 pr-3 lg:pr-6 pl-2 lg:pl-4 text-right text-[11px] sm:text-xs lg:text-base text-slate-500">
                  8%
                </td>
              </tr>
              <tr className="border-b border-slate-200">
                <td className="py-2.5 lg:py-4 pl-3 lg:pl-6 pr-2 lg:pr-4 text-[11px] sm:text-xs lg:text-base text-slate-900 font-medium">
                  Lemak Total / Total Fat
                </td>
                <td className="py-2.5 lg:py-4 px-2 lg:px-4 text-right text-[11px] sm:text-xs lg:text-base font-semibold text-slate-900">
                  {fat}g
                </td>
                <td className="py-2.5 lg:py-4 pr-3 lg:pr-6 pl-2 lg:pl-4 text-right text-[11px] sm:text-xs lg:text-base text-slate-500">
                  {fatDaily}%
                </td>
              </tr>
              <tr className="border-b border-slate-200 bg-slate-50/50">
                <td className="py-2.5 lg:py-4 pl-6 lg:pl-10 pr-2 lg:pr-4 text-[11px] sm:text-xs lg:text-base text-slate-500">
                  Lemak Jenuh / Saturated Fat
                </td>
                <td className="py-2.5 lg:py-4 px-2 lg:px-4 text-right text-[11px] sm:text-xs lg:text-base text-slate-500">
                  {saturatedFat}g
                </td>
                <td className="py-2.5 lg:py-4 pr-3 lg:pr-6 pl-2 lg:pl-4 text-right text-[11px] sm:text-xs lg:text-base text-slate-500">
                  {saturatedFatDaily}%
                </td>
              </tr>
              <tr className="border-b border-slate-200">
                <td className="py-2.5 lg:py-4 pl-3 lg:pl-6 pr-2 lg:pr-4 text-[11px] sm:text-xs lg:text-base text-slate-900 font-medium">
                  Protein / Protein
                </td>
                <td className="py-2.5 lg:py-4 px-2 lg:px-4 text-right text-[11px] sm:text-xs lg:text-base font-semibold text-slate-900">
                  {protein}g
                </td>
                <td className="py-2.5 lg:py-4 pr-3 lg:pr-6 pl-2 lg:pl-4 text-right text-[11px] sm:text-xs lg:text-base text-slate-500">
                  {proteinDaily}%
                </td>
              </tr>
              <tr className="border-b border-slate-200">
                <td className="py-2.5 lg:py-4 pl-3 lg:pl-6 pr-2 lg:pr-4 text-[11px] sm:text-xs lg:text-base text-slate-900 font-medium">
                  Karbohidrat Total / Total Carbohydrate
                </td>
                <td className="py-2.5 lg:py-4 px-2 lg:px-4 text-right text-[11px] sm:text-xs lg:text-base font-semibold text-slate-900">
                  {carbs}g
                </td>
                <td className="py-2.5 lg:py-4 pr-3 lg:pr-6 pl-2 lg:pl-4 text-right text-[11px] sm:text-xs lg:text-base text-slate-500">
                  {carbsDaily}%
                </td>
              </tr>
              <tr className="border-b border-slate-200">
                <td className="py-2.5 lg:py-4 pl-3 lg:pl-6 pr-2 lg:pr-4 text-[11px] sm:text-xs lg:text-base text-slate-900 font-medium">
                  Gula / Sugar
                </td>
                <td className="py-2.5 lg:py-4 px-2 lg:px-4 text-right text-[11px] sm:text-xs lg:text-base font-semibold text-slate-900">
                  {sugar}g
                </td>
                <td className="py-2.5 lg:py-4 pr-3 lg:pr-6 pl-2 lg:pl-4 text-right text-[11px] sm:text-xs lg:text-base text-slate-500">
                  {sugarDaily}%
                </td>
              </tr>
              <tr className="border-b border-slate-200">
                <td className="py-2.5 lg:py-4 pl-3 lg:pl-6 pr-2 lg:pr-4 text-[11px] sm:text-xs lg:text-base text-slate-900 font-medium">
                  Garam (natrium) / Salt (sodium)
                </td>
                <td className="py-2.5 lg:py-4 px-2 lg:px-4 text-right text-[11px] sm:text-xs lg:text-base font-semibold text-slate-900">
                  {sodium}mg
                </td>
                <td className="py-2.5 lg:py-4 pr-3 lg:pr-6 pl-2 lg:pl-4 text-right text-[11px] sm:text-xs lg:text-base text-slate-500">
                  {sodiumDaily}%
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Disclaimer Box inside the same border */}
        <div className="p-2.5 lg:p-4 bg-blue-50/50 m-2 lg:m-3 rounded-lg border border-blue-100">
          <p className="text-[10px] lg:text-sm text-blue-500 leading-relaxed">
            * Persen AKG berdasarkan kebutuhan energi 2.150 kkal. Kebutuhan
            energi Anda mungkin lebih tinggi atau lebih rendah.
          </p>
        </div>
      </div>

      {/* Allergens */}
      {allergens && allergens.length > 0 && (
        <div className="mb-6 lg:mb-8">
          <h3 className="text-[10px] lg:text-sm font-bold tracking-[0.2em] text-slate-800 lg:text-slate-500 uppercase mb-3 lg:mb-4">
            INFORMASI ALERGEN
          </h3>
          <div className="flex flex-wrap gap-2">
            {allergens.map((allergen, idx) => (
              <span
                key={idx}
                className="px-3 lg:px-4 py-1 border border-red-200 bg-red-50 text-red-500 rounded-full text-[10px] lg:text-xs font-semibold"
              >
                {allergen}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Divider */}
      <hr className="border-slate-200 mb-6 lg:mb-8" />

      {/* Ingredients */}
      {ingredients && (
        <div>
          <h3 className="text-[10px] lg:text-sm font-bold tracking-[0.2em] text-slate-800 lg:text-slate-500 uppercase mb-2 lg:mb-4">
            KOMPOSISI & BAHAN
          </h3>
          <p className="text-[11px] sm:text-xs lg:text-base text-slate-500 leading-relaxed">
            {ingredients}
          </p>
        </div>
      )}
    </div>
  );
}
