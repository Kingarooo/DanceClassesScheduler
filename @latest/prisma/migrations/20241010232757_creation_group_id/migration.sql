/*
  Warnings:

  - Made the column `creationGroupId` on table `Class` required. This step will fail if there are existing NULL values in that column.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Class" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "style" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "start" DATETIME NOT NULL,
    "end" DATETIME NOT NULL,
    "frequency" TEXT NOT NULL,
    "creationGroupId" TEXT NOT NULL
);
INSERT INTO "new_Class" ("creationGroupId", "description", "end", "frequency", "id", "name", "start", "style") SELECT "creationGroupId", "description", "end", "frequency", "id", "name", "start", "style" FROM "Class";
DROP TABLE "Class";
ALTER TABLE "new_Class" RENAME TO "Class";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
