import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

async function main() {
  console.log("🚀 Testing Prisma Client with Supabase...\n")

  try {
    // Test connection
    console.log("📡 Connecting to database...")
    await prisma.$queryRaw`SELECT version()`
    console.log("✅ Connection successful\n")

    // Test queries
    console.log("📊 Testing Prisma queries:")

    const enterpriseCount = await prisma.enterprise.count()
    console.log(`   • Enterprises: ${enterpriseCount}`)

    const productCount = await prisma.product.count()
    console.log(`   • Products: ${productCount}`)

    const certificateCount = await prisma.certificate.count()
    console.log(`   • Certificates: ${certificateCount}`)

    const halalCount = await prisma.halal.count()
    console.log(`   • Halals: ${halalCount}`)

    const nutritionCount = await prisma.nutritionInfo.count()
    console.log(`   • Nutrition Info: ${nutritionCount}`)

    console.log("\n✨ All Prisma queries working!\n")
    console.log("🎉 Supabase + Prisma integration is complete!\n")
  } catch (error) {
    console.error("❌ Error:", error.message)
    process.exit(1)
  } finally {
    await prisma.$disconnect()
  }
}

main()
