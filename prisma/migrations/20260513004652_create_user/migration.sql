/*
  Warnings:

  - You are about to drop the column `lisence_number` on the `certificates` table. All the data in the column will be lost.
  - You are about to drop the column `phone` on the `enterprises` table. All the data in the column will be lost.
  - Added the required column `user_id` to the `enterprises` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "UserRole" AS ENUM ('superadmin', 'admin', 'user');

-- AlterTable
ALTER TABLE "certificates" DROP COLUMN "lisence_number",
ADD COLUMN     "license_number" TEXT;

-- AlterTable
ALTER TABLE "enterprises" DROP COLUMN "phone",
ADD COLUMN     "phonenumber" TEXT,
ADD COLUMN     "user_id" INTEGER NOT NULL;

-- CreateTable
CREATE TABLE "users" (
    "id" SERIAL NOT NULL,
    "uuid" UUID NOT NULL,
    "name" TEXT,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "phonenumber" TEXT,
    "role" "UserRole" NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_uuid_key" ON "users"("uuid");

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- AddForeignKey
ALTER TABLE "enterprises" ADD CONSTRAINT "enterprises_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
