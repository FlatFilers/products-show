/*
  Warnings:

  - You are about to drop the column `attributeId` on the `Attribute` table. All the data in the column will be lost.
  - You are about to drop the column `categoryId` on the `Category` table. All the data in the column will be lost.
  - You are about to drop the column `productId` on the `Product` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[userId,externalAttributeId]` on the table `Attribute` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[userId,externalCategoryId]` on the table `Category` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[userId,externalProductId]` on the table `Product` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[userId,externalSupplierId]` on the table `Supplier` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `externalAttributeId` to the `Attribute` table without a default value. This is not possible if the table is not empty.
  - Added the required column `externalCategoryId` to the `Category` table without a default value. This is not possible if the table is not empty.
  - Added the required column `externalProductId` to the `Product` table without a default value. This is not possible if the table is not empty.
  - Added the required column `externalSupplierId` to the `Supplier` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "Attribute_userId_attributeId_key";

-- DropIndex
DROP INDEX "Category_userId_categoryId_key";

-- DropIndex
DROP INDEX "Product_userId_productId_key";

-- AlterTable
ALTER TABLE "Attribute" DROP COLUMN "attributeId",
ADD COLUMN     "externalAttributeId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Category" DROP COLUMN "categoryId",
ADD COLUMN     "externalCategoryId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Product" DROP COLUMN "productId",
ADD COLUMN     "externalProductId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Supplier" ADD COLUMN     "externalSupplierId" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Attribute_userId_externalAttributeId_key" ON "Attribute"("userId", "externalAttributeId");

-- CreateIndex
CREATE UNIQUE INDEX "Category_userId_externalCategoryId_key" ON "Category"("userId", "externalCategoryId");

-- CreateIndex
CREATE UNIQUE INDEX "Product_userId_externalProductId_key" ON "Product"("userId", "externalProductId");

-- CreateIndex
CREATE UNIQUE INDEX "Supplier_userId_externalSupplierId_key" ON "Supplier"("userId", "externalSupplierId");
