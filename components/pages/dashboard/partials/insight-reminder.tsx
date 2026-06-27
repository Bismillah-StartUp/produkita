import { Bell, Clock, CheckCircle2 } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

const reminders = [
  {
    id: 1,
    message: "Sertifikat Halal \"Keju Mozarella\" berakhir dalam 7 hari.",
    icon: Clock,
    type: "warning",
  },
  {
    id: 2,
    message: "2 produk belum memiliki sertifikasi apapun.",
    icon: Clock,
    type: "warning",
  },
  {
    id: 3,
    message: "3 produk belum memiliki QR Code.",
    icon: Clock,
    type: "warning",
  },
  {
    id: 4,
    message: "Informasi kontak UMKM belum diperbarui.",
    icon: Clock,
    type: "warning",
  },
  {
    id: 5,
    message: "24 produk berhasil terdaftar dalam sistem.",
    icon: CheckCircle2,
    type: "success",
  },
]

export function InsightReminder() {
  return (
    <Card className="shadow-sm h-full flex flex-col">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-orange-50 text-orange-500">
            <Bell className="h-4 w-4" />
          </div>
          <CardTitle className="text-sm font-semibold">Insight & Reminder</CardTitle>
        </div>
        <div className="flex h-6 w-6 items-center justify-center rounded-full bg-blue-600 text-xs font-bold text-white">
          5
        </div>
      </CardHeader>
      <CardContent className="flex-1 flex flex-col gap-3">
        {reminders.map((item) => (
          <div
            key={item.id}
            className="flex items-start gap-3 rounded-xl border border-blue-100 bg-blue-50/50 p-3 text-sm transition-colors hover:bg-blue-50"
          >
            <item.icon
              className={`mt-0.5 h-4 w-4 shrink-0 ${
                item.type === "success" ? "text-blue-600" : "text-blue-500"
              }`}
            />
            <span className="text-slate-700">{item.message}</span>
          </div>
        ))}
      </CardContent>
    </Card>
  )
}
