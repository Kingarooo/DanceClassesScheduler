/*
  Warnings:

  - You are about to drop the `Teachers` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the column `teacherId` on the `Class` table. All the data in the column will be lost.
  - Added the required column `date` to the `Class` table without a default value. This is not possible if the table is not empty.
  - Added the required column `end` to the `Class` table without a default value. This is not possible if the table is not empty.
  - Added the required column `start` to the `Class` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "Teachers_email_key";

-- AlterTable
ALTER TABLE "User" ADD COLUMN "paymentType" TEXT;

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "Teachers";
PRAGMA foreign_keys=on;

-- CreateTable
CREATE TABLE "Teacher" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "style" TEXT NOT NULL,
    "name" TEXT,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "_ClassToTeacher" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,
    CONSTRAINT "_ClassToTeacher_A_fkey" FOREIGN KEY ("A") REFERENCES "Class" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "_ClassToTeacher_B_fkey" FOREIGN KEY ("B") REFERENCES "Teacher" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Class" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "style" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "date" DATETIME NOT NULL,
    "start" DATETIME NOT NULL,
    "end" DATETIME NOT NULL
);
INSERT INTO "new_Class" ("description", "id", "name", "style") SELECT "description", "id", "name", "style" FROM "Class";
DROP TABLE "Class";
ALTER TABLE "new_Class" RENAME TO "Class";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;

-- CreateIndex
CREATE UNIQUE INDEX "Teacher_email_key" ON "Teacher"("email");

-- CreateIndex
CREATE UNIQUE INDEX "_ClassToTeacher_AB_unique" ON "_ClassToTeacher"("A", "B");

-- CreateIndex
CREATE INDEX "_ClassToTeacher_B_index" ON "_ClassToTeacher"("B");
