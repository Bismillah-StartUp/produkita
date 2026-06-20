import { Suspense } from "react"
import { prisma } from "@/lib/prisma"
import { TrendingUp, TrendingDown, Wallet, Percent } from "lucide-react"

import StatsCards from "@/components/pages/dashboard/financials/partials/stats-cards"
import AlertBanner from "@/components/pages/dashboard/financials/partials/alert-banner"
import ReportCalendar from "@/components/pages/dashboard/financials/partials/report-calendar"
import RevenueChart from "@/components/pages/dashboard/financials/partials/revenue-chart"
import RecentTransactions from "@/components/pages/dashboard/financials/partials/recent-transactions"
import { StatItem } from "@/components/pages/dashboard/financials/partials/stats-cards"

import { formatIDR } from "@/lib/format-currency"
export default async function FinancialsPage({ dateParam }: { dateParam?: string }) {
  const now = new Date()
  const active_date = dateParam ? new Date(`${dateParam}T00:00:00`) : now
  const start_of_active_date = new Date(active_date.setHours(0, 0, 0, 0))
  const end_of_active_date = new Date(active_date.setHours(23, 59, 59, 999))
  const six_months_ago = new Date(now.getFullYear(), now.getMonth() - 5, 1)
  const [recent_records, table_records] = await Promise.all([
    prisma.financialRecord.findMany({
      where: {
        transaction_date: { gte: six_months_ago },
        transaction_status: "completed",
      },
      orderBy: { transaction_date: "asc" },
    }),
    prisma.financialRecord.findMany({
      where: {
        transaction_date: {
          gte: start_of_active_date,
          lte: end_of_active_date,
        },
      },
      orderBy: { transaction_date: "desc" },
    }),
  ])

  const last_6_months = Array.from({ length: 6 }).map((_, i) => {
    const month_index = now.getMonth() - (5 - i)
    const month_date = new Date(now.getFullYear(), month_index, 1)

    const month_data = recent_records.filter((r) => {
      const r_date = new Date(r.transaction_date)
      return r_date.getMonth() === month_date.getMonth() && r_date.getFullYear() === month_date.getFullYear()
    })

    return {
      month: month_date.toLocaleDateString("id-ID", { month: "long" }),
      pemasukan: month_data.filter((r) => r.transaction_type === "income").reduce((sum, r) => sum + r.amount, 0),
      pengeluaran: month_data.filter((r) => r.transaction_type === "expense").reduce((sum, r) => sum + r.amount, 0),
    }
  })

  const current_data = last_6_months[5]
  const previous_data = last_6_months[4]
  const keuntungan = current_data.pemasukan - current_data.pengeluaran
  const prev_untung = previous_data.pemasukan - previous_data.pengeluaran
  const cur_margin = current_data.pemasukan > 0 ? (keuntungan / current_data.pemasukan) * 100 : 0
  const prev_margin = previous_data.pemasukan > 0 ? (prev_untung / previous_data.pemasukan) * 100 : 0

  const get_change = (curr: number, prev: number) => {
    if (prev === 0) return curr > 0 ? "+100.0%" : "0.0%"
    const diff = ((curr - prev) / prev) * 100
    return (diff >= 0 ? "+" : "") + diff.toFixed(1) + "%"
  }

  const stats: StatItem[] = [
    {
      title: "Total Pendapatan",
      value: formatIDR(current_data.pemasukan),
      change: `${get_change(current_data.pemasukan, previous_data.pemasukan)} dari bulan lalu`,
      trend: current_data.pemasukan >= previous_data.pemasukan ? "up" : "down",
      icon: TrendingUp,
      color: "blue",
    },
    {
      title: "Total Pengeluaran",
      value: formatIDR(current_data.pengeluaran),
      change: `${get_change(current_data.pengeluaran, previous_data.pengeluaran)} dari bulan lalu`,
      trend: current_data.pengeluaran <= previous_data.pengeluaran ? "up" : "down",
      icon: TrendingDown,
      color: "red",
    },
    {
      title: "Keuntungan Bersih",
      value: formatIDR(keuntungan),
      change: `${get_change(keuntungan, prev_untung)} dari bulan lalu`,
      trend: keuntungan >= prev_untung ? "up" : "down",
      icon: Wallet,
      color: "green",
    },
    {
      title: "Margin Keuntungan",
      value: `${cur_margin.toFixed(1)}%`,
      change: `${get_change(cur_margin, prev_margin)} dari bulan lalu`,
      trend: cur_margin >= prev_margin ? "up" : "down",
      icon: Percent,
      color: "yellow",
    },
  ]

  const current_year = now.getFullYear()
  const current_month = now.getMonth()
  const today_date = now.getDate()

  const daily_data_this_month = Array.from({ length: today_date }).map((_, i) => {
    const date_num = i + 1

    const day_data = recent_records.filter((r) => {
      const r_date = new Date(r.transaction_date)
      return r_date.getFullYear() === current_year && r_date.getMonth() === current_month && r_date.getDate() === date_num
    })

    return {
      date: date_num,
      pemasukan: day_data.filter((r) => r.transaction_type === "income").reduce((sum, r) => sum + r.amount, 0),
      pengeluaran: day_data.filter((r) => r.transaction_type === "expense").reduce((sum, r) => sum + r.amount, 0),
    }
  })

  const has_input_selected_date = recent_records.some(
    (r) => new Date(r.transaction_date).toDateString() === active_date.toDateString()
  )
  const is_today = active_date.toDateString() === now.toDateString()

  return (
    <main className="min-h-screen space-y-6 bg-slate-50/50 p-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <h1 className="text-2xl font-bold text-slate-950">Manajemen Keuangan</h1>
      </div>

      <StatsCards stats={stats} />

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
        <div className="flex flex-col space-y-4 lg:col-span-5">
          {!has_input_selected_date && <AlertBanner activeDate={active_date} isToday={is_today} />}
          <Suspense fallback={<div className="h-64 w-full animate-pulse rounded-xl bg-slate-200" />}>
            <ReportCalendar records={recent_records} activeDateStr={active_date.toISOString().split("T")[0]} />
          </Suspense>
        </div>

        <div className="flex lg:col-span-7">
          <RevenueChart
            data={daily_data_this_month}
            summary={{
              total_pemasukan: current_data.pemasukan.toString(),
              trend_pemasukan: get_change(current_data.pemasukan, previous_data.pemasukan),
              total_pengeluaran: current_data.pengeluaran.toString(),
              trend_pengeluaran: get_change(current_data.pengeluaran, previous_data.pengeluaran),
            }}
          />
        </div>
      </div>

      <RecentTransactions records={table_records} activeDate={active_date} />
    </main>
  )
}
