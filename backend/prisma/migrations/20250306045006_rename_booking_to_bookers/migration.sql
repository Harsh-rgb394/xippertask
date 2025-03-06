/*
  Warnings:

  - You are about to drop the `Booking` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Booking" DROP CONSTRAINT "Booking_userId_fkey";

-- DropForeignKey
ALTER TABLE "WebCheckin" DROP CONSTRAINT "WebCheckin_bookingId_fkey";

-- DropTable
DROP TABLE "Booking";

-- CreateTable
CREATE TABLE "Bookers" (
    "id" TEXT NOT NULL,
    "userId" INTEGER NOT NULL,
    "hotelId" INTEGER NOT NULL,
    "hotelName" TEXT NOT NULL,
    "hotelLocation" TEXT NOT NULL,
    "hotelPrice" INTEGER NOT NULL,
    "bookingDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Bookers_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Bookers" ADD CONSTRAINT "Bookers_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "WebCheckin" ADD CONSTRAINT "WebCheckin_bookingId_fkey" FOREIGN KEY ("bookingId") REFERENCES "Bookers"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
