import { PlayPrismaRepository } from "@/src/infrastructure/play/play.prisma.repository"
import { GetPlayForUserAndDayUseCase } from "@/src/services/useCases/getPlayForUserAndDay.useCase"
import { GetAllPlaysFromUserUseCase } from "../services/useCases/getAllPlaysFromUser.useCase"
import { ProfilePrismaRepository } from "../infrastructure/profile/profile.prisma.repository"
import { GetProfileByUsername } from "../services/useCases/getProfileByUsername.useCase"
import { GetAllProfilesForGroup } from "../services/useCases/getAllProfilesForGroup.useCase"
import { GenerateBoardsUseCase } from "../services/useCases/generateBoards.useCase"
import { BoardGenerator } from "../services/generateBoard"
import { GamePrismaRepository } from "../infrastructure/game/game.prisma.repository"
import { RegisterPlayedGameUseCase } from "../services/useCases/registerPlayedGame.useCase"
import { PlayDecoder } from "../services/playDecoder"

class ApplicationServicesMap {

    playRepository = this.getPlayRepository()
    profileRepository = this.getProfileRepository()
    gameRepository = this.getGameRepository()
    boardGenerator = this.getBoardGenerator()
    playDecoder = this.getPlayDecoder()


    getPlayForUserAndDayUseCase = () =>
        new GetPlayForUserAndDayUseCase(
            this.playRepository
        )

    getAllPlaysFromUser = () =>
        new GetAllPlaysFromUserUseCase(
            this.playRepository,
            this.gameRepository,
            this.boardGenerator
        )

    getProfileByUsername = () =>
        new GetProfileByUsername(
            this.profileRepository
        )

    getAllProfilesForGroup = () =>
        new GetAllProfilesForGroup(
            this.profileRepository
        )

    generateBoards = () =>
        new GenerateBoardsUseCase(
            this.boardGenerator,
            this.gameRepository

        )
    getRegisterPlayedGameUseCase = () =>
        new RegisterPlayedGameUseCase(
            this.playDecoder,
            this.playRepository,
            this.gameRepository

        )

    private getPlayRepository() {
        return new PlayPrismaRepository()
    }

    private getProfileRepository() {
        return new ProfilePrismaRepository()
    }

    private getGameRepository() {
        return new GamePrismaRepository()
    }

    private getBoardGenerator() {
        return new BoardGenerator()
    }

    private getPlayDecoder() {
        return new PlayDecoder()
    }
}

const applicationServicesMap = new ApplicationServicesMap()
export default applicationServicesMap