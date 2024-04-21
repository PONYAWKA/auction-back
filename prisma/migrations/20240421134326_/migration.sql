/*
  Warnings:

  - The primary key for the `Tokens` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - A unique constraint covering the columns `[id]` on the table `Tokens` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Tokens" DROP CONSTRAINT "Tokens_pkey",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "Tokens_pkey" PRIMARY KEY ("id");

-- CreateIndex
CREATE UNIQUE INDEX "Tokens_id_key" ON "Tokens"("id");
