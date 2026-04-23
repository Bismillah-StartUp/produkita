'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { CheckCircle2, AlertCircle } from 'lucide-react'
import { AKG, percentAKG, roundAKG } from '@/lib/nutrition'

function AKGValue({ label, value }: { label: string; value: string }) {
  return (
    <div className="mt-2 rounded-lg border border-blue-200 bg-blue-50 px-4 py-2">
      <p className="text-xs font-semibold uppercase tracking-wide text-blue-700">{label}</p>
      <p className="mt-1 text-lg font-bold text-blue-900" aria-live="polite">
        {value || '0'}%
      </p>
    </div>
  )
}

export interface NutritionFormData {
  servingSize: string
  calories: string
  totalFat: string
  fatDaily: string
  saturatedFat: string
  saturatedFatDaily: string
  carbohydrates: string
  carbohydratesDaily: string
  protein: string
  proteinDaily: string
  sodium: string
  sodiumDaily: string
  sugar: string
  sugarDaily: string
}

interface NutritionFormProps {
  onSubmit?: (data: NutritionFormData) => void
  onPrevious?: () => void
  initialData?: Partial<NutritionFormData>
  isLoading?: boolean
}

export function NutritionForm({ onSubmit, onPrevious, initialData, isLoading = false }: NutritionFormProps) {
  const getNumericValue = (value: string) => {
    const parsedValue = Number.parseFloat(value.replace(/[^0-9.,-]/g, '').replace(',', '.'))
    return Number.isFinite(parsedValue) ? parsedValue : 0
  }

  const getPercentValue = (value: string, dailyValue: number) => {
    return roundAKG(percentAKG(getNumericValue(value), dailyValue)).toString()
  }

  const [formData, setFormData] = useState<NutritionFormData>({
    servingSize: initialData?.servingSize ?? '',
    calories: initialData?.calories ?? '',
    totalFat: initialData?.totalFat ?? '',
    fatDaily: initialData?.fatDaily ?? getPercentValue(initialData?.totalFat ?? '', AKG.fat),
    saturatedFat: initialData?.saturatedFat ?? '',
    saturatedFatDaily: initialData?.saturatedFatDaily ?? getPercentValue(initialData?.saturatedFat ?? '', AKG.saturatedFat),
    carbohydrates: initialData?.carbohydrates ?? '',
    carbohydratesDaily: initialData?.carbohydratesDaily ?? getPercentValue(initialData?.carbohydrates ?? '', AKG.carbs),
    protein: initialData?.protein ?? '',
    proteinDaily: initialData?.proteinDaily ?? getPercentValue(initialData?.protein ?? '', AKG.protein),
    sodium: initialData?.sodium ?? '',
    sodiumDaily: initialData?.sodiumDaily ?? getPercentValue(initialData?.sodium ?? '', AKG.sodium),
    sugar: initialData?.sugar ?? '',
    sugarDaily: initialData?.sugarDaily ?? getPercentValue(initialData?.sugar ?? '', AKG.sugar),
  })

  const [errors, setErrors] = useState<Record<string, string>>({})

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value,
      ...(name === 'totalFat' ? { fatDaily: getPercentValue(value, AKG.fat) } : {}),
      ...(name === 'saturatedFat' ? { saturatedFatDaily: getPercentValue(value, AKG.saturatedFat) } : {}),
      ...(name === 'carbohydrates' ? { carbohydratesDaily: getPercentValue(value, AKG.carbs) } : {}),
      ...(name === 'protein' ? { proteinDaily: getPercentValue(value, AKG.protein) } : {}),
      ...(name === 'sodium' ? { sodiumDaily: getPercentValue(value, AKG.sodium) } : {}),
      ...(name === 'sugar' ? { sugarDaily: getPercentValue(value, AKG.sugar) } : {}),
    }))
    if (errors[name]) {
      setErrors(prev => {
        const newErrors = { ...prev }
        delete newErrors[name]
        return newErrors
      })
    }
  }

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {}

    if (!formData.servingSize.trim()) {
      newErrors.servingSize = 'Takaran saji wajib diisi'
    }
    if (!formData.calories.trim()) {
      newErrors.calories = 'Kalori wajib diisi'
    }
    if (!formData.totalFat.trim()) {
      newErrors.totalFat = 'Lemak total wajib diisi'
    }
    if (!formData.carbohydrates.trim()) {
      newErrors.carbohydrates = 'Karbohidrat wajib diisi'
    }
    if (!formData.protein.trim()) {
      newErrors.protein = 'Protein wajib diisi'
    }
    if (!formData.sodium.trim()) {
      newErrors.sodium = 'Natrium wajib diisi'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (validateForm() && onSubmit) {
      onSubmit(formData)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {/* Main Card Container */}
      <div className="rounded-lg border border-gray-200 bg-white">
        {/* Header */}
        <div className="border-b border-gray-200 px-8 py-6">
          <div className="flex items-center gap-3">
            <CheckCircle2 className="h-6 w-6 text-blue-600" />
            <h2 className="text-lg font-bold text-gray-900">Informasi Nilai Gizi</h2>
          </div>
        </div>

        {/* Content */}
        <div className="space-y-8 px-8 py-8">
          {/* Serving Size */}
          <div>
            <label htmlFor="servingSize" className="block text-sm font-semibold text-gray-700">
              Takaran Saji <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="servingSize"
              name="servingSize"
              value={formData.servingSize}
              onChange={handleChange}
              placeholder="Contoh: 15 ml (1 sdm)"
              className={`mt-2 block w-full rounded-lg border ${
                errors.servingSize ? 'border-red-500' : 'border-gray-300'
              } bg-gray-50 px-4 py-2 text-sm text-gray-900 placeholder-gray-400 focus:border-blue-500 focus:bg-white focus:outline-none focus:ring-1 focus:ring-blue-500`}
            />
            {errors.servingSize && (
              <p className="mt-1 text-xs font-semibold text-red-600">{errors.servingSize}</p>
            )}
          </div>

          {/* Calories */}
          <div>
            <label htmlFor="calories" className="block text-sm font-semibold text-gray-700">
              Energi Total (Kalori) <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="calories"
              name="calories"
              value={formData.calories}
              onChange={handleChange}
              placeholder="Contoh: 25 kcal"
              className={`mt-2 block w-full rounded-lg border ${
                errors.calories ? 'border-red-500' : 'border-gray-300'
              } bg-gray-50 px-4 py-2 text-sm text-gray-900 placeholder-gray-400 focus:border-blue-500 focus:bg-white focus:outline-none focus:ring-1 focus:ring-blue-500`}
            />
            {errors.calories && (
              <p className="mt-1 text-xs font-semibold text-red-600">{errors.calories}</p>
            )}
          </div>

          {/* Total Fat and Saturated Fat */}
          <div className="space-y-4">
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label htmlFor="totalFat" className="block text-sm font-semibold text-gray-700">
                  Lemak Total <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="totalFat"
                  name="totalFat"
                  value={formData.totalFat}
                  onChange={handleChange}
                  placeholder="Contoh: 1.5 g"
                  className={`mt-2 block w-full rounded-lg border ${
                    errors.totalFat ? 'border-red-500' : 'border-gray-300'
                  } bg-gray-50 px-4 py-2 text-sm text-gray-900 placeholder-gray-400 focus:border-blue-500 focus:bg-white focus:outline-none focus:ring-1 focus:ring-blue-500`}
                />
                {errors.totalFat && (
                  <p className="mt-1 text-xs font-semibold text-red-600">{errors.totalFat}</p>
                )}
              </div>

              <div>
                <AKGValue label="AKG Lemak" value={formData.fatDaily} />
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label htmlFor="saturatedFat" className="block text-sm font-semibold text-gray-700">
                  Lemak Jenuh
                </label>
                <input
                  type="text"
                  id="saturatedFat"
                  name="saturatedFat"
                  value={formData.saturatedFat}
                  onChange={handleChange}
                  placeholder="Contoh: 0.5 g"
                  className="mt-2 block w-full rounded-lg border border-gray-300 bg-gray-50 px-4 py-2 text-sm text-gray-900 placeholder-gray-400 focus:border-blue-500 focus:bg-white focus:outline-none focus:ring-1 focus:ring-blue-500"
                />
              </div>

              <div>
                <AKGValue label="AKG Lemak Jenuh" value={formData.saturatedFatDaily} />
              </div>
            </div>
          </div>

          {/* Carbohydrates */}
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label htmlFor="carbohydrates" className="block text-sm font-semibold text-gray-700">
                Karbohidrat Total <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="carbohydrates"
                name="carbohydrates"
                value={formData.carbohydrates}
                onChange={handleChange}
                placeholder="Contoh: 3 g"
                className={`mt-2 block w-full rounded-lg border ${
                  errors.carbohydrates ? 'border-red-500' : 'border-gray-300'
                } bg-gray-50 px-4 py-2 text-sm text-gray-900 placeholder-gray-400 focus:border-blue-500 focus:bg-white focus:outline-none focus:ring-1 focus:ring-blue-500`}
              />
              {errors.carbohydrates && (
                <p className="mt-1 text-xs font-semibold text-red-600">{errors.carbohydrates}</p>
              )}
            </div>

            <div>
              <AKGValue label="AKG Karbohidrat" value={formData.carbohydratesDaily} />
            </div>
          </div>

          {/* Protein */}
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label htmlFor="protein" className="block text-sm font-semibold text-gray-700">
                Protein <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="protein"
                name="protein"
                value={formData.protein}
                onChange={handleChange}
                placeholder="Contoh: 0.5 g"
                className={`mt-2 block w-full rounded-lg border ${
                  errors.protein ? 'border-red-500' : 'border-gray-300'
                } bg-gray-50 px-4 py-2 text-sm text-gray-900 placeholder-gray-400 focus:border-blue-500 focus:bg-white focus:outline-none focus:ring-1 focus:ring-blue-500`}
              />
              {errors.protein && (
                <p className="mt-1 text-xs font-semibold text-red-600">{errors.protein}</p>
              )}
            </div>

            <div>
              <AKGValue label="AKG Protein" value={formData.proteinDaily} />
            </div>
          </div>

          {/* Sugar */}
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label htmlFor="sugar" className="block text-sm font-semibold text-gray-700">
                Gula
              </label>
              <input
                type="text"
                id="sugar"
                name="sugar"
                value={formData.sugar}
                onChange={handleChange}
                placeholder="Contoh: 0 g"
                className="mt-2 block w-full rounded-lg border border-gray-300 bg-gray-50 px-4 py-2 text-sm text-gray-900 placeholder-gray-400 focus:border-blue-500 focus:bg-white focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
            </div>

            <div>
              <AKGValue label="AKG Gula" value={formData.sugarDaily} />
            </div>
          </div>

          {/* Sodium */}
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label htmlFor="sodium" className="block text-sm font-semibold text-gray-700">
                Natrium (Garam) <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="sodium"
                name="sodium"
                value={formData.sodium}
                onChange={handleChange}
                placeholder="Contoh: 280 mg"
                className={`mt-2 block w-full rounded-lg border ${
                  errors.sodium ? 'border-red-500' : 'border-gray-300'
                } bg-gray-50 px-4 py-2 text-sm text-gray-900 placeholder-gray-400 focus:border-blue-500 focus:bg-white focus:outline-none focus:ring-1 focus:ring-blue-500`}
              />
              {errors.sodium && (
                <p className="mt-1 text-xs font-semibold text-red-600">{errors.sodium}</p>
              )}
            </div>

            <div>
              <AKGValue label="AKG Natrium" value={formData.sodiumDaily} />
            </div>
          </div>

          {/* Info Box */}
          <div className="mt-6 flex gap-3 rounded-lg bg-blue-50 px-4 py-3">
            <AlertCircle className="h-5 w-5 shrink-0 text-blue-600 mt-0.5" />
            <p className="text-sm text-blue-700">
              *Persen AKG berdasarkan kebutuhan energi 2150 kkal. Pastikan informasi nutrisi telah diverifikasi oleh laboratorium terakreditasi
            </p>
          </div>

          {/* Submit Buttons */}
          <div className="flex gap-3 pt-8">
            <Button
              type="button"
              variant="outline"
              className="flex-1 py-6 font-semibold"
              onClick={onPrevious}
            >
              Sebelumnya
            </Button>
            <Button
              type="submit"
              disabled={isLoading}
              className="flex-1 bg-blue-600 py-6 text-base font-semibold hover:bg-blue-700"
            >
              {isLoading ? 'Memproses...' : 'Selanjutnya'}
            </Button>
          </div>
        </div>
      </div>
    </form>
  )
}
