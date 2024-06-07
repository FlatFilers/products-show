/*
  Warnings:

  - A unique constraint covering the columns `[flatfileGuestId]` on the table `User` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "User" ADD COLUMN     "flatfileGuestId" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "User_flatfileGuestId_key" ON "User"("flatfileGuestId");
