/*
  Warnings:

  - You are about to drop the column `enterprise_id` on the `certificates` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "certificates" DROP CONSTRAINT "certificates_enterprise_id_fkey";

-- AlterTable
ALTER TABLE "certificates" DROP COLUMN "enterprise_id";
