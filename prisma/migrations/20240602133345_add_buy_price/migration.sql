/*
  Warnings:

  - You are about to drop the column `price` on the `Repair` table. All the data in the column will be lost.
  - You are about to drop the column `totalPrice` on the `Repair` table. All the data in the column will be lost.
  - You are about to drop the column `vat` on the `Repair` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Repair" DROP COLUMN "price",
DROP COLUMN "totalPrice",
DROP COLUMN "vat",
ADD COLUMN     "buyPrice" DOUBLE PRECISION NOT NULL DEFAULT 0,
ADD COLUMN     "sellPrice" DOUBLE PRECISION NOT NULL DEFAULT 0;
