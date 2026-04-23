export const AKG = {
  energy: 2150,
  fat: 67,
  saturatedFat: 20,
  protein: 60,
  carbs: 325,
  sugar: 50,
  sodium: 1500,
}

export function percentAKG(value: number, dailyValue: number): number {
  if (!dailyValue) return 0
  return (value / dailyValue) * 100
}

export function roundAKG(value: number): number {
  return Math.round(value)
}

export function calculateAKG(value: number | undefined, dailyValue: number): number {
  if (value === undefined || value === null) return 0
  return roundAKG(percentAKG(value, dailyValue))
}
