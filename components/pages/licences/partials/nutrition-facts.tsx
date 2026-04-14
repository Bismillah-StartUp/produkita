'use client'

interface NutritionFactsProps {
  servings?: string
  calories?: number
  fat?: number
  saturatedFat?: number
  carbs?: number
  protein?: number
  sodium?: number
  sugar?: number
  testedDate?: Date
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
  const hasNutritionData =
    calories ||
    fat ||
    saturatedFat ||
    carbs ||
    protein ||
    sodium ||
    sugar

  if (!hasNutritionData) {
    return null
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-slate-900">Nutritional Facts</h2>
        <p className="text-slate-600">Lab tested and certified</p>
      </div>

      <div className="border-2 border-black rounded-lg p-6 space-y-4 max-w-sm bg-white">
        <h3 className="text-lg font-bold text-slate-900">Nutrition Facts</h3>

        {servings && (
          <div className="text-sm">
            <p className="text-slate-900">Per Serving ({servings})</p>
          </div>
        )}

        <div className="border-b-4 border-black pb-4">
          {calories && (
            <div className="flex justify-between font-bold text-lg text-slate-900">
              <span>Calories</span>
              <span>{calories} kcal</span>
            </div>
          )}
        </div>

        <div className="border-b border-black pb-2 mb-2">
          <p className="text-sm font-bold text-slate-900">Amount per serving</p>
        </div>

        <div className="space-y-2 text-sm text-slate-900">
          {fat !== undefined && (
            <div className="flex justify-between">
              <span>Total Fat</span>
              <span className="font-medium">{fat} g</span>
            </div>
          )}

          {saturatedFat !== undefined && (
            <div className="flex justify-between ml-4">
              <span>Saturated Fat</span>
              <span className="font-medium">{saturatedFat} g</span>
            </div>
          )}

          {carbs !== undefined && (
            <div className="flex justify-between">
              <span>Carbohydrates</span>
              <span className="font-medium">{carbs} g</span>
            </div>
          )}

          {protein !== undefined && (
            <div className="flex justify-between">
              <span>Protein</span>
              <span className="font-medium">{protein} g</span>
            </div>
          )}

          {sodium !== undefined && (
            <div className="flex justify-between">
              <span>Sodium</span>
              <span className="font-medium">{sodium} mg</span>
            </div>
          )}

          {sugar !== undefined && (
            <div className="flex justify-between">
              <span>Sugar</span>
              <span className="font-medium">{sugar} g</span>
            </div>
          )}
        </div>
      </div>

      <div className="text-sm text-slate-700">
        <p>* Tested by certified food testing facility</p>
        <p>* Values are approximate and may vary</p>
      </div>
    </div>
  )
}
