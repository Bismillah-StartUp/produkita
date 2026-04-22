import "dotenv/config"
import postgres from "postgres"

const sql = postgres(process.env.DIRECT_URL, {
  ssl: "require",
})

console.log("🚀 Testing Supabase Database Tables...\n")

async function test() {
  try {
    // Test enterprises table
    const enterprises = await sql`SELECT * FROM enterprises LIMIT 1`
    console.log("✅ Enterprises table: OK")

    // Test products table
    const products = await sql`SELECT * FROM products LIMIT 1`
    console.log("✅ Products table: OK")

    // Test certificates table
    const certificates = await sql`SELECT * FROM certificates LIMIT 1`
    console.log("✅ Certificates table: OK")

    // Test halals table
    const halals = await sql`SELECT * FROM halals LIMIT 1`
    console.log("✅ Halals table: OK")

    // Test nutrition_info table
    const nutrition = await sql`SELECT * FROM nutrition_info LIMIT 1`
    console.log("✅ Nutrition Info table: OK")

    console.log("\n📊 All tables verified!\n")

    // Get table counts
    const counts = await sql`
      SELECT 
        (SELECT COUNT(*) FROM enterprises) as enterprises,
        (SELECT COUNT(*) FROM products) as products,
        (SELECT COUNT(*) FROM certificates) as certificates,
        (SELECT COUNT(*) FROM halals) as halals,
        (SELECT COUNT(*) FROM nutrition_info) as nutrition_info
    `

    console.log("📈 Current data:")
    console.log(`   • Enterprises: ${counts[0].enterprises}`)
    console.log(`   • Products: ${counts[0].products}`)
    console.log(`   • Certificates: ${counts[0].certificates}`)
    console.log(`   • Halals: ${counts[0].halals}`)
    console.log(`   • Nutrition Info: ${counts[0].nutrition_info}`)

    console.log("\n🎉 Database is fully operational!\n")

    process.exit(0)
  } catch (error) {
    console.error("❌ Error:", error.message)
    process.exit(1)
  } finally {
    await sql.end()
  }
}

test()
