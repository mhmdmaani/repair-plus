/*
  Warnings:

  - You are about to drop the column `isFeeatured` on the `Device` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Device" DROP COLUMN "isFeeatured",
ADD COLUMN     "isFeatured" BOOLEAN NOT NULL DEFAULT false;
