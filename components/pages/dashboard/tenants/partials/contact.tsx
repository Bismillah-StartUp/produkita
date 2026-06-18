import { Phone, Mail, Globe } from "lucide-react"
import type { TenantData } from ".."

interface ContactPartialProps {
  data: TenantData
  isEditing: boolean
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void
}

export default function ContactPartial({ data, isEditing, onChange }: ContactPartialProps) {
  const contacts = [
    { icon: Phone, label: "Telepon", name: "phone", value: data.phone },
    { icon: Mail, label: "Email", name: "email", value: data.email },
    { icon: Globe, label: "Website", name: "website", value: data.website },
  ]

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-5">
      <h2 className="text-[15px] font-bold text-gray-900 mb-4">Kontak</h2>
      <div className="space-y-4">
        {contacts.map(({ icon: Icon, label, name, value }) => (
          <div key={name} className="flex items-start gap-3">
            <div className="w-8 h-8 rounded-full bg-blue-50 flex items-center justify-center shrink-0 mt-0.5">
              <Icon size={14} className="text-blue-500" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-xs text-gray-500">{label}</p>
              {isEditing ? (
                <input
                  name={name}
                  value={value}
                  onChange={onChange}
                  className="w-full mt-1 border border-gray-200 rounded-lg px-3 py-1.5 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
                />
              ) : (
                <p className="text-sm font-semibold text-gray-900 mt-0.5">{value || "—"}</p>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}