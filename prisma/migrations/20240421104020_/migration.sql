/*
  Warnings:

  - You are about to drop the `Auction` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Bit` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Token` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `User` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Auction" DROP CONSTRAINT "Auction_creatorUserId_fkey";

-- DropForeignKey
ALTER TABLE "Bit" DROP CONSTRAINT "Bit_auctionId_fkey";

-- DropForeignKey
ALTER TABLE "Bit" DROP CONSTRAINT "Bit_bitOwner_fkey";

-- DropForeignKey
ALTER TABLE "Token" DROP CONSTRAINT "Token_userId_fkey";

-- DropTable
DROP TABLE "Auction";

-- DropTable
DROP TABLE "Bit";

-- DropTable
DROP TABLE "Token";

-- DropTable
DROP TABLE "User";

-- CreateTable
CREATE TABLE "Users" (
    "id" SERIAL NOT NULL,
    "email" TEXT NOT NULL,
    "passwordHash" TEXT NOT NULL,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "birth" TIMESTAMP(3) NOT NULL,
    "location" TEXT NOT NULL,
    "sex" "Sex" NOT NULL,

    CONSTRAINT "Users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Tokens" (
    "refreshTokens" TEXT NOT NULL,
    "userId" INTEGER NOT NULL,

    CONSTRAINT "Tokens_pkey" PRIMARY KEY ("userId")
);

-- CreateTable
CREATE TABLE "Auctions" (
    "id" SERIAL NOT NULL,
    "paintingName" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL,
    "category" TEXT NOT NULL,
    "minBits" DOUBLE PRECISION NOT NULL,
    "maxBits" DOUBLE PRECISION NOT NULL,
    "startPrice" DOUBLE PRECISION NOT NULL,
    "startDate" TIMESTAMP(3) NOT NULL,
    "endDate" TIMESTAMP(3) NOT NULL,
    "image" TEXT NOT NULL,
    "creatorUsersId" INTEGER NOT NULL,

    CONSTRAINT "Auctions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Bits" (
    "id" SERIAL NOT NULL,
    "bitSum" DOUBLE PRECISION NOT NULL,
    "bitAuctions" INTEGER NOT NULL,
    "bitOwner" INTEGER NOT NULL,
    "auctionId" INTEGER NOT NULL,

    CONSTRAINT "Bits_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Users_id_key" ON "Users"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Users_email_key" ON "Users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Tokens_userId_key" ON "Tokens"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "Auctions_id_key" ON "Auctions"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Bits_id_key" ON "Bits"("id");

-- AddForeignKey
ALTER TABLE "Tokens" ADD CONSTRAINT "Tokens_userId_fkey" FOREIGN KEY ("userId") REFERENCES "Users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Auctions" ADD CONSTRAINT "Auctions_creatorUsersId_fkey" FOREIGN KEY ("creatorUsersId") REFERENCES "Users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Bits" ADD CONSTRAINT "Bits_bitOwner_fkey" FOREIGN KEY ("bitOwner") REFERENCES "Users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Bits" ADD CONSTRAINT "Bits_auctionId_fkey" FOREIGN KEY ("auctionId") REFERENCES "Auctions"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
