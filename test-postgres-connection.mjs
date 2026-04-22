import "dotenv/config"
import postgres from "postgres"

console.log("Testing Supabase PostgreSQL connection...\n")

const url = process.env.DATABASE_URL

console.log("Connection string (masked):")
console.log(url.replace(/:[^:@]+@/, ":***@"))

try {
  const sql = postgres(url, {
    ssl: "require",
    connect_timeout: 10,
  })

  console.log("\n✓ Creating connection...")

  // Test query
  const result = await sql`SELECT version()`
  console.log("✓ Query successful!")
  console.log("PostgreSQL version:", result[0].version)

  await sql.end()
  console.log("\n✅ Connection successful!")
} catch (error) {
  console.error("\n❌ Connection failed:")
  console.error("Error:", error.message)

  if (error.message.includes("ENOENT")) {
    console.error("\nPossible causes:")
    console.error("• DNS resolution issue")
    console.error("• Hostname is incorrect")
    console.error("• Network connectivity problem")
  }

  process.exit(1)
}
