-- CreateEnum
CREATE TYPE "OTPType" AS ENUM ('register', 'update_email');

-- AlterTable
ALTER TABLE "otps" ADD COLUMN     "type" "OTPType" NOT NULL DEFAULT 'register';
