-- Add missing email column to enterprises
ALTER TABLE "enterprises"
ADD COLUMN IF NOT EXISTS "email" TEXT;