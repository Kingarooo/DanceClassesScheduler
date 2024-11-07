/*
  Warnings:

  - You are about to drop the column `planType` on the `SubscriptionPlan` table. All the data in the column will be lost.
  - Added the required column `planId` to the `SubscriptionPlan` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_SubscriptionPlan" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "price" REAL NOT NULL,
    "planId" INTEGER NOT NULL
);
INSERT INTO "new_SubscriptionPlan" ("description", "id", "name", "price") SELECT "description", "id", "name", "price" FROM "SubscriptionPlan";
DROP TABLE "SubscriptionPlan";
ALTER TABLE "new_SubscriptionPlan" RENAME TO "SubscriptionPlan";
CREATE UNIQUE INDEX "SubscriptionPlan_planId_key" ON "SubscriptionPlan"("planId");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
