-- Entre-Certivy Database Migrations for Supabase
-- Copy & paste this entire file into Supabase SQL Editor and click Run

-- ============================================================================
-- MIGRATION 1: Create Enterprises & Certificates Tables
-- ============================================================================

CREATE TABLE IF NOT EXISTS "enterprises" (
    "id" SERIAL NOT NULL,
    "uuid" UUID NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "address" TEXT,
    "status" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "enterprises_pkey" PRIMARY KEY ("id")
);

CREATE UNIQUE INDEX IF NOT EXISTS "enterprises_uuid_key" ON "enterprises"("uuid");

CREATE TABLE IF NOT EXISTS "certificates" (
    "id" SERIAL NOT NULL,
    "uuid" UUID NOT NULL,
    "enterprise_id" INTEGER NOT NULL,
    "description" TEXT,
    "permissions" TEXT NOT NULL,
    "is_halal" BOOLEAN,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "certificates_pkey" PRIMARY KEY ("id")
);

CREATE UNIQUE INDEX IF NOT EXISTS "certificates_uuid_key" ON "certificates"("uuid");

ALTER TABLE "certificates" ADD CONSTRAINT "certificates_enterprise_id_fkey" FOREIGN KEY ("enterprise_id") REFERENCES "enterprises"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- ============================================================================
-- MIGRATION 2: Create Products & Update Certificates
-- ============================================================================

DO $$ BEGIN
    CREATE TYPE "ProductType" AS ENUM ('food', 'beverage', 'cosmetic', 'pharmaceutical');
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

-- Drop existing permissions column and add new ones
ALTER TABLE "certificates" 
    DROP COLUMN IF EXISTS "permissions",
    ADD COLUMN IF NOT EXISTS "bpom_number" TEXT,
    ADD COLUMN IF NOT EXISTS "bpom_type" TEXT,
    ADD COLUMN IF NOT EXISTS "lisence_number" TEXT,
    ADD COLUMN IF NOT EXISTS "pirt_number" TEXT,
    ADD COLUMN IF NOT EXISTS "product_id" INTEGER;

CREATE TABLE IF NOT EXISTS "products" (
    "id" SERIAL NOT NULL,
    "uuid" UUID NOT NULL,
    "name" TEXT NOT NULL,
    "image_url" TEXT,
    "price" DOUBLE PRECISION,
    "brand" TEXT,
    "description" TEXT,
    "enterprise_id" INTEGER NOT NULL,
    "type" "ProductType" NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "products_pkey" PRIMARY KEY ("id")
);

CREATE UNIQUE INDEX IF NOT EXISTS "products_uuid_key" ON "products"("uuid");

ALTER TABLE "certificates" ADD CONSTRAINT "certificates_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "products"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

ALTER TABLE "products" ADD CONSTRAINT "products_enterprise_id_fkey" FOREIGN KEY ("enterprise_id") REFERENCES "enterprises"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- ============================================================================
-- MIGRATION 3: Create Nutrition Info Table
-- ============================================================================

CREATE TABLE IF NOT EXISTS "nutrition_infos" (
    "id" SERIAL NOT NULL,
    "product_id" INTEGER,
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

    CONSTRAINT "nutrition_infos_pkey" PRIMARY KEY ("id")
);

ALTER TABLE "nutrition_infos" ADD CONSTRAINT "nutrition_infos_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "products"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- ============================================================================
-- DONE! All tables created successfully
-- ============================================================================
