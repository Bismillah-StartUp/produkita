'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Bell } from 'lucide-react'
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb'
import { useAuthStore } from '@/servers/stores/useAuthStore'

const SEGMENT_LABELS: Record<string, string> = {
  dashboard: 'Dashboard',
  products: 'Produk UMKM',
  financials: 'Manajemen Keuangan',
  calculators: 'Kalkulator HPP',
  umkm: 'Informasi UMKM',
  register: 'Pendaftaran Produk',
  tambah: 'Tambah Laporan',
  records: 'Catatan'
}

const isUuid = (segment: string) =>
  /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(segment)

const isCuid = (segment: string) =>
  /^c[a-z0-9]{24,}$/i.test(segment)

export const Header = () => {
  const pathname = usePathname()
  const { name, email, role } = useAuthStore()

  const generateBreadcrumbs = () => {
    const segments = pathname.split('/').filter(Boolean)
    const breadcrumbs: Array<{ label: string; href: string; current: boolean }> = []

    let currentPath = ''
    segments.forEach((segment, index) => {
      currentPath += `/${segment}`
      const isLast = index === segments.length - 1

      if (isUuid(segment) || isCuid(segment)) {
        breadcrumbs.push({
          label: 'Detail',
          href: currentPath,
          current: isLast,
        })
        return
      }

      const label =
        SEGMENT_LABELS[segment] ??
        segment
          .split('-')
          .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
          .join(' ')

      breadcrumbs.push({
        label,
        href: currentPath,
        current: isLast,
      })
    })

    return breadcrumbs
  }

  const breadcrumbs = generateBreadcrumbs()

  // ambil inisial dari name atau email
  const displayName = name || email?.split('@')[0] || 'User'
  const initial = displayName.charAt(0).toUpperCase()
  const displayRole = role === 'superadmin' ? 'Super Admin' : role === 'admin' ? 'Admin' : 'User'

  return (
    <header className="bg-white border-b border-slate-200 px-6 py-4 flex items-center justify-between h-15">
      <Breadcrumb>
        <BreadcrumbList>
          {breadcrumbs.map((crumb, index) => (
            <div key={crumb.href} className="flex items-center gap-1.5">
              <BreadcrumbItem>
                {crumb.current ? (
                  <BreadcrumbPage>{crumb.label}</BreadcrumbPage>
                ) : (
                  <BreadcrumbLink asChild>
                    <Link href={crumb.href}>{crumb.label}</Link>
                  </BreadcrumbLink>
                )}
              </BreadcrumbItem>
              {index < breadcrumbs.length - 1 && <BreadcrumbSeparator />}
            </div>
          ))}
        </BreadcrumbList>
      </Breadcrumb>

      <div className="flex items-center gap-6">
        <button className="text-slate-600 hover:text-slate-900 relative">
          <Bell size={20} />
          <span className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full" />
        </button>

        <div className="flex items-center gap-3 pl-4 border-l border-slate-200">
          <div className="w-8 h-8 bg-linear-to-br from-blue-400 to-blue-600 rounded-full flex items-center justify-center text-white text-xs font-bold">
            {initial}
          </div>
          <div className="text-right">
            <p className="text-sm font-medium text-slate-900">{displayName}</p>
            <p className="text-xs text-slate-500">{displayRole}</p>
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header