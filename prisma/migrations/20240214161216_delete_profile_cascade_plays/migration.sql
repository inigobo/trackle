-- DropForeignKey
ALTER TABLE "play" DROP CONSTRAINT "play_profile_id_fkey";

-- AddForeignKey
ALTER TABLE "play" ADD CONSTRAINT "play_profile_id_fkey" FOREIGN KEY ("profile_id") REFERENCES "profile"("id") ON DELETE CASCADE ON UPDATE CASCADE;
