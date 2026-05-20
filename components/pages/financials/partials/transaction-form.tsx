"use client"

import * as React from "react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface TransactionFormProps {
  initialData?: any // Data dari row tabel jika mode 'edit'
  onSuccess: () => void
  className?: string
}

export function TransactionForm({ initialData, onSuccess, className }: TransactionFormProps) {
  const [loading, setLoading] = React.useState(false)

  const [formData, setFormData] = React.useState({
    namaProduk: initialData?.namaProduk || "",
    tipe: initialData?.tipe || "MASUK",
    jumlah: initialData?.jumlah || "",
    status: initialData?.status || "COMPLETED",
    tanggal: initialData?.tanggal
      ? new Date(initialData.tanggal).toISOString().split('T')[0]
      : new Date().toISOString().split('T')[0],
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
          jumlah: parseFloat(formData.jumlah.toString())
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
        <Label htmlFor="namaProduk">Nama Produk</Label>
        <Input
          id="namaProduk"
          required
          value={formData.namaProduk}
          onChange={(e) => setFormData({ ...formData, namaProduk: e.target.value })}
          placeholder="Masukkan nama produk..."
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="grid gap-2">
          <Label>Tipe Transaksi</Label>
          <Select value={formData.tipe} onValueChange={(v) => setFormData({ ...formData, tipe: v })}>
            <SelectTrigger><SelectValue /></SelectTrigger>
            <SelectContent>
              <SelectItem value="MASUK">Masuk (Pemasukan)</SelectItem>
              <SelectItem value="KELUAR">Keluar (Pengeluaran)</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="grid gap-2">
          <Label>Status</Label>
          <Select value={formData.status} onValueChange={(v) => setFormData({ ...formData, status: v })}>
            <SelectTrigger><SelectValue /></SelectTrigger>
            <SelectContent>
              <SelectItem value="COMPLETED">Selesai</SelectItem>
              <SelectItem value="PENDING">Tertunda</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="grid gap-2">
          <Label htmlFor="jumlah">Jumlah (Rp)</Label>
          <Input
            id="jumlah"
            type="number"
            step="0.01"
            required
            value={formData.jumlah}
            onChange={(e) => setFormData({ ...formData, jumlah: e.target.value })}
          />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="tanggal">Tanggal</Label>
          <Input
            id="tanggal"
            type="date"
            required
            max={todaydate}
            value={formData.tanggal}
            onChange={(e) => setFormData({ ...formData, tanggal: e.target.value })}
          />
        </div>
      </div>

      <Button type="submit" disabled={loading} className="w-full">
        {loading ? "Memproses..." : initialData?.id ? "Simpan Perubahan" : "Tambah Transaksi"}
      </Button>
    </form>
  )
}
