import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET() {
  try {
    const records = await prisma.financialRecord.findMany({
      orderBy: { tanggal: 'desc' },
    })

    const totalMasuk = records
      .filter((r: any) => r.tipe === 'MASUK' && r.status === 'COMPLETED')
      .reduce((sum: number, r: any) => sum + r.jumlah, 0)

    const totalKeluar = records
      .filter((r: any) => r.tipe === 'KELUAR' && r.status === 'COMPLETED')
      .reduce((sum: number, r: any) => sum + r.jumlah, 0)

    const untungBersih = totalMasuk - totalKeluar
    const margin = totalMasuk > 0 ? (untungBersih / totalMasuk) * 100 : 0

    return NextResponse.json({
      stats: [
        { title: 'Total Pendapatan', value: totalMasuk },
        { title: 'Total Pengeluaran', value: totalKeluar },
        { title: 'Keuntungan Bersih', value: untungBersih },
        { title: 'Margin Keuntungan', value: margin.toFixed(1) + '%' },
      ],
      transactions: records,
    })
  } catch (error) {
    return NextResponse.json({ error: 'Gagal memuat data' }, { status: 500 })
  }
}
