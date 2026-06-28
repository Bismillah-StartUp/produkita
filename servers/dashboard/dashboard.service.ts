import prisma from "@/lib/prisma"
import { ActivityType } from "@prisma/client"

const getTenant = async (userUuid: string) => {
  const tenant = await prisma.tenant.findFirst({
    where: { user: { uuid: userUuid } },
  })
  if (!tenant) throw new Error("Tenant tidak ditemukan")
  return tenant
}

export const getOverviewStats = async (userUuid: string) => {
  const tenant = await getTenant(userUuid)

  const startOfMonth = new Date()
  startOfMonth.setDate(1)
  startOfMonth.setHours(0, 0, 0, 0)

  const startOfLastMonth = new Date(startOfMonth)
  startOfLastMonth.setMonth(startOfLastMonth.getMonth() - 1)

  const startOfToday = new Date()
  startOfToday.setHours(0, 0, 0, 0)

  const [totalProducts, productsThisMonth, totalViews, viewsToday] = await Promise.all([
    prisma.product.count({
      where: { tenant_id: tenant.id, deleted_at: null },
    }),
    prisma.product.count({
      where: { tenant_id: tenant.id, deleted_at: null, created_at: { gte: startOfMonth } },
    }),
    prisma.productView.count({
      where: { product: { tenant_id: tenant.id, deleted_at: null } },
    }),
    prisma.productView.count({
      where: { product: { tenant_id: tenant.id, deleted_at: null }, created_at: { gte: startOfToday } },
    }),
  ])

  return {
    totalProducts,
    productsThisMonth,
    totalViews,
    viewsToday,
  }
}

export const getRevenueChart = async (userUuid: string, months = 6) => {
  const tenant = await getTenant(userUuid)

  const now = new Date()
  const start = new Date(now.getFullYear(), now.getMonth() - (months - 1), 1)

  const records = await prisma.financialRecord.findMany({
    where: {
      tenant_id: tenant.id,
      transaction_date: { gte: start },
    },
    select: {
      transaction_type: true,
      amount: true,
      transaction_date: true,
    },
  })

  const buckets: { key: string; label: string; pemasukan: number; pengeluaran: number }[] = []
  for (let i = months - 1; i >= 0; i--) {
    const d = new Date(now.getFullYear(), now.getMonth() - i, 1)
    buckets.push({
      key: `${d.getFullYear()}-${d.getMonth()}`,
      label: d.toLocaleDateString("id-ID", { month: "short" }),
      pemasukan: 0,
      pengeluaran: 0,
    })
  }

  for (const record of records) {
    const d = new Date(record.transaction_date)
    const key = `${d.getFullYear()}-${d.getMonth()}`
    const bucket = buckets.find((b) => b.key === key)
    if (!bucket) continue
    if (record.transaction_type === "income") {
      bucket.pemasukan += record.amount
    } else {
      bucket.pengeluaran += record.amount
    }
  }

  return buckets.map(({ label, pemasukan, pengeluaran }) => ({ month: label, pemasukan, pengeluaran }))
}

export const getInsights = async (userUuid: string) => {
  const tenant = await getTenant(userUuid)

  const soon = new Date()
  soon.setDate(soon.getDate() + 7)

  const [expiringCerts, productsWithoutCerts, productsWithoutQr, totalProducts] =
    await Promise.all([
      prisma.certificate.findMany({
        where: {
          product: { tenant_id: tenant.id, deleted_at: null },
          deleted_at: null,
          valid_until: { not: null, lte: soon, gte: new Date() },
        },
        select: {
          valid_until: true,
          product: { select: { name: true } },
        },
      }),
      prisma.product.count({
        where: {
          tenant_id: tenant.id,
          deleted_at: null,
          certificates: { none: { deleted_at: null } },
        },
      }),
      prisma.product.count({
        where: { tenant_id: tenant.id, deleted_at: null, qr_code_url: null },
      }),
      prisma.product.count({
        where: { tenant_id: tenant.id, deleted_at: null },
      }),
    ])

  type InsightItem = {
    id: string
    message: string
    type: "warning" | "success"
    href?: string
    children?: { id: string; message: string; href?: string }[]
  }

  const insights: InsightItem[] = []
  const umkmHref = "/dashboard/umkm"

  for (const cert of expiringCerts) {
    const days = Math.ceil((cert.valid_until!.getTime() - Date.now()) / (1000 * 60 * 60 * 24))
    insights.push({
      id: `cert-${cert.product.name}-${cert.valid_until!.toISOString()}`,
      message: `Sertifikat "${cert.product.name}" berakhir dalam ${days} hari.`,
      type: "warning",
    })
  }

  if (productsWithoutCerts > 0) {
    insights.push({
      id: "no-cert",
      message: `${productsWithoutCerts} produk belum memiliki sertifikasi apapun.`,
      type: "warning",
    })
  }

  if (productsWithoutQr > 0) {
    insights.push({
      id: "no-qr",
      message: `${productsWithoutQr} produk belum memiliki QR Code.`,
      type: "warning",
    })
  }

  const missingUmkmFields: { id: string; message: string; href?: string }[] = []

  if (!tenant.trade_name) {
    missingUmkmFields.push({ id: "umkm-no-trade-name", message: "Nama dagang belum diisi.", href: umkmHref })
  }

  if (!tenant.npwp) {
    missingUmkmFields.push({ id: "umkm-no-npwp", message: "NPWP belum diisi.", href: umkmHref })
  }

  if (!tenant.description) {
    missingUmkmFields.push({ id: "umkm-no-description", message: "Deskripsi usaha belum diisi.", href: umkmHref })
  }

  if (!tenant.address || !tenant.city || !tenant.province) {
    missingUmkmFields.push({ id: "umkm-no-address", message: "Alamat usaha belum lengkap.", href: umkmHref })
  }

  if (!tenant.email && !tenant.phonenumber) {
    missingUmkmFields.push({ id: "umkm-no-contact", message: "Informasi kontak belum diisi.", href: umkmHref })
  }

  if (!tenant.logo_url) {
    missingUmkmFields.push({ id: "umkm-no-logo", message: "Logo perusahaan belum diunggah.", href: umkmHref })
  }

  if (!tenant.place_url) {
    missingUmkmFields.push({ id: "umkm-no-place-photo", message: "Foto tempat / gedung usaha belum diunggah.", href: umkmHref })
  }

  if (missingUmkmFields.length > 0) {
    insights.push({
      id: "umkm-incomplete",
      message: `${missingUmkmFields.length} informasi UMKM belum diisi.`,
      type: "warning",
      children: missingUmkmFields,
    })
  }

  if (totalProducts > 0) {
    insights.push({
      id: "total-products",
      message: `${totalProducts} produk berhasil terdaftar dalam sistem.`,
      type: "success",
    })
  }

  return insights
}

export const getTopProducts = async (userUuid: string, limit = 6) => {
  const tenant = await getTenant(userUuid)

  const grouped = await prisma.productView.groupBy({
    by: ["product_id"],
    where: { product: { tenant_id: tenant.id, deleted_at: null } },
    _count: { product_id: true },
    orderBy: { _count: { product_id: "desc" } },
    take: limit,
  })

  if (grouped.length === 0) return []

  const products = await prisma.product.findMany({
    where: { id: { in: grouped.map((g) => g.product_id) } },
    select: { id: true, uuid: true, name: true },
  })

  return grouped.map((g) => {
    const product = products.find((p) => p.id === g.product_id)!
    return {
      uuid: product.uuid,
      name: product.name,
      views: g._count.product_id,
    }
  })
}

export const getRecentActivities = async (userUuid: string, limit = 6) => {
  const tenant = await getTenant(userUuid)

  return await prisma.activityLog.findMany({
    where: { tenant_id: tenant.id },
    orderBy: { created_at: "desc" },
    take: limit,
    select: { id: true, type: true, message: true, created_at: true },
  })
}

export const recordProductView = async (licenseCode: string, source: "view" | "scan" = "view") => {
  const product = await prisma.product.findUnique({
    where: { license_code: licenseCode },
    select: { id: true },
  })
  if (!product) return null

  return await prisma.productView.create({
    data: { product_id: product.id, source },
  })
}

export const logActivity = async (tenantId: number, type: ActivityType, message: string) => {
  return await prisma.activityLog.create({
    data: { tenant_id: tenantId, type, message },
  })
}
