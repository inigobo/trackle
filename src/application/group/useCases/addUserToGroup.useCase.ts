import { GroupRepository } from "@/src/domain/group"

export class AddUserToGroupUseCase {
    constructor(
        private groupRepository: GroupRepository,
    ) { }

    async run(groupId: string, userId: string) {
        return await this.groupRepository.addUser(groupId, userId)
    }

}
