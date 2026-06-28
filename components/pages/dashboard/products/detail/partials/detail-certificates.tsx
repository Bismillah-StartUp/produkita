"use client"

import { useState } from "react"
import { Pencil, X, Check, CheckCircle2, Plus } from "lucide-react"
import { useProduct } from "@/hooks/useProducts"
import { CertificateType } from "@prisma/client"

interface DetailCertificatesProps {
  productUuid: string
  certificates: any[]
  onCertificatesChange: (certificates: any[]) => void
}

const CERT_TYPES: CertificateType[] = ["bpom", "pirt", "halal", "coa"]

const CERT_LABELS: Record<CertificateType, string> = {
  bpom: "BPOM",
  pirt: "PIRT",
  halal: "Halal MUI",
  coa: "COA",
}

const CERT_DESCRIPTIONS: Record<CertificateType, string> = {
  bpom: "Produk memiliki izin edar BPOM",
  pirt: "Produk memiliki izin PIRT",
  halal: "Produk memiliki sertifikat halal",
  coa: "Produk memiliki sertifikat hasil uji laboratorium",
}

const CERT_COLORS: Record<CertificateType, string> = {
  bpom: "bg-blue-600",
  pirt: "bg-purple-400",
  halal: "bg-green-600",
  coa: "bg-amber-600",
}

const CERT_BORDER_COLORS: Record<CertificateType, string> = {
  bpom: "border-blue-200",
  pirt: "border-purple-200",
  halal: "border-green-200",
  coa: "border-amber-200",
}

const formatDate = (date: string | Date | null | undefined) => {
  if (!date) return "-"
  return new Date(date).toLocaleDateString("id-ID", { day: "numeric", month: "long", year: "numeric" })
}

const toDateInputValue = (date: string | Date | null | undefined) => {
  if (!date) return ""
  return new Date(date).toISOString().split("T")[0]
}

function FieldInput({
  label,
  name,
  value,
  onChange,
  type = "text",
  disabled,
}: {
  label: string
  name: string
  value: string
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  type?: string
  disabled: boolean
}) {
  return (
    <div>
      <label className="mb-1.5 block text-sm font-semibold text-gray-800">{label}</label>
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        disabled={disabled}
        className="w-full rounded-lg border border-gray-200 bg-white px-3 py-2.5 text-sm text-gray-900 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100 disabled:cursor-not-allowed disabled:bg-gray-50 disabled:text-gray-500"
      />
    </div>
  )
}

export function DetailCertificates({ productUuid, certificates, onCertificatesChange }: DetailCertificatesProps) {
  const { createCertificate, updateCertificate, loading } = useProduct()

  const [editingCertUuid, setEditingCertUuid] = useState<string | null>(null)
  const [editForm, setEditForm] = useState({ number: "", registered_at: "", valid_until: "", lab_name: "" })

  const [addingType, setAddingType] = useState<CertificateType | null>(null)
  const [addForm, setAddForm] = useState({ number: "", registered_at: "", valid_until: "", lab_name: "" })

  const startEdit = (cert: any) => {
    setEditForm({
      number: cert.number ?? "",
      registered_at: toDateInputValue(cert.registered_at),
      valid_until: toDateInputValue(cert.valid_until),
      lab_name: cert.lab_name ?? "",
    })
    setEditingCertUuid(cert.uuid)
  }

  const handleEditChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setEditForm((prev) => ({ ...prev, [name]: value }))
  }

  const saveEdit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!editingCertUuid) return
    const result = await updateCertificate(editingCertUuid, {
      number: editForm.number,
      registered_at: editForm.registered_at ? new Date(editForm.registered_at) : undefined,
      valid_until: editForm.valid_until ? new Date(editForm.valid_until) : undefined,
      lab_name: editForm.lab_name,
    })
    if (result) {
      onCertificatesChange(certificates.map((c) => (c.uuid === editingCertUuid ? { ...c, ...result } : c)))
      setEditingCertUuid(null)
    }
  }

  const startAdd = (type: CertificateType) => {
    setAddForm({ number: "", registered_at: "", valid_until: "", lab_name: "" })
    setAddingType(type)
  }

  const handleAddChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setAddForm((prev) => ({ ...prev, [name]: value }))
  }

  const saveAdd = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!addingType) return
    const result = await createCertificate(productUuid, {
      type: addingType,
      number: addForm.number,
      registered_at: addForm.registered_at ? new Date(addForm.registered_at) : undefined,
      valid_until: addForm.valid_until ? new Date(addForm.valid_until) : undefined,
      lab_name: addForm.lab_name,
    })
    if (result) {
      onCertificatesChange([...certificates, result])
      setAddingType(null)
    }
  }

  const ownedTypes = new Set(certificates.map((c) => c.type))
  const missingTypes = CERT_TYPES.filter((t) => !ownedTypes.has(t))

  return (
    <div className="space-y-4">
      {certificates.map((cert) => {
        const isEditingThis = editingCertUuid === cert.uuid
        return (
          <div key={cert.uuid} className={`overflow-hidden rounded-xl border ${CERT_BORDER_COLORS[cert.type as CertificateType]}`}>
            <div className="flex items-center justify-between bg-gray-50 px-6 py-4">
              <span
                className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-bold text-white ${CERT_COLORS[cert.type as CertificateType]}`}
              >
                <CheckCircle2 className="h-3.5 w-3.5" />
                {CERT_LABELS[cert.type as CertificateType]}
              </span>
              {isEditingThis ? (
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => setEditingCertUuid(null)}
                    disabled={loading}
                    className="flex items-center gap-1 rounded-lg border border-gray-300 bg-white px-3 py-1.5 text-xs font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50"
                  >
                    <X className="h-3.5 w-3.5" />
                    Batal
                  </button>
                  <button
                    type="submit"
                    form={`cert-edit-${cert.uuid}`}
                    disabled={loading}
                    className="flex items-center gap-1 rounded-lg bg-blue-600 px-3 py-1.5 text-xs font-medium text-white hover:bg-blue-700 disabled:opacity-50"
                  >
                    <Check className="h-3.5 w-3.5" />
                    {loading ? "Menyimpan..." : "Simpan"}
                  </button>
                </div>
              ) : (
                <button
                  type="button"
                  onClick={() => startEdit(cert)}
                  className="flex items-center gap-1 rounded-lg border border-blue-500 bg-white px-3 py-1.5 text-xs font-medium text-blue-600 hover:bg-blue-50"
                >
                  <Pencil className="h-3.5 w-3.5" />
                  Edit
                </button>
              )}
            </div>

            <form id={`cert-edit-${cert.uuid}`} onSubmit={saveEdit} className="grid grid-cols-2 gap-4 bg-white px-6 py-5 sm:grid-cols-4">
              <FieldInput
                label="Nomor"
                name="number"
                value={isEditingThis ? editForm.number : cert.number ?? ""}
                onChange={handleEditChange}
                disabled={!isEditingThis}
              />
              <FieldInput
                label="Nama Laboratorium"
                name="lab_name"
                value={isEditingThis ? editForm.lab_name : cert.lab_name ?? ""}
                onChange={handleEditChange}
                disabled={!isEditingThis}
              />
              <FieldInput
                label="Tanggal Registrasi"
                name="registered_at"
                type={isEditingThis ? "date" : "text"}
                value={isEditingThis ? editForm.registered_at : formatDate(cert.registered_at)}
                onChange={handleEditChange}
                disabled={!isEditingThis}
              />
              <FieldInput
                label="Berlaku Hingga"
                name="valid_until"
                type={isEditingThis ? "date" : "text"}
                value={isEditingThis ? editForm.valid_until : formatDate(cert.valid_until)}
                onChange={handleEditChange}
                disabled={!isEditingThis}
              />
            </form>
          </div>
        )
      })}

      {missingTypes.map((type) => {
        const isAddingThis = addingType === type
        return (
          <div key={type} className={`overflow-hidden rounded-xl border border-dashed ${CERT_BORDER_COLORS[type]}`}>
            <div className="flex items-center justify-between bg-gray-50 px-6 py-4">
              <div>
                <p className="text-sm font-bold text-gray-500">{CERT_LABELS[type]}</p>
                <p className="text-xs text-gray-400">{CERT_DESCRIPTIONS[type]}</p>
              </div>
              {isAddingThis ? (
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => setAddingType(null)}
                    disabled={loading}
                    className="flex items-center gap-1 rounded-lg border border-gray-300 bg-white px-3 py-1.5 text-xs font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50"
                  >
                    <X className="h-3.5 w-3.5" />
                    Batal
                  </button>
                  <button
                    type="submit"
                    form={`cert-add-${type}`}
                    disabled={loading}
                    className="flex items-center gap-1 rounded-lg bg-blue-600 px-3 py-1.5 text-xs font-medium text-white hover:bg-blue-700 disabled:opacity-50"
                  >
                    <Check className="h-3.5 w-3.5" />
                    {loading ? "Menyimpan..." : "Simpan"}
                  </button>
                </div>
              ) : (
                <button
                  type="button"
                  onClick={() => startAdd(type)}
                  className="flex items-center gap-1 rounded-lg border border-blue-500 bg-white px-3 py-1.5 text-xs font-medium text-blue-600 hover:bg-blue-50"
                >
                  <Plus className="h-3.5 w-3.5" />
                  Tambah Sertifikat
                </button>
              )}
            </div>

            {isAddingThis && (
              <form id={`cert-add-${type}`} onSubmit={saveAdd} className="grid grid-cols-2 gap-4 bg-white px-6 py-5 sm:grid-cols-4">
                <FieldInput label="Nomor" name="number" value={addForm.number} onChange={handleAddChange} disabled={false} />
                <FieldInput label="Nama Laboratorium" name="lab_name" value={addForm.lab_name} onChange={handleAddChange} disabled={false} />
                <FieldInput
                  label="Tanggal Registrasi"
                  name="registered_at"
                  type="date"
                  value={addForm.registered_at}
                  onChange={handleAddChange}
                  disabled={false}
                />
                <FieldInput
                  label="Berlaku Hingga"
                  name="valid_until"
                  type="date"
                  value={addForm.valid_until}
                  onChange={handleAddChange}
                  disabled={false}
                />
              </form>
            )}
          </div>
        )
      })}
    </div>
  )
}
