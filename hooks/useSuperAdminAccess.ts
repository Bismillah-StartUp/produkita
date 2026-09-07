"use client"

import { useEffect, useState } from "react"
import { useAuthStore } from "@/stores/useAuthStore"
import { useRouter } from "next/navigation"

export const useSuperAdminAccess = () => {
  const { role } = useAuthStore()
  const router = useRouter()
  const [isAuthorized, setIsAuthorized] = useState(false)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (role === "superadmin") {
      setIsAuthorized(true)
    } else {
      setIsAuthorized(false)
      router.push("/dashboard")
    }
    setLoading(false)
  }, [role, router])

  return { isAuthorized, loading }
}
