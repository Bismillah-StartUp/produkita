'use client'

import { useEffect } from 'react'
import ProductOverview from './partials/product-overview'
import CertificationsSection from './partials/certifications-section'
import NutritionFacts from './partials/nutrition-facts'
import CompanyInfo from './partials/company-info'
import { useLicenceContext } from '@/app/licenses/[code]/layout'

interface CertificationData {
  type: 'BPOM' | 'HALAL' | 'PIRT'
  number: string
  issueDate?: Date
  validUntil?: Date
  authority?: string
}

interface CertificateData {
  id: number
  uuid: string
  bpom_number: string | null
  pirt_number: string | null
  license_number: string | null
  createdAt: Date
}

interface ProductData {
  id: number
  uuid: string
  name: string
  image_url: string | null
  price: number | null
  brand: string | null
  description: string | null
  type: string
  enterprise_id: number
}

interface EnterpriseData {
  id: number
  uuid: string
  name: string
  phone: string | null
  email: string | null
  address: string | null
  description: string | null
}

interface NutritionData {
  id: number
  product_id: number
  servings: number | null
  energy: number | null
  fat: number | null
  saturated_fat: number | null
  protein: number | null
  carbo: number | null
  sugar: number | null
  natrium: number | null
}

interface HalalData {
  id: number
  uuid: string
  number: string
  authority: string | null
  valid_until: Date | null
}

interface LicenceLayoutData {
  certificate: CertificateData | null
  product: ProductData | null
  enterprise: EnterpriseData | null
  nutrition: NutritionData | null
  halal: HalalData | null
}

interface LicenceLayoutProps {
  code: string
  data?: LicenceLayoutData
}

export const LicenceLayout = ({ code, data }: LicenceLayoutProps) => {
  const { setEnterpriseName, setShowCertifications } = useLicenceContext()

  // Use provided data or fallback to dummy data
  const certificateData = data?.certificate || {
    id: 1,
    uuid: code,
    bpom_number: 'MD 12345678901Z',
    pirt_number: 'P-IRT 2088370101234',
    license_number: 'LIC-001',
    createdAt: new Date('2024-01-15'),
  }

  const product = data?.product || {
    id: 1,
    uuid: 'prod-uuid-123',
    name: 'Sambal Pedas Original',
    image_url: 'https://images.unsplash.com/photo-1599599810694-b5ac4dd5ecc7?w=400&h=400&fit=crop',
    price: 25000,
    brand: 'Rasa Nusantara',
    description: '250 ml',
    type: 'fnb',
    enterprise_id: 1,
  }

  const enterprise = data?.enterprise || {
    id: 1,
    uuid: 'ent-uuid-123',
    name: 'PT Rasa Nusantara Sejahtera',
    phone: '+62 22 1234 5678',
    email: 'info@rasanusantara.co.id',
    address: 'Jl. Industri No. 45, Bandung, Jawa Barat 40123',
    description: 'Produsen makanan dan minuman berkualitas tinggi',
  }

  const halal = data?.halal ?? null

  const nutrition_info = data?.nutrition || {
    id: 1,
    product_id: 1,
    servings: 15,
    energy: 25,
    fat: 1.5,
    saturated_fat: 0.5,
    protein: 0.5,
    carbo: 3,
    sugar: 0,
    natrium: 280,
  }

  const certificate = certificateData
  const showCertifications = Boolean(certificate?.bpom_number || certificate?.pirt_number || data?.halal)

  useEffect(() => {
    setEnterpriseName(enterprise?.name || 'Company Name')
  }, [enterprise?.name, setEnterpriseName])

  useEffect(() => {
    setShowCertifications(showCertifications)
  }, [setShowCertifications, showCertifications])

  // Prepare certifications array
  const certifications: CertificationData[] = []

  if (certificate?.bpom_number) {
    certifications.push({
      type: 'BPOM',
      number: certificate.bpom_number,
      authority: 'Badan Pengawas Obat dan Makanan (BPOM)',
      issueDate: certificate.createdAt,
      validUntil: new Date(new Date(certificate.createdAt).setFullYear(new Date(certificate.createdAt).getFullYear() + 5)),
    })
  }

  if (certificate?.pirt_number) {
    certifications.push({
      type: 'PIRT',
      number: certificate.pirt_number,
      authority: 'Dinas Kesehatan',
      issueDate: certificate.createdAt,
      validUntil: new Date(new Date(certificate.createdAt).setFullYear(new Date(certificate.createdAt).getFullYear() + 3)),
    })
  }

  if (halal) {
    certifications.push({
      type: 'HALAL',
      number: halal.number,
      authority: halal.authority || 'MUI',
      issueDate: new Date(), // Use current date if not provided
      validUntil: halal.valid_until || undefined,
    })
  }

  return (
    <>
      {/* Product Overview Section */}
      <section id="section-overview" className="pb-16">
        <ProductOverview
          productName={product?.name || 'Product Name'}
          productImage={product?.image_url}
          price={product?.price}
          volume={`${product?.description || '250 ml'}`}
          enterpriseName={enterprise?.name || 'Enterprise'}
          certifications={{
            hasBPOM: !!certificate?.bpom_number,
            hasPIRT: !!certificate?.pirt_number,
            hasHalal: !!halal,
            isLicensed: !!certificate?.license_number,
          }}
        />
      </section>

      {/* Nutrition Facts Section */}
      {nutrition_info && (
        <section id="section-nutrition" className="pb-16 border-t border-slate-200 pt-16">
          <NutritionFacts
            calories={nutrition_info?.energy ?? undefined}
            fat={nutrition_info?.fat ?? undefined}
            saturatedFat={nutrition_info?.saturated_fat ?? undefined}
            carbs={nutrition_info?.carbo ?? undefined}
            protein={nutrition_info?.protein ?? undefined}
            sodium={nutrition_info?.natrium ?? undefined}
            sugar={nutrition_info?.sugar ?? undefined}
          />
        </section>
      )}

      {/* Certifications Section */}
      {certifications.length > 0 && (
        <section id="section-certifications" className="pb-16 border-t border-slate-200 pt-16">
          <CertificationsSection certifications={certifications} />
        </section>
      )}

      {/* Company Info Section */}
      <section id="section-company" className="border-t border-slate-200 pt-16">
        <CompanyInfo
          name={enterprise?.name || 'Company Name'}
          address={enterprise?.address ?? undefined}
          phone={enterprise?.phone ?? undefined}
          email={enterprise?.email ?? undefined}
          description={enterprise?.description ?? undefined}
        />
      </section>
    </>
  )
}
