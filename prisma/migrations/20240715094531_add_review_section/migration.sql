-- CreateTable
CREATE TABLE "Review" (
    "id" TEXT NOT NULL,
    "referenceId" TEXT NOT NULL,
    "author_name" TEXT NOT NULL,
    "author_image" TEXT NOT NULL,
    "author_email" TEXT NOT NULL,
    "rating" INTEGER NOT NULL,
    "text" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Review_pkey" PRIMARY KEY ("id")
);
