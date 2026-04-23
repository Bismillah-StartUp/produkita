import { NextRequest, NextResponse } from "next/server"
import { v4 as uuidv4 } from "uuid"
import { uploadImage } from "@/configs/cloudinary/utils"
import { prisma } from "@/lib/prisma"
import { generateBarcode, generateLicensesCode, generateQRCode } from "@/lib/utils"
import { sendBarcodeEmail } from "@/lib/send-barcode-email"

interface RegistrySubmitData {
  productData: {
    productName: string
    brandName: string
    price: string
    weight: string
    unit: string
    productPhotoBase64?: string // base64 image data
  }
  nutritionData: {
    servingSize: string
    calories: string
    totalFat: string
    saturatedFat: string
    carbohydrates: string
    protein: string
    sodium: string
    sugar: string
  }
  legalityData: {
    hasBpom?: boolean
    hasPirt?: boolean
    hasHalal?: boolean
    bpomNumber: string
    productCategory: string
    bpomRegistrationDate: string
    bpomValidUntil: string
    pirtNumber: string
    pirtRegistrationDate: string
    pirtValidUntil: string
    halalCertificateNumber: string
    halalCertifiedBy: string
    halalIssuanceDate: string
    halalValidUntil: string
  }
  enterpriseData: {
    companyName: string
    district: string
    province: string
    address: string
    phone: string
    email: string
  }
}

export async function POST(request: NextRequest) {
  try {
    const data: RegistrySubmitData = await request.json()
    const recipientEmail = data.enterpriseData.email

    console.log("📝 Received registry submission")

    // Validate required data
    if (
      !data.productData ||
      !data.nutritionData ||
      !data.legalityData ||
      !data.enterpriseData
    ) {
      return NextResponse.json(
        { success: false, error: "Missing required data" },
        { status: 400 }
      )
    }

    let productImageUrl = ""
    if (data.productData.productPhotoBase64) {
      console.log("⬆️ Uploading product image to Cloudinary...")
      const uploadResponse = await uploadImage(
        data.productData.productPhotoBase64,
        "documents"
      )
      productImageUrl = uploadResponse.secure_url
      console.log("✓ Image uploaded:", productImageUrl)
    }

    const productCategoryMap: Record<string, "fnb" | "cosmetic" | "pharmaceutical"> = {
      "fnb": "fnb",
      "cosmetic": "cosmetic",
      "pharmaceutical": "pharmaceutical",
      "food": "fnb",
      "makanan": "fnb",
    }
    const productType = productCategoryMap[data.legalityData.productCategory?.toLowerCase() || ""] || "fnb"
    const licenseCode = generateLicensesCode(data.productData.productName, productType)

    // Start transaction
    const result = await prisma.$transaction(async (tx) => {
      // 1. Create or find enterprise
      console.log("✓ Creating enterprise...")
      const enterprise = await tx.enterprise.create({
        data: {
          uuid: uuidv4(),
          name: data.enterpriseData.companyName,
          district: data.enterpriseData.district,
          province: data.enterpriseData.province,
          description: "",
          address: data.enterpriseData.address,
          email: data.enterpriseData.email,
          phone: data.enterpriseData.phone,
          status: "active",
        },
      })

      // 2. Create product
      console.log("✓ Creating product...")
      const productUuid = uuidv4()
      
      const product = await tx.product.create({
        data: {
          uuid: productUuid,
          name: data.productData.productName,
          brand: data.productData.brandName,
          price: parseFloat(data.productData.price),
          image_url: productImageUrl || null,
          description: `${data.productData.weight}${data.productData.unit}`,
          type: productType,
          enterprise_id: enterprise.id,
          license_code: licenseCode,
        },
      })

      // 3. Create nutrition info
      console.log("✓ Creating nutrition info...")
      const nutritionInfo = await tx.nutritionInfo.create({
        data: {
          product_id: product.id,
          servings: parseFloat(data.nutritionData.servingSize),
          energy: parseFloat(data.nutritionData.calories),
          fat: parseFloat(data.nutritionData.totalFat),
          saturated_fat: parseFloat(data.nutritionData.saturatedFat),
          carbo: parseFloat(data.nutritionData.carbohydrates),
          protein: parseFloat(data.nutritionData.protein),
          natrium: parseFloat(data.nutritionData.sodium),
          sugar: parseFloat(data.nutritionData.sugar),
        },
      })

      // 4. Create halal certificate (if exists)
      let halal = null
      if (data.legalityData.hasHalal && data.legalityData.halalCertificateNumber) {
        console.log("✓ Creating halal certificate...")
        halal = await tx.halal.create({
          data: {
            uuid: uuidv4(),
            number: data.legalityData.halalCertificateNumber,
            authority: data.legalityData.halalCertifiedBy,
            valid_until: new Date(data.legalityData.halalValidUntil),
          },
        })
      }

      // 5. Create certificate (legality)
      console.log("✓ Creating certificate...")
      const certificate = await tx.certificate.create({
        data: {
          uuid: uuidv4(),
          enterprise_id: enterprise.id,
          product_id: product.id,
          description: [
            data.legalityData.hasBpom && data.legalityData.bpomNumber ? `BPOM: ${data.legalityData.bpomNumber}` : null,
            data.legalityData.hasPirt && data.legalityData.pirtNumber ? `PIRT: ${data.legalityData.pirtNumber}` : null,
          ].filter(Boolean).join(" | ") || null,
          bpom_number: data.legalityData.hasBpom ? data.legalityData.bpomNumber || null : null,
          pirt_number: data.legalityData.hasPirt ? data.legalityData.pirtNumber || null : null,
          lisence_number: licenseCode,
          halal_id: data.legalityData.hasHalal ? halal?.id : null,
        },
      })

      return {
        enterprise,
        product,
        nutritionInfo,
        halal,
        certificate,
      }
    })

    console.log("✅ Registry submission successful")

    // Generate QRCode linking to license page
    const productLicenseCode = result.product.license_code || licenseCode
    const baseUrl = process.env.NEXT_PUBLIC_APP_URL || process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'
    const licensePageUrl = `${baseUrl}/licenses/${productLicenseCode}`
    const qrCodeDataUrl = await generateQRCode(licensePageUrl)
    const barcodeDataUrl = await generateBarcode(licensePageUrl)

    if (!recipientEmail) {
      throw new Error("Enterprise email is required to send barcode and QR code")
    }

    let emailSent = false
    let emailError: string | null = null

    try {
      await sendBarcodeEmail({
        email: recipientEmail,
        productName: result.product.name,
        companyName: result.enterprise.name,
        licenseCode: productLicenseCode,
        licensePageUrl,
        barcodeDataUrl,
        qrCodeDataUrl,
      })
      emailSent = true
    } catch (sendError) {
      emailError = sendError instanceof Error ? sendError.message : "Failed to send barcode email"
      console.error("⚠️ Barcode email failed:", sendError)
    }

    return NextResponse.json(
      {
        success: true,
        message: "Registry submitted successfully",
        data: {
          enterpriseId: result.enterprise.id,
          enterpriseUuid: result.enterprise.uuid,
          productId: result.product.id,
          productUuid: result.product.uuid,
          productName: result.product.name,
          licenseCode: productLicenseCode,
          licensePageUrl: licensePageUrl,
          emailSent,
          emailError,
        },
        timestamp: new Date().toISOString(),
      },
      { status: 201 }
    )
  } catch (error) {
    console.error("❌ Registry submission error:", error)

    const errorMessage =
      error instanceof Error ? error.message : "Unknown error occurred"

    return NextResponse.json(
      {
        success: false,
        error: "Failed to submit registry",
        details: errorMessage,
        timestamp: new Date().toISOString(),
      },
      { status: 500 }
    )
  } finally {
    await prisma.$disconnect()
  }
}
