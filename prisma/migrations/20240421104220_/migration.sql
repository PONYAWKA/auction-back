/*
  Warnings:

  - You are about to drop the column `refreshTokens` on the `Tokens` table. All the data in the column will be lost.
  - Added the required column `refreshToken` to the `Tokens` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Tokens" DROP COLUMN "refreshTokens",
ADD COLUMN     "refreshToken" TEXT NOT NULL;
