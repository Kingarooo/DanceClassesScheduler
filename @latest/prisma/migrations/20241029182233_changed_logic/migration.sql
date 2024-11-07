/*
  Warnings:

  - You are about to drop the column `subscriptionPrice` on the `UserSubscription` table. All the data in the column will be lost.
  - You are about to drop the column `subscriptionStyle` on the `UserSubscription` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_UserSubscription" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "userId" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "subscriptionId" INTEGER NOT NULL,
    CONSTRAINT "UserSubscription_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "UserSubscription_subscriptionId_fkey" FOREIGN KEY ("subscriptionId") REFERENCES "SubscriptionPlan" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_UserSubscription" ("id", "subscriptionId", "userId", "username") SELECT "id", "subscriptionId", "userId", "username" FROM "UserSubscription";
DROP TABLE "UserSubscription";
ALTER TABLE "new_UserSubscription" RENAME TO "UserSubscription";
CREATE UNIQUE INDEX "UserSubscription_userId_subscriptionId_key" ON "UserSubscription"("userId", "subscriptionId");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
