"use client"

import * as React from "react"
import { Button } from "@/components/ui/button"
import { PlusCircle, Pencil } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { TransactionForm } from "./transaction-form"

interface TransactionDialogProps {
  initialData?: any
  mode?: 'add' | 'edit'
}

export function TransactionDialog({ initialData, mode = 'add' }: TransactionDialogProps) {
  const [open, setOpen] = React.useState(false)

  const handleSuccess = () => {
    setOpen(false)
    window.location.reload()
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {mode === 'add' ? (
          <Button className="gap-2 bg-blue-600 hover:bg-blue-700 text-white">
            <PlusCircle className="w-4 h-4"/> Tambah Data
          </Button>
        ) : (
          <Button variant="ghost" size="sm" className="h-8 w-8 p-0 text-blue-600">
            <Pencil className="h-4 w-4" />
          </Button>
        )}
      </DialogTrigger>

      <DialogContent className="sm:max-w-112.5">
        <DialogHeader>
          <DialogTitle>{mode === 'add' ? "Buat Transaksi Baru" : "Edit Data Transaksi"}</DialogTitle>
          <DialogDescription>
            {mode === 'add'
              ? "Tambahkan catatan pemasukan atau pengeluaran baru ke database."
              : "Ubah detail transaksi yang sudah ada."}
          </DialogDescription>
        </DialogHeader>

        <TransactionForm
          initialData={initialData}
          onSuccess={handleSuccess}
        />
      </DialogContent>
    </Dialog>
  )
}
