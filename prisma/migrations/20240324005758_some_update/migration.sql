/*
  Warnings:

  - The primary key for the `Token` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `expirationDate` on the `Token` table. All the data in the column will be lost.
  - You are about to drop the column `id` on the `Token` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "Token_id_key";

-- AlterTable
ALTER TABLE "Token" DROP CONSTRAINT "Token_pkey",
DROP COLUMN "expirationDate",
DROP COLUMN "id",
ADD CONSTRAINT "Token_pkey" PRIMARY KEY ("userId");
