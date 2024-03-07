import { PlayPrismaRepository } from "@/src/infrastructure/play/play.prisma.repository"
import { GetPlayForUserAndDayUseCase } from "@/src/application/play/useCases/getPlayForUserAndDay.useCase"
import { GetAllPlaysFromUserUseCase } from "../application/play/useCases/getAllPlaysFromUser.useCase"
import { ProfilePrismaRepository } from "../infrastructure/profile/profile.prisma.repository"
import { GetProfileByUsernameUseCase } from "../application/profile/useCases/getProfileByUsername.useCase"
import { GetAllProfilesForGroupUseCase } from "../application/profile/useCases/getAllProfilesForGroup.useCase"
import { BoardGenerator } from "../services/generateBoard"
import { GamePrismaRepository } from "../infrastructure/game/game.prisma.repository"
import { RegisterPlayedGameUseCase } from "../application/play/useCases/registerPlayedGame.useCase"
import { PlayDecoder } from "../services/playDecoder"
import { GroupPrismaRepository } from "../infrastructure/group/group.prisma.repository"
import { CreateGroupUseCase } from "../application/group/useCases/createGroup.useCase"
import { AddUserToGroupUseCase } from "../application/group/useCases/addUserToGroup.useCase"
import { GetAllGroupsForUserUseCase } from "../application/group/useCases/getAllGroupsForUser.useCase"
import { GetAllGroupsUseCase } from "../application/group/useCases/getAllGroups.useCase"
import { GetGroupByNameUseCase } from "../application/group/useCases/getGroupByName.useCase"

class ApplicationServicesMap {

    playRepository = this.getPlayRepository()
    profileRepository = this.getProfileRepository()
    gameRepository = this.getGameRepository()
    groupRepository = this.getGroupRepository()
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
        new GetProfileByUsernameUseCase(
            this.profileRepository
        )

    getAllProfilesForGroup = () =>
        new GetAllProfilesForGroupUseCase(
            this.profileRepository
        )

    getAllGroupsForUser = () =>
        new GetAllGroupsForUserUseCase(
            this.groupRepository
        )

    getAllGroups = () =>
        new GetAllGroupsUseCase(
            this.groupRepository
        )

    getGroupByName = () =>
        new GetGroupByNameUseCase(
            this.groupRepository
        )

    createGroupUseCase = () =>
        new CreateGroupUseCase(
            this.groupRepository
        )

    addUserToGroupUseCase = () =>
        new AddUserToGroupUseCase(
            this.groupRepository
        )

    registerPlayedGameUseCase = () =>
        new RegisterPlayedGameUseCase(
            this.playDecoder,
            this.playRepository,
            this.gameRepository
        )

    private getPlayRepository() {
        return new PlayPrismaRepository()
    }

    private getGroupRepository() {
        return new GroupPrismaRepository()
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
