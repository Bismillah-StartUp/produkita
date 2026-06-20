'use client'

import { AKG, calculateAKG } from '@/lib/nutrition'

interface NutritionFactsProps {
  servings?: number
  calories?: number
  fat?: number
  saturatedFat?: number
  carbs?: number
  protein?: number
  sodium?: number
  sugar?: number
}

export default function NutritionFacts({
  servings,
  calories,
  fat,
  saturatedFat,
  carbs,
  protein,
  sodium,
  sugar,
}: NutritionFactsProps) {
  const fatDaily = calculateAKG(fat, AKG.fat)
  const saturatedFatDaily = calculateAKG(saturatedFat, AKG.saturatedFat)
  const proteinDaily = calculateAKG(protein, AKG.protein)
  const carbsDaily = calculateAKG(carbs, AKG.carbs)
  const sugarDaily = calculateAKG(sugar, AKG.sugar)
  const sodiumDaily = calculateAKG(sodium, AKG.sodium)

  const hasNutritionData =
    servings !== undefined ||
    calories !== undefined ||
    fat !== undefined ||
    saturatedFat !== undefined ||
    carbs !== undefined ||
    protein !== undefined ||
    sodium !== undefined ||
    sugar !== undefined

  if (!hasNutritionData) {
    return null
  }

  return (
    <div className="flex flex-col items-center w-full py-4 sm:py-6 lg:py-8 px-3 sm:px-4">
      <div className="w-full max-w-3xl border-2 sm:border-4 border-black bg-white">
        {/* Header */}
        <div className="border-b-2 sm:border-b-4 border-black px-3 sm:px-6 py-2 sm:py-4 text-center bg-white">
          <p className="text-xs sm:text-sm font-bold text-slate-900 uppercase tracking-wider">
            Informasi Nilai Gizi / Nutritional Information
          </p>
        </div>

        {/* Main Content */}
        <div className="border-b-2 sm:border-b-4 border-black px-3 sm:px-6 py-3 sm:py-4">
          {/* Amount Per Serving */}
          <div className="mb-3 sm:mb-4">
            <p className="text-xs font-bold text-slate-900 uppercase tracking-wide mb-2 sm:mb-3">
              Jumlah per sajian / Amount per serving
            </p>

            {servings !== undefined && (
              <div className="flex justify-between items-baseline mb-2 sm:mb-3 gap-2">
                <span className="font-semibold text-xs sm:text-sm text-slate-900">Takaran saji / Serving size</span>
                <span className="font-semibold text-xs sm:text-sm text-slate-900 shrink-0">{servings}</span>
              </div>
            )}

            {calories !== undefined && (
              <div className="flex justify-between items-baseline mb-3 sm:mb-4 pb-3 sm:pb-4 border-b-2 border-black gap-2">
                <span className="font-bold text-xs sm:text-sm text-slate-900">Energi total / Total energy</span>
                <span className="font-bold text-sm sm:text-lg text-slate-900 shrink-0">{calories} kcal</span>
              </div>
            )}
          </div>

          {/* Nutrition Table */}
          <div className="overflow-x-auto -mx-3 sm:-mx-6">
            <div className="px-3 sm:px-6">
              <table className="w-full border-collapse min-w-full">
                <thead>
                  <tr className="border-b-2 border-slate-900">
                    <th className="text-left py-2 pr-2 sm:pr-4 text-xs font-bold text-slate-900">Item</th>
                    <th className="text-right py-2 px-1 sm:px-2 text-xs font-bold text-slate-900 w-16 sm:w-24">Value</th>
                    <th className="text-right py-2 pl-1 sm:pl-2 text-xs font-bold text-slate-900 w-12 sm:w-20">% AKG*</th>
                  </tr>
                </thead>
                <tbody>
                  {fat !== undefined && (
                    <>
                      <tr className="border-b border-slate-300">
                        <td className="text-left py-2 sm:py-3 pr-2 sm:pr-4 text-xs sm:text-sm text-slate-900">
                          <span className="font-semibold">Lemak Total / Total Fat</span>
                        </td>
                        <td className="text-right py-2 sm:py-3 px-1 sm:px-2 text-xs sm:text-sm text-slate-900">{fat} g</td>
                        <td className="text-right py-2 sm:py-3 pl-1 sm:pl-2 text-xs sm:text-sm text-slate-900">{fatDaily}%</td>
                      </tr>

                      {saturatedFat !== undefined && (
                        <tr className="border-b border-slate-300">
                          <td className="text-left py-2 sm:py-3 pr-2 sm:pr-4 pl-3 sm:pl-8 text-xs sm:text-sm text-slate-900">
                            Lemak Jenuh / Saturated Fat
                          </td>
                          <td className="text-right py-2 sm:py-3 px-1 sm:px-2 text-xs sm:text-sm text-slate-900">{saturatedFat} g</td>
                          <td className="text-right py-2 sm:py-3 pl-1 sm:pl-2 text-xs sm:text-sm text-slate-900">{saturatedFatDaily}%</td>
                        </tr>
                      )}
                    </>
                  )}

                  {protein !== undefined && (
                    <tr className="border-b border-slate-300">
                      <td className="text-left py-2 sm:py-3 pr-2 sm:pr-4 text-xs sm:text-sm text-slate-900">
                        <span className="font-semibold">Protein / Protein</span>
                      </td>
                      <td className="text-right py-2 sm:py-3 px-1 sm:px-2 text-xs sm:text-sm text-slate-900">{protein} g</td>
                      <td className="text-right py-2 sm:py-3 pl-1 sm:pl-2 text-xs sm:text-sm text-slate-900">{proteinDaily}%</td>
                    </tr>
                  )}

                  {carbs !== undefined && (
                    <tr className="border-b border-slate-300">
                      <td className="text-left py-2 sm:py-3 pr-2 sm:pr-4 text-xs sm:text-sm text-slate-900">
                        <span className="font-semibold">Karbohidrat Total / Total Carbohydrate</span>
                      </td>
                      <td className="text-right py-2 sm:py-3 px-1 sm:px-2 text-xs sm:text-sm text-slate-900">{carbs} g</td>
                      <td className="text-right py-2 sm:py-3 pl-1 sm:pl-2 text-xs sm:text-sm text-slate-900">{carbsDaily}%</td>
                    </tr>
                  )}

                  {sugar !== undefined && (
                    <tr className="border-b border-slate-300">
                      <td className="text-left py-2 sm:py-3 pr-2 sm:pr-4 text-xs sm:text-sm text-slate-900">
                        <span className="font-semibold">Gula / Sugar</span>
                      </td>
                      <td className="text-right py-2 sm:py-3 px-1 sm:px-2 text-xs sm:text-sm text-slate-900">{sugar} g</td>
                      <td className="text-right py-2 sm:py-3 pl-1 sm:pl-2 text-xs sm:text-sm text-slate-900">{sugarDaily}%</td>
                    </tr>
                  )}

                  {sodium !== undefined && (
                    <tr>
                      <td className="text-left py-2 sm:py-3 pr-2 sm:pr-4 text-xs sm:text-sm text-slate-900">
                        <span className="font-semibold">Garam (natrium) / Salt (sodium)</span>
                      </td>
                      <td className="text-right py-2 sm:py-3 px-1 sm:px-2 text-xs sm:text-sm text-slate-900">{sodium} mg</td>
                      <td className="text-right py-2 sm:py-3 pl-1 sm:pl-2 text-xs sm:text-sm text-slate-900">{sodiumDaily}%</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="px-3 sm:px-6 py-2 sm:py-3 bg-slate-50 text-xs leading-relaxed">
          <p className="text-slate-700 text-xs">
            *Persen AKG berdasarkan kebutuhan energi 2150 kkal. Kebutuhan energi anda mungkin lebih tinggi atau lebih
            rendah. / *Percent AKG based on energy requirements of 2150 kcal. Your energy needs may be higher or lower
          </p>
        </div>
      </div>
    </div>
  )
}
