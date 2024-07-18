/*
  Warnings:

  - Added the required column `timeToFixMinutes` to the `FixOrder` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "FixOrder" ADD COLUMN     "timeToFixMinutes" INTEGER NOT NULL;
