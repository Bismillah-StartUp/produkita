'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState } from 'react'
import { LayoutDashboard, Package, TrendingUp, Calculator, Info, ChevronDown } from 'lucide-react'

const menuItems = [
  {
    title: 'Dashboard',
    href: '/dashboard',
    icon: LayoutDashboard,
  },
  {
    title: 'Produk UMKM',
    icon: Package,
    submenu: [
      { title: 'List Produk', href: '/dashboard/products' },
      { title: 'Pendaftaran Produk', href: '/dashboard/products/register' },
    ],
  },
  {
    title: 'Manajemen Keuangan',
    href: '/dashboard/financials',
    icon: TrendingUp,
  },
  {
    title: 'Kalkulator HPP',
    href: '/dashboard/calculator',
    icon: Calculator,
  },
  {
    title: 'Informasi UMKM',
    href: '/dashboard/info',
    icon: Info,
  },
]

export const Sidebar = () => {
  const pathname = usePathname()
  const [openSubmenu, setOpenSubmenu] = useState<string | null>(null)

  const isActive = (href: string) => pathname === href || pathname.startsWith(href + '/')
  const isSubmenuActive = (submenu: Array<{ href: string }>) =>
    submenu.some((item) => pathname === item.href || pathname.startsWith(item.href + '/'))

  const toggleSubmenu = (title: string) => {
    setOpenSubmenu(openSubmenu === title ? null : title)
  }

  return (
    <aside className="w-64 bg-white border-r border-slate-200 min-h-screen flex flex-col">
      <div className="p-6 border-b border-slate-200">
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
            <span className="text-white font-bold">P</span>
          </div>
          <div>
            <p className="font-bold text-slate-900">Produkita</p>
            <p className="text-xs text-slate-500">Platform UMKM</p>
          </div>
        </div>
      </div>

      <nav className="flex-1 px-4 py-6 space-y-2">
        {menuItems.map((item) => {
          const Icon = item.icon
          const hasSubmenu = !!item.submenu
          const isOpen = openSubmenu === item.title
          const submenuActive = hasSubmenu && isSubmenuActive(item.submenu)

          return (
            <div key={item.title}>
              {hasSubmenu ? (
                <button
                  onClick={() => toggleSubmenu(item.title)}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                    submenuActive
                      ? 'bg-blue-50 text-blue-600 font-medium'
                      : 'text-slate-600 hover:bg-slate-50'
                  }`}
                >
                  <Icon size={20} />
                  <span>{item.title}</span>
                  <ChevronDown
                    size={16}
                    className={`ml-auto transition-transform ${
                      isOpen ? 'rotate-180' : ''
                    }`}
                  />
                </button>
              ) : (
                <Link href={item.href!}>
                  <button
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                      isActive(item.href!)
                        ? 'bg-blue-50 text-blue-600 font-medium'
                        : 'text-slate-600 hover:bg-slate-50'
                    }`}
                  >
                    <Icon size={20} />
                    <span>{item.title}</span>
                  </button>
                </Link>
              )}

              {hasSubmenu && isOpen && (
                <div className="ml-4 mt-2 space-y-1">
                  {item.submenu!.map((subitem) => (
                    <Link key={subitem.href} href={subitem.href}>
                      <button
                        className={`w-full text-left px-4 py-2 text-sm rounded transition-colors ${
                          pathname === subitem.href
                            ? 'text-blue-600 font-medium bg-blue-50'
                            : 'text-slate-600 hover:bg-slate-50'
                        }`}
                      >
                        {subitem.title}
                      </button>
                    </Link>
                  ))}
                </div>
              )}
            </div>
          )
        })}
      </nav>

      <div className="border-t border-slate-200 p-4">
        <button className="w-full flex items-center gap-3 px-4 py-3 text-slate-600 hover:bg-slate-50 rounded-lg transition-colors">
          <span className="text-sm">Logout</span>
        </button>
      </div>
    </aside>
  )
}

export default Sidebar