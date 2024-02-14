/*
  Warnings:

  - The primary key for the `play` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `gameId` on the `play` table. All the data in the column will be lost.
  - You are about to drop the column `profileId` on the `play` table. All the data in the column will be lost.
  - You are about to drop the column `avatarSeed` on the `profile` table. All the data in the column will be lost.
  - You are about to drop the column `fullName` on the `profile` table. All the data in the column will be lost.
  - Added the required column `game_id` to the `play` table without a default value. This is not possible if the table is not empty.
  - Added the required column `profile_id` to the `play` table without a default value. This is not possible if the table is not empty.
  - Added the required column `avatar_seed` to the `profile` table without a default value. This is not possible if the table is not empty.
  - Added the required column `fullname` to the `profile` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "play" DROP CONSTRAINT "play_gameId_fkey";

-- DropForeignKey
ALTER TABLE "play" DROP CONSTRAINT "play_profileId_fkey";

-- AlterTable
ALTER TABLE "play" DROP CONSTRAINT "play_pkey",
DROP COLUMN "gameId",
DROP COLUMN "profileId",
ADD COLUMN     "game_id" INTEGER NOT NULL,
ADD COLUMN     "profile_id" UUID NOT NULL,
ADD CONSTRAINT "play_pkey" PRIMARY KEY ("game_id", "profile_id");

-- AlterTable
ALTER TABLE "profile" DROP COLUMN "avatarSeed",
DROP COLUMN "fullName",
ADD COLUMN     "avatar_seed" TEXT NOT NULL,
ADD COLUMN     "fullname" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "play" ADD CONSTRAINT "play_game_id_fkey" FOREIGN KEY ("game_id") REFERENCES "game"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "play" ADD CONSTRAINT "play_profile_id_fkey" FOREIGN KEY ("profile_id") REFERENCES "profile"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
