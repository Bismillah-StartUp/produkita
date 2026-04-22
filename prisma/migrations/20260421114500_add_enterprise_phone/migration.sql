-- Add missing phone column to enterprises
ALTER TABLE "enterprises"
ADD COLUMN IF NOT EXISTS "phone" TEXT;