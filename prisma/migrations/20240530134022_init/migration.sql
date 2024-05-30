-- CreateEnum
CREATE TYPE "OrderStatus" AS ENUM ('WAITING', 'PENDING', 'IN_PROGRESS', 'DONE', 'TOKEN', 'CANCELLED');

-- CreateTable
CREATE TABLE "Brand" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "logo" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Brand_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Device" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "image" TEXT,
    "brandId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Device_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Repair" (
    "id" TEXT NOT NULL,
    "deviceId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "price" DOUBLE PRECISION NOT NULL,
    "vat" DOUBLE PRECISION NOT NULL,
    "totalPrice" DOUBLE PRECISION NOT NULL,
    "quantity" INTEGER NOT NULL,
    "quality" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "expectedMinutesToFix" INTEGER NOT NULL,
    "fixOrderId" TEXT,

    CONSTRAINT "Repair_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "FixOrder" (
    "id" TEXT NOT NULL,
    "deviceId" TEXT NOT NULL,
    "imei" TEXT NOT NULL,
    "image" TEXT,
    "problems" TEXT[],
    "userNote" TEXT,
    "userId" TEXT NOT NULL,
    "maintenanceNote" TEXT,
    "status" "OrderStatus" NOT NULL DEFAULT 'WAITING',
    "price" DOUBLE PRECISION NOT NULL,
    "vat" DOUBLE PRECISION NOT NULL,
    "totalPrice" DOUBLE PRECISION NOT NULL,
    "doneAt" TIMESTAMP(3),
    "receivedAt" TIMESTAMP(3),
    "cancelledAt" TIMESTAMP(3),
    "tokenAt" TIMESTAMP(3),
    "expectedDateToFix" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "FixOrder_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "tel" TEXT NOT NULL,
    "address" TEXT,
    "company" TEXT,
    "orgNumber" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Brand_name_key" ON "Brand"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Device_name_key" ON "Device"("name");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- AddForeignKey
ALTER TABLE "Device" ADD CONSTRAINT "Device_brandId_fkey" FOREIGN KEY ("brandId") REFERENCES "Brand"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Repair" ADD CONSTRAINT "Repair_deviceId_fkey" FOREIGN KEY ("deviceId") REFERENCES "Device"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Repair" ADD CONSTRAINT "Repair_fixOrderId_fkey" FOREIGN KEY ("fixOrderId") REFERENCES "FixOrder"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FixOrder" ADD CONSTRAINT "FixOrder_deviceId_fkey" FOREIGN KEY ("deviceId") REFERENCES "Device"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FixOrder" ADD CONSTRAINT "FixOrder_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
