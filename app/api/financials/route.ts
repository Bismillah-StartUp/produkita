import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

export async function GET() {
  try {
    const records = await prisma.financialRecord.findMany({
      orderBy: { transaction_date: "desc" },
    })

    const totalMasuk = records
      .filter((r) => r.transaction_type === "income" && r.transaction_status === "completed")
      .reduce((sum, r) => sum + r.amount, 0)

    const totalKeluar = records
      .filter((r) => r.transaction_type === "expense" && r.transaction_status === "completed")
      .reduce((sum, r) => sum + r.amount, 0)

    return NextResponse.json({
      stats: [
        { title: "Total Pendapatan", value: totalMasuk },
        { title: "Total Pengeluaran", value: totalKeluar },
        { title: "Keuntungan Bersih", value: totalMasuk - totalKeluar },
      ],
      transactions: records,
    })
  } catch (error) {
    console.error("GET API Error:", error)
    return NextResponse.json({ error: "Gagal memuat data" }, { status: 500 })
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const { product_name, transaction_type, amount, transaction_status, transaction_date, notes } = body

    const newRecord = await prisma.financialRecord.create({
      data: {
        product_name: product_name,
        transaction_type: transaction_type,
        amount: parseInt(amount),
        transaction_status: transaction_status,
        transaction_date: transaction_date ? new Date(transaction_date) : new Date(),
        notes: notes || null,
      },
    })

    return NextResponse.json(newRecord)
  } catch (error) {
    console.error("POST API Error (Gagal Simpan):", error)
    return NextResponse.json({ error: "Gagal menambah data", details: String(error) }, { status: 500 })
  }
}
