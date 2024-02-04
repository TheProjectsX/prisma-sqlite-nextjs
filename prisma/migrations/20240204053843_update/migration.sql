/*
  Warnings:

  - You are about to drop the column `complete` on the `UserTask` table. All the data in the column will be lost.
  - Added the required column `completed` to the `UserTask` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_UserTask" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "completed" BOOLEAN NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);
INSERT INTO "new_UserTask" ("createdAt", "description", "id", "title", "updatedAt") SELECT "createdAt", "description", "id", "title", "updatedAt" FROM "UserTask";
DROP TABLE "UserTask";
ALTER TABLE "new_UserTask" RENAME TO "UserTask";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
