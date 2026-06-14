/*
  Warnings:

  - You are about to drop the column `bpom_number` on the `certificates` table. All the data in the column will be lost.
  - You are about to drop the column `description` on the `certificates` table. All the data in the column will be lost.
  - You are about to drop the column `halal_id` on the `certificates` table. All the data in the column will be lost.
  - You are about to drop the column `license_number` on the `certificates` table. All the data in the column will be lost.
  - You are about to drop the column `pirt_number` on the `certificates` table. All the data in the column will be lost.
  - You are about to drop the `halals` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `type` to the `certificates` table without a default value. This is not possible if the table is not empty.
  - Added the required column `public_id` to the `product_images` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "CertificateType" AS ENUM ('bpom', 'pirt', 'halal', 'coa');

-- CreateEnum
CREATE TYPE "WeightUnits" AS ENUM ('g', 'kg', 'ml', 'l', 'pcs', 'lusin');

-- DropForeignKey
ALTER TABLE "certificates" DROP CONSTRAINT "certificates_halal_id_fkey";

-- AlterTable
ALTER TABLE "certificates" DROP COLUMN "bpom_number",
DROP COLUMN "description",
DROP COLUMN "halal_id",
DROP COLUMN "license_number",
DROP COLUMN "pirt_number",
ADD COLUMN     "certificate_public_id" TEXT,
ADD COLUMN     "certificate_url" TEXT,
ADD COLUMN     "lab_name" TEXT,
ADD COLUMN     "number" TEXT,
ADD COLUMN     "registered_at" TIMESTAMP(3),
ADD COLUMN     "type" "CertificateType" NOT NULL,
ADD COLUMN     "valid_until" TIMESTAMP(3);

-- AlterTable
ALTER TABLE "nutrition_infos" ADD COLUMN     "allergens" TEXT[],
ADD COLUMN     "composition" TEXT,
ADD COLUMN     "serving_pkgs" DOUBLE PRECISION;

-- AlterTable
ALTER TABLE "product_images" ADD COLUMN     "public_id" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "products" ADD COLUMN     "barcode_url" TEXT,
ADD COLUMN     "qr_code_url" TEXT,
ADD COLUMN     "weight" DOUBLE PRECISION,
ADD COLUMN     "weight_unit" "WeightUnits";

-- AlterTable
ALTER TABLE "tenants" ADD COLUMN     "year" INTEGER;

-- DropTable
DROP TABLE "halals";

-- CreateTable
CREATE TABLE "product_servings" (
    "id" SERIAL NOT NULL,
    "uuid" UUID NOT NULL,
    "product_id" INTEGER NOT NULL,
    "serving_info" TEXT,
    "serving_portion" TEXT,
    "storage_info" TEXT,
    "video_url" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "product_servings_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "product_serving_images" (
    "id" SERIAL NOT NULL,
    "uuid" UUID NOT NULL,
    "serving_id" INTEGER NOT NULL,
    "url" TEXT NOT NULL,
    "public_id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "product_serving_images_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "product_servings_uuid_key" ON "product_servings"("uuid");

-- CreateIndex
CREATE UNIQUE INDEX "product_servings_product_id_key" ON "product_servings"("product_id");

-- CreateIndex
CREATE UNIQUE INDEX "product_serving_images_uuid_key" ON "product_serving_images"("uuid");

-- AddForeignKey
ALTER TABLE "product_servings" ADD CONSTRAINT "product_servings_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "products"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "product_serving_images" ADD CONSTRAINT "product_serving_images_serving_id_fkey" FOREIGN KEY ("serving_id") REFERENCES "product_servings"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
