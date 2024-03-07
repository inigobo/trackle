-- CreateTable
CREATE TABLE "group" (
    "id" UUID NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "group_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ProfilesOnGroups" (
    "group_id" UUID NOT NULL,
    "profile_id" UUID NOT NULL,

    CONSTRAINT "ProfilesOnGroups_pkey" PRIMARY KEY ("group_id","profile_id")
);

-- AddForeignKey
ALTER TABLE "ProfilesOnGroups" ADD CONSTRAINT "ProfilesOnGroups_group_id_fkey" FOREIGN KEY ("group_id") REFERENCES "group"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProfilesOnGroups" ADD CONSTRAINT "ProfilesOnGroups_profile_id_fkey" FOREIGN KEY ("profile_id") REFERENCES "profile"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
