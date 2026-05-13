import { prisma } from '@/lib/prisma'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { DollarSign, TrendingDown, TrendingUp, PieChart } from 'lucide-react'



const formatIDR = (val: number) =>
  new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    maximumFractionDigits: 0
  }).format(val)

const formatCompactIDR = (val: number) => {
  const formatted = new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    notation: 'compact',
    maximumFractionDigits: 2
  }).format(val)

  return formatted.replace('jt', 'JT').replace('m', 'M').replace('rb', 'RB')
}


export default async function FinancialsPage() {
  const now = new Date()
  const sixMonthsAgo = new Date(now.getFullYear(), now.getMonth() - 5, 1)

  const recentRecords = await prisma.financialRecord.findMany({
    where: {
      tanggal: { gte: sixMonthsAgo },
      status: 'COMPLETED'
    },
    orderBy: { tanggal: 'asc' }
  })

  const allRecords = await prisma.financialRecord.findMany({
    orderBy: { tanggal: 'desc' },
    take: 10
  })

  const last6Months = Array.from({ length: 6 }).map((_, i) => {
    const date = new Date(now.getFullYear(), now.getMonth() - (5 - i), 1)
    const monthName = date.toLocaleDateString('id-ID', { month: 'short' })

    const match = recentRecords.filter(r =>
      new Date(r.tanggal).getMonth() === date.getMonth() &&
      new Date(r.tanggal).getFullYear() === date.getFullYear()
    )

    return {
      monthName,
      masuk: match.filter(r => r.tipe === 'MASUK').reduce((sum, r) => sum + r.jumlah, 0),
      keluar: match.filter(r => r.tipe === 'KELUAR').reduce((sum, r) => sum + r.jumlah, 0),
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
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-slate-900">Manajemen Keuangan</h1>
        <p className="text-slate-600 mt-1">Pantau pendapatan, pengeluaran, dan laporan finansial Anda</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, index) => {
          const Icon = stat.icon
          return (
            <Card key={index}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
                <Icon className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stat.value}</div>
                <p className={`text-xs mt-1 flex items-center gap-1 ${stat.trend === 'up' ? 'text-green-600' : 'text-red-600'}`}>
                  {stat.trend === 'up' ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
                  {stat.change} dari bulan lalu
                </p>
              </CardContent>
            </Card>
          )
        })}
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Revenue Chart */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Pendapatan vs Pengeluaran</CardTitle>
            <CardDescription>Perbandingan kinerja keuangan 6 bulan terakhir</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {last6Months.map((data, index) => {
                const totalBulanIni = data.masuk + data.keluar;
                let flexMasuk = totalBulanIni > 0 ? (data.masuk / totalBulanIni) * 100 : 0;
                let flexKeluar = totalBulanIni > 0 ? (data.keluar / totalBulanIni) * 100 : 0;
                if (data.masuk > 0 && flexMasuk < 15) {
                  flexMasuk = 15;
                  flexKeluar = 85;
                }
                if (data.keluar > 0 && flexKeluar < 15) {
                  flexKeluar = 15;
                  flexMasuk = 85;
                }
                return (
                  <div key={index} className="flex items-center justify-between">
                    <span className="text-sm font-medium text-slate-600 w-24">{data.monthName}</span>
                    <div className="flex-1 flex gap-2 ml-4">
                      {data.masuk > 0 ? (
                        <div className="bg-green-100 h-8 rounded flex items-center px-2 justify-start overflow-hidden" style={{ flex: `${flexMasuk}%` }} >
                          <span className="text-xs font-semibold text-green-700 whitespace-nowrap">
                            {formatCompactIDR(data.masuk)}
                          </span>
                        </div>) : (<div style={{ flex: '0 0 0%' }} /> )}
                      {data.keluar > 0 ? (
                        <div className="bg-red-100 h-8 rounded flex items-center px-2 justify-end overflow-hidden" style={{ flex: `${flexKeluar}%` }} >
                          <span className="text-xs font-semibold text-red-700 whitespace-nowrap">
                            {formatCompactIDR(data.keluar)}
                          </span>
                        </div> ) : (<div style={{ flex: '0 0 0%' }} /> )}
                    </div>
                  </div>
                )
              })}
            </div>
          </CardContent>
        </Card>

        {/* Summary Card */}
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

      {/* Recent Transactions */}
      <Card>
        <CardHeader>
          <CardTitle>Transaksi Terbaru</CardTitle>
          <CardDescription>Riwayat transaksi pendapatan dan pengeluaran</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {allRecords.map((record) => (
              <div key={record.id} className="flex items-center justify-between py-4 border-b last:border-0">
                <div className="flex-1">
                  <p className="font-medium text-slate-900">{record.namaProduk}</p>
                  <p className="text-sm text-slate-500">
                    {new Date(record.tanggal).toLocaleDateString('id-ID', { dateStyle: 'long' })}
                  </p>
                </div>
                <div className="flex items-center gap-4">
                  <span className={`font-semibold ${record.tipe === 'MASUK' ? 'text-green-600' : 'text-red-600'}`}>
                    {record.tipe === 'MASUK' ? '+' : '-'}{formatIDR(record.jumlah)}
                  </span>
                  <span
                    className={`text-xs px-2 py-1 rounded-full ${
                      record.status === 'COMPLETED'
                        ? 'bg-green-100 text-green-700'
                        : 'bg-yellow-100 text-yellow-700'
                    }`}
                  >
                    {record.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Action Buttons */}
      <div className="flex gap-3">
        <Button variant="outline">Export Laporan</Button>
        <Button>Tambah Transaksi</Button>
      </div>
    </main>
  )
}
