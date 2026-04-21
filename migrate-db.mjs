import "dotenv/config"
import postgres from "postgres"

const connectionString = process.env.DIRECT_URL

console.log("🚀 Migrating database to Supabase...\n")

const sql = postgres(connectionString, {
  ssl: "require",
})

const migrations = [
  {
    name: "Create Enterprises Table",
    sql: `
      CREATE TABLE IF NOT EXISTS "enterprises" (
        "id" SERIAL NOT NULL,
        "uuid" UUID NOT NULL UNIQUE,
        "name" TEXT NOT NULL,
        "phone" TEXT,
        "email" TEXT,
        "description" TEXT,
        "address" TEXT,
        "status" TEXT NOT NULL,
        "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
        "updatedAt" TIMESTAMP(3) NOT NULL,
        CONSTRAINT "enterprises_pkey" PRIMARY KEY ("id")
      );
    `,
  },
  {
    name: "Create Halals Table",
    sql: `
      CREATE TABLE IF NOT EXISTS "halals" (
        "id" SERIAL NOT NULL,
        "uuid" UUID NOT NULL UNIQUE,
        "number" TEXT NOT NULL,
        "authority" TEXT,
        "valid_until" TIMESTAMP(3),
        "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
        "updatedAt" TIMESTAMP(3) NOT NULL,
        CONSTRAINT "halals_pkey" PRIMARY KEY ("id")
      );
    `,
  },
  {
    name: "Create Products Table",
    sql: `
      CREATE TABLE IF NOT EXISTS "products" (
        "id" SERIAL NOT NULL,
        "uuid" UUID NOT NULL UNIQUE,
        "name" TEXT NOT NULL,
        "image_url" TEXT,
        "price" DOUBLE PRECISION,
        "brand" TEXT,
        "description" TEXT,
        "enterprise_id" INTEGER NOT NULL,
        "type" TEXT NOT NULL,
        "barcode" TEXT UNIQUE,
        "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
        "updatedAt" TIMESTAMP(3) NOT NULL,
        CONSTRAINT "products_pkey" PRIMARY KEY ("id"),
        CONSTRAINT "products_enterprise_id_fkey" FOREIGN KEY ("enterprise_id") REFERENCES "enterprises"("id") ON DELETE RESTRICT ON UPDATE CASCADE
      );
    `,
  },
  {
    name: "Create Certificates Table",
    sql: `
      CREATE TABLE IF NOT EXISTS "certificates" (
        "id" SERIAL NOT NULL,
        "uuid" UUID NOT NULL UNIQUE,
        "enterprise_id" INTEGER NOT NULL,
        "product_id" INTEGER NOT NULL,
        "description" TEXT,
        "bpom_number" TEXT,
        "pirt_number" TEXT,
        "lisence_number" TEXT,
        "halal_id" INTEGER,
        "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
        "updatedAt" TIMESTAMP(3) NOT NULL,
        CONSTRAINT "certificates_pkey" PRIMARY KEY ("id"),
        CONSTRAINT "certificates_enterprise_id_fkey" FOREIGN KEY ("enterprise_id") REFERENCES "enterprises"("id") ON DELETE RESTRICT ON UPDATE CASCADE,
        CONSTRAINT "certificates_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "products"("id") ON DELETE RESTRICT ON UPDATE CASCADE,
        CONSTRAINT "certificates_halal_id_fkey" FOREIGN KEY ("halal_id") REFERENCES "halals"("id") ON DELETE SET NULL ON UPDATE CASCADE
      );
    `,
  },
  {
    name: "Create Nutrition Info Table",
    sql: `
      CREATE TABLE IF NOT EXISTS "nutrition_info" (
        "id" SERIAL NOT NULL,
        "product_id" INTEGER NOT NULL UNIQUE,
        "servings" DOUBLE PRECISION,
        "energy" DOUBLE PRECISION,
        "fat" DOUBLE PRECISION,
        "saturated_fat" DOUBLE PRECISION,
        "protein" DOUBLE PRECISION,
        "carbo" DOUBLE PRECISION,
        "sugar" DOUBLE PRECISION,
        "natrium" DOUBLE PRECISION,
        "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
        "updatedAt" TIMESTAMP(3) NOT NULL,
        CONSTRAINT "nutrition_info_pkey" PRIMARY KEY ("id"),
        CONSTRAINT "nutrition_info_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "products"("id") ON DELETE RESTRICT ON UPDATE CASCADE
      );
    `,
  },
]

async function migrate() {
  try {
    const url = new URL(connectionString)
    console.log(`📡 Connecting to: ${url.hostname}\n`)

    for (let i = 0; i < migrations.length; i++) {
      const { name, sql: migrationSql } = migrations[i]
      console.log(`[${i + 1}/${migrations.length}] ${name}...`)

      try {
        await sql.unsafe(migrationSql)
        console.log(`✅ Success\n`)
      } catch (error) {
        if (error.message.includes("already exists")) {
          console.log(`⚠️  Already exists\n`)
        } else {
          throw error
        }
      }
    }

    console.log("✨ All migrations completed!\n")
    console.log("📊 Created tables:")
    console.log("   • enterprises")
    console.log("   • halals")
    console.log("   • products")
    console.log("   • certificates")
    console.log("   • nutrition_info\n")

    console.log("🎉 Database is ready to use!\n")

    process.exit(0)
  } catch (error) {
    console.error("❌ Migration failed:", error.message)
    console.error("\nPlease ensure:")
    console.error("1. DATABASE_URL is correct in .env")
    console.error("2. Supabase project is active")
    console.error("3. Network allows PostgreSQL connections\n")
    process.exit(1)
  } finally {
    await sql.end()
  }
}

migrate()
