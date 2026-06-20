"use client"

import { useState, useEffect } from "react"
import { Eye, Pencil, Trash2, QrCode } from "lucide-react"
import { CertBadge } from "./cert-badge"
import { useAuthStore } from "@/servers/stores/useAuthStore"
import { useProduct } from "@/hooks/useProducts"

const CERT_TYPES = ["bpom", "pirt", "halal", "coa"] as const

interface ProductTableProps {
  search: string
  onTotalChange: (total: number) => void
}

export function ProductTable({ search, onTotalChange }: ProductTableProps) {
  const { uuid } = useAuthStore()
  const { getProductsByTenant, softDeleteProduct, loading } = useProduct()

  const [products, setProducts] = useState<any[]>([])
  const [isFetching, setIsFetching] = useState(true)

  useEffect(() => {
    if (!uuid) return

    const fetchProducts = async () => {
      setIsFetching(true)
      const result = await getProductsByTenant(uuid)
      if (result) {
        setProducts(result)
        onTotalChange(result.length)
      }
      setIsFetching(false)
    }

    fetchProducts()
  }, [uuid])

  const filtered = products.filter((p) =>
    p.name.toLowerCase().includes(search.toLowerCase())
  )

  const hasCert = (product: any, type: string) =>
    product.certificates?.some((c: any) => c.type === type) ?? false

  const handleDelete = async (productUuid: string) => {
    if (!confirm("Yakin ingin menghapus produk ini?")) return
    const result = await softDeleteProduct(productUuid)
    if (result) {
      setProducts((prev) => {
        const updated = prev.filter((p) => p.uuid !== productUuid)
        onTotalChange(updated.length)
        return updated
      })
    }
  }

  if (isFetching) {
    return (
      <div className="rounded-xl border border-gray-200 bg-white p-8 text-center">
        <p className="text-sm text-gray-500">Memuat produk...</p>
      </div>
    )
  }

  if (filtered.length === 0) {
    return (
      <div className="rounded-xl border border-gray-200 bg-white p-8 text-center">
        <p className="text-sm text-gray-500">
          {search ? "Produk tidak ditemukan" : "Belum ada produk terdaftar"}
        </p>
      </div>
    )
  }

  return (
    <div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm text-gray-600">
          <thead className="border-b border-gray-100 bg-gray-50/50 text-[11px] font-bold uppercase tracking-wider text-gray-500">
            <tr>
              <th className="px-6 py-4">No</th>
              <th className="px-6 py-4">Nama Produk</th>
              <th className="px-6 py-4">Sertifikat</th>
              <th className="px-6 py-4 text-center">Kode QR</th>
              <th className="px-6 py-4 text-center">Aksi</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {filtered.map((product, index) => (
              <tr key={product.uuid} className="bg-white transition-colors hover:bg-gray-50/50">
                <td className="whitespace-nowrap px-6 py-4 font-medium text-gray-500">
                  {index + 1}
                </td>
                <td className="whitespace-nowrap px-6 py-4 font-medium text-gray-900">
                  {product.name}
                </td>
                <td className="px-6 py-4">
                  <div className="flex gap-2 flex-wrap">
                    {CERT_TYPES.map((type) => (
                      <CertBadge
                        key={type}
                        type={type.toUpperCase() as "BPOM" | "HALAL" | "PIRT" | "COA"}
                        active={hasCert(product, type)}
                      />
                    ))}
                  </div>
                </td>
                <td className="px-6 py-4 text-center">
                  {product.qr_code_url ? (
                    <button
                      onClick={() => window.open(product.qr_code_url, "_blank")}
                      className="inline-flex items-center justify-center gap-2 rounded-lg border border-gray-200 bg-white px-3 py-1.5 text-xs font-semibold text-blue-600 transition-colors hover:bg-blue-50"
                    >
                      <QrCode className="h-4 w-4" />
                      Lihat QR
                    </button>
                  ) : (
                    <span className="text-xs text-gray-400">Belum ada</span>
                  )}
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center justify-center gap-3">
                    <button
                      onClick={() => window.open(`/licenses/${product.license_code}`, "_blank")}
                      className="text-blue-500 transition-colors hover:text-blue-700"
                      title="Lihat Detail"
                    >
                      <Eye className="h-4 w-4" />
                    </button>
                    <button
                      className="text-yellow-500 transition-colors hover:text-yellow-700"
                      title="Edit"
                    >
                      <Pencil className="h-4 w-4" />
                    </button>
                    <button
                      onClick={() => handleDelete(product.uuid)}
                      disabled={loading}
                      className="text-red-500 transition-colors hover:text-red-700 disabled:opacity-50"
                      title="Hapus"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}