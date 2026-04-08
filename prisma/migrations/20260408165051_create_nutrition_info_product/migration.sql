-- CreateTable
CREATE TABLE "nutrition_infos" (
    "id" SERIAL NOT NULL,
    "servings" DOUBLE PRECISION,
    "energy" DOUBLE PRECISION,
    "fat" DOUBLE PRECISION,
    "saturated_fat" DOUBLE PRECISION,
    "protein" DOUBLE PRECISION,
    "carbo" DOUBLE PRECISION,
    "sugar" DOUBLE PRECISION,
    "natrium" DOUBLE PRECISION,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "nutrition_infos_pkey" PRIMARY KEY ("id")
);
