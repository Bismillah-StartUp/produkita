import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { formatCompactIDR } from '@/lib/format-currency'

interface ChartData {
  monthName: string
  masuk: number
  keluar: number
}

interface RevenueChartProps {
  last6Months: ChartData[]
  curMasuk: number
  curKeluar: number
  curUntung: number
}

export default function RevenueChart({ last6Months, curMasuk, curKeluar, curUntung }: RevenueChartProps) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <Card className="lg:col-span-2">
        <CardHeader>
          <CardTitle>Pendapatan vs Pengeluaran</CardTitle>
          <CardDescription>Perbandingan kinerja keuangan 6 bulan terakhir</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {last6Months.map((data, index) => {
              const totalBulanIni = data.masuk + data.keluar
              let flexMasuk = totalBulanIni > 0 ? (data.masuk / totalBulanIni) * 100 : 0
              let flexKeluar = totalBulanIni > 0 ? (data.keluar / totalBulanIni) * 100 : 0

              if (data.masuk > 0 && flexMasuk < 15) {
                flexMasuk = 15
                flexKeluar = 85
              }
              if (data.keluar > 0 && flexKeluar < 15) {
                flexKeluar = 15
                flexMasuk = 85
              }

              return (
                <div key={index} className="flex items-center justify-between">
                  <span className="text-sm font-medium text-slate-600 w-24">{data.monthName}</span>
                  <div className="flex-1 flex gap-2 ml-4">
                    {data.masuk > 0 ? (
                      <div className="bg-green-100 h-8 rounded flex items-center px-2 justify-start overflow-hidden" style={{ flex: `${flexMasuk}%` }}>
                        <span className="text-xs font-semibold text-green-700 whitespace-nowrap">
                          {formatCompactIDR(data.masuk)}
                        </span>
                      </div>
                    ) : <div style={{ flex: '0 0 0%' }} />}
                    {data.keluar > 0 ? (
                      <div className="bg-red-100 h-8 rounded flex items-center px-2 justify-end overflow-hidden" style={{ flex: `${flexKeluar}%` }}>
                        <span className="text-xs font-semibold text-red-700 whitespace-nowrap">
                          {formatCompactIDR(data.keluar)}
                        </span>
                      </div>
                    ) : <div style={{ flex: '0 0 0%' }} />}
                  </div>
                </div>
              )
            })}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Ringkasan Bulanan</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-slate-600">Total Pendapatan</span>
              <span className="font-semibold text-green-600">{formatCompactIDR(curMasuk)}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-slate-600">Total Pengeluaran</span>
              <span className="font-semibold text-red-600">{formatCompactIDR(curKeluar)}</span>
            </div>
            <div className="border-t pt-2 flex justify-between text-sm font-semibold">
              <span>Keuntungan Bersih</span>
              <span className="text-blue-600">{formatCompactIDR(curUntung)}</span>
            </div>
          </div>
          <Button className="w-full">Lihat Laporan Detail</Button>
        </CardContent>
      </Card>
    </div>
  )
}
