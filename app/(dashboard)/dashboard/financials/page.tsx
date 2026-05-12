import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { TrendingUp, TrendingDown, DollarSign, PieChart } from 'lucide-react'

export default function FinancialsPage() {
  const stats = [
    {
      title: 'Total Pendapatan',
      value: 'Rp 45.250.000',
      change: '+12.5%',
      trend: 'up',
      icon: DollarSign,
    },
    {
      title: 'Total Pengeluaran',
      value: 'Rp 18.500.000',
      change: '+5.2%',
      trend: 'up',
      icon: TrendingDown,
    },
    {
      title: 'Keuntungan Bersih',
      value: 'Rp 26.750.000',
      change: '+18.3%',
      trend: 'up',
      icon: TrendingUp,
    },
    {
      title: 'Margin Keuntungan',
      value: '59.1%',
      change: '+2.1%',
      trend: 'up',
      icon: PieChart,
    },
  ]

  const transactions = [
    {
      id: 1,
      description: 'Penjualan Produk - Susu Cair 1L',
      amount: 'Rp 5.000.000',
      type: 'income',
      date: '12 May 2026',
      status: 'Completed',
    },
    {
      id: 2,
      description: 'Pembelian Bahan Baku',
      amount: 'Rp 2.500.000',
      type: 'expense',
      date: '11 May 2026',
      status: 'Completed',
    },
    {
      id: 3,
      description: 'Penjualan Produk - Yogurt 500ml',
      amount: 'Rp 3.200.000',
      type: 'income',
      date: '10 May 2026',
      status: 'Completed',
    },
    {
      id: 4,
      description: 'Biaya Operasional Bulanan',
      amount: 'Rp 1.500.000',
      type: 'expense',
      date: '09 May 2026',
      status: 'Completed',
    },
    {
      id: 5,
      description: 'Penjualan Produk - Keju Lokal',
      amount: 'Rp 2.800.000',
      type: 'income',
      date: '08 May 2026',
      status: 'Pending',
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
              {[
                { month: 'Jan', income: 35, expense: 14 },
                { month: 'Feb', income: 38, expense: 15 },
                { month: 'Mar', income: 42, expense: 16 },
                { month: 'Apr', income: 40, expense: 17 },
                { month: 'May', income: 45, expense: 18 },
              ].map((data, idx) => (
                <div key={idx} className="flex items-center justify-between">
                  <span className="text-sm font-medium text-slate-600 w-12">{data.month}</span>
                  <div className="flex-1 flex gap-2 ml-4">
                    <div className="flex-1">
                      <div className="bg-green-100 h-8 rounded flex items-center justify-center">
                        <span className="text-xs font-semibold text-green-700">{data.income}M</span>
                      </div>
                    </div>
                    <div className="flex-1">
                      <div className="bg-red-100 h-8 rounded flex items-center justify-center">
                        <span className="text-xs font-semibold text-red-700">{data.expense}M</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
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
                <span className="font-semibold text-green-600">Rp 45.2M</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-slate-600">Total Pengeluaran</span>
                <span className="font-semibold text-red-600">Rp 18.5M</span>
              </div>
              <div className="border-t pt-2 flex justify-between text-sm font-semibold">
                <span>Keuntungan Bersih</span>
                <span className="text-green-600">Rp 26.7M</span>
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
            {transactions.map((transaction) => (
              <div key={transaction.id} className="flex items-center justify-between py-4 border-b last:border-0">
                <div className="flex-1">
                  <p className="font-medium text-slate-900">{transaction.description}</p>
                  <p className="text-sm text-slate-500">{transaction.date}</p>
                </div>
                <div className="flex items-center gap-4">
                  <span className={`font-semibold ${transaction.type === 'income' ? 'text-green-600' : 'text-red-600'}`}>
                    {transaction.type === 'income' ? '+' : '-'}{transaction.amount}
                  </span>
                  <span
                    className={`text-xs px-2 py-1 rounded-full ${
                      transaction.status === 'Completed'
                        ? 'bg-green-100 text-green-700'
                        : 'bg-yellow-100 text-yellow-700'
                    }`}
                  >
                    {transaction.status}
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
