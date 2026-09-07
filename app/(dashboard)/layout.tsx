"use client"

import { useAuthStore } from "@/stores/useAuthStore"
import { DashboardHeader, DashboardSidebar } from "@/components/navigations"
import { SuperAdminPage } from "@/components/pages/super-admin"

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const { role } = useAuthStore()

  // ponytail: global layout for all users, superadmin-specific layout handled in component
  if (role === "superadmin") {
    return (
      <div className="flex h-screen bg-slate-50">
        <SuperAdminPage />
      </div>
    )
  }

  return (
    <div className="flex h-screen bg-slate-50">
      <DashboardSidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <DashboardHeader />
        <main className="flex-1 overflow-auto">{children}</main>
      </div>
    </div>
  )
}
