/*
  Warnings:

  - You are about to drop the column `url` on the `Keyword` table. All the data in the column will be lost.
  - Added the required column `text` to the `Keyword` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Keyword" DROP COLUMN "url",
ADD COLUMN     "text" TEXT NOT NULL;
