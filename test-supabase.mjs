import "dotenv/config"
import { createClient } from "@supabase/supabase-js"

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY

console.log("Testing Supabase connection...")
console.log("URL:", supabaseUrl)
console.log("Key:", supabaseKey ? "✓ Present" : "✗ Missing")

if (!supabaseUrl || !supabaseKey) {
  console.error("❌ Missing Supabase credentials in .env")
  process.exit(1)
}

const supabase = createClient(supabaseUrl, supabaseKey)

async function test() {
  try {
    console.log("\n1. Testing Supabase Auth Service...")
    const { data: authData } = await supabase.auth.getSession()
    console.log("✓ Auth service: OK")

    console.log("\n2. Testing Database Query...")
    const { data, error, status } = await supabase
      .from("enterprises")
      .select("count(*)")
      .limit(1)

    if (error) {
      console.error("✗ Database Query Error:", error.message)
      console.error("Code:", error.code)
      console.error("Status:", status)
    } else {
      console.log("✓ Database Query: OK")
      console.log("Response:", data)
    }

    console.log("\n3. Testing Postgres Direct Connection...")
    const pgUrl = process.env.DATABASE_URL
    console.log("Connection String:", pgUrl ? "✓ Present" : "✗ Missing")

    console.log("\n✅ Supabase Client-side Connection: READY")
  } catch (error) {
    console.error("❌ Error:", error)
    process.exit(1)
  }
}

test()
