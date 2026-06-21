import { TransactionForm } from "@/components/pages/dashboard/financials/partials/transaction-form"
import { getAuthCookie, verifyToken } from "@/servers/auth/auth.token"
import { getFinanceByUUID } from "@/servers/finances/finance.service"
import { redirect } from "next/navigation"

interface PageProps {
  params: Promise<{ cuid: string }>
}

export default async function TransactionPage({ params }: PageProps) {
  const { cuid } = await params

  const token = await getAuthCookie()
  if (!token) redirect("/auth/login")
  const user = await verifyToken(token)

  let initialData = null

  if (cuid !== "records") {
    initialData = await getFinanceByUUID(cuid, user.uuid)
    if (!initialData) redirect("/dashboard/financials")
  }

  return (
    <div className="p-6">
      <TransactionForm initialData={initialData} />
    </div>
  )
}