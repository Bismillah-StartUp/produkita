import prisma from "@/lib/prisma"

export const getProductInfo = async (licenseCode: string) => {
  return await prisma.product.findUnique({
    where: { license_code: licenseCode },
    select: {
      uuid: true,
      name: true,
      brand: true,
      price: true,
      weight: true,
      weight_unit: true,
      description: true,
      type: true,
      license_code: true,
      updated_at: true,
      images: {
        select: { uuid: true, url: true },
      },
      certificates: {
        select: { type: true, number: true },
      },
      tenant: {
        select: { city: true, province: true },
      },
    },
  })
}

export const getProductNutrition = async (licenseCode: string) => {
  return await prisma.nutritionInfo.findFirst({
    where: { product: { license_code: licenseCode } },
    select: {
      servings: true,
      serving_pkgs: true,
      energy: true,
      fat: true,
      saturated_fat: true,
      protein: true,
      carbo: true,
      sugar: true,
      natrium: true,
      composition: true,
      allergens: true,
    },
  })
}

export const getProductCertificates = async (licenseCode: string) => {
  return await prisma.certificate.findMany({
    where: { product: { license_code: licenseCode } },
    select: {
      uuid: true,
      type: true,
      number: true,
      registered_at: true,
      valid_until: true,
      lab_name: true,
      certificate_url: true,
    },
  })
}

export const getProductServing = async (licenseCode: string) => {
  return await prisma.productServing.findFirst({
    where: { product: { license_code: licenseCode } },
    select: {
      serving_info: true,
      serving_portion: true,
      storage_info: true,
      video_url: true,
      images: {
        select: { uuid: true, url: true },
      },
    },
  })
}

export const getProductCompany = async (licenseCode: string) => {
  return await prisma.tenant.findFirst({
    where: { products: { some: { license_code: licenseCode } } },
    select: {
      uuid: true,
      name: true,
      trade_name: true,
      business_field: true,
      description: true,
      address: true,
      city: true,
      province: true,
      postal_code: true,
      email: true,
      phonenumber: true,
      website: true,
      logo_url: true,
      place_url: true,
      latitude: true,
      longitude: true,
      year: true,
    },
  })
}