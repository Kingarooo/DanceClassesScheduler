-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_ClassOnParticipants" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "userId" TEXT NOT NULL,
    "classId" TEXT NOT NULL,
    CONSTRAINT "ClassOnParticipants_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "ClassOnParticipants_classId_fkey" FOREIGN KEY ("classId") REFERENCES "Class" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_ClassOnParticipants" ("classId", "id", "userId") SELECT "classId", "id", "userId" FROM "ClassOnParticipants";
DROP TABLE "ClassOnParticipants";
ALTER TABLE "new_ClassOnParticipants" RENAME TO "ClassOnParticipants";
CREATE UNIQUE INDEX "ClassOnParticipants_userId_classId_key" ON "ClassOnParticipants"("userId", "classId");
CREATE TABLE "new_ClassOnTeachers" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "userId" TEXT NOT NULL,
    "classId" TEXT NOT NULL,
    CONSTRAINT "ClassOnTeachers_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "ClassOnTeachers_classId_fkey" FOREIGN KEY ("classId") REFERENCES "Class" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_ClassOnTeachers" ("classId", "id", "userId") SELECT "classId", "id", "userId" FROM "ClassOnTeachers";
DROP TABLE "ClassOnTeachers";
ALTER TABLE "new_ClassOnTeachers" RENAME TO "ClassOnTeachers";
CREATE UNIQUE INDEX "ClassOnTeachers_userId_classId_key" ON "ClassOnTeachers"("userId", "classId");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
