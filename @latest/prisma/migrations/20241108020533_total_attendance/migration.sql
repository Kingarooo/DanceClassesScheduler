-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_User" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "newsletter" BOOLEAN NOT NULL DEFAULT true,
    "isTeacher" BOOLEAN NOT NULL DEFAULT false,
    "teachingStyle" TEXT,
    "admin" BOOLEAN NOT NULL DEFAULT false,
    "profilePic" TEXT,
    "totalAttendance" INTEGER NOT NULL DEFAULT 0
);
INSERT INTO "new_User" ("admin", "email", "id", "isTeacher", "name", "newsletter", "password", "profilePic", "teachingStyle") SELECT "admin", "email", "id", "isTeacher", "name", "newsletter", "password", "profilePic", "teachingStyle" FROM "User";
DROP TABLE "User";
ALTER TABLE "new_User" RENAME TO "User";
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
