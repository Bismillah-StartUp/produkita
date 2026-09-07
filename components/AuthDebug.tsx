"use client"

import { useAuthStore } from "@/stores/useAuthStore"

export function AuthDebug() {
  const { uuid, email, role, name } = useAuthStore()

  const isDevBypass = process.env.NEXT_PUBLIC_DEV_BYPASS === "true"

  return (
    <div className="fixed bottom-4 left-4 bg-slate-900 text-white p-4 rounded-lg shadow-lg text-xs max-w-xs z-50">
      <div className="font-bold mb-2 text-amber-400">🐛 Auth Debug</div>
      <div className="space-y-1">
        <div>
          <span className="text-gray-400">UUID:</span> {uuid || "null"}
        </div>
        <div>
          <span className="text-gray-400">Email:</span> {email || "null"}
        </div>
        <div>
          <span className="text-gray-400">Role:</span> {role || "null"}
        </div>
        <div>
          <span className="text-gray-400">Name:</span> {name || "null"}
        </div>
        <div className="pt-1 border-t border-gray-700">
          <span className="text-gray-400">Dev Bypass:</span> {isDevBypass ? "ON ⚡" : "OFF"}
        </div>
      </div>
    </div>
  )
}