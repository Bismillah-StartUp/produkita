import { prisma } from '@/lib/prisma'
import { Button } from '@/components/ui/button'
import { DollarSign, TrendingDown, TrendingUp, PieChart } from 'lucide-react'
import { TransactionDialog } from '@/components/pages/financials/partials/transaction-dialog'

// Partials
import StatsCards from '@/components/pages/financials/partials/stats-cards'
import RevenueChart from '@/components/pages/financials/partials/revenue-chart'
import RecentTransactions from '@/components/pages/financials/partials/recent-transactions'
import { formatIDR } from '@/lib/format-currency'

export default async function FinancialsPage() {
    const now = new Date()
    const sixMonthsAgo = new Date(now.getFullYear(), now.getMonth() - 5, 1)

const recentRecords = await prisma.financialRecord.findMany({
    where: {
        transaction_date: { gte: sixMonthsAgo },
        transaction_status: 'completed'
    },
    orderBy: { transaction_date: 'asc' }
})

const allRecords = await prisma.financialRecord.findMany({
    orderBy: { transaction_date: 'desc' },
    take: 10
})

const last6Months = Array.from({ length: 6 }).map((_, i) => {
    const date = new Date(now.getFullYear(), now.getMonth() - (5 - i), 1)
    const monthName = date.toLocaleDateString('id-ID', { month: 'short' })

    const match = recentRecords.filter(r =>
    new Date(r.transaction_date).getMonth() === date.getMonth() &&
    new Date(r.transaction_date).getFullYear() === date.getFullYear()
    )

    return {
    monthName,
    masuk: match.filter(r => r.transaction_type === 'income').reduce((sum, r) => sum + r.amount, 0),
    keluar: match.filter(r => r.transaction_type === 'expense').reduce((sum, r) => sum + r.amount, 0),
    }
})

const curMasuk = last6Months[5].masuk
const curKeluar = last6Months[5].keluar
const lastMasuk = last6Months[4].masuk
const lastKeluar = last6Months[4].keluar

const curUntung = curMasuk - curKeluar
const lastUntung = lastMasuk - lastKeluar

const getChange = (current: number, previous: number) => {
    if (previous === 0) return current > 0 ? '+100%' : '0%'
    const diff = ((current - previous) / previous) * 100
    return (diff >= 0 ? '+' : '') + diff.toFixed(1) + '%'
}

  const curMargin = curMasuk > 0 ? (curUntung / curMasuk) * 100 : 0
  const lastMargin = lastMasuk > 0 ? (lastUntung / lastMasuk) * 100 : 0

const stats = [
{
    title: 'Total Pendapatan',
    value: formatIDR(curMasuk),
    change: getChange(curMasuk, lastMasuk),
    trend: curMasuk >= lastMasuk ? 'up' : 'down',
    icon: DollarSign,
},
{
    title: 'Total Pengeluaran',
    value: formatIDR(curKeluar),
    change: getChange(curKeluar, lastKeluar),
    trend: curKeluar <= lastKeluar ? 'up' : 'down',
    icon: TrendingDown,
},
{
    title: 'Keuntungan Bersih',
    value: formatIDR(curUntung),
    change: getChange(curUntung, lastUntung),
      trend: curUntung >= lastUntung ? 'up' : 'down',
      icon: TrendingUp,
    },
    {
      title: 'Margin Keuntungan',
      value: `${curMargin.toFixed(1)}%`,
      change: getChange(curMargin, lastMargin),
      trend: curMargin >= lastMargin ? 'up' : 'down',
      icon: PieChart,
    },
  ]

  return (
    <main className="p-6 space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-slate-900">Manajemen Keuangan</h1>
        <p className="text-slate-600 mt-1">Pantau pendapatan, pengeluaran, dan laporan finansial Anda</p>
      </div>

      <StatsCards stats={stats} />

      <RevenueChart
        last6Months={last6Months}
        curMasuk={curMasuk}
        curKeluar={curKeluar}
        curUntung={curUntung}
      />

      <RecentTransactions records={allRecords} />

      <div className="flex gap-3">
        <Button variant="outline">Export Laporan</Button>
        <TransactionDialog mode="add" />
      </div>
    </main>
  )
}
