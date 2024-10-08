/*
  Warnings:

  - You are about to drop the column `displayEmailInSeperatePage` on the `Settings` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Settings" DROP COLUMN "displayEmailInSeperatePage",
ADD COLUMN     "address" TEXT DEFAULT 'Kardanvägen 10',
ADD COLUMN     "companyName" TEXT DEFAULT 'Repair Plus';
