/*
  Warnings:

  - You are about to drop the `Teacher` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_ClassToTeacher` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_ClassToUser` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the column `admin` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `newsletter` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `paymentType` on the `User` table. All the data in the column will be lost.
  - Made the column `name` on table `User` required. This step will fail if there are existing NULL values in that column.

*/
-- DropIndex
DROP INDEX "Teacher_email_key";

-- DropIndex
DROP INDEX "_ClassToTeacher_B_index";

-- DropIndex
DROP INDEX "_ClassToTeacher_AB_unique";

-- DropIndex
DROP INDEX "_ClassToUser_B_index";

-- DropIndex
DROP INDEX "_ClassToUser_AB_unique";

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "Teacher";
PRAGMA foreign_keys=on;

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "_ClassToTeacher";
PRAGMA foreign_keys=on;

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "_ClassToUser";
PRAGMA foreign_keys=on;

-- CreateTable
CREATE TABLE "ClassOnTeachers" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "userId" TEXT NOT NULL,
    "classId" TEXT NOT NULL,
    CONSTRAINT "ClassOnTeachers_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "ClassOnTeachers_classId_fkey" FOREIGN KEY ("classId") REFERENCES "Class" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "ClassOnParticipants" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "userId" TEXT NOT NULL,
    "classId" TEXT NOT NULL,
    CONSTRAINT "ClassOnParticipants_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "ClassOnParticipants_classId_fkey" FOREIGN KEY ("classId") REFERENCES "Class" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_User" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "isTeacher" BOOLEAN NOT NULL DEFAULT false,
    "teachingStyle" TEXT
);
INSERT INTO "new_User" ("email", "id", "name", "password") SELECT "email", "id", "name", "password" FROM "User";
DROP TABLE "User";
ALTER TABLE "new_User" RENAME TO "User";
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;

-- CreateIndex
CREATE UNIQUE INDEX "ClassOnTeachers_userId_classId_key" ON "ClassOnTeachers"("userId", "classId");

-- CreateIndex
CREATE UNIQUE INDEX "ClassOnParticipants_userId_classId_key" ON "ClassOnParticipants"("userId", "classId");
