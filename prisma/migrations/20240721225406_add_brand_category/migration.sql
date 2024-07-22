-- AlterTable
ALTER TABLE "Category" ADD COLUMN     "brandId" TEXT NOT NULL DEFAULT '0';

-- AddForeignKey
ALTER TABLE "Category" ADD CONSTRAINT "Category_brandId_fkey" FOREIGN KEY ("brandId") REFERENCES "Brand"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
