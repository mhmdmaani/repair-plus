-- AlterTable
ALTER TABLE "Repair" ADD COLUMN     "repairingPrice" DOUBLE PRECISION NOT NULL DEFAULT 0,
ADD COLUMN     "repairingTimeMinutes" INTEGER NOT NULL DEFAULT 0;
