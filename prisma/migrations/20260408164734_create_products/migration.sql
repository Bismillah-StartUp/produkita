/*
  Warnings:

  - You are about to drop the column `permissions` on the `certificates` table. All the data in the column will be lost.
  - Added the required column `product_id` to the `certificates` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "ProductType" AS ENUM ('food', 'beverage', 'cosmetic', 'pharmaceutical');

-- AlterTable
ALTER TABLE "certificates" DROP COLUMN "permissions",
ADD COLUMN     "bpom_number" TEXT,
ADD COLUMN     "bpom_type" TEXT,
ADD COLUMN     "lisence_number" TEXT,
ADD COLUMN     "pirt_number" TEXT,
ADD COLUMN     "product_id" INTEGER NOT NULL;

-- CreateTable
CREATE TABLE "products" (
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

-- CreateIndex
CREATE UNIQUE INDEX "products_uuid_key" ON "products"("uuid");

-- AddForeignKey
ALTER TABLE "certificates" ADD CONSTRAINT "certificates_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "products"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "products" ADD CONSTRAINT "products_enterprise_id_fkey" FOREIGN KEY ("enterprise_id") REFERENCES "enterprises"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
