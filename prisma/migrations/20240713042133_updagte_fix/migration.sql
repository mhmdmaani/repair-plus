-- AlterTable
ALTER TABLE "FixOrder" ADD COLUMN     "discount" DOUBLE PRECISION NOT NULL DEFAULT 0;

-- CreateTable
CREATE TABLE "Fix" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "price" DOUBLE PRECISION NOT NULL,
    "orderId" TEXT NOT NULL,
    "repairingTimeMinutes" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Fix_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_DeviceToFixOrder" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_DeviceToFixOrder_AB_unique" ON "_DeviceToFixOrder"("A", "B");

-- CreateIndex
CREATE INDEX "_DeviceToFixOrder_B_index" ON "_DeviceToFixOrder"("B");

-- AddForeignKey
ALTER TABLE "Fix" ADD CONSTRAINT "Fix_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES "FixOrder"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_DeviceToFixOrder" ADD CONSTRAINT "_DeviceToFixOrder_A_fkey" FOREIGN KEY ("A") REFERENCES "Device"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_DeviceToFixOrder" ADD CONSTRAINT "_DeviceToFixOrder_B_fkey" FOREIGN KEY ("B") REFERENCES "FixOrder"("id") ON DELETE CASCADE ON UPDATE CASCADE;
