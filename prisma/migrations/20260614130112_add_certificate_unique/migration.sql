/*
  Warnings:

  - A unique constraint covering the columns `[product_id,type]` on the table `certificates` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "certificates_product_id_type_key" ON "certificates"("product_id", "type");
