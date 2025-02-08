/*
  Warnings:

  - You are about to drop the `User` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "User";

-- CreateTable
CREATE TABLE "someMafaka" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(100),

    CONSTRAINT "someMafaka_pkey" PRIMARY KEY ("id")
);
