/*
  Warnings:

  - You are about to drop the column `location` on the `enterprises` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "enterprises" DROP COLUMN "location",
ADD COLUMN     "district" TEXT,
ADD COLUMN     "province" TEXT;
