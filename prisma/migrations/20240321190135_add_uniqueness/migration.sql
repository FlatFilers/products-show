/*
  Warnings:

  - A unique constraint covering the columns `[flatfileSpaceId]` on the table `Space` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[userId,workflowType]` on the table `Space` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Space_flatfileSpaceId_key" ON "Space"("flatfileSpaceId");

-- CreateIndex
CREATE UNIQUE INDEX "Space_userId_workflowType_key" ON "Space"("userId", "workflowType");
