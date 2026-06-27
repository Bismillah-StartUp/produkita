import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"

const topProducts = [
  { id: 1, name: "Susu Segar Premium", views: 3240 },
  { id: 2, name: "Yogurt Stroberi", views: 2890 },
  { id: 3, name: "Keju Mozarella", views: 2180 },
  { id: 4, name: "Susu UHT Full Cream", views: 1980 },
  { id: 5, name: "Kefir Plain", views: 1430 },
  { id: 6, name: "Mentega Tawar", views: 820 },
]

const rankColors = [
  "bg-blue-600",
  "bg-blue-500",
  "bg-blue-400",
  "bg-blue-300",
  "bg-blue-200",
  "bg-blue-200/60",
]

export function TopProducts() {
  const maxViews = Math.max(...topProducts.map((p) => p.views))

  return (
    <Card className="shadow-sm h-full">
      <CardHeader className="pb-3 border-b border-slate-50">
        <CardTitle className="text-base font-semibold">Produk Unggulan</CardTitle>
        <CardDescription className="text-xs">Berdasarkan total view terbanyak</CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col gap-4 mt-4">
        {topProducts.map((product, index) => {
          const widthPercentage = (product.views / maxViews) * 100
          const colorClass = rankColors[index] || "bg-blue-100"
          
          return (
            <div key={product.id} className="flex flex-col gap-1.5">
              <div className="flex items-center justify-between text-sm">
                <div className="flex items-center gap-3">
                  <div className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-md ${colorClass} text-xs font-semibold text-white`}>
                    {index + 1}
                  </div>
                  <span className="font-medium text-slate-700">{product.name}</span>
                </div>
                <span className="text-slate-400 text-xs font-medium">
                  {product.views.toLocaleString()}
                </span>
              </div>
              <div className="pl-9 w-full">
                <div className="h-1.5 w-full rounded-full bg-slate-100 overflow-hidden">
                  <div
                    className={`h-full rounded-full ${colorClass} transition-all duration-500 ease-in-out`}
                    style={{ width: `${widthPercentage}%` }}
                  />
                </div>
              </div>
            </div>
          )
        })}
      </CardContent>
    </Card>
  )
}
