/*
  Warnings:

  - Added the required column `avatar_seed` to the `group` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "group" ADD COLUMN     "avatar_seed" TEXT NOT NULL;
