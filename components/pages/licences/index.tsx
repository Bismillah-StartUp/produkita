import ProductOverview from './partials/product-overview'
import CertificationsSection from './partials/certifications-section'
import NutritionFacts from './partials/nutrition-facts'
import CompanyInfo from './partials/company-info'

interface CertificationData {
  type: 'BPOM' | 'HALAL' | 'PIRT'
  number: string
  issueDate?: Date
  validUntil?: Date
  authority?: string
}

interface LicenceLayoutProps {
  code: string
}

export const LicenceLayout = ({ code }: LicenceLayoutProps) => {
  // Dummy data - akan diganti dengan API fetch nanti
  const dummyData = {
    certificate: {
      id: 1,
      uuid: code,
      bpom_number: 'MD 12345678901Z',
      pirt_number: 'P-IRT 2088370101234',
      license_number: 'LIC-001',
      createdAt: new Date('2024-01-15'),
    },
    product: {
      id: 1,
      uuid: 'prod-uuid-123',
      name: 'Sambal Pedas Original',
      image_url: 'https://images.unsplash.com/photo-1599599810694-b5ac4dd5ecc7?w=400&h=400&fit=crop',
      price: 25000,
      description: '250 ml',
      enterprise_id: 1,
    },
    enterprise: {
      id: 1,
      uuid: 'ent-uuid-123',
      name: 'PT Rasa Nusantara Sejahtera',
      phone: '+62 22 1234 5678',
      email: 'info@rasanusantara.co.id',
      address: 'Jl. Industri No. 45, Bandung, Jawa Barat 40123',
      description: 'Produsen makanan dan minuman berkualitas tinggi',
    },
    halal: {
      id: 1,
      uuid: 'halal-uuid-123',
      number: 'ID332100123456778',
      authority: 'MUI',
      valid_until: new Date('2026-03-10'),
      createdAt: new Date('2024-03-10'),
    },
    nutrition_info: {
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
    },
  }

  const { certificate, product, enterprise, halal, nutrition_info } = dummyData

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
      issueDate: halal.createdAt,
      validUntil: halal.valid_until,
    })
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation Tabs */}
      <nav className="border-b border-slate-200 sticky top-0 bg-white z-10">
        <div className="max-w-4xl mx-auto px-6 py-4 flex gap-6 overflow-x-auto">
          <button className="whitespace-nowrap pb-2 border-b-2 border-blue-600 text-blue-600 font-medium">
            Overview
          </button>
          {nutrition_info && (
            <button className="text-slate-600 whitespace-nowrap pb-2 hover:text-slate-900">
              Nutrition
            </button>
          )}
          <button className="text-slate-600 whitespace-nowrap pb-2 hover:text-slate-900">
            Certifications
          </button>
          <button className="text-slate-600 whitespace-nowrap pb-2 hover:text-slate-900">
            Company
          </button>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-6 py-12">
        {/* Product Overview Section */}
        <section className="pb-16">
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
          <section className="pb-16 border-t border-slate-200 pt-16" id="nutrition">
            <NutritionFacts
              servings={nutrition_info?.servings ? `${nutrition_info.servings} ml (1 sdm)` : undefined}
              calories={nutrition_info?.energy}
              fat={nutrition_info?.fat}
              saturatedFat={nutrition_info?.saturated_fat}
              carbs={nutrition_info?.carbo}
              protein={nutrition_info?.protein}
              sodium={nutrition_info?.natrium}
              sugar={nutrition_info?.sugar}
              testedDate={new Date()}
            />
          </section>
        )}

        {/* Certifications Section */}
        {certifications.length > 0 && (
          <section className="pb-16 border-t border-slate-200 pt-16" id="certifications">
            <CertificationsSection certifications={certifications} />
          </section>
        )}

        {/* Company Info Section */}
        <section className="border-t border-slate-200 pt-16" id="company">
          <CompanyInfo
            name={enterprise?.name || 'Company Name'}
            address={enterprise?.address}
            phone={enterprise?.phone}
            email={enterprise?.email}
            description={enterprise?.description}
          />
        </section>
      </main>
    </div>
  )
}
