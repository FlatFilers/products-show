/*
  Warnings:

  - A unique constraint covering the columns `[userId]` on the table `CustomField` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "CustomField_userId_key" ON "CustomField"("userId");
