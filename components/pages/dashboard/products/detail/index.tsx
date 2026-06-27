"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import {
  ArrowLeft,
  Package,
  Leaf,
  Shield,
  Pencil,
  X,
  Check,
  CheckCircle2,
  QrCode,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { useProduct } from "@/hooks/useProducts"
import { CATEGORY_OPTIONS } from "@/lib/utils"
import { QrCodeModal } from "../partials/qr-code-modal"
import { WeightUnits } from "@prisma/client"

interface ProductDetailPageProps {
  uuid: string
}

const CERT_LABELS: Record<string, string> = {
  bpom: "BPOM",
  pirt: "PIRT",
  halal: "Halal MUI",
  coa: "COA",
}

const CERT_COLORS: Record<string, string> = {
  bpom: "bg-blue-600",
  pirt: "bg-purple-400",
  halal: "bg-green-600",
  coa: "bg-amber-600",
}

const formatDate = (date: string | Date | null | undefined) => {
  if (!date) return "-"
  return new Date(date).toLocaleDateString("id-ID", {
    day: "numeric",
    month: "long",
    year: "numeric",
  })
}

function ViewField({ label, value }: { label: string; value: string | undefined | null }) {
  return (
    <div>
      <p className="mb-1 text-xs text-gray-500">{label}</p>
      <p className="text-sm font-semibold text-gray-900">{value || "-"}</p>
    </div>
  )
}

function EditField({
  label,
  name,
  value,
  onChange,
  type = "text",
}: {
  label: string
  name: string
  value: string
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  type?: string
}) {
  return (
    <div>
      <p className="mb-1 text-xs text-gray-500">{label}</p>
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        className="w-full rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm text-gray-900 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
      />
    </div>
  )
}

function Section({ title, icon, borderColor, headerBg, children, action }: {
  title: string
  icon: React.ReactNode
  borderColor: string
  headerBg: string
  children: React.ReactNode
  action?: React.ReactNode
}) {
  return (
    <div className={`overflow-hidden rounded-xl border ${borderColor} bg-white`}>
      <div className={`flex items-center justify-between border-b ${borderColor} ${headerBg} px-5 py-3`}>
        <div className="flex items-center gap-2">
          <div className="h-5 w-5 shrink-0">{icon}</div>
          <h3 className="text-base font-bold text-gray-900">{title}</h3>
        </div>
        {action}
      </div>
      <div className="p-5">{children}</div>
    </div>
  )
}

export function ProductDetailPage({ uuid }: ProductDetailPageProps) {
  const router = useRouter()
  const { getProduct, updateProductBasic, loading } = useProduct()

  const [product, setProduct] = useState<any>(null)
  const [isFetching, setIsFetching] = useState(true)
  const [isEditingBasic, setIsEditingBasic] = useState(false)
  const [showQrModal, setShowQrModal] = useState(false)
  const [basicForm, setBasicForm] = useState({
    name: "",
    brand: "",
    price: "",
    weight: "",
    weight_unit: "g",
    description: "",
  })

  useEffect(() => {
    const fetchProduct = async () => {
      setIsFetching(true)
      const result = await getProduct(uuid)
      if (result) setProduct(result)
      setIsFetching(false)
    }
    fetchProduct()
  }, [uuid])

  const startEditBasic = () => {
    if (!product) return
    setBasicForm({
      name: product.name ?? "",
      brand: product.brand ?? "",
      price: product.price?.toString() ?? "",
      weight: product.weight?.toString() ?? "",
      weight_unit: product.weight_unit ?? "g",
      description: product.description ?? "",
    })
    setIsEditingBasic(true)
  }

  const cancelEditBasic = () => setIsEditingBasic(false)

  const handleBasicChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setBasicForm((prev) => ({ ...prev, [name]: value }))
  }

  const saveBasic = async () => {
    const result = await updateProductBasic(uuid, {
      name: basicForm.name,
      brand: basicForm.brand,
      price: basicForm.price ? parseFloat(basicForm.price) : undefined,
      weight: basicForm.weight ? parseFloat(basicForm.weight) : undefined,
      weight_unit: basicForm.weight_unit as WeightUnits,
      description: basicForm.description,
    })
    if (result) {
      setProduct((prev: any) => ({ ...prev, ...result }))
      setIsEditingBasic(false)
    }
  }

  if (isFetching) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-50/50">
        <p className="text-sm text-gray-500">Memuat data produk...</p>
      </div>
    )
  }

  if (!product) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-50/50">
        <p className="text-sm text-gray-500">Produk tidak ditemukan</p>
      </div>
    )
  }

  const jenisLabel = CATEGORY_OPTIONS.find((opt) => opt.id === product.type)?.label ?? product.type

  return (
    <div className="min-h-screen bg-gray-50/50 px-4 py-8 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-4xl space-y-4">
        <div className="flex items-center justify-between">
          <button
            onClick={() => router.push("/dashboard/products")}
            className="flex items-center gap-1.5 text-sm font-medium text-gray-600 hover:text-gray-900"
          >
            <ArrowLeft className="h-4 w-4" />
            Kembali ke List Produk
          </button>

          {product.qr_code_url && (
            <Button
              type="button"
              variant="outline"
              onClick={() => setShowQrModal(true)}
              className="gap-2 text-sm font-semibold text-blue-600"
            >
              <QrCode className="h-4 w-4" />
              Lihat QR
            </Button>
          )}
        </div>

        <Section
          title="Informasi Produk"
          icon={<Package className="h-6 w-6 text-blue-600" />}
          borderColor="border-blue-200"
          headerBg="bg-blue-50"
          action={
            isEditingBasic ? (
              <div className="flex items-center gap-2">
                <button
                  onClick={cancelEditBasic}
                  disabled={loading}
                  className="flex items-center gap-1 rounded-lg border border-gray-300 px-3 py-1 text-xs font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50"
                >
                  <X className="h-3.5 w-3.5" />
                  Batal
                </button>
                <button
                  onClick={saveBasic}
                  disabled={loading}
                  className="flex items-center gap-1 rounded-lg bg-blue-600 px-3 py-1 text-xs font-medium text-white hover:bg-blue-700 disabled:opacity-50"
                >
                  <Check className="h-3.5 w-3.5" />
                  {loading ? "Menyimpan..." : "Simpan"}
                </button>
              </div>
            ) : (
              <button
                onClick={startEditBasic}
                className="flex items-center gap-1 rounded-lg border border-blue-500 px-3 py-1 text-xs font-medium text-blue-600 hover:bg-blue-50"
              >
                <Pencil className="h-3.5 w-3.5" />
                Edit
              </button>
            )
          }
        >
          {isEditingBasic ? (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <EditField label="Nama Produk" name="name" value={basicForm.name} onChange={handleBasicChange} />
                <EditField label="Nama Brand" name="brand" value={basicForm.brand} onChange={handleBasicChange} />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <EditField label="Harga" name="price" type="number" value={basicForm.price} onChange={handleBasicChange} />
                <EditField label="Berat/Volume" name="weight" type="number" value={basicForm.weight} onChange={handleBasicChange} />
              </div>
              <div>
                <p className="mb-1 text-xs text-gray-500">Deskripsi Produk</p>
                <textarea
                  name="description"
                  value={basicForm.description}
                  onChange={handleBasicChange}
                  rows={3}
                  className="w-full resize-none rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm text-gray-900 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                />
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <ViewField label="Nama Produk" value={product.name} />
                <ViewField label="Nama Brand" value={product.brand} />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <ViewField
                  label="Harga"
                  value={product.price ? `Rp ${Number(product.price).toLocaleString("id-ID")}` : undefined}
                />
                <ViewField
                  label="Berat/Volume"
                  value={product.weight ? `${product.weight} ${product.weight_unit ?? ""}` : undefined}
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <ViewField label="Jenis" value={jenisLabel} />
                <ViewField label="Kode Lisensi" value={product.license_code} />
              </div>
              <div>
                <p className="mb-1 text-xs text-gray-500">Deskripsi Produk</p>
                <p className="text-sm font-semibold text-gray-900">{product.description || "-"}</p>
              </div>
              {product.images?.length > 0 && (
                <div>
                  <p className="mb-2 text-xs text-gray-500">Foto Produk</p>
                  <div className="flex flex-wrap gap-2">
                    {product.images.map((img: any) => (
                      <Image
                        key={img.uuid}
                        src={img.url}
                        alt={product.name}
                        width={80}
                        height={80}
                        className="h-20 w-20 rounded-lg border border-gray-200 object-cover"
                      />
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </Section>

        {product.nutrition_info && (
          <Section
            title="Nutrisi & Gizi"
            icon={<Leaf className="h-6 w-6 text-green-600" />}
            borderColor="border-green-200"
            headerBg="bg-green-50"
          >
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <ViewField label="Takaran Saji" value={product.nutrition_info.servings?.toString()} />
                <ViewField label="Sajian Perkemasan" value={product.nutrition_info.serving_pkgs?.toString()} />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <ViewField label="Energi Total" value={product.nutrition_info.energy ? `${product.nutrition_info.energy} kkal` : undefined} />
                <ViewField label="Lemak Jenuh" value={product.nutrition_info.saturated_fat ? `${product.nutrition_info.saturated_fat} g` : undefined} />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <ViewField label="Karbohidrat Total" value={product.nutrition_info.carbo ? `${product.nutrition_info.carbo} g` : undefined} />
                <ViewField label="Protein" value={product.nutrition_info.protein ? `${product.nutrition_info.protein} g` : undefined} />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <ViewField label="Gula" value={product.nutrition_info.sugar ? `${product.nutrition_info.sugar} g` : undefined} />
                <ViewField label="Natrium (Garam)" value={product.nutrition_info.natrium ? `${product.nutrition_info.natrium} mg` : undefined} />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <ViewField label="Komposisi" value={product.nutrition_info.composition} />
                <ViewField
                  label="Informasi Alergen"
                  value={product.nutrition_info.allergens?.length ? product.nutrition_info.allergens.join(", ") : undefined}
                />
              </div>
            </div>
          </Section>
        )}

        {product.certificates?.length > 0 && (
          <Section
            title="Sertifikat"
            icon={<Shield className="h-6 w-6 text-purple-600" />}
            borderColor="border-purple-200"
            headerBg="bg-purple-50"
          >
            <div className="space-y-3">
              {product.certificates.map((cert: any) => (
                <div key={cert.uuid} className="flex items-center justify-between border-b border-gray-100 pb-3 last:border-0 last:pb-0">
                  <div className="flex items-center gap-3">
                    <span className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-bold text-white ${CERT_COLORS[cert.type]}`}>
                      <CheckCircle2 className="h-3.5 w-3.5" />
                      {CERT_LABELS[cert.type]}
                    </span>
                    <span className="text-xs text-gray-500">No. {cert.number || "-"}</span>
                  </div>
                  <span className="text-xs text-gray-500">
                    Berlaku hingga {formatDate(cert.valid_until)}
                  </span>
                </div>
              ))}
            </div>
          </Section>
        )}

        {product.serving && (
          <Section
            title="Saran Penyajian"
            icon={<Package className="h-6 w-6 text-blue-600" />}
            borderColor="border-blue-200"
            headerBg="bg-blue-50"
          >
            <div className="space-y-4">
              <ViewField label="Informasi Penyajian" value={product.serving.serving_info} />
              <ViewField label="Informasi Penyimpanan" value={product.serving.storage_info} />
              <ViewField label="Informasi Porsi" value={product.serving.serving_portion} />
              <ViewField label="Link Video Penyajian" value={product.serving.video_url} />
              {product.serving.images?.length > 0 && (
                <div>
                  <p className="mb-2 text-xs text-gray-500">Foto Penyajian</p>
                  <div className="flex flex-wrap gap-2">
                    {product.serving.images.map((img: any) => (
                      <Image
                        key={img.uuid}
                        src={img.url}
                        alt="Foto penyajian"
                        width={80}
                        height={80}
                        className="h-20 w-20 rounded-lg border border-gray-200 object-cover"
                      />
                    ))}
                  </div>
                </div>
              )}
            </div>
          </Section>
        )}
      </div>

      <QrCodeModal
        open={showQrModal}
        onOpenChange={setShowQrModal}
        productName={product.name}
        qrCodeUrl={product.qr_code_url}
      />
    </div>
  )
}
