/*
  Warnings:

  - You are about to drop the column `district` on the `tenants` table. All the data in the column will be lost.
  - The `status` column on the `tenants` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- CreateEnum
CREATE TYPE "TenantStatus" AS ENUM ('active', 'inactive', 'pending');

-- AlterTable
ALTER TABLE "tenants" DROP COLUMN "district",
ADD COLUMN     "business_field" TEXT,
ADD COLUMN     "city" TEXT,
ADD COLUMN     "latitude" DOUBLE PRECISION,
ADD COLUMN     "logo_public_id" TEXT,
ADD COLUMN     "logo_url" TEXT,
ADD COLUMN     "longitude" DOUBLE PRECISION,
ADD COLUMN     "npwp" TEXT,
ADD COLUMN     "place_public_id" TEXT,
ADD COLUMN     "place_url" TEXT,
ADD COLUMN     "postal_code" TEXT,
ADD COLUMN     "trade_name" TEXT,
ADD COLUMN     "website" TEXT,
ALTER COLUMN "name" DROP NOT NULL,
DROP COLUMN "status",
ADD COLUMN     "status" "TenantStatus" NOT NULL DEFAULT 'pending';
