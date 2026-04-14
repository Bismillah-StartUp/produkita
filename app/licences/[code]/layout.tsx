'use client'

import { useState, useEffect, createContext, useContext } from 'react'
import { HeaderLicences, NavbarLicences } from '@/components/navigations'

interface LayoutProps {
  children: React.ReactNode
}

// Context untuk share mobile state dan active tab ke children
const LicenceContext = createContext<{
  isMobile: boolean
  activeTab: 'overview' | 'nutrition' | 'certifications' | 'company'
  onTabChange: (tab: 'overview' | 'nutrition' | 'certifications' | 'company') => void
  enterpriseName: string
  setEnterpriseName: (name: string) => void
}>({
  isMobile: false,
  activeTab: 'overview',
  onTabChange: () => {},
  enterpriseName: 'Company',
  setEnterpriseName: () => {},
})

export const useLicenceContext = () => {
  const context = useContext(LicenceContext)
  if (!context) {
    throw new Error('useLicenceContext must be used within LicenceLayout')
  }
  return context
}

export default function LicenceLayout({ children }: LayoutProps) {
  const [isMobile, setIsMobile] = useState(false)
  const [activeTab, setActiveTab] = useState<'overview' | 'nutrition' | 'certifications' | 'company'>('overview')
  const [enterpriseName, setEnterpriseName] = useState('Company Name')

  // Detect mobile view
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 1024)
    }

    handleResize()
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  const handleTabChange = (tab: 'overview' | 'nutrition' | 'certifications' | 'company') => {
    setActiveTab(tab)

    // Desktop view: scroll to section
    if (!isMobile) {
      setTimeout(() => {
        const element = document.getElementById(`section-${tab}`)
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' })
        }
      }, 0)
    }
  }

  // Desktop view: detect scroll position
  useEffect(() => {
    if (isMobile) return

    const handleScroll = () => {
      const sections: Array<'overview' | 'nutrition' | 'certifications' | 'company'> = [
        'overview',
        'nutrition',
        'certifications',
        'company',
      ]
      let currentSection: 'overview' | 'nutrition' | 'certifications' | 'company' = 'overview'

      for (const sectionId of sections) {
        const element = document.getElementById(`section-${sectionId}`)
        if (element) {
          const rect = element.getBoundingClientRect()
          if (rect.top <= 150) {
            currentSection = sectionId
          }
        }
      }

      setActiveTab(currentSection)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [isMobile])

  // Mobile: filter children to show only active section
  const renderContent = () => {
    if (!isMobile) {
      return children
    }

    // For mobile, we'll use CSS to hide/show sections
    return (
      <div className="mobile-content-wrapper">
        {children}
      </div>
    )
  }

  return (
    <LicenceContext.Provider
      value={{
        isMobile,
        activeTab,
        onTabChange: handleTabChange,
        enterpriseName,
        setEnterpriseName,
      }}
    >
      <style>{`
        .mobile-content-wrapper section {
          display: none;
        }
        .mobile-content-wrapper #section-${activeTab} {
          display: block !important;
        }
      `}</style>

      <div className="min-h-screen bg-white">
        {/* Header */}
        <HeaderLicences companyName={enterpriseName} isVerified={true} />

        {/* Main Content */}
        <main className="max-w-4xl mx-auto px-3 sm:px-6 py-8 sm:py-12 pb-32">
          {renderContent()}
        </main>

        {/* Navigation */}
        <NavbarLicences activeTab={activeTab} onTabChange={handleTabChange} isMobileView={isMobile} />
      </div>
    </LicenceContext.Provider>
  )
}

