/*
  Warnings:

  - The primary key for the `SubscriptionPlan` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `SubscriptionPlan` table. All the data in the column will be lost.
  - You are about to drop the column `subscriptionId` on the `UserSubscription` table. All the data in the column will be lost.
  - Added the required column `subscriptionPlanId` to the `UserSubscription` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_SubscriptionPlan" (
    "planId" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "price" REAL NOT NULL
);
INSERT INTO "new_SubscriptionPlan" ("description", "name", "planId", "price") SELECT "description", "name", "planId", "price" FROM "SubscriptionPlan";
DROP TABLE "SubscriptionPlan";
ALTER TABLE "new_SubscriptionPlan" RENAME TO "SubscriptionPlan";
CREATE TABLE "new_UserSubscription" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "userId" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "subscriptionPlanId" INTEGER NOT NULL,
    CONSTRAINT "UserSubscription_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "UserSubscription_subscriptionPlanId_fkey" FOREIGN KEY ("subscriptionPlanId") REFERENCES "SubscriptionPlan" ("planId") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_UserSubscription" ("id", "userId", "username") SELECT "id", "userId", "username" FROM "UserSubscription";
DROP TABLE "UserSubscription";
ALTER TABLE "new_UserSubscription" RENAME TO "UserSubscription";
CREATE UNIQUE INDEX "UserSubscription_userId_subscriptionPlanId_key" ON "UserSubscription"("userId", "subscriptionPlanId");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
