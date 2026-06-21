/*
  Warnings:

  - The primary key for the `financial_records` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `id` column on the `financial_records` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - A unique constraint covering the columns `[cuid]` on the table `financial_records` will be added. If there are existing duplicate values, this will fail.
  - The required column `cuid` was added to the `financial_records` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.

*/
-- AlterTable
ALTER TABLE "financial_records" DROP CONSTRAINT "financial_records_pkey",
ADD COLUMN     "cuid" TEXT NOT NULL,
DROP COLUMN "id",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "financial_records_pkey" PRIMARY KEY ("id");

-- CreateIndex
CREATE UNIQUE INDEX "financial_records_cuid_key" ON "financial_records"("cuid");
