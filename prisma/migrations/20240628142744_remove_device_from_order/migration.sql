/*
  Warnings:

  - You are about to drop the column `deviceId` on the `FixOrder` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "FixOrder" DROP CONSTRAINT "FixOrder_deviceId_fkey";

-- AlterTable
ALTER TABLE "FixOrder" DROP COLUMN "deviceId";
