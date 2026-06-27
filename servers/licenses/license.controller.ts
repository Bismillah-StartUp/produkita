import {
  getProductInfo,
  getProductNutrition,
  getProductCertificates,
  getProductServing,
  getProductCompany,
} from "./license.service"

export const getProductInfoController = async (licenseCode: string) => {
  if (!licenseCode) throw new Error("License code wajib diisi")
  const data = await getProductInfo(licenseCode)
  if (!data) throw new Error("Produk tidak ditemukan")
  return data
}

export const getProductNutritionController = async (licenseCode: string) => {
  if (!licenseCode) throw new Error("License code wajib diisi")
  const data = await getProductNutrition(licenseCode)
  if (!data) throw new Error("Data nutrisi tidak ditemukan")
  return data
}

export const getProductCertificatesController = async (licenseCode: string) => {
  if (!licenseCode) throw new Error("License code wajib diisi")
  return await getProductCertificates(licenseCode)
}

export const getProductServingController = async (licenseCode: string) => {
  if (!licenseCode) throw new Error("License code wajib diisi")
  const data = await getProductServing(licenseCode)
  if (!data) throw new Error("Data penyajian tidak ditemukan")
  return data
}

export const getProductCompanyController = async (licenseCode: string) => {
  if (!licenseCode) throw new Error("License code wajib diisi")
  const data = await getProductCompany(licenseCode)
  if (!data) throw new Error("Data perusahaan tidak ditemukan")
  return data
}