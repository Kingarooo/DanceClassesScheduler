/*
  Warnings:

  - Added the required column `endDate` to the `UserSubscription` table without a default value. This is not possible if the table is not empty.
  - Added the required column `monthsPaid` to the `UserSubscription` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_UserSubscription" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "userId" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "subscriptionPlanId" INTEGER NOT NULL,
    "startDate" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "endDate" DATETIME NOT NULL,
    "monthsPaid" INTEGER NOT NULL,
    "isRenewalDue" BOOLEAN NOT NULL DEFAULT false,
    CONSTRAINT "UserSubscription_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "UserSubscription_subscriptionPlanId_fkey" FOREIGN KEY ("subscriptionPlanId") REFERENCES "SubscriptionPlan" ("planId") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_UserSubscription" ("id", "subscriptionPlanId", "userId", "username") SELECT "id", "subscriptionPlanId", "userId", "username" FROM "UserSubscription";
DROP TABLE "UserSubscription";
ALTER TABLE "new_UserSubscription" RENAME TO "UserSubscription";
CREATE UNIQUE INDEX "UserSubscription_userId_subscriptionPlanId_key" ON "UserSubscription"("userId", "subscriptionPlanId");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
