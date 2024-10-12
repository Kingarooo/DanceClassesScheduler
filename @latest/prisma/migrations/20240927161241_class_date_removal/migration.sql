/*
  Warnings:

  - You are about to drop the column `date` on the `Class` table. All the data in the column will be lost.
  - You are about to drop the column `rrule` on the `Class` table. All the data in the column will be lost.

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
    "frequency" TEXT NOT NULL
);
INSERT INTO "new_Class" ("description", "end", "frequency", "id", "name", "start", "style") SELECT "description", "end", "frequency", "id", "name", "start", "style" FROM "Class";
DROP TABLE "Class";
ALTER TABLE "new_Class" RENAME TO "Class";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
