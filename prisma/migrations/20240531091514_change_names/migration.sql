/*
  Warnings:

  - You are about to drop the column `fixOrderId` on the `Repair` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Repair" DROP CONSTRAINT "Repair_fixOrderId_fkey";

-- AlterTable
ALTER TABLE "Repair" DROP COLUMN "fixOrderId";

-- CreateTable
CREATE TABLE "_FixOrderToRepair" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_FixOrderToRepair_AB_unique" ON "_FixOrderToRepair"("A", "B");

-- CreateIndex
CREATE INDEX "_FixOrderToRepair_B_index" ON "_FixOrderToRepair"("B");

-- AddForeignKey
ALTER TABLE "_FixOrderToRepair" ADD CONSTRAINT "_FixOrderToRepair_A_fkey" FOREIGN KEY ("A") REFERENCES "FixOrder"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_FixOrderToRepair" ADD CONSTRAINT "_FixOrderToRepair_B_fkey" FOREIGN KEY ("B") REFERENCES "Repair"("id") ON DELETE CASCADE ON UPDATE CASCADE;
