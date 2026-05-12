'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Calculator, Download, Plus, Trash2 } from 'lucide-react'

export default function CalculatorsPage() {
  const [productName, setProductName] = useState('')
  const [quantity, setQuantity] = useState('')
  const [calculations, setCalculations] = useState([
    {
      id: 1,
      productName: 'Susu Cair 1L',
      quantity: 100,
      rawMaterial: 15000,
      laborCost: 5000,
      overhead: 3000,
      hpp: 23000,
      sellingPrice: 35000,
      margin: '52.2%',
    },
    {
      id: 2,
      productName: 'Yogurt 500ml',
      quantity: 150,
      rawMaterial: 8000,
      laborCost: 2500,
      overhead: 1500,
      hpp: 12000,
      sellingPrice: 20000,
      margin: '66.7%',
    },
    {
      id: 3,
      productName: 'Keju Lokal',
      quantity: 50,
      rawMaterial: 25000,
      laborCost: 8000,
      overhead: 5000,
      hpp: 38000,
      sellingPrice: 60000,
      margin: '57.9%',
    },
  ])

  const [activeCalculation, setActiveCalculation] = useState<{
    rawMaterial: number
    laborCost: number
    overhead: number
  } | null>(null)

  const costs = {
    rawMaterial: 15000,
    laborCost: 5000,
    overhead: 3000,
  }

  const totalCost = costs.rawMaterial + costs.laborCost + costs.overhead
  const hpp = totalCost
  const sellingPrice = 35000
  const margin = (((sellingPrice - hpp) / sellingPrice) * 100).toFixed(1)

  const handleDelete = (id: number) => {
    setCalculations(calculations.filter(calc => calc.id !== id))
  }

  return (
    <main className="p-6 space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-slate-900">Kalkulator HPP</h1>
        <p className="text-slate-600 mt-1">Hitung Harga Pokok Penjualan (HPP) produk Anda</p>
      </div>

      {/* Calculator Form */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calculator size={20} />
            Hitung HPP Produk
          </CardTitle>
          <CardDescription>Masukkan informasi biaya produk untuk menghitung HPP</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Product Info */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-900 mb-2">Nama Produk</label>
              <input
                type="text"
                placeholder="Contoh: Susu Cair 1L"
                value={productName}
                onChange={(e) => setProductName(e.target.value)}
                className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-900 mb-2">Jumlah Unit (per batch)</label>
              <input
                type="number"
                placeholder="Contoh: 100"
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
                className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          {/* Cost Inputs */}
          <div className="space-y-4">
            <h3 className="font-semibold text-slate-900">Rincian Biaya (per Unit)</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Bahan Baku</label>
                <div className="relative">
                  <span className="absolute left-3 top-2.5 text-slate-600">Rp</span>
                  <input
                    type="number"
                    defaultValue="15000"
                    className="w-full pl-10 pr-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Biaya Tenaga Kerja</label>
                <div className="relative">
                  <span className="absolute left-3 top-2.5 text-slate-600">Rp</span>
                  <input
                    type="number"
                    defaultValue="5000"
                    className="w-full pl-10 pr-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Overhead/Operasional</label>
                <div className="relative">
                  <span className="absolute left-3 top-2.5 text-slate-600">Rp</span>
                  <input
                    type="number"
                    defaultValue="3000"
                    className="w-full pl-10 pr-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Harga Jual */}
          <div>
            <label className="block text-sm font-medium text-slate-900 mb-2">Harga Jual (per Unit)</label>
            <div className="relative">
              <span className="absolute left-3 top-2.5 text-slate-600">Rp</span>
              <input
                type="number"
                defaultValue="35000"
                className="w-full pl-10 pr-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          {/* Results */}
          <div className="bg-blue-50 p-4 rounded-lg space-y-3">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div>
                <p className="text-xs text-slate-600 mb-1">Total Biaya</p>
                <p className="text-lg font-bold text-slate-900">Rp {totalCost.toLocaleString('id-ID')}</p>
              </div>
              <div>
                <p className="text-xs text-slate-600 mb-1">HPP per Unit</p>
                <p className="text-lg font-bold text-blue-600">Rp {hpp.toLocaleString('id-ID')}</p>
              </div>
              <div>
                <p className="text-xs text-slate-600 mb-1">Harga Jual</p>
                <p className="text-lg font-bold text-slate-900">Rp {sellingPrice.toLocaleString('id-ID')}</p>
              </div>
              <div>
                <p className="text-xs text-slate-600 mb-1">Margin Keuntungan</p>
                <p className="text-lg font-bold text-green-600">{margin}%</p>
              </div>
            </div>
          </div>

          <div className="flex gap-3">
            <Button className="flex-1">Simpan Kalkulasi</Button>
            <Button variant="outline" className="flex-1">Reset</Button>
          </div>
        </CardContent>
      </Card>

      {/* Saved Calculations */}
      <div>
        <h2 className="text-2xl font-bold text-slate-900 mb-4 flex items-center gap-2">
          <Plus size={20} />
          Riwayat Kalkulasi
        </h2>
        <div className="space-y-4">
          {calculations.map((calc) => (
            <Card key={calc.id}>
              <CardContent className="pt-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
                  <div>
                    <p className="text-xs text-slate-600 mb-1">Nama Produk</p>
                    <p className="font-semibold text-slate-900">{calc.productName}</p>
                  </div>
                  <div>
                    <p className="text-xs text-slate-600 mb-1">Jumlah Unit</p>
                    <p className="font-semibold text-slate-900">{calc.quantity} unit</p>
                  </div>
                  <div>
                    <p className="text-xs text-slate-600 mb-1">HPP per Unit</p>
                    <p className="font-semibold text-blue-600">Rp {calc.hpp.toLocaleString('id-ID')}</p>
                  </div>
                  <div>
                    <p className="text-xs text-slate-600 mb-1">Margin Keuntungan</p>
                    <p className="font-semibold text-green-600">{calc.margin}</p>
                  </div>
                </div>

                <div className="border-t pt-4">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-4 text-sm">
                    <div className="bg-slate-50 p-3 rounded">
                      <p className="text-slate-600">Bahan Baku</p>
                      <p className="font-semibold">Rp {calc.rawMaterial.toLocaleString('id-ID')}</p>
                    </div>
                    <div className="bg-slate-50 p-3 rounded">
                      <p className="text-slate-600">Biaya Tenaga Kerja</p>
                      <p className="font-semibold">Rp {calc.laborCost.toLocaleString('id-ID')}</p>
                    </div>
                    <div className="bg-slate-50 p-3 rounded">
                      <p className="text-slate-600">Overhead</p>
                      <p className="font-semibold">Rp {calc.overhead.toLocaleString('id-ID')}</p>
                    </div>
                  </div>

                  <div className="flex gap-2 justify-end">
                    <Button variant="outline" size="sm" className="flex items-center gap-2">
                      <Download size={16} />
                      Export
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      className="flex items-center gap-2 text-red-600 hover:text-red-700"
                      onClick={() => handleDelete(calc.id)}
                    >
                      <Trash2 size={16} />
                      Hapus
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </main>
  )
}
