-- CreateTable
CREATE TABLE "SubscriptionPlan" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "price" REAL NOT NULL,
    "planType" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "UserSubscription" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "userId" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "subscriptionId" INTEGER NOT NULL,
    "subscriptionStyle" TEXT NOT NULL,
    "subscriptionPrice" REAL NOT NULL,
    CONSTRAINT "UserSubscription_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "UserSubscription_subscriptionId_fkey" FOREIGN KEY ("subscriptionId") REFERENCES "SubscriptionPlan" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "SubscriptionPlan_planType_key" ON "SubscriptionPlan"("planType");

-- CreateIndex
CREATE UNIQUE INDEX "UserSubscription_userId_subscriptionId_key" ON "UserSubscription"("userId", "subscriptionId");
