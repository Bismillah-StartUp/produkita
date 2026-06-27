"use server"

import {
  getProductInfoController,
  getProductNutritionController,
  getProductCertificatesController,
  getProductServingController,
  getProductCompanyController,
} from "./license.controller"

export const getProductInfo = async (licenseCode: string) => {
  return await getProductInfoController(licenseCode)
}

export const getProductNutrition = async (licenseCode: string) => {
  return await getProductNutritionController(licenseCode)
}

export const getProductCertificates = async (licenseCode: string) => {
  return await getProductCertificatesController(licenseCode)
}

export const getProductServing = async (licenseCode: string) => {
  return await getProductServingController(licenseCode)
}

export const getProductCompany = async (licenseCode: string) => {
  return await getProductCompanyController(licenseCode)
}