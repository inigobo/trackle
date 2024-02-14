-- CreateTable
CREATE TABLE "profile" (
    "id" UUID NOT NULL,
    "username" TEXT NOT NULL,
    "fullName" TEXT NOT NULL,
    "avatarSeed" TEXT NOT NULL,

    CONSTRAINT "profile_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "game" (
    "id" INTEGER NOT NULL,
    "solution" TEXT NOT NULL,

    CONSTRAINT "game_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "play" (
    "gameId" INTEGER NOT NULL,
    "profileId" UUID NOT NULL,
    "attempts" TEXT NOT NULL,

    CONSTRAINT "play_pkey" PRIMARY KEY ("gameId","profileId")
);

-- AddForeignKey
ALTER TABLE "play" ADD CONSTRAINT "play_gameId_fkey" FOREIGN KEY ("gameId") REFERENCES "game"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "play" ADD CONSTRAINT "play_profileId_fkey" FOREIGN KEY ("profileId") REFERENCES "profile"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
