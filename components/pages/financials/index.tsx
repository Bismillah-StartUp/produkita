import { Suspense } from 'react'
import { prisma } from '@/lib/prisma'
import { TrendingUp, TrendingDown, Wallet, Percent } from 'lucide-react'

import StatsCards from '@/components/pages/financials/partials/stats-cards'
import AlertBanner from '@/components/pages/financials/partials/alert-banner'
import ReportCalendar from '@/components/pages/financials/partials/report-calendar'
import RevenueChart from '@/components/pages/financials/partials/revenue-chart'
import RecentTransactions from '@/components/pages/financials/partials/recent-transactions'
import { formatIDR } from '@/lib/format-currency'
import { StatItem } from '@/components/pages/financials/partials/stats-cards'

export default async function FinancialsPage({ dateParam }: { dateParam?: string }) {
  const now = new Date()

  const activeDate = dateParam ? new Date(`${dateParam}T00:00:00`) : now
  const startOfActiveDate = new Date(activeDate.setHours(0, 0, 0, 0))
  const endOfActiveDate = new Date(activeDate.setHours(23, 59, 59, 999))

  const sixMonthsAgo = new Date(now.getFullYear(), now.getMonth() - 5, 1)

  const [recentRecords, tableRecords] = await Promise.all([
    prisma.financialRecord.findMany({
      where: { transaction_date: { gte: sixMonthsAgo }, transaction_status: 'completed' },
      orderBy: { transaction_date: 'asc' },
    }),
    prisma.financialRecord.findMany({
      where: { transaction_date: { gte: startOfActiveDate, lte: endOfActiveDate } },
      orderBy: { transaction_date: 'desc' },
    }),
  ])

  const last6Months = Array.from({ length: 6 }).map((_, i) => {
    const monthIndex = now.getMonth() - (5 - i)
    const monthDate = new Date(now.getFullYear(), monthIndex, 1)

    const monthData = recentRecords.filter((r) => {
      const rDate = new Date(r.transaction_date)
      return rDate.getMonth() === monthDate.getMonth() && rDate.getFullYear() === monthDate.getFullYear()
    })

    return {
      month: monthDate.toLocaleDateString('id-ID', { month: 'long' }),
      pemasukan: monthData.filter((r) => r.transaction_type === 'income').reduce((sum, r) => sum + r.amount, 0),
      pengeluaran: monthData.filter((r) => r.transaction_type === 'expense').reduce((sum, r) => sum + r.amount, 0),
    }
  })

  const current = last6Months[5]
  const previous = last6Months[4]
  const keuntungan = current.pemasukan - current.pengeluaran
  const prevUntung = previous.pemasukan - previous.pengeluaran
  const curMargin = current.pemasukan > 0 ? (keuntungan / current.pemasukan) * 100 : 0
  const prevMargin = previous.pemasukan > 0 ? (prevUntung / previous.pemasukan) * 100 : 0

  const getChange = (curr: number, prev: number) => {
    if (prev === 0) return curr > 0 ? '+100%' : '0%'
    const diff = ((curr - prev) / prev) * 100
    return (diff >= 0 ? '+' : '') + diff.toFixed(1) + '%'
  }

  const stats: StatItem[] = [
    {
      title: 'Total Pendapatan',
      value: formatIDR(current.pemasukan),
      change: `${getChange(current.pemasukan, previous.pemasukan)} dari bulan lalu`,
      trend: current.pemasukan >= previous.pemasukan ? 'up' : 'down',
      icon: TrendingUp,
      color: 'blue',
    },
    {
      title: 'Total Pengeluaran',
      value: formatIDR(current.pengeluaran),
      change: `${getChange(current.pengeluaran, previous.pengeluaran)} dari bulan lalu`,
      trend: current.pengeluaran <= previous.pengeluaran ? 'up' : 'down',
      icon: TrendingDown,
      color: 'red',
    },
    {
      title: 'Keuntungan Bersih',
      value: formatIDR(keuntungan),
      change: `${getChange(keuntungan, prevUntung)} dari bulan lalu`,
      trend: keuntungan >= prevUntung ? 'up' : 'down',
      icon: Wallet,
      color: 'green',
    },
    {
      title: 'Margin Keuntungan',
      value: `${curMargin.toFixed(1)}%`,
      change: `${getChange(curMargin, prevMargin)} dari bulan lalu`,
      trend: curMargin >= prevMargin ? 'up' : 'down',
      icon: Percent,
      color: 'yellow',
    },
  ]

  const hasInputSelectedDate = recentRecords.some(
    (r) => new Date(r.transaction_date).toDateString() === activeDate.toDateString()
  )
  const isToday = activeDate.toDateString() === now.toDateString()

  return (
    <main className="min-h-screen space-y-6 bg-slate-50/50 p-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <h1 className="text-2xl font-bold text-slate-950">Manajemen Keuangan</h1>
        {/* <div className="rounded-lg border border-slate-100 bg-white px-4 py-2 text-sm font-semibold text-blue-600 shadow-sm">
          {now.toLocaleDateString("id-ID", { weekday: "long", day: "numeric", month: "long", year: "numeric" })}
        </div> */}
      </div>

      <StatsCards stats={stats} />

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
        <div className="flex flex-col space-y-4 lg:col-span-5">
          {!hasInputSelectedDate && <AlertBanner activeDate={activeDate} isToday={isToday} />}
          <Suspense fallback={<div className="h-64 w-full animate-pulse rounded-xl bg-slate-200" />}>
            <ReportCalendar records={recentRecords} activeDateStr={activeDate.toISOString().split('T')[0]} />
          </Suspense>
        </div>
        <div className="flex lg:col-span-7">
          <RevenueChart data={last6Months} />
        </div>
      </div>

      <RecentTransactions records={tableRecords} activeDate={activeDate} />
    </main>
  )
}
