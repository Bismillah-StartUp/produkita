"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { useState } from "react"
import { LayoutDashboard, Package, TrendingUp, Calculator, Info, ChevronDown } from "lucide-react"

const menuItems = [
  {
    title: "Dashboard",
    href: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    title: "Produk UMKM",
    icon: Package,
    submenu: [
      { title: "List Produk", href: "/dashboard/products" },
      { title: "Pendaftaran Produk", href: "/dashboard/products/register" },
    ],
  },
  {
    title: "Manajemen Keuangan",
    href: "/dashboard/financials",
    icon: TrendingUp,
  },
  {
    title: "Kalkulator HPP",
    href: "/dashboard/calculators",
    icon: Calculator,
  },
  {
    title: "Informasi UMKM",
    href: "/dashboard/info",
    icon: Info,
  },
]

export const Sidebar = () => {
  const pathname = usePathname()
  const [openSubmenu, setOpenSubmenu] = useState<string | null>(null)
  const [isOpen, setIsOpen] = useState(true)

  const isActive = (href: string) => pathname === href || pathname.startsWith(href + "/")
  const isSubmenuActive = (submenu: Array<{ href: string }>) =>
    submenu.some((item) => pathname === item.href || pathname.startsWith(item.href + "/"))

  const toggleSubmenu = (title: string) => {
    setOpenSubmenu(openSubmenu === title ? null : title)
  }

  return (
    <aside className={`bg-white border-r border-slate-200 min-h-screen flex flex-col transition-all duration-300 ${
      isOpen ? 'w-64' : 'w-20'
    }`}>
      <div className="border-b border-slate-200 px-6 py-4 flex items-center h-15">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center gap-2 hover:opacity-75 transition-opacity"
          title={isOpen ? 'Tutup sidebar' : 'Buka sidebar'}
        >
          <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center shrink-0">
            <span className="text-white font-bold">P</span>
          </div>
          {isOpen && (
            <p className="font-bold text-slate-900">Produkita</p>
          )}
        </button>
      </div>

      <nav className={`flex-1 space-y-2 ${isOpen ? 'px-4 py-6' : 'px-2 py-6'}`}>
        {menuItems.map((item) => {
          const Icon = item.icon
          const hasSubmenu = !!item.submenu
          const isOpenItem = openSubmenu === item.title
          const submenuActive = hasSubmenu && isSubmenuActive(item.submenu)

          return (
            <div key={item.title}>
              {hasSubmenu ? (
                <button
                  onClick={() => isOpen && toggleSubmenu(item.title)}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                    submenuActive
                      ? 'bg-blue-50 text-blue-600 font-medium'
                      : 'text-slate-600 hover:bg-slate-50'
                  }`}
                  title={!isOpen ? item.title : ''}
                >
                  <Icon size={20} className="shrink-0" />
                  {isOpen && (
                    <>
                      <span>{item.title}</span>
                      <ChevronDown
                        size={16}
                        className={`ml-auto transition-transform ${
                          isOpenItem ? 'rotate-180' : ''
                        }`}
                      />
                    </>
                  )}
                </button>
              ) : (
                <Link href={item.href!}>
                  <button
                    className={`flex w-full items-center gap-3 rounded-lg px-4 py-3 transition-colors ${
                      isActive(item.href!) ? "bg-blue-50 font-medium text-blue-600" : "text-slate-600 hover:bg-slate-50"
                    }`}
                    title={!isOpen ? item.title : ''}
                  >
                    <Icon size={20} className="shrink-0" />
                    {isOpen && <span>{item.title}</span>}
                  </button>
                </Link>
              )}

              {hasSubmenu && isOpenItem && isOpen && (
                <div className="ml-4 mt-2 space-y-1">
                  {item.submenu!.map((subitem) => (
                    <Link key={subitem.href} href={subitem.href}>
                      <button
                        className={`w-full rounded px-4 py-2 text-left text-sm transition-colors ${
                          pathname === subitem.href
                            ? "bg-blue-50 font-medium text-blue-600"
                            : "text-slate-600 hover:bg-slate-50"
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
        <button 
          className="w-full flex items-center gap-3 px-4 py-3 text-slate-600 hover:bg-slate-50 rounded-lg transition-colors"
          title={!isOpen ? 'Logout' : ''}
        >
          {isOpen && <span className="text-sm">Logout</span>}
        </button>
      </div>
    </aside>
  )
}

export default Sidebar
