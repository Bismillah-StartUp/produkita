import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET() {
  try {
    const records = await prisma.financialRecord.findMany({
      orderBy: { tanggal: 'desc' },
    })

    const totalMasuk = records
      .filter((r) => r.tipe === 'MASUK' && r.status === 'COMPLETED')
      .reduce((sum, r) => sum + r.jumlah, 0)

    const totalKeluar = records
      .filter((r) => r.tipe === 'KELUAR' && r.status === 'COMPLETED')
      .reduce((sum, r) => sum + r.jumlah, 0)
    return NextResponse.json({
      stats: [
        { title: 'Total Pendapatan', value: totalMasuk },
        { title: 'Total Pengeluaran', value: totalKeluar },
        { title: 'Keuntungan Bersih', value: totalMasuk - totalKeluar },
      ],
      transactions: records,
    })
  } catch (error) {
    return NextResponse.json({ error: 'Gagal memuat data' }, { status: 500 })
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const { namaProduk, tipe, jumlah, status, tanggal } = body

    const newRecord = await prisma.financialRecord.create({
      data: {
        namaProduk,
        tipe,
        jumlah: parseFloat(jumlah), // Sesuai tipe Float di gambar
        status,
        tanggal: tanggal ? new Date(tanggal) : new Date(),
      },
    })

    return NextResponse.json(newRecord)
  } catch (error) {
    return NextResponse.json({ error: 'Gagal menambah data' }, { status: 500 })
  }
}
