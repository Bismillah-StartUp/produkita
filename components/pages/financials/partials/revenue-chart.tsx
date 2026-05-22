'use client'

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid } from 'recharts'

const chartConfig = {
  pemasukan: { label: 'Pemasukan', color: '#3b82f6' },
  pengeluaran: { label: 'Pengeluaran', color: '#ef4444' },
}

export default function RevenueChart({ data }: { data: any[] }) {
  return (
    <Card className="flex w-full flex-col justify-between rounded-xl border-slate-100 shadow-sm">
      <CardHeader className="pb-2">
        <div className="flex items-start justify-between">
          <div>
            <CardTitle className="text-sm font-semibold text-slate-900">Pendapatan vs Pengeluaran</CardTitle>
            <CardDescription className="mt-0.5 text-xs text-slate-400">
              Perbandingan kinerja keuangan 6 bulan terakhir
            </CardDescription>
          </div>

          <div className="mt-1 flex items-center gap-4 text-xs font-bold text-slate-600">
            <div className="flex items-center gap-1.5">
              <span className="h-2.5 w-2.5 rounded-[3px] bg-[#3b82f6]"></span>
              Pemasukan
            </div>
            <div className="flex items-center gap-1.5">
              <span className="h-2.5 w-2.5 rounded-[3px] bg-[#ef4444]"></span>
              Pengeluaran
            </div>
          </div>
        </div>
      </CardHeader>

      <CardContent className="flex flex-1 flex-col justify-end pt-2">
        <ChartContainer config={chartConfig} className="h-70 w-full">
          <BarChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
            <XAxis
              dataKey="month"
              tickLine={false}
              axisLine={false}
              className="text-xs font-semibold text-slate-400"
              dy={10}
            />
            <YAxis
              tickLine={false}
              axisLine={false}
              className="text-xs font-semibold text-slate-400"
              ticks={[0, 10000000, 20000000, 30000000, 40000000, 50000000, 60000000]}
              tickFormatter={(value) => `${value / 1000000}M`}
            />
            <ChartTooltip cursor={{ fill: '#f8fafc' }} content={<ChartTooltipContent />} />

            <Bar dataKey="pemasukan" stackId="a" fill="var(--color-pemasukan)" radius={[7, 7, 7, 7]} barSize={32} />
            <Bar dataKey="pengeluaran" stackId="a" fill="var(--color-pengeluaran)" radius={[7, 7, 0, 0]} barSize={32} />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
