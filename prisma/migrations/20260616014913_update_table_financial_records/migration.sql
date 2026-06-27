/*
  Warnings:

  - You are about to drop the column `transaction_status` on the `financial_records` table. All the data in the column will be lost.
  - Added the required column `tenant_id` to the `financial_records` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "financial_records" DROP COLUMN "transaction_status",
ADD COLUMN     "product_id" INTEGER,
ADD COLUMN     "tenant_id" INTEGER NOT NULL,
ALTER COLUMN "transaction_date" DROP DEFAULT;

-- AddForeignKey
ALTER TABLE "financial_records" ADD CONSTRAINT "financial_records_tenant_id_fkey" FOREIGN KEY ("tenant_id") REFERENCES "tenants"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "financial_records" ADD CONSTRAINT "financial_records_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "products"("id") ON DELETE SET NULL ON UPDATE CASCADE;
