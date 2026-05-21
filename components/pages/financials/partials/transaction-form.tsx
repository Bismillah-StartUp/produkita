"use client"

import * as React from "react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface TransactionFormProps {
  initialData?: any
  onSuccess: () => void
  className?: string
}

export function TransactionForm({ initialData, onSuccess, className }: TransactionFormProps) {
  const [loading, setLoading] = React.useState(false)

  const [formData, setFormData] = React.useState({
    product_name: initialData?.product_name || "",
    transaction_type: initialData?.transaction_type || "income",
    amount: initialData?.amount || "",
    transaction_status: initialData?.transaction_status || "completed",
    transaction_date: initialData?.transaction_date
      ? new Date(initialData.transaction_date).toISOString().split("T")[0]
      : new Date().toISOString().split("T")[0],
  })

  const todaydate = new Date().toISOString().split('T')[0]

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      const url = initialData?.id ? `/api/financials/${initialData.id}` : '/api/financials'
      const method = initialData?.id ? 'PATCH' : 'POST'

      const response = await fetch(url, {
        method: method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          amount: Number(formData.amount),
        }),
      })

      if (response.ok) {
        onSuccess()
      }
    } catch (error) {
      console.error("Gagal menyimpan:", error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className={cn("grid items-start gap-4", className)}>
      <div className="grid gap-2">
        <Label htmlFor="product_name">Nama Produk</Label>
        <Input
          id="product_name"
          required
          value={formData.product_name}
          onChange={(e) => setFormData({ ...formData,product_name: e.target.value, })}
          placeholder="Masukkan nama produk..."
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="grid gap-2">
          <Label>Tipe Transaksi</Label>
          <Select value={formData.transaction_type} onValueChange={(value) => setFormData({ ...formData, transaction_type: value, })}>
            <SelectTrigger><SelectValue /></SelectTrigger>
            <SelectContent>
              <SelectItem value="income">Masuk (Pemasukan)</SelectItem>
              <SelectItem value="expense">Keluar (Pengeluaran)</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="grid gap-2">
          <Label>Status</Label>
          <Select value={formData.transaction_status}onValueChange={(value) => setFormData({ ...formData, transaction_status: value, })}>
            <SelectTrigger><SelectValue /></SelectTrigger>
            <SelectContent>
              <SelectItem value="completed">Selesai</SelectItem>
              <SelectItem value="pending">Tertunda</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="grid gap-2">
          <Label htmlFor="amount">Jumlah (Rp)</Label>
          <Input
            id="amount"
            type="number"
            step="1"
            required
            value={formData.amount}
            onChange={(e) => setFormData({ ...formData, amount: e.target.value, })}
          />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="transaction_date">Tanggal</Label>
          <Input
            id="transaction_date"
            type="date"
            required
            max={todaydate}
            value={formData.transaction_date}
            onChange={(e) =>setFormData({ ...formData, transaction_date: e.target.value, })}
          />
        </div>
      </div>

      <Button type="submit" disabled={loading} className="w-full">
        {loading ? "Memproses..." : initialData?.id ? "Simpan Perubahan" : "Tambah Transaksi"}
      </Button>
    </form>
  )
}
