/*
  Warnings:

  - You are about to drop the column `bpom_type` on the `certificates` table. All the data in the column will be lost.
  - You are about to drop the column `is_halal` on the `certificates` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[product_id]` on the table `nutrition_infos` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `product_id` to the `nutrition_infos` table without a default value. This is not possible if the table is not empty.
  - Changed the type of `type` on the `products` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "ProductCategory" AS ENUM ('fnb', 'cosmetic', 'pharmaceutical');

-- AlterTable
ALTER TABLE "certificates" DROP COLUMN "bpom_type",
DROP COLUMN "is_halal",
ADD COLUMN     "halal_id" INTEGER;

-- AlterTable
ALTER TABLE "nutrition_infos" ADD COLUMN     "product_id" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "products" DROP COLUMN "type",
ADD COLUMN     "type" "ProductCategory" NOT NULL;

-- DropEnum
DROP TYPE "ProductType";

-- CreateTable
CREATE TABLE "halals" (
    "id" SERIAL NOT NULL,
    "uuid" UUID NOT NULL,
    "number" TEXT NOT NULL,
    "authority" TEXT,
    "valid_until" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "halals_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "halals_uuid_key" ON "halals"("uuid");

-- CreateIndex
CREATE UNIQUE INDEX "nutrition_infos_product_id_key" ON "nutrition_infos"("product_id");

-- AddForeignKey
ALTER TABLE "certificates" ADD CONSTRAINT "certificates_halal_id_fkey" FOREIGN KEY ("halal_id") REFERENCES "halals"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "nutrition_infos" ADD CONSTRAINT "nutrition_infos_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "products"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
