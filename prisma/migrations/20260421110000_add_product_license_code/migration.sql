-- Add missing license_code column to products
ALTER TABLE "products"
ADD COLUMN IF NOT EXISTS "license_code" TEXT;

CREATE UNIQUE INDEX IF NOT EXISTS "products_license_code_key" ON "products"("license_code");