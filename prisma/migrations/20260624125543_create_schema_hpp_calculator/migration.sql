-- CreateEnum
CREATE TYPE "HppMethod" AS ENUM ('full', 'variable');

-- CreateEnum
CREATE TYPE "HppCategory" AS ENUM ('bbb', 'btkl', 'packaging', 'bop_var', 'bop_fix');

-- CreateTable
CREATE TABLE "hpp_calculations" (
    "id" SERIAL NOT NULL,
    "uuid" UUID NOT NULL,
    "tenant_id" INTEGER NOT NULL,
    "product_name" TEXT NOT NULL,
    "production_unit" TEXT NOT NULL,
    "production_qty" DOUBLE PRECISION NOT NULL,
    "calculation_method" "HppMethod" NOT NULL,
    "margin_percentage" DOUBLE PRECISION NOT NULL,
    "total_hpp" DOUBLE PRECISION NOT NULL,
    "hpp_per_unit" DOUBLE PRECISION NOT NULL,
    "recommended_price" DOUBLE PRECISION NOT NULL,
    "total_profit" DOUBLE PRECISION NOT NULL,
    "total_revenue" DOUBLE PRECISION NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "hpp_calculations_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "hpp_items" (
    "id" SERIAL NOT NULL,
    "calculation_id" INTEGER NOT NULL,
    "category" "HppCategory" NOT NULL,
    "name" TEXT NOT NULL,
    "unit" TEXT NOT NULL,
    "quantity" DOUBLE PRECISION NOT NULL,
    "price_per_unit" DOUBLE PRECISION NOT NULL,
    "subtotal" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "hpp_items_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "hpp_calculations_uuid_key" ON "hpp_calculations"("uuid");

-- AddForeignKey
ALTER TABLE "hpp_calculations" ADD CONSTRAINT "hpp_calculations_tenant_id_fkey" FOREIGN KEY ("tenant_id") REFERENCES "tenants"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "hpp_items" ADD CONSTRAINT "hpp_items_calculation_id_fkey" FOREIGN KEY ("calculation_id") REFERENCES "hpp_calculations"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
