-- CreateTable
CREATE TABLE "Settings" (
    "id" TEXT NOT NULL,
    "currency" TEXT NOT NULL,
    "currencySymbol" TEXT NOT NULL,
    "vatPercentage" DOUBLE PRECISION NOT NULL,
    "contactPhone" TEXT,
    "contactEmail" TEXT,
    "facebook" TEXT,
    "instagram" TEXT,
    "twitter" TEXT,
    "linkedin" TEXT,
    "youtube" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "displayEmailInSeperatePage" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "Settings_pkey" PRIMARY KEY ("id")
);
