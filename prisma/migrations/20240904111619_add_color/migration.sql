/*
  Warnings:

  - You are about to drop the column `categoryId` on the `Item` table. All the data in the column will be lost.
  - You are about to drop the column `modelId` on the `Item` table. All the data in the column will be lost.
  - You are about to drop the column `repairId` on the `Item` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Item" DROP CONSTRAINT "Item_categoryId_fkey";

-- DropForeignKey
ALTER TABLE "Item" DROP CONSTRAINT "Item_modelId_fkey";

-- DropForeignKey
ALTER TABLE "Item" DROP CONSTRAINT "Item_repairId_fkey";

-- AlterTable
ALTER TABLE "Item" DROP COLUMN "categoryId",
DROP COLUMN "modelId",
DROP COLUMN "repairId",
ADD COLUMN     "color" TEXT,
ADD COLUMN     "discount" DOUBLE PRECISION DEFAULT 0,
ADD COLUMN     "images" TEXT[];

-- CreateTable
CREATE TABLE "_CategoryToItem" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "_DeviceToItem" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "_ItemToRepair" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_CategoryToItem_AB_unique" ON "_CategoryToItem"("A", "B");

-- CreateIndex
CREATE INDEX "_CategoryToItem_B_index" ON "_CategoryToItem"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_DeviceToItem_AB_unique" ON "_DeviceToItem"("A", "B");

-- CreateIndex
CREATE INDEX "_DeviceToItem_B_index" ON "_DeviceToItem"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_ItemToRepair_AB_unique" ON "_ItemToRepair"("A", "B");

-- CreateIndex
CREATE INDEX "_ItemToRepair_B_index" ON "_ItemToRepair"("B");

-- AddForeignKey
ALTER TABLE "_CategoryToItem" ADD CONSTRAINT "_CategoryToItem_A_fkey" FOREIGN KEY ("A") REFERENCES "Category"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CategoryToItem" ADD CONSTRAINT "_CategoryToItem_B_fkey" FOREIGN KEY ("B") REFERENCES "Item"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_DeviceToItem" ADD CONSTRAINT "_DeviceToItem_A_fkey" FOREIGN KEY ("A") REFERENCES "Device"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_DeviceToItem" ADD CONSTRAINT "_DeviceToItem_B_fkey" FOREIGN KEY ("B") REFERENCES "Item"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ItemToRepair" ADD CONSTRAINT "_ItemToRepair_A_fkey" FOREIGN KEY ("A") REFERENCES "Item"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ItemToRepair" ADD CONSTRAINT "_ItemToRepair_B_fkey" FOREIGN KEY ("B") REFERENCES "Repair"("id") ON DELETE CASCADE ON UPDATE CASCADE;
