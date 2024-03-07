import { GroupRepository } from "@/src/domain/group"

export class CreateGroupUseCase {
    constructor(
        private groupRepository: GroupRepository,
    ) { }

    async run(name: string, userId: string, avatarSeed: string) {
        return await this.groupRepository.createGroup(name, userId, avatarSeed)
    }

}
