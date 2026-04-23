import { prisma } from '@/lib/prisma'

/**
 * Fetch complete certificate data with all relationships by license code
 */
export async function getCertificateDetailsByCode(licenseCode: string) {
  try {
    const product = await prisma.product.findUnique({
      where: { license_code: licenseCode },
      include: {
        enterprise: true,
        nutrition_info: true,
        certificates: {
          include: {
            halal: true,
          },
        },
      },
    })

    if (!product || !product.certificates || product.certificates.length === 0) {
      return null
    }

    const certificate = product.certificates[0]
    const halal = certificate?.halal
    const enterprise = product.enterprise as unknown as {
      id: number
      uuid: string
      name: string
      district: string | null
      province: string | null
      phone: string | null
      email: string | null
      address: string | null
      description: string | null
    }

    // Format response to match LicenceLayout interface
    return {
      certificate: {
        id: certificate.id,
        uuid: certificate.uuid,
        bpom_number: certificate.bpom_number,
        pirt_number: certificate.pirt_number,
        license_number: certificate.lisence_number,
        createdAt: certificate.createdAt,
      },
      product: {
        id: product.id,
        uuid: product.uuid,
        name: product.name,
        image_url: product.image_url,
        price: product.price,
        brand: product.brand,
        description: product.description,
        type: product.type,
        license_code: product.license_code,
        enterprise_id: product.enterprise_id,
      },
      enterprise: enterprise
        ? {
            id: enterprise.id,
            uuid: enterprise.uuid,
            name: enterprise.name,
            district: enterprise.district,
            province: enterprise.province,
            phone: enterprise.phone,
            email: enterprise.email,
            address: enterprise.address,
            description: enterprise.description,
          }
        : null,
      nutrition: product.nutrition_info
        ? {
            id: product.nutrition_info.id,
            product_id: product.nutrition_info.product_id,
            servings: product.nutrition_info.servings,
            energy: product.nutrition_info.energy,
            fat: product.nutrition_info.fat,
            saturated_fat: product.nutrition_info.saturated_fat,
            protein: product.nutrition_info.protein,
            carbo: product.nutrition_info.carbo,
            sugar: product.nutrition_info.sugar,
            natrium: product.nutrition_info.natrium,
          }
        : null,
      halal: halal
        ? {
            id: halal.id,
            uuid: halal.uuid,
            number: halal.number,
            authority: halal.authority,
            valid_until: halal.valid_until,
          }
        : null,
    }
  } catch (error) {
    console.error('Error fetching certificate details:', error)
    return null
  }
}
