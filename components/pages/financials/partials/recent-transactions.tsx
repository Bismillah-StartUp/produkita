import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { MoreHorizontal } from "lucide-react"
import { formatIDR } from '@/lib/format-currency'
import type { FinancialRecord } from '@prisma/client'

export default function RecentTransactions({ records }: { records: FinancialRecord[] }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Transaksi Terbaru</CardTitle>
        <CardDescription>
          Riwayat transaksi pendapatan dan pengeluaran
        </CardDescription>
      </CardHeader>

      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Produk</TableHead>
              <TableHead>Tanggal</TableHead>
              <TableHead>Tipe</TableHead>
              <TableHead>Jumlah</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="w-12.5"></TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {records.map((record) => (
              <TableRow key={record.id}>
                <TableCell className="font-medium">
                  {record.product_name}
                </TableCell>

                <TableCell>
                  {new Date(record.transaction_date).toLocaleDateString("id-ID", {
                    dateStyle: "long"
                  })}
                </TableCell>

                <TableCell>
                  <span className={`text-xs px-2 py-1 rounded-full ${
                    record.transaction_type === "income"
                      ? "bg-green-100 text-green-700"
                      : "bg-red-100 text-red-700"
                  }`}>
                    {record.transaction_type}
                  </span>
                </TableCell>

                <TableCell className={`font-semibold ${
                  record.transaction_type === "income"
                    ? "text-green-600"
                    : "text-red-600"
                }`}>
                  {record.transaction_type === "income" ? "+" : "-"}
                  {formatIDR(record.amount)}
                </TableCell>

                <TableCell>
                  <span className={`text-xs px-2 py-1 rounded-full ${
                    record.transaction_status === "completed"
                      ? "bg-green-100 text-green-700"
                      : "bg-yellow-100 text-yellow-700"
                  }`}>
                    {record.transaction_status}
                  </span>
                </TableCell>

                <TableCell>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <button className="p-2 rounded-md hover:bg-slate-100">
                        <MoreHorizontal className="w-4 h-4" />
                      </button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem>Edit</DropdownMenuItem>
                      <DropdownMenuItem className="text-red-500">
                        Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}
